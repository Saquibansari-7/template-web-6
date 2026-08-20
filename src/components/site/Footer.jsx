import Reveal from '../common/Reveal.jsx'
import { formatWeddingDate } from '../../lib/utils.js'

export default function Footer({ settings }) {
  const date = settings ? `${formatWeddingDate(settings.date)} ; ${settings.location || ''}` : 'Istanbul, Turkey'

  return (
    <footer className="footer-bg" style={{ padding: '6rem 1.5rem 3rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.05) 0%, transparent 60%)' }} />
      <div style={{ position: 'relative', zIndex: 2 }}>
        <Reveal style={{ marginBottom: '3rem' }}>
          <p style={{ fontFamily: "'Amiri', serif", fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', color: 'var(--gold)', lineHeight: 2, letterSpacing: '0.03em', maxWidth: 700, margin: '0 auto' }}>
            رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا
          </p>
          <p style={{ color: 'rgba(245,240,232,0.4)', fontSize: '0.85rem', marginTop: '1rem', fontStyle: 'italic' }}>
            "Our Lord, grant us from among our wives and offspring comfort to our eyes and make us an example for the righteous."
          </p>
          <p style={{ color: 'rgba(245,240,232,0.3)', fontSize: '0.8rem', marginTop: '0.5rem' }}>— Surah Al-Furqan, 25:74</p>
        </Reveal>

        <Reveal delay={1} className="hilal-emblem-wrap" style={{ marginBottom: '2rem' }}>
          <div className="hilal-glow" aria-hidden="true" />
          <svg className="hilal-emblem" viewBox="0 0 100 56" role="img" aria-label="Crescent and star" style={{ width: 76, display: 'block' }}>
            <defs>
              <linearGradient id="hilalGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E8D5A3" />
                <stop offset="45%" stopColor="#C9A84C" />
                <stop offset="100%" stopColor="#9A7E2E" />
              </linearGradient>
              <radialGradient id="hilalStarFill" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#E8D5A3" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#C9A84C" stopOpacity="0.08" />
              </radialGradient>
              <filter id="hilalGlowFilter" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            <path d="M4 28 Q14 18 26 28" fill="none" stroke="url(#hilalGoldGrad)" strokeWidth="0.5" opacity="0.3" />
            <path d="M74 28 Q86 18 96 28" fill="none" stroke="url(#hilalGoldGrad)" strokeWidth="0.5" opacity="0.3" />
            <circle cx="4" cy="28" r="1.2" fill="#C9A84C" opacity="0.25" />
            <circle cx="96" cy="28" r="1.2" fill="#C9A84C" opacity="0.25" />
            <path d="M36 9 A21 21 0 1 1 36 47 A16 16 0 1 0 36 9Z" fill="none" stroke="url(#hilalGoldGrad)" strokeWidth="1.3" filter="url(#hilalGlowFilter)" />
            <path d="M34 13 A15 15 0 1 1 34 43 A12 12 0 1 0 34 13Z" fill="none" stroke="#E8D5A3" strokeWidth="0.35" opacity="0.2" />
            <g className="hilal-star-group">
              <path d="M40 12 L40.6 20.4 L51.2 20.4 L44.2 25.6 L46.8 34 L40 29.2 L33.2 34 L35.8 25.6 L28.8 20.4 L37.4 20.4 Z" fill="url(#hilalStarFill)" stroke="url(#hilalGoldGrad)" strokeWidth="0.9" strokeLinejoin="round" />
            </g>
          </svg>
        </Reveal>

        <Reveal delay={2} style={{ marginBottom: '1.5rem' }}>
          <p id="footer-couple-names" style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', color: 'var(--ivory)', letterSpacing: '0.1em' }} >{settings ? settings.groom : 'Ahmad '}<span style={{ color: 'var(--gold)' }}>&</span>{settings ? settings.bride : ' Zara'}</p>
        </Reveal>

        <Reveal delay={3} style={{ marginBottom: '3rem' }}>
          <p id="footer-date" style={{ color: 'rgba(245,240,232,0.4)', fontSize: '0.85rem', letterSpacing: '0.15em' }}>{date}</p>
        </Reveal>

        <svg className="arabesque-divider" viewBox="0 0 200 30" style={{ marginBottom: '2rem' }}>
          <path d="M0 15 Q25 5 50 15 T100 15 T150 15 T200 15" fill="none" stroke="#C9A84C" strokeWidth="0.8" opacity="0.3" />
          <circle cx="100" cy="15" r="3" fill="#C9A84C" opacity="0.3" />
        </svg>

        <p style={{ color: 'rgba(245,240,232,0.25)', fontSize: '0.75rem', letterSpacing: '0.1em' }}>
          2026 webforwedd .All rights reserved.
        </p>
      </div>
    </footer>
  )
}
