/**
 * ACHARKHASTORY — Hero Slider
 * Vanilla JS slider: autoplay, cross-dissolve, touch/swipe, keyboard, a11y.
 */
(function () {
  'use strict';

  document.querySelectorAll('.hero-slider').forEach(initSlider);

  function initSlider(slider) {
    const slides = slider.querySelectorAll('.hero-slider__slide');
    const dots = slider.querySelectorAll('.hero-slider__dot');
    const prevBtn = slider.querySelector('.hero-slider__arrow--prev');
    const nextBtn = slider.querySelector('.hero-slider__arrow--next');

    if (slides.length < 2) return;

    let current = 0;
    let timer = null;
    let paused = false;

    const autoplay = slider.dataset.autoplay === 'true';
    const interval = (parseInt(slider.dataset.interval, 10) || 5) * 1000;

    function goTo(index) {
      if (index === current) return;
      slides[current].classList.remove('is-active');
      dots[current]?.classList.remove('is-active');
      dots[current]?.setAttribute('aria-selected', 'false');

      current = (index + slides.length) % slides.length;

      slides[current].classList.add('is-active');
      dots[current]?.classList.add('is-active');
      dots[current]?.setAttribute('aria-selected', 'true');
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    function startAutoplay() {
      if (!autoplay || paused) return;
      stopAutoplay();
      timer = setInterval(next, interval);
    }

    function stopAutoplay() {
      if (timer) { clearInterval(timer); timer = null; }
    }

    /* Arrows */
    prevBtn?.addEventListener('click', function () { prev(); startAutoplay(); });
    nextBtn?.addEventListener('click', function () { next(); startAutoplay(); });

    /* Dots */
    dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        goTo(parseInt(this.dataset.index, 10));
        startAutoplay();
      });
    });

    /* Pause on hover */
    slider.addEventListener('mouseenter', function () { paused = true; stopAutoplay(); });
    slider.addEventListener('mouseleave', function () { paused = false; startAutoplay(); });

    /* Touch / Swipe */
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    slider.addEventListener('touchend', function (e) {
      touchEndX = e.changedTouches[0].screenX;
      var diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) next(); else prev();
        startAutoplay();
      }
    }, { passive: true });

    /* Keyboard */
    slider.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { prev(); startAutoplay(); }
      if (e.key === 'ArrowRight') { next(); startAutoplay(); }
    });

    /* Pause when not visible */
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { startAutoplay(); }
        else { stopAutoplay(); }
      });
    }, { threshold: 0.3 });

    observer.observe(slider);

    /* Start */
    startAutoplay();
  }
})();
