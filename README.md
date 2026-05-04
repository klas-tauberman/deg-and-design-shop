# Deg & Design Shop

Webshop for Deg & Design — a micro-bakery in Malmö baking sourdough to order.

## Tech stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 (CSS-first config via `@theme`)
- **Design system:** Figma → CSS custom properties → Tailwind utilities
- **Deployment:** Vercel

## Design system

Tokens live in `src/styles/tokens.css` and are imported into `globals.css` via `@theme inline {}`.
All colors, spacing, and radii trace back to the Figma file *degochdesign*.

Dark mode is the primary/default experience. Set `data-theme="light"` on `<html>` to activate light mode.

## Components

All UI components are in `src/components/ui/`:

| Component | File | Description |
|---|---|---|
| Button | `Button.tsx` | Primary / Secondary / Ghost · sm, md, lg · loading state |
| Input | `Input.tsx` | Default / Error / Disabled · pill-shaped |
| Badge | `Badge.tsx` | Default / Brand / Success / Warning / Error |
| ProductCard | `Card.tsx` | Image + title + price + actions |
| ContentCard | `Card.tsx` | Image + title + body text |
| Navbar | `Navbar.tsx` | Desktop + mobile (hamburger overlay) |
| Footer | `Footer.tsx` | Contact links + copyright |
| Hero | `Hero.tsx` | Full-width with background image + integrated nav |

## Dev

```bash
npm run dev
# Visit http://localhost:3000/kitchen-sink for the component QA page
```

## Build & lint

```bash
npm run build
npm run lint
```

## Phases

- **Phase 1** — Figma design system (variables, text styles, components) ✅
- **Phase 2** — Next.js component library + design tokens ✅ *(current)*
- **Phase 3** — Domain, product data, Supabase, Stripe, go live
