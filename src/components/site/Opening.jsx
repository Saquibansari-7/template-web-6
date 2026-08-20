import { useState, useRef, useEffect } from 'react'

export default function Opening() {
  const [opened, setOpened] = useState(false)
  const [closing, setClosing] = useState(false)
  const [hidden, setHidden] = useState(false)
  const sealRef = useRef(null)

  useEffect(() => {
    document.body.classList.add('opening-active')
    document.documentElement.classList.add('opening-active')
    return () => {
      document.body.classList.remove('opening-active')
      document.documentElement.classList.remove('opening-active')
    }
  }, [])

  const start = () => {
    if (opened) return
    setOpened(true)
    setTimeout(() => setClosing(true), 2200)
    setTimeout(() => {
      setHidden(true)
      document.body.classList.remove('opening-active')
      document.documentElement.classList.remove('opening-active')
    }, 3800)
  }

  if (hidden) return null

  return (
    <div className={`opening ${opened ? 'is-open' : ''} ${closing ? 'is-closing' : ''}`} aria-hidden={opened}>
      <img src="/opening/left-gate.png" className="opening-gate opening-gate--left" alt="" />
      <img src="/opening/right-gate.png" className="opening-gate opening-gate--right" alt="" />

      <button
        ref={sealRef}
        className="opening-seal"
        onClick={start}
        aria-label="Open the invitation"
      >
        <img src="/opening/m-stamp.png" alt="Seal" />
      </button>
    </div>
  )
}
