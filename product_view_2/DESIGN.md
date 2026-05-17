---
name: Acharkhastory Design System
colors:
  surface: '#E8CDA8'
  surface-dim: '#e1d8d5'
  surface-bright: '#fff8f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fbf2ee'
  surface-container: '#f5ece8'
  surface-container-high: '#efe6e3'
  surface-container-highest: '#e9e1dd'
  on-surface: '#1f1b19'
  on-surface-variant: '#50443e'
  inverse-surface: '#342f2d'
  inverse-on-surface: '#f8efeb'
  outline: '#82746d'
  outline-variant: '#d4c3bb'
  surface-tint: '#7a5741'
  primary: '#250e02'
  on-primary: '#ffffff'
  primary-container: '#3d2210'
  on-primary-container: '#b0876f'
  inverse-primary: '#ebbda2'
  secondary: '#845331'
  on-secondary: '#ffffff'
  secondary-container: '#fdbb92'
  on-secondary-container: '#784928'
  tertiary: '#00171b'
  on-tertiary: '#ffffff'
  tertiary-container: '#092d32'
  on-tertiary-container: '#74959b'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbc8'
  primary-fixed-dim: '#ebbda2'
  on-primary-fixed: '#2e1505'
  on-primary-fixed-variant: '#5f3f2b'
  secondary-fixed: '#ffdbc7'
  secondary-fixed-dim: '#fab88f'
  on-secondary-fixed: '#311300'
  on-secondary-fixed-variant: '#683c1c'
  tertiary-fixed: '#c6e9ef'
  tertiary-fixed-dim: '#aaccd3'
  on-tertiary-fixed: '#001f24'
  on-tertiary-fixed-variant: '#2b4c51'
  background: '#FDF6EE'
  on-background: '#1f1b19'
  surface-variant: '#e9e1dd'
  warm-mid: '#C4956A'
  sale: '#C0392B'
  text-body: '#1A1008'
  text-muted: '#8A7968'
  border: '#EAD9C4'
  white: '#FFFFFF'
typography:
  display:
    fontFamily: EB Garamond
    fontSize: 52px
    fontWeight: '500'
    lineHeight: '1.1'
  display-mobile:
    fontFamily: EB Garamond
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.2'
  h2:
    fontFamily: EB Garamond
    fontSize: 36px
    fontWeight: '500'
    lineHeight: '1.3'
  h2-mobile:
    fontFamily: EB Garamond
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.3'
  h3:
    fontFamily: EB Garamond
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.4'
  nav:
    fontFamily: DM Sans
    fontSize: 13px
    fontWeight: '400'
    letterSpacing: 0.02em
  body:
    fontFamily: DM Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: '1.8'
  small:
    fontFamily: DM Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.5'
  badge:
    fontFamily: DM Sans
    fontSize: 10px
    fontWeight: '500'
    letterSpacing: 0.1em
  button:
    fontFamily: DM Sans
    fontSize: 13px
    fontWeight: '500'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  huge: 64px
  massive: 96px
  container-max: 1280px
  section-padding-v: 80px
  section-padding-v-mobile: 48px
  edge-margin: 80px
  edge-margin-mobile: 20px
---

# Acharkhastory — Page Design Specification
**Reference: okhai.org · Brand: Acharkhastory · Pages: Homepage · Product · Explore**
**Version 1.0 · May 2025**

---

## How to Read This Document

Each page is broken into **sections** (the building blocks of the page), listed top to bottom exactly as they appear on screen. Every section has:
- **What it is** — the purpose of this section
- **Desktop layout** — exact structure for 1280px+ screens
- **Mobile layout** — how it adapts below 768px
- **Content spec** — what text, images, and data goes in
- **Interaction** — hover states, click actions, animations
- **Liquid code hint** — the Shopify section file name to create

---

# DESIGN TOKENS (Apply to all 3 pages)

## Colours

| Token | Hex | Use |
|---|---|---|
| `--color-primary` | `#3D2210` | Logo, headings, primary CTA |
| `--color-secondary` | `#7B4B2A` | Hover, links, accents |
| `--color-warm-mid` | `#C4956A` | Sub-labels, craft tags, icon fills |
| `--color-surface` | `#E8CDA8` | Hero bg, card image placeholders |
| `--color-bg` | `#FDF6EE` | Page background |
| `--color-sale` | `#C0392B` | Sale badge, sale price |
| `--color-text-body` | `#1A1008` | All body text |
| `--color-text-muted` | `#8A7968` | Captions, secondary info |
| `--color-border` | `#EAD9C4` | Card borders, dividers |
| `--color-white` | `#FFFFFF` | Button text on dark bg |

## Typography

| Token | Font | Size | Weight | Use |
|---|---|---|---|---|
| `--font-display` | Cormorant Garamond | 52px → 32px mob | 500 | Hero headline |
| `--font-h2` | Cormorant Garamond | 36px → 24px mob | 500 | Section headings |
| `--font-h3` | Cormorant Garamond | 24px → 20px mob | 500 | Product names, card titles |
| `--font-nav` | DM Sans | 13px | 400 | Navigation |
| `--font-body` | DM Sans | 15px | 400 | Descriptions |
| `--font-small` | DM Sans | 12px | 400 | Captions, meta |
| `--font-badge` | DM Sans | 10px | 500 | Tags, badges (uppercase) |
| `--font-btn` | DM Sans | 13px | 500 | Buttons |

## Spacing Scale

`4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96px`
All section vertical padding: `80px` desktop, `48px` mobile.
Max content width: `1280px`, centred with `80px` side padding desktop / `20px` mobile.

---

---

# PAGE 1 — HOMEPAGE

> **Goal:** Welcome first-time visitors, communicate brand identity immediately, drive discovery across categories, and surface social proof (artisans, craft types, reviews).

---

## S1 · Announcement Bar

**What:** Thin bar sitting above the entire page. Rotates 3 promotional messages.

