# Fairmark — IT Spend Advisory Preset

A sharp, data-led homepage for a **fictional** IT contract negotiation and technology spend firm. Aubergine ink, light grey panels and one violet signal colour; Schibsted Grotesk + JetBrains Mono. No photography: the charts, client wordmarks and app screen are all drawn in code.

Next.js 16 (static export) · GSAP 3 + ScrollTrigger · Lenis · Canvas 2D · CSS Modules. No UI libraries.

```bash
npm install
npm run dev
npm run build     # static site in ./out
```

## Sections

| Section | What it does |
|---|---|
| Hero | Three-line headline with a highlighted line over an animated dot-field canvas, a "deal snapshot" panel comparing typical spend with market value, and proof figures. |
| Clients | Marquee of client wordmarks set in type (no logo files). |
| Problem | Overpay chart on a percentage axis, and a "your team vs. us" comparison. |
| Process | Find / Get / Keep: the heading steps through each word as its card scrolls past, with a progress counter. |
| Programs | Pick your situation and the matching program card appears, with its three tiers. |
| Difference | Four numbered pillars with icons. |
| AI app | A phone drawn in HTML and CSS (topic chips, question field) with prompts floating around it. |
| Results | Six count-up figures in a grid. |
| Testimonials | Company list on the left drives a quote carousel on the right. |
| Estimate | Slider for annual contract value, with live premium and savings figures. Demo maths only. |
| Call to action and footer | Deal desk prompt, contact details, newsletter link. |

## Re-skin

- **Copy & data**: `content/site.json` (brand, navigation, contact, footer) and `content/home.json` (every section). Client wordmarks are `clients.logos[]`, each with a `style` of `heavy`, `serif`, `caps`, `mono` or `light`. The estimator rates are `estimate.premiumRate` and `estimate.savingsRate`.
- **Logo**: `components/Logo.js` (equals-sign mark and wordmark; `tone` switches it for dark backgrounds) and `app/icon.svg`.
- **Colour**: tokens at the top of `app/globals.css` (`--navy*`, `--blue`, `--blue-300`, `--blue-text`, `--steel`, `--gray-*`, `--ink`). The token names are kept from the base design; their values are the Fairmark palette.
- **Type**: `app/layout.js`.

## Accessibility & motion

`prefers-reduced-motion` stops the canvas, marquee, scroll-driven heading and count-ups. The program picker, carousel and slider all work from the keyboard.

## Demo content

Fairmark, its clients, quotes, programs, figures and address are fictional. The email uses the reserved `.example` domain and the phone number is a placeholder. A real firm must replace them before launch.
