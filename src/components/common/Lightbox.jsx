import { useEffect } from 'react'

/** Full-screen image lightbox. Pass `src` to show; pass null to close. */
export default function Lightbox({ src, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    if (src) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [src, onClose])

  if (!src) return null
  return (
    <div className="lightbox active" onClick={onClose}>
      <img
        src={src}
        alt=""
        style={{ maxWidth: '92vw', maxHeight: '80vh', borderRadius: 8, objectFit: 'cover' }}
      />
    </div>
  )
}
