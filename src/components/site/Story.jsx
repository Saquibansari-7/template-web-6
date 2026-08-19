import Reveal from '../common/Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'

export default function Story({ story = [] }) {
  return (
    <section id="story" style={{ padding: '8rem 1.5rem', maxWidth: 1100, margin: '0 auto', width: '100%' }}>
      <SectionHeading arabic="قصتنا" title="Our Story" />

      <div style={{ position: 'relative' }}>
        <div className="timeline-line" />
        {story.map((item, idx) => {
          const isLeft = idx % 2 === 0
          return (
            <Reveal
              key={idx}
              delay={idx % 6}
              style={{ display: 'flex', justifyContent: isLeft ? 'flex-start' : 'flex-end', marginBottom: '3rem', position: 'relative' }}
            >
              <div className="timeline-card" style={{ width: '45%', ...(isLeft ? { marginRight: 'auto' } : { marginLeft: 'auto' }) }}>
                <div className="timeline-dot" style={{ ...(isLeft ? { right: -37 } : { left: -37 }), top: 10 }} />
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.85rem', color: 'var(--gold)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                  {item.year}
                </span>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 500, margin: '0.5rem 0', color: 'var(--ivory)' }}>
                  {item.title}
                </h3>
                <p style={{ color: 'rgba(245,240,232,0.7)', lineHeight: 1.7, fontSize: '0.95rem' }}>{item.description}</p>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
