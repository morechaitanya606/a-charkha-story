/**
 * Acharkhastory product carousel controls.
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-acs-product-carousel]').forEach(initCarousel);
  });

  function initCarousel(carousel) {
    if (carousel.dataset.acsCarouselReady === 'true') return;

    const track = carousel.querySelector('[data-acs-product-carousel-track]');
    const previousButton = carousel.querySelector('[data-acs-carousel-prev]');
    const nextButton = carousel.querySelector('[data-acs-carousel-next]');

    if (!track || !previousButton || !nextButton) return;

    carousel.dataset.acsCarouselReady = 'true';

    const scrollByPage = function (direction) {
      const amount = Math.max(track.clientWidth * 0.82, 280);

      track.scrollBy({
        left: amount * direction,
        behavior: 'smooth'
      });
    };

    previousButton.addEventListener('click', function () {
      scrollByPage(-1);
    });

    nextButton.addEventListener('click', function () {
      scrollByPage(1);
    });
  }
})();
