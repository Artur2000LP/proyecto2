"use client";

import ContactSection from '@/components/sections/ContactSection';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Contacto</h1>
        <ContactSection />
      </div>
    </main>
  );
}
