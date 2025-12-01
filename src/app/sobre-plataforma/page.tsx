'use client';

import { BookOpen, Target, Users, CheckCircle, Star, Award, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

// Metadata se maneja en layout.tsx para componentes client
// export const metadata: Metadata = {
//   title: 'Sobre la Plataforma - Diseño de Unidad Didáctica con IA Responsable',  
//   description: 'Conoce nuestra plataforma educativa innovadora que integra herramientas de IA para el desarrollo de unidades didácticas responsables y efectivas.',
// };

export default function SobrePlataformaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
      {/* Header Section */}
      <div className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Sobre la Plataforma
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Información técnica y características principales del sistema educativo
            </p>
          </motion.div>
        </div>
      </div>

      {/* Objetivo Principal */}
      <div className="py-16 bg-slate-800/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="flex items-start gap-6 mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex-shrink-0">
              <Target className="h-12 w-12 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Objetivo Principal</h2>
              <p className="text-gray-300 leading-relaxed mb-8">
                Esta plataforma integra herramientas de inteligencia artificial para facilitar el aprendizaje de cursos especializados. El sistema permite a los estudiantes acceder a contenido educativo de forma interactiva y personalizada.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-800 p-6 rounded-lg">
                  <h3 className="text-lg font-bold text-cyan-400 mb-3">Tecnología</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Sistema construido con Next.js y React. Integra APIs de inteligencia artificial para procesamiento de texto y generación de respuestas automáticas.
                  </p>
                </div>
                <div className="bg-slate-800 p-6 rounded-lg">
                  <h3 className="text-lg font-bold text-green-400 mb-3">Metodología</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Combina aprendizaje tradicional con asistencia de IA. Los estudiantes pueden interactuar con chatbots y recibir recomendaciones personalizadas de contenido.
                  </p>
                </div>
                <div className="bg-slate-800 p-6 rounded-lg">
                  <h3 className="text-lg font-bold text-purple-400 mb-3">Seguridad</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Implementa medidas de protección de datos y uso responsable de IA. Cumple con estándares de privacidad para entornos educativos.
                  </p>
                </div>
                <div className="bg-slate-800 p-6 rounded-lg">
                  <h3 className="text-lg font-bold text-blue-400 mb-3">Escalabilidad</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Diseño modular que permite agregar nuevos cursos y funcionalidades. Soporta múltiples usuarios simultáneos y diferentes niveles educativos.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Descripción del Proyecto */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="flex items-start gap-6 mb-12"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex-shrink-0">
              <BookOpen className="h-12 w-12 text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Arquitectura del Sistema</h2>
              <p className="text-gray-300 leading-relaxed mb-8">
                El sistema está construido con una arquitectura modular que permite integrar diferentes tecnologías y herramientas educativas. Cada componente funciona de manera independiente pero coordinada.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-cyan-400 mb-4">Componentes Principales</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-800 p-5 rounded-lg">
                      <h4 className="font-bold text-white mb-2">Sistema de Cursos</h4>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        Gestiona el contenido educativo, seguimiento de progreso y evaluaciones. Permite a los instructores crear y administrar cursos interactivos.
                      </p>
                    </div>
                    <div className="bg-slate-800 p-5 rounded-lg">
                      <h4 className="font-bold text-white mb-2">Motor de IA</h4>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        Procesa consultas de usuarios y genera respuestas contextualmente relevantes. Utiliza modelos de lenguaje para asistencia educativa.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-blue-400 mb-4">Infraestructura</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-800 p-5 rounded-lg">
                      <h4 className="font-bold text-white mb-2">API REST</h4>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        Endpoints para comunicación entre componentes. Permite integración con sistemas externos y actualizaciones independientes.
                      </p>
                    </div>
                    <div className="bg-slate-800 p-5 rounded-lg">
                      <h4 className="font-bold text-white mb-2">Streaming de Video</h4>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        Integra plataformas como Zoom para sesiones en vivo. Soporta contenido multimedia y interacción en tiempo real.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Componentes del Trabajo */}
      <div className="py-16 bg-slate-800/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-3xl font-bold text-center mb-16 text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            3. COMPONENTES DEL TRABAJO
          </motion.h2>
          
          {/* 3.1 Contextualización */}
          <div className="mb-16">
            <div className="flex items-start gap-6 mb-8">
              <div className="flex-shrink-0">
                <Users className="h-10 w-10 text-green-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Contexto Educativo
                </h3>
                <p className="text-gray-300 leading-relaxed mb-8">
                  La plataforma está diseñada para instituciones educativas que buscan integrar tecnologías de inteligencia artificial en sus programas de estudio. Se enfoca en proporcionar herramientas prácticas y accesibles.
                </p>
                
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-slate-800 p-6 rounded-lg">
                    <h4 className="font-bold text-cyan-400 mb-3">Nivel Académico</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Dirigido a estudiantes de educación superior, programas de especialización y certificaciones profesionales en áreas de tecnología.
                    </p>
                  </div>
                  
                  <div className="bg-slate-800 p-6 rounded-lg">
                    <h4 className="font-bold text-green-400 mb-3">Áreas de Estudio</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Cubre temas de ingeniería de software, machine learning, procesamiento de lenguaje natural y aplicaciones prácticas de IA.
                    </p>
                  </div>
                  
                  <div className="bg-slate-800 p-6 rounded-lg">
                    <h4 className="font-bold text-purple-400 mb-3">Problema que Resuelve</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Facilita el acceso a herramientas de IA para estudiantes que no tienen experiencia previa con estas tecnologías.
                    </p>
                  </div>
                  
                  <div className="bg-slate-800 p-6 rounded-lg">
                    <h4 className="font-bold text-blue-400 mb-3">Habilidades Desarrolladas</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Los usuarios aprenden a utilizar IA de forma responsable, desarrollan pensamiento crítico y habilidades técnicas aplicables.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* 3.2 Integración de Herramientas IA */}
          <div>
            <div className="flex items-start gap-6 mb-8">
              <div className="flex-shrink-0">
                <div className="bg-purple-600 text-white px-3 py-2 rounded-lg text-lg font-bold">IA</div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Herramientas de Inteligencia Artificial
                </h3>
                
                <p className="text-gray-300 leading-relaxed mb-8">
                  El sistema integra cuatro herramientas principales de IA que trabajan en conjunto para mejorar la experiencia educativa. Cada herramienta tiene una función específica dentro del ecosistema.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-slate-800 p-6 rounded-lg">
                    <h4 className="font-bold text-cyan-400 mb-4">Chatbot Educativo</h4>
                    <div className="space-y-3">
                      <div>
                        <span className="font-semibold text-gray-400 text-sm">Tecnología:</span>
                        <p className="text-gray-300 text-sm">Procesamiento de lenguaje natural con modelos transformer</p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-400 text-sm">Implementación:</span>
                        <p className="text-gray-300 text-sm">API REST integrada con WebSocket para respuestas en tiempo real</p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-400 text-sm">Funcionalidad:</span>
                        <p className="text-gray-300 text-sm">Responde preguntas de estudiantes y proporciona asistencia educativa</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-800 p-6 rounded-lg">
                    <h4 className="font-bold text-green-400 mb-4">Análisis de Progreso</h4>
                    <div className="space-y-3">
                      <div>
                        <span className="font-semibold text-gray-400 text-sm">Tecnología:</span>
                        <p className="text-gray-300 text-sm">Machine learning para análisis de patrones de aprendizaje</p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-400 text-sm">Implementación:</span>
                        <p className="text-gray-300 text-sm">Pipeline de datos con modelos predictivos</p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-400 text-sm">Funcionalidad:</span>
                        <p className="text-gray-300 text-sm">Personaliza contenido según el rendimiento del estudiante</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-800 p-6 rounded-lg">
                    <h4 className="font-bold text-purple-400 mb-4">Sistema de Recomendaciones</h4>
                    <div className="space-y-3">
                      <div>
                        <span className="font-semibold text-gray-400 text-sm">Tecnología:</span>
                        <p className="text-gray-300 text-sm">Algoritmos de filtrado colaborativo y basado en contenido</p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-400 text-sm">Implementación:</span>
                        <p className="text-gray-300 text-sm">Algoritmos que analizan preferencias y rendimiento</p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-400 text-sm">Funcionalidad:</span>
                        <p className="text-gray-300 text-sm">Sugiere cursos y recursos educativos relevantes</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-800 p-6 rounded-lg">
                    <h4 className="font-bold text-blue-400 mb-4">Evaluación Automatizada</h4>
                    <div className="space-y-3">
                      <div>
                        <span className="font-semibold text-gray-400 text-sm">Tecnología:</span>
                        <p className="text-gray-300 text-sm">Redes neuronales para evaluación de respuestas</p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-400 text-sm">Implementación:</span>
                        <p className="text-gray-300 text-sm">Sistema de puntuación con retroalimentación instantánea</p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-400 text-sm">Funcionalidad:</span>
                        <p className="text-gray-300 text-sm">Evalúa respuestas y proporciona feedback detallado</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-900 p-6 rounded-lg">
                  <h4 className="text-lg font-bold text-white mb-4">Especificaciones Técnicas</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h5 className="font-bold text-cyan-400 mb-3">APIs Utilizadas</h5>
                      <ul className="text-gray-300 text-sm space-y-2">
                        <li>OpenAI GPT-4 API</li>
                        <li>TensorFlow.js</li>
                        <li>Natural Language API</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-bold text-green-400 mb-3">Frameworks</h5>
                      <ul className="text-gray-300 text-sm space-y-2">
                        <li>Next.js 14</li>
                        <li>React 18</li>
                        <li>TypeScript</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-bold text-purple-400 mb-3">Infraestructura</h5>
                      <ul className="text-gray-300 text-sm space-y-2">
                        <li>Vercel deployment</li>
                        <li>API routes</li>
                        <li>WebSockets</li>
                      </ul>
                    </div>
                  </div>
                </div>


              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Características Principales */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-12 text-white">Características Principales</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-slate-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-cyan-400 mb-4">Diseño Educativo</h3>
              <p className="text-gray-300 mb-4">
                Sistema modular que se adapta a diferentes metodologías de enseñanza y estilos de aprendizaje.
              </p>
              <ul className="text-gray-300 text-sm space-y-2">
                <li>Estructura curricular adaptable</li>
                <li>Progreso personalizado por estudiante</li>
                <li>Métricas de rendimiento detalladas</li>
                <li>Compatible con sistemas existentes</li>
              </ul>
            </div>
            
            <div className="bg-slate-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-purple-400 mb-4">Integración de IA</h3>
              <p className="text-gray-300 mb-4">
                Múltiples tecnologías de inteligencia artificial trabajando de forma coordinada para mejorar la experiencia educativa.
              </p>
              <ul className="text-gray-300 text-sm space-y-2">
                <li>Procesamiento de texto avanzado</li>
                <li>Aprendizaje automático aplicado</li>
                <li>Recomendaciones inteligentes</li>
                <li>Evaluación automatizada</li>
              </ul>
            </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-lg">
            <h3 className="text-xl font-bold text-white mb-6 text-center">Ventajas del Sistema</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <h4 className="font-bold text-cyan-400 mb-3">Escalabilidad</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Arquitectura que permite crecer según las necesidades de la institución sin comprometer el rendimiento.
                </p>
              </div>
              <div className="text-center">
                <h4 className="font-bold text-green-400 mb-3">Personalización</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Cada estudiante recibe una experiencia única adaptada a su ritmo y estilo de aprendizaje.
                </p>
              </div>
              <div className="text-center">
                <h4 className="font-bold text-purple-400 mb-3">Análisis</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Reportes detallados sobre progreso, engagement y efectividad de los métodos de enseñanza.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resumen */}
      <div className="py-16 bg-slate-800/30 border-t border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              Resumen de la Plataforma
            </h2>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Sistema educativo que integra inteligencia artificial para mejorar el proceso de aprendizaje. Combina tecnologías modernas con metodologías educativas tradicionales.
            </p>
          </motion.div>
          
          <div className="bg-slate-900 p-6 rounded-lg mb-8">
            <h3 className="text-lg font-bold text-white mb-6">Indicadores del Sistema</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400 mb-1">4</div>
                <p className="text-white text-sm">Herramientas de IA</p>
                <p className="text-gray-400 text-xs">Integradas</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400 mb-1">100%</div>
                <p className="text-white text-sm">Funcional</p>
                <p className="text-gray-400 text-xs">Sistema completo</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400 mb-1">24/7</div>
                <p className="text-white text-sm">Disponible</p>
                <p className="text-gray-400 text-xs">Acceso continuo</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400 mb-1">Multi</div>
                <p className="text-white text-sm">Usuario</p>
                <p className="text-gray-400 text-xs">Escalable</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/cursos"
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Ver Cursos
            </a>
            <a
              href="/contact"
              className="border border-gray-600 text-gray-300 hover:bg-gray-800 px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Contacto
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}