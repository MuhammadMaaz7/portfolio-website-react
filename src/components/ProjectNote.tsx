import { useEffect, useRef } from "react";
import projects from "../projects.json";
type Props = { slug: string | null; onClose: () => void };
export function ProjectNote({ slug, onClose }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const project = projects.find((p) => p.slug === slug);
  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (project && !el.open) el.showModal();
    if (!project && el.open) el.close();
  }, [project]);
  return (
    <dialog
      ref={dialog}
      className="project-note"
      aria-labelledby="project-note-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      {project && (
        <div className="project-note-paper">
          <div className="note-chrome">
            <span>From my project drawer</span>
            <button onClick={onClose} aria-label="Close project note">
              Close ×
            </button>
          </div>
          <div className="note-heading">
            <span className="project-context">{project.context}</span>
            <h2 id="project-note-title">
              {project.name}
              <span className="coral-dot">.</span>
            </h2>
            <p>{project.summary}</p>
          </div>
          <div className="note-ownership">
            <span>My part</span>
            <strong>{project.role}</strong>
          </div>
          <div className="note-story">
            <h3>What I worked on</h3>
            <p>{project.contribution}</p>
            <details>
              <summary>
                The decisions behind it <span aria-hidden="true">+</span>
              </summary>
              <ul>
                {project.decisions.map((decision) => (
                  <li key={decision}>{decision}</li>
                ))}
              </ul>
            </details>
            <h3>Where it landed</h3>
            <p>{project.outcome}</p>
          </div>
          <div className="note-stack">
            <span>Built with</span>
            <p>{project.stack.join(" / ")}</p>
          </div>
          <div className="note-links">
            {project.github ? (
              <a className="button button-ink" href={project.github}>
                View the source ↗
              </a>
            ) : (
              <span className="private-source">
                Professional work · private source
              </span>
            )}
            <button className="plain-button" onClick={onClose}>
              Back to the drawer
            </button>
          </div>
          <p className="project-disclosure">{project.note}</p>
        </div>
      )}
    </dialog>
  );
}
