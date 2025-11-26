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

        {/* Instructor Profile */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mb-8 sm:mb-12 px-4"
        >
          <div className="max-w-4xl mx-auto bg-slate-800/30 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-blue-500/20 hover:border-blue-500/30 transition-all duration-300">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
              {/* Profile Image */}
              <div className="relative">
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-gradient-to-r from-blue-400 to-cyan-400 p-1 bg-gradient-to-r from-blue-400 to-cyan-400">
                  <img
                    src="/miPerfil/fotoMichet.jpeg"
                    alt="Mtro. Ing. Michel Palma Vargas"
                    className="w-full h-full object-cover rounded-full bg-slate-800"
                  />
                </div>
                {/* Online indicator */}
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-400 rounded-full border-4 border-slate-900 flex items-center justify-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="mb-3">
                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.8 }}
                    className="text-2xl sm:text-3xl font-bold text-white mb-2"
                  >
                    Mtro. Ing. Michel Palma Vargas
                  </motion.h2>
                  <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-3">
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 2.0 }}
                      className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm font-medium border border-blue-500/30"
                    >
                      Especialista en IA Educativa
                    </motion.span>
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 2.2 }}
                      className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-sm font-medium border border-cyan-500/30"
                    >
                      Innovación Tecnológica
                    </motion.span>
                  </div>
                </div>


                {/* Quick Stats */}
                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 2.4 }}
                    className="flex items-center gap-2 text-gray-400"
                  >
                    <BookOpen className="h-4 w-4 text-blue-400" />
                    <span>5+ Años Experiencia</span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 2.6 }}
                    className="flex items-center gap-2 text-gray-400"
                  >
                    <Sparkles className="h-4 w-4 text-cyan-400" />
                    <span>Especialista UNESCO</span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 2.8 }}
                    className="flex items-center gap-2 text-gray-400"
                  >
                    <Zap className="h-4 w-4 text-blue-400" />
                    <span>Innovador Educativo</span>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Buttons - Casual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.0 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4"
        >
          <a
            href="#sesiones"
            className="bg-slate-800/50 text-gray-300 px-5 sm:px-6 py-2 sm:py-3 rounded-lg font-medium hover:bg-slate-700/60 hover:text-white transition-all duration-200 text-sm sm:text-base text-center border border-slate-700/50"
          >
            Ver Sesiones del Curso
          </a>
          <a
            href="#aplicaciones-ia"
            className="bg-slate-800/30 text-gray-400 px-5 sm:px-6 py-2 sm:py-3 rounded-lg font-medium hover:bg-slate-800/50 hover:text-gray-300 transition-all duration-200 text-sm sm:text-base text-center border border-slate-600/30"
          >
            Explorar Cursos
          </a>
        </motion.div>
      </div>
    </div>
  );
}