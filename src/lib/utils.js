export function googleMapsEmbed(lat, lng) {
  const q = `${lat},${lng}`
  return `https://www.google.com/maps?q=${encodeURIComponent(q)}&z=15&output=embed`
}

export function googleMapsDirections(lat, lng) {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
}

export function googleMapsDirectionsQuery(dest) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(dest)}`
}

export function formatDateTimeLocal(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  if (isNaN(d.getTime())) return ''
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

export function formatWeddingDate(iso, opts) {
  if (!iso) return ''
  const d = new Date(iso)
  if (isNaN(d.getTime())) return ''
  const options = opts || { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }
  return d.toLocaleDateString('en-US', options)
}
