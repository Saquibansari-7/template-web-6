import Reveal from '../common/Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'

const ROLE_GRADIENTS = [
  'linear-gradient(135deg, var(--emerald) 0%, var(--emerald-light) 100%)',
  'linear-gradient(135deg, #2A3A4A 0%, #1A2A3A 100%)',
  'linear-gradient(135deg, #3A2A1A 0%, #2A1A0A 100%)',
  'linear-gradient(135deg, #2A1A2A 0%, #1A0A1A 100%)',
  'linear-gradient(135deg, #1A3A3A 0%, #0A2A2A 100%)',
  'linear-gradient(135deg, #3A1A2A 0%, #2A0A1A 100%)'
]

export default function Party({ party = [] }) {
  return (
    <section id="party" style={{ padding: '6rem 1.5rem' }}>
      <div className="section-inner section-inner--medium">
        <SectionHeading arabic="أهل العرس" title="Wedding Party" />

        <div className="party-grid">
          {party.map((p, idx) => (
            <Reveal key={idx} delay={idx % 6} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className="portrait-ring">
                <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: ROLE_GRADIENTS[idx % ROLE_GRADIENTS.length], display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--gold)', opacity: 0.3 }} />
                </div>
              </div>
              <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', fontWeight: 500, color: 'var(--ivory)', marginTop: '1rem' }}>{p.name}</h4>
              <p style={{ color: 'var(--gold)', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{p.role}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
