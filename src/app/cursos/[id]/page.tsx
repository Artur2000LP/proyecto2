"use client";


import { useParams } from 'next/navigation';
import { useState } from 'react';
import { Send } from 'lucide-react';

// Componente para formatear texto con saltos de línea y bullets
function FormattedMessage({ content }: { content: string }) {
  // Dividir por líneas y renderizar con formato
  const lines = content.split('\n');
  
  return (
    <div className="space-y-2">
      {lines.map((line, idx) => {
        // Si la línea está vacía, agregar espacio
        if (!line.trim()) {
          return <div key={idx} className="h-2" />;
        }
        
        // Si empieza con - o * convertir a bullet
        if (line.trim().startsWith('-') || line.trim().startsWith('*')) {
          return (
            <div key={idx} className="flex gap-2">
              <span className="text-red-400 flex-shrink-0">•</span>
              <span>{line.trim().substring(1).trim()}</span>
            </div>
          );
        }
        
        // Si empieza con número (1. 2. etc)
        if (/^\d+\./.test(line.trim())) {
          const parts = line.trim().split(/^\d+\.\s*/);
          return (
            <div key={idx} className="flex gap-2">
              <span className="text-red-400 flex-shrink-0 font-semibold">{line.trim().match(/^\d+\./)?.[0]}</span>
              <span>{parts[1]}</span>
            </div>
          );
        }
        
        // Si está en negrita (rodeado de **)
        if (line.includes('**')) {
          const formatted = line.split('**').map((part, i) => 
            i % 2 === 1 ? <strong key={i} className="font-bold text-white">{part}</strong> : part
          );
          return <p key={idx}>{formatted}</p>;
        }
        
        // Línea normal
        return <p key={idx}>{line}</p>;
      })}
    </div>
  );
}

// Lista de videos (debería estar en un archivo compartido, pero la replicamos aquí para simplicidad)
const VIDEOS = [
  { id: '3u1k7Jyn434', title: 'ChatGPT - Tutorial' },
  { id: '9sJ7-M2seGA', title: 'Midjourney - Tutorial' },
  { id: 'Fi3AJZZregI', title: 'Get Started with GitHub Copilot in VS Code (2023)' },
  { id: 'UIZAiXYceBI', title: 'Google Gemini - Demo' },
  { id: 'BuSPeb48S3Q', title: 'Meta AI - Demo' },
  { id: 'zogHIfgIrGU', title: 'DeepSeek - Demo' },
];

export default function VideoPage() {

  const params = useParams();
  // Forzar id a string (por si viene como string[])
  let id = params?.id || '';
  if (Array.isArray(id)) id = id[0];
  // Buscar el título del video por id
  const video = VIDEOS.find((v) => v.id === id);
  const videoTitle = video ? video.title : id;
  const title = videoTitle;
  const embedUrl = `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`;

  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([
    { role: 'assistant', content: `Hola, soy el asistente para este video: ${videoTitle}.` }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<'openai' | 'groq' | 'gemini' | 'gemini-pago' | 'anthropic'>('openai');

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    const userMessage = { role: 'user' as const, content: inputMessage };
    setChatMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: `Eres un asistente para el video ${videoTitle}. Responde con claridad y ayuda práctica.` },
            ...chatMessages,
            userMessage,
          ],
          provider: selectedProvider,
        }),
      });
      const data = await response.json();
      setChatMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
    } catch (error) {
      setChatMessages(prev => [...prev, { role: 'assistant', content: 'Error al procesar la solicitud.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-red-950 to-gray-950 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-white">{title}</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 bg-black rounded overflow-hidden h-[500px] lg:h-[600px]">
            <iframe src={embedUrl} title={title} className="w-full h-full" allowFullScreen />
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg border border-red-700/50 p-4 shadow-xl flex flex-col h-[500px] lg:h-[600px] max-h-[600px]">
            <div className="flex items-center justify-between mb-2 flex-shrink-0">
              <h3 className="font-semibold text-white">Asistente del video</h3>
              <select
                value={selectedProvider}
                onChange={(e) => setSelectedProvider(e.target.value as any)}
                className="text-xs border border-red-700 bg-gray-800 text-white rounded px-2 py-1 focus:outline-none focus:border-red-500"
              >
                <option value="openai">OpenAI</option>
                <option value="groq">Groq</option>
                <option value="gemini">Gemini (Gratis)</option>
                <option value="gemini-pago">Gemini 2.0 (Pago)</option>
                <option value="anthropic">Claude (Anthropic)</option>
              </select>
            </div>

            <div className="space-y-3 mb-3 flex-1 overflow-y-auto min-h-0 max-h-full">
              {chatMessages.map((m, i) => (
                <div key={i} className={`${m.role === 'user' ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-block p-3 rounded text-sm ${m.role === 'user' ? 'bg-gray-700 text-white' : 'bg-red-900/50 text-white border border-red-700/50 max-w-full'}`}>
                    {m.role === 'assistant' ? <FormattedMessage content={m.content} /> : m.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="text-left">
                  <div className="inline-block p-2 rounded bg-red-900/50 text-white border border-red-700/50">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                      <span className="ml-2 text-sm">Escribiendo...</span>
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2 flex-shrink-0">
              <textarea value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} className="flex-1 border border-gray-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-red-500 resize-none" rows={2} placeholder="Escribe tu pregunta..." />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputMessage.trim()}
                className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white rounded flex items-center justify-center transition"
                style={{ minWidth: '44px', width: '44px', height: '44px', padding: 0 }}
                aria-label="Enviar mensaje"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