**Desktop layout:**
- Full-width, `36px` height
- Background: `--color-primary` `#3D2210`
- Text centred: DM Sans 12px, Ivory `#FDF6EE`
- `|` pipe separator between message and dismiss `×` icon (right-aligned)
- Auto-rotates every 4 seconds with a fade cross-dissolve

**Mobile layout:**
- Same height, single static message (no rotation — performance)
- No dismiss icon on mobile (saves tap space)

**Content (3 rotating messages):**
1. `Use code ACHARKHA10 for flat 10% off on your first order`
2. `Free shipping on orders above ₹1499 · Easy 15-day returns`
3. `Handcrafted by 2300+ artisans across India · Shop consciously`

**Liquid file:** `sections/announcement-bar.liquid`
**Schema controls:** Up to 5 message fields, background colour picker, enable/disable toggle

---

## S2 · Header / Navigation

**What:** Primary navigation. Sticky on scroll. Contains logo, mega menu, and utility icons.

**Desktop layout (`64px` height when expanded, `56px` on scroll):**

```
[ACHARKHASTORY]    Clothing  Kurtas  Sarees  Accessories  Home  Artisans  Explore  Sale    [🔍] [♡] [👤] [🛍 2]
```

- Logo: Left-aligned. Cormorant Garamond 20px 500, colour `--color-primary`
- Nav links: Centre-clustered. DM Sans 13px. 28px horizontal gap between items.
- `Sale` link: colour `--color-sale` `#C0392B`, always visible as a red highlight
- Icons right: Search (opens overlay), Wishlist (opens wishlist page), Account, Cart (shows item count badge in terracotta)
- Background: White on scroll. Transparent over hero banner (first 100px of page).
- Bottom border: `1px solid --color-border` appears only on scroll

**Mega Menu (triggers on hover, 300ms delay):**
Each nav item reveals a full-width dropdown panel:
- Left 65%: subcategory link columns (2–3 columns of text links)
- Right 35%: 2 editorial product images with name labels underneath
- Background: `--color-bg` `#FDF6EE`
- Bottom accent border: `2px solid --color-secondary`
- Panel height: auto-fit content, max 440px
- Animate: fade-in + translate-down 6px, 200ms ease-out

**Mega menu content for `Clothing`:**
Columns: Women (Kurtas, Dresses, Tops, Sarees, Co-ords, Kaftans) · Men (Kurtas, Shirts, Ties) · Kids · Crafts (Ajrakh, Embroidery, Block Print…)
Images: featured kurta image + featured dress image

**Mobile layout (hamburger menu):**
- 56px header. Logo centred. Hamburger left. Cart icon right.
- Hamburger opens a full-screen slide-over from left, white background
- Top: Account + Wishlist row
- Below: accordion nav. Tap category to expand sub-links
- Bottom: Phone number + social icons
- Overlay: `rgba(26,16,8,0.4)` on page

**Liquid file:** `sections/header.liquid`
**Schema controls:** Logo upload, logo max-width slider, nav link labels

---

## S3 · Hero Banner Slider

**What:** The first thing a visitor sees. Full-width, tall, cinematic. Communicates the brand's soul in one image + headline.

**Desktop layout:**
- Width: 100vw (full bleed)
- Height: `88vh` (minimum 600px, maximum 800px)
- Background: each slide has a full-bleed lifestyle/editorial image
- Gradient overlay: `linear-gradient(to right, rgba(61,34,16,0.55) 0%, rgba(61,34,16,0) 60%)` — darkens left side only so text is legible
- Content block: Left-aligned, vertically centred, max-width 560px, left padding 80px

**Content block layout per slide:**
```
[EYEBROW LABEL]          ← DM Sans 11px 500 uppercase, letter-spacing 0.14em, --color-warm-mid
[HEADLINE]               ← Cormorant Garamond 52px 500, Ivory, line-height 1.1, max 3 lines
[SUBTEXT]                ← DM Sans 16px 400, Ivory 80% opacity, max 2 lines
[CTA 1] [CTA 2]          ← Primary button (ivory bg, dark text) + Ghost button (ivory border, ivory text)
```

**Slider behaviour:**
- Auto-advances every 5 seconds
- Pause on hover
- Slide transition: content fade + image cross-dissolve (500ms)
- Dots indicator bottom-centre: `8px` circles, active = ivory filled, inactive = ivory 40% opacity
- Arrow controls: left/right, appear on hover, 44px tap targets

**6 slides (client uploads images — spec these):**
| Slide | Eyebrow | Headline | Subtext | CTA 1 | CTA 2 |
|---|---|---|---|---|---|
| 1 | New Collection 2025 | Stories woven in every thread | Handcrafted Ajrakh, made in Kutch | Shop Ajrakh | Meet the Artisan |
| 2 | Heirloom Embroidery | The art your grandmother remembered | Mirror work by Okhai craftswomen | Shop Embroidery | Explore Crafts |
| 3 | Gifting | Give something that means something | Handmade gifts under ₹1500 | Shop Gifts | Gift Under ₹1500 |
| 4 | New Sarees | Draped in centuries of craft | Handwoven, hand-painted, and hand-blocked sarees | Shop Sarees | View All |
| 5 | For Him | Kurtas that tell a story | Hand-embroidered for the conscious man | Shop Men | New Arrivals |
| 6 | Sale | Artisan pieces, now on sale | Up to 40% off on selected handcrafted clothing | Shop Sale | View All |

**Mobile layout:**
- Height: `70vh` (portrait crop of images, separate mobile image upload per slide)
- Content block: centred, bottom-third of slide
- Headline font size: 32px
- Single CTA only (primary)
- Dots navigation visible and large enough for thumb tap

**Liquid file:** `sections/hero-slider.liquid`
**Schema controls:** up to 8 slides, per-slide: desktop image, mobile image, eyebrow text, headline, subtext, CTA 1 label + link, CTA 2 label + link

