import './styles/main.css';
import { createIcons, icons } from 'lucide';

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

const translateWeb3FormsMessage = (message, fallback, type) => {
  if (!message) return fallback;

  const translations = {
    'Form submission successful.': '¡Gracias! Recibimos tu mensaje y te contactaremos a la brevedad.',
    'Message received successfully.': '¡Gracias! Recibimos tu mensaje y te contactaremos a la brevedad.',
    'Required fields are missing.': 'Faltan datos obligatorios. Revisá el formulario y volvé a intentar.',
    'Bot detected.': 'Detectamos actividad inusual. Completá el formulario manualmente e intentá nuevamente.',
    'Invalid access key.': 'La clave del formulario no es válida. Avisanos para que podamos resolverlo.',
    'Unable to send email. Please try again later.': 'No pudimos enviar el mensaje. Intentá más tarde o escribinos por otro canal.',
  };

  const normalized = message.trim();
  const translated = translations[normalized];

  if (!translated) {
    if (type === 'error') {
      console.warn('Web3Forms error:', message);
    }
    return fallback;
  }

  return translated;
};

const toggleSubmittingState = (form, isSubmitting) => {
  const submitButton = form.querySelector('[type="submit"]');
  if (!submitButton) return;

  if (isSubmitting) {
    submitButton.disabled = true;
    submitButton.dataset.originalText = submitButton.dataset.originalText || submitButton.innerHTML;
    submitButton.innerHTML = 'Enviando...';
    submitButton.setAttribute('aria-busy', 'true');
  } else {
    submitButton.disabled = false;
    if (submitButton.dataset.originalText) {
      submitButton.innerHTML = submitButton.dataset.originalText;
    }
    submitButton.removeAttribute('aria-busy');
  }
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

    form.addEventListener('submit', async (event) => {
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
      const formData = new FormData(form);
      if (formData.get('botcheck')) {
        return;
      }

      const emailValue = formData.get('email');
      if (emailValue && !formData.get('reply_to')) {
        formData.append('reply_to', emailValue);
      }

      setFeedback(feedback, '', '');
      toggleSubmittingState(form, true);

      try {
        const response = await fetch(form.action, {
          method: form.method || 'POST',
          body: formData,
          headers: {
            Accept: 'application/json',
          },
        });

        const data = await response.json().catch(() => null);
        if (response.ok && data?.success) {
          const successMessage = translateWeb3FormsMessage(
            data?.message,
            defaultSuccess,
            'success',
          );
          setFeedback(feedback, 'success', successMessage);
          form.reset();
        } else {
          const message = translateWeb3FormsMessage(
            data?.message,
            defaultError,
            'error',
          );
          setFeedback(feedback, 'error', message);
        }
      } catch (error) {
        setFeedback(feedback, 'error', defaultError);
        console.error('Form submission failed', error);
      } finally {
        toggleSubmittingState(form, false);
      }
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
  handleFontsLoading();
  createIcons({ icons });
  setActiveNavigation();
  setupMobileNavigation();
  setupHeaderShadow();
  setupRevealAnimations();
  setupForms();
  setCurrentYear();
};

document.addEventListener('DOMContentLoaded', bootstrap);
