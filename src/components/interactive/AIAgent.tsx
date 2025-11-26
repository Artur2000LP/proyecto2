'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, X, Minimize2, Maximize2 } from 'lucide-react';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
import ChatSuggestions from './ChatSuggestions';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export default function AIAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `¡Hola! Soy el asistente de Michel Palma.\n\nPuedo ayudarte con:\n• Proyectos y experiencia\n• Habilidades técnicas\n• Cursos y contacto\n\n¿Qué necesitas?`,
      timestamp: Date.now(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [selectedProvider, setSelectedProvider] = useState<'gemini' | 'gemini-pago' | 'openai' | 'groq' | 'anthropic'>('gemini');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    // Agregar mensaje del usuario
    const userMessage: Message = {
      role: 'user',
      content: content.trim(),
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Llamar a la API del agente
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          provider: selectedProvider,
        }),
      });

      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }

      const data = await response.json();

      // Agregar respuesta del asistente
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.provider ? `[${data.provider.toUpperCase()}] ${data.message}` : data.message,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta de nuevo.',
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  return (
    <>
      {/* Botón flotante para abrir el chat */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-full p-4 shadow-lg hover:shadow-red-500/50 transition-all duration-300 group animate-pulse-red"
          aria-label="Abrir chat con IA"
        >
          <Sparkles className="w-6 h-6" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-bounce">
            IA
          </span>
        </button>
      )}

      {/* Ventana del chat */}
      {isOpen && (
        <div
          className={`fixed ${isMinimized ? 'bottom-6 right-6 w-72' : 'bottom-6 right-6 w-80 lg:w-96'
            } z-50 bg-gray-900 border-2 border-red-700 rounded-lg shadow-2xl shadow-red-900/50 flex flex-col transition-all duration-300 ${isMinimized ? 'h-16' : 'h-[550px] lg:h-[600px]'
            }`}
        >
          {/* Header del chat */}
          <div className="bg-gradient-to-r from-red-900 to-red-800 p-3 rounded-t-lg flex items-center justify-between border-b border-red-700">
            <div className="flex items-center gap-2">
              <div className="bg-red-600 rounded-full p-1.5">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm">Asistente IA</h3>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-red-200">Vía:</span>
                  <select
                    value={selectedProvider}
                    onChange={(e) => setSelectedProvider(e.target.value as 'gemini' | 'gemini-pago' | 'openai' | 'groq' | 'anthropic')}
                    className="bg-red-950/50 text-xs text-white border border-red-700 rounded px-1 py-0.5 focus:outline-none focus:border-red-500"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <option value="gemini">Gemini (Gratis)</option>
                    <option value="gemini-pago">Gemini 2.0 (Pago)</option>
                    <option value="openai">OpenAI</option>
                    <option value="groq">Groq</option>
                    <option value="anthropic">Claude (Anthropic)</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:bg-red-800 p-2 rounded transition-colors"
                aria-label={isMinimized ? 'Maximizar' : 'Minimizar'}
              >
                {isMinimized ? (
                  <Maximize2 className="w-4 h-4" />
                ) : (
                  <Minimize2 className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-red-800 p-2 rounded transition-colors"
                aria-label="Cerrar chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Contenido del chat (oculto cuando minimizado) */}
          {!isMinimized && (
            <>
              {/* Área de mensajes */}
              <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-950">
                {messages.map((message, index) => (
                  <ChatBubble key={index} message={message} />
                ))}
                {isLoading && (
                  <div className="flex items-center gap-2 text-red-400">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                    <span className="text-sm">Escribiendo...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Sugerencias de preguntas */}
              {messages.length <= 1 && (
                <div className="px-3">
                  <ChatSuggestions onSuggestionClick={handleSuggestionClick} />
                </div>
              )}

              {/* Input de mensaje */}
              <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
            </>
          )}
        </div>
      )}
    </>
  );
}
