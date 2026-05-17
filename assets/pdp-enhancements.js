/**
 * ACHARKHASTORY — PDP Sticky Mobile Bar
 * Shows fixed bottom bar when product title scrolls out of viewport.
 * Also handles Add-to-Bag button "✓ ADDED" feedback animation.
 */
(function () {
  'use strict';

  /* --- Sticky Bar --- */
  var stickyBar = document.querySelector('.pdp-sticky-bar');
  var productTitle = document.querySelector('.product__title');

  if (stickyBar && productTitle) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          stickyBar.classList.toggle('is-visible', !entry.isIntersecting);
        });
      },
      { threshold: 0, rootMargin: '-64px 0px 0px 0px' }
    );
    observer.observe(productTitle);
  }

  /* --- Add to Bag Feedback --- */
  document.querySelectorAll('form[action="/cart/add"]').forEach(function (form) {
    form.addEventListener('submit', function () {
      var btn = form.querySelector('[name="add"], .product-form__submit');
      if (!btn) return;

      var original = btn.textContent;
      btn.textContent = '✓ ADDED';
      btn.style.pointerEvents = 'none';

      setTimeout(function () {
        btn.textContent = original;
        btn.style.pointerEvents = '';
      }, 2000);
    });
  });
})();
