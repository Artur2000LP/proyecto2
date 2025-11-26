"use client";

import Link from 'next/link';
import YouTubeVideo from '@/components/ui/YouTubeVideo';

const VIDEOS = [
  { id: '3u1k7Jyn434', title: 'ChatGPT - Tutorial' },
  { id: '9sJ7-M2seGA', title: 'Midjourney - Tutorial' },
  { id: 'Fi3AJZZregI', title: 'GitHub Copilot - Demo' },
  { id: 'UIZAiXYceBI', title: 'Google Gemini - Demo' },
  { id: 'BuSPeb48S3Q', title: 'Meta AI - Demo' },
  { id: 'zogHIfgIrGU', title: 'DeepSeek - Demo' },
];

export default function VideosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-red-950 to-gray-950 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-6">Cursos</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {VIDEOS.map((v) => (
            <Link key={v.id} href={`/cursos/${v.id}`} className="block">
              <div className="group bg-slate-900/40 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-red-500/50 hover:shadow-red-900/20 hover:shadow-xl transition-all duration-300 p-4">
                <div className="relative overflow-hidden rounded-lg">
                  <YouTubeVideo videoId={v.id} title={v.title} className="w-full aspect-video object-cover transform group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300 pointer-events-none" />
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">{v.title}</h3>
                  <span className="text-xs font-medium bg-red-500/20 text-red-300 px-2 py-1 rounded border border-red-500/30 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                    Ver curso
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
