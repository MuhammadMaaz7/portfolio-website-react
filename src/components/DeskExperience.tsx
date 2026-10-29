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
import { useTheme } from "../Theme";
import { WorkshopMark } from "./WorkshopMark";
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
export function DeskExperience({
  onNavigate,
  visible = true,
}: {
  onNavigate?: (target: DeskTarget) => void;
  visible?: boolean;
}) {
  const [load, setLoad] = useState(false);
  const [ready, setReady] = useState(false);
  const { night, toggle: toggleLighting } = useTheme();
  const [greeting, setGreeting] = useState(0);
  const [activeTarget, setActiveTarget] = useState<DeskTarget | null>(null);
  const [opening, setOpening] = useState<DeskTarget | null>(null);
  const [tourStep, setTourStep] = useState(-1);
  const [inspected, setInspected] = useState<DeskTarget | null>(null);
  const welcomeShown = useRef(false);
  const navigationTimer = useRef<ReturnType<typeof setTimeout>>();
  const greetingCount = useRef(0);
  const [motion, setMotion] = useState(false);
  const [message, setMessage] = useState(
    "Welcome in! What would you like to explore?",
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
      clearTimeout(navigationTimer.current);
    };
  }, []);
  const onReady = useCallback(() => setReady(true), []);
  useEffect(() => {
    if (
      !visible ||
      !ready ||
      !motion ||
      welcomeShown.current ||
      !host.current?.getClientRects().length
    )
      return;
    welcomeShown.current = true;
    setGreeting((n) => n + 1);
  }, [ready, motion, visible]);
  useEffect(() => {
    if (!visible) {
      clearTimeout(navigationTimer.current);
      setOpening(null);
      setActiveTarget(null);
      setInspected(null);
    }
  }, [visible]);
  const stops: {
    target: DeskTarget;
    label: string;
    action: string;
    description: string;
  }[] = [
    {
      target: "work",
      label: "Projects",
      action: "Open drawer",
      description:
        "The computer opens my project drawer. Pick a folder to see what I built.",
    },
    {
      target: "experience",
      label: "My journey",
      action: "Read notebook",
      description:
        "The blue notebook holds my experience. Each company is a chapter.",
    },
    {
      target: "about",
      label: "About me",
      action: "Meet Maaz",
      description:
        "The little plant leads to a little about me, my background and my tools.",
    },
    {
      target: "contact",
      label: "Say hello",
      action: "Write a note",
      description:
        "The envelope takes you to my email. The lamp changes the room’s light.",
    },
  ];
  function tour() {
    const next = (tourStep + 1) % stops.length;
    setTourStep(next);
    setActiveTarget(stops[next].target);
    setMessage(stops[next].description);
    setInspected(stops[next].target);
  }

  function inspect(target: DeskTarget) {
    const stop = stops.find((stop) => stop.target === target)!;
    setTourStep(-1);
    setInspected(target);
    setActiveTarget(target);
    setMessage(stop.description);
  }
  function navigate(target: DeskTarget) {
    setMessage(
      {
        work: "Some things I’ve built. Take a look.",
        experience: "A few chapters in my journey.",
        about: "A little about the person behind the desk.",
        contact: "The best ideas start with a hello.",
      }[target],
    );
    if (opening) return;
    setActiveTarget(target);
    setOpening(target);
    document.body.style.cursor = "";
    const open = () => {
      setOpening(null);
      setActiveTarget(null);
      if (onNavigate) onNavigate(target);
      else
        document.getElementById(target)?.scrollIntoView({
          behavior: motion ? "smooth" : "auto",
          block: "start",
        });
    };
    clearTimeout(navigationTimer.current);
    if (motion && ready) navigationTimer.current = setTimeout(open, 460);
    else open();
  }
  function greet() {
    setTourStep(-1);
    setInspected(null);
    setActiveTarget(null);
    setGreeting((n) => n + 1);
    const replies = [
      "Hey there! Glad you stopped by.",
      "The computer has my work. The notebook has my story.",
      "Try the lamp for a little evening light.",
    ];
    setMessage(replies[greetingCount.current++ % replies.length]);
  }
  return (
    <div
      className={`desk-experience ${night ? "desk-night" : ""} ${opening ? "is-opening" : ""} ${inspected ? "has-guide" : ""}`}
      data-scene={ready ? "ready" : "illustration"}
    >
      <div className="desk-topline">
        <span>MY LITTLE WORKSHOP</span>
        <button
          onClick={() => toggleLighting()}
          aria-label={
            night
              ? "Switch the portfolio to daylight"
              : "Switch the portfolio to evening"
          }
          aria-pressed={night}
        >
          {night ? "Daylight" : "Evening mode"}
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
                visit={inspected}
                visible={visible}
                activeTarget={inspected || activeTarget}
                opening={opening}
                onSelect={inspect}
                onHover={setActiveTarget}
                onGreet={greet}
                onToggleLight={() => toggleLighting()}
                onReady={onReady}
              />
            </Suspense>
          </SceneBoundary>
        )}
        <button
          className="desk-hello"
          disabled={!!opening}
          onClick={greet}
          aria-label="Say hello to the workshop character"
        >
          Say hi <span aria-hidden="true">☺</span>
        </button>
      </div>
      <div className="workshop-guide">
        <span>
          {tourStep < 0
            ? "Tap an object. I’ll explain."
            : `Your tour · ${tourStep + 1} of 4`}
        </span>
        {tourStep >= 0 && (
          <button
            className="end-tour"
            disabled={!!opening}
            onClick={() => {
              setTourStep(-1);
              setInspected(null);
              setActiveTarget(null);
              setMessage("That’s my little workshop. Where shall we start?");
            }}
          >
            Finish tour
          </button>
        )}
        <button onClick={tour} disabled={!!opening}>
          {tourStep < 0
            ? "Show me around"
            : tourStep === 3
              ? "Tour again"
              : "Next stop"}
          {tourStep >= 0 && (
            <span className="sr-only"> · {tourStep + 1} of 4 shown</span>
          )}
        </button>
      </div>
      <p className="desk-message" aria-live="polite">
        <span className="guide-speaker">Maaz says</span>
        {message}
        {inspected && (
          <>
            <br />
            <button
              className="guide-open"
              disabled={!!opening}
              onClick={() => navigate(inspected)}
            >
              {opening
                ? "Opening…"
                : stops.find((stop) => stop.target === inspected)!.action}
            </button>
          </>
        )}
      </p>
      <div className="workshop-doors" aria-label="Explore the workshop">
        {stops.map((stop) => (
          <button
            key={stop.target}
            className={`workshop-door door-${stop.target}`}
            data-active={(opening || inspected || activeTarget) === stop.target}
            disabled={!!opening}
            onMouseEnter={() => setActiveTarget(stop.target)}
            onMouseLeave={() => {
              if (tourStep < 0) setActiveTarget(null);
            }}
            onFocus={() => setActiveTarget(stop.target)}
            onBlur={() => {
              if (tourStep < 0) setActiveTarget(null);
            }}
            onClick={() => navigate(stop.target)}
          >
            <WorkshopMark kind={stop.target} />
            <span>
              <strong>{stop.label}</strong>
              <small>
                {opening === stop.target ? "Opening…" : stop.action}
              </small>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
