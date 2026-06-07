/** Flat globe emoji glyph — stylized 🌍 (coming soon) */
export function MuseumGlobeButton() {
  return (
    <button
      type="button"
      className="museum-earth-emoji"
      aria-label="Virtual globe — coming soon"
      title="Virtual globe — human & AI influence map (coming soon)"
      disabled
    >
      <svg className="museum-earth-emoji__svg" viewBox="0 0 64 64" aria-hidden>
        <circle cx="32" cy="32" r="28" fill="#4FA3E3" />
        <path
          fill="#5CB85C"
          d="M32 4c-8.2 0-15.5 3.6-20.5 9.3 2.8 1.2 6.1 1.9 9.6 1.9 7.4 0 14-3.2 18.6-8.3C37.2 5.4 34.7 4 32 4Z"
        />
        <path
          fill="#6BCF6B"
          d="M10.5 32c0-4.8 1.3-9.3 3.5-13.2 4.2 5.4 10.7 8.9 18 8.9 4.6 0 8.8-1.5 12.2-4.1 2.8 3.6 4.5 8.1 4.5 13.1 0 .8-.1 1.6-.2 2.4-3.8 2.5-8.3 3.9-13.1 3.9-7.9 0-14.8-4.3-18.5-10.6-.2.3-.4.7-.4 1.6Z"
        />
        <path
          fill="#4FAF50"
          d="M32 60c10.5 0 19.7-5.2 25.3-13.2-5.2 3.8-11.6 6-18.5 6-9.8 0-18.4-5.3-23.1-13.2C15.8 47.2 23.2 60 32 60Z"
        />
        <ellipse cx="24" cy="22" rx="8" ry="5" fill="#7AD67A" opacity="0.85" />
        <path
          fill="none"
          stroke="#3D8FD9"
          strokeWidth="1.5"
          opacity="0.35"
          d="M4 32h56"
        />
      </svg>
    </button>
  )
}
