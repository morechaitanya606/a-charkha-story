---
name: Artisan Heritage System
colors:
  surface: '#fff8f3'
  surface-dim: '#e6d8c5'
  surface-bright: '#fff8f3'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff2e2'
  surface-container: '#fbecd9'
  surface-container-high: '#f5e6d3'
  surface-container-highest: '#efe0cd'
  on-surface: '#221a0f'
  on-surface-variant: '#4e453e'
  inverse-surface: '#372f22'
  inverse-on-surface: '#feefdb'
  outline: '#80756d'
  outline-variant: '#d2c4bb'
  surface-tint: '#705a49'
  primary: '#322214'
  on-primary: '#ffffff'
  primary-container: '#4a3728'
  on-primary-container: '#bba08c'
  inverse-primary: '#dec1ac'
  secondary: '#7c5636'
  on-secondary: '#ffffff'
  secondary-container: '#fecaa2'
  on-secondary-container: '#795334'
  tertiary: '#530000'
  on-tertiary: '#ffffff'
  tertiary-container: '#7c0202'
  on-tertiary-container: '#ff7f6d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#fbddc7'
  primary-fixed-dim: '#dec1ac'
  on-primary-fixed: '#28180b'
  on-primary-fixed-variant: '#574333'
  secondary-fixed: '#ffdcc2'
  secondary-fixed-dim: '#efbd95'
  on-secondary-fixed: '#2e1500'
  on-secondary-fixed-variant: '#623f21'
  tertiary-fixed: '#ffdad5'
  tertiary-fixed-dim: '#ffb4a9'
  on-tertiary-fixed: '#410000'
  on-tertiary-fixed-variant: '#8e130c'
  background: '#fff8f3'
  on-background: '#221a0f'
  surface-variant: '#efe0cd'
typography:
  display-lg:
    fontFamily: EB Garamond
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: EB Garamond
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.2'
  headline-md:
    fontFamily: EB Garamond
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: EB Garamond
    fontSize: 20px
    fontWeight: '500'
    lineHeight: '1.4'
  body-lg:
    fontFamily: DM Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: DM Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: DM Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: DM Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.1em
  headline-lg-mobile:
    fontFamily: EB Garamond
    fontSize: 28px
    fontWeight: '500'
    lineHeight: '1.2'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  max-width: 1280px
---

## Brand & Style

The design system is rooted in the intersection of ancestral Indian craftsmanship and contemporary retail elegance. It targets a discerning global audience that values slow fashion, ethical production, and the tactile beauty of handmade goods. 

The aesthetic is **Tactile Minimalism**. It leverages the warmth of physical textures—handwoven khadi, aged parchment, and raw clay—while maintaining a sophisticated, uncluttered digital interface. The experience should feel like walking into a high-end boutique in a restored haveli: quiet, grounded, premium, and deeply connected to the human hand.

Visuals must prioritize natural, directional sunlight and high-resolution macros of embroidery and block prints to emphasize authenticity.

## Colors

The palette is a collection of earth-tones inspired by natural dyes and raw materials. 

- **Primary (Deep Walnut):** Used for primary actions, heavy borders, and authoritative structural elements.
- **Secondary (Terracotta):** Used for subtle accents, hover states, and secondary iconography.
- **Background (Parchment):** The foundational canvas, providing a warmer, more organic feel than pure white.
- **Surface (Sand):** Used for cards, input fields, and section nesting to create soft depth.
- **Highlight (Sale Red):** A traditional Indian "kumkum" red reserved strictly for urgency, sales, and error states.
- **Text (Dark Espresso):** High-contrast but softer than black, ensuring legibility while maintaining the earthy profile.

## Typography

The typography strategy balances the "Traditional" (Serif) with the "Modern" (Sans-serif).

- **Headlines:** Uses a sophisticated serif (EB Garamond) to evoke the literary and historical nature of Indian crafts. It should be used for all editorial content and product titles.
- **Body:** DM Sans provides a neutral, highly readable counterpoint, ensuring the technical details of the store (pricing, descriptions, checkout) remain clear and accessible.
- **Navigation & Labels:** All uppercase with increased tracking (0.1em) to create a premium, rhythmic feel in the header and UI controls.

## Layout & Spacing

The design system utilizes a **Fixed Grid** for desktop to maintain an editorial, boutique-like feel, and a **Fluid Grid** for mobile.

- **Desktop (1024px+):** 12-column grid with 24px gutters and 64px outer margins. Content is centered with a max-width of 1280px to prevent excessive line lengths.
- **Tablet (768px - 1023px):** 8-column grid with 24px gutters and 32px margins.
- **Mobile (Up to 767px):** 4-column grid with 16px gutters and 16px margins.

Spacing follows an 8px geometric progression. Use "XL" (80px) spacing between major sections to emphasize whitespace as a luxury element.

## Elevation & Depth

This design system avoids heavy shadows and synthetic blurs. Depth is communicated through **Tonal Layering** and **Materiality**:

- **Tier 1 (Base):** Parchment (#f5e6d3) background.
- **Tier 2 (Surface):** Sand (#e8d5b7) surfaces used for product cards or sidebar panels.
- **Tier 3 (Active):** Very soft, diffused ambient shadows (40% opacity, Deep Walnut tint) reserved only for floating elements like Modals or Cart Drawers.
- **Stroke/Outline:** 1px solid borders in the Primary color are used to define structure, mimicking the precision of a block-print frame.

## Shapes

The shape language is **Soft** but structured. 

- **Containers:** 0.25rem (4px) corner radius. This subtle rounding removes the clinical sharpness of modern digital design without leaning into the "bubbly" feel of consumer apps.
- **Buttons:** Maintain the same 4px radius for a tailored, architectural look.
- **Imagery:** Product photography should remain sharp-edged (0px) when displayed as full-bleed or within a frame to mimic physical art prints.

## Components

- **Buttons:** Primary buttons are solid Deep Walnut with Cream text. Secondary buttons use a Deep Walnut 1px border with no fill. All buttons use the `label-caps` typography style.
- **Input Fields:** Background set to Sand (#e8d5b7) with a bottom-only border in Deep Walnut for a cleaner, "notepaper" look.
- **Cards:** No shadows. Use a 1px Sand or Deep Walnut border (depending on context) and include a subtle texture overlay (5% opacity grain) to mimic fabric.
- **Chips/Filters:** Rounded-pill shape with 1px borders. Active states use a solid Terracotta fill with Cream text.
- **Lists:** Separated by thin 1px horizontal lines in Sand (#e8d5b7) to maintain a rhythmic vertical flow.
- **Artisan Badge:** A custom circular component containing "Handcrafted" text in `label-caps` that rotates slowly or sits as a wax-seal style stamp on product images.