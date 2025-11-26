'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/ui/Navigation';
import HeroSection from '@/components/sections/HeroSection';
import Link from 'next/link';
import AIAgent from '@/components/interactive/AIAgent';

export default function Home() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  useEffect(() => {
    // Escuchar eventos de apertura/cierre del modal de video
    const handleVideoModalOpen = () => setIsVideoModalOpen(true);
    const handleVideoModalClose = () => setIsVideoModalOpen(false);

    window.addEventListener('videoModalOpen', handleVideoModalOpen);
    window.addEventListener('videoModalClose', handleVideoModalClose);

    return () => {
      window.removeEventListener('videoModalOpen', handleVideoModalOpen);
      window.removeEventListener('videoModalClose', handleVideoModalClose);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-red-950 to-gray-950 text-white">
      <Navigation />
      
      {/* Agente IA flotante - oculto cuando hay modal de video abierto */}
      {!isVideoModalOpen && <AIAgent />}
      
      <main>
        <section id="hero">
          <HeroSection />
        </section>
        
        {/* Enlaces rápidos a las páginas dedicadas (secciones movidas a rutas) */}
        <section id="explore" className="py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Accede directamente a las secciones del curso</h2>
            <p className="text-gray-300 mb-6">Hemos movido las sesiones, videos y recursos a páginas separadas. Usa los enlaces a continuación.</p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/zoom" className="inline-block bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg">Zoom</Link>
              <Link href="/sesiones" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">Sesiones</Link>
              <Link href="/videos" className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg">Aplicaciones IA</Link>
              <Link href="/contact" className="inline-block bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-lg">Contacto</Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
