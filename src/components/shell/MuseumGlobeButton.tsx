/** World map — Twemoji 🗺️ (U+1F5FA), CC-BY 4.0 */
const MAP_ICON_SRC = '/map-icon.svg'

export function MuseumGlobeButton() {
  return (
    <button
      type="button"
      className="museum-flat-map"
      aria-label="World map — coming soon"
      title="Human & AI influence map (coming soon)"
      disabled
    >
      <img
        className="museum-flat-map__img"
        src={MAP_ICON_SRC}
        alt=""
        width={36}
        height={36}
        draggable={false}
      />
    </button>
  )
}
