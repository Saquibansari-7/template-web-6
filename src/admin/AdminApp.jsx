import { useState } from 'react'
import { isLoggedIn, logout } from '../lib/data.js'
import { useAdminData } from '../components/admin/useAdminData.js'
import AdminShell from '../components/admin/AdminShell.jsx'
import Login from '../components/admin/Login.jsx'
import {
  Dashboard, Settings, Story, Ceremony, Location, Party, Guidelines, Sections, Gallery, Duas
} from '../components/admin/Sections.editors.jsx'

export default function AdminApp() {
  const [auth, setAuth] = useState(isLoggedIn())
  const [active, setActive] = useState('dashboard')
  const { data, site, update, blessings, removeBlessing } = useAdminData()

  if (!auth) return <Login onSuccess={() => setAuth(true)} />
  if (!data) return <div className="login-container" />

  const render = () => {
    switch (active) {
      case 'dashboard': return <Dashboard data={data} />
      case 'settings': return <Settings data={data} update={update} />
      case 'story': return <Story data={data} update={update} />
      case 'ceremony': return <Ceremony data={data} update={update} />
      case 'location': return <Location data={data} update={update} />
      case 'party': return <Party data={data} update={update} />
      case 'guidelines': return <Guidelines data={data} update={update} />
      case 'sections': return <Sections data={data} update={update} />
      case 'gallery': return <Gallery data={data} update={update} site={site} />
      case 'duas': return <Duas duas={blessings} remove={removeBlessing} />
      default: return <Dashboard data={data} />
    }
  }

  return (
    <AdminShell active={active} onNavigate={setActive} onLogout={() => { logout(); setAuth(false) }}>
      {render()}
    </AdminShell>
  )
}
