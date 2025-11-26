'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Play, ExternalLink } from 'lucide-react';

interface YouTubeVideoProps {
  videoId: string;
  title: string;
  description?: string;
  className?: string;
}

export default function YouTubeVideo({ videoId, title, description, className = '' }: YouTubeVideoProps) {
  const router = useRouter();

  const handleOpen = () => {
    // Redirigir a la página interna de video
    router.push(`/cursos/${finalVideoId}`);
  };

  // Extraer ID del video de diferentes formatos de URL de YouTube
  const extractVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
    return match ? match[1] : url;
  };

  const finalVideoId = extractVideoId(videoId);
  const thumbnailUrl = `https://img.youtube.com/vi/${finalVideoId}/maxresdefault.jpg`;

  return (
    <>
      <div className={`relative w-full aspect-video rounded-lg overflow-hidden cursor-pointer group ${className}`}>
        {/* Thumbnail */}
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            // Fallback a thumbnail de menor calidad si falla
            (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${finalVideoId}/hqdefault.jpg`;
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />

        {/* Play Button */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          onClick={handleOpen}
        >
          <div className="bg-red-600 hover:bg-red-700 text-white rounded-full p-4 transform group-hover:scale-110 transition-all duration-300 shadow-lg">
            <Play className="w-8 h-8 ml-1" fill="currentColor" />
          </div>
        </div>

        {/* Duration Badge (opcional) */}
        <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs px-2 py-1 rounded">
          Video
        </div>

        {/* YouTube Logo */}
        <div className="absolute top-3 left-3 bg-red-600 text-white text-xs px-2 py-1 rounded font-bold">
          YouTube
        </div>

        {/* External Link: usar botón para evitar anidar <a> cuando el componente se envuelve en <Link> */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            window.open(`https://www.youtube.com/watch?v=${finalVideoId}`, '_blank', 'noopener');
          }}
          className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-colors duration-200"
          aria-label="Abrir en YouTube"
        >
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>

      {/* Ahora abrimos la página interna `/cursos/[id]` en lugar de usar modal */}
    </>
  );
}