---

## S4 · Trust Badge Strip

**What:** 5 short value propositions directly below the hero. Builds immediate trust.

**Desktop layout:**
- Full-width strip, height `72px`
- Background: `--color-bg`, top/bottom `1px solid --color-border`
- 5 items evenly spaced in a flex row
- Each item: small custom icon (32px) + label below in DM Sans 12px `--color-text-muted`

**5 badges (icons are custom illustrated, not emoji):**
| Icon | Label |
|---|---|
| Two hands clasped | Women Empowerment |
| Circular arrows | Circular Fashion |
| Leaf | Sustainable |
| Spinning wheel (acharkha) | Heirloom Crafts |
| Return arrow with box | Easy Returns |

**Mobile layout:**
- Horizontal scroll row, no wrap
- Each item 120px wide, text below icon, slightly smaller

**Liquid file:** `sections/trust-badges.liquid`
**Schema controls:** each badge has icon upload + label text field

---

## S5 · Collections Grid

**What:** Quick-entry navigation tiles into main product categories. Visual, clean, 4 tiles in a row.

**Desktop layout:**
- Section heading: Cormorant Garamond 36px 500, centred — `"Collections"`
- Sub-label: DM Sans 14px muted — `"Shop by category"`
- Grid: 4 columns, gap 16px
- Each tile: portrait image (3:4 ratio, hover shows slight scale 1.04 + darken overlay with category name centred in ivory)
- Below image: category name in DM Sans 14px 500 `--color-primary`
- Tile border radius: 12px, overflow hidden

**4 tiles and their images:**
| Category | Image vibe |
|---|---|
| Tops | Model wearing embroidered top, outdoor |
| Kurtas | Flat-lay of printed kurtas, warm tones |
| Dresses | Model in Ajrakh dress, natural light |
| Jewellery | Close-up of handmade earrings on fabric |

**Add 2 more optional tiles:**
| Category | Image vibe |
|---|---|
| Sarees | Draped saree, golden hour |
| Home | Handcrafted cushions + macramé in a room |

**Mobile layout:**
- 2×2 grid (scrollable if 6 tiles)
- Square tiles instead of portrait

**Liquid file:** `sections/category-tiles.liquid`
**Schema controls:** up to 8 tiles, each: image upload, label, link

---

## S6 · New Arrivals Carousel

**What:** Horizontal scrollable product feed. First major product section. Shows latest inventory.

**Desktop layout:**
- Section heading left-aligned: Cormorant Garamond 32px — `"New Arrivals"`
- Subtext: DM Sans 13px muted — `"Crafted with love"`
- `"View all →"` link right-aligned, DM Sans 13px `--color-secondary`
- 4 product cards visible, with left/right arrow controls (appear on hover)
- Cards are 280px wide, 2:3 portrait image ratio
- Horizontal scroll (no pagination) — scroll reveals more

**Each Product Card:**
```
┌────────────────────────────┐
│  [New / Best Seller badge] │  top-left overlay badge, 10px DM Sans
│                            │
│       [Product Image]      │  full card width, 2:3 ratio
│  (hover → second image)    │  cross-fade to second image on hover
│                            │
│  [♡ Wishlist]              │  top-right icon, fills on save
│                            │
│  [ADD TO BAG] ▲            │  slides up from bottom on hover
├────────────────────────────┤
│  [Craft Tag]  Ajrakh       │  10px badge, terracotta bg
│  Product name              │  DM Sans 13px 500
│  Artisan — Rangsutra       │  DM Sans 11px muted, linked
│  ₹4,700  ~~₹5,500~~        │  price + compare-at
│  [XS] [S] [M] [L] [XL]    │  size pills, 10px, 28px height
└────────────────────────────┘
```

**Card hover states:**
- Image: cross-fades to second product photo (250ms)
- "Add to Bag" bar: translates up from bottom of image (200ms ease-out), primary button style
- Wishlist heart: fills with `--color-sale` on save, scale bounce animation

**12 products minimum, scrolls to reveal all**

**Mobile layout:**
- Horizontal drag-scroll, 2 cards visible at a time
- Arrow controls replaced by swipe gesture
- Touch momentum scrolling

**Liquid file:** `sections/product-carousel.liquid`
**Schema controls:** collection picker, number of products to show (max 20), section title, subtitle, CTA label

---

## S7 · Featured Collection Banner

**What:** Full-width editorial split banner. Highlights a curated collection with a story angle — like Okhai's "Dresses for Every Curve and Every Occasion".

**Desktop layout:**
- Full-width, 600px height
- Left 55%: editorial lifestyle image (full bleed to the left edge)
- Right 45%: content panel, background `--color-surface` `#E8CDA8`

**Content panel:**
```
[EYEBROW LABEL]    ← DM Sans 11px uppercase `--color-warm-mid`
[COLLECTION TITLE] ← Cormorant Garamond 42px 500 `--color-primary`
[TAGLINE]          ← Cormorant Garamond 20px italic `--color-secondary`
[DESCRIPTION]      ← DM Sans 15px 2-line max `--color-text-muted`
[SHOP NOW →]       ← Primary button
```

**Two instances on homepage (alternating image left/right):**

Instance 1 — Clothing:
- Eyebrow: `New Season`
- Title: `Dressed in Indian Craft`
- Tagline: `for every occasion, every curve`
- Description: Kurtas, dresses, and co-ords made by artisan hands from across India.
- CTA: Shop Clothing

Instance 2 — Crafts:
- Eyebrow: `Explore Crafts`
- Title: `From the Loom to Your Doorstep`
- Tagline: `Ajrakh. Block Print. Chikankari.`
- Description: 20+ distinct craft traditions, each with its own story and its own artisan.
- CTA: Explore Crafts

**Mobile layout:**
- Stacks vertically: image top (300px), content panel below
- Full-width both

