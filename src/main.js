import './styles/main.css';
import { createIcons, icons } from 'lucide';

// Cargar el header
const loadHeader = async () => {
    const headerPlaceholder = document.querySelector('#header-placeholder');
    if (!headerPlaceholder) {
        console.error('No se encontró el elemento #header-placeholder');
        return false;
    }
    
    console.log('Elemento #header-placeholder encontrado, intentando cargar header');

    // MÉTODO 1: Cargar desde archivo en public
    try {
        console.log('Intentando cargar header desde /components/header.html');
        const response = await fetch('/components/header.html');
        if (response.ok) {
            const headerHtml = await response.text();
            headerPlaceholder.outerHTML = headerHtml;
            console.log('Header cargado exitosamente desde archivo');
            return true;
        } else {
            console.warn('La solicitud para obtener header.html no fue exitosa:', response.status);
        }
    } catch (error) {
        console.error('Error al cargar header desde archivo:', error);
    }

    // MÉTODO 2: Directamente en el código
    console.log('Utilizando fallback: header incrustado en código');
    try {
        const headerHTML = `
        <header id="header" class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md shadow-sm">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <a href="index.html#inicio" class="text-2xl font-bold font-display text-primary flex items-center">
                        <img src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80" alt="Logo Rojas Lem" class="h-8 w-8 mr-2 rounded-full">
                        Rojas Lem
                    </a>
                    <nav class="hidden md:flex space-x-6 items-center">
                        <a href="index.html#inicio" class="text-gray-dark hover:text-primary transition duration-300">Inicio</a>
                        <a href="nosotros.html" data-nav="nosotros" class="text-gray-dark hover:text-primary transition duration-300">Nosotros</a>
                        <a href="servicios.html" data-nav="servicios" class="text-gray-dark hover:text-primary transition duration-300">Servicios</a>
                        <a href="planes.html" data-nav="planes" class="text-gray-dark hover:text-primary transition duration-300">Planes</a>
                        <a href="casos-de-exito.html" data-nav="casos" class="text-gray-dark hover:text-primary transition duration-300">Casos de éxito</a>
                        <a href="recursos.html" data-nav="recursos" class="text-gray-dark hover:text-primary transition duration-300">Recursos</a>
                        <a href="blog.html" data-nav="blog" class="text-gray-dark hover:text-primary transition duration-300">Blog</a>
                        <a href="contacto.html" data-nav="contacto" class="btn btn-outline-primary px-4 py-2">Agenda tu Consulta</a>
                    </nav>
                    <button id="mobile-menu-button" class="md:hidden text-dark focus:outline-none">
                        <i data-lucide="menu" class="w-6 h-6"></i>
                    </button>
                </div>
            </div>
            <div id="mobile-menu" class="hidden md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg py-4 z-40">
                <nav class="flex flex-col space-y-4 px-6">
                    <a href="index.html#inicio" class="block text-gray-dark hover:text-primary transition duration-300">Inicio</a>
                    <a href="nosotros.html" class="block text-gray-dark hover:text-primary transition duration-300">Nosotros</a>
                    <a href="servicios.html" class="block text-gray-dark hover:text-primary transition duration-300">Servicios</a>
                    <a href="planes.html" class="block text-gray-dark hover:text-primary transition duration-300">Planes</a>
                    <a href="casos-de-exito.html" class="block text-gray-dark hover:text-primary transition duration-300">Casos de éxito</a>
                    <a href="recursos.html" class="block text-gray-dark hover:text-primary transition duration-300">Recursos</a>
                    <a href="blog.html" class="block text-gray-dark hover:text-primary transition duration-300">Blog</a>
                    <a href="contacto.html" class="btn btn-outline-primary w-full mt-2">Agenda tu Consulta</a>
                </nav>
            </div>
        </header>
        `;
        
        headerPlaceholder.outerHTML = headerHTML;
        console.log('Header cargado desde solución incrustada');
        return true;
    } catch (error) {
        console.error('Error crítico al cargar el header:', error);
        return false;
    }
};

// Función para manejar la carga de fuentes y evitar FOUC
const handleFontsLoading = () => {
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
            document.documentElement.classList.add('fonts-loaded');
        });
    } else {
        // Fallback para navegadores que no soportan document.fonts
        document.documentElement.classList.add('fonts-loaded');
    }
};

