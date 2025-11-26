'use client';

import { motion } from 'framer-motion';
import { Play, Calendar, Clock, Users, Download, ExternalLink, Video, Monitor, Camera } from 'lucide-react';

interface ZoomSession {
  id: number;
  title: string;
  date: string;
  duration: string;
  topics: string[];
  recordingUrl: string;
  status: 'completed' | 'live' | 'upcoming';
}

const zoomSessions: ZoomSession[] = [
  {
    id: 1,
    title: "Sesión N°01 - Fundamentos de IA",
    date: "2025-10-15",
    duration: "90 min",
    topics: ["Introducción a la IA", "Conceptos básicos", "Herramientas principales"],
    recordingUrl: "https://zoom.us/rec/play/Aueg4m7iD-WHK43FJ4yat-W3EWe43DVymoyfXEK3bDEvE6kzn20RNGkWidCLMGy37TBe2EmqczArcOh-.dfhpv1BLNZ_0RmAH",
    status: 'completed'
  },
  {
    id: 2,
    title: "Sesión N°02 - Prompting Avanzado",
    date: "2025-10-17",
    duration: "85 min",
    topics: ["Técnicas de prompting", "Optimización", "Casos prácticos"],
    recordingUrl: "https://zoom.us/rec/play/TRkXac4XAA-BBcc0fcAelTeMDvHRrt9x3iw6E6avYYstdG2WxLN1DwLJmRG0PousKaTGj0VQNyKyMV7f.Wvym2YsaZvep-nXT",
    status: 'completed'
  },
  {
    id: 3,
    title: "Sesión N°03 - Automatización con IA",
    date: "2025-10-19",
    duration: "95 min",
    topics: ["Workflows automatizados", "Integración APIs", "Herramientas no-code"],
    recordingUrl: "https://zoom.us/rec/play/xLBn8_-1V7aFwq7wr05TpuXC17f5CtsH_FJLmONZENx9Y07OgGl0iBvoCaVXXbRYQwLqLCPmNPvwr8hD.84BwTul7AqKB9CWm",
    status: 'completed'
  },
  {
    id: 4,
    title: "Sesión N°04 - IA Generativa",
    date: "2025-10-21",
    duration: "88 min",
    topics: ["Generación de contenido", "Modelos de lenguaje", "Aplicaciones creativas"],
    recordingUrl: "https://zoom.us/rec/play/iIL3ERObJyMCL8cKSzOB0-dkURQpzYJWgBVx3dIA8hpT-ENbLNZ39OmUggEh-6ZSjlJ0BvA6z5LKEymg.G_WSQT5y9E-3xRiF",
    status: 'completed'
  },
  {
    id: 5,
    title: "Sesión N°05 - Proyecto Final",
    date: "2025-10-22",
    duration: "100 min",
    topics: ["Implementación práctica", "Casos de estudio", "Q&A final"],
    recordingUrl: "https://zoom.us/rec/play/qyt_HQoa3CBsFLo0koRsYNoEMo5UgqyGZWu6uAKYsQlsKgKKszEDUBoEmUtVlDUP1cZjjVmcQkZNhWfr.mNLacaY0vHi7TZIx",
    status: 'completed'
  }
];

export default function SesionesZoomSection() {
  const handleWatchRecording = (url: string, sessionTitle: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-5 lg:px-9 bg-slate-900/50 min-h-screen flex flex-col">
      <div className="max-w-7xl mx-auto flex-1">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center gap-2 bg-blue-500/20 text-cyan-400 px-3 py-1 rounded-full text-xs font-medium mb-3 border border-blue-500/30">
            <Video size={14} />
            Grabaciones Disponibles
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Sesiones en Vivo por Zoom
            </span>
          </h2>
          <p className="text-sm text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Accede a todas las grabaciones de nuestras sesiones interactivas con contenido exclusivo y ejercicios prácticos.
          </p>
        </motion.div>

        {/* Sessions Grid - Balanceado */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {zoomSessions.map((session, index) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-slate-800/50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-blue-500/20 backdrop-blur-sm"
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="relative flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg text-slate-900 font-bold text-base">
                      <Video className="absolute top-1 right-1 w-4 h-4 text-slate-700 opacity-80" />
                      {session.id}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Monitor size={16} className="text-cyan-400" />
                        <h3 className="text-base font-bold text-white leading-tight">
                          {session.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar size={12} />
                          <span>{new Date(session.date).toLocaleDateString('es-ES', {
                            day: '2-digit',
                            month: '2-digit'
                          })}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={12} />
                          <span>{session.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleWatchRecording(session.recordingUrl, session.title)}
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-400 to-cyan-400 text-slate-900 px-4 py-2 rounded-lg font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 flex-shrink-0"
                  >
                    <Video size={14} />
                    <Play size={12} />
                    Ver Zoom
                  </motion.button>
                </div>

                {/* Topics - Más espaciados */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {session.topics.slice(0, 3).map((topic, topicIndex) => (
                      <span
                        key={topicIndex}
                        className="bg-blue-500/20 text-cyan-400 px-3 py-1 rounded-md text-xs font-medium border border-blue-500/30"
                      >
                        {topic}
                      </span>
                    ))}
                    {session.topics.length > 3 && (
                      <span className="bg-blue-500/20 text-cyan-400 px-3 py-1 rounded-md text-xs font-medium border border-blue-500/30">
                        +{session.topics.length - 3} más
                      </span>
                    )}
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center justify-between pt-3 border-t border-blue-500/20">
                  <div className="flex items-center gap-2 bg-green-500/20 text-green-400 px-3 py-1 rounded-md text-xs font-medium border border-green-500/30">
                    <Camera size={12} className="text-green-400" />
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    Grabación Disponible
                  </div>
                  <div className="text-xs text-gray-500 font-mono flex items-center gap-1">
                    <Video size={10} />
                    #{session.id.toString().padStart(2, '0')}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>


      </div>
    </div>
  );
}