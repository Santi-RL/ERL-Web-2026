import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
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