const setActiveNavigation = () => {
  const activePage = document.body?.dataset?.page;
  if (!activePage) return;

  document.querySelectorAll(`[data-nav="${activePage}"]`).forEach((link) => {
    if (link.classList.contains('btn')) return;
    link.classList.remove('text-gray-dark');
    link.classList.add('text-primary', 'font-semibold');
  });
};

const setupMobileNavigation = () => {
  const menuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!menuButton || !mobileMenu) return;

  const menuIcon = menuButton.querySelector('i[data-lucide]');

  const toggleMenu = () => {
    mobileMenu.classList.toggle('hidden');

      if (menuIcon) {
        const isHidden = mobileMenu.classList.contains('hidden');
        menuIcon.setAttribute('data-lucide', isHidden ? 'menu' : 'x');
        createIcons({ nodes: [menuIcon], icons });
      }
    };

  menuButton.addEventListener('click', toggleMenu);
  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (!mobileMenu.classList.contains('hidden')) {
        toggleMenu();
      }
    });
  });
};

const setupHeaderShadow = () => {
  const header = document.getElementById('header');
  if (!header) return;

  const toggleShadow = () => {
    if (window.scrollY > 50) {
      header.classList.add('shadow-md');
      header.classList.remove('shadow-sm');
    } else {
      header.classList.remove('shadow-md');
      header.classList.add('shadow-sm');
    }
  };

  toggleShadow();
  window.addEventListener('scroll', toggleShadow, { passive: true });
};

const setupRevealAnimations = () => {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  const prefersReducedMotion = window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : { matches: false };

  const hideElement = (element) => {
    element.dataset.revealState = 'hidden';
  };

  const revealVisible = (element) => {
    element.dataset.revealState = 'visible';
  };

  revealElements.forEach(hideElement);

  if (!prefersReducedMotion.matches && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealVisible(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      },
    );

    revealElements.forEach((element) => revealObserver.observe(element));
  } else {
    revealElements.forEach(revealVisible);
  }
};

const setFeedback = (target, state, message) => {
  if (!target) {
    if (state === 'error' && message) {
      window.alert(message);
    }
    return;
  }

  if (!message) {
    target.dataset.state = '';
    target.textContent = '';
    target.classList.add('hidden');
    return;
  }

  target.dataset.state = state;
  target.textContent = message;
  target.classList.remove('hidden');
};

const setupForms = () => {
  document.querySelectorAll('form[data-validate]').forEach((form) => {
    const feedback = form.querySelector('[data-feedback]');
    const defaultSuccess =
      form.getAttribute('data-success-message') ||
      '¡Gracias! Nos pondremos en contacto a la brevedad.';
    const defaultError =
      form.getAttribute('data-error-message') ||
      'Por favor completá los campos obligatorios.';

    form.addEventListener('submit', (event) => {
      const requiredFields = [
        ...form.querySelectorAll('[data-required]'),
      ];
      const emptyField = requiredFields.find(
        (field) => !field.value || !field.value.trim(),
      );

      if (emptyField) {
        event.preventDefault();
        setFeedback(feedback, 'error', defaultError);
        emptyField.focus();
        return;
      }

      event.preventDefault();
      setFeedback(feedback, 'success', defaultSuccess);
      form.reset();
    });

    form.addEventListener('input', () => {
      if (!feedback || feedback.dataset.state !== 'error') return;
      const invalid = [...form.querySelectorAll('[data-required]')].some(
        (field) => !field.value || !field.value.trim(),
      );
      if (!invalid) {
        setFeedback(feedback, '', '');
      }
    });
  });
};

const setCurrentYear = () => {
  const yearTarget = document.getElementById('current-year');
  if (yearTarget) {
    yearTarget.textContent = new Date().getFullYear();
  }
};

const bootstrap = async () => {
  // Inicializar manejo de fuentes
  handleFontsLoading();
  
  // Cargar el header primero
  const headerLoaded = await loadHeader();
  
  // Timeout para asegurarnos de que el DOM esté actualizado
  setTimeout(() => {
    // Luego inicializar todo lo demás
    createIcons({ icons });
    setActiveNavigation();
    setupMobileNavigation();
    setupHeaderShadow();
    setupRevealAnimations();
    setupForms();
    setCurrentYear();
    
    // Verificar que todo esté correctamente cargado
    if (document.querySelector('#header')) {
      console.log('Header cargado correctamente');
    } else {
      console.error('Error: El header no se cargó correctamente');
    }
  }, 100);
};

document.addEventListener('DOMContentLoaded', bootstrap);
