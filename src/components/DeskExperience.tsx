import {
  Component,
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { DeskTarget } from "./WorkshopScene";
const WorkshopScene = lazy(() => import("./WorkshopScene"));
class SceneBoundary extends Component<
  { children: ReactNode; onFailure: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFailure();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
export function DeskIllustration() {
  return (
    <svg
      viewBox="0 0 640 460"
      className="desk-illustration"
      role="img"
      aria-label="An illustrated workshop with a friendly character, a computer, a plant and a notebook"
    >
      <path d="M84 286 346 365 568 253 302 180Z" fill="#d5c8b4" />
      <path d="m86 110 0 176 260 79V186Z" fill="#efdbca" />
      <path d="m346 186 222-109v176L346 365Z" fill="#e9c9b9" />
      <path d="m182 252 185 62 135-72-187-60Z" fill="#e4b58e" />
      <path
        d="M195 261v103m288-117v102m-119-31v90"
        stroke="#b57e61"
        strokeWidth="14"
      />
      <path d="m291 152 104 28v98l-104-30Z" fill="#52685f" />
      <path d="m302 165 81 22v73l-81-23Z" fill="#faf1d9" />
      <path d="m341 266 0 28" stroke="#52685f" strokeWidth="13" />
      <path d="m418 225 38 10v-62l-38-10Z" fill="#6179b5" />
      <path d="M220 230v-28" stroke="#617d61" strokeWidth="9" />
      <ellipse cx="220" cy="183" rx="13" ry="28" fill="#93aa7f" />
      <path d="m203 208 35 12-6 27-23-8Z" fill="#d89173" />
      <rect x="237" y="222" width="44" height="49" rx="14" fill="#efb398" />
      <rect x="228" y="180" width="59" height="51" rx="15" fill="#f2b99e" />
      <circle cx="245" cy="205" r="3" fill="#303a40" />
      <circle cx="268" cy="205" r="3" fill="#303a40" />
      <path
        d="M250 216q7 7 13 0"
        fill="none"
        stroke="#9d5c49"
        strokeWidth="3"
      />
      <path
        d="M226 184h64m-51-7h39"
        stroke="#5875ba"
        strokeWidth="12"
        strokeLinecap="round"
      />
    </svg>
  );
}
export function DeskExperience() {
  const [load, setLoad] = useState(false);
  const [ready, setReady] = useState(false);
  const [night, setNight] = useState(false);
  const [greeting, setGreeting] = useState(0);
  const [motion, setMotion] = useState(false);
  const [message, setMessage] = useState(
    "Click an object, or choose a section below.",
  );
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const update = () =>
      setMotion(
        document.documentElement.dataset.motion !== "off" &&
          !matchMedia("(prefers-reduced-motion: reduce)").matches,
      );
    update();
    window.addEventListener("portfolio-motion-change", update);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px" },
    );
    if (host.current) observer.observe(host.current);
    return () => {
      observer.disconnect();
      window.removeEventListener("portfolio-motion-change", update);
      document.body.style.cursor = "";
    };
  }, []);
  const onReady = useCallback(() => setReady(true), []);
  function navigate(target: DeskTarget) {
    setMessage(
      {
        work: "Some things I’ve built. Take a look.",
        experience: "A few chapters in my journey.",
        about: "A little about the person behind the desk.",
        contact: "The best ideas start with a hello.",
      }[target],
    );
    document.getElementById(target)?.scrollIntoView({
      behavior: motion ? "smooth" : "auto",
      block: "start",
    });
  }
  function greet() {
    setGreeting((n) => n + 1);
    setMessage("Hey there! Glad you stopped by.");
  }
  return (
    <div
      className={`desk-experience ${night ? "desk-night" : ""}`}
      data-scene={ready ? "ready" : "illustration"}
    >
      <div className="desk-topline">
        <span>MY LITTLE WORKSHOP</span>
        <button
          onClick={() => setNight((n) => !n)}
          aria-label={
            night ? "Turn workshop lights on" : "Turn workshop lights down"
          }
          aria-pressed={night}
        >
          {night ? "Morning light" : "Evening mode"}
          <span aria-hidden="true">{night ? "◐" : "◑"}</span>
        </button>
      </div>
      <div className="desk-canvas" ref={host}>
        <div className={ready ? "desk-poster is-hidden" : "desk-poster"}>
          <DeskIllustration />
        </div>
        {load && (
          <SceneBoundary onFailure={() => setReady(false)}>
            <Suspense fallback={null}>
              <WorkshopScene
                night={night}
                motion={motion}
                greeting={greeting}
                onSelect={navigate}
                onGreet={greet}
                onToggleLight={() => setNight((n) => !n)}
                onReady={onReady}
              />
            </Suspense>
          </SceneBoundary>
        )}
        <button
          className="desk-hello"
          onClick={greet}
          aria-label="Say hello to the workshop character"
        >
          Say hi <span aria-hidden="true">☺</span>
        </button>
      </div>
      <p className="desk-message" aria-live="polite">
        {message}
      </p>
      <div className="desk-shortcuts" aria-label="Explore the workshop">
        <button onClick={() => navigate("work")}>
          <span>01</span>Projects
        </button>
        <button onClick={() => navigate("experience")}>
          <span>02</span>My journey
        </button>
        <button onClick={() => navigate("about")}>
          <span>03</span>About me
        </button>
        <button onClick={() => navigate("contact")}>
          <span>04</span>Say hello
        </button>
      </div>
    </div>
  );
}
