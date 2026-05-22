# Acharkhastory — 10/10 Implementation Plan

> **Goal:** Bring every category from the analysis to 10/10.  
> **Approach:** 7 phases, dependency-ordered, with verification at each gate.

---

## User Review Required

> [!IMPORTANT]
> **Before I begin execution, please confirm:**
> 1. Do you have **real product/artisan images** ready to upload, or should I generate placeholder-quality images using AI for now?
> 2. Do you want **Judge.me** for reviews, or a different provider (e.g., Loox, Yotpo)?
> 3. For WhatsApp chat — do you have a **business WhatsApp number** ready?
> 4. Are you okay with me installing **no external npm packages** (everything will be vanilla JS + Shopify APIs + CDN scripts where needed)?
> 5. Approximately how many products are **live in your Shopify admin** right now?

---

## Phase 1: Code Quality — 6→10 (Foundation)

*Fix all technical debt before building new features.*

### 1.1 CSS Consolidation

#### [MODIFY] [acharkhastory.css](file:///d:/Users/Chait/Pratice/tts/website/assets/acharkhastory.css)
- **Remove** duplicate `--acs-sp-*` aliases (keep only `--acs-space-*`)
- **Remove** duplicate PDP rules at L2117-2176 (`.acs-pdp`, `.acs-pdp__layout`, `.acs-pdp__purchase`, `.acs-pdp__trust-row`) — these conflict with `pdp-overrides.css`
- **Add** `@media (prefers-reduced-motion: reduce)` guard around `scroll-behavior: smooth`
- **Add** `content-visibility: auto` on below-fold section classes
- **Modernize** with CSS nesting for component blocks (reduces file ~15%)
- **Fix** `--acs-letter-spacing: 0` → `--acs-letter-spacing: -0.01em` for display, `0.08em` for eyebrows
- **Add** star color token: `--acs-color-rating: #d9ad45`

#### [MODIFY] [pdp-overrides.css](file:///d:/Users/Chait/Pratice/tts/website/assets/pdp-overrides.css)
- Becomes the **single source of truth** for all PDP styles (no more duplicates)

#### [DELETE] Inline CSS from product-tabs
#### [NEW] [product-tabs.css](file:///d:/Users/Chait/Pratice/tts/website/assets/product-tabs.css)
- Extract 300 lines of `<style>` from `product-tabs.liquid` into a dedicated asset

### 1.2 JS Consolidation

#### [NEW] [acs-global.js](file:///d:/Users/Chait/Pratice/tts/website/assets/acs-global.js)
- Extract ~65 lines of inline JS from `theme.liquid` (header height, announcement, keyboard state)
- Load via `<script defer>` for better caching

#### [MODIFY] [theme.liquid](file:///d:/Users/Chait/Pratice/tts/website/layout/theme.liquid)
- Replace inline `<script>` with `<script src="{{ 'acs-global.js' | asset_url }}" defer></script>`
- Add `<link rel="preconnect" href="https://cdn.shopify.com">`

### 1.3 Liquid Fixes

#### [MODIFY] [acs-product-main.liquid](file:///d:/Users/Chait/Pratice/tts/website/sections/acs-product-main.liquid)
- Fix savings percentage: use `times: 100.0` for float division
- Add Judge.me error boundary (check app installed before rendering widget div)

#### [MODIFY] [product-tabs.liquid](file:///d:/Users/Chait/Pratice/tts/website/sections/product-tabs.liquid)
- Remove inline `<style>` block, replace with `{{ 'product-tabs.css' | asset_url | stylesheet_tag }}`

---

## Phase 2: Design System — 8→10

### 2.1 Token Enhancements

#### [MODIFY] [acharkhastory.css](file:///d:/Users/Chait/Pratice/tts/website/assets/acharkhastory.css)
- **Add animation tokens:** `--acs-ease-spring`, `--acs-ease-out-expo` for micro-interactions
- **Add** `--acs-color-rating: #d9ad45` (amber for stars)
- **Add** `--acs-color-whatsapp: #25D366`
- **Add** `--acs-shadow-card-hover` for elevated card interactions
- **Add container query tokens:** `--acs-breakpoint-sm/md/lg`
- **Add** `--acs-focus-ring` token for consistent focus styles

