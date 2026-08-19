import { useState } from 'react'
import { login } from '../../lib/data.js'

export default function Login({ onSuccess }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (login(password.trim())) {
      onSuccess()
    } else {
      setError(true)
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Admin Panel</h1>
        <p style={{ color: 'rgba(245,240,232,0.6)', marginBottom: '2rem' }}>Ahmad & Zara Nikah</p>
        <form onSubmit={submit}>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(false) }}
            onKeyDown={(e) => { if (e.key === 'Enter') submit(e) }}
          />
          <button type="submit">Sign In</button>
          {error && <p className="login-error" style={{ display: 'block' }}>Incorrect password. <strong>admin123</strong></p>}
        </form>
      </div>
    </div>
  )
}
