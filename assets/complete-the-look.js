/**
 * Acharkhastory Complete the Look.
 * Adds selected complementary products to cart through Shopify's AJAX endpoint.
 */
(function () {
  'use strict';

  var ready = function (callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback);
      return;
    }

    callback();
  };

  var toArray = function (value) {
    return Array.prototype.slice.call(value || []);
  };

  var formatMoney = function (cents, currency) {
    var amount = Number(cents || 0) / 100;

    try {
      return new Intl.NumberFormat(document.documentElement.lang || 'en-IN', {
        style: 'currency',
        currency: currency || 'INR',
        maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
      }).format(amount);
    } catch (error) {
      return 'Rs. ' + Math.round(amount).toLocaleString('en-IN');
    }
  };

  var setMessage = function (root, message, isError) {
    var node = root.querySelector('[data-acs-look-message]');
    if (!node) return;

    node.textContent = message || '';
    node.style.color = isError ? 'var(--acs-color-sale)' : 'var(--acs-color-success)';
  };

  var getItems = function (root) {
    return toArray(root.querySelectorAll('[data-acs-look-checkbox]:checked:not(:disabled)')).map(function (checkbox) {
      return {
        id: Number(checkbox.value),
        quantity: 1,
      };
    });
  };

  var updateSummary = function (root) {
    var countNode = root.querySelector('[data-acs-look-count]');
    var totalNode = root.querySelector('[data-acs-look-total]');
    var submit = root.querySelector('[data-acs-look-submit]');
    var currency = root.getAttribute('data-currency') || 'INR';
    var total = 0;
    var count = 0;

    toArray(root.querySelectorAll('[data-acs-look-item]')).forEach(function (item) {
      var checkbox = item.querySelector('[data-acs-look-checkbox]');
      if (!checkbox || !checkbox.checked || checkbox.disabled) return;

      total += Number(item.getAttribute('data-price') || 0);
      count += 1;
    });

    if (countNode) countNode.textContent = String(count);
    if (totalNode) totalNode.textContent = formatMoney(total, currency);
    if (submit) submit.disabled = count === 0;
  };

  var syncVariant = function (root, select) {
    var item = select.closest('[data-acs-look-item]');
    if (!item) return;

    var selected = select.selectedOptions[0];
    var checkbox = item.querySelector('[data-acs-look-checkbox]');
    var price = item.querySelector('[data-acs-look-price]');
    var compare = item.querySelector('[data-acs-look-compare]');
    var available = selected && !selected.disabled;

    if (checkbox && selected) {
      checkbox.value = selected.value;
      checkbox.disabled = !available;
      if (!available) checkbox.checked = false;
    }

    if (selected) {
      item.setAttribute('data-price', selected.getAttribute('data-price') || '0');
      item.setAttribute('data-available', available ? 'true' : 'false');
      if (price) price.textContent = selected.getAttribute('data-price-money') || '';

      if (compare) {
        compare.textContent = selected.getAttribute('data-compare-money') || '';
        compare.hidden = selected.getAttribute('data-compare-visible') !== 'true';
      }
    }

    updateSummary(root);
  };

  var addSelected = function (root) {
    var submit = root.querySelector('[data-acs-look-submit]');
    var cartAddUrl = root.getAttribute('data-cart-add-url');
    var cartUrl = root.getAttribute('data-cart-url');
    var addLabel = root.getAttribute('data-add-label') || 'Add selected to bag';
    var addingLabel = root.getAttribute('data-adding-label') || 'Adding...';
    var addedLabel = root.getAttribute('data-added-label') || 'Added to bag';
    var emptyMessage = root.getAttribute('data-empty-selection-message') || 'Choose at least one product to add.';
    var errorMessage = root.getAttribute('data-error-message') || 'Something went wrong. Please try again.';
    var redirectAfterAdd = root.getAttribute('data-redirect-after-add') === 'true';
    var items = getItems(root);

    if (!submit || !cartAddUrl) return;

    if (!items.length) {
      setMessage(root, emptyMessage, true);
      updateSummary(root);
      return;
    }

    submit.disabled = true;
    submit.textContent = addingLabel;
    setMessage(root, '', false);

    fetch(cartAddUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items: items }),
    })
      .then(function (response) {
        if (!response.ok) throw new Error('Cart add failed');
        return response.json();
      })
      .then(function (cartData) {
        document.dispatchEvent(
          new CustomEvent('acs:cart:updated', {
            detail: {
              source: 'complete-the-look',
              cart: cartData,
            },
          })
        );

        submit.textContent = addedLabel;
        setMessage(root, addedLabel, false);

        if (redirectAfterAdd && cartUrl) {
          window.location.href = cartUrl;
          return;
        }

        window.setTimeout(function () {
          submit.textContent = addLabel;
          updateSummary(root);
        }, 1800);
      })
      .catch(function () {
        submit.textContent = addLabel;
        setMessage(root, errorMessage, true);
        updateSummary(root);
      });
  };

  var init = function (root) {
    toArray(root.querySelectorAll('[data-acs-look-checkbox]')).forEach(function (checkbox) {
      checkbox.addEventListener('change', function () {
        setMessage(root, '', false);
        updateSummary(root);
      });
    });

    toArray(root.querySelectorAll('[data-acs-look-variant-select]')).forEach(function (select) {
      select.addEventListener('change', function () {
        syncVariant(root, select);
      });
      syncVariant(root, select);
    });

    root.querySelector('[data-acs-look-submit]')?.addEventListener('click', function () {
      addSelected(root);
    });

    updateSummary(root);
  };

  ready(function () {
    toArray(document.querySelectorAll('[data-acs-complete-look]')).forEach(init);
  });
})();
