import { useState, useRef, useEffect } from 'react'

const AUDIO_SRC = '/opening/Wedding-Nasheed.mp3'

export default function MusicDisk() {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  // Start music when the opening seal is clicked.
  useEffect(() => {
    const onStart = () => {
      audioRef.current?.play().then(() => setPlaying(true)).catch(() => {})
    }
    window.addEventListener('music:start', onStart)
    return () => window.removeEventListener('music:start', onStart)
  }, [])

  // Keep state in sync if audio ends/pauses externally.
  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    const sync = () => setPlaying(!a.paused)
    a.addEventListener('play', sync)
    a.addEventListener('pause', sync)
    return () => {
      a.removeEventListener('play', sync)
      a.removeEventListener('pause', sync)
    }
  }, [])

  const toggle = () => {
    const a = audioRef.current
    if (!a) return
    if (a.paused) {
      a.play().then(() => setPlaying(true)).catch(() => {})
    } else {
      a.pause()
      setPlaying(false)
    }
  }

  return (
    <>
      <audio ref={audioRef} src={AUDIO_SRC} loop preload="none" />
      <button
        type="button"
        className={`music-disk ${playing ? 'is-playing' : ''}`}
        onClick={toggle}
        aria-label={playing ? 'Pause music' : 'Play music'}
      >
        <span className="music-disk__ring" />
        <span className="music-disk__core" />
        <span className="music-disk__note">♪</span>
      </button>
    </>
  )
}