**Liquid file:** `sections/featured-collection-banner.liquid`
**Schema controls:** image upload (desktop + mobile), eyebrow, title, tagline, description, CTA label + link, image position (left/right toggle)

---

## S8 · Shop by Craft

**What:** Horizontal scrollable row of craft types. This is Acharkhastory's unique identity. Mirrors Okhai's "Crafts from the length and breadth of India" section.

**Desktop layout:**
- Section: `"Crafts of Acharkhastory"` heading centred, Cormorant 32px
- Subtext: `"From the length and breadth of India"` centred, muted
- `"Explore all crafts →"` link right
- Horizontal scroll row, 8 craft cards visible, arrows to reveal more
- Each card: 200px wide × 280px tall portrait image
- Image overlay: dark gradient bottom-up
- Craft name text on image: DM Sans 14px 500 uppercase, Ivory, bottom-left of card
- Border radius: 12px
- Hover: scale 1.03, brightness slightly lifted (200ms)

**10 craft cards (client provides one editorial image per craft):**
| Craft | Example products to show |
|---|---|
| Ajrakh | Deep indigo geometric dress |
| Block Printing | Floral motif kurta |
| Chikankari | White sheer top |
| Hand Embroidery | Mirror work kurta |
| Madhubani | Saree with folk art |
| Weaving | Handloom dupatta |
| Macramé | Wall hanging, plant holder |
| Eco Printing | Botanically dyed dress |
| Kalamkari | Pen-painted kurta |
| Batik | Wax-resist saree |

**Mobile layout:**
- Horizontal drag-scroll, 2.5 cards visible (slight peek to signal scroll)
- Cards are 160px × 220px

**Liquid file:** `sections/craft-types.liquid`
**Schema controls:** up to 12 craft tiles, each: image, craft name, link

---

## S9 · Bestsellers Grid

**What:** 4–column grid of top-performing products. Gives direct access to proven inventory.

**Desktop layout:**
- Heading: `"Bestsellers"` Cormorant 32px left-aligned
- Subtext: `"Loved by thousands"` muted
- `"Shop all →"` right-aligned
- 4-column grid, 2 rows visible = 8 products
- Same product card design as S6
- Below the 8 products: full-width `"Load more"` ghost button (centred)

**Mobile layout:**
- 2-column grid

**Liquid file:** `sections/bestsellers-grid.liquid`
**Schema controls:** collection picker (should be "Best Sellers" automated collection), products to show per page, section title

---

## S10 · Artisan Story Banner

**What:** The emotional core of the brand. A dedicated section honouring the artisans. Mirrors Okhai's artisan photography section.

**Desktop layout:**
- Full-width, 500px height, split 50/50
- Left: Full-bleed artisan photo (working shot — hands crafting)
- Right: content on `#F5E6D0` background

**Content right panel:**
```
OUR ARTISANS              ← eyebrow, DM Sans 11px uppercase warm-mid
A story behind every stitch  ← Cormorant 38px 500
                          ← gap
2300+    12       40+     ← stat row
Artisans  States  Crafts  ← DM Sans 12px muted below each
                          ← gap
Every Acharkhastory purchase directly supports
a rural artisan preserving an ancient craft.
Your wardrobe becomes their livelihood.
                          ← 3 lines, DM Sans 15px
                          ← gap
[Meet Our Artisans →]     ← primary button
```

**Mobile layout:**
- Image top (300px, portrait crop)
- Content panel below, centred text
- Stat row stays as 3 columns

**Liquid file:** `sections/artisan-story.liquid`
**Schema controls:** image, eyebrow, heading, body text, 3 stats (number + label each), CTA label + link

---

## S11 · Customer Reviews

**What:** Social proof. 3-column row of photo reviews from real customers.

**Desktop layout:**
- Heading: `"What our community says"` Cormorant 32px centred
- 3 review cards side by side
- Each card: customer photo (circle, 56px), name, location, ★★★★★ stars, review text (max 160 chars), product they bought (small thumbnail + name linked)
- Cards: white bg, `1px solid --color-border`, 16px padding, 12px radius

**Mobile layout:**
- Horizontal drag-scroll, 1.2 cards visible

**Liquid file:** `sections/reviews.liquid` (or integrate Judge.me / Loox app embed)
**Schema controls:** up to 9 manually entered reviews (name, location, text, stars, photo upload, product link)

---

## S12 · Instagram Feed

**What:** Shows brand lifestyle and craft content. Keeps site feeling alive and social.

**Desktop layout:**
- Heading: `"@acharkhastory"` DM Sans 16px, centred, linked to Instagram profile
- 6 square images in a row, no gap (or 4px gap)
- Each image links to the Instagram post
- Hover: slight overlay with Instagram icon

**Mobile layout:**
- Scrolls horizontally, 3 images visible

**App:** Instafeed or Covet.pics Shopify app for live feed
**Liquid file:** `sections/instagram-feed.liquid`

---

## S13 · Email Signup Banner

**What:** Newsletter capture. Incentivised with discount.

**Desktop layout:**
- Full-width, 200px height
- Background: `--color-surface` `#E8CDA8` with subtle block-print pattern texture at 8% opacity
- Content centred:

```
Subscribe & get 10% off your first order
Enter your email                 [SUBSCRIBE]
We send only what matters — new arrivals, artisan stories, and early access.
```

- Input: 400px wide, 44px height, `--color-border` border, `--color-bg` fill
- Button: Primary (Deep Walnut bg, Ivory text)
- Fine print: 12px muted, `no spam · unsubscribe any time`

**Mobile layout:**
- Stacked: heading → input (full width) → button (full width) → fine print

**Liquid file:** `sections/email-signup.liquid`
**Schema controls:** heading, sub-copy, input placeholder text, button label, Klaviyo list ID

---

## S14 · Footer

**What:** Comprehensive navigation, contact, and trust. Last thing a visitor sees.

