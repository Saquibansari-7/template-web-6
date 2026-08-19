import Reveal from '../common/Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'
import MosqueIcon from './MosqueIcon.jsx'

export default function Ceremony({ ceremony }) {
  const nikah = ceremony?.nikah || {}
  const walima = ceremony?.walima || {}
  const quote = ceremony?.quote || {}

  return (
    <section id="ceremony" style={{ padding: '6rem 1.5rem', background: 'linear-gradient(180deg, transparent 0%, rgba(26,58,42,0.15) 50%, transparent 100%)' }}>
      <div className="section-inner">
        <SectionHeading arabic="تفاصيل الحفل" title="Ceremony Details" />

        <div className="ceremony-grid">
          <VenueCard title="The Nikah" venue={nikah.venue} address={nikah.address} date={nikah.date} delay={0} />
          <VenueCard title="The Walima" venue={walima.venue} address={walima.address} date={walima.date} delay={1} />
        </div>

        <Reveal delay={2} style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'inline-block', padding: '1rem 2rem', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 50 }}>
            <span style={{ color: 'var(--gold)', fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              We are awaiting your presence
            </span>
          </div>
        </Reveal>

        <Reveal delay={3} className="quran-quote" style={{ maxWidth: 800, margin: '0 auto' }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', color: 'var(--ivory)', lineHeight: 1.6, marginBottom: '1rem' }}>
            "{quote.english}"
          </p>
          <p style={{ fontFamily: "'Amiri', serif", fontSize: '1.3rem', color: 'var(--gold)', marginBottom: '0.5rem' }}>{quote.arabic}</p>
          <p style={{ color: 'rgba(245,240,232,0.5)', fontSize: '0.85rem', letterSpacing: '0.1em' }}>{quote.reference}</p>
        </Reveal>
      </div>
    </section>
  )
}

function VenueCard({ title, venue, address, date, delay }) {
  return (
    <Reveal delay={delay} className="glass-card" style={{ padding: '2.5rem', textAlign: 'center' }}>
      <MosqueIcon />
      <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--gold)' }}>
        {title}
      </h3>
      <p style={{ color: 'rgba(245,240,232,0.8)', fontSize: '1rem', marginBottom: '0.3rem' }}>{venue}</p>
      <p style={{ color: 'rgba(245,240,232,0.5)', fontSize: '0.9rem', marginBottom: '1rem' }}>{address}</p>
      <p style={{ color: 'var(--blush)', fontSize: '0.9rem', letterSpacing: '0.1em' }}>{date}</p>
    </Reveal>
  )
}
