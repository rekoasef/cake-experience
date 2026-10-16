# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion (motion/react) + lucide-react icons + next/font for Google Fonts. Specified directly by the user's brief for a from-scratch build.

## Users

Visitors browsing a premium artisan cake brand's landing page — people shopping for celebration cakes, gifting, or custom orders, evaluating the brand's craft and quality before ordering or inquiring. Secondary audience: anyone referencing this as a portfolio-quality example of an editorial, luxury food-brand website.

## Product Purpose

A single-page marketing/showcase site for "CAKÉ — The Cake Experience," a fictional premium cake studio. It exists to make the brand feel like a high-end editorial/commercial experience (not a generic bakery template) and to walk a visitor from hero impression through product storytelling to a closing call-to-action. No real commerce backend — cart/order actions are honest frontend demos, not real transactions.

## Positioning

Not "another bakery site" — positioned as edible-moment craftsmanship with the visual language of a luxury editorial/campaign brand (dark espresso contrast sections, art-directed macro food photography, process storytelling) rather than a cheerful generic food-delivery aesthetic.

## Operating Context

Three surfaces sharing one nav, cart drawer and footer: the long-scroll landing (`/`: hero with working flavor selector, dark "¿Qué celebramos?" occasion accordion, featured Trufa de Chocolate with size picker, bestsellers, process, Cake DNA, commissions gallery with lightbox, testimonials, cinematic CTA); the catalog (`/catalogo`: 33 products, category tabs, occasion chips, search and sort, all synced to shareable URL params); and per-product pages (`/catalogo/[slug]`: gallery, sizes/portions, quantity, layers, allergens, lead time, related items). Fictional brand — no real store location. Prices are illustrative and in Argentine pesos (ARS, `$`), matching the Argentine WhatsApp order flow.

## Capabilities and Constraints

- No backend/CMS/payment integration — "Add to Cart" and similar actions are frontend-only demo interactions (e.g., visible state change / toast), never implying a completed real purchase.
- Photography must be real sourced images (Unsplash-style editorial food photography), not placeholder boxes — exact licensing verification is out of scope for this fictional demo but images must be real, working, aesthetically matched food photography.
- Brand name "CAKÉ" and all copy are original/fictional, not copying any existing brand's protected marks beyond using the reference image purely as visual-direction inspiration.
- Must be fully responsive (desktop/laptop/tablet/mobile) and respect `prefers-reduced-motion`.

## Brand Commitments

- Name: "CAKÉ" (wordmark kept in Latin script with the accent), tagline "Pastelería de Autor" (wordmark style, serif display).
- Visual world directly inspired by a supplied reference screenshot: warm ivory/cream base with dark chocolate-espresso contrast sections, editorial serif display type + clean sans-serif body, large art-directed cake photography, arched/rounded card shapes, gold/muted-rose accent details.
- Site language: Spanish (`lang="es"`). User explicitly requested the full copy in Spanish with a premium, top-tier *pastelería* voice — all UI copy, toasts, alt text, and aria-labels are in Spanish; brand name "CAKÉ" and the proper-noun flavor "Red Velvet" are kept as-is.

## Evidence on Hand

None — no real testimonials, pricing data, or customer evidence exists. Testimonial quotes, names, and prices used on the site are illustrative placeholder content clearly in service of a fictional demo brand, not fabricated claims about a real business.

## Product Principles

1. Photography-led storytelling: large, confidently cropped product photography carries the emotional weight; typography and layout support it, never compete with it.
2. Warm/dark contrast as rhythm: alternate ivory and espresso-dark sections to create pacing and drama down the scroll, mirroring the reference.
3. Editorial restraint: generous whitespace, intentional line breaks, controlled type scale — avoid generic SaaS/card-grid patterns.
4. Motion with a point: every animation reveals, guides, or confirms; no decorative motion for its own sake, and everything degrades cleanly under reduced motion.
5. Honest interactivity: demo interactions (add to cart, mood selection) behave fully and give real feedback, without pretending to be a real commerce backend.

## Accessibility & Inclusion

No specific standard was mandated; build to solid baseline practice (semantic structure, sufficient contrast especially in dark sections, keyboard-operable nav/menu/selectors, `prefers-reduced-motion` support) since none was explicitly requested beyond the brief's general accessibility/performance note.
