/**
 * Acharkhastory recently viewed bar.
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-acs-recently-viewed-bar]').forEach(initBar);
  });

  function initBar(bar) {
    const storageKey = bar.dataset.storageKey || 'viewedProducts';
    const closeButton = bar.querySelector('[data-acs-recently-viewed-close]');
    const countNode = bar.querySelector('[data-acs-recently-viewed-count]');
    let viewedProducts = [];

    try {
      const storedValue = window.localStorage.getItem(storageKey);
      const parsedValue = storedValue ? JSON.parse(storedValue) : [];

      viewedProducts = Array.isArray(parsedValue) ? parsedValue : [];
    } catch (error) {
      viewedProducts = [];
    }

    if (!viewedProducts.length || window.sessionStorage.getItem('acs-recently-viewed-closed') === 'true') return;

    if (countNode) {
      countNode.textContent = String(viewedProducts.length);
    }

    bar.removeAttribute('hidden');

    closeButton?.addEventListener('click', function () {
      window.sessionStorage.setItem('acs-recently-viewed-closed', 'true');
      bar.setAttribute('hidden', '');
    });
  }
})();
