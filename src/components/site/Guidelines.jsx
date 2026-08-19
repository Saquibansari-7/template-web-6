import Reveal from '../common/Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'

const ICONS = {
  'Separate Seating': (
    <svg viewBox="0 0 24 24" style={{ width: 24, height: 24 }}>
      <rect x="3" y="8" width="7" height="12" rx="1" fill="none" stroke="#C9A84C" strokeWidth="1.2" />
      <rect x="14" y="8" width="7" height="12" rx="1" fill="none" stroke="#C9A84C" strokeWidth="1.2" />
      <line x1="11" y1="4" x2="11" y2="20" stroke="#C9A84C" strokeWidth="0.8" strokeDasharray="2 2" />
    </svg>
  ),
  'Halal Only': (
    <svg viewBox="0 0 24 24" style={{ width: 24, height: 24 }}>
      <circle cx="12" cy="12" r="9" fill="none" stroke="#C9A84C" strokeWidth="1.2" />
      <path d="M8 12 L11 15 L16 9" fill="none" stroke="#C9A84C" strokeWidth="1.5" />
    </svg>
  ),
  'Nasheed Only': (
    <svg viewBox="0 0 24 24" style={{ width: 24, height: 24 }}>
      <path d="M9 18V6l10-3v12" fill="none" stroke="#C9A84C" strokeWidth="1.2" />
      <circle cx="6" cy="18" r="3" fill="none" stroke="#C9A84C" strokeWidth="1.2" />
      <circle cx="16" cy="15" r="3" fill="none" stroke="#C9A84C" strokeWidth="1.2" />
      <line x1="3" y1="3" x2="21" y2="21" stroke="#C9A84C" strokeWidth="1" opacity="0.4" />
    </svg>
  ),
  'Photography': (
    <svg viewBox="0 0 24 24" style={{ width: 24, height: 24 }}>
      <rect x="3" y="6" width="18" height="14" rx="2" fill="none" stroke="#C9A84C" strokeWidth="1.2" />
      <circle cx="12" cy="13" r="4" fill="none" stroke="#C9A84C" strokeWidth="1.2" />
      <circle cx="18" cy="9" r="1.5" fill="#C9A84C" />
    </svg>
  )
}

export default function Guidelines({ guidelines = [] }) {
  return (
    <section id="guidelines" style={{ padding: '6rem 1.5rem', background: 'linear-gradient(180deg, transparent 0%, rgba(26,58,42,0.1) 50%, transparent 100%)' }}>
      <div className="section-inner section-inner--medium">
        <SectionHeading arabic="إرشادات الضيوف" title="Guest Guidelines" />

        <div className="guidelines-grid">
          {guidelines.map((g, idx) => (
            <Reveal key={idx} delay={idx % 4} className="guideline-card glass-card" style={{ padding: '2rem' }}>
              <div style={{ width: 48, height: 48, marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 12 }}>
                {ICONS[g.title] || (
                  <svg viewBox="0 0 24 24" style={{ width: 24, height: 24 }}>
                    <circle cx="12" cy="12" r="9" fill="none" stroke="#C9A84C" strokeWidth="1.2" />
                    <path d="M8 12 L11 15 L16 9" fill="none" stroke="#C9A84C" strokeWidth="1.5" />
                  </svg>
                )}
              </div>
              <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', fontWeight: 500, color: 'var(--ivory)', marginBottom: '0.5rem' }}>{g.title}</h4>
              <p style={{ color: 'rgba(245,240,232,0.6)', fontSize: '0.9rem', lineHeight: 1.6 }}>{g.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
