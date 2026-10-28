import { useState } from "react";
const chapters = [
  {
    company: "VECTOR Inc.",
    short: "VECTOR Inc.",
    date: "November 2026 — present",
    title: "Full Stack Software Engineer",
    status: "Current",
    story: "My current chapter: full-stack software engineering at VECTOR Inc.",
    focus: ["Full-stack engineering", "New role"],
  },
  {
    company: "OCLITS Systems",
    short: "OCLITS Systems",
    date: "Started June 2026 · completed role",
    title: "AI Automation Engineer",
    status: "Completed",
    story:
      "Worked across AI automation, data, APIs and interfaces. My work included SCAI, a field-supervision assistant that brings reports, retrieval and conversational workflows together.",
    focus: [
      "AI agents & automation",
      "PostgreSQL & retrieval",
      "APIs & product UI",
    ],
  },
  {
    company: "Jadeed",
    short: "Jadeed",
    date: "Started November 2025 · completed role",
    title: "Full-stack Developer",
    status: "Completed",
    story:
      "Proposed and built a dedicated Next.js frontend. I worked on authentication, project workflows, AI chat, code editing and Django API integrations, and resolved production timeout issues.",
    focus: [
      "Next.js frontend ownership",
      "Django REST integrations",
      "AI product workflows",
    ],
  },
  {
    company: "MazikGlobal",
    short: "MazikGlobal",
    date: "Joined November 2025",
    title: "Intern · MBS division",
    status: "Internship",
    story:
      "An internship chapter with the MBS division, joining the team in November 2025.",
    focus: ["MBS division", "Team experience"],
  },
  {
    company: "Oil and Gas Development Company Limited",
    short: "OGDCL",
    date: "June — July 2025",
    title: "Software Engineering Intern",
    status: "Internship",
    story:
      "Translated business requirements into a PostgreSQL schema, implemented Microsoft Entra ID authentication, and built interfaces and REST APIs for an internal case-management system.",
    focus: ["PostgreSQL", "Microsoft Entra ID", "Case-management UI & APIs"],
  },
  {
    company: "Freelance",
    short: "Freelance",
    date: "December 2024 — March 2025",
    title: "Part-time Frontend Developer",
    status: "Completed",
    story:
      "Built responsive React interfaces and connected them to Django APIs, working through the details between the frontend and backend.",
    focus: ["React", "Django APIs", "Frontend delivery"],
  },
  {
    company: "OCLITS Systems",
    short: "OCLITS Systems",
    date: "June — August 2024",
    title: "Frappe Developer Intern",
    status: "Internship",
    story:
      "Learned ERPNext and Frappe, then built a complaint-management module with forms, workflows, reports and notifications.",
    focus: ["ERPNext / Frappe", "Workflow design", "Internal tools"],
  },
];
export function Experience() {
  const [selected, setSelected] = useState(-1);
  const chapter = chapters[selected];
  return (
    <section id="experience" className="journey-notebook">
      <div className="drawer-heading">
        <span className="paper-tab">The journey notebook</span>
        <h2 tabIndex={-1} data-view-title>
          A few chapters
          <br />
          along the way<span className="coral-dot">.</span>
        </h2>
        <p>
          Different teams. New questions.
          <br />
          Something to take from every chapter.
        </p>
      </div>
      <noscript>
        <div className="career-print">
          {chapters.map((c) => (
            <article key={c.company + c.date}>
              <h3>{c.company}</h3>
              <p>
                {c.title} · {c.status} · {c.date}
              </p>
              <p>{c.story}</p>
            </article>
          ))}
        </div>
      </noscript>
      <div className="career-book">
        <nav className="career-chapters" aria-label="Career chapters">
          <span>In this notebook</span>
          <button
            aria-pressed={selected === -1}
            onClick={() => setSelected(-1)}
          >
            The story so far <small>Start here</small>
          </button>
          {chapters.map((c, i) => (
            <button
              key={`${c.short}-${c.date}`}
              aria-pressed={selected === i}
              onClick={() => setSelected(i)}
            >
              {c.short}
              <small>{c.status === "Internship" ? c.date : c.status}</small>
            </button>
          ))}
        </nav>
        <div className="career-page" key={selected}>
          {chapter ? (
            <>
              <div className="career-page-top">
                <span>Chapter {String(selected + 1).padStart(2, "0")}</span>
                <span
                  className={`career-stamp stamp-${chapter.status.toLowerCase()}`}
                >
                  {chapter.status}
                </span>
              </div>
              <p className="career-date">{chapter.date}</p>
              <h3>{chapter.company}</h3>
              <h4>{chapter.title}</h4>
              <p className="career-story">{chapter.story}</p>
              <div className="career-focus">
                <span>Part of this chapter</span>
                <ul>
                  {chapter.focus.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <>
              <div className="career-page-top">
                <span>The story so far</span>
                <span className="career-stamp">Still learning</span>
              </div>
              <h3>
                Learning by
                <br />
                getting involved.
              </h3>
              <p className="career-story">
                I studied software engineering at FAST NUCES in Islamabad.
                Alongside it, I took on internships, freelance work and team
                projects.
              </p>
              <p className="career-story">
                That grew into work across full-stack products and AI
                automation. Each chapter has added another piece to how I think
                about building software.
              </p>
              <div className="career-milestones">
                <div>
                  <strong>2024</strong>
                  <span>First internship</span>
                </div>
                <div>
                  <strong>2026</strong>
                  <span>BS Software Engineering</span>
                </div>
                <div>
                  <strong>Now</strong>
                  <span>VECTOR Inc. · Full-stack engineering</span>
                </div>
              </div>
            </>
          )}
          <div className="career-pagination">
            <button
              onClick={() =>
                setSelected((i) => (i <= -1 ? chapters.length - 1 : i - 1))
              }
            >
              ← Previous chapter
            </button>
            <span>
              {selected + 2} / {chapters.length + 1}
            </span>
            <button
              onClick={() =>
                setSelected((i) => (i === chapters.length - 1 ? -1 : i + 1))
              }
            >
              Next chapter →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
