import { useEffect, useState } from "react";
export function Motion() {
  const [enabled, setEnabled] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const system = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      let saved: string | null = null;
      try {
        saved = localStorage.getItem("portfolio-motion");
      } catch {
        /* Optional browser storage. */
      }
      setReduced(system.matches);
      setEnabled(!system.matches && saved !== "off");
      setReady(true);
    };
    sync();
    system.addEventListener("change", sync);
    return () => system.removeEventListener("change", sync);
  }, []);
  useEffect(() => {
    if (!ready) return;
    document.documentElement.dataset.motion = enabled ? "on" : "off";
    window.dispatchEvent(new Event("portfolio-motion-change"));
    if (!enabled)
      document.getAnimations().forEach((animation) => animation.cancel());
  }, [enabled, ready]);
  return (
    <button
      className="motion-control"
      aria-pressed={enabled}
      disabled={reduced}
      title={
        reduced
          ? "Your device’s reduced-motion setting is active"
          : "Turn optional animation on or off"
      }
      onClick={() => {
        try {
          localStorage.setItem("portfolio-motion", enabled ? "off" : "on");
        } catch {
          /* Session preference still works. */
        }
        setEnabled((value) => !value);
      }}
    >
      Motion {enabled ? "on" : "off"}
      {reduced ? " · device setting" : ""}
    </button>
  );
}
