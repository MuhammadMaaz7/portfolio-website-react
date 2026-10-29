import type { DeskTarget } from "./WorkshopScene";
export function WorkshopMark({ kind }: { kind: DeskTarget }) {
  return (
    <svg
      viewBox="0 0 64 56"
      width="58"
      height="50"
      aria-hidden="true"
      className={`workshop-mark mark-${kind}`}
    >
      {kind === "work" ? (
        <>
          <path d="M7 17h23l5-8h20v39H7Z" fill="#b5c7a9" />
          <path d="M9 19h46l-6 30H5Z" fill="#d4dfc9" />
          <path d="M17 17V7h29v29H17Z" fill="#fff8e8" />
          <path
            d="M23 15h16m-16 7h13"
            stroke="#536a61"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path d="M9 28h47l-7 22H5Z" fill="#b5c7a9" />
        </>
      ) : kind === "experience" ? (
        <>
          <rect x="13" y="5" width="39" height="47" rx="5" fill="#879dc9" />
          <path d="M20 5v47" stroke="#536ca7" strokeWidth="4" />
          <rect x="27" y="16" width="18" height="17" rx="2" fill="#fff7e6" />
          <path d="M31 22h10m-10 5h7" stroke="#536ca7" strokeWidth="2" />
        </>
      ) : kind === "about" ? (
        <>
          <rect x="13" y="4" width="38" height="46" rx="5" fill="#df9c85" />
          <rect x="18" y="9" width="28" height="36" rx="2" fill="#fff3df" />
          <circle cx="32" cy="21" r="6" fill="#6179b5" />
          <path d="M22 37c0-10 20-10 20 0" fill="#6179b5" />
          <path
            d="M10 51h44"
            stroke="#b97e65"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </>
      ) : (
        <>
          <path d="M6 14h51v33H6Z" fill="#e9c58f" />
          <path d="m7 15 24 21 25-21" fill="#fff2d6" />
          <path d="m7 46 18-16m31 16L39 30" stroke="#c19c68" strokeWidth="2" />
          <circle cx="32" cy="33" r="5" fill="#d7977d" />
        </>
      )}
    </svg>
  );
}
