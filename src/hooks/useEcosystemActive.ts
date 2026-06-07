import { useEffect, useState } from 'react'

const ECOSYSTEM_ROOT_ID = 'ecosystem-scroll-root'

/** True when the AA scroll track intersects the viewport (incl. progress = 0 at track start). */
export function useEcosystemActive() {
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = document.getElementById(ECOSYSTEM_ROOT_ID)
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setActive(Boolean(entry?.isIntersecting))
      },
      { root: null, threshold: 0 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return active
}

export { ECOSYSTEM_ROOT_ID }