**Desktop layout — 4 columns + bottom bar:**

```
Col 1: Logo + tagline + "Made by artisan hands in India" + social icons (Instagram, Pinterest, Facebook, YouTube)

Col 2: QUICK LINKS
About Acharkhastory · Our Artisans · Blog & Stories · Sustainability · Careers · Press

Col 3: HELP
Shipping Policy · Returns & Refunds · Size Guide · Track Your Order · Contact Us · FAQs

Col 4: CONTACT
📞 +91 XXXXX XXXXX
✉ hello@acharkhastory.in
WhatsApp us
Mon–Sat 10am–6pm IST
```

**Bottom bar (below a full-width divider):**
```
© 2025 Acharkhastory. All rights reserved.    [Visa] [Mastercard] [UPI] [RuPay] [Razorpay]
Privacy Policy · Terms · Refund Policy
```

**Colours:**
- Background: `--color-primary` `#3D2210`
- All text: Ivory `#FDF6EE`
- Links: Ivory, 80% opacity. Hover: 100% opacity + underline
- Divider: `rgba(255,255,255,0.12)`

**Mobile layout:**
- Single column, accordion sections for Quick Links and Help

**Liquid file:** `sections/footer.liquid`

---

---

# PAGE 2 — PRODUCT DETAIL PAGE (PDP)

> **Goal:** Convert a visitor who clicked a product. Give them everything they need — trust, details, craft story, fit info — without overwhelming. Reduce returns by setting accurate expectations.

---

## Layout Overview

```
HEADER (sticky)
├── Breadcrumb
├── [LEFT PANEL 55%]         [RIGHT PANEL 45%]
│   Image gallery              Product info
│   (main + thumbnails)        (all purchase decision content)
├── Tabs section (full width below)
├── "You may also like" carousel
└── FOOTER
```

---

## PD1 · Breadcrumb

```
Home  >  Clothing  >  Kurtas  >  Okhai "Maze" Cotton Ajrakh Short Dress
```

- DM Sans 12px, `--color-text-muted`
- Links underline on hover
- Last item is plain text (current page), not linked
- Margin: 24px top, 16px bottom

---

## PD2 · Left Panel — Image Gallery

**Main image:**
- Width: fills left panel
- Aspect ratio: 2:3 portrait
- Border radius: 8px
- Background if image loading: `--color-surface` `#E8CDA8`
- Zoom: magnifier cursor on hover, opens lightbox modal at full resolution on click
- Mobile: pinch-to-zoom

**Thumbnail strip (below main image on desktop, left sidebar on large screens):**
- Horizontal row below main image
- Each thumbnail: 72px × 96px, 2:3 ratio, 4px gap, 6px border radius
- Active thumbnail: `2px solid --color-secondary` border
- Click to swap main image
- Min 4 images, max 8 images per product

**Image order standard for every product:**
1. Front view, on model
2. Back view, on model
3. Craft detail / close-up of embroidery or print
4. Side / movement shot
5. Flat-lay (optional)
6. Lifestyle shot

**Image badges on main image:**
- `New`, `Best Seller`, `Sale` — top-left, 10px badge
- Craft type — bottom-left (e.g. `Ajrakh`, `Embroidery`)

**Mobile gallery:**
- Full-width horizontal swipe carousel
- Dots indicator below
- Tap to open fullscreen lightbox

---

## PD3 · Right Panel — Product Info

This panel is the buying decision area. Every element ordered by psychological priority: identity → desire → trust → action.

```
┌────────────────────────────────────────┐
│  Rangsutra  ← artisan group, 12px DM  │  linked to artisan page
│                                        │
│  Okhai "Maze" Cotton Ajrakh           │  ← Cormorant 28px 500
│  Short Dress                           │
│                                        │
│  ★★★★☆  4.3 (52 reviews) ↓            │  ← scroll to reviews on click
│                                        │
│  ₹4,700  ~~₹5,500~~  SAVE 15%        │  ← price row
│  (Inclusive of all taxes)              │
│                                        │
│  ─────────────────────────────────     │
│  COLOUR: Indigo Blue                  │  ← swatch label updates on hover
│  ◉ ○ ○ ○                              │  ← colour swatches (28px circles)
│                                        │
│  SIZE: M    [Size Guide]              │  ← selected size shown, guide opens modal
│  [XS] [S] [●M] [L] [XL] [XXL]        │  ← pill buttons, selected = filled primary
│                                        │
│  Only 3 left in size M                │  ← urgency, shows when stock ≤ 5
│                                        │
│  [  −  1  +  ]   [ADD TO BAG →]      │  ← qty stepper + primary CTA full width
│  [♡  SAVE TO WISHLIST]                │  ← secondary ghost button
│                                        │
│  ─────────────────────────────────     │
│  🚚 Free shipping on orders ₹1499+    │  ← 12px DM Sans, icon + text
│  ↩ Easy 15-day returns                │
│  🌿 Sustainable · Handmade             │
│                                        │
│  ─────────────────────────────────     │
│  ARTISAN                               │  ← section heading
│  [Photo] Rekha Devi                   │  ← 48px circle photo
│          Rangsutra, Rajasthan          │
│          Mirror work artisan           │  ← craft type
│  [View Artisan Profile →]             │  ← text link
│                                        │
└────────────────────────────────────────┘
```

**Price display logic:**
- If no sale: `₹4,700` in `--color-primary`, 22px, 500
- If on sale: `₹4,700` in `--color-sale` (red) + `~~₹5,500~~` in muted + `SAVE 15%` green badge
- Always: `(Inclusive of all taxes)` in 11px muted below

**Size pill states:**
- Available: `1px solid --color-border`, `--color-primary` text, hover = border darkens
- Selected: filled `--color-primary` background, Ivory text
- Sold out: muted text + diagonal strikethrough line across the pill

