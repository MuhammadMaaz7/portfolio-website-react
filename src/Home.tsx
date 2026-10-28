import { useEffect, useState } from "react";
import { Header, Footer } from "./components/SiteChrome";
import { DeskExperience } from "./components/DeskExperience";
import { WorkCollection } from "./components/WorkCollection";
import { Experience } from "./components/Experience";
import { ProjectNote } from "./components/ProjectNote";
import {
  portfolioHash,
  readPortfolioHash,
  type PortfolioLocation,
  type Section,
} from "./navigation";
export function Home() {
  const [location, setLocation] = useState<PortfolioLocation>({
    section: "home",
    project: null,
  });
  const [enhanced, setEnhanced] = useState(false);
  useEffect(() => {
    const sync = () => setLocation(readPortfolioHash(window.location.hash));
    sync();
    setEnhanced(true);
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);
    return () => {
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("popstate", sync);
    };
  }, []);
  function navigate(
    section: Section,
    project: string | null = null,
    replace = false,
  ) {
    window.history[replace ? "replaceState" : "pushState"](
      null,
      "",
      portfolioHash(section, project),
    );
    setLocation({ section, project });
    if (!project) {
      window.scrollTo({ top: 0, behavior: "instant" });
      requestAnimationFrame(() =>
        document
          .querySelector<HTMLElement>(
            `[data-view="${section}"] [data-view-title]`,
          )
          ?.focus({ preventScroll: true }),
      );
    }
  }
  const hidden = (section: Section) => enhanced && location.section !== section;
  const [copyStatus, setCopyStatus] = useState("");
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText("maazawan100@gmail.com");
      setCopyStatus("Copied. See you in the inbox!");
    } catch {
      setCopyStatus("You can select and copy the address above.");
    }
  }
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Header home current={location.section} onNavigate={navigate} />
      <main id="main">
        {enhanced && location.section !== "home" && (
          <div className="workspace-bar shell">
            <button onClick={() => navigate("home")}>← Back to my desk</button>
            <span>
              Maaz’s workshop /{" "}
              {location.section === "experience" ? "Journey" : location.section}
            </span>
          </div>
        )}
        <div data-view="home" hidden={hidden("home")}>
          <section className="welcome-section shell">
            <div className="welcome-copy">
              <p className="welcome-eyebrow">
                <span aria-hidden="true" />
                SOFTWARE ENGINEER · ISLAMABAD, PK
              </p>
              <h1 tabIndex={-1} data-view-title>
                Hi, I’m
                <br />
                <span className="name-word">
                  Maaz<span className="coral-dot">.</span>
                  <svg viewBox="0 0 260 25" aria-hidden="true">
                    <path d="M5 13q115-15 245 0M15 21q112-13 222-4" />
                  </svg>
                </span>
              </h1>
              <p className="welcome-intro">
                I build full-stack products
                <br className="desktop-break" /> and AI-powered tools.
              </p>
              <p className="welcome-note">
                Welcome to my little corner of the internet.
                <br />
                Have a look around. There’s a bit of me in here.
              </p>
              <div className="welcome-actions">
                <a
                  className="button button-ink"
                  href="#work"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("work");
                  }}
                >
                  Explore my work <span aria-hidden="true">↗</span>
                </a>
                <a
                  className="plain-link"
                  href="#about"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("about");
                  }}
                >
                  Meet the human
                </a>
              </div>
              <div className="welcome-caption">
                <span className="caption-rule" />
                <span>Curious by default. Engineer by training.</span>
              </div>
            </div>
            <DeskExperience
              onNavigate={navigate}
              visible={location.section === "home"}
            />
          </section>
        </div>
        <div
          className="workspace-view shell"
          data-view="work"
          hidden={hidden("work")}
        >
          <WorkCollection onSelect={(slug) => navigate("work", slug)} />
        </div>
        <div
          className="workspace-view shell"
          data-view="experience"
          hidden={hidden("experience")}
        >
          <Experience />
        </div>
        <div
          className="workspace-view shell"
          data-view="about"
          hidden={hidden("about")}
        >
          <section className="about-section" id="about">
            <aside className="profile-slip">
              <span className="paper-tab">The human</span>
              <h3>
                Muhammad
                <br />
                Maaz Uddin<span className="coral-dot">.</span>
              </h3>
              <dl>
                <div>
                  <dt>Based in</dt>
                  <dd>Islamabad, Pakistan</dd>
                </div>
                <div>
                  <dt>Studied at</dt>
                  <dd>FAST NUCES · 2022–2026</dd>
                </div>
                <div>
                  <dt>Degree</dt>
                  <dd>BS Software Engineering</dd>
                </div>
              </dl>
              <span className="profile-signature">Maaz.</span>
            </aside>
            <div className="about-copy">
              <span className="section-kicker">03 / A LITTLE ABOUT ME</span>
              <h2 tabIndex={-1} data-view-title>
                A person first.
                <br />
                An engineer, too.
              </h2>
              <p className="about-lede">
                I’m Muhammad Maaz Uddin, a software engineering graduate from
                FAST NUCES.
              </p>
              <p>
                I’ve worked across frontend interfaces, backend services,
                databases, and AI automation. I like understanding how the
                pieces fit, then getting them to work together.
              </p>
              <p>
                Right now, I’m growing deeper into AI systems and system design,
                while keeping an eye on the person who has to use what I build.
              </p>
              <div className="about-tools">
                <span>MY USUAL TOOLS</span>
                <p>
                  React / Next.js / Python / Node.js
                  <br />
                  PostgreSQL / LangGraph / n8n / Docker
                </p>
              </div>
              <a
                className="plain-link"
                href="https://www.linkedin.com/in/muhammad-maaz-uddin-2m8h/"
              >
                The longer story on LinkedIn ↗
              </a>
            </div>
          </section>
        </div>
        <div
          className="workspace-view shell"
          data-view="contact"
          hidden={hidden("contact")}
        >
          <section className="contact-section" id="contact">
            <div className="contact-layout">
              <div>
                <span className="section-kicker">04 / YOUR TURN</span>
                <h2 tabIndex={-1} data-view-title>
                  Got something
                  <br />
                  in mind<span className="contact-question">?</span>
                </h2>
                <p>
                  A project, a question, or just a hello.
                  <br />
                  My inbox is a good place to start.
                </p>
              </div>
              <div className="contact-note">
                <span className="letter-fold" aria-hidden="true" />
                <span className="contact-note-top">TO: MAAZ</span>
                <a
                  className="contact-address"
                  href="mailto:maazawan100@gmail.com"
                >
                  Let’s talk.<span aria-hidden="true">↗</span>
                </a>
                <span className="email-address">maazawan100@gmail.com</span>
                <button onClick={copyEmail} className="copy-email">
                  Copy email address
                </button>
                <p className="copy-status" aria-live="polite" role="status">
                  {copyStatus}
                </p>
              </div>
            </div>
          </section>
        </div>
        <ProjectNote
          slug={location.project}
          onClose={() => navigate("work", null, true)}
        />
      </main>
      <Footer />
    </>
  );
}
