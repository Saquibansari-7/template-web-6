import { useState, useEffect } from 'react'
import Reveal from '../common/Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'
import { useRipple } from '../common/useRipple.js'
import { addBlessing, getBlessings } from '../../lib/data.js'

export default function Dua() {
  const ripple = useRipple()
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [duas, setDuas] = useState([])

  useEffect(() => {
    getBlessings().then(setDuas).catch(() => {})
  }, [])

  const submit = async (e) => {
    e.preventDefault()
    if (!name.trim() || !text.trim()) return
    const dua = { id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, name: name.trim(), text: text.trim(), date: new Date().toLocaleDateString() }
    try {
      await addBlessing(dua)
    } catch (err) {
      console.error('[Dua] submit failed', err)
    }
    setName(''); setText(''); setSubmitted(true)
    setDuas((prev) => [dua, ...prev])
  }

  return (
    <section id="dua" style={{ padding: '6rem 1.5rem', background: 'linear-gradient(180deg, transparent 0%, rgba(201,168,76,0.03) 50%, transparent 100%)' }}>
      <div className="section-inner section-inner--narrow">
        <SectionHeading arabic="الدعاء والمهر" title="Mahr & Blessings" />

        <Reveal className="glass-card" style={{ padding: '2.5rem', marginBottom: '3rem', textAlign: 'center' }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 500, color: 'var(--gold)', marginBottom: '1rem' }}>
            The Mahr
          </h3>
          <p style={{ color: 'rgba(245,240,232,0.7)', lineHeight: 1.8, fontSize: '0.95rem', maxWidth: 600, margin: '0 auto 1.5rem' }}>
            In accordance with the Sunnah of our beloved Prophet Muhammad (peace be upon him), the mahr is a gift from the
            groom to the bride — a symbol of his commitment, respect, and responsibility. It is her right, entirely hers
            to keep and use as she wills.
          </p>
        </Reveal>

        <Reveal delay={1} style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ fontFamily: "'Amiri', serif", fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', color: 'var(--gold)', lineHeight: 2, letterSpacing: '0.05em' }}>
            بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
          </p>
          <p style={{ color: 'rgba(245,240,232,0.5)', fontSize: '0.85rem', marginTop: '1rem', fontStyle: 'italic' }}>
            "May Allah bless you and bless you both, and join you together in goodness."
          </p>
        </Reveal>

        <Reveal delay={2} className="glass-card" style={{ padding: '2.5rem' }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', fontWeight: 500, color: 'var(--ivory)', textAlign: 'center', marginBottom: '1.5rem' }}>
            Leave a Blessing
          </h3>

          {submitted ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <p style={{ fontFamily: "'Amiri', serif", fontSize: '1.3rem', color: 'var(--gold)', marginBottom: '0.5rem' }}>جزاك الله خيراً</p>
              <p style={{ color: 'rgba(245,240,232,0.7)' }}>May Allah reward you with goodness. Your blessing has been received.</p>
            </div>
          ) : (
            <form onSubmit={submit}>
              <div style={{ marginBottom: '1rem' }}>
                <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <textarea rows="4" placeholder="Write your du'a or blessing for Ahmad & Zara..." value={text} onChange={(e) => setText(e.target.value)} required />
              </div>
              <div style={{ textAlign: 'center' }}>
                <button
                  type="submit"
                  className="ripple-btn"
                  onClick={ripple}
                  style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))', color: 'var(--midnight)', border: 'none', padding: '0.875rem 3rem', borderRadius: 50, fontFamily: "'Jost', sans-serif", fontWeight: 500, fontSize: '0.95rem', letterSpacing: '0.1em' }}
                >
                  Send Blessing
                </button>
              </div>
            </form>
          )}
        </Reveal>

        {duas.length > 0 && (
          <div style={{ marginTop: '2rem' }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', color: 'var(--gold)', textAlign: 'center', marginBottom: '1.5rem' }}>Blessings Received</h3>
            {duas.map((d, i) => (
              <div key={i} className="dua-card" style={{ marginBottom: '1rem' }}>
                <p style={{ color: 'rgba(245,240,232,0.8)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '0.5rem' }}>"{d.text}"</p>
                <p style={{ color: 'var(--gold)', fontSize: '0.8rem' }}>— {d.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
