export function toast(msg) {
  let el = document.getElementById('admin-toast')
  if (!el) {
    el = document.createElement('div')
    el.id = 'admin-toast'
    el.className = 'toast'
    document.body.appendChild(el)
  }
  el.textContent = msg
  el.classList.add('show')
  setTimeout(() => el.classList.remove('show'), 2600)
}
