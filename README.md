# Muhammad Maaz portfolio

React, TypeScript and Vite portfolio with pre-rendered project studies, a lazy-loaded React Three Fiber workshop, locally hosted Bricolage Grotesque / IBM Plex Sans, and reduced-motion controls.

## Development

- `npm ci`
- `npm run dev`
- `npm run format:check`
- `npm run build`
- `npm test` (after building)

## Content

Project studies live in `src/projects.json`. Homepage content is in `src/Home.tsx`. The wider collection uses a native disclosure and category filters.

## Deployment

The existing Vercel project is `portfolio-website-react`. Production domain: https://muhammadmaaz7.vercel.app. Vercel builds the production branch through its existing GitHub integration, using `npm run build` and `dist`.

The build uses `SITE_URL` when provided, the existing portfolio domain on Vercel, and the private review Site origin otherwise. Generated output includes static HTML, sitemap, robots.txt, privacy and 404 pages.

`docs/design-rationale.md` records the design decisions. No analytics or third-party animation library is included.

## Workshop design preview

`docs/workshop-prototype.md` describes the current creative direction, scene behavior, accessibility alternatives, performance choices and verification limits. Scene geometry lives in `src/components/WorkshopScene.tsx`; the HTML experience and fallback live in `DeskExperience.tsx`.
