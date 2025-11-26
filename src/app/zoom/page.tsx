"use client";

import SesionesZoom from '@/components/sections/SesionesZoom';

export default function ZoomPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Zoom / Sesiones en vivo</h1>
        <SesionesZoom />
      </div>
    </main>
  );
}
