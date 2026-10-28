# Portfolio revision, 28 October 2026

The owner requested clearer reading, less copy, visible scroll motion and transitions, and avoidance of the visual conventions in their supplied reference.

## Decisions

- Lead with the concrete discipline: “AI systems. Built end to end.” The next sentence introduces Maaz, location and work. SCAI supplies evidence beside the statement.
- IBM Plex Sans, locally hosted; body copy 17–19px, stronger contrast, reduced tracking, no thin italic display type. Compact labels remain subordinate; no claim of formal accessibility conformance.
- Short featured summaries; About reduced to two paragraphs; secondary projects available through a native disclosure, with existing case-study pages retained.
- A SCAI workflow plays once, lasts 3.5 seconds, supports replay and individual steps. It illustrates the actual workflow described in the resume; it is not a live AI backend.
- Scroll reveals run once per element using IntersectionObserver and the Web Animations API. Transform and opacity are the primary animated properties. Native scrolling stays intact. Scroll progress uses one requestAnimationFrame callback, without React state updates per scroll event.
- Cross-document page transitions progressively enhance supported browsers. Other browsers navigate normally. No artificial network delay.
- Motion setting persists locally; system reduced-motion respected. Content remains in generated HTML and stays visible without JavaScript.
- Removed dotted background, decorative orbital graphic, paper shadows, rotated paper/window mockups, rounded arrow controls and hover movement. Visuals explain verified project pipelines instead of posing as actual product screenshots.
- No new third-party animation library, trackers, form processor, skeleton loading, or pricing content. Privacy page explains the implemented browser storage and clipboard behavior.

## Research

Research informs the decisions, not a guarantee of usability improvement for this particular audience. Existing NN/g studies are general web usability research rather than a test of this portfolio.

- Nielsen Norman Group, The Role of Animation and Motion in UX: https://www.nngroup.com/articles/animation-purpose-ux/
- Nielsen Norman Group, Executing UX Animations: Duration and Motion Characteristics: https://www.nngroup.com/articles/animation-duration/
- Nielsen Norman Group, Concise, Scannable, and Objective: https://www.nngroup.com/articles/concise-scannable-and-objective-how-to-write-for-the-web/
- web.dev, How to create high-performance CSS animations: https://web.dev/articles/animations-guide
- W3C, Animation from Interactions: https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions
- W3C, Text Spacing: https://www.w3.org/WAI/WCAG21/Understanding/text-spacing.html

## Remaining evidence opportunities

Real redacted screenshots or a recorded, approved product walkthrough would provide stronger evidence than diagrams for the professional projects. Do not fabricate client dashboards, metrics or testimonials. Jadeed and MazikGlobal end months remain unconfirmed and are not invented. The owner later instructed the portfolio to show Vector as current and OCLITS Systems as a completed role. These explicit status corrections supersede the earlier incoming label; OCLITS' end month remains unspecified.
