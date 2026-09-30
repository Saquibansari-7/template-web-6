const API_URL = 'https://weddappvows.vercel.app/api/site/lookup'
const SUBDOMAIN_REGEX = /^[a-z0-9](?:[a-z0-9-]{0,58}[a-z0-9])?$/

export async function resolveSite(customerSubdomain) {
  let subdomain = (customerSubdomain || '').trim().toLowerCase()
  if (!subdomain) return null

  if (!SUBDOMAIN_REGEX.test(subdomain)) {
    console.warn('[siteResolver] invalid subdomain format:', customerSubdomain)
    return null
  }

  try {
    const res = await fetch(`${API_URL}?customer=${encodeURIComponent(subdomain)}`)
    if (!res.ok) {
      console.warn('[siteResolver] site not found or inactive:', subdomain, 'status:', res.status)
      return null
    }
    const site = await res.json()
    if (!site || !site.data) {
      console.warn('[siteResolver] empty site data for:', subdomain)
      return null
    }
    if ((site.subdomain || '').toLowerCase() !== subdomain) {
      console.warn('[siteResolver] rejected partial/non-exact match for:', subdomain, 'got:', site.subdomain)
      return null
    }
    console.log('[siteResolver] loaded site:', subdomain)
    return site
  } catch (err) {
    console.error('[siteResolver] fetch failed:', err)
    return null
  }
}
