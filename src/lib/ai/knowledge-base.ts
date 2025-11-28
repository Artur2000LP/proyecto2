// Knowledge Base para el Agente IA
// Contiene toda la información estructurada del portafolio

import profileData from '@/data/profile.json';
import skillsData from '@/data/skills.json';
import projectsData from '@/data/projects.json';
import coursesData from '@/data/courses.json';

export const knowledgeBase = {
  profile: profileData,
  skills: skillsData,
  projects: projectsData,
  courses: coursesData,
};

// Función para generar contexto dinámico
export function generateContext(): string {
  const { profile } = knowledgeBase;
  const totalSkills = knowledgeBase.skills.categories.reduce(
    (acc, cat) => acc + cat.skills.length,
    0
  );
  const featuredProjects = knowledgeBase.projects.projects.filter(
    (p) => p.featured
  );
  const availableCourses = knowledgeBase.courses.courses.filter(
    (c) => c.available
  );

  return `
# INFORMACIÓN DEL PORTAFOLIO DE ${profile.name.toUpperCase()}

## PERFIL PROFESIONAL
- Nombre: ${profile.name}
- Título: ${profile.title}
- Biografía: ${profile.bio}
- Ubicación: ${profile.location}
- Email: ${profile.email}
- Teléfono: ${profile.phone}
- Disponibilidad: ${profile.availability}
- Años de experiencia: ${profile.yearsOfExperience}
- Estudiantes enseñados: ${profile.studentsTeached}+
- Proyectos completados: ${profile.projectsCompleted}+

## REDES SOCIALES
- GitHub: ${profile.social.github}
- LinkedIn: ${profile.social.linkedin}
- Twitter: ${profile.social.twitter}

## HABILIDADES TÉCNICAS (${totalSkills} en total)
${knowledgeBase.skills.categories
      .map(
        (cat) => `
### ${cat.icon} ${cat.name}
${cat.skills.map((skill) => `- ${skill.name}: ${skill.level}% (${skill.yearsOfExperience} años)`).join('\n')}
`
      )
      .join('\n')}

## PROYECTOS DESTACADOS (${featuredProjects.length})
${featuredProjects
      .map(
        (project) => `
### ${project.title}
- Descripción: ${project.description}
- Categoría: ${project.category}
- Tecnologías: ${project.technologies.join(', ')}
- Estado: ${project.status}
- Demo: ${project.demoUrl}
- GitHub: ${project.githubUrl}
- Aspectos destacados:
${project.highlights.map((h) => `  * ${h}`).join('\n')}
`
      )
      .join('\n')}

## CURSOS Y FORMACIÓN (${availableCourses.length} disponibles)
${availableCourses
      .map(
        (course) => `
### ${course.title}
- Nivel: ${course.level}
- Duración: ${course.duration} (${course.totalHours} horas totales)
- Precio: $${course.price} ${course.currency}
- Estudiantes: ${course.students}
- Rating: ${course.rating}/5.0
- Temas: ${course.topics.join(', ')}
`
      )
      .join('\n')}

## SESIONES INDIVIDUALES
${knowledgeBase.courses.sessions
      .map(
        (session) => `
### ${session.title}
- Tipo: ${session.type}
- Duración: ${session.duration}
- Precio: $${session.price} ${session.currency}
- Formato: ${session.format}
- Descripción: ${session.description}
`
      )
      .join('\n')}

## PROYECTO ESPECIAL: GUARDIANES DE CHOQUEQUIRAO
Este es un proyecto estudiantil de 5 semanas del IE Manuel González Prada en Abancay que busca proteger el sitio arqueológico de Choquequirao.

### Problemática identificada:
- Alrededor de 5,000 visitantes al año
- Cero recolección de residuos sólidos
- Escasez de señalización
- Ningún guardaparques debido a límites presupuestarios
- Las agencias de turismo han usado los barrancos como basureros ilegales
- El sendero está pagando el precio de esta situación

### Acciones del proyecto:
- Investigación y documentación de la situación actual
- Limpiezas comunitarias organizadas
- Llamado a la acción para visitantes y comunidad

### Cómo puedes ayudar:
1. Lleva una pequeña bolsa de basura cuando visites
2. Empaca lo que traes (no dejes residuos)
3. Reporta los vertidos a las autoridades locales
4. Apoya las limpiezas comunitarias
5. Apoya la recaudación de fondos para botes de basura y salarios de guardaparques
6. Sé voluntario en las actividades del proyecto

### Mensaje clave:
"Si no te gusta la burocracia, pero te importa Choquequirao, entonces únete a una limpieza comunitaria. Si no te gusta esperar ayuda, pero quieres un cambio, entonces actúa ahora."

Este proyecto demuestra cómo los estudiantes pueden generar cambio real en su comunidad a través de la acción directa y el compromiso cívico.
`;
}

// Función para buscar información específica
export function searchKnowledge(query: string): { projects: typeof knowledgeBase.projects.projects; skills: any[]; courses: typeof knowledgeBase.courses.courses } {
  const lowerQuery = query.toLowerCase();

  // Buscar en proyectos
  const relevantProjects = knowledgeBase.projects.projects.filter(
    (p) =>
      p.title.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.technologies.some((t) => t.toLowerCase().includes(lowerQuery))
  );

  // Buscar en habilidades
  const relevantSkills = knowledgeBase.skills.categories.flatMap((cat) =>
    cat.skills.filter((s) => s.name.toLowerCase().includes(lowerQuery))
  );

  // Buscar en cursos
  const relevantCourses = knowledgeBase.courses.courses.filter(
    (c) =>
      c.title.toLowerCase().includes(lowerQuery) ||
      c.description.toLowerCase().includes(lowerQuery) ||
      c.topics.some((t) => t.toLowerCase().includes(lowerQuery))
  );

  return {
    projects: relevantProjects,
    skills: relevantSkills,
    courses: relevantCourses,
  };
}
