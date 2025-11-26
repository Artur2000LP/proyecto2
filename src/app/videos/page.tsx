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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Aplicaciones IA - Videos</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {VIDEOS.map((v) => (
            <Link key={v.id} href={`/videos/${v.id}`} className="block">
              <div className="group bg-white rounded-lg shadow hover:shadow-lg transition p-3">
                <YouTubeVideo videoId={v.id} title={v.title} className="rounded-md" />
                <h3 className="mt-3 text-lg font-semibold text-gray-800">{v.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
