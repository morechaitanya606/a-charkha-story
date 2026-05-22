// @ts-nocheck
/**
 * Acharkhastory global runtime utilities.
 *
 * Handles header metrics, scroll state, announcement dismissal, bottom-nav
 * detection, virtual keyboard detection, reveal animations, counters, and
 * AJAX quick-add forms.
 */

(function acsGlobal() {
  'use strict';

  const root = document.documentElement;
  const body = document.body;
  const headerGroup = /** @type {HTMLElement | null} */ (document.querySelector('#header-group'));
  const header = document.querySelector('header-component');
  const bottomNav = document.querySelector('.acs-bottom-nav');
  const announcement = document.querySelector(
    '[data-acs-announcement], .acs-announcement, .announcement-bar'
  );
  const announcementDismiss = document.querySelector(
    '[data-acs-announcement-dismiss], .acs-announcement__dismiss, [data-announcement-dismiss]'
  );
  const STORAGE_KEY = 'acs-announcement-dismissed';

  /**
   * @param {() => void} callback
   * @param {number} delay
   * @returns {() => void}
   */
  function debounce(callback, delay) {
    /** @type {ReturnType<typeof setTimeout> | undefined} */
    let timer;
    return function () {
      window.clearTimeout(timer);
      timer = window.setTimeout(callback, delay);
    };
  }

  /**
   * @param {string} key
   * @returns {string}
   */
  function getSessionValue(key) {
    try {
      return window.sessionStorage.getItem(key) || '';
    } catch (_error) {
      return '';
    }
  }

  /**
   * @param {string} key
   * @param {string} value
   */
  function setSessionValue(key, value) {
    try {
      window.sessionStorage.setItem(key, value);
    } catch (_error) {
      return;
    }
  }

  function setHeaderMetrics() {
    if (!headerGroup) return;
    const headerHeight = headerGroup.offsetHeight || 0;
    body.style.setProperty('--acs-header-height', `${headerHeight}px`);
    root.style.setProperty('--acs-header-height', `${headerHeight}px`);
  }

  function setHeaderState() {
    const isScrolled = window.scrollY > 8;
    body.classList.toggle('acs-header-is-scrolled', isScrolled);
    headerGroup?.classList.toggle('acs-header-group--scrolled', isScrolled);
    header?.classList.toggle('acs-header--scrolled', isScrolled);
  }

  function setKeyboardState() {
    if (!window.visualViewport) return;
    const keyboardOpen = window.innerHeight - window.visualViewport.height > 120;
    body.classList.toggle('acs-keyboard-open', keyboardOpen);
  }

  if (announcement && getSessionValue(STORAGE_KEY) === 'true') {
    announcement.setAttribute('hidden', '');
  }

  announcementDismiss?.addEventListener('click', function () {
    const target = announcementDismiss.closest(
      '[data-acs-announcement], .acs-announcement, .announcement-bar'
    );
    (target || announcement)?.setAttribute('hidden', '');
    setSessionValue(STORAGE_KEY, 'true');
  });

  setHeaderMetrics();
  setHeaderState();
  setKeyboardState();
  body.classList.toggle('acs-has-bottom-nav', Boolean(bottomNav));

  window.addEventListener('scroll', setHeaderState, { passive: true });
  window.addEventListener('resize', debounce(setHeaderMetrics, 150));
  window.visualViewport?.addEventListener('resize', debounce(setKeyboardState, 150));

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.acs-reveal').forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    document.querySelectorAll('.acs-reveal').forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;

          const el = entry.target;
          const rawAttr = el.getAttribute('data-acs-count-target');
          const target = parseInt(rawAttr || '0', 10);
          if (isNaN(target)) return;

          el.classList.add('is-visible');
          counterObserver.unobserve(el);

          if (prefersReducedMotion) {
            el.textContent = target.toLocaleString();
            return;
          }

          const duration = 1200;
          const start = performance.now();

          /** @param {number} now */
          function tick(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(target * eased).toLocaleString();
            if (progress < 1) requestAnimationFrame(tick);
          }

          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll('.acs-counter').forEach(function (el) {
      counterObserver.observe(el);
    });
  } else {
    document.querySelectorAll('.acs-counter').forEach(function (el) {
      const rawAttr = el.getAttribute('data-acs-count-target');
      el.textContent = parseInt(rawAttr || '0', 10).toLocaleString();
      el.classList.add('is-visible');
    });
  }

  document.addEventListener('submit', function (/** @type {Event} */ event) {
    const target = /** @type {HTMLElement | null} */ (event.target);
    const form = /** @type {HTMLFormElement | null} */ (target?.closest('[data-acs-ajax-add]'));
    if (!form) return;

    event.preventDefault();
    const button = /** @type {HTMLButtonElement | null} */ (form.querySelector('button[type="submit"]'));
    const originalText = button?.textContent || '';

    if (button) {
      button.disabled = true;
      button.textContent = 'Adding...';
    }

    fetch(window.Theme?.routes?.cart_add_url || '/cart/add.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: new URLSearchParams(
        /** @type {Record<string, string>} */ (Object.fromEntries(new FormData(form)))
      ),
    })
      .then(function (response) {
        if (!response.ok) {
          return response.json().then(function (data) {
            throw new Error(data.description || 'Add to cart failed');
          });
        }
        return response.json();
      })
      .then(function () {
        if (button) button.textContent = 'Added';
        document.dispatchEvent(new CustomEvent('acs:cart-updated'));
        document.dispatchEvent(new CustomEvent('cart:refresh'));
        window.setTimeout(function () {
          if (button) {
            button.textContent = originalText;
            button.disabled = false;
          }
        }, 1500);
      })
      .catch(function (error) {
        var errorMessage = 'Could not add to cart';
        if (error && error.message) errorMessage = error.message;
        if (button) {
          button.textContent = errorMessage;
          button.disabled = false;
          window.setTimeout(function () {
            if (button) button.textContent = originalText;
          }, 2500);
        }
      });
  });
  /* Back to top button */
  (function initBackToTop() {
    const btn = document.createElement('button');
    btn.className = 'acs-back-to-top';
    btn.setAttribute('aria-label', 'Back to top');
    btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>';
    // styles handled by .acs-back-to-top class in acharkhastory.css
    body.appendChild(btn);

    function toggleBtn() {
      var show = window.scrollY > 600;
      btn.classList.toggle('is-visible', show);
    }

    btn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });

    window.addEventListener('scroll', debounce(toggleBtn, 100), { passive: true });
    toggleBtn();
  })();
})();
