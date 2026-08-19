import Lanterns from './Lanterns.jsx'
import ParticleCanvas from '../common/ParticleCanvas.jsx'

export default function Hero({ settings }) {
  const names = settings ? `${settings.groom} & ${settings.bride}` : 'Ahmad & Zara'

  const nameLetters = names.split('').map((char, i) => (
    <span key={i} className="letter-animate gold-shimmer" style={{ animationDelay: 1.5 + i * 0.08 + 's' }}>
      {char === ' ' ? '\u00A0' : char}
    </span>
  ))
  const date = (() => {
    try { return new Date(settings?.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) } catch { return '' }
  })()
  const tagline = settings?.tagline || 'Joined by faith, united by love'
  const location = settings?.location || 'Istanbul, Turkey'

  return (
    <section className="hero" id="hero">
      <div className="parallax-bg" id="parallax-bg" />
      <ParticleCanvas />
      <Lanterns />

      <div className="hero-content">
        <div className="reveal" style={{ marginBottom: '2rem' }}>
          <p className="hero-bismillah" dir="rtl" lang="ar">بسم الله الرحمن الرحيم</p>
        </div>

        <h1 className="reveal reveal-delay-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 'clamp(3rem, 10vw, 7rem)', fontWeight: 300, lineHeight: 1, marginBottom: '1rem', letterSpacing: '0.05em' }}>
          <span id="couple-names">{nameLetters}</span>
        </h1>

        <p className="reveal reveal-delay-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 'clamp(1.1rem, 3vw, 1.6rem)', color: 'var(--blush)', letterSpacing: '0.15em', marginBottom: '2rem' }}>
          {tagline}
        </p>

        <div className="reveal reveal-delay-4" style={{ marginBottom: '3rem' }}>
          <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: 'clamp(0.8rem, 2vw, 0.95rem)', letterSpacing: '0.15em', color: 'rgba(245,240,232,0.6)', marginBottom: '0.25rem' }}>
            {date}
          </p>
          <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: 'clamp(0.8rem, 2vw, 0.95rem)', letterSpacing: '0.15em', color: 'rgba(245,240,232,0.6)' }}>
            {location}
          </p>
        </div>
      </div>
    </section>
  )
}
