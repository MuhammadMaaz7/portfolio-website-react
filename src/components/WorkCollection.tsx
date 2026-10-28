import { useState } from "react";
import projects from "../projects.json";
const featured = ["clarimo", "jarvis", "golocal", "verification"];
const summaries: Record<string, string> = {
  clarimo: "Researching the next good idea.",
  jarvis: "Useful things, just by asking.",
  golocal: "A little help exploring Pakistan.",
  verification: "Taking the repetition out of website checks.",
  scai: "Making sense of field reports.",
  jadeed: "Putting an AI product in people’s hands.",
  handbook: "Finding the answer in the handbook.",
  "word-ladder": "One letter closer to the solution.",
  complaints: "A clearer route from issue to resolution.",
};
const labels = ["Selected", "AI & automation", "Full-stack", "Everything"];
export function WorkCollection({
  onSelect,
}: {
  onSelect?: (slug: string) => void;
}) {
  const [filter, setFilter] = useState("Selected");
  const visible =
    filter === "Selected"
      ? featured.map((slug) => projects.find((p) => p.slug === slug)!)
      : projects.filter(
          (p) =>
            filter === "Everything" ||
            (filter === "AI & automation"
              ? p.category === "AI systems" || p.slug === "scai"
              : ["clarimo", "jadeed", "golocal", "complaints"].includes(
                  p.slug,
                )),
        );
  return (
    <section className="project-drawer" id="work">
      <div className="drawer-heading">
        <span className="paper-tab">The project drawer</span>
        <h2 tabIndex={-1} data-view-title>
          Made, learned,
          <br />
          figured out<span className="coral-dot">.</span>
        </h2>
        <p>
          A few projects from different chapters.
          <br />
          Pick a folder. I’ll show you my part.
        </p>
      </div>
      <div className="work-filters drawer-filters" aria-label="Filter projects">
        {labels.map((label) => (
          <button
            key={label}
            aria-pressed={filter === label}
            onClick={() => setFilter(label)}
          >
            {label}
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">
        Showing {visible.length} projects
      </p>
      <div className="folder-board" key={filter}>
        {visible.map((p, i) => (
          <article
            className={`project-folder folder-tone-${i % 3}`}
            data-project={p.slug}
            key={p.slug}
          >
            <a
              href={`/work/${p.slug}/`}
              aria-label={`Open ${p.name} project note`}
              onClick={(event) => {
                if (onSelect) {
                  event.preventDefault();
                  onSelect(p.slug);
                }
              }}
            >
              <span className="folder-tab">{p.category}</span>
              <div className="folder-paper">
                <span className="folder-number">
                  No. {String(i + 1).padStart(2, "0")}
                </span>
                <h3>{p.name}</h3>
                <p>{summaries[p.slug]}</p>
                <span className="folder-stack">
                  {p.stack.slice(0, 3).join(" / ")}
                </span>
                <span className="folder-open">
                  Open project note <span aria-hidden="true">↗</span>
                </span>
              </div>
            </a>
          </article>
        ))}
      </div>
      <a className="drawer-github" href="https://github.com/MuhammadMaaz7">
        <span>More code and works in progress live over here.</span>
        <strong>My GitHub ↗</strong>
      </a>
    </section>
  );
}