### 2.2 Micro-Interactions System

#### [NEW] [acs-animations.css](file:///d:/Users/Chait/Pratice/tts/website/assets/acs-animations.css)
```css
/* Scroll-driven reveal animations */
@keyframes acs-fade-up { from { opacity:0; translate:0 1.5rem } to { opacity:1; translate:0 } }
@keyframes acs-scale-in { from { opacity:0; scale:0.96 } to { opacity:1; scale:1 } }

/* Card hover lift */
.acs-card-lift { transition: transform 0.3s var(--acs-ease), box-shadow 0.3s var(--acs-ease); }
.acs-card-lift:hover { transform: translateY(-4px); box-shadow: var(--acs-shadow-card-hover); }

/* Parallax tilt on category tiles */
/* Scroll-triggered counter animation */
/* Button ripple effect */
```

### 2.3 Structured Data & SEO Foundation

#### [NEW] [acs-structured-data.liquid](file:///d:/Users/Chait/Pratice/tts/website/snippets/acs-structured-data.liquid)
- Product JSON-LD with `offers`, `aggregateRating`, `brand`
- Organization JSON-LD
- BreadcrumbList JSON-LD
- FAQPage JSON-LD for product tabs

---

## Phase 3: Homepage UX — 6→10

### 3.1 Section Optimization

#### [MODIFY] [index.json](file:///d:/Users/Chait/Pratice/tts/website/templates/index.json)
- **Reduce** from 14 to 10 sections (merge Social Proof into Trust Badges, remove Recently Viewed from homepage, consolidate Instagram into Email Signup)
- **Reorder:** Hero → Trust+Stats → Category Tiles → New Arrivals → Story Banner → Craft Types → Bestsellers → Reviews → Artisan Story → Email Signup + Social
- Add new Video Stories section after Hero

### 3.2 New Sections

#### [NEW] [video-stories.liquid](file:///d:/Users/Chait/Pratice/tts/website/sections/video-stories.liquid)
- Instagram Reels-style vertical video carousel of artisans at work
- Uses Shopify-hosted video with `<video>` elements
- Autoplay on viewport entry, pause on exit (IntersectionObserver)
- Mobile: horizontal swipe strip; Desktop: row of 4-5 video cards

#### [MODIFY] [trust-badges.liquid](file:///d:/Users/Chait/Pratice/tts/website/sections/trust-badges.liquid)
- Merge social proof counters directly into trust strip (animated count-up on scroll)
- Add subtle entrance animation

#### [MODIFY] [hero-slider.liquid](file:///d:/Users/Chait/Pratice/tts/website/sections/hero-slider.liquid)
- Add View Transitions API for slide changes (progressive enhancement)
- Add `prefers-reduced-motion` check to autoplay
- Add parallax overlay text movement on scroll

#### [MODIFY] [category-tiles.liquid](file:///d:/Users/Chait/Pratice/tts/website/sections/category-tiles.liquid)
- Add hover parallax tilt (CSS `perspective` + JS `mousemove`)
- Add product count badge overlay
- Stagger entrance animation

#### [MODIFY] [reviews-acs.liquid](file:///d:/Users/Chait/Pratice/tts/website/sections/reviews-acs.liquid)
- Add auto-scrolling marquee mode for social proof
- Add customer photos/avatars support
- Add Judge.me API integration to pull real reviews

#### [MODIFY] [instagram-feed.liquid](file:///d:/Users/Chait/Pratice/tts/website/sections/instagram-feed.liquid)
- Replace static grid with dynamic community gallery
- Admin-uploadable photos via Shopify files + metaobjects
- Masonry-style layout with hover overlay showing caption

---

## Phase 4: PDP UX — 8→10

### 4.1 Conversion Enhancements

