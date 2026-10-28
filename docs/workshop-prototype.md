# Maaz's workshop prototype

## Purpose

The owner requested a personal, playful portfolio with clearer navigation. The previous design gave a single professional project too much prominence. This prototype introduces Maaz first and uses his wider body of work as the story.

## Visitor journey

1. Understand who Maaz is and what he builds.
2. Explore four varied projects, or filter the wider collection.
3. Read the current/incoming roles and expand earlier internships.
4. Learn about the person and make contact.

The desktop scene is an optional navigation layer. A computer opens Work, the notebook opens Experience, the plant opens About, and the letter opens Contact. Equivalent native buttons remain visible and keyboard accessible. The character waves on request; the lamp changes the scene lighting. The illustration is fictional set dressing, not a representation of Maaz's real desk or appearance.

## Implementation

- Existing React 18 / Vite app; Fiber 8 paired with React 18, Three.js 0.170.
- Scene authored in code with primitive/rounded geometry, no purchased models, external textures or Spline runtime.
- Dynamic import separates the 3D renderer from the main content bundle.
- Scene loads on viewport proximity and renders on demand. Pixel ratio capped at 1.5. No always-running idle animation, orbiting camera, postprocessing, or scroll interception.
- Pre-rendered SVG desk remains visible while the scene loads and if rendering fails. HTML sections and project links never depend on WebGL.
- Three.js textures/geometries created with memoization and disposed on unmount.
- CSS and JavaScript motion preferences respect system settings and the site toggle; desktop character animation invalidates frames only while waving.
- SSR content, static routes, sitemap, metadata and privacy retained. No analytics or forms introduced.

## Design decisions

Bricolage Grotesque headings and Nunito Sans body text are hosted locally. Clay coral, muted blue, sage, warm paper and dark ink establish a small palette. Physical shading belongs to the 3D scene; content cards use flat borders rather than UI drop shadows. The main project drawer uses folders, not decorative illustrations pretending to be product previews. Legacy standalone project routes remain readable fallbacks.

The default collection includes Clarimo, Jarvis, GoLocal and Website Verification. SCAI and Jadeed remain available through filters alongside the other work. Professional roles preserve incoming/current/completed status; unverified end dates are not invented.

## Delivery and verification

This is a design-preview branch in the existing GitHub repository and Vercel project. Production remains on the previously verified version while the owner reviews this larger creative change. GitHub Actions and Vercel both build and run content checks.

Automated checks cover pre-rendered case-study content, internal links, balanced default selection, career status, non-WebGL alternatives and lazy-load bundle separation. Browser visual/interaction QA is pending: the browser approval review hit a usage limit. Do not describe the scene as visually verified until it is tested in a real browser, including narrow screens, WebGL failure, light switch, object navigation and reduced motion.

## Research used

- React Three Fiber installation / React compatibility: https://r3f.docs.pmnd.rs/getting-started/installation
- On-demand rendering and performance: https://r3f.docs.pmnd.rs/advanced/scaling-performance
- Homepage clarity and a clear starting point: https://www.nngroup.com/articles/homepage-design-principles/
- Spline React export: https://docs.spline.design/exporting-your-scene/web/exporting-as-code
- React Bits: https://reactbits.dev/

Spline was evaluated as an authoring option; code-authored geometry gives this prototype an editable, self-contained scene. React Bits was evaluated, but no stock visual effects were needed for this direction.

## Cohesion revision — 28 October 2026

Keep the hero but extend its workshop metaphor into project folders, a career notebook, a personal profile slip and a contact letter. The enhanced interface shows one area at a time. Explicit navigation, a return-to-desk control, URL hashes and browser history keep it understandable. Without JavaScript, sections and project routes remain available. Project notes open in a native dialog with Escape and focus restoration. Body text uses larger Nunito Sans; decorative divider rules and contrasting section bands are removed.

Research: Bruno Simon (https://bruno-simon.com/), Henry Heffernan’s own source (https://github.com/henryjeff/portfolio-website), Robby Leonardi (https://www.rleonardi.com/interactive-resume/) and Josh Comeau (https://www.joshwcomeau.com/). The takeaway is a consistent interaction language, not copying another person's game or computer interface. Vertical scrolling is still appropriate for reading within a view.

Vercel inventory: GoLocal, Word Ladder and Website Verification have production deployments marked READY. Their UI has not yet been visually checked. Clarimo's latest deployment is ERROR: npm cannot find package.json at the repository root; investigate project root settings before claiming a working demo. Do not manufacture screenshots. Product UI screenshots, real workflow diagrams and text-first notes may coexist using consistent framing; not every project requires an image. No changes have been made to these other apps.
