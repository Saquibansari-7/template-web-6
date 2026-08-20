import { useAdminData } from './useAdminData.js'
import { formatDateTimeLocal } from '../../lib/utils.js'
import { toast } from '../../lib/toast.js'

export { toast }

export function Dashboard({ data }) {
  const d = data || {}
  const stats = [
    { label: 'Story Events', value: d.story?.length || 0 },
    { label: 'Party Members', value: d.party?.length || 0 },
    { label: 'Gallery Photos', value: d.gallery?.length || 0 },
    { label: 'Blessings', value: d.blessings?.length || 0 }
  ]
  const recent = [...(d.blessings || [])].slice(-3).reverse()

  return (
    <>
      <div className="content-header"><h1>Dashboard</h1></div>
      <div className="stats-grid">
        {stats.map((s) => (
          <div className="stat-card" key={s.label}>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="card">
        <h3 style={{ marginBottom: '1rem' }}>Recent Blessings</h3>
        {recent.length ? (
          recent.map((dua, i) => (
            <div key={i} style={{ marginBottom: '0.75rem' }}>
              <strong>{dua.name}</strong>
              <br />
              <span style={{ color: 'rgba(245,240,232,0.7)' }}>{dua.text?.substring(0, 80)}...</span>
            </div>
          ))
        ) : (
          <p style={{ color: 'rgba(245,240,232,0.5)' }}>No blessings yet</p>
        )}
      </div>
    </>
  )
}

export function Settings({ data, update }) {
  const s = data.settings || {}
  const onSubmit = (e) => {
    e.preventDefault()
    update((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        groom: e.target.groom.value,
        bride: e.target.bride.value,
        date: e.target.date.value,
        location: e.target.location.value,
        tagline: e.target.tagline.value
      }
    }))
    toast('Settings saved!')
  }

  return (
    <>
      <div className="content-header"><h1>Website Settings</h1></div>
      <div className="card">
        <form onSubmit={onSubmit}>
          <div className="form-grid-2">
            <Field label="Groom's Name" name="groom" defaultValue={s.groom} />
            <Field label="Bride's Name" name="bride" defaultValue={s.bride} />
          </div>
          <div className="form-grid-2">
            <Field label="Wedding Date & Time" name="date" type="datetime-local" defaultValue={formatDateTimeLocal(s.date)} />
            <Field label="Location" name="location" defaultValue={s.location} />
          </div>
          <Field label="Tagline" name="tagline" defaultValue={s.tagline} />
          <button type="submit" className="btn btn-primary">Save Settings</button>
        </form>
      </div>
    </>
  )
}

function Field({ label, name, defaultValue, type = 'text' }) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input type={type} name={name} defaultValue={defaultValue || ''} />
    </div>
  )
}