**"Add to Bag" button:**
- Full width of right panel
- Height: 52px
- Background: `--color-primary`
- Text: `ADD TO BAG` DM Sans 14px 500 uppercase Ivory
- Hover: background transitions to `--color-secondary`
- After click: button transitions to `✓ ADDED` for 2 seconds, then reverts

**Sticky bar on mobile (appears on scroll):**
- Fixed bottom bar when product name has scrolled out of view
- Shows: product name (truncated) + price + `Add to Bag` button
- Height: 64px, white background, top shadow

---

## PD4 · Product Detail Tabs

Full-width section below the split panel, 3 accordion tabs (closed by default except Description).

### Tab 1 — Description
- Product story: what makes this piece, the craft technique, when/how to wear it
- Bullet points for skimmability:
  - Fabric: 100% Pure Cotton
  - Craft: Ajrakh Block Print (hand-stamped with natural dyes)
  - Artisan: Rangsutra collective, Bikaner, Rajasthan
  - Occasion: Everyday wear, work, travel
  - Wash Care: Gentle machine wash cold, dry in shade
  - Model info: Model is 5'6" wearing size S

### Tab 2 — Size Guide
- Inline size chart table (no popup needed on desktop)
- Two measurement systems: Inches + Centimetres (toggle)
- Rows: XS / S / M / L / XL / XXL
- Columns: Bust / Waist / Hip / Shoulder / Length
- Note: "This garment runs true to size. For a relaxed fit, size up."
- Illustrated diagram (simple line drawing) showing where to measure

### Tab 3 — Shipping & Returns
- Shipping: Free above ₹1499 · Standard 5–7 working days · Express available
- Returns: 15-day easy returns · Unused with tags · Refund within 7 working days
- Exchanges: Size exchange free of charge within 15 days
- Note on handmade: "As each piece is handcrafted, slight variations in colour and pattern are a feature, not a defect."

**Tab styling:**
- Tab headers: DM Sans 13px 500, `--color-text-muted`, uppercase, 24px bottom border
- Active tab: `--color-primary` text + `2px solid --color-secondary` bottom border
- Content: DM Sans 15px 400, line-height 1.8

---

## PD5 · You May Also Like

- Heading: `"You may also like"` Cormorant 28px
- 4-column product carousel (same card design as homepage S6)
- Products sourced by: same craft type tag AND same collection, excluding current product
- Left/right scroll arrows

---

## PD6 · Complete the Look (Optional Section)

- Heading: `"Complete the look"` Cormorant 28px
- Shows 3 complementary items styled together: e.g. Kurta + Dupatta + Earrings
- Styled editorial photo showing all 3 together (client provides)
- Below photo: 3 cards side by side with `+ Add` button
- `"Shop this look"` button adds all 3 to cart

---

## PD7 · Customer Reviews

- Heading: `"Community Reviews"` Cormorant 28px
- Summary row: aggregate ★★★★☆ 4.3 · "Based on 52 reviews"
- Rating breakdown: 5 star, 4 star, 3 star… (bar chart style)
- Filter: Sort by "Most recent" / "Most helpful" / "With photos"
- Each review card: customer name, location, date, stars, review text, product variant they bought, up to 3 customer photos (click to enlarge)
- `"Write a review"` button → opens review form below or modal
- Load more reviews button (show 5 initially)

**Integrate:** Judge.me (free plan available) or Loox

---

---

# PAGE 3 — EXPLORE PAGE

> **Goal:** The discovery page. Customers who don't know exactly what they want come here. It's equal parts editorial magazine, craft guide, and product browse. This is where Acharkhastory's identity as a craft-preserving brand lives most vividly.
> 
> **Okhai equivalent:** Their Artisans landing page + Collections page combined — but rethought as a richer editorial experience.

---

## EX0 · Page Header

```
EXPLORE ACHARKHASTORY
From ancient craft traditions to contemporary handmade design.
Discover 20+ craft types, 40+ artisan groups, and 2300+ hands behind every piece.
```

- Background: `--color-surface` `#E8CDA8` with block-print texture at 8% opacity
- Heading: Cormorant Garamond 52px 500 centred
- Subtext: DM Sans 16px centred, `--color-text-muted`, 2 lines max
- Section height: 280px, content vertically centred
- Below the heading: a horizontal filter/tab bar (sticky on scroll)

---

## EX1 · Explore Filter Bar (Sticky)

**What:** A horizontal tab bar that filters the page content. Sticks to the top (below header) as user scrolls.

```
[All]  [Clothing]  [Sarees]  [Accessories]  [Home]  [Gifting]  [Craft Types]  [Artisans]
```

- Background: White, `1px solid --color-border` bottom
- Each tab: DM Sans 13px 500, 40px height, 16px horizontal padding
- Active tab: `--color-secondary` bottom border, `--color-primary` text
- Clicking a tab smooth-scrolls to that section on the page (no page reload)
- On mobile: horizontal scroll, all tabs visible

---

## EX2 · Featured Story Cards (Editorial Section)

**What:** 2 large editorial cards side by side. These rotate seasonally. Think magazine cover energy.

**Desktop layout:**
- 2 equal columns, gap 24px
- Each card: 600px × 400px landscape image with text overlay
- Gradient overlay: bottom-up dark overlay for text legibility
- Bottom-left text:

```
[CATEGORY LABEL]       ← DM Sans 11px uppercase ivory 70%
[Story Headline]       ← Cormorant 28px 500 Ivory
[Short description]    ← DM Sans 13px Ivory 80% (1 line)
[Explore →]            ← DM Sans 13px underlined Ivory
```

**2 featured stories (client updates seasonally):**
| Card | Label | Headline | CTA |
|---|---|---|---|
| 1 | Craft Spotlight | The women of Kutch who keep Ajrakh alive | Explore Ajrakh |
| 2 | New Season | Block prints, natural dyes, and summer ease | Shop New Arrivals |

