# Plan de implementación priorizado

## P0 — Base común y correcciones urgentes
- Normalizar codificación a UTF‑8 en TODOS los HTML (reemplazar caracteres “mojibake” como gestión, próximas, Términos).
- Unificar layout: extraer header y footer como parciales (`src/partials/header.hbs`, `src/partials/footer.hbs`) y configurar un plugin de plantillas para Vite (p. ej. `vite-plugin-handlebars`) manteniendo las entradas múltiples actuales.
- Consolidar estilos en `src/styles/main.css` y eliminar restos de estilos inline duplicados (gran parte ya hecho; revisar residuos).
- Iconografía: asegurar `lucide` ESM con `createIcons({ icons })` en todas las páginas (listo) y verificar en navegación móvil.

## P0 — SEO técnico esencial
- Añadir por página:
  - `<link rel="canonical">`
  - Open Graph/Twitter (title, description, url, image)
  - Structured data (`Organization` / `LocalBusiness`) acorde.
- Incorporar `robots.txt` y `sitemap.xml` en `public/` y publicarlos con el build.

## P0 — Rendimiento base (Core Web Vitals)
- Añadir atributos `width` y `height` en todas las `<img>` para evitar CLS.
- Usar `<picture>` con fuentes `AVIF/WebP` y fallback `jpg` en imágenes críticas (hero, tarjetas destacadas).
- Mantener `preconnect` a fuentes y `display=swap`. Evaluar preload del CSS principal en producción si aporta al LCP.
- Para auditorías Lighthouse correr siempre el build (`npm run build && npm run preview`) y no el dev server, así evitamos errores de WebSocket y APIs dev-only.

## P1 — Optimización de assets y build
- Generar variantes responsive (avif/webp/srcset) mediante `vite-imagetools` o un script con `sharp` y actualizar `<img>` a `<picture/srcset>`.
- Self‑host de fuentes (opcional) para mejorar caché y simplificar CSP.
- Auditar bundle (`vite build --debug`) y revisar tamaños/modularización para code‑splitting cuando aplique.

## P1 — Accesibilidad y UX
- Estados de foco visibles y consistentes. Navegación por teclado del menú móvil. `aria-current="page"` (o clase visible) en el ítem activo.
- `alt` significativo en imágenes; iconos decorativos con `aria-hidden="true"`.
- Revisar contraste de colores en texto/enlaces secundarios y botones outline.

## P1 — Seguridad
- Definir una CSP (modo report‑only inicialmente) con orígenes permitidos (fonts.googleapis.com, fonts.gstatic.com).
- Evitar handlers inline; centralizar lógica en `src/main.js` (ya hecho).
- Configurar encabezados en el hosting: `Strict-Transport-Security`, `Cross-Origin-Opener-Policy`, `X-Frame-Options`/`frame-ancestors` y `require-trusted-types-for` dentro de la CSP final.

## P2 — Calidad y CI/CD
- ESLint/Prettier en pre‑commit (husky + lint‑staged).
- Pruebas E2E básicas (Playwright/Cypress) para navbar, formularios y navegación entre páginas.
- Presupuestos de Lighthouse y monitor de regresiones de rendimiento.
- PWA opcional (manifest + service worker) si agrega valor al caso de uso.

---

## Orden sugerido de implementación
1) P0 — Codificación UTF‑8 y limpieza de textos en todas las páginas. — IMPLEMENTADO Y TESTEADO  
2) P0 — Parciales de header/footer con `vite-plugin-handlebars` y build multi‑entrada. — IMPLEMENTADO Y TESTEADO  
3) P0 — SEO mínimo (canonical + OG/Twitter + robots + sitemap). — IMPLEMENTADO Y TESTEADO
4) P0 — Imágenes: `width/height`, `<picture>` para héroes y lazy donde no afecte LCP. — IMPLEMENTADO Y TESTEADO (AJUSTE COMPLEMENTARIO LPS 2025-10-16)
5) P1 — Variantes responsive (imagetools/sharp) y refactor general de `<img>` a `<picture/srcset>`. — IMPLEMENTADO Y TESTEADO (Sharp + manifiesto 2025-10-16)  
6) P1 — Accesibilidad (foco, `aria-current`, `alt`, contraste).  
7) P1 — CSP básica y (opcional) self‑host de fuentes.  
8) P2 — Husky/lint‑staged + E2E + budgets.  
9) P2 — PWA (si se decide).
