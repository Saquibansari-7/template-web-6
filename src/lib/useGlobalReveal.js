import { useEffect } from 'react'

/**
 * Observes every .reveal element and adds .visible when it scrolls into view.
 * Re-scans whenever `dep` changes (e.g. after content loads).
 */
export function useGlobalReveal(dep) {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('.reveal'))
    if (!elements.length) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    elements.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [dep])
}
