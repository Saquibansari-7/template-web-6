import React from 'react'
import { createRoot } from 'react-dom/client'
import '../styles/admin.css'
import AdminApp from './AdminApp.jsx'

createRoot(document.getElementById('admin-root')).render(
  <React.StrictMode>
    <AdminApp />
  </React.StrictMode>
)
