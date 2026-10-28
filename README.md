# Muhammad Maaz portfolio

React, TypeScript and Vite portfolio with pre-rendered project studies, locally hosted IBM Plex Sans, native scroll animation, and reduced-motion controls.

## Development

- `npm ci`
- `npm run dev`
- `npm run build`
- `npm test` (after building)

## Content

Project studies live in `src/projects.json`. Homepage content is in `src/Home.tsx`. The wider collection uses a native disclosure and category filters.

## Deployment

The existing Vercel project is `portfolio-website-react`. Production domain: https://muhammadmaaz7.vercel.app. Vercel builds the production branch through its existing GitHub integration, using `npm run build` and `dist`.

The build uses `SITE_URL` when provided, the existing portfolio domain on Vercel, and the private review Site origin otherwise. Generated output includes static HTML, sitemap, robots.txt, privacy and 404 pages.

`docs/design-rationale.md` records the design decisions. No analytics or third-party animation library is included.
