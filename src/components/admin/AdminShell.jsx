import { useState } from 'react'

const NAV = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'settings', label: 'Settings' },
  { key: 'story', label: 'Our Story' },
  { key: 'ceremony', label: 'Ceremony' },
  { key: 'location', label: 'Location & Map' },
  { key: 'party', label: 'Wedding Party' },
  { key: 'guidelines', label: 'Guidelines' },
  { key: 'sections', label: 'Sections' },
  { key: 'gallery', label: 'Gallery' },
  { key: 'duas', label: 'Blessings (Du\'as)' }
]

export default function AdminShell({ onLogout, children, active, onNavigate }) {
  const [open, setOpen] = useState(false)

  const go = (key) => {
    onNavigate(key)
    setOpen(false)
  }

  return (
    <div className="admin-layout">
      <div className="mobile-header">
        <button className="hamburger" onClick={() => setOpen((o) => !o)} aria-label="Menu">☰</button>
        <span className="mobile-title">Admin Panel</span>
      </div>

      {open && <div className="sidebar-backdrop" onClick={() => setOpen(false)} aria-hidden="true" />}

      <nav className={`sidebar ${open ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Ahmad & Zara</h2>
          <p style={{ fontSize: '0.75rem', color: 'rgba(245,240,232,0.5)' }}>Nikah Ceremony • Admin</p>
        </div>
        {NAV.map((n) => (
          <div
            key={n.key}
            className={`nav-item ${active === n.key ? 'active' : ''}`}
            onClick={() => go(n.key)}
          >
            {n.label}
          </div>
        ))}
        <div style={{ padding: '1.5rem', marginTop: '2rem' }}>
          <button onClick={resetData} className="btn btn-danger" style={{ width: '100%', marginTop: '0.75rem' }}>Reset to Defaults</button>
          <button onClick={onLogout} className="btn btn-danger" style={{ width: '100%', marginTop: '1rem' }}>Logout</button>
        </div>
      </nav>

      <main className="main-content">
        {children}
      </main>
    </div>
  )
}

function resetData() {
  // Handled by parent via window custom event for simplicity
  window.dispatchEvent(new CustomEvent('admin-reset'))
}
