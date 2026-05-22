/**
 * Acharkhastory social proof counters.
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    const counters = document.querySelectorAll('[data-acs-counter]');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!counters.length) return;

    const setValue = function (counter, value) {
      const prefix = counter.dataset.prefix || '';
      const suffix = counter.dataset.suffix || '';

      counter.textContent = `${prefix}${value.toLocaleString('en-IN')}${suffix}`;
    };

    const animate = function (counter) {
      if (counter.dataset.acsCounterReady === 'true') return;

      const target = Number.parseInt(counter.dataset.target, 10) || 0;
      const duration = 1100;
      const startedAt = window.performance.now();

      counter.dataset.acsCounterReady = 'true';

      if (prefersReducedMotion || target === 0) {
        setValue(counter, target);
        return;
      }

      const tick = function (now) {
        const progress = Math.min((now - startedAt) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(target * eased);

        setValue(counter, current);

        if (progress < 1) {
          window.requestAnimationFrame(tick);
        }
      };

      window.requestAnimationFrame(tick);
    };

    if (!('IntersectionObserver' in window)) {
      counters.forEach(animate);
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animate(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.45 }
    );

    counters.forEach(function (counter) {
      observer.observe(counter);
    });
  });
})();
