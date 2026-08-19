import Reveal from '../common/Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'
import { googleMapsEmbed, googleMapsDirections, googleMapsDirectionsQuery } from '../../lib/utils.js'

export default function Location({ location }) {
  const lat = parseFloat(location?.lat)
  const lng = parseFloat(location?.lng)
  const hasCoords = !isNaN(lat) && !isNaN(lng)
  const dest = hasCoords ? `${lat},${lng}` : encodeURIComponent([location?.venue, location?.address, location?.city].filter(Boolean).join(', ') || 'venue')
  const directionsHref = hasCoords ? googleMapsDirections(lat, lng) : googleMapsDirectionsQuery(dest)

  return (
    <section id="location" style={{ padding: '6rem 1.5rem' }}>
      <div className="section-inner section-inner--narrow">
        <SectionHeading arabic="الموقع" title="Location" />

        <Reveal className="location-card">
          <div className="location-info">
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', fontWeight: 500, color: 'var(--gold)', marginBottom: '1rem' }}>
              {location?.venue}
            </h3>
            <p style={{ color: 'rgba(245,240,232,0.7)', marginBottom: '0.3rem' }}>{location?.address}</p>
            <p style={{ color: 'rgba(245,240,232,0.7)', marginBottom: '1.5rem' }}>{location?.city}</p>
            <p style={{ color: 'rgba(245,240,232,0.5)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{location?.phone}</p>
            <a id="location-directions" href={directionsHref} target="_blank" rel="noopener" className="ripple-btn location-directions">
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <svg viewBox="0 0 20 20" style={{ width: 16, height: 16 }}>
                  <path d="M10 2 C6.5 2 4 4.5 4 8 c0 4 6 10 6 10 s6-6 6-10 c0-3.5-2.5-6-6-6 Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
                  <circle cx="10" cy="8" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.2" />
                </svg>
                Get Directions
              </span>
            </a>
          </div>

          <div className="location-map" id="location-map">
            {hasCoords ? (
              <iframe
                title="Wedding venue map"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={googleMapsEmbed(lat, lng)}
                style={{ width: '100%', height: '100%', border: 0, borderRadius: 12 }}
              />
            ) : (
              <p style={{ color: 'rgba(245,240,232,0.5)', fontSize: '0.9rem', textAlign: 'center', padding: '2rem' }}>
                Add venue coordinates in the admin panel to show an interactive map.
              </p>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
