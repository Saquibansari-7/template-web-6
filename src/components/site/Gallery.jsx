import { useState } from 'react'
import Reveal from '../common/Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'
import Lightbox from '../common/Lightbox.jsx'

const PLACEHOLDER_GRADIENTS = [
  'linear-gradient(135deg, #1A2A3A 0%, #2A3A4A 30%, #3A2A1A 70%, #1A1A0A 100%)',
  'linear-gradient(135deg, #2A1A2A 0%, #3A1A2A 50%, #1A0A1A 100%)',
  'linear-gradient(135deg, #1A3A2A 0%, #2A5A3A 50%, #1A2A1A 100%)',
  'linear-gradient(135deg, #3A2A1A 0%, #4A3A2A 40%, #2A1A0A 100%)',
  'linear-gradient(135deg, #2A2A3A 0%, #3A3A4A 50%, #1A1A2A 100%)',
  'linear-gradient(135deg, #3A1A1A 0%, #4A2A2A 50%, #2A0A0A 100%)',
  'linear-gradient(135deg, #1A2A3A 0%, #2A3A3A 30%, #3A3A2A 60%, #2A2A1A 100%)',
  'linear-gradient(135deg, #2A1A3A 0%, #3A2A4A 50%, #1A0A2A 100%)',
  'linear-gradient(135deg, #1A3A3A 0%, #2A4A4A 50%, #0A2A2A 100%)',
  'linear-gradient(135deg, #3A3A1A 0%, #4A4A2A 50%, #2A2A0A 100%)',
  'linear-gradient(135deg, #1A1A3A 0%, #2A2A4A 50%, #0A0A2A 100%)'
]

export default function Gallery({ gallery = [] }) {
  const [lightbox, setLightbox] = useState(null)

  const items = gallery.length
    ? gallery.map((g) => ({ type: 'image', url: g.url, caption: g.caption }))
    : PLACEHOLDER_GRADIENTS.map((g, i) => ({ type: 'placeholder', gradient: g, key: i }))

  const spans = [
    { row: 2 }, {}, {}, { row: 2 }, {}, {}, { col: 2 }, {}, {}, {}
  ]

  return (
    <section id="gallery" style={{ padding: '6rem 1.5rem' }}>
      <div className="section-inner">
        <SectionHeading arabic="معرض الصور" title="Gallery" />

        <div className="gallery-grid">
          {items.slice(0, 11).map((item, i) => {
            const span = spans[i] || {}
            const style = {
              ...(span.row ? { gridRow: 'span 2' } : {}),
              ...(span.col ? { gridColumn: 'span 2' } : {})
            }
            return (
              <Reveal
                key={item.key ?? i}
                className="gallery-item"
                style={style}
                onClick={() => item.type === 'image' && setLightbox(item.url)}
              >
                <div className="gallery-border" />
                <div style={{ width: '100%', height: '100%', ...(item.type === 'image' ? { backgroundImage: `url(${item.url})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: 8 } : { background: item.gradient, borderRadius: 8 }) }} />
              </Reveal>
            )
          })}
        </div>
      </div>

      <Lightbox src={lightbox} onClose={() => setLightbox(null)} />
    </section>
  )
}
