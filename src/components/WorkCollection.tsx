import { useState } from "react";
import projects from "../projects.json";
import { ProjectArt } from "./ProjectArt";
const featured = ["clarimo", "jarvis", "golocal", "verification"];
const summaries: Record<string, string> = {
  clarimo:
    "A research platform for turning early startup ideas into informed decisions.",
  jarvis: "A voice assistant that connects conversation with everyday tools.",
  golocal: "A tourism platform for discovering places and planning a visit.",
  verification:
    "An automation agent for checking websites and brand presence in batches.",
  scai: "A field-supervision assistant I’m building at Osmani & Company.",
  jadeed: "A Next.js product frontend I built for an AI-first SaaS platform.",
  handbook: "A handbook assistant that finds answers in the source material.",
  "word-ladder":
    "A playable puzzle built around three different search algorithms.",
  complaints: "An ERPNext module for internal complaint workflows.",
};
const labels = ["Selected", "AI & automation", "Full-stack", "Everything"];
export function WorkCollection() {
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
    <section className="work-section shell" id="work">
      <div className="section-title">
        <div>
          <span className="section-kicker">01 / THE WORK</span>
          <h2>
            A few things
            <br />
            I’ve built<span className="coral-dot">.</span>
          </h2>
        </div>
        <p>
          Some independent. Some with teams.
          <br />
          All a chance to figure something out.
        </p>
      </div>
      <div className="work-filters" aria-label="Filter projects">
        {labels.map((label) => (
          <button
            key={label}
            aria-pressed={filter === label}
            onClick={() => setFilter(label)}
          >
            {label}
            {filter === label && <span aria-hidden="true"> ·</span>}
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">
        Showing {visible.length} projects
      </p>
      <div className="work-grid" key={filter}>
        {visible.map((p) => (
          <article
            className={`work-card art-${p.slug}`}
            key={p.slug}
            data-project={p.slug}
          >
            <a
              className="work-art"
              href={`/work/${p.slug}/`}
              aria-label={`Explore ${p.name}`}
            >
              <ProjectArt kind={p.slug} />
              <span className="art-corner">View project ↗</span>
            </a>
            <div className="work-card-info">
              <div className="work-meta">
                <span>{p.context}</span>
                <span>{p.category}</span>
              </div>
              <h3>
                <a href={`/work/${p.slug}/`}>{p.name}</a>
              </h3>
              <p>{summaries[p.slug]}</p>
              <div className="work-card-bottom">
                <span>{p.stack.slice(0, 3).join(" · ")}</span>
                <a
                  href={`/work/${p.slug}/`}
                  aria-label={`Read about ${p.name}`}
                >
                  Explore ↗
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
      <a className="github-note" href="https://github.com/MuhammadMaaz7">
        <span>More experiments, code, and works in progress.</span>
        <span>Open GitHub ↗</span>
      </a>
    </section>
  );
}
