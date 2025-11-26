"use client";

import CourseSessionsSection from '@/components/sections/CourseSessionsSection';

export default function SesionesPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Sesiones del Curso</h1>
        <CourseSessionsSection />
      </div>
    </main>
  );
}
