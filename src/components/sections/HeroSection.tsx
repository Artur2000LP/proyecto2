'use client';

import { motion, Variants } from 'framer-motion';
import { Sparkles, Zap, BookOpen, X, Send } from 'lucide-react';
import { useState, useEffect } from 'react';

// Componente para formatear mensajes con estructura
function FormattedMessage({ content }: { content: string }) {
  const lines = content.split('\n');
  
  return (
    <div className="space-y-2">
      {lines.map((line, idx) => {
        if (!line.trim()) return <div key={idx} className="h-2" />;
        
        if (line.trim().startsWith('-') || line.trim().startsWith('*')) {
          return (
            <div key={idx} className="flex gap-2">
              <span className="text-blue-400 flex-shrink-0">•</span>
              <span>{line.trim().substring(1).trim()}</span>
            </div>
          );
        }
        
        if (/^\d+\./.test(line.trim())) {
          const parts = line.trim().split(/^\d+\.\s*/);
          return (
            <div key={idx} className="flex gap-2">
              <span className="text-blue-400 flex-shrink-0 font-semibold">{line.trim().match(/^\d+\./)?.[0]}</span>
              <span>{parts[1]}</span>
            </div>
          );
        }
        
        if (line.includes('**')) {
          const formatted = line.split('**').map((part, i) => 
            i % 2 === 1 ? <strong key={i} className="font-bold text-white">{part}</strong> : part
          );
          return <p key={idx}>{formatted}</p>;
        }
        
        return <p key={idx}>{line}</p>;
      })}
    </div>
  );
}