#### [MODIFY] [acs-product-main.liquid](file:///d:/Users/Chait/Pratice/tts/website/sections/acs-product-main.liquid)
- **Add pincode checker:** Inline form checking delivery availability via API
- **Add estimated delivery:** "Get it by May 24" based on simple date calculation
- **Add COD badge:** "Cash on Delivery Available" trust signal
- **Add "Notify Me":** Email capture form for out-of-stock variants
- Fix savings calculation bug

#### [NEW] [acs-pincode-checker.js](file:///d:/Users/Chait/Pratice/tts/website/assets/acs-pincode-checker.js)
- Lightweight pincode → delivery estimate lookup
- Stores last pincode in localStorage
- Shows serviceable/non-serviceable status + estimated days

#### [MODIFY] [pdp-enhancements.js](file:///d:/Users/Chait/Pratice/tts/website/assets/pdp-enhancements.js)
- Add focus trap for lightbox (accessibility fix)
- Add `aria-live` announcements for variant changes
- Add image zoom gesture (pinch-to-zoom on mobile)

### 4.2 Review System Upgrade

#### [MODIFY] [product-reviews.liquid](file:///d:/Users/Chait/Pratice/tts/website/sections/product-reviews.liquid)
- Wire up Judge.me API for product-specific reviews
- Add photo review support
- Add rating bar distribution chart
- Add "Write a Review" CTA
- Add review filtering (by rating, photos only)

### 4.3 Gift Wrap & Extras

#### [NEW] [gift-wrap-option.liquid](file:///d:/Users/Chait/Pratice/tts/website/snippets/gift-wrap-option.liquid)
- Toggleable gift wrap checkbox on PDP
- Adds a "Gift Wrap" line item property to cart
- Custom gift message field

---

## Phase 5: Collection UX — 4→10

### 5.1 Collection Page Overhaul

#### [MODIFY] [collection.json](file:///d:/Users/Chait/Pratice/tts/website/templates/collection.json)
- **Replace** Horizon product cards with custom ACS product cards (`product-card-acs.liquid`)
- **Add** branded collection hero banner section
- **Add** recently viewed products section
- **Add** craft story interstitial between product rows
- **Add** sticky filter refinement bar

#### [NEW] [collection-hero-acs.liquid](file:///d:/Users/Chait/Pratice/tts/website/sections/collection-hero-acs.liquid)
- Full-width hero banner with collection image + title + description
- Gradient overlay matching brand palette
- Product count + filter count

#### [NEW] [collection-acs.liquid](file:///d:/Users/Chait/Pratice/tts/website/sections/collection-acs.liquid)
- Custom main collection section using `product-card-acs` snippet
- Uses Shopify's native filtering/sorting APIs
- Adds craft tags, wishlist buttons, quick-add on all cards
- Infinite scroll or "Load More" with section rendering API
- Grid density toggle (2/3/4 columns)

#### [MODIFY] [product-card-acs.liquid](file:///d:/Users/Chait/Pratice/tts/website/snippets/product-card-acs.liquid)
- Add AJAX add-to-cart (fetch to Cart API instead of form submit)
- Add card entrance animation (staggered `animation-delay`)
- Add variant color swatches preview row

---

## Phase 6: Explore Page — 6→10 & New Pages

### 6.1 Interactive Craft Map

#### [MODIFY] [explore-craft-map.liquid](file:///d:/Users/Chait/Pratice/tts/website/sections/explore-craft-map.liquid)
- Replace text list with **actual SVG map of India**
- Clickable regions with hover tooltips showing craft name + artisan count
- Click → filter or navigate to collection
- Animated path drawing on scroll entry

#### [NEW] [india-craft-map.svg](file:///d:/Users/Chait/Pratice/tts/website/assets/india-craft-map.svg)
- Custom SVG map with state boundaries
- Data attributes for craft types per region

#### [NEW] [craft-map.js](file:///d:/Users/Chait/Pratice/tts/website/assets/craft-map.js)
- Hover/click interactions for map regions
- Tooltip positioning + collection linking

### 6.2 Explore Page Enhancements

