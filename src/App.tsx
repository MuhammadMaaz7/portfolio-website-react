import { ThemeProvider } from "./Theme";
import { Motion } from "./Motion";
import { Home } from "./Home";
import { Header, Footer } from "./components/SiteChrome";
import projects from "./projects.json";
export default function App({ path = "/" }: { path?: string }) {
  return (
    <ThemeProvider>
      <Portfolio path={path} />
    </ThemeProvider>
  );
}
function Portfolio({ path = "/" }: { path?: string }) {
  if (path === "/" || path === "/index.html")
    return (
      <>
        <Motion />
        <Home />
      </>
    );
  if (path === "/privacy/")
    return (
      <>
        <Motion />
        <Header />
        <main id="main" className="shell prose-page">
          <span className="section-kicker">A LITTLE HOUSEKEEPING</span>
          <h1>Privacy, plainly.</h1>
          <p>
            This portfolio has no advertising, contact form, or analytics
            scripts added by me.
          </p>
          <p>
            Your lighting and motion preferences are stored in your browser.
            Copy email writes my email address to your clipboard only when you
            choose that button. The workshop uses a locally rendered 3D scene
            and locally hosted fonts; it does not request your microphone or
            camera.
          </p>
          <p>
            Email and external project links open other services, whose privacy
            policies apply. The hosting provider may process technical request
            information to deliver and secure the site.
          </p>
          <p>
            Questions:{" "}
            <a href="mailto:maazawan100@gmail.com">maazawan100@gmail.com</a>
          </p>
        </main>
        <Footer />
      </>
    );
  const slug = path.replace(/\/+$/, "").split("/")[2];
  const project = projects.find((p) => p.slug === slug);
  if (!project)
    return (
      <>
        <Header />
        <main id="main" className="shell prose-page not-found">
          <span className="section-kicker">A WRONG TURN, MAYBE?</span>
          <h1>
            Nothing here.
            <br />
            Plenty to explore.
          </h1>
          <a className="button button-ink" href="/">
            Back to Maaz’s place ↗
          </a>
        </main>
        <Footer />
      </>
    );
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  return (
    <>
      <Motion />
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <section className="case-hero shell">
          <a className="case-back" href="/#work">
            ← All projects
          </a>
          <div className="case-hero-grid">
            <div>
              <span className="section-kicker">
                {project.category.toUpperCase()} / PROJECT NOTES
              </span>
              <h1>
                {project.name}
                <span className="coral-dot">.</span>
              </h1>
              <p>{project.summary}</p>
              <div className="case-tags">
                {project.stack.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="case-meta">
            <div>
              <span>CONTEXT</span>
              <p>{project.context}</p>
            </div>
            <div>
              <span>MY CONTRIBUTION</span>
              <p>{project.role}</p>
            </div>
            {project.github && (
              <a className="plain-link" href={project.github}>
                Explore the code ↗
              </a>
            )}
          </div>
        </section>
        <div className="case-content shell">
          <nav className="case-contents" aria-label="On this project page">
            <span>IN THIS PROJECT</span>
            <a href="#problem">The problem</a>
            <a href="#contribution">My contribution</a>
            <a href="#decisions">The decisions</a>
            <a href="#result">The result</a>
          </nav>
          <article className="case-prose">
            <section id="problem" className="case-section">
              <span className="section-kicker">01</span>
              <h2>The problem.</h2>
              <p>{project.problem}</p>
            </section>
            <section id="contribution" className="case-section">
              <span className="section-kicker">02</span>
              <h2>My contribution.</h2>
              <p>{project.contribution}</p>
            </section>
            <section id="decisions" className="case-section">
              <span className="section-kicker">03</span>
              <h2>The decisions.</h2>
              <ol>
                {project.decisions.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ol>
            </section>
            <section id="result" className="case-section">
              <span className="section-kicker">04</span>
              <h2>The result.</h2>
              <p>{project.outcome}</p>
            </section>
            <aside className="project-context-note">
              <strong>A little context</strong>
              <p>{project.note}</p>
            </aside>
          </article>
        </div>
        <nav className="case-pagination shell" aria-label="Project navigation">
          <a href="/#work">← All projects</a>
          <a href={`/work/${next.slug}/`}>
            <span>UP NEXT</span>
            {next.name} ↗
          </a>
        </nav>
      </main>
      <Footer />
    </>
  );
}
