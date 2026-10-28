import { useState } from "react";
import { Header, Footer } from "./components/SiteChrome";
import { DeskExperience } from "./components/DeskExperience";
import { WorkCollection } from "./components/WorkCollection";
import { Experience } from "./components/Experience";
export function Home() {
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
      <Header home />
      <main id="main">
        <section className="welcome-section shell">
          <div className="welcome-copy">
            <p className="welcome-eyebrow">
              <span aria-hidden="true" />
              SOFTWARE ENGINEER · ISLAMABAD, PK
            </p>
            <h1>
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
              <a className="button button-ink" href="#work">
                Explore my work <span aria-hidden="true">↗</span>
              </a>
              <a className="plain-link" href="#about">
                Meet the human
              </a>
            </div>
            <div className="welcome-caption">
              <span className="caption-rule" />
              <span>Curious by default. Engineer by training.</span>
            </div>
          </div>
          <DeskExperience />
        </section>
        <div className="chapter-bar shell">
          <span>A LITTLE EXPLORING GOES A LONG WAY</span>
          <a href="#work">Start with the work ↓</a>
        </div>
        <WorkCollection />
        <Experience />
        <section className="about-section shell" id="about">
          <div className="about-art" aria-hidden="true">
            <div className="about-label">THE PERSON BEHIND THE PROJECTS</div>
            <div className="about-monogram">
              m<span>☺</span>
            </div>
            <div className="about-sticker">
              Made in
              <br />
              <strong>Islamabad.</strong>
            </div>
            <span className="about-art-footer">
              ALWAYS FIGURING SOMETHING OUT.
            </span>
          </div>
          <div className="about-copy">
            <span className="section-kicker">03 / A LITTLE ABOUT ME</span>
            <h2>
              A person first.
              <br />
              An engineer, too.
            </h2>
            <p className="about-lede">
              I’m Muhammad Maaz Uddin, a software engineering graduate from FAST
              NUCES.
            </p>
            <p>
              I’ve worked across frontend interfaces, backend services,
              databases, and AI automation. I like understanding how the pieces
              fit, then getting them to work together.
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
              href="https://linkedin.com/in/muhammad-maaz-uddin-512b4b26b/"
            >
              The longer story on LinkedIn ↗
            </a>
          </div>
        </section>
        <section className="contact-section" id="contact">
          <div className="shell contact-layout">
            <div>
              <span className="section-kicker">04 / YOUR TURN</span>
              <h2>
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
      </main>
      <Footer />
    </>
  );
}
