# Maaz's workshop prototype

## Purpose

The owner requested a personal, playful portfolio with clearer navigation. The previous design gave a single professional project too much prominence. This prototype introduces Maaz first and uses his wider body of work as the story.

## Visitor journey

1. Understand who Maaz is and what he builds.
2. Explore four varied projects, or filter the wider collection.
3. Browse career chapters, including current work and earlier internships.
4. Learn about the person and make contact.

The desktop scene is an optional navigation layer. A computer opens Work, the notebook opens Experience, the plant opens About, and the letter opens Contact. Equivalent native buttons remain visible and keyboard accessible. The character greets on first visible arrival when motion is enabled and waves on request; the lamp changes the scene lighting. The illustration is fictional set dressing, not a representation of Maaz's real desk or appearance.

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

The default collection includes Clarimo, Jarvis, GoLocal and Website Verification. SCAI and Jadeed remain available through filters alongside the other work. Professional roles preserve the owner-confirmed current/completed status; unverified end dates are not invented.

## Delivery and verification

This design was developed on a preview branch in the existing GitHub repository and Vercel project. The owner subsequently authorized publishing it to the existing production domain. GitHub Actions and Vercel both build and run content checks.

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

## Interaction and career correction

The owner confirmed their LinkedIn URL as https://www.linkedin.com/in/muhammad-maaz-uddin-2m8h/. The OCLITS Systems LinkedIn company page links to that same profile, and establishes the company spelling. Public LinkedIn extraction does not expose full role details, so do not claim full profile verification. The owner explicitly requested Vector as current and the OCLITS engineering role as completed. Keep the previously supplied start months but do not invent an OCLITS end month. The 2024 Frappe internship uses OCLITS Systems and its actual company name as the chapter label, without repeating “internship” in both title and subtitle. SCAI remains described as a field assistant for Osmani, the project context; employer attribution is OCLITS Systems.

The numbered shortcut rules are replaced by custom illustrated object controls. Hover and keyboard focus lift the corresponding 3D object; selection adds a short camera response before opening a view, with immediate navigation in reduced motion and non-WebGL fallback. A guided tour introduces four objects without forcing navigation. The greeting runs once on visible arrival and does not loop. Navigation timers cancel when leaving the hero or unmounting. Label textures preserve their plane aspect ratio, use higher resolution and shorter/larger text, and the envelope label no longer intersects its tilted backing. The scene remains demand-rendered; camera and object motion stop when settled. Folders expose a second paper layer and truthful scope labels, with matching dialog and drawer motion. Browser interaction and visual QA are still pending the existing usage-limit block.

## Lighting and release review

Evening mode is a site-wide preference: the scene, drawer, notebook, dialogs, contact letter and supporting routes use one setting. A global native select offers Device setting / Daylight / Evening; the lamp switches the resolved theme. Explicit choices persist, default follows prefers-color-scheme, and cross-tab changes synchronize. A small public script applies theme, browser color scheme and reduced motion before paint. Storage failure keeps the site usable. No time-of-day scheduling is used.

Shared reading-surface colors are contrast-tested at 4.5:1 or better for primary and secondary text. This is token-level verification, not a claim of a complete WCAG audit. The mobile menu breakpoint accommodates the lighting control. Motion cannot contradict the device's reduced-motion preference; duplicate generic JavaScript reveal animations were removed. Legacy project pages retain their factual content without unrelated illustrative previews; dead illustration code is removed. Canonical URLs default to the actual portfolio domain.

Release validation includes TypeScript, formatting, production build and 13 automated checks, including first-paint preference behavior with unavailable storage, device/manual theme precedence, reduced-motion precedence, shared-surface contrast and SSR controls on every route. Browser visual/interaction QA remains blocked by the previously reported automatic-review usage limit; the owner authorized deployment with that existing limitation disclosed. The release uses the same repository, existing Vercel project and domain through Git integration.


The owner requested removing the duplicate lighting dropdown. The existing lamp remains the single visible lighting switch and controls the whole site. Device preference still supplies the initial mode, and explicit lamp choices persist.

## Mobile-first viewport and character guide — 29 October 2026

The default home composition is now designed for phones: a compact introduction, the workshop as the main visual, touch-sized navigation, a character speech panel and a compact footer. Viewport height uses svh so browser chrome does not cover controls. Larger layouts progressively introduce the roomier two-column introduction. Short, narrow or zoomed displays may scroll rather than losing content; the body is never scroll-locked. Content views retain ordinary reading scroll. Footer motion settings no longer float over touch targets.

Tapping a 3D object introduces it through the character and a clearly labelled open action instead of immediately navigating. The tour is user-paced, with Next / Finish controls. The character turns its body and head and points toward the actual object; it uses the left arm for the plant and the right for the other objects. Scene objects remain stationary. Greeting, pointing and return-to-rest are finite demand-rendered animations. Reduced motion applies poses immediately. The same guidance exists in HTML when WebGL is unavailable, and normal native controls remain available.

Additional automated checks cover guide-direction math, arm selection and neutral restoration. These checks do not establish that phone layouts or gestures have been visually verified: the prior browser access usage-limit restriction remains unresolved. Manual browser/device checks still need to include 320/360/390 px widths, short landscape, browser chrome, text zoom, tapping objects, tour exit, WebGL failure and reduced motion.

## Character travel

Tapping an object or advancing the tour now sets a visit destination in addition to the pointing target. The character follows bounded predefined desk routes with foot rocking, opposite arm swings and a small body bob, then points from its arrival position. Finishing the tour returns it to its starting spot; choosing another stop mid-walk replans from the current position. Shortest-angle turning avoids full spins. The route across the keyboard area includes a raised step. These are authored toy-character paths, not a physics or collision simulation.

Hover alone does not move the character. Reduced-motion mode keeps it at its original position with immediate guidance poses. Leaving the home view resets the route and stops character frames. Demand rendering stops after movement and posing settle. Route tests verify bounded steps, exact arrival, return trips and continuity when interrupted; there are now 18 automated checks. Browser visual testing of the walking animation is still pending the existing access-limit block.
