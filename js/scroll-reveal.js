/* ==========================================================================
   SCROLL REVEAL — IntersectionObserver fade + slide animations
   Elements with [data-reveal] attribute animate in on scroll
   Supports data-reveal-delay="100" for staggered entry
   ========================================================================== */

(function () {
  'use strict';

  // Skip if user prefers reduced motion (CSS handles showing elements)
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  function init() {
    const elements = document.querySelectorAll('[data-reveal]');
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = el.getAttribute('data-reveal-delay');

            if (delay) {
              el.style.transitionDelay = delay + 'ms';
            }

            // Small rAF to ensure the transition-delay is applied before the class
            requestAnimationFrame(() => {
              el.classList.add('revealed');
            });

            observer.unobserve(el);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    elements.forEach((el) => observer.observe(el));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
