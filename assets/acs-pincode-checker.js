/**
 * Acharkhastory pincode checker.
 * Provides a local delivery estimate using static pincode prefix zones.
 */
(function () {
  'use strict';

  /**
   * @typedef {{ days: number[]; pincodes: string[] }} Zone
   */

  /** @type {Record<string, Zone>} */
  const SERVICEABLE_ZONES = {
    A: {
      days: [3, 5],
      pincodes: [
        '110', '120', '121', '122', '201', '202', '226',
        '400', '401', '410', '411',
        '500', '560',
        '600', '700',
        '380', '382', '390',
        '302', '303',
        '440',
        '160', '141',
        '452',
        '462',
      ],
    },
    B: {
      days: [5, 7],
      pincodes: [
        '180', '190',
        '208', '211',
        '250', '247',
        '305', '306', '307', '311', '312', '313',
        '360', '361', '362', '363', '364', '365', '370',
        '431', '421', '422',
        '530', '520',
        '570', '580',
        '670', '680', '690',
        '781', '786',
        '800', '801', '802',
        '751', '752', '753', '754',
      ],
    },
    C: {
      days: [7, 10],
      pincodes: [
        '737', '790', '793', '795', '796', '797', '798', '799',
        '171', '172', '173', '174', '175', '176', '177',
        '246', '248', '249',
      ],
    },
  };

  /**
   * @param {string} pincode
   * @returns {Zone | null}
   */
  function getZone(pincode) {
    const prefix = pincode.substring(0, 3);
    /** @type {Zone[]} */
    const zones = Object.values(SERVICEABLE_ZONES);

    for (let i = 0; i < zones.length; i++) {
      if (zones[i].pincodes.includes(prefix)) return zones[i];
    }

    if (/^[1-9][0-9]{5}$/.test(pincode)) {
      return SERVICEABLE_ZONES.B;
    }

    return null;
  }

  /**
   * @param {number} daysFromNow
   * @returns {string}
   */
  function getEstimatedDate(daysFromNow) {
    const date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    return date.toLocaleDateString('en-IN', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  }

  /**
   * @returns {string}
   */
  function getSavedPincode() {
    try {
      return localStorage.getItem('acs-pincode') || '';
    } catch (_error) {
      return '';
    }
  }

  /**
   * @param {string} pincode
   */
  function savePincode(pincode) {
    try {
      localStorage.setItem('acs-pincode', pincode);
    } catch (_error) {
      return;
    }
  }

  /**
   * @param {string} html
   * @param {Element} resultEl
   */
  function showResult(html, resultEl) {
    resultEl.innerHTML = html;
    resultEl.removeAttribute('hidden');
  }

  /**
   * @param {string} pincode
   * @param {Element} resultEl
   */
  function checkPincode(pincode, resultEl) {
    if (!/^[1-9][0-9]{5}$/.test(pincode)) {
      showResult(
        '<span class="acs-pincode__error">Please enter a valid 6-digit pincode</span>',
        resultEl
      );
      return;
    }

    savePincode(pincode);

    const zone = getZone(pincode);

    if (zone) {
      const minDate = getEstimatedDate(zone.days[0] || 5);
      const maxDate = getEstimatedDate(zone.days[1] || 7);
      showResult(
        '<span class="acs-pincode__success">' +
          '<svg viewBox="0 0 20 20" width="16" height="16" class="acs-pincode__icon" aria-hidden="true"><path d="M10 2a8 8 0 110 16A8 8 0 0110 2zm3.7 5.3L9 12l-2.7-2.7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
          'Estimated delivery: <strong>' + minDate + ' - ' + maxDate + '</strong>' +
        '</span>' +
        '<span class="acs-pincode__cod">Cash on Delivery may be available</span>',
        resultEl
      );
      return;
    }

    showResult(
      '<span class="acs-pincode__error">Sorry, delivery is not available to this pincode</span>',
      resultEl
    );
  }

  /** @param {Element} container */
  function initPincodeChecker(container) {
    const input = /** @type {HTMLInputElement | null} */ (container.querySelector('[data-acs-pincode-input]'));
    const button = container.querySelector('[data-acs-pincode-check]');
    const result = container.querySelector('[data-acs-pincode-result]');

    if (!input || !button || !result) return;

    const savedPincode = getSavedPincode();
    if (savedPincode) {
      input.value = savedPincode;
      checkPincode(savedPincode, result);
    }

    button.addEventListener('click', function () {
      checkPincode(input.value.trim(), result);
    });

    input.addEventListener('keydown', function (/** @type {KeyboardEvent} */ event) {
      if (event.key !== 'Enter') return;
      event.preventDefault();
      checkPincode(input.value.trim(), result);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-acs-pincode-checker]').forEach(initPincodeChecker);
  });
})();
