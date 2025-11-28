'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, FileText, Eye } from 'lucide-react';
import GoogleDrivePDFModal from '@/components/ui/GoogleDrivePDFModal';
import PDFThumbnail from '@/components/ui/PDFThumbnail';

interface Material {
  type: string;
  name: string;
  driveUrl?: string;
  downloadUrl?: string;
}

export default function CourseSessionsSection() {
  const [modalData, setModalData] = useState<{
    isOpen: boolean;
    pdfUrl: string;
    title: string;
    downloadUrl?: string;
  }>({
    isOpen: false,
    pdfUrl: '',
    title: '',
    downloadUrl: ''
  });

  const openPDFModal = (material: Material) => {
    // Si no hay enlace de Google Drive, mostrar mensaje
    if (!material.driveUrl) {
      alert('Enlace de Google Drive no disponible aún. Próximamente se agregará.');
      return;
    }
    
    // Convertir enlace de Google Drive a embed
    const embedUrl = material.driveUrl.replace('/view?usp=sharing', '/preview');
    
    setModalData({
      isOpen: true,
      pdfUrl: embedUrl,
      title: material.name,
      downloadUrl: material.downloadUrl
    });
  };

  const closePDFModal = () => {
    setModalData({
      isOpen: false,
      pdfUrl: '',
      title: '',
      downloadUrl: ''
    });
  };
  const sessions = [
    {
      id: 1,
      title: "Información General",
      materials: [
        { 
          type: "pdf", 
          name: "Sílabo del Curso", 
          driveUrl: "https://drive.google.com/file/d/15Hf6nZs_zhV64V2lNxGQWMTu9Y2iTd_4/view?usp=sharing",
          downloadUrl: "/INFORMACIÓN TIC/1. INFORMACIÓN GENERAL/0. SILABO_Curso de Especialización en TICs e Inteligencia Artificial para la Innovación.pdf"
        },
        { 
          type: "pdf", 
          name: "Presentación TICs", 
          driveUrl: "https://drive.google.com/file/d/1x8jUfjuAtLsOwyYTY8WqKxT74xtino1L/view?usp=sharing",
          downloadUrl: "/INFORMACIÓN TIC/1. INFORMACIÓN GENERAL/1. PRESENTACION DE tics.pdf"
        },
        { 
          type: "pdf", 
          name: "Manual Blackboard", 
          driveUrl: "https://drive.google.com/file/d/169HGzeDnslZKHW9vuroE-oHtXh1oZwGP/view?usp=sharing",
          downloadUrl: "/INFORMACIÓN TIC/1. INFORMACIÓN GENERAL/2. MANUAL DE MANEJO_PLATAFORMA BLACKBOARD.pdf"
        }
      ],
      completed: true
    },
    {
      id: 2,
      title: "Introducción a las TICs",
      materials: [
        { 
          type: "pdf", 
          name: "Introducción TIC", 
          driveUrl: "https://drive.google.com/file/d/1ry_qcc1J3qamEQomUmr7firK-WVtjhEu/view?usp=sharing",
          downloadUrl: "/INFORMACIÓN TIC/2. SESIÓN 1/1. S1_EC_Inroduccion_TIC.pdf"
        },
        { 
          type: "pdf", 
          name: "Informe GEM TE", 
          driveUrl: "https://drive.google.com/file/d/10F8sAvWQK_KVi2XmhV6mk65okBW5JYAR/view?usp=sharing",
          downloadUrl: "/INFORMACIÓN TIC/2. SESIÓN 1/2. 2023_Informe_GEM_TE_Anexos.pdf"
        }
      ],
      completed: true
    },
    {
      id: 3,
      title: "Creación de Contenidos Educativos",
      materials: [
        { 
          type: "pdf", 
          name: "Creación de Contenidos", 
          driveUrl: "https://drive.google.com/file/d/17DWvxcboaXElbS-yi094D5CveDtfQG0y/view?usp=sharing",
          downloadUrl: "/INFORMACIÓN TIC/3. SESIÓN 2/1. S2_EC_creación_contenidos.pdf"
        },
        { 
          type: "pdf", 
          name: "Marco Competencias UNESCO", 
          driveUrl: "https://drive.google.com/file/d/1edLDM0EXtb3R6qlGLmG006VdHUQHqVg9/view?usp=sharing",
          downloadUrl: "/INFORMACIÓN TIC/3. SESIÓN 2/2. MARCO_COMPETENCIAS_unesco_Anexo2.pdf"
        },
        { 
          type: "pdf", 
          name: "Tendencias Contenidos Educativos", 
          driveUrl: "https://drive.google.com/file/d/1H_lGCiWeJliibCwEiKRCZWTUh4wwlMF9/view?usp=sharing",
          downloadUrl: "/INFORMACIÓN TIC/3. SESIÓN 2/3. tendencias sobre contenidos educativos_ANEXO1.pdf"
        }
      ],
      completed: true
    },
    {
      id: 4,
      title: "IA en la Educación",
      // description: "Revolución de la Inteligencia Artificial aplicada al sector educativo",
      // duration: "180 min",
      // date: "Semana 4",
      materials: [
        { 
          type: "pdf", 
          name: "Revolución IA en Educación", 
          driveUrl: "https://drive.google.com/file/d/1t2QQy-Eu7hpYM1v9jza6ZtF_iyW4ap9H/view?usp=sharing",
          downloadUrl: "/INFORMACIÓN TIC/4. SESIÓN 3/Revolucion_IA_educacion_bancomundial_Anexo.pdf"
        },
        { 
          type: "pdf", 
          name: "Material Adicional IA", 
          driveUrl: "https://drive.google.com/file/d/1aS53cb0cWiEzlYsWom_7irvvOJK9wZad/view?usp=sharing",
          downloadUrl: "/INFORMACIÓN TIC/4. SESIÓN 3/Material_adicional_IA.pdf"
        }
      ],
      completed: true
    },
    {
      id: 5,
      title: "Implementación y Futuro",
      // description: "Estrategias de implementación y tendencias futuras de la IA educativa",
      // duration: "120 min",
      // date: "Semana 5",
      materials: [
        { 
          type: "pdf", 
          name: "Marco de competencias de los docentes en materia de TIC UNESCO", 
          driveUrl: "https://drive.google.com/file/d/1s6lKYJ6_Iw3UxppgmgXLDpy9lMYmoxQB/view?usp=sharing",
          downloadUrl: "/INFORMACIÓN TIC/5. SESIÓN 5/Marco_competencias_docentes_TIC_UNESCO.pdf"
        },
        { 
          type: "pdf", 
          name: "Tendencias sobre Contenidos Educativos Digitales", 
          driveUrl: "https://drive.google.com/file/d/14HKU3YgOb0KTzOjydpgZ6vknxJf4hSX6/view?usp=sharing",
          downloadUrl: "/INFORMACIÓN TIC/5. SESIÓN 5/Tendencias_contenidos_educativos_digitales.pdf"
        },
        { 
          type: "audio", 
          name: "La Brújula Digital", 
          driveUrl: "https://drive.google.com/file/d/185G8KQGcFjAlS__p5zbQvk77YOEt-5yA/view?usp=sharing",
          downloadUrl: "/INFORMACIÓN TIC/5. SESIÓN 5/Brujula_digital.mp3"
        }
      ],
      completed: true
    }
  ];

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Sesiones del Curso
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explora el contenido completo de cada sesión con materiales didácticos y recursos de aprendizaje
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {sessions.map((session, index) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative bg-slate-800/50 backdrop-blur-sm rounded-2xl border ${
                session.completed 
                  ? 'border-blue-500/30 hover:border-blue-500/50' 
                  : 'border-gray-600/30 hover:border-gray-500/50'
              } p-6 hover:transform hover:scale-105 transition-all duration-300`}
            >
              {/* Session Status */}
              <div className="absolute top-4 right-4">
                {session.completed ? (
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                ) : (
                  <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
                )}
              </div>

              {/* Session Header */}
              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    session.completed ? 'bg-blue-500/20' : 'bg-gray-600/20'
                  }`}>
                    <BookOpen className={`h-6 w-6 ${
                      session.completed ? 'text-blue-400' : 'text-gray-400'
                    }`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{session.title}</h3>
                    <p className="text-sm text-gray-400">Sesión {session.id}</p>
                  </div>
                </div>
                
                {/* <p className="text-gray-300 leading-relaxed mb-4">{session.description}</p> */}
                
                {/* <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{session.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{session.duration}</span>
                  </div>
                </div> */}
              </div>

              {/* Materials */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">
                  Materiales de Estudio
                </h4>
                
                {session.materials.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {session.materials.map((material, materialIndex) => (
                      <div
                        key={materialIndex}
                        className="group cursor-pointer bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300 overflow-hidden transform hover:scale-105"
                        onClick={() => openPDFModal(material)}
                      >
                        {/* Vista previa del PDF */}
                        <div className="aspect-[3/4] rounded-t-lg overflow-hidden relative">
                          <PDFThumbnail 
                            driveUrl={material.driveUrl}
                            fileName={material.name}
                            className="rounded-t-lg"
                          />
                          
                          {/* Overlay en hover */}
                          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="bg-blue-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs font-medium shadow-md flex items-center space-x-1.5 border border-blue-400/30">
                              <Eye className="w-3 h-3" />
                              <span>Ver</span>
                            </div>
                          </div>
                          
                          {/* Badge dinámico según tipo */}
                          <div className={`absolute top-3 right-3 text-white text-xs px-2 py-1 rounded-full font-semibold shadow-lg ${
                            material.type === 'audio' ? 'bg-green-500' : 'bg-red-500'
                          }`}>
                            {material.type === 'audio' ? 'AUDIO' : 'PDF'}
                          </div>
                        </div>
                        
                        {/* Nombre del archivo */}
                        <div className="p-3 bg-white">
                          <p className="text-sm text-gray-800 truncate font-semibold leading-tight">
                            {material.name}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className={`text-xs font-medium px-2 py-1 rounded ${
                              material.type === 'audio' 
                                ? 'text-green-600 bg-green-50' 
                                : 'text-red-600 bg-red-50'
                            }`}>
                              {material.type === 'audio' ? 'AUDIO' : 'PDF'}
                            </span>
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <FileText className="w-3 h-3" />
                              {material.type === 'audio' ? 'Audio' : 'Documento'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 bg-slate-700/30 rounded-lg border border-dashed border-gray-600">
                    <p className="text-sm text-gray-400 text-center">
                      {session.completed ? 'Sin materiales disponibles' : 'Materiales próximamente'}
                    </p>
                  </div>
                )}
              </div>

              {/* Session Actions */}
              {/* {session.completed && session.materials.length > 0 && (
                <div className="mt-6 pt-4 border-t border-gray-700">
                  <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 flex items-center justify-center space-x-2">
                    <Play className="h-4 w-4" />
                    <span>Revisar Sesión</span>
                  </button>
                </div>
              )} */}
            </motion.div>
          ))}
        </div>

        {/* Progress Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16"
        >
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-blue-500/20 p-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Progreso del Curso</h3>
              <div className="flex items-center justify-center space-x-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">5/5</div>
                  <div className="text-sm text-gray-400">Sesiones Completadas</div>
                </div>
                <div className="w-px h-12 bg-gray-600" />
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400">100%</div>
                  <div className="text-sm text-gray-400">Progreso Total</div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-6">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modal para PDF */}
      <GoogleDrivePDFModal
        isOpen={modalData.isOpen}
        onClose={closePDFModal}
        pdfUrl={modalData.pdfUrl}
        title={modalData.title}
        downloadUrl={modalData.downloadUrl}
      />
    </div>
  );
}