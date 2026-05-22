// @ts-nocheck
/**
 * Acharkhastory — Wishlist (localStorage)
 * Global script that powers the heart toggle on PDP and product cards.
 * Stores product handles in localStorage under key 'acs_wishlist'.
 */
(function(){
  'use strict';

  var STORAGE_KEY = 'acs_wishlist';

  /** @returns {string[]} */
  function getWishlist() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch(e) {
      return [];
    }
  }

  /** @param {string[]} list */
  function saveWishlist(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    updateBadges(list.length);
  }

  /** @param {number} count */
  function updateBadges(count) {
    document.querySelectorAll('[data-wishlist-badge]').forEach(function(el) {
      el.textContent = count;
      el.hidden = count === 0;
    });
  }

  /** @param {string} handle */
  function isInWishlist(handle) {
    return getWishlist().indexOf(handle) !== -1;
  }

  /** @param {string} handle */
  function toggleWishlist(handle) {
    var list = getWishlist();
    var idx = list.indexOf(handle);
    if (idx === -1) {
      list.push(handle);
    } else {
      list.splice(idx, 1);
    }
    saveWishlist(list);
    return idx === -1; /* returns true if added */
  }

  function syncButtons() {
    document.querySelectorAll('[data-acs-wishlist]').forEach(function(btn) {
      var handle = btn.dataset.productHandle;
      if (!handle) return;
      var active = isInWishlist(handle);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
      /* Visual heart fill */
      var heartEl = btn.querySelector('[aria-hidden]');
      if (heartEl) {
        heartEl.innerHTML = active ? '&#9829;' : '&#9825;';
      }
    });
  }

  function init() {
    /* Update header badge on page load */
    updateBadges(getWishlist().length);

    /* Sync all heart buttons on page */
    syncButtons();

    /* Delegate click handler for wishlist buttons */
    document.addEventListener('click', function(e) {
      var btn = e.target.closest('[data-acs-wishlist]');
      if (!btn) return;

      var handle = btn.dataset.productHandle;
      if (!handle) return;

      e.preventDefault();
      var added = toggleWishlist(handle);

      /* Update this button */
      btn.setAttribute('aria-pressed', added ? 'true' : 'false');
      var heartEl = btn.querySelector('[aria-hidden]');
      if (heartEl) {
        heartEl.innerHTML = added ? '&#9829;' : '&#9825;';
      }

      /* Micro-animation */
      btn.style.transform = 'scale(1.2)';
      setTimeout(function() {
        btn.style.transform = '';
      }, 200);

      /* Announce to screen readers */
      var status = document.querySelector('[data-acs-form-message]');
      if (status) {
        status.textContent = added ? 'Added to wishlist' : 'Removed from wishlist';
        status.hidden = false;
        setTimeout(function() { status.hidden = true; }, 2000);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
