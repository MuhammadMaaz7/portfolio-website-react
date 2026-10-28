import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
type ThemeMode = "system" | "light" | "dark";
const ThemeContext = createContext<{
  mode: ThemeMode;
  night: boolean;
  setMode: (mode: ThemeMode) => void;
  toggle: () => void;
}>({ mode: "system", night: false, setMode: () => {}, toggle: () => {} });
const valid = (value: string | null): ThemeMode =>
  value === "light" || value === "dark" ? value : "system";
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>("system");
  const [night, setNight] = useState(false);
  useEffect(() => {
    const system = matchMedia("(prefers-color-scheme: dark)");
    let currentChoice: ThemeMode = "system";
    const apply = (choice: ThemeMode) => {
      currentChoice = choice;
      const dark = choice === "dark" || (choice === "system" && system.matches);
      setModeState(choice);
      setNight(dark);
      document.documentElement.dataset.theme = dark ? "dark" : "light";
      document.documentElement.style.colorScheme = dark ? "dark" : "light";
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", dark ? "#252f38" : "#f7f3ea");
    };
    const read = () => {
      let saved: ThemeMode = "system";
      try {
        saved = valid(localStorage.getItem("portfolio-theme"));
      } catch {
        /* Settings are optional. */
      }
      apply(saved);
    };
    read();
    const followSystem = () => apply(currentChoice);
    system.addEventListener("change", followSystem);
    const sync = (event: StorageEvent) => {
      if (event.key === "portfolio-theme" || event.key === null) read();
    };
    window.addEventListener("storage", sync);
    const local = (event: Event) =>
      apply((event as CustomEvent<ThemeMode>).detail);
    window.addEventListener("portfolio-theme-change", local);
    return () => {
      system.removeEventListener("change", followSystem);
      window.removeEventListener("storage", sync);
      window.removeEventListener("portfolio-theme-change", local);
    };
  }, []);
  function setMode(choice: ThemeMode) {
    try {
      if (choice === "system") localStorage.removeItem("portfolio-theme");
      else localStorage.setItem("portfolio-theme", choice);
    } catch {
      /* Keep the session choice even when storage is blocked. */
    }
    window.dispatchEvent(
      new CustomEvent("portfolio-theme-change", { detail: choice }),
    );
  }
  return (
    <ThemeContext.Provider
      value={{
        mode,
        night,
        setMode,
        toggle: () => setMode(night ? "light" : "dark"),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
export const useTheme = () => useContext(ThemeContext);
export function ThemeControl() {
  const { mode, setMode } = useTheme();
  return (
    <label className="theme-control">
      <span>Lighting</span>
      <select
        aria-label="Portfolio color theme"
        value={mode}
        onChange={(event) => setMode(event.target.value as ThemeMode)}
      >
        <option value="system">Device setting</option>
        <option value="light">Daylight</option>
        <option value="dark">Evening</option>
      </select>
    </label>
  );
}
