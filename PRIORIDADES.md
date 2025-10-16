# Plan de implementación priorizado

## 1. Unificar la estructura base
- Extraer el layout (header, footer y estilos base) en componentes reutilizables dentro de `src/`.
- Eliminar plantillas HTML incrustadas en cadenas dentro de `src/main.js` para evitar duplicidad y mezclar responsabilidades.
- Configurar un mecanismo de build (por ejemplo, componentes de Vite con JSX o templating) que permita compartir la estructura entre todas las páginas.
- Validar que todas las páginas estáticas utilicen el layout único y que los estilos inline queden centralizados.

## 2. Higiene del código y configuración
- Retirar `console.log` de depuración y scripts temporales como `fix-headers.js` o encapsularlos detrás de banderas de entorno.
- Revisar dependencias y configurar linters/formatters (ESLint, Prettier) para reforzar consistencia.
- Añadir scripts de verificación (`npm run lint`, `npm run format`) al pipeline local antes de los commits.

## 3. Optimización de rendimiento y assets
- Sustituir imágenes remotas de gran tamaño por versiones optimizadas locales, añadiendo estrategias de carga diferida cuando aplique.
- Eliminar `setTimeout` para sincronizar inicializaciones y utilizar eventos del ciclo de vida adecuados.
- Incorporar preloads/preconnect cuando sean necesarios y asegurarse de que el CSS crítico se sirva de forma eficiente.

## 4. Pruebas y verificación continua
- Implementar pruebas de smoke/manuales para validar la carga de la UI tras los refactors estructurales.
- Integrar pruebas automatizadas básicas (por ejemplo, Playwright o Cypress) para flows críticos.
- Medir performance con Lighthouse o WebPageTest tras cada iteración para confirmar las mejoras.

## 5. Iteraciones posteriores
- Ajustar microinteracciones y accesibilidad (focus states, roles ARIA) una vez estabilizada la estructura.
- Documentar la nueva arquitectura y guidelines de contribución en el repositorio.
- Revisar periódicamente métricas de rendimiento y experiencia de usuario para detectar regresiones.
