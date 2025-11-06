# Road to MVP

## Objetivo
- Publicar una versión coherente y funcional que explique claramente los servicios principales y ofrezca formas de contacto reales.
- Asegurar que sólo se muestren secciones completas con contenido validado, evitando enlaces rotos o referencias a áreas no listas.
- Mantener todo el trabajo ya avanzado en estado oculto para iteraciones posteriores sin perderlo.

## Principios del MVP
- Contenido 100 % real y aprobado; nada de placeholders visibles.
- Navegación sin callejones: ningún enlace lleva a páginas o secciones no desplegadas.
- Diseño consistente en desktop y mobile; componentes responsivos mínimos listos.
- Capacidad de contacto inmediata (formulario, email y/o WhatsApp) visible en todas las páginas públicas.

## Alcance MVP (must-have)

### Secciones públicas activas
- **Inicio**: propuesta de valor clara, listado resumido de servicios, CTA hacia contacto.
- **Servicios**: descripción de cada servicio vigente con beneficio, proceso y CTA. Eliminar sección “Proyectos recientes”.
- **Nosotros**: visión y propuesta; reemplazar “Equipo directivo” por bloque genérico que hable del equipo sin nombres hasta contar con fotos y enlaces.
- **Contacto**: formulario funcional + datos de contacto (email, teléfono, calendario, WhatsApp). Confirmar que el formulario envía correctamente o usar alternativa (mailto) mientras tanto.
- **Footer/Header**: enlaces sólo hacia secciones activas, sin menús a blog, recursos, casos, etc.

### Contenido a ocultar temporalmente
- Casos de éxito.
- Recursos, blog, recursos gratuitos (herramientas, más recursos, calculadora fiscal).
- Cualquier contenido parcial (texto, imágenes, sliders, modales) asociado a secciones pendientes.

### Requerimientos técnicos clave
- Refactor de `<img>` a `<picture>`/`srcset` con variantes responsive usando imagetools/sharp donde aplique.
- Asegurar carga rápida: optimizar imágenes visibles, lazy loading sólo cuando sea seguro.
- Ajustar navegación/routers para que rutas ocultas no sean accesibles.
- Revisión de SEO básico (title, meta description, OG tags) en páginas activas.

## Tareas por frente

### Contenido
- Inventario de textos actuales y edición para cada sección activa.
- Revisión legal básica (información de contacto, políticas obligatorias).
- Obtener/seleccionar imágenes definitivas para secciones visibles (hero, equipo genérico, ilustraciones).

### Diseño & UX
- Actualizar layouts con secciones visibles; asegurar coherencia visual tras ocultar bloques.
- Verificar estados responsive y accesibilidad mínima (contraste, jerarquía, foco).
- Definir bloques de placeholders internos (comentarios en código) para reactivar secciones futuras sin perderlas.

### Ingeniería
- Implementar refactor responsive de imágenes.
- Condicionar rendering de secciones pendientes (feature flags o data-driven).
- Auditar navegación y sitemap para excluir páginas no MVP.
- Configurar tracking básico (analytics) si ya está listo; caso contrario posponer.

### QA & Deploy
- Pruebas funcionales (navegación, formularios, links, responsive en tamaños clave).
- Revisión cross-browser mínima (Chrome, Safari, Edge).
- Checklist de performance (Lighthouse rápido) para páginas activas.
- Preparar pipeline de despliegue y rollback plan.

## Backlog post-MVP (go live + iteraciones)
- Reactivar y completar “Casos de éxito” con contenido curado y pruebas sociales.
- Lanzar “Recursos” (blog, recursos gratuitos, calculadora fiscal) con estrategia de contenidos y generación de leads.
- Completar sección “Equipo directivo” con fotos, biografías y enlaces.
- Añadir “Proyectos recientes” dentro de Servicios cuando haya material.
- Integrar automatizaciones avanzadas (CRM, newsletters, chatbots, etc.).
- Profundizar SEO (schema, blog, optimización técnica) y performance (CDN, prerender).
- Expansión del sitio a otros idiomas si aplica.

## Dependencias y riesgos
- Disponibilidad de textos e imágenes definitivas; sin ellos no se puede publicar.
- Confirmar canal de contacto funcional antes del go-live.
- Coordinación entre contenido/diseño/dev para evitar huecos visuales tras ocultar secciones.

## Próximos pasos inmediatos
1. Validar con stakeholders que el alcance del MVP cubre requisitos mínimos.
2. Inventariar contenido actual vs. requerido y disparar solicitudes faltantes.
3. Crear issues/tareas por frente (contenido, diseño, ingeniería, QA) usando este roadmap como guía.
4. Iniciar por las secciones más visibles (Inicio y Servicios) y seguir flujo implementación → prueba → actualización roadmap → siguiente paso.
