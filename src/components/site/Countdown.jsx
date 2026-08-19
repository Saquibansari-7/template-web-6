import { useEffect, useState } from 'react'
import Reveal from '../common/Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'
import { formatWeddingDate } from '../../lib/utils.js'

export default function Countdown({ date }) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const ts = new Date(date).getTime()
    if (isNaN(ts)) return
    const tick = () => {
      const diff = ts - Date.now()
      if (diff <= 0) { setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return }
      setTime({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000)
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [date])

  const cells = [
    { label: 'Days', value: String(time.days).padStart(2, '0') },
    { label: 'Hours', value: String(time.hours).padStart(2, '0') },
    { label: 'Minutes', value: String(time.minutes).padStart(2, '0') },
    { label: 'Seconds', value: String(time.seconds).padStart(2, '0') }
  ]

  return (
    <section id="countdown" style={{ padding: '6rem 1.5rem' }}>
      <div className="section-inner section-inner--narrow" style={{ textAlign: 'center' }}>
        <SectionHeading arabic="العد التنازلي" title="Until Our Nikah" />

        <Reveal className="countdown-row">
          {cells.map((c) => (
            <div key={c.label} style={{ textAlign: 'center' }}>
              <div className="flip-card">
                <div className="flip-card-inner">
                  <span className="flip-number">{c.value}</span>
                </div>
              </div>
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginTop: '0.75rem' }}>
                {c.label}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
