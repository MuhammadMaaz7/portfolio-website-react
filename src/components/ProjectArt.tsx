export function ProjectArt({ kind }: { kind: string }) {
  if (kind === "clarimo")
    return (
      <svg
        viewBox="0 0 560 310"
        role="img"
        aria-label="Illustration of research notes coming together into an idea"
      >
        <path
          d="m100 90 111-24 36 157-110 24Z"
          fill="#faf1d8"
          stroke="#30475a"
          strokeWidth="2"
        />
        <path
          d="m133 115 63-14m-58 37 70-15m-65 39 45-10"
          stroke="#c1aa86"
          strokeWidth="5"
        />
        <path
          d="m312 91 112 17-21 154-112-17Z"
          fill="#efae94"
          stroke="#30475a"
          strokeWidth="2"
        />
        <path
          d="m334 140 62 9m-66 16 43 6m-48 20 62 9"
          stroke="#a96b5b"
          strokeWidth="5"
        />
        <path
          d="m230 100 44-58 44 58-44 47Z"
          fill="#5d75ba"
          stroke="#30475a"
          strokeWidth="2"
        />
        <path d="m248 102 26-25 25 24-25 27Z" fill="#dce0ef" />
        <path
          d="M257 208h40m-33 14h26m-21 13h16"
          stroke="#30475a"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M257 195c0-11-16-17-16-35a34 34 0 0 1 68 0c0 18-14 22-14 35Z"
          fill="#f3cc76"
          stroke="#30475a"
          strokeWidth="2"
        />
        <circle cx="263" cy="158" r="3" fill="#30475a" />
        <circle cx="287" cy="158" r="3" fill="#30475a" />
        <path
          d="M266 173q9 8 17-1"
          stroke="#30475a"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    );
  if (kind === "jarvis")
    return (
      <svg
        viewBox="0 0 560 310"
        role="img"
        aria-label="Illustration of a friendly voice assistant and sound waves"
      >
        <ellipse cx="280" cy="262" rx="105" ry="12" fill="#d6a18e" />
        <rect
          x="196"
          y="58"
          width="168"
          height="181"
          rx="58"
          fill="#f5dfbe"
          stroke="#3e474d"
          strokeWidth="2"
        />
        <rect x="218" y="82" width="124" height="106" rx="29" fill="#415868" />
        <ellipse cx="255" cy="133" rx="6" ry="12" fill="#d9e6de" />
        <ellipse cx="307" cy="133" rx="6" ry="12" fill="#d9e6de" />
        <path
          d="M267 160q14 9 27-2"
          fill="none"
          stroke="#d9e6de"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="279" cy="213" r="9" fill="#cc8e70" />
        <path
          d="M146 113q-35 32 0 65m-28-88q-60 55 0 112m296-89q35 32 0 65m28-88q60 55 0 112"
          fill="none"
          stroke="#a76250"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          d="m240 244-17 19m97-19 18 19"
          stroke="#3e474d"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>
    );
  if (kind === "golocal")
    return (
      <svg
        viewBox="0 0 560 310"
        role="img"
        aria-label="Illustration of a winding path through Pakistan-inspired mountain scenery"
      >
        <circle cx="392" cy="79" r="31" fill="#f5d58b" />
        <path d="M54 245 189 73 323 245Z" fill="#799b8b" />
        <path d="m154 118 35-45 42 54-25-5-15-17-18 20Z" fill="#f5efdc" />
        <path d="M244 245 361 110 500 245Z" fill="#a5b7a1" />
        <path
          d="m160 310c-19-64 184-64 147-112-16-21-75-2-51-28"
          fill="none"
          stroke="#f8ead1"
          strokeWidth="28"
        />
        <path
          d="M107 219v-57m-24 29 24-44 24 44Z"
          fill="#486f65"
          stroke="#486f65"
          strokeWidth="6"
        />
        <path
          d="M435 252v-57m-24 29 24-44 24 44Z"
          fill="#486f65"
          stroke="#486f65"
          strokeWidth="6"
        />
        <path
          d="M304 115c-28-35 28-64 28-29 0 10-12 22-14 25l-7 9Z"
          fill="#ce805e"
          stroke="#3b5257"
          strokeWidth="2"
        />
        <circle cx="314" cy="84" r="7" fill="#f6e3c7" />
      </svg>
    );
  if (kind === "verification")
    return (
      <svg
        viewBox="0 0 560 310"
        role="img"
        aria-label="Illustration of examining a collection of websites"
      >
        <path
          d="m147 70 159-17 21 191-159 17Z"
          fill="#f7ecd6"
          stroke="#354653"
          strokeWidth="2"
        />
        <path
          d="m176 112 90-9m-85 40 95-10m-90 41 74-8m-68 39 89-9"
          stroke="#aeb5ae"
          strokeWidth="6"
        />
        <circle
          cx="345"
          cy="151"
          r="64"
          fill="#c8d8df"
          stroke="#354653"
          strokeWidth="6"
        />
        <path
          d="m389 197 42 45"
          stroke="#354653"
          strokeWidth="22"
          strokeLinecap="round"
        />
        <path
          d="M315 151h61m-31-30v60m-20-56q-24 28 0 54m40-54q24 28 0 54"
          fill="none"
          stroke="#5e7f8d"
          strokeWidth="3"
        />
        <circle
          cx="345"
          cy="151"
          r="31"
          fill="none"
          stroke="#5e7f8d"
          strokeWidth="3"
        />
      </svg>
    );
  return (
    <svg
      viewBox="0 0 560 310"
      role="img"
      aria-label="Illustration of software components being connected"
    >
      <rect
        x="112"
        y="81"
        width="115"
        height="115"
        rx="13"
        fill="#f5d28a"
        stroke="#354653"
        strokeWidth="2"
      />
      <rect
        x="322"
        y="117"
        width="115"
        height="115"
        rx="13"
        fill="#9bb5ac"
        stroke="#354653"
        strokeWidth="2"
      />
      <path
        d="M229 139h40v40h51"
        stroke="#354653"
        strokeWidth="5"
        fill="none"
      />
      <path
        d="m148 127-15 13 15 13m41-26 15 13-15 13m-25-23-9 31"
        fill="none"
        stroke="#354653"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M352 157h56m-56 15h40m-40 16h51"
        stroke="#486e64"
        strokeWidth="5"
      />
    </svg>
  );
}
