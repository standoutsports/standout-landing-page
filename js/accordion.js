/* ==========================================================================
   ACCORDION — FAQ expand/collapse
   Single-open mode: opening one item closes others
   ========================================================================== */

(function () {
  'use strict';

  function init() {
    const triggers = document.querySelectorAll('.accordion__trigger');
    if (!triggers.length) return;

    triggers.forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const item = trigger.closest('.accordion__item');
        const isOpen = item.classList.contains('is-open');

        // Close all other items (single-open mode)
        const siblings = item.parentElement.querySelectorAll('.accordion__item');
        siblings.forEach((sibling) => {
          if (sibling !== item) {
            sibling.classList.remove('is-open');
            sibling.querySelector('.accordion__trigger').setAttribute('aria-expanded', 'false');
            sibling.querySelector('.accordion__content').setAttribute('aria-hidden', 'true');
          }
        });

        // Toggle current item
        if (isOpen) {
          item.classList.remove('is-open');
          trigger.setAttribute('aria-expanded', 'false');
          item.querySelector('.accordion__content').setAttribute('aria-hidden', 'true');
        } else {
          item.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
          item.querySelector('.accordion__content').setAttribute('aria-hidden', 'false');
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
