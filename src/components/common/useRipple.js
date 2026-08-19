import { useCallback } from 'react'

/**
 * Reusable ripple effect on click. Returns a handler to spread onto a button.
 * Mirrors the original .ripple-btn JS behaviour.
 */
export function useRipple() {
  return useCallback((e) => {
    const btn = e.currentTarget
    if (!btn.classList.contains('ripple-btn')) return
    const ripple = document.createElement('span')
    ripple.className = 'ripple'
    const rect = btn.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    ripple.style.width = ripple.style.height = size + 'px'
    ripple.style.left = e.clientX - rect.left - size / 2 + 'px'
    ripple.style.top = e.clientY - rect.top - size / 2 + 'px'
    btn.appendChild(ripple)
    setTimeout(() => ripple.remove(), 600)
  }, [])
}