#### [MODIFY] [explore-stories.liquid](file:///d:/Users/Chait/Pratice/tts/website/sections/explore-stories.liquid)
- Add image support to story cards (currently text-only)
- Add horizontal scroll with snap on mobile

#### [MODIFY] [explore-artisans.liquid](file:///d:/Users/Chait/Pratice/tts/website/sections/explore-artisans.liquid)
- Add artisan photo support
- Add "Meet the Artisan" video modal

### 6.3 New Pages

#### [NEW] [page.artisans.json](file:///d:/Users/Chait/Pratice/tts/website/templates/page.artisans.json)
- Dedicated artisan directory page
- Filterable by craft type and region
- Individual artisan cards with photo, bio, craft, products

#### [NEW] [page.craft-quiz.json](file:///d:/Users/Chait/Pratice/tts/website/templates/page.craft-quiz.json)
- Interactive "Find Your Craft" quiz
- 4-5 questions → personalized product recommendation
- All client-side JS, no backend needed

#### [NEW] [craft-quiz.liquid](file:///d:/Users/Chait/Pratice/tts/website/sections/craft-quiz.liquid)
- Step-by-step quiz UI with progress bar
- Results page with product recommendations from collections

#### [NEW] [craft-quiz.js](file:///d:/Users/Chait/Pratice/tts/website/assets/craft-quiz.js)
- Quiz logic, scoring, collection API fetch for recommendations

---

## Phase 7: Performance (6→10), Accessibility (7→10), Mobile (7→10), CRO (5→10)

### 7.1 Performance

#### [MODIFY] [theme.liquid](file:///d:/Users/Chait/Pratice/tts/website/layout/theme.liquid)
- Add `<link rel="preconnect">` for Shopify CDN
- Add critical CSS inline (above-fold hero + trust badges)
- Add `fetchpriority="high"` on hero images (already done ✅, verify)
- Add resource hints for below-fold sections

#### [MODIFY] [acharkhastory.css](file:///d:/Users/Chait/Pratice/tts/website/assets/acharkhastory.css)
- Add `content-visibility: auto; contain-intrinsic-size: auto 600px;` on below-fold sections
- Add `will-change: transform` only on elements that animate (remove from static)

#### [NEW] [acs-lazy-sections.js](file:///d:/Users/Chait/Pratice/tts/website/assets/acs-lazy-sections.js)
- IntersectionObserver to defer initialization of below-fold carousels
- Lazy-init video players only when in viewport

### 7.2 Accessibility

#### [MODIFY] [pdp-enhancements.js](file:///d:/Users/Chait/Pratice/tts/website/assets/pdp-enhancements.js)
- Add **focus trap** in lightbox (Tab cycles within modal)
- Add `aria-live="polite"` region for price/stock updates
- Add `role="group"` on variant option fieldsets

#### [MODIFY] [mobile-bottom-nav.liquid](file:///d:/Users/Chait/Pratice/tts/website/sections/mobile-bottom-nav.liquid)
- Add `aria-live="polite"` to cart count badge
- Add `aria-current="page"` to active nav item

#### [MODIFY] [hero-slider.js](file:///d:/Users/Chait/Pratice/tts/website/assets/hero-slider.js)
- Add `prefers-reduced-motion` check — disable autoplay if user prefers reduced motion
- Add `aria-roledescription="carousel"` and `aria-label` on slides

#### [MODIFY] [acharkhastory.css](file:///d:/Users/Chait/Pratice/tts/website/assets/acharkhastory.css)
- Increase `--acs-color-muted` contrast: `#8a7968` → `#776348` (5.1:1 ratio)
- Add `@media (prefers-reduced-motion: reduce)` → disable all transitions/animations
- Add `@media (forced-colors: active)` support for high contrast mode

### 7.3 Mobile Experience

#### [NEW] [acs-whatsapp-widget.liquid](file:///d:/Users/Chait/Pratice/tts/website/snippets/acs-whatsapp-widget.liquid)
- Floating WhatsApp button (mobile bottom-right, above nav)
- Click → opens WhatsApp with pre-filled message
- Subtle bounce animation on first visit

