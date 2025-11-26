'use client';

import { MessageCircle } from 'lucide-react';

const SUGGESTIONS = [
  "¿Cómo accedo a los cursos gratuitos?",
  "¿Necesito experiencia previa para aprender?",
  "¿Qué obtengo en cada curso?",
  "¿Cómo funciona la asesoría con IA?",
  "¿Cómo obtengo mi certificación?",
];

interface ChatSuggestionsProps {
  onSuggestionClick: (suggestion: string) => void;
}

export default function ChatSuggestions({ onSuggestionClick }: ChatSuggestionsProps) {
  return (
    <div className="p-2 pb-3 bg-gray-900/30 border-t border-red-700/30">
      <p className="text-xs text-gray-400 mb-2 flex items-center gap-1">
        <MessageCircle className="w-3 h-3" />
        Sugerencias:
      </p>
      <div className="grid grid-cols-1 gap-1.5">
        {SUGGESTIONS.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSuggestionClick(suggestion)}
            className="text-xs bg-red-900/20 hover:bg-red-800/40 text-red-300 border border-red-700/30 px-2.5 py-1 rounded text-left transition-all duration-200 hover:border-red-600/50"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}
