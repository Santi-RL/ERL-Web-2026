# Checklist de Lanzamiento — Contenido y Funcionalidades

Este documento reúne TODO lo necesario (no técnico) para que el sitio esté listo para publicar con contenido real y funcionalidades operativas. Mantener `PRIORIDADES.md` para temas técnicos/rendimiento y usar este archivo para contenidos, enlaces, formularios, agenda, testimonios, logos y legales.

Estado: borrador inicial. Marcar con [x] a medida que se complete.

## P0 — Crítico (antes de publicar)

- [ ] Agenda de reuniones (enlace real y/o embed unificado)
  - Reemplazar placeholders de `https://cal.com/` por el enlace definitivo del estudio y unificar CTAs.
  - Referencias: `contacto.html:155–184`, `contacto.html:173`, `177`, `181`; `planes.html:103`, `119`, `254–255`; `servicios.html:156`; `blog.html:112`; `recursos.html:207–209`.

- [ ] Formularios funcionales (contacto y newsletters)
  - Definir proveedor: Formspree / Netlify Forms / Brevo API / función serverless.
  - Añadir consentimiento y vínculo a privacidad; honeypot o Turnstile/hCaptcha.
  - Contacto: `index.html:529–564`, `contacto.html:98–...`.
  - Newsletters: `blog.html:189–210`, `recursos.html:173–194`.

- [ ] Testimonios y casos reales (texto + nombre + cargo + foto + permiso)
  - Reemplazar testimonios de ejemplo por clientes reales y mantener consistencia.
  - Inicio: `index.html:452–460`, `index.html:492–500`.
  - Casos: `casos-de-exito.html:169–205`.

- [ ] “Empresas que confían en nosotros” (logos reales optimizados)
  - Sustituir imágenes de Unsplash por logos reales en `public/img/clientes/…` (SVG/PNG) + alt descriptivos.
  - Referencias: `index.html:508–513`.

- [ ] Recursos y descargas reales
  - Reemplazar enlaces `href="#"` y botones a recursos por URLs válidas o anclas en `recursos.html#descargas`. Subir PDFs/plantillas a `public/descargas/...`.
  - Referencias: `index.html:384–394` (Manual/Ver todos los recursos).

- [ ] Calculadora Fiscal (implementar o despublicar hasta tener la lógica)
  - Definir alcance mínimo (ej. Monotributo vs RI) + tablas/rangos actuales y disclaimer de orientación.
  - Añadir JS de cálculo y resultados con validaciones; o bien ocultar la tarjeta.
  - Referencias: `index.html:403–426`.

- [ ] Página “Nosotros”: perfilar equipo con datos reales
  - Confirmar nombres, cargos, bios, fotos y LinkedIn personales (hoy LinkedIn apunta a la empresa).
  - Referencias: `nosotros.html:194–255`.

- [ ] Marca y assets definitivos
  - Reemplazar uso de `og-default.png` por el logo definitivo en header/footer y OG específicos por página.
  - Referencias: `src/partials/header.hbs:6`, `src/partials/footer.hbs:8`, meta OG en múltiples páginas.

- [ ] Coherencia de dominios y correos
  - Unificar uso de dominio y cuentas (p. ej., `@estudiorojaslem.com` vs `@rojaslem.com.ar`) en todo el sitio.
  - Referencias: `index.html:35`, `politica-de-privacidad.html:114`, `nosotros.html:31`.

- [ ] Imágenes genéricas en Servicios
  - Reemplazar Unsplash por imágenes propias integradas al manifiesto de imágenes.
  - Referencias: `servicios.html:190–192`.

## P1 — Alta (semana 1 post‑lanzamiento)

- [ ] Favicon, Apple Touch Icon y Web App Manifest
  - Añadir `favicon.ico`, `apple-touch-icon.png`, `site.webmanifest` y referenciarlos en `<head>`.

- [ ] Página 404 personalizada
  - Crear `404.html` con navegación de retorno.

- [ ] Embed de agenda
  - Incrustar widget (Cal/Calendly) en `contacto.html#agenda` con UTMs y localización.

- [ ] Flujo de newsletter + descargas
  - Tras suscripción, entregar descarga y sumar a lista (doble opt‑in si aplica); agradecer y registrar consentimiento.

- [ ] Microcopys legales
  - Consentimiento explícito en todos los formularios, link a privacidad y aclaración de uso de datos.

- [ ] SEO de contenido
  - Títulos/descripciones únicas y OG por página (evitar usar siempre `og-default.png`).

- [ ] Accesibilidad de contenido
  - `alt` significativos, íconos decorativos con `aria-hidden="true"`, foco visible en CTAs, contraste de botones outline.

## P2 — Media / Optativo

- [ ] Integración CRM y Analytics
  - Envío de leads a CRM (HubSpot/Pipedrive) y GA4/Matomo; si hay tracking, banner de cookies.

- [ ] Datos estructurados adicionales
  - `FAQPage` en `contacto.html` y `casos-de-exito.html`; `Article` para cards del blog si se publican artículos completos.

- [ ] Internacionalización (si aplica)
  - Rutas por idioma y selector.

- [ ] PWA (si agrega valor)
  - `manifest`, service worker y caché básica de recursos.

## Checklist por página (rápido)

- Inicio (`index.html`)
  - [ ] Reemplazar logos de clientes (508–513)
  - [ ] Testimonios reales (452–460, 492–500)
  - [ ] Calculadora fiscal (403–426) — implementar u ocultar
  - [ ] Form de contacto operativo (529–564)
  - [ ] Enlaces de “Recursos” sin `#` (384–394)

- Contacto (`contacto.html`)
  - [ ] Agenda real/embebida (155–184; links a `cal.com` en 173/177/181)
  - [ ] Form principal operativo (98–...)
  - [ ] WhatsApp y mails directos verificados (61–86)

- Recursos (`recursos.html`)
  - [ ] Newsletter operativo (173–194)
  - [ ] Descargas reales y anclas (`#descargas`), CTAs válidos (207–210)

- Blog (`blog.html`)
  - [ ] Newsletter operativo (189–210)
  - [ ] Definir estrategia: artículos completos vs cards promocionales

- Servicios (`servicios.html`)
  - [ ] Reemplazar imagen Unsplash (190–192)
  - [ ] CTAs a agenda/contacto correctos (60–61, 156)

- Casos de éxito (`casos-de-exito.html`)
  - [ ] Testimonios reales (169–205)
  - [ ] CTA a agenda válido (216–219)

- Nosotros (`nosotros.html`)
  - [ ] Confirmar datos del equipo y LinkedIn personales (194–255)

- Parciales
  - [ ] Logo definitivo en `src/partials/header.hbs:6` y `src/partials/footer.hbs:8`

## Dependencias (bloquean P0)

- Enlace definitivo a la agenda (Cal/Calendly/otro) y parámetros UTM.
- Proveedor/endpoint para formularios (contacto + newsletters) y textos legales aprobados.
- Logos de clientes (SVG/PNG) y autorización de uso.
- Testimonios reales (texto, crédito, foto, permiso de publicación).
- Archivos de recursos/descargas (PDF/Sheets) y rutas públicas.
- Logo/OGs definitivos y foto del equipo.

## Notas

- Mantener este checklist conciso, accionable y actualizado. Si un ítem demanda tareas técnicas, crear su issue/tarea y vincularlo desde aquí, dejando el detalle técnico en `PRIORIDADES.md`.

