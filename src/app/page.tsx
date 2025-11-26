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

      </main>
    </div>
  );
}
