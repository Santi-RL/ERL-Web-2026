/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './nosotros.html',
    './servicios.html',
    './planes.html',
    './casos-de-exito.html',
    './recursos.html',
    './blog.html',
    './contacto.html',
    './politica-de-privacidad.html',
    './terminos-y-condiciones.html',
    './mapa-del-sitio.html',
    './src/**/*.{js,css}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00B3D7',
          light: '#66D1E6',
          dark: '#0089A3',
        },
        secondary: {
          DEFAULT: '#6366F1',
          light: '#A5B4FC',
          dark: '#4F46E5',
        },
        accent: {
          DEFAULT: '#EC4899',
          light: '#F9A8D4',
          dark: '#DB2777',
        },
        success: {
          DEFAULT: '#10B981',
          light: '#6EE7B7',
          dark: '#059669',
        },
        dark: '#1E293B',
        light: '#F8FAFC',
        'gray-light': '#E2E8F0',
        'gray-dark': '#64748B',
        whatsapp: '#25D366',
        'whatsapp-dark': '#128C7E',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #00B3D7 0%, #00A29A 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
        'gradient-accent': 'linear-gradient(135deg, #EC4899 0%, #F43F5E 100%)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
