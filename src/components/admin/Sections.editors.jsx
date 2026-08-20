import { useState } from 'react'
import { toast, Dashboard, Settings } from './Sections.jsx'
import { googleMapsEmbed } from '../../lib/utils.js'
import { uploadImage } from '../../lib/data.js'

export { Dashboard, Settings }

/* ---------------- Story ---------------- */
export function Story({ data, update }) {
  const story = data.story || []
  const save = (e) => {
    e.preventDefault()
    const item = { year: e.target.year.value, title: e.target.title.value, description: e.target.description.value }
    update((prev) => ({ ...prev, story: [...prev.story, item] }))
    e.target.reset()
    toast('Story event added')
  }
  return (
    <>
      <div className="content-header"><h1>Our Story</h1><button className="btn btn-primary" onClick={() => document.getElementById('story-form').scrollIntoView({ behavior: 'smooth' })}>+ Add Event</button></div>
      <div className="card">
        <table className="data-table">
          <thead><tr><th>Year</th><th>Title</th><th>Description</th><th></th></tr></thead>
          <tbody>
            {story.map((it, i) => (
              <tr key={i}>
                <td>{it.year}</td><td>{it.title}</td><td>{it.description?.substring(0, 60)}...</td>
                <td><button className="btn btn-danger btn-sm" onClick={() => { update((p) => ({ ...p, story: p.story.filter((_, j) => j !== i) })); toast('Deleted') }}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card">
        <form id="story-form" onSubmit={save}>
          <div className="form-group"><label>Year</label><input name="year" required /></div>
          <div className="form-group"><label>Title</label><input name="title" required /></div>
          <div className="form-group"><label>Description</label><textarea name="description" rows="4" required /></div>
          <button className="btn btn-primary" type="submit">Add Event</button>
        </form>
      </div>
    </>
  )
}

/* ---------------- Ceremony ---------------- */
export function Ceremony({ data, update }) {
  const c = data.ceremony || {}
  const save = (key, e) => {
    e.preventDefault()
    update((prev) => ({
      ...prev,
      ceremony: { ...prev.ceremony, [key]: { venue: e.target.venue.value, address: e.target.address.value, date: e.target.date.value, info: e.target.info.value } }
    }))
    toast(`${key} saved`)
  }
  return (
    <>
      <div className="content-header"><h1>Ceremony Details</h1></div>
      <CeremonyForm title="Nikah" data={c.nikah} onSave={(e) => save('nikah', e)} />
      <CeremonyForm title="Walima" data={c.walima} onSave={(e) => save('walima', e)} />
    </>
  )
}
function CeremonyForm({ title, data = {}, onSave }) {
  return (
    <div className="card">
      <h3 style={{ marginBottom: '1rem' }}>{title}</h3>
      <form onSubmit={onSave}>
        <div className="form-grid-auto">
          <div className="form-group"><label>Venue</label><input name="venue" defaultValue={data.venue || ''} /></div>
          <div className="form-group"><label>Address</label><input name="address" defaultValue={data.address || ''} /></div>
          <div className="form-group"><label>Date & Time</label><input name="date" defaultValue={data.date || ''} /></div>
        </div>
        <div className="form-group"><label>Additional Info</label><textarea name="info" rows="2" defaultValue={data.info || ''} /></div>
        <button className="btn btn-primary" type="submit">Save {title}</button>
      </form>
    </div>
  )
}

/* ---------------- Location ---------------- */
export function Location({ data, update }) {
  const loc = data.location || {}
  const [preview, setPreview] = useState(null)
  const save = (e) => {
    e.preventDefault()
    update((prev) => ({
      ...prev,
      location: {
        venue: e.target.venue.value.trim(),
        address: e.target.address.value.trim(),
        city: e.target.city.value.trim(),
        phone: e.target.phone.value.trim(),
        lat: e.target.lat.value.trim(),
        lng: e.target.lng.value.trim()
      }
    }))
    toast('Location & map settings saved!')
  }
  const previewMap = () => {
    const lat = parseFloat(loc.lat); const lng = parseFloat(loc.lng)
    if (isNaN(lat) || isNaN(lng)) { setPreview({ error: true }); return }
    setPreview({ src: googleMapsEmbed(lat, lng) })
  }
  return (
    <>
      <div className="content-header"><h1>Location & Map</h1></div>
      <div className="card">
        <form onSubmit={save}>
          <Field label="Venue Name" name="venue" defaultValue={loc.venue} />
          <Field label="Address Line 1" name="address" defaultValue={loc.address} />
          <Field label="City / Area" name="city" defaultValue={loc.city} />
          <Field label="Phone" name="phone" defaultValue={loc.phone} />

          <hr style={{ borderColor: 'rgba(201,168,76,0.2)', margin: '1.5rem 0' }} />
          <h4 style={{ marginBottom: '0.75rem', color: 'var(--gold)' }}>Interactive Map (Google Maps)</h4>
          <p style={{ fontSize: '0.8rem', color: 'rgba(245,240,232,0.5)', marginBottom: '1rem' }}>
            Enter the venue's real coordinates. A live Google map appears on the public site — no API key required.
          </p>
          <div className="form-grid-2">
            <Field label="Latitude" name="lat" defaultValue={loc.lat} />
            <Field label="Longitude" name="lng" defaultValue={loc.lng} />
          </div>
          <div className="form-group">
            <button type="button" className="btn btn-secondary" onClick={previewMap}>Preview Map</button>
          </div>
          {preview && (
            <div style={{ border: '1px solid rgba(201,168,76,0.2)', borderRadius: 12, overflow: 'hidden', minHeight: 240, marginTop: '0.5rem', background: 'rgba(245,240,232,0.03)' }}>
              {preview.error
                ? <p style={{ color: 'rgba(245,240,232,0.6)', fontSize: '0.9rem', textAlign: 'center', padding: '2rem' }}>Enter valid latitude and longitude to preview the map.</p>
                : <iframe title="Map preview" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={preview.src} style={{ width: '100%', height: 260, border: 0 }} />}
            </div>
          )}
          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>Save Location</button>
        </form>
      </div>
    </>
  )
}
function Field({ label, name, defaultValue }) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input name={name} defaultValue={defaultValue || ''} />
    </div>
  )
}

/* ---------------- Party ---------------- */
export function Party({ data, update }) {
  const party = data.party || []
  const save = (e) => {
    e.preventDefault()
    update((prev) => ({ ...prev, party: [...prev.party, { name: e.target.name.value, role: e.target.role.value }] }))
    e.target.reset()
    toast('Party member added')
  }
  return (
    <>
      <div className="content-header"><h1>Wedding Party</h1></div>
      <div className="card">
        <table className="data-table">
          <thead><tr><th>Name</th><th>Role</th><th></th></tr></thead>
          <tbody>
            {party.map((p, i) => (
              <tr key={i}>
                <td>{p.name}</td><td>{p.role}</td>
                <td><button className="btn btn-danger btn-sm" onClick={() => { update((prev) => ({ ...prev, party: prev.party.filter((_, j) => j !== i) })); toast('Deleted') }}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card">
        <form onSubmit={save}>
          <div className="form-group"><label>Name</label><input name="name" required /></div>
          <div className="form-group"><label>Role</label><input name="role" required /></div>
          <button className="btn btn-primary" type="submit">Add Member</button>
        </form>
      </div>
    </>
  )
}

/* ---------------- Guidelines ---------------- */
export function Guidelines({ data, update }) {
  const list = data.guidelines || []
  const save = (e) => {
    e.preventDefault()
    update((prev) => ({ ...prev, guidelines: [...prev.guidelines, { title: e.target.title.value, description: e.target.description.value }] }))
    e.target.reset()
    toast('Guideline added')
  }
  return (
    <>
      <div className="content-header"><h1>Guest Guidelines</h1></div>
      <div className="card">
        <table className="data-table">
          <thead><tr><th>Title</th><th>Description</th><th></th></tr></thead>
          <tbody>
            {list.map((g, i) => (
              <tr key={i}>
                <td>{g.title}</td><td>{g.description?.substring(0, 60)}...</td>
                <td><button className="btn btn-danger btn-sm" onClick={() => { update((prev) => ({ ...prev, guidelines: prev.guidelines.filter((_, j) => j !== i) })); toast('Deleted') }}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card">
        <form onSubmit={save}>
          <div className="form-group"><label>Title</label><input name="title" required /></div>
          <div className="form-group"><label>Description</label><textarea name="description" rows="4" required /></div>
          <button className="btn btn-primary" type="submit">Add Guideline</button>
        </form>
      </div>
    </>
  )
}

/* ---------------- Section Toggles ---------------- */
export function Sections({ data, update }) {
  const secs = data.sections || {}
  const labels = {
    story: 'Our Story', ceremony: 'Ceremony Details', countdown: 'Countdown Timer',
    dua: 'Mahr & Blessings', party: 'Wedding Party', guidelines: 'Guest Guidelines',
    gallery: 'Photo Gallery', location: 'Location & Map'
  }
  const toggle = (key, val) => {
    update((prev) => ({ ...prev, sections: { ...prev.sections, [key]: val } }))
    toast(val ? 'Section turned ON' : 'Section turned OFF')
  }
  return (
    <>
      <div className="content-header"><h1>Website Sections</h1></div>
      <div className="card">
        <p style={{ color: 'rgba(245,240,232,0.6)', marginBottom: '1.25rem', fontSize: '0.9rem' }}>
          Toggle sections on or off. Changes appear instantly on the public site (refresh or open in another tab).
        </p>
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {Object.keys(labels).map((key) => (
            <div className="section-toggle-row" key={key}>
              <label>{labels[key]}</label>
              <label className="admin-toggle">
                <input type="checkbox" checked={secs[key] !== false} onChange={(e) => toggle(key, e.target.checked)} />
                <span className="slider" />
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="card" style={{ marginTop: '1rem' }}>
        <p style={{ color: 'rgba(245,240,232,0.5)', fontSize: '0.85rem' }}>
          Hero and Footer are always visible for best experience.
        </p>
      </div>
    </>
  )
}

/* ---------------- Gallery ---------------- */
export function Gallery({ data, update }) {
  const gallery = data.gallery || []
  const [file, setFile] = useState(null)
  const [caption, setCaption] = useState('')
  const [uploading, setUploading] = useState(false)

  const onPick = (e) => {
    const f = e.target.files && e.target.files[0]
    setFile(f || null)
    setCaption(f ? f.name.replace(/\.[^/.]+$/, '') : '')
  }

  const doUpload = async () => {
    if (!file) return
    setUploading(true)
    try {
      const url = await uploadImage(file)
      update((prev) => ({ ...prev, gallery: [...prev.gallery, { url, caption: caption.trim() }] }))
      toast('Image uploaded')
      setFile(null)
      setCaption('')
    } catch (err) {
      toast(err.message || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const remove = (i) => {
    update((prev) => ({ ...prev, gallery: prev.gallery.filter((_, j) => j !== i) }))
    toast('Image deleted')
  }

  return (
    <>
      <div className="content-header"><h1>Photo Gallery</h1></div>
      <div className="card">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center', marginBottom: '1.5rem' }}>
          <input type="file" accept="image/*" onChange={onPick} style={{ color: 'var(--ivory)', fontSize: '0.85rem' }} />
          <input
            type="text"
            placeholder="Caption (optional)"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            style={{ flex: '1 1 200px', padding: '0.6rem 0.8rem', background: 'rgba(245,240,232,0.05)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 8, color: 'var(--ivory)' }}
          />
          <button className="btn btn-primary" onClick={doUpload} disabled={!file || uploading}>
            {uploading ? 'Uploading…' : 'Upload Photo'}
          </button>
        </div>
        <div className="gallery-grid-admin">
          {gallery.map((item, i) => (
            <div className="gallery-item-admin" key={i}>
              <img src={item.url} alt="" />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.6)', padding: '4px 8px', fontSize: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>{item.caption || ''}</span>
                <button onClick={() => remove(i)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>×</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

/* ---------------- Du'as ---------------- */
export function Duas({ duas, remove }) {
  return (
    <>
      <div className="content-header"><h1>Blessings (Du'as)</h1></div>
      <div className="stats-grid">
        <div className="stat-card"><div className="stat-value">{duas.length}</div><div className="stat-label">Total Blessings</div></div>
      </div>
      <div className="card">
        <table className="data-table">
          <thead><tr><th>Name</th><th>Message</th><th>Date</th><th></th></tr></thead>
          <tbody>
            {duas.length ? duas.map((d, i) => (
              <tr key={i}>
                <td>{d.name}</td><td>{d.text?.substring(0, 50)}...</td><td>{d.date}</td>
                <td><button className="btn btn-danger btn-sm" onClick={() => remove(d.id)}>Delete</button></td>
              </tr>
            )) : (
              <tr><td colSpan="4" style={{ textAlign: 'center', padding: '2rem', color: 'rgba(245,240,232,0.5)' }}>No blessings</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}
