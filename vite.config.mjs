import { readFileSync, existsSync } from 'fs';
import { basename, resolve } from 'path';
import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';

const pageData = {
  'index.html': {
    footerQuickLinks: [
      { href: 'nosotros.html', label: 'Sobre Nosotros' },
      { href: 'recursos.html', label: 'Recursos' },
      { href: 'casos-de-exito.html', label: 'Clientes' },
      { href: '#contacto', label: 'Contacto' },
      { href: 'blog.html', label: 'Blog' },
    ],
  },
};

const manifestPath = resolve(__dirname, 'src/data/image-manifest.json');
const imageManifest = existsSync(manifestPath)
  ? JSON.parse(readFileSync(manifestPath, 'utf8'))
  : {};

console.log('[vite] responsive images loaded:', Object.keys(imageManifest).length);

const globalContext = {
  images: imageManifest,
};

export default defineConfig({
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'src/partials'),
      helpers: {
        srcset(entries = []) {
          return entries.map((entry) => `${entry.src} ${entry.width}w`).join(', ');
        },
        fallbackSrc(entries = []) {
          return entries.at(-1)?.src ?? '';
        },
        default(value, fallback) {
          return value ?? fallback;
        },
      },
      context(pagePath) {
        return {
          ...globalContext,
          ...(pageData[basename(pagePath)] ?? {}),
        };
      },
    }),
  ],
  server: {
    allowedHosts: ['test.estudiorojaslem.com'],
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        nosotros: resolve(__dirname, 'nosotros.html'),
        servicios: resolve(__dirname, 'servicios.html'),
        planes: resolve(__dirname, 'planes.html'),
        casos: resolve(__dirname, 'casos-de-exito.html'),
        recursos: resolve(__dirname, 'recursos.html'),
        blog: resolve(__dirname, 'blog.html'),
        contacto: resolve(__dirname, 'contacto.html'),
        privacidad: resolve(__dirname, 'politica-de-privacidad.html'),
        terminos: resolve(__dirname, 'terminos-y-condiciones.html'),
        mapa: resolve(__dirname, 'mapa-del-sitio.html'),
      },
    },
  },
});
