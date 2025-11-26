"use client";

import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function VideoPage() {
  const params = useParams();
  const id = params?.id || '';
  const title = `Video ${id}`;
  const embedUrl = `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`;

  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([
    { role: 'assistant', content: `Hola, soy el asistente para este video: ${title}.` }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<'gemini' | 'gemini-pago' | 'openai' | 'groq' | 'anthropic'>('gemini');

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
            { role: 'system', content: `Eres un asistente para el video ${title}. Responde con claridad y ayuda práctica.` },
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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 bg-black rounded overflow-hidden">
            <div style={{ aspectRatio: '16/9' }}>
              <iframe src={embedUrl} title={title} className="w-full h-full" allowFullScreen />
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg border border-red-700/50 p-4 shadow-xl flex flex-col h-full">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-white">Asistente del video</h3>
              <select
                value={selectedProvider}
                onChange={(e) => setSelectedProvider(e.target.value as any)}
                className="text-xs border border-red-700 bg-gray-800 text-white rounded px-2 py-1 focus:outline-none focus:border-red-500"
              >
                <option value="gemini">Gemini</option>
                <option value="gemini-pago">Gemini 2.0</option>
                <option value="openai">OpenAI</option>
                <option value="groq">Groq</option>
                <option value="anthropic">Claude</option>
              </select>
            </div>
            <div className="space-y-3 mb-3 flex-1 overflow-y-auto min-h-0">
              {chatMessages.map((m, i) => (
                <div key={i} className={`${m.role === 'user' ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-block p-2 rounded ${m.role === 'user' ? 'bg-gray-700 text-white' : 'bg-red-900/50 text-white border border-red-700/50'}`}>
                    {m.content}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <textarea value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} className="flex-1 border border-gray-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-red-500" rows={2} placeholder="Escribe tu pregunta..." />
              <button onClick={handleSendMessage} disabled={isLoading || !inputMessage.trim()} className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white px-4 py-2 rounded transition">Enviar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
