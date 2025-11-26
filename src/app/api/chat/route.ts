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
    const { messages, provider = 'gemini' } = body;

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

    // Lógica de selección de proveedor
    switch (provider) {
      case 'gemini':
        if (process.env.GEMINI_API_KEY || process.env.GEMINI_ACCESS_TOKEN) {
          const model = process.env.GEMINI_MODEL || AI_CONFIG.models.gemini.fast;

          // Prefer the stable v1beta endpoint for newer models
          const baseEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

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
              contents: [{ parts: [{ text: promptText }] }],
              generationConfig: {
                temperature,
                maxOutputTokens: maxTokens,
              },
            }),
          });

          if (!response.ok) {
            const bodyText = await response.text();
            console.error('Gemini API returned non-OK:', response.status, response.statusText, bodyText);
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
            throw new Error('Gemini API error');
          }

          const data = await response.json();

          // Intentar extraer el texto en posibles campos de respuesta
          const assistantMessage =
            data?.candidates?.[0]?.content?.parts?.[0]?.text ||
            data?.candidates?.[0]?.output ||
            data?.candidates?.[0]?.content ||
            data?.output?.[0]?.content?.text ||
            data?.output ||
            data?.result ||
            JSON.stringify(data);

          console.log('✅ Respuesta de Gemini');
          return NextResponse.json({ message: assistantMessage, provider: 'gemini' });
        }
        break;

      case 'gemini-pago':
        if (process.env.GEMINI_API_KEY_PAGO) {
          const model = process.env.GEMINI_MODEL_PAGO || 'gemini-2.0-flash-exp';

          const baseEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
          const endpoint = `${baseEndpoint}?key=${process.env.GEMINI_API_KEY_PAGO}`;

          const promptText = [
            SYSTEM_PROMPT,
            ...contextMessages.map((m) => `${m.role === 'user' ? 'User' : m.role}: ${m.content}`),
          ].join('\n\n');

          const temperature = process.env.GEMINI_TEMPERATURE_PAGO
            ? Number(process.env.GEMINI_TEMPERATURE_PAGO)
            : 0.5;
          const maxTokens = process.env.GEMINI_MAX_TOKENS_PAGO
            ? Number(process.env.GEMINI_MAX_TOKENS_PAGO)
            : 2048;

          const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: promptText }] }],
              generationConfig: {
                temperature: isFinite(temperature) ? temperature : 0.5,
                maxOutputTokens: isFinite(maxTokens) ? maxTokens : 2048,
              },
            }),
          });

          if (!response.ok) {
            const bodyText = await response.text();
            console.error('Gemini Pago API returned non-OK:', response.status, response.statusText, bodyText);
            if (process.env.NODE_ENV !== 'production') {
              return NextResponse.json(
                {
                  message: 'Gemini Pago API returned non-OK',
                  status: response.status,
                  statusText: response.statusText,
                  geminiError: bodyText,
                },
                { status: 502 }
              );
            }
            throw new Error('Gemini Pago API error');
          }

          const data = await response.json();

          const assistantMessage =
            data?.candidates?.[0]?.content?.parts?.[0]?.text ||
            data?.candidates?.[0]?.output ||
            data?.candidates?.[0]?.content ||
            data?.output?.[0]?.content?.text ||
            data?.output ||
            data?.result ||
            JSON.stringify(data);

          console.log('✅ Respuesta de Gemini 2.0 (Pago)');
          return NextResponse.json({ message: assistantMessage, provider: 'gemini-pago' });
        }
        break;

      case 'openai':
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

          console.log('✅ Respuesta de OpenAI');
          return NextResponse.json({ message: assistantMessage, provider: 'openai' });
        }
        break;

      case 'groq':
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

          console.log('✅ Respuesta de Groq');
          return NextResponse.json({ message: assistantMessage, provider: 'groq' });
        }
        break;

      case 'anthropic':
        if (process.env.ANTHROPIC_API_KEY) {
          const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': process.env.ANTHROPIC_API_KEY,
              'anthropic-version': '2023-06-01',
            },
            body: JSON.stringify({
              model: AI_CONFIG.models.anthropic.fast,
              max_tokens: AI_CONFIG.generation.maxTokens,
              messages: contextMessages,
              system: SYSTEM_PROMPT,
            }),
          });

          if (!response.ok) {
            throw new Error(`Anthropic API error: ${response.statusText}`);
          }

          const data = await response.json();
          const assistantMessage = data.content[0].text;

          console.log('✅ Respuesta de Claude (Anthropic)');
          return NextResponse.json({ message: assistantMessage, provider: 'anthropic' });
        }
        break;
    }

    // Fallback si el proveedor seleccionado no está configurado o falla
    return NextResponse.json(
      {
        message:
          `El proveedor ${provider} no está configurado o no tienes API Key. Por favor verifica tu archivo .env.local`,
      },
      { status: 400 }
    );

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
