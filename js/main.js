window.siteUtils = {
  formatDate(dateString) {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  },

  debounce(fn, delay) {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
  },

  renderMath(element) {
    if (!window.renderMathInElement) return;
    window.renderMathInElement(element, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false }
      ],
      throwOnError: false
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const backToTop = document.getElementById('backToTop');
  const toolToggles = document.querySelectorAll('[data-tools-toggle]');

  function closeMenu() {
    navLinks?.classList.remove('active');
    navToggle?.setAttribute('aria-expanded', 'false');
    navToggle?.setAttribute('aria-label', 'Open navigation');
    document.body.classList.remove('menu-open');
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('active');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
      document.body.classList.toggle('menu-open', isOpen);
    });

    navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  if (backToTop) {
    const updateBackToTop = window.siteUtils.debounce(() => {
      backToTop.classList.toggle('visible', window.scrollY > 500);
    }, 40);
    window.addEventListener('scroll', updateBackToTop, { passive: true });
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  toolToggles.forEach((button) => {
    const panel = document.getElementById(button.dataset.toolsToggle);
    if (!panel) return;
    const storageKey = `page-tools:${button.dataset.toolsToggle}`;
    let collapsed = window.matchMedia('(max-width: 760px)').matches;
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved !== null) collapsed = saved === 'collapsed';
    } catch (error) {
      // The control works without persistence when browser storage is unavailable.
    }

    const update = () => {
      panel.classList.toggle('is-collapsed', collapsed);
      button.setAttribute('aria-expanded', String(!collapsed));
      const state = button.querySelector('[data-tools-state]');
      if (state) state.textContent = collapsed ? 'Show' : 'Hide';
    };

    button.addEventListener('click', () => {
      collapsed = !collapsed;
      update();
      try {
        localStorage.setItem(storageKey, collapsed ? 'collapsed' : 'expanded');
      } catch (error) {
        // Persistence is optional.
      }
    });
    update();
  });
});
