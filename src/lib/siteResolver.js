const SUBDOMAIN_REGEX = /^[a-z0-9](?:[a-z0-9-]{0,58}[a-z0-9])?$/

export async function resolveSite(customerSubdomain) {
  let subdomain = (customerSubdomain || '').trim().toLowerCase()
  if (!subdomain) return null

  if (!SUBDOMAIN_REGEX.test(subdomain)) {
    console.warn('[siteResolver] invalid subdomain format:', customerSubdomain)
    return null
  }

  const url = (import.meta.env.VITE_PUBLIC_SUPABASE_URL || '').trim()
  const key = (import.meta.env.VITE_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '').trim()
  if (!url || !key) {
    console.warn('[siteResolver] Supabase not configured')
    return null
  }

  try {
    const res = await fetch(
      `${url}/rest/v1/sites?subdomain=eq.${encodeURIComponent(subdomain)}&select=*&limit=1`,
      { headers: { apikey: key, Authorization: `Bearer ${key}` } }
    )

    if (!res.ok) {
      console.warn('[siteResolver] HTTP', res.status)
      return null
    }

    const rows = await res.json()
    if (!rows || !rows.length) {
      console.warn('[siteResolver] no site found for:', subdomain)
      return null
    }

    const site = rows[0]
    if ((site.subdomain || '').toLowerCase() !== subdomain) {
      console.warn('[siteResolver] rejected non-exact match for:', subdomain, 'got:', site.subdomain)
      return null
    }

    console.log('[siteResolver] loaded site:', subdomain)
    return site
  } catch (err) {
    console.error('[siteResolver] fetch failed:', err)
    return null
  }
}
