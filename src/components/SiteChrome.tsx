import { useState, type MouseEvent } from "react";
import { Motion } from "../Motion";
import type { Section } from "../navigation";
export function MaazMark() {
  return (
    <svg viewBox="0 0 48 48" width="43" height="43" aria-hidden="true">
      <path
        d="M5 27c0-15 5-21 18-21 15 0 21 7 20 22-1 11-7 16-20 15C10 43 5 38 5 27Z"
        fill="#e7a18c"
      />
      <path
        d="M13 29V18c5-2 8 3 8 8v3m0-5c0-7 9-9 10-1v6"
        fill="none"
        stroke="#263139"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="M16 35q7 5 14-1"
        fill="none"
        stroke="#263139"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
export function Header({
  home = false,
  current = "home",
  onNavigate,
}: {
  home?: boolean;
  current?: Section;
  onNavigate?: (section: Section) => void;
}) {
  const [open, setOpen] = useState(false);
  const root = home ? "" : "/";
  function follow(event: MouseEvent<HTMLAnchorElement>, section: Section) {
    setOpen(false);
    if (onNavigate) {
      event.preventDefault();
      onNavigate(section);
    }
  }
  return (
    <header className="site-header shell">
      <a
        className="brand"
        href="/"
        aria-label="Maaz home"
        onClick={(e) => follow(e, "home")}
      >
        <MaazMark />
        <span>
          maaz<span className="brand-dot">.</span>
        </span>
      </a>
      <button
        className="menu-toggle"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="site-nav"
      >
        {open ? "Close" : "Menu"}
      </button>
      <nav
        id="site-nav"
        className={open ? "nav-open" : ""}
        aria-label="Main navigation"
      >
        {[
          ["work", "Work"],
          ["experience", "Experience"],
          ["about", "About"],
        ].map(([id, label]) => (
          <a
            key={id}
            href={`${root}#${id}`}
            aria-current={current === id ? "page" : undefined}
            onClick={(e) => follow(e, id as Section)}
          >
            {label}
          </a>
        ))}
        <a
          className="nav-hello"
          href={`${root}#contact`}
          onClick={(e) => follow(e, "contact")}
          aria-current={current === "contact" ? "page" : undefined}
        >
          Say hello <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  );
}
export function Footer() {
  return (
    <footer className="site-footer shell">
      <a className="footer-name" href="/">
        <MaazMark />
        Muhammad Maaz Uddin
      </a>
      <span>Made with curiosity in Islamabad.</span>
      <div>
        <a href="https://github.com/MuhammadMaaz7">GitHub ↗</a>
        <a href="/privacy/">Privacy</a>
        <a href="#main">Back to top ↑</a>
        <Motion />
      </div>
    </footer>
  );
}
