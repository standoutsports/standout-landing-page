/* ==========================================================================
   NAV — Hamburger toggle, mobile panel, smooth scroll, sticky behaviour
   ========================================================================== */

(function () {
  'use strict';

  function init() {
    const nav = document.getElementById('nav');
    const hamburger = nav?.querySelector('.nav__hamburger');
    const mobilePanel = nav?.querySelector('.nav__mobile-panel');
    const mobileLinks = nav?.querySelectorAll('.nav__mobile-link');

    if (!nav || !hamburger) return;

    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
      const isOpen = nav.classList.contains('nav--open');

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    function openMenu() {
      nav.classList.add('nav--open');
      hamburger.setAttribute('aria-expanded', 'true');
      hamburger.setAttribute('aria-label', 'Close menu');
    }

    function closeMenu() {
      nav.classList.remove('nav--open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'Open menu');
    }

    // Close on mobile link click
    mobileLinks?.forEach((link) => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (nav.classList.contains('nav--open') && !nav.contains(e.target)) {
        closeMenu();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('nav--open')) {
        closeMenu();
        hamburger.focus();
      }
    });

    // Subtle nav background strengthen on scroll
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (window.scrollY > 50) {
            nav.style.backgroundColor = 'rgba(15, 15, 15, 0.95)';
          } else {
            nav.style.backgroundColor = '';
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
