/**
 * Acharkhastory recently viewed products.
 * Tracks product handles in localStorage and renders a small horizontal strip.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'acs-recently-viewed';
  var MAX_ITEMS = 12;

  /**
   * @returns {string[]}
   */
  function getViewed() {
    try {
      var data = localStorage.getItem(STORAGE_KEY);
      var parsed = data ? JSON.parse(data) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (_error) {
      return [];
    }
  }

  /**
   * @param {string[]} handles
   */
  function saveViewed(handles) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(handles.slice(0, MAX_ITEMS)));
    } catch (_error) {
      return;
    }
  }

  /**
   * @param {string} value
   * @returns {string}
   */
  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /**
   * @param {string} handle
   */
  function trackProduct(handle) {
    if (!handle) return;
    var viewed = getViewed().filter(function (item) {
      return item !== handle;
    });
    viewed.unshift(handle);
    saveViewed(viewed);
  }

  /**
   * @param {Element} container
   */
  function renderRecentlyViewed(container) {
    var currentHandle = container.getAttribute('data-exclude-handle') || '';
    var viewed = getViewed().filter(function (handle) {
      return handle !== currentHandle;
    });

    if (!viewed.length) {
      container.setAttribute('hidden', '');
      return;
    }

    var grid = container.querySelector('[data-acs-rv-grid]');
    if (!grid) return;

    var fragment = document.createDocumentFragment();
    var loaded = 0;
    var limit = Math.min(viewed.length, 6);

    viewed.slice(0, limit).forEach(function (handle) {
      fetch('/products/' + encodeURIComponent(handle) + '.json')
        .then(function (response) {
          return response.ok ? response.json() : null;
        })
        .then(function (data) {
          if (!data || !data.product) return;

          var product = data.product;
          var image = product.image ? product.image.src.replace(/\.([^.]+)$/, '_300x.$1') : '';
          var price = product.variants && product.variants[0] ? product.variants[0].price : '';
          var card = document.createElement('a');

          card.href = '/products/' + handle;
          card.className = 'acs-rv__card acs-card-lift';
          card.innerHTML =
            '<div class="acs-rv__image">' +
            (image
              ? '<img src="' + escapeHtml(image) + '" alt="' + escapeHtml(product.title) + '" loading="lazy" width="150" height="188">'
              : '') +
            '</div>' +
            '<span class="acs-rv__title">' + escapeHtml(product.title) + '</span>' +
            '<span class="acs-rv__price">Rs. ' + escapeHtml(price) + '</span>';
          fragment.appendChild(card);
        })
        .catch(function () {
          return;
        })
        .finally(function () {
          loaded += 1;
          if (loaded >= limit && fragment.childNodes.length) {
            grid.appendChild(fragment);
            container.removeAttribute('hidden');
          }
        });
    });
  }

  var productHandle =
    document.body.getAttribute('data-product-handle') ||
    (window.location.pathname.match(/\/products\/([^/?#]+)/) || [])[1];

  if (productHandle) trackProduct(productHandle);

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-acs-recently-viewed]').forEach(renderRecentlyViewed);
  });
})();

