/**
 * Acharkhastory hero slider.
 * Vanilla JS carousel with autoplay, pointer swipe, keyboard support,
 * visibility pause, and prefers-reduced-motion respect.
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-hero-slider]').forEach(initHeroSlider);
  });

  /** @param {Element} slider */
  function initHeroSlider(slider) {
    const slides = Array.from(slider.querySelectorAll('.hero-slider__slide'));
    const dots = Array.from(slider.querySelectorAll('.hero-slider__dot'));
    const previousButton = slider.querySelector('.hero-slider__arrow--prev');
    const nextButton = slider.querySelector('.hero-slider__arrow--next');
    const autoplay = /** @type {HTMLElement} */ (slider).dataset.autoplay === 'true';
    const interval = Number.parseInt(/** @type {HTMLElement} */ (slider).dataset.interval || '5000', 10) || 5000;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ARIA: mark as carousel */
    slider.setAttribute('aria-roledescription', 'carousel');
    slides.forEach(function (slide, i) {
      slide.setAttribute('aria-roledescription', 'slide');
      slide.setAttribute('aria-label', 'Slide ' + (i + 1) + ' of ' + slides.length);
    });

    if (slides.length < 2) return;

    let activeIndex = 0;
    /** @type {ReturnType<typeof setInterval> | null} */
    let autoplayTimer = null;
    let isPointerDown = false;
    let pointerStartX = 0;
    /** @type {number | null} */
    let pointerId = null;

    /** @param {number} nextIndex */
    const activate = function (nextIndex) {
      const normalizedIndex = (nextIndex + slides.length) % slides.length;

      if (normalizedIndex === activeIndex) return;

      slides[activeIndex]?.classList.remove('is-active');
      dots[activeIndex]?.classList.remove('is-active');
      dots[activeIndex]?.setAttribute('aria-selected', 'false');

      activeIndex = normalizedIndex;

      slides[activeIndex]?.classList.add('is-active');
      dots[activeIndex]?.classList.add('is-active');
      dots[activeIndex]?.setAttribute('aria-selected', 'true');
    };

    const goNext = function () {
      activate(activeIndex + 1);
    };

    const goPrevious = function () {
      activate(activeIndex - 1);
    };

    const stopAutoplay = function () {
      if (autoplayTimer) {
        window.clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    };

    const startAutoplay = function () {
      if (!autoplay || prefersReducedMotion) return;

      stopAutoplay();
      autoplayTimer = window.setInterval(goNext, interval);
    };

    const restartAutoplay = function () {
      stopAutoplay();
      startAutoplay();
    };

    previousButton?.addEventListener('click', function () {
      goPrevious();
      restartAutoplay();
    });

    nextButton?.addEventListener('click', function () {
      goNext();
      restartAutoplay();
    });

    dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        activate(Number.parseInt(/** @type {HTMLElement} */ (dot).dataset.index || '0', 10));
        restartAutoplay();
      });
    });

    slider.addEventListener('keydown', function (/** @type {Event} */ event) {
      const kbEvent = /** @type {KeyboardEvent} */ (event);
      if (kbEvent.key === 'ArrowLeft') {
        goPrevious();
        restartAutoplay();
      }

      if (kbEvent.key === 'ArrowRight') {
        goNext();
        restartAutoplay();
      }
    });

    slider.addEventListener('pointerdown', function (/** @type {Event} */ event) {
      const pEvent = /** @type {PointerEvent} */ (event);
      if (pEvent.pointerType === 'mouse' && pEvent.button !== 0) return;

      isPointerDown = true;
      pointerId = pEvent.pointerId;
      pointerStartX = pEvent.clientX;
      /** @type {HTMLElement} */ (slider).setPointerCapture?.(pointerId);
    });

    slider.addEventListener('pointerup', function (/** @type {Event} */ event) {
      const pEvent = /** @type {PointerEvent} */ (event);
      if (!isPointerDown || pEvent.pointerId !== pointerId) return;

      const swipeDistance = pointerStartX - pEvent.clientX;

      isPointerDown = false;
      pointerId = null;

      if (Math.abs(swipeDistance) > 48) {
        if (swipeDistance > 0) {
          goNext();
        } else {
          goPrevious();
        }

        restartAutoplay();
      }
    });

    slider.addEventListener('pointercancel', function () {
      isPointerDown = false;
      pointerId = null;
    });

    slider.addEventListener('mouseenter', stopAutoplay);
    slider.addEventListener('mouseleave', startAutoplay);
    slider.addEventListener('focusin', stopAutoplay);
    slider.addEventListener('focusout', startAutoplay);

    if (!('IntersectionObserver' in window)) {
      startAutoplay();
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            startAutoplay();
          } else {
            stopAutoplay();
          }
        });
      },
      { threshold: 0.35 }
    );

    observer.observe(slider);
    startAutoplay();
  }
})();
