/** Reusable Arabic-labeled section heading with arabesque divider. */
export default function SectionHeading({ arabic, title, id }) {
  return (
    <div className="reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
      <p style={{ fontFamily: "'Amiri', serif", fontSize: '1.1rem', color: 'var(--gold)', letterSpacing: '0.2em', marginBottom: '1rem' }}>
        {arabic}
      </p>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 300, color: 'var(--ivory)' }}>
        {title}
      </h2>
      <ArabesqueDivider />
    </div>
  )
}

export function ArabesqueDivider() {
  return (
    <svg className="arabesque-divider" viewBox="0 0 200 30">
      <path d="M0 15 Q25 5 50 15 T100 15 T150 15 T200 15" fill="none" stroke="#C9A84C" strokeWidth="0.8" opacity="0.5" />
      <circle cx="100" cy="15" r="3" fill="#C9A84C" opacity="0.5" />
    </svg>
  )
}
