'use client';

import { Bot, User } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface ChatBubbleProps {
  message: Message;
}

// Componente simple para renderizar markdown básico
function SimpleMarkdown({ content }: { content: string }) {
  // Convertir saltos de línea a <br>
  const safeContent = typeof content === 'string' ? content : JSON.stringify(content || '');
  const lines = safeContent.split('\n');

  return (
    <div className="text-sm leading-snug">
      {lines.map((line, index) => {
        // Detectar listas con •
        if (line.trim().startsWith('•')) {
          return (
            <div key={index} className="flex gap-2 my-0.5 items-start">
              <span className="text-red-400 mt-0.5">▸</span>
              <span>{line.trim().substring(1).trim()}</span>
            </div>
          );
        }
        // Detectar listas con -
        if (line.trim().startsWith('-')) {
          return (
            <div key={index} className="flex gap-2 my-0.5 items-start">
              <span className="text-red-400 mt-0.5">▸</span>
              <span>{line.trim().substring(1).trim()}</span>
            </div>
          );
        }
        // Detectar títulos con ###
        if (line.trim().startsWith('###')) {
          return (
            <h4 key={index} className="font-semibold text-red-300 mt-2 mb-1">
              {line.replace(/^###\s*/, '')}
            </h4>
          );
        }
        // Detectar títulos con ##
        if (line.trim().startsWith('##')) {
          return (
            <h3 key={index} className="font-bold text-red-200 mt-3 mb-1">
              {line.replace(/^##\s*/, '')}
            </h3>
          );
        }
        // Línea normal
        return line.trim() ? (
          <p key={index} className="mb-1">
            {line}
          </p>
        ) : (
          <br key={index} />
        );
      })}
    </div>
  );
}

export default function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isUser
            ? 'bg-gray-700 border-2 border-gray-600'
            : 'bg-gradient-to-br from-red-600 to-red-700 border-2 border-red-500'
          }`}
      >
        {isUser ? (
          <User className="w-4 h-4 text-gray-300" />
        ) : (
          <Bot className="w-4 h-4 text-white" />
        )}
      </div>

      {/* Mensaje */}
      <div
        className={`flex-1 max-w-[85%] ${isUser
            ? 'bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-600'
            : 'bg-gradient-to-r from-red-900/50 to-red-800/50 border border-red-700/50'
          } rounded-lg p-2.5 shadow-lg`}
      >
        <SimpleMarkdown content={message.content} />
        <div className="text-xs text-gray-500 mt-2">
          {new Date(message.timestamp).toLocaleTimeString('es-PE', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </div>
    </div>
  );
}
