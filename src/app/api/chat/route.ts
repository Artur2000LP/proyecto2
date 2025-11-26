import { NextRequest, NextResponse } from 'next/server';
import { SYSTEM_PROMPT } from '@/lib/ai/prompts';
import { sanitizeUserInput, checkRateLimit, AI_CONFIG, getGeminiParams } from '@/lib/ai/agent-config';

// Configuración para Edge Runtime (opcional, más rápido)
// export const runtime = 'edge';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export async function POST(req: NextRequest) {
  try {
    // Verificar rate limit
    if (!checkRateLimit()) {
      return NextResponse.json(
        { error: 'Demasiadas solicitudes. Por favor, espera un momento.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Formato de mensaje inválido' },
        { status: 400 }
      );
    }

    // Sanitizar mensajes del usuario
    const sanitizedMessages: Message[] = messages.map((msg: Message) => ({
      role: msg.role,
      content: msg.role === 'user' ? sanitizeUserInput(msg.content) : msg.content,
    }));

    // Limitar número de mensajes en contexto
    const contextMessages = sanitizedMessages.slice(
      -AI_CONFIG.limits.maxMessagesInContext
    );

    // OPCIÓN 1: Usar OpenAI (requiere OPENAI_API_KEY en .env.local)
    // OPCIÓN 0: Usar Gemini (Google Generative AI) si está configurado
    if (process.env.GEMINI_API_KEY || process.env.GEMINI_ACCESS_TOKEN) {
      const model = process.env.GEMINI_MODEL || AI_CONFIG.models.gemini.fast;

      // Prefer the stable v1 endpoint when available
      const baseEndpoint = `https://generativelanguage.googleapis.com/v1/models/${model}:generate`;

      // Support two authentication modes:
      // - GEMINI_ACCESS_TOKEN: Bearer token (recommended for service accounts / OAuth)
      // - GEMINI_API_KEY: simple API key (may not be allowed for all models)
      const useBearer = Boolean(process.env.GEMINI_ACCESS_TOKEN);
      const endpoint = useBearer
        ? baseEndpoint
        : `${baseEndpoint}?key=${process.env.GEMINI_API_KEY}`;

      // Construir prompt simple concatenando system + mensajes en contexto
      const promptText = [
        SYSTEM_PROMPT,
        ...contextMessages.map((m) => `${m.role === 'user' ? 'User' : m.role}: ${m.content}`),
      ].join('\n\n');

      const { temperature, maxTokens } = getGeminiParams();

      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (useBearer) {
        headers.Authorization = `Bearer ${process.env.GEMINI_ACCESS_TOKEN}`;
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          prompt: { text: promptText },
          temperature,
          maxOutputTokens: maxTokens,
        }),
      });

      if (!response.ok) {
        // Registrar status y body para depuración local y seguir con fallback a otros proveedores
        const bodyText = await response.text();
        console.error('Gemini API returned non-OK:', response.status, response.statusText, bodyText);
        // En modo desarrollo devolvemos el body de error al cliente para poder depurar desde el navegador.
        if (process.env.NODE_ENV !== 'production') {
          return NextResponse.json(
            {
              message: 'Gemini API returned non-OK',
              status: response.status,
              statusText: response.statusText,
              geminiError: bodyText,
            },
            { status: 502 }
          );
        }
        // En producción seguimos con el fallback a OpenAI/Groq si están configurados
      } else {
        const data = await response.json();

        // Intentar extraer el texto en posibles campos de respuesta
        const assistantMessage =
          data?.candidates?.[0]?.output ||
          data?.candidates?.[0]?.content ||
          data?.output?.[0]?.content?.text ||
          data?.output ||
          data?.result ||
          // algunos endpoints devuelven `candidates[0].content[0].text` u otros formatos
          (data?.candidates?.[0]?.content?.[0]?.text) ||
          JSON.stringify(data);

        return NextResponse.json({ message: assistantMessage });
      }
    }

    // OPCIÓN 1: Usar OpenAI (requiere OPENAI_API_KEY en .env.local)
    if (process.env.OPENAI_API_KEY) {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: AI_CONFIG.models.openai.fast,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...contextMessages,
          ],
          temperature: AI_CONFIG.generation.temperature,
          max_tokens: AI_CONFIG.generation.maxTokens,
          top_p: AI_CONFIG.generation.topP,
          frequency_penalty: AI_CONFIG.generation.frequencyPenalty,
          presence_penalty: AI_CONFIG.generation.presencePenalty,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`);
      }

      const data = await response.json();
      const assistantMessage = data.choices[0].message.content;

      return NextResponse.json({ message: assistantMessage });
    }

    // OPCIÓN 2: Usar Groq (GRATIS - requiere GROQ_API_KEY)
    if (process.env.GROQ_API_KEY) {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: AI_CONFIG.models.groq.fast,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...contextMessages,
          ],
          temperature: AI_CONFIG.generation.temperature,
          max_tokens: AI_CONFIG.generation.maxTokens,
        }),
      });

      if (!response.ok) {
        throw new Error(`Groq API error: ${response.statusText}`);
      }

      const data = await response.json();
      const assistantMessage = data.choices[0].message.content;

      return NextResponse.json({ message: assistantMessage });
    }

    // Si no hay API keys configuradas, devolver mensaje de error amigable
    return NextResponse.json(
      {
        message:
          'Lo siento, el asistente de IA no está configurado actualmente. Por favor, contacta directamente a Michel en contacto@michelpalma.com o visita su LinkedIn.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error en API de chat:', error);
    return NextResponse.json(
      {
        message:
          'Lo siento, ocurrió un error al procesar tu mensaje. Por favor, intenta de nuevo o contacta directamente a Michel.',
      },
      { status: 500 }
    );
  }
}
