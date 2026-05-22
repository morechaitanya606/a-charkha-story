// @ts-nocheck
/**
 * Acharkhastory PDP enhancements.
 * Handles gallery/lightbox, custom variant controls, quantity, wishlist state,
 * and the mobile sticky add-to-bag bar without jQuery.
 */
(function () {
  'use strict';

  /** @param {() => void} callback */
  var ready = function (callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback);
      return;
    }

    callback();
  };

  /** @param {ArrayLike<Element>} value */
  var toArray = function (value) {
    return Array.prototype.slice.call(value || []);
  };

  /**
   * @param {Element | null} node
   * @param {*} fallback
   */
  var parseJSON = function (node, fallback) {
    if (!node) return fallback;

    try {
      return JSON.parse(node.textContent || '');
    } catch (_error) {
      return fallback;
    }
  };

  /**
   * @param {Element | null} node
   * @param {boolean} hidden
   */
  var setHidden = function (node, hidden) {
    if (!node) return;
    node.classList.toggle('is-hidden', hidden);
    if (hidden) {
      node.setAttribute('hidden', '');
    } else {
      node.removeAttribute('hidden');
    }
  };

  /**
   * @param {HTMLElement} button
   * @param {string} label
   */
  var setButtonLabel = function (button, label) {
    var labelNode = button.querySelector('[data-acs-add-label]');
    if (labelNode) {
      labelNode.textContent = label;
      return;
    }

    button.textContent = label;
  };

  /**
   * @param {Element | null} node
   * @param {string} message
   */
  var setMessage = function (node, message) {
    if (!node) return;
    node.textContent = message;
    if (message) {
      node.removeAttribute('hidden');
      node.classList.remove('acs-sr-only');
    } else {
      node.setAttribute('hidden', '');
      node.classList.add('acs-sr-only');
    }
  };

  /**
   * @param {FormData} formData
   * @returns {Promise<unknown>}
   */
  var addFormToCart = function (formData) {
    return fetch(window.Theme?.routes?.cart_add_url || '/cart/add.js', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: formData,
    }).then(function (response) {
      if (!response.ok) throw new Error('Cart add failed');
      return response.json();
    });
  };

  var refreshCartState = function () {
    fetch('/cart.js', { headers: { Accept: 'application/json' } })
      .then(function (response) {
        if (!response.ok) throw new Error('Cart refresh failed');
        return response.json();
      })
      .then(function (cart) {
        toArray(document.querySelectorAll('[data-cart-count], .header__cart-count, .cart-bubble__text')).forEach(function (node) {
          node.textContent = String(cart.item_count || 0);
          node.setAttribute('aria-live', 'polite');
        });
      })
      .catch(function () {
        return;
      });
  };

  /** @param {Element} root */
  var getVariantOptions = function (root) {
    /** @type {Element[]} */
    var groups = toArray(root.querySelectorAll('[data-acs-option]'));

    return groups
      .map(function (/** @type {Element} */ group) {
        var selected = group.querySelector('[data-acs-option-button].is-selected');
        return selected ? selected.getAttribute('data-value') : '';
      })
      .filter(Boolean);
  };

  /**
   * @param {*} variant
   * @param {string[]} selectedOptions
   * @returns {boolean}
   */
  var optionsMatch = function (variant, selectedOptions) {
    if (!variant || !Array.isArray(variant.options)) return false;
    if (variant.options.length !== selectedOptions.length) return false;

    return variant.options.every(function (/** @type {string} */ option, /** @type {number} */ index) {
      return option === selectedOptions[index];
    });
  };

  /** @param {Element} root */
  var initGallery = function (root) {
    /** @type {Element[]} */
    var frames = toArray(root.querySelectorAll('[data-acs-media-frame]'));
    /** @type {Element[]} */
    var thumbs = toArray(root.querySelectorAll('[data-acs-thumb]'));
    var stage = root.querySelector('[data-acs-stage]');
    var lightbox = root.querySelector('[data-acs-lightbox]');
    var lightboxImage = /** @type {HTMLImageElement | null} */ (root.querySelector('[data-acs-lightbox-image]'));
    var closeButton = root.querySelector('[data-acs-lightbox-close]');
    var previousButton = root.querySelector('[data-acs-lightbox-prev]');
    var nextButton = root.querySelector('[data-acs-lightbox-next]');
    var activeIndex = 0;
    /** @type {HTMLElement | null} */
    var lastFocusedElement = null;

    if (!frames.length) return;

    /**
     * @param {number} index
     * @param {boolean} shouldScroll
     */
    var setActive = function (index, shouldScroll) {
      if (index < 0 || index >= frames.length) return;
      activeIndex = index;

      frames.forEach(function (/** @type {Element} */ frame, /** @type {number} */ frameIndex) {
        frame.classList.toggle('is-active', frameIndex === index);
      });

      thumbs.forEach(function (/** @type {Element} */ thumb, /** @type {number} */ thumbIndex) {
        var isActive = thumbIndex === index;
        thumb.classList.toggle('is-active', isActive);
        thumb.setAttribute('aria-current', isActive ? 'true' : 'false');
      });

      if (shouldScroll && frames[index] && window.matchMedia('(max-width: 768px)').matches) {
        frames[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
      }
    };

    /** @param {number} index */
    var openLightbox = function (index) {
      var frame = frames[index];
      if (!lightbox || !lightboxImage || !frame) return;

      var src = frame.getAttribute('data-full-src');
      if (!src) return;

      lastFocusedElement = /** @type {HTMLElement | null} */ (document.activeElement);
      activeIndex = index;
      lightboxImage.src = src;
      lightboxImage.alt = frame.getAttribute('data-alt') || '';
      lightbox.hidden = false;
      document.body.classList.add('acs-lightbox-open');
      /** @type {HTMLElement | null} */ (closeButton)?.focus();
    };

    var closeLightbox = function () {
      if (!lightbox) return;
      lightbox.hidden = true;
      document.body.classList.remove('acs-lightbox-open');
      if (lastFocusedElement) {
        lastFocusedElement.focus();
        lastFocusedElement = null;
      }
    };

    /** @param {number} direction */
    var moveLightbox = function (direction) {
      var nextIndex = (activeIndex + direction + frames.length) % frames.length;
      setActive(nextIndex, true);
      openLightbox(nextIndex);
    };

    /* Focus trap: keep Tab cycling within lightbox */
    /** @param {KeyboardEvent} event */
    var trapFocus = function (event) {
      if (!lightbox || lightbox.hidden || event.key !== 'Tab') return;

      /** @type {HTMLElement[]} */
      var focusableEls = /** @type {HTMLElement[]} */ (Array.from(
        lightbox.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])')
      ));
      if (focusableEls.length === 0) return;

      var firstEl = focusableEls[0];
      var lastEl = focusableEls[focusableEls.length - 1];

      if (event.shiftKey) {
        if (document.activeElement === firstEl) {
          event.preventDefault();
          lastEl?.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          event.preventDefault();
          firstEl?.focus();
        }
      }
    };

    thumbs.forEach(function (/** @type {Element} */ thumb) {
      thumb.addEventListener('click', function () {
        setActive(Number(thumb.getAttribute('data-index') || 0), true);
      });
    });

    frames.forEach(function (/** @type {Element} */ frame) {
      frame.addEventListener('click', function () {
        openLightbox(Number(frame.getAttribute('data-index') || 0));
      });
    });

    previousButton?.addEventListener('click', function () {
      moveLightbox(-1);
    });

    nextButton?.addEventListener('click', function () {
      moveLightbox(1);
    });

    closeButton?.addEventListener('click', closeLightbox);

    lightbox?.addEventListener('click', function (/** @type {Event} */ event) {
      if (event.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', function (event) {
      if (!lightbox || lightbox.hidden) return;

      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowLeft') moveLightbox(-1);
      if (event.key === 'ArrowRight') moveLightbox(1);
      trapFocus(event);
    });

    root.addEventListener('acs:show-media', function (/** @type {Event} */ event) {
      var mediaId = String(/** @type {CustomEvent} */ (event).detail?.mediaId || '');
      if (!mediaId) return;

      var frameIndex = frames.findIndex(function (/** @type {Element} */ frame) {
        return String(frame.getAttribute('data-media-id')) === mediaId;
      });

      if (frameIndex >= 0) setActive(frameIndex, true);
    });

    stage?.addEventListener(
      'scroll',
      function () {
        if (!window.matchMedia('(max-width: 768px)').matches) return;

        var stageRect = /** @type {HTMLElement} */ (stage).getBoundingClientRect();
        var closestIndex = activeIndex;
        var closestDistance = Infinity;

        frames.forEach(function (/** @type {Element} */ frame, /** @type {number} */ index) {
          var frameRect = frame.getBoundingClientRect();
          var distance = Math.abs(frameRect.left - stageRect.left);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        });

        if (closestIndex !== activeIndex) setActive(closestIndex, false);
      },
      { passive: true }
    );

    /* Touch swipe for mobile gallery */
    var touchStartX = 0;
    var touchStartY = 0;
    var isSwiping = false;

    stage?.addEventListener('touchstart', function (/** @type {TouchEvent} */ e) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      isSwiping = true;
    }, { passive: true });

    stage?.addEventListener('touchend', function (/** @type {TouchEvent} */ e) {
      if (!isSwiping) return;
      isSwiping = false;

      var deltaX = e.changedTouches[0].clientX - touchStartX;
      var deltaY = e.changedTouches[0].clientY - touchStartY;

      /* Only swipe if horizontal movement is dominant */
      if (Math.abs(deltaX) < 40 || Math.abs(deltaX) < Math.abs(deltaY)) return;

      if (deltaX < 0 && activeIndex < frames.length - 1) {
        setActive(activeIndex + 1, true);
      } else if (deltaX > 0 && activeIndex > 0) {
        setActive(activeIndex - 1, true);
      }
    }, { passive: true });
  };

  /** @param {Element} root */
  var initVariantControls = function (root) {
    var form = /** @type {HTMLFormElement | null} */ (root.querySelector('[data-acs-product-form]'));
    var variants = parseJSON(root.querySelector('[data-acs-variant-data]'), []);
    var variantInput = /** @type {HTMLInputElement | null} */ (root.querySelector('[data-acs-variant-input]'));
    var price = root.querySelector('[data-acs-price]');
    var comparePrice = root.querySelector('[data-acs-compare-price]');
    var saveBadge = root.querySelector('[data-acs-save-badge]');
    var freeShipping = root.querySelector('[data-acs-free-shipping]');
    var stock = root.querySelector('[data-acs-stock]');
    var stockCount = root.querySelector('[data-acs-stock-count]');
    var status = root.querySelector('[data-acs-variant-status]');
    var notify = root.querySelector('[data-acs-notify-me]');
    /** @type {HTMLElement[]} */
    var addButtons = toArray(root.querySelectorAll('[data-acs-add-button], [data-acs-sticky-submit]'));
    var addLabel = root.getAttribute('data-add-label') || 'Add to Bag';
    var soldOutLabel = root.getAttribute('data-sold-out-label') || 'Sold Out';
    var unavailableLabel = root.getAttribute('data-unavailable-label') || 'Unavailable';
    var saveLabel = root.getAttribute('data-save-label') || 'Save';
    var stickyPrice = root.querySelector('[data-acs-sticky-price]');
    var lowStockThreshold = Number(root.getAttribute('data-low-stock-threshold') || 5);
    var freeShippingThreshold = Number(root.getAttribute('data-free-shipping-threshold') || 0);

    if (!form || !variants.length || !variantInput) return;

    var updateSelectedLabels = function () {
      toArray(root.querySelectorAll('[data-acs-option]')).forEach(function (/** @type {Element} */ group) {
        var selected = group.querySelector('[data-acs-option-button].is-selected');
        var label = group.querySelector('[data-acs-option-selected]');
        if (label && selected) label.textContent = selected.getAttribute('data-value') || '';
      });
    };

    /** @param {*} variant */
    var updateAddButtons = function (variant) {
      var isAvailable = Boolean(variant && variant.available);
      var label = variant ? (isAvailable ? addLabel : soldOutLabel) : unavailableLabel;

      addButtons.forEach(function (/** @type {HTMLElement} */ button) {
        /** @type {HTMLButtonElement} */ (button).disabled = !isAvailable;
        setButtonLabel(button, label);
      });

      setHidden(notify, isAvailable);
    };

    /** @param {*} variant */
    var updatePrice = function (variant) {
      if (!variant) return;

      if (price) price.textContent = variant.price_money;
      if (stickyPrice) stickyPrice.textContent = variant.price_money;

      var hasCompare = variant.compare_at_price && variant.compare_at_price > variant.price;
      if (comparePrice) comparePrice.textContent = hasCompare ? variant.compare_at_price_money : '';
      setHidden(comparePrice, !hasCompare);

      if (saveBadge) {
        if (hasCompare) {
          var savings = Math.round(((variant.compare_at_price - variant.price) * 100) / variant.compare_at_price);
          saveBadge.textContent = saveLabel + ' ' + savings + '%';
        }
        setHidden(saveBadge, !hasCompare);
      }

      setHidden(freeShipping, !(freeShippingThreshold > 0 && variant.price >= freeShippingThreshold));
    };

    /** @param {*} variant */
    var updateStock = function (variant) {
      var quantity = Number(variant?.inventory_quantity || 0);
      var shouldShow =
        Boolean(variant?.inventory_management) &&
        variant?.inventory_policy !== 'continue' &&
        quantity > 0 &&
        quantity <= lowStockThreshold;

      if (stockCount) stockCount.textContent = String(quantity);
      setHidden(stock, !shouldShow);
    };

    /** @param {*} variant */
    var updateMedia = function (variant) {
      if (!variant || !variant.featured_media_id) return;

      root.dispatchEvent(
        new CustomEvent('acs:show-media', {
          detail: { mediaId: variant.featured_media_id },
        })
      );
    };

    var updateVariant = function () {
      var selectedOptions = getVariantOptions(root);
      var variant =
        selectedOptions.length === 0
          ? variants.find(function (/** @type {*} */ item) {
              return String(item.id) === String(variantInput.value);
            }) || variants[0]
          : variants.find(function (/** @type {*} */ item) {
              return optionsMatch(item, selectedOptions);
            });

      updateSelectedLabels();
      updateAddButtons(variant);

      if (!variant) return;

      variantInput.value = variant.id;
      updatePrice(variant);
      updateStock(variant);
      updateMedia(variant);

      if (status) {
        status.textContent = variant.available
          ? variant.title + ' selected. Price ' + variant.price_money + '.'
          : variant.title + ' selected. This option is sold out.';
      }

      if (window.history?.replaceState) {
        var url = new URL(window.location.href);
        url.searchParams.set('variant', variant.id);
        window.history.replaceState({}, '', url.toString());
      }
    };

    toArray(root.querySelectorAll('[data-acs-option-button]')).forEach(function (/** @type {Element} */ button) {
      button.addEventListener('click', function () {
        var group = button.closest('[data-acs-option]');
        if (!group) return;

        toArray(group.querySelectorAll('[data-acs-option-button]')).forEach(function (/** @type {Element} */ peer) {
          var isSelected = peer === button;
          peer.classList.toggle('is-selected', isSelected);
          peer.setAttribute('aria-checked', isSelected ? 'true' : 'false');
        });

        updateVariant();
      });
    });

    toArray(root.querySelectorAll('[data-acs-quantity-action]')).forEach(function (/** @type {Element} */ button) {
      button.addEventListener('click', function () {
        var input = /** @type {HTMLInputElement | null} */ (root.querySelector('[data-acs-quantity-input]'));
        if (!input) return;

        var current = Number(input.value || 1);
        var action = button.getAttribute('data-acs-quantity-action');
        var nextValue = action === 'increase' ? current + 1 : Math.max(1, current - 1);
        input.value = String(nextValue);
      });
    });

    root.querySelector('[data-acs-sticky-submit]')?.addEventListener('click', function () {
      if (form && typeof form.requestSubmit === 'function') {
        form.requestSubmit();
      } else if (form) {
        form.submit();
      }
    });

    updateVariant();
  };

  /** @param {Element} root */
  var initProductForm = function (root) {
    var form = /** @type {HTMLFormElement | null} */ (root.querySelector('[data-acs-product-form]'));
    var message = root.querySelector('[data-acs-form-message]');
    var addButton = /** @type {HTMLButtonElement | null} */ (root.querySelector('[data-acs-add-button]'));
    var addLabel = root.getAttribute('data-add-label') || 'Add to Bag';

    if (!form || !addButton) return;

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var formData = new FormData(form);
      var originalLabel = addButton.textContent || addLabel;

      setMessage(message, '');
      addButton.disabled = true;
      setButtonLabel(addButton, 'Adding...');

      addFormToCart(formData)
        .then(function () {
          setButtonLabel(addButton, 'Added');
          setMessage(message, 'Added to bag.');
          refreshCartState();
          document.dispatchEvent(new CustomEvent('cart:refresh'));
          document.dispatchEvent(new CustomEvent('cart:open'));
          document.dispatchEvent(new CustomEvent('acs:cart-updated'));
        })
        .catch(function () {
          setButtonLabel(addButton, originalLabel);
          setMessage(message, 'Could not add this item. Please try again.');
        })
        .finally(function () {
          window.setTimeout(function () {
            addButton.disabled = false;
            setButtonLabel(addButton, addLabel);
          }, 1400);
        });
    });
  };

  /** @param {Element} root */
  var initStickyBar = function (root) {
    var stickyBar = root.querySelector('[data-acs-sticky-bar]');
    var addButton = root.querySelector('[data-acs-add-button]');

    if (!stickyBar || !addButton || !('IntersectionObserver' in window)) return;

    var observer = new IntersectionObserver(
      function (entries) {
        var entry = entries[0];
        if (!entry) return;

        var isMobile = window.matchMedia('(max-width: 768px)').matches;
        var hasPassedButton = entry.boundingClientRect.top < 0;
        stickyBar.classList.toggle('is-visible', isMobile && !entry.isIntersecting && hasPassedButton);
      },
      { threshold: 0.01 }
    );

    observer.observe(addButton);
  };

  /** @param {Element} root */
  var initWishlist = function (root) {
    var button = root.querySelector('[data-acs-wishlist]');
    if (!button) return;

    var key = 'acs_wishlist';
    var handle = button.getAttribute('data-product-handle');

    /**
     * @returns {string[]}
     */
    var readWishlist = function () {
      try {
        return JSON.parse(window.localStorage.getItem(key) || '[]');
      } catch (_error) {
        return [];
      }
    };

    /**
     * @param {string[]} items
     */
    var writeWishlist = function (items) {
      try {
        window.localStorage.setItem(key, JSON.stringify(items));
      } catch (_error) {
        return;
      }
    };

    var sync = function () {
      var items = readWishlist();
      button.setAttribute('aria-pressed', items.indexOf(handle || '') >= 0 ? 'true' : 'false');
    };

    button.addEventListener('click', function () {
      var items = readWishlist();
      var index = items.indexOf(handle || '');

      if (index >= 0) {
        items.splice(index, 1);
      } else {
        if (handle) items.push(handle);
        if (window.gtag) {
          window.gtag('event', 'add_to_wishlist', {
            product_handle: handle,
            product_id: button.getAttribute('data-product-id'),
          });
        }
      }

      writeWishlist(items);
      sync();
    });

    sync();
  };

  /** @param {Element} root */
  var storeRecentlyViewed = function (root) {
    var handle = document.body.getAttribute('data-product-handle');
    if (!handle) return;

    try {
      ['viewedProducts', 'acs-recently-viewed'].forEach(function (key) {
        var existing = JSON.parse(window.localStorage.getItem(key) || '[]').filter(function (item) {
          return item !== handle;
        });
        existing.unshift(handle);
        window.localStorage.setItem(key, JSON.stringify(existing.slice(0, 10)));
      });
    } catch (_error) {
      return;
    }
  };

  ready(function () {
    toArray(document.querySelectorAll('[data-acs-product-main]')).forEach(function (/** @type {Element} */ root) {
      initGallery(root);
      initVariantControls(root);
      initProductForm(root);
      initStickyBar(root);
      initWishlist(root);
      storeRecentlyViewed(root);
    });
  });
})();
