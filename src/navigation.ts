export type Section = "home" | "work" | "experience" | "about" | "contact";
export type PortfolioLocation = { section: Section; project: string | null };
const sections = new Set<Section>([
  "home",
  "work",
  "experience",
  "about",
  "contact",
]);
export function readPortfolioHash(hash: string): PortfolioLocation {
  const [raw, slug] = hash.replace(/^#/, "").split("/");
  const section = sections.has(raw as Section) ? (raw as Section) : "home";
  return {
    section,
    project:
      section === "work" && slug && /^[a-z0-9-]+$/.test(slug) ? slug : null,
  };
}
export function portfolioHash(section: Section, project: string | null = null) {
  return `#${section}${section === "work" && project ? `/${project}` : ""}`;
}
