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
        body: JSON.stringify({ messages: [
          { role: 'system', content: `Eres un asistente para el video ${title}. Responde con claridad y ayuda práctica.` },
          ...chatMessages,
          userMessage,
        ] }),
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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">{title}</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-black rounded overflow-hidden">
            <div style={{ aspectRatio: '16/9' }}>
              <iframe src={embedUrl} title={title} className="w-full h-full" allowFullScreen />
            </div>
          </div>

          <div className="bg-white rounded-lg border p-4">
            <h3 className="font-semibold mb-2">Asistente del video</h3>
            <div className="space-y-3 mb-3 max-h-80 overflow-y-auto">
              {chatMessages.map((m, i) => (
                <div key={i} className={`${m.role === 'user' ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-block p-2 rounded ${m.role === 'user' ? 'bg-gray-200' : 'bg-red-50 text-gray-800'}`}>
                    {m.content}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <textarea value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} className="flex-1 border p-2 rounded" rows={2} />
              <button onClick={handleSendMessage} disabled={isLoading || !inputMessage.trim()} className="bg-red-600 text-white px-4 py-2 rounded">Enviar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
