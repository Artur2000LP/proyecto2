'use client';

import { motion, Variants } from 'framer-motion';
import { Sparkles, Zap, BookOpen } from 'lucide-react';

export default function HeroSection() {
  const titleText = "Bienvenido a los Cursos de IA";

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.3
      }
    }
  };

  const child: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100
      }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-cyan-900/20" />

        {/* Animated particles */}
        <div className="absolute inset-0">
          {[
            { left: '10%', top: '20%' },
            { left: '85%', top: '15%' },
            { left: '25%', top: '60%' },
            { left: '70%', top: '45%' },
            { left: '15%', top: '80%' },
            { left: '90%', top: '70%' },
            { left: '45%', top: '25%' },
            { left: '60%', top: '85%' },
            { left: '20%', top: '40%' },
            { left: '80%', top: '30%' },
            { left: '35%', top: '75%' },
            { left: '65%', top: '55%' },
            { left: '5%', top: '65%' },
            { left: '95%', top: '50%' },
            { left: '50%', top: '10%' },
            { left: '75%', top: '90%' },
            { left: '30%', top: '35%' },
            { left: '55%', top: '70%' },
            { left: '40%', top: '15%' },
            { left: '85%', top: '80%' }
          ].map((position, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              style={{
                left: position.left,
                top: position.top,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <motion.div
          className="mb-12"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-center leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent inline-block">
              {titleText.split("").map((char, index) => (
                <motion.span key={index} variants={child} className="inline-block">
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </span>
          </h1>
        </motion.div>


        {/* Atajos y recomendaciones */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mb-8 sm:mb-12 px-4"
        >
          <div className="max-w-3xl mx-auto bg-slate-800/30 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-blue-500/20 hover:border-blue-500/30 transition-all duration-300">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white text-center">Accesos rápidos y recomendaciones</h2>
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              {/* Atajos */}
              <div className="flex-1 space-y-3">
                <a href="/cursos" className="block bg-blue-600/80 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow transition-all text-center">Ver todos los cursos</a>
                <a href="/cursos/Fi3AJZZregI" className="block bg-cyan-600/80 hover:bg-cyan-700 text-white font-semibold py-3 px-6 rounded-lg shadow transition-all text-center">Ir al curso: GitHub Copilot</a>
                <a href="/cursos/UIZAiXYceBI" className="block bg-purple-600/80 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow transition-all text-center">Ir al curso: Google Gemini</a>
              </div>
              {/* Recomendaciones */}
              <div className="flex-1 space-y-3 text-gray-200 text-left">
                <div className="bg-slate-900/60 rounded-lg p-4 border border-blue-500/10">
                  <span className="font-semibold text-blue-400">Recomendación:</span> Antes de iniciar, revisa los requisitos del curso y ten a la mano tu cuenta de Google/GitHub si es necesario.
                </div>
                <div className="bg-slate-900/60 rounded-lg p-4 border border-blue-500/10">
                  <span className="font-semibold text-blue-400">Tip:</span> Toma notas y realiza las prácticas sugeridas para aprovechar al máximo cada módulo.
                </div>
                <div className="bg-slate-900/60 rounded-lg p-4 border border-blue-500/10">
                  <span className="font-semibold text-blue-400">¿Dudas?</span> Usa el chat de la derecha para preguntar lo que necesites sobre los cursos.
                </div>
              </div>
            </div>
          </div>
        </motion.div>


      </div>
    </div>
  );
}