**Mobile:** Stacked vertically, each card full-width 300px height

---

## EX3 · Craft Types Grid (Main Explore Section)

**What:** The largest section on the page. Shows all 20+ craft types Acharkhastory carries. Each as a visual card linking to that craft's collection.

**Section heading:** `"Crafts of India"` Cormorant 36px, left-aligned
**Subtext:** `"Every craft has a region, a ritual, and a reason."` muted italic

**Desktop grid:** 5 columns, variable rows
**Card size:** 220px × 300px portrait

**Each craft card:**
```
┌──────────────────┐
│                  │
│  [Craft Photo]   │  portrait, full card
│                  │
│ [Craft Name]     │  DM Sans 13px 500 uppercase, Ivory, bottom-left
│ [Region]         │  DM Sans 11px, Ivory 70%, bottom-left below name
└──────────────────┘
```
- Hover: slight scale 1.03, brighter image, category links appear
- Border radius: 10px

**20 craft cards:**
| Craft | Region label |
|---|---|
| Ajrakh | Kutch, Gujarat & Sindh |
| Block Printing | Rajasthan & Gujarat |
| Chikankari | Lucknow, UP |
| Mirror Work | Kutch, Gujarat |
| Madhubani | Mithila, Bihar |
| Kalamkari | Andhra Pradesh |
| Hand Weaving | Pan India |
| Ikat | Odisha & Telangana |
| Batik | West Bengal & UP |
| Eco Printing | Pan India |
| Gota Patti | Jaipur, Rajasthan |
| Macramé | Pan India |
| Appliqué | Odisha & Gujarat |
| Jamdani | West Bengal |
| Crochet | Pan India |
| Dokra | Bastar, Chhattisgarh |
| Blue Pottery | Jaipur, Rajasthan |
| Aari Work | Kashmir |
| Tie and Dye | Rajasthan & Gujarat |
| Mukaish | Lucknow, UP |

**Mobile:** 2 columns, shorter cards (portrait 2:3 ratio maintained)

---

## EX4 · Shop by Craft (Products under each Craft)

**What:** After the craft grid, the page shows preview products for each featured craft type. Think of it as mini-collection previews embedded inline.

**Layout per craft:**
- Left: Craft type label (Cormorant 24px), region (DM Sans 12px muted), 1-line craft description, `"Shop all [Craft] →"` text link
- Right: Horizontal row of 3 product cards (same card component as homepage)

**Show the top 3–4 crafts only inline. The rest are accessible via the craft card grid above.**

**Featured inline crafts:**
1. Ajrakh — 3 products
2. Hand Embroidery — 3 products
3. Block Printing — 3 products
4. Chikankari — 3 products

---

## EX5 · Artisans Directory

**What:** Celebrates the artisan groups Acharkhastory works with. Builds emotional connection.

**Section heading:** `"The Hands Behind Acharkhastory"` Cormorant 36px
**Subtext:** `"We work with 40+ artisan groups across 12 Indian states."`

**Desktop layout:** 4-column grid of artisan group cards

**Each artisan group card:**
```
┌────────────────────────┐
│   [Group Photo]        │  square, 1:1 ratio
│                        │
├────────────────────────┤
│  Rangsutra             │  DM Sans 14px 500
│  Bikaner, Rajasthan    │  DM Sans 12px muted
│  Mirror Work · Embroidery  │ Craft tags (badges)
│  [View Collection →]   │  text link
└────────────────────────┘
```

**Show 12 artisan groups (client fills in), with a `"View all artisans"` CTA below the grid**

**Mobile:** 2 columns

---

## EX6 · The Craft Map

**What:** An illustrated map of India showing where each craft comes from. Purely editorial — no shopping. Builds brand credibility and education.

**Desktop:**
- Full-width section, 600px height
- Left 50%: Illustrated India map with dots at key craft regions. Hover a dot → tooltip shows craft name + image
- Right 50%: Scrollable list of all crafts, each with a small image, name, and region. Clicking highlights the map dot.
- Map style: flat illustration, terracotta + cream tones

**Mobile:**
- List view only (map collapses — too small to be usable)
- Each craft: icon + name + region as a simple list

**Build:** Custom HTML/CSS/JS illustration (not a Google Maps embed)
**Liquid file:** `sections/craft-map.liquid`

---

## EX7 · Gifting Section

**What:** Curated gift guide section with price filters. Drives gifting discovery.

**Section heading:** `"Thoughtful Gifting"` Cormorant 36px
**Subtext:** `"Give something made by hand, kept for life."`

**Desktop layout:** Filter tabs + product grid

**Price filter tabs:**
```
[Under ₹500]  [Under ₹1500]  [Under ₹2500]  [Under ₹5000]  [For Her]  [For Him]  [For Kids]
```

- Default selected: `Under ₹1500`
- Clicking a tab filters the 8-product grid below it (JS, no page reload)
- Products sourced from tagged collections

**Below tabs:** 4×2 product grid (standard cards)

---

## EX8 · Explore — Blog / Stories Preview

**What:** 3 recent editorial/blog articles. Bridges commerce and culture.

**Section heading:** `"Stories from the Studio"` Cormorant 36px

**Desktop layout:** 3 equal cards in a row

**Each story card:**
```
┌────────────────────────┐
│  [Cover Image]         │  16:9 ratio, 220px height
│                        │
│  [Category Tag]        │  10px badge: Craft Story / Artisan Feature / Style Guide
│  [Article Headline]    │  Cormorant 20px 500, 2 lines max
│  [2-line preview]      │  DM Sans 13px muted
│  [Date]   [Read more →]│  bottom row
└────────────────────────┘
```

**3 default article categories to seed:**
1. `"The story of Ajrakh: 3000 years of a single pattern"` — Craft Story
2. `"Meet Rekha: the mirror worker from Kutch"` — Artisan Feature
3. `"How to style a handblock kurta for the office"` — Style Guide

