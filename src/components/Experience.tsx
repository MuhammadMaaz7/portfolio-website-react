const roles = [
  {
    date: "NOV 2026",
    company: "Vector Inc. / VECTOR AI",
    title: "Full Stack Software Engineer",
    description: "Joining 1 November. A new chapter in product engineering.",
    status: "Incoming",
  },
  {
    date: "JUN 2026 — NOW",
    company: "Osmani & Company",
    title: "AI Automation Engineer",
    description:
      "Building AI workflows, APIs, data systems, and interfaces. SCAI is one part of that work.",
    status: "Current",
  },
  {
    date: "STARTED NOV 2025",
    company: "Jadeed",
    title: "Full-stack Developer",
    description:
      "Owned the Next.js frontend, integrated AI workflows, and connected the product to Django APIs.",
    status: "Completed",
  },
];
export function Experience() {
  return (
    <section className="journey-section" id="experience">
      <div className="shell journey-layout">
        <div className="journey-heading">
          <span className="section-kicker">02 / MY JOURNEY</span>
          <h2>
            Learning by
            <br />
            building.
          </h2>
          <p>
            Different teams, different problems.
            <br />A little more perspective each time.
          </p>
          <div className="journey-stamp" aria-hidden="true">
            <span>FAST NUCES</span>
            <strong>SE ’26</strong>
            <span>ISLAMABAD</span>
          </div>
        </div>
        <div className="journey-list">
          {roles.map((r, i) => (
            <article className="role-row" key={r.company}>
              <div className="role-index">0{i + 1}</div>
              <div>
                <div className="role-top">
                  <span>{r.date}</span>
                  <span
                    className={`role-status status-${r.status.toLowerCase()}`}
                  >
                    {r.status}
                  </span>
                </div>
                <h3>{r.company}</h3>
                <h4>{r.title}</h4>
                <p>{r.description}</p>
              </div>
            </article>
          ))}
          <details className="early-career">
            <summary>
              Earlier chapters <span aria-hidden="true">+</span>
            </summary>
            <div className="early-list">
              <article>
                <span>NOV 2025</span>
                <h3>MazikGlobal</h3>
                <p>Intern, MBS division</p>
              </article>
              <article>
                <span>JUN — JUL 2025</span>
                <h3>OGDCL</h3>
                <p>
                  Software Engineering Intern. PostgreSQL, Microsoft Entra ID,
                  case-management interfaces and APIs.
                </p>
              </article>
              <article>
                <span>DEC 2024 — MAR 2025</span>
                <h3>Freelance</h3>
                <p>
                  Part-time frontend development with React and Django APIs.
                </p>
              </article>
              <article>
                <span>JUN — AUG 2024</span>
                <h3>Osmani & Company</h3>
                <p>
                  Software Engineering Intern. ERPNext and Frappe
                  complaint-management workflows.
                </p>
              </article>
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