#### [MODIFY] [mobile-bottom-nav.liquid](file:///d:/Users/Chait/Pratice/tts/website/sections/mobile-bottom-nav.liquid)
- Add haptic-style tap feedback (CSS `transform: scale(0.95)` on `:active`)
- Add smooth icon transitions on active state

#### [MODIFY] [hero-slider.liquid](file:///d:/Users/Chait/Pratice/tts/website/sections/hero-slider.liquid)
- Optimize mobile hero: reduce to 3 slides on mobile (performance)
- Better touch gesture feedback

### 7.4 CRO Features

#### [NEW] [acs-cart-enhancements.liquid](file:///d:/Users/Chait/Pratice/tts/website/snippets/acs-cart-enhancements.liquid)
- Cart trust badges row (secure checkout, free shipping threshold progress bar)
- Estimated delivery date in cart items
- Gift wrap toggle
- Free shipping progress bar: "Add ₹X more for free shipping!"

#### [NEW] [acs-notify-me.liquid](file:///d:/Users/Chait/Pratice/tts/website/snippets/acs-notify-me.liquid)
- Back-in-stock email capture form
- Renders when variant is sold out
- Stores emails in customer metafields or Klaviyo

#### [NEW] [acs-recently-viewed.js](file:///d:/Users/Chait/Pratice/tts/website/assets/acs-recently-viewed.js)
- Enhanced recently viewed with Section Rendering API
- Shows on collection and cart pages
- Stores last 10 product handles in localStorage

---

## Open Questions

> [!IMPORTANT]
> 1. **Pincode API:** Do you have a shipping partner API (Shiprocket, Delhivery) for pincode serviceability checks, or should I build a static JSON lookup?
> 2. **Craft Quiz:** What product tags/collections exist for mapping quiz results to product recommendations? (e.g., `craft_ajrakh`, `craft_chikankari`)
> 3. **Review App:** Confirm Judge.me or alternative — this affects the review integration approach.
> 4. **India Map:** Should the craft map focus on specific states (Bengal, Rajasthan, Gujarat, UP) or show all of India?
> 5. **Budget for CDN:** Any preference for video hosting — Shopify's built-in video hosting vs YouTube embeds?

---

## Verification Plan

### After Each Phase
| Check | Method |
|-------|--------|
| **CSS validity** | No duplicate selectors across files |
| **Liquid syntax** | `shopify theme check` — zero errors |
| **Accessibility** | Lighthouse Accessibility ≥ 95 |
| **Performance** | Lighthouse Performance ≥ 85 (mobile) |
| **Mobile UX** | Manual testing via browser dev tools at 375px, 390px, 428px |
| **CLS** | Core Web Vitals — CLS < 0.1 |

### Final Verification
| Target | Score |
|--------|-------|
| Design System | 10/10 — Zero duplicates, animation tokens, container queries, rating colors |
| Homepage UX | 10/10 — Video stories, animated stats, real images, optimized section count |
| PDP UX | 10/10 — Pincode checker, delivery ETA, COD badge, notify me, focus traps |
| Collection UX | 10/10 — ACS branded cards, hero banners, filters, infinite scroll |
| Explore Page | 10/10 — Interactive SVG map, artisan photos, video modals |
| Mobile | 10/10 — WhatsApp widget, haptic feedback, optimized hero, smooth nav |
| Performance | 10/10 — Critical CSS, content-visibility, lazy sections, preconnects |
| Accessibility | 10/10 — Focus traps, aria-live, reduced motion, contrast fixes |
| Code Quality | 10/10 — No duplicates, no inline styles, extracted JS, clean tokens |
| CRO Features | 10/10 — Real reviews, wishlists, gift wrap, shipping bar, notify me |

---

## Estimated File Changes

| Type | Count |
|------|-------|
| **New files** | ~18 (sections, snippets, assets) |
| **Modified files** | ~22 |
| **Deleted content** | Inline styles from 1 file, duplicate CSS blocks |

**Estimated implementation time:** 7 phases × focused execution = significant but systematic work.