---

## EX9 · Impact Counter Section

**What:** Animated number counters that show the scale of Acharkhastory's artisan impact. Pure brand storytelling.

**Desktop layout:**
- Full-width, `180px` height
- Background: `--color-primary` `#3D2210`
- 4 counters evenly spaced:

| Number | Label |
|---|---|
| 2,300+ | Artisans empowered |
| 12 | Indian states |
| 20+ | Craft traditions |
| ₹2Cr+ | Artisan earnings (annual) |

- Number: Cormorant Garamond 48px 500, Ivory
- Label: DM Sans 12px, Ivory 70%, uppercase, letter-spacing 0.08em
- Animation: numbers count up from 0 when section enters viewport (use IntersectionObserver)

---

## EX10 · Newsletter / CTA Footer Banner

Same as Homepage S13. Full-width email capture banner, consistently placed at the bottom of all pages.

---

---

# SHARED COMPONENTS

These components appear identically across all 3 pages.

## Cart Drawer

Slides in from right edge on "Add to Bag" click.

```
HEADER:   My Bag (3 items)               [×]
─────────────────────────────────────────
ITEM ROW (for each cart item):
[Product Image 80px × 100px]
[Product Name (1 line, truncated)]
[Variant: Size M · Colour: Indigo]
[Artisan: Rangsutra]
[Price: ₹4,700]              [− 1 +]  [🗑]
─────────────────────────────────────────
SHIPPING NUDGE:
  ━━━━━━━━━━━━━━━━░░░░  "₹340 more for free shipping!"
  (progress bar, fills as cart value increases)
─────────────────────────────────────────
SUBTOTAL:  ₹8,400                (3 items)
(Inclusive of all taxes)

SPECIAL DELIVERY INSTRUCTIONS  [+ Add note]

[  CHECKOUT  →  ]              ← primary button, full width
[Continue Shopping]            ← text link, centred
─────────────────────────────────────────
RECENTLY VIEWED (optional):
  You also looked at: [2 product thumbnails]
```

**Behaviour:**
- Width: 400px desktop, full-screen on mobile
- Overlay: `rgba(26,16,8,0.45)` on page, click outside to close
- Slide animation: 350ms cubic-bezier ease
- If cart is empty: shows `"Your bag is empty"` with `"Keep Shopping →"` CTA

## Search Overlay

Full-screen takeover on search icon click.

```
[×]                           ← top right close button

[  🔍  Search for crafts, products, artisans...   ]   ← centred, 32px input

TRENDING SEARCHES:
  Ajrakh  ·  Mirror Work  ·  Sarees  ·  Kurtas  ·  Gifts

RECENTLY VIEWED:
  [3 product thumbnails with names]

POPULAR COLLECTIONS:
  [New Arrivals]  [Bestsellers]  [Under ₹1500]  [Gifting]
```

**As user types:**
- Instant results below: product cards (image + name + price), collection links
- `"See all results for '[query]'"` at bottom

## Size Guide Modal

Opens from "Size Guide" link on PDP.

- Modal overlay, 640px wide
- Tab toggle: Clothing / Kurtas / Sarees / Accessories
- Size chart table for selected category
- Illustrated how-to-measure diagram
- Note: "For handmade garments, measurements may vary by up to 1 inch"

---

---

# IMPLEMENTATION NOTES FOR DEVELOPER

## Shopify Section Files Required

| Section File | Used On |
|---|---|
| `announcement-bar.liquid` | All pages |
| `header.liquid` | All pages |
| `footer.liquid` | All pages |
| `hero-slider.liquid` | Homepage |
| `trust-badges.liquid` | Homepage |
| `category-tiles.liquid` | Homepage |
| `product-carousel.liquid` | Homepage, Explore |
| `featured-collection-banner.liquid` | Homepage |
| `craft-types.liquid` | Homepage, Explore |
| `bestsellers-grid.liquid` | Homepage |
| `artisan-story.liquid` | Homepage |
| `reviews.liquid` | Homepage, PDP |
| `instagram-feed.liquid` | Homepage |
| `email-signup.liquid` | All pages |
| `craft-map.liquid` | Explore |
| `artisan-directory.liquid` | Explore |
| `gifting-section.liquid` | Explore |
| `blog-preview.liquid` | Explore |
| `impact-counter.liquid` | Explore |

## Snippet Files Required

| Snippet File | Purpose |
|---|---|
| `product-card.liquid` | Reused in every carousel and grid |
| `price.liquid` | Handles sale/compare-at display logic |
| `badge.liquid` | New / Sale / Best Seller overlays |
| `craft-tag.liquid` | Ajrakh, Embroidery etc. pill |
| `size-swatches.liquid` | Size pill selector |
| `artisan-mini.liquid` | Artisan credit on PDP |
| `icon-sprite.liquid` | All SVG icons centralised |
| `cart-drawer.liquid` | Sliding cart component |
| `search-modal.liquid` | Full-screen search overlay |
| `size-guide-modal.liquid` | Size chart popup |

## Key JavaScript Modules

| File | Purpose |
|---|---|
| `cart-drawer.js` | Open/close, add item, update qty, remove |
| `product-form.js` | Variant selection, price update, "Add to Bag" |
| `announcement-bar.js` | Rotating messages with fade |
| `mega-menu.js` | Hover delay, open/close, accessibility |
| `search-modal.js` | Open/close, live search results |
| `hero-slider.js` | Autoplay, swipe, dots |
| `image-gallery.js` | PDP thumbnail swap, lightbox |
| `tabs.js` | PDP description/size/shipping tabs |
| `impact-counter.js` | IntersectionObserver + count-up animation |
| `sticky-pdp-bar.js` | Mobile sticky add-to-bag bar |

---

*Brand: Acharkhastory · Reference: okhai.org · v1.0 May 2025*
*3 pages specified: Homepage · Product Detail · Explore*