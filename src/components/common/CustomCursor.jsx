import { useEffect, useRef } from 'react'

/** Desktop-only blend-mode cursor that trails the pointer. */
export default function CustomCursor() {
  const ref = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const cursor = ref.current
    let x = 0, y = 0, tx = 0, ty = 0
    const onMove = (e) => { tx = e.clientX; ty = e.clientY }
    document.addEventListener('mousemove', onMove)

    let raf
    const update = () => {
      x += (tx - x) * 0.15
      y += (ty - y) * 0.15
      if (cursor) {
        cursor.style.left = x - 14 + 'px'
        cursor.style.top = y - 14 + 'px'
      }
      raf = requestAnimationFrame(update)
    }
    update()

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="custom-cursor" id="cursor" ref={ref}>
      <svg viewBox="0 0 28 28" fill="none">
        <path d="M14 2C8.5 2 4 6.5 4 12C4 18 10 24 14 26C18 24 24 18 24 12C24 6.5 19.5 2 14 2Z" fill="none" stroke="#C9A84C" strokeWidth="1.2" />
        <circle cx="14" cy="10" r="2.5" fill="#C9A84C" opacity="0.8" />
        <path d="M14 14L14 20" stroke="#C9A84C" strokeWidth="1" opacity="0.5" />
      </svg>
    </div>
  )
}
