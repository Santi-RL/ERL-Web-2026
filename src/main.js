import './styles/main.css';
import { createIcons } from 'lucide';

document.documentElement.classList.add('has-js');

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
      createIcons({ nodes: [menuIcon] });
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

  const revealVisible = (element) => element.classList.add('reveal-visible');

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

const bootstrap = () => {
  createIcons();
  setActiveNavigation();
  setupMobileNavigation();
  setupHeaderShadow();
  setupRevealAnimations();
  setupForms();
  setCurrentYear();
};

document.addEventListener('DOMContentLoaded', bootstrap);