// Componente del Modal con Video y Chat
function VideoModalWithChat({ onClose }: { onClose: () => void }) {
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([
    { 
      role: 'assistant', 
      content: '¡Hola! Acabo de mostrarte el video sobre el proyecto "Guardianes de Choquequirao". ¿Tienes alguna pregunta sobre el proyecto, cómo ayudar, o qué puedes hacer para proteger Choquequirao?' 
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<'openai' | 'groq' | 'gemini' | 'gemini-pago' | 'anthropic'>('gemini');

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
            { 
              role: 'system', 
              content: `Eres un asistente especializado en el proyecto "Guardianes de Choquequirao". Responde preguntas sobre el video que acaban de ver sobre este proyecto estudiantil de conservación del sitio arqueológico de Choquequirao. Enfócate en explicar el problema de la basura, las acciones del proyecto, y cómo las personas pueden ayudar.` 
            },
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative bg-slate-900 rounded-2xl shadow-2xl border-2 border-blue-500/30 max-w-7xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 shadow-lg transition-all z-10"
          aria-label="Cerrar"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Contenido en grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 h-full max-h-[85vh] items-start">
          {/* Columna izquierda: Video */}
          <div className="flex flex-col h-[500px] lg:h-[600px]">
            <h3 className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent flex-shrink-0">
              Mensaje Importante sobre Choquequirao
            </h3>
            
            <div className="relative w-full flex-1 rounded-lg overflow-hidden bg-black">
              <iframe
                src="https://drive.google.com/file/d/1z8WndVLwKj0zNdXnt-tmMwwziboD9F8_/preview"
                className="w-full h-full"
                allow="autoplay"
                allowFullScreen
              />
            </div>

            <div className="mt-4 text-center flex-shrink-0">
              <p className="text-gray-300 text-sm">
                Proyecto estudiantil "Guardianes de Choquequirao" - IE Manuel González Prada
              </p>
            </div>
          </div>

          {/* Columna derecha: Chat IA */}
          <div className="flex flex-col bg-slate-800/50 rounded-xl border border-blue-500/20 p-4 h-[500px] lg:h-[600px] overflow-hidden">
            <div className="flex items-center justify-between mb-3 flex-shrink-0">
              <h3 className="font-semibold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-400" />
                Pregúntame sobre el proyecto
              </h3>
              <select
                value={selectedProvider}
                onChange={(e) => setSelectedProvider(e.target.value as any)}
                className="text-xs border border-blue-700 bg-slate-800 text-white rounded px-2 py-1 focus:outline-none focus:border-blue-500"
              >
                <option value="openai">OpenAI</option>
                <option value="groq">Groq</option>
                <option value="gemini">Gemini (Gratis)</option>
                <option value="gemini-pago">Gemini 2.0 (Pago)</option>
                <option value="anthropic">Claude (Anthropic)</option>
              </select>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 mb-3 min-h-0 max-h-[calc(100%-140px)]">
              {chatMessages.map((m, i) => (
                <div key={i} className={`${m.role === 'user' ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-block p-3 rounded-lg text-sm max-w-[85%] ${
                    m.role === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-slate-700/80 text-white border border-blue-500/30'
                  }`}>
                    {m.role === 'assistant' ? <FormattedMessage content={m.content} /> : m.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="text-left">
                  <div className="inline-block p-3 rounded-lg bg-slate-700/80 border border-blue-500/30">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                      <span className="ml-2 text-sm text-white">Escribiendo...</span>
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3 flex-shrink-0 items-end">
              <textarea 
                value={inputMessage} 
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                className="flex-1 border-2 border-slate-600 bg-slate-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none transition-all" 
                rows={2} 
                placeholder="Pregunta sobre el proyecto... (Enter para enviar)" 
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputMessage.trim()}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-lg flex items-center justify-center transition-all shadow-lg hover:shadow-blue-500/50 disabled:shadow-none"
                style={{ minWidth: '48px', width: '48px', height: '48px' }}
                aria-label="Enviar mensaje"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function HeroSection() {
  const titleText = "Bienvenido a los Cursos de IA";
  const [showVideoModal, setShowVideoModal] = useState(false);
  
  useEffect(() => {
    // Calcular duración de la animación de escritura
    // staggerChildren: 0.05 * número de caracteres + delayChildren: 0.3 + tiempo extra
    const animationDuration = (titleText.length * 0.05 + 0.3 + 0.5) * 1000; // en milisegundos
    
    const timer = setTimeout(() => {
      setShowVideoModal(true);
    }, animationDuration + 2000); // +2 segundos extra después de terminar
    
    return () => clearTimeout(timer);
  }, []);

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.3
      }
    }
  };

  const child: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100
      }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-cyan-900/20" />

        {/* Animated particles */}
        <div className="absolute inset-0">
          {[
            { left: '10%', top: '20%' },
            { left: '85%', top: '15%' },
            { left: '25%', top: '60%' },
            { left: '70%', top: '45%' },
            { left: '15%', top: '80%' },
            { left: '90%', top: '70%' },
            { left: '45%', top: '25%' },
            { left: '60%', top: '85%' },
            { left: '20%', top: '40%' },
            { left: '80%', top: '30%' },
            { left: '35%', top: '75%' },
            { left: '65%', top: '55%' },
            { left: '5%', top: '65%' },
            { left: '95%', top: '50%' },
            { left: '50%', top: '10%' },
            { left: '75%', top: '90%' },
            { left: '30%', top: '35%' },
            { left: '55%', top: '70%' },
            { left: '40%', top: '15%' },
            { left: '85%', top: '80%' }
          ].map((position, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              style={{
                left: position.left,
                top: position.top,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <motion.div
          className="mb-12"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-center leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent inline-block">
              {titleText.split("").map((char, index) => (
                <motion.span key={index} variants={child} className="inline-block">
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </span>
          </h1>
        </motion.div>


        {/* Atajos y recomendaciones */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mb-8 sm:mb-12 px-4"
        >
          <div className="max-w-3xl mx-auto bg-slate-800/30 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-blue-500/20 hover:border-blue-500/30 transition-all duration-300">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white text-center">Accesos rápidos y recomendaciones</h2>
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              {/* Atajos */}
              <div className="flex-1 space-y-3">
                <a href="/cursos" className="block bg-blue-600/80 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow transition-all text-center">Ver todos los cursos</a>
                <a href="/cursos/Fi3AJZZregI" className="block bg-cyan-600/80 hover:bg-cyan-700 text-white font-semibold py-3 px-6 rounded-lg shadow transition-all text-center">Ir al curso: GitHub Copilot</a>
                <a href="/cursos/UIZAiXYceBI" className="block bg-purple-600/80 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow transition-all text-center">Ir al curso: Google Gemini</a>
              </div>
              {/* Recomendaciones */}
              <div className="flex-1 space-y-3 text-gray-200 text-left">
                <div className="bg-slate-900/60 rounded-lg p-4 border border-blue-500/10">
                  <span className="font-semibold text-blue-400">Recomendación:</span> Antes de iniciar, revisa los requisitos del curso y ten a la mano tu cuenta de Google/GitHub si es necesario.
                </div>
                <div className="bg-slate-900/60 rounded-lg p-4 border border-blue-500/10">
                  <span className="font-semibold text-blue-400">Tip:</span> Toma notas y realiza las prácticas sugeridas para aprovechar al máximo cada módulo.
                </div>
                <div className="bg-slate-900/60 rounded-lg p-4 border border-blue-500/10">
                  <span className="font-semibold text-blue-400">¿Dudas?</span> Usa el chat de la derecha para preguntar lo que necesites sobre los cursos.
                </div>
              </div>
            </div>
          </div>
        </motion.div>


      </div>

      {/* Modal de Video con Chat IA */}
      {showVideoModal && (
        <VideoModalWithChat onClose={() => setShowVideoModal(false)} />
      )}
    </div>
  );
}