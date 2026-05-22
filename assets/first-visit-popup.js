/**
 * Acharkhastory first-visit capture.
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-acs-capture]').forEach(initCapture);
  });

  function initCapture(root) {
    if (root.dataset.acsCaptureReady === 'true') return;

    const popup = root.querySelector('[data-acs-capture-popup]');
    const mobileBar = root.querySelector('[data-acs-capture-mobile]');
    const dismissButtons = root.querySelectorAll('[data-acs-capture-dismiss]');
    const forms = root.querySelectorAll('form');
    const storageKey = root.dataset.storageKey || 'acs-first-visit-capture';
    const delay = Number.parseInt(root.dataset.delay, 10) || 8000;
    const exitIntent = root.dataset.exitIntent === 'true';
    const isProductPage = document.body.dataset.template?.includes('product') || window.location.pathname.includes('/products/');
    const isCheckout = window.location.pathname.includes('/checkout');
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    root.dataset.acsCaptureReady = 'true';

    if (window.sessionStorage.getItem(storageKey) === 'dismissed' || isProductPage || isCheckout) return;

    const markDismissed = function (eventName) {
      window.sessionStorage.setItem(storageKey, 'dismissed');
      popup?.classList.remove('is-open');
      mobileBar?.classList.remove('is-open');

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: eventName });
    };

    const open = function () {
      if (window.sessionStorage.getItem(storageKey) === 'dismissed') return;

      if (isMobile) {
        mobileBar?.classList.add('is-open');
      } else {
        popup?.classList.add('is-open');
      }
    };

    window.setTimeout(open, delay);

    if (exitIntent && !isMobile) {
      document.addEventListener(
        'pointermove',
        function (event) {
          if (event.clientY <= 18) open();
        },
        { passive: true }
      );
    }

    dismissButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        markDismissed('popup_dismissed');
      });
    });

    forms.forEach(function (form) {
      form.addEventListener('submit', function () {
        window.sessionStorage.setItem(storageKey, 'dismissed');
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: 'popup_converted' });
      });
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        markDismissed('popup_dismissed');
      }
    });
  }
})();
