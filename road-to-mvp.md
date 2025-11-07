# Road to MVP

## Objetivo
- Publicar una version coherente que cubra Inicio, Servicios, Nosotros y Contacto con contenidos reales y canales de contacto operativos.
- Evitar enlaces hacia secciones o activos no aprobados y mantener fuera de produccion todo lo que siga en elaboracion (blog, recursos, casos, calculadora, etc.).
- Garantizar experiencia consistente en desktop/mobile, tiempos de respuesta razonables y formularios auditables.

## Principios
- Todo texto, testimonio, logo o imagen debe estar validado comercial y legalmente antes de mostrarse.
- Ninguna ruta debe exponer contenido en borrador; si no esta listo, se oculta del sitemap, navegacion y footer.
- Las decisiones tecnicas priorizan performance, accesibilidad y seguridad basica para facilitar futuras escalas.

## Pasos numerados

1. **Alcance final del MVP**
   - Confirmar con stakeholders que solo se publican Inicio, Servicios, Nosotros, Contacto, Terminos, Privacidad y Mapa del sitio.
   - Cerrar inventario de textos definitivos por seccion y marcar todo lo demas como oculto (sin enlaces en header/footer/sitemap).

2. **Branding y assets oficiales**
   - Recibir logo final (SVG/PNG), versiones para header/footer y assets OG especificos por pagina.
   - Subir favicon, apple-touch-icon y `site.webmanifest`; ajustar `<head>` de cada pagina.
   - Reemplazar `/img/og-default.png` en header, footer y metadatos; regenerar imagenes responsive con fotos propias/licenciadas.

3. **Formularios y canales de contacto**
   - Elegir proveedor definitivo (Web3Forms/Brevo/Formspree/funcion serverless) y crear access key exclusiva por formulario.
   - Agregar consentimiento expreso, link a privacidad y mecanismo antispam (honeypot/Turnstile) en `index.html`, `contacto.html`, `blog.html`, `recursos.html`.
   - Validar agenda embebida (Google Calendar/Cal/Calendly) y unificar CTA y UTMs en todas las referencias.

4. **Contenido comercial real**
   - Reemplazar testimonios y casos por textos aprobados con nombre, cargo y foto; si no estan, remover secciones del build.
   - Sustituir logos Unsplash por logotipos reales optimizados (`public/img/clientes/*`) con `alt` descriptivo.
   - Completar bloque "Nosotros" con bios (o texto generico) y actualizar contactos (`@estudiorojaslem.com`) de forma consistente.

5. **Recursos, descargas y calculadora**
   - Subir archivos a `public/descargas/...`, actualizar enlaces y promesas de entrega; si no existen, eliminar CTA que promete descargas inmediatas.
   - Definir roadmap de la calculadora fiscal: implementar logica (inputs, validaciones, disclaimers) o despublicar la tarjeta hasta tenerla lista.
   - Ajustar cards de recursos/blog para que solo muestren contenido realmente disponible post-lanzamiento.

6. **SEO tecnico y navegacion**
   - Revisar titles, descriptions, OG/Twitter y schema por pagina con nuevos assets.
   - Regenerar `robots.txt` y `sitemap.xml` con fechas reales y solo las URLs activas del MVP.
   - Auditar header/footer para asegurar que no haya enlaces hacia rutas ocultas; alinear `aria-current` en navegacion y breadcrumb.

7. **Performance, accesibilidad y seguridad**
   - Afinar pipeline de imagenes (manifiesto + `npm run images`) con fotos finales; asegurar `loading="eager"` solo en LCP y `width/height` definidos.
   - Reducir bundle de `lucide` importando solo los iconos necesarios para bajar los ~537 KB actuales.
   - Implementar foco visible, `aria-expanded` en menu movil, `aria-current` en nav y revisar contraste; preparar borrador de Content-Security-Policy + HSTS + frame-ancestors para el hosting.

8. **QA funcional y analytics**
   - Pruebas manuales desktop/mobile: navegacion, formularios, agenda, WhatsApp, links legales, mapa embebido.
   - Lighthouse sobre build (`npm run build && npm run preview`), validacion cross-browser minima (Chrome, Edge, Safari).
   - Configurar monitoreo basico: Google Analytics/Matomo (si aplica) o documentar por que se pospone; preparar checklist de regresiones.

9. **MVP listo para deploy**
   - Ejecutar build limpio (`npm run build`), revisar `dist/` y eliminar paginas no incluidas en el alcance.
   - Actualizar versionado/CHANGELOG, adjuntar evidencias de QA y performance, y obtener aprobacion final de contenido/legal.
   - Congelar dependencias (lockfile) y documentar procedimiento de rollback + owners.

10. **MVP en produccion**
   - Publicar el paquete aprobado en el hosting elegido, correr smoke test post-deploy (formularios, agenda, WhatsApp, OG share).
   - Verificar entrega de formularios/proveedor, revisar logs y monitoreo las primeras 24-48 horas.
   - Registrar retroalimentacion inicial y abrir backlog post-MVP (casos de exito, blog, recursos, automatizaciones).

## Dependencias criticas
- Access keys y proveedor definitivo para formularios/contacto/newsletter.
- Logo, paleta, imagenes y testimonios aprobados (incluye permisos de uso y tamaños OG).
- Archivos de recursos/descargas y definicion funcional de la calculadora fiscal.
- Definicion de canal de agenda (link y embed) + correos/domino oficiales.

## Riesgos y mitigacion
- **Contenido incompleto:** bloquear cada seccion en el HTML hasta recibir aprobacion; no publicar placeholders.
- **Inconsistencias de dominio/correo:** mantener matriz unica de contactos y correr `rg` antes del build para detectar dominios antiguos.
- **Regresiones de performance:** automatizar `npm run build && npm run preview` + Lighthouse previo al release y documentar metricas objetivo.
- **Falta de assets legales:** si testimonios/logos no llegan, remover el modulo completo para evitar reclamos o uso indebido.
