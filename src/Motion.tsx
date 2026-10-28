import { useEffect, useState } from "react";
export function Motion() {
  const [enabled, setEnabled] = useState(true);
  useEffect(() => {
    const system = matchMedia("(prefers-reduced-motion: reduce)");
    let saved: string | null = null;
    try {
      saved = localStorage.getItem("portfolio-motion");
    } catch {
      /* Storage is optional. */
    }
    setEnabled(saved ? saved === "on" : !system.matches);
    const onChange = () => setEnabled(!system.matches);
    system.addEventListener("change", onChange);
    return () => system.removeEventListener("change", onChange);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.motion = enabled ? "on" : "off";
    window.dispatchEvent(new Event("portfolio-motion-change"));
    if (!enabled) {
      document.getAnimations().forEach((a) => a.cancel());
      return;
    }
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.animate(
            [
              { opacity: 0, transform: "translateY(22px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            {
              duration: 650,
              easing: "cubic-bezier(.2,.8,.2,1)",
              fill: "backwards",
            },
          );
          observer.unobserve(entry.target);
        }),
      { threshold: 0.08, rootMargin: "0px 0px -20px 0px" },
    );
    document
      .querySelectorAll(
        ".section-title,.work-card,.role-row,.about-art,.about-copy,.contact-layout,.case-section",
      )
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [enabled]);
  return (
    <button
      className="motion-control"
      aria-pressed={enabled}
      onClick={() => {
        try {
          localStorage.setItem("portfolio-motion", enabled ? "off" : "on");
        } catch {
          /* Session preference still works. */
        }
        setEnabled((v) => !v);
      }}
    >
      Motion {enabled ? "on" : "off"}
    </button>
  );
}
