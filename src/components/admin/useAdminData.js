import { useEffect, useState, useCallback, useRef } from 'react'
import {
  getContent,
  saveContent,
  loadContentByCustomer,
  saveContentToSite,
  subscribeToContent,
} from '../../lib/data.js'
import { DEFAULT_CONTENT } from '../../lib/defaults.js'
import { toast } from '../../lib/toast.js'

export function useAdminData() {
  const [data, setData] = useState(null)
  const [site, setSite] = useState(null)
  const siteRef = useRef(site)

  useEffect(() => {
    siteRef.current = site
  }, [site])

  const reload = useCallback(async () => {
    const content = await getContent(siteRef.current?.subdomain)
    setData(content)
  }, [])

  useEffect(() => {
    let active = true
    let unsubscribe = () => {}

    const init = async () => {
      try {
        const params = new URLSearchParams(window.location.search)
        const customer = params.get('customer')

        let resolvedSite = null
        let content = null

        if (customer && customer.trim()) {
          const result = await loadContentByCustomer(customer.trim())
          if (result) {
            resolvedSite = result.site
            content = result.content
          } else if (active) {
            console.warn('[useAdminData] customer not found, loading default')
            content = await getContent()
          }
        } else {
          content = await getContent()
        }

        if (active) {
          setData(content)
          setSite(resolvedSite)

          const filter = resolvedSite
            ? `subdomain=eq.${encodeURIComponent(resolvedSite.subdomain)}`
            : undefined
          const table = resolvedSite ? 'sites' : undefined

          unsubscribe = subscribeToContent(
            () => {
              getContent(siteRef.current?.subdomain)
                .then((c) => active && setData(c))
                .catch(() => {})
            },
            filter,
            table
          )
        }
      } catch (err) {
        console.error('[useAdminData]', err)
      }
    }

    init()

    const handleReset = () => reload().catch(() => {})
    window.addEventListener('admin-reset-event', handleReset)

    return () => {
      active = false
      unsubscribe()
      window.removeEventListener('admin-reset-event', handleReset)
    }
  }, [reload])

  const update = useCallback(async (mutator) => {
    setData((prev) => {
      const next = typeof mutator === 'function' ? mutator(prev) : { ...prev, ...mutator }
      if (site) {
        saveContentToSite(site.subdomain, next).catch((err) => toast(err.message || 'Save failed'))
      } else {
        saveContent(next).catch((err) => toast(err.message || 'Save failed'))
      }
      return next
    })
  }, [site])

  const addBlessing = useCallback((blessing) => {
    update((prev) => ({
      ...prev,
      blessings: [blessing, ...(prev.blessings || [])],
    }))
  }, [update])

  const removeBlessing = useCallback((id) => {
    update((prev) => ({
      ...prev,
      blessings: (prev.blessings || []).filter((b) => b.id !== id),
    }))
  }, [update])

  const doReset = useCallback(async () => {
    if (site) {
      const fresh = await saveContentToSite(site.subdomain, structuredClone(DEFAULT_CONTENT))
      setData(fresh)
    } else {
      const fresh = await resetContent()
      setData(fresh)
    }
  }, [site])

  const blessings = data?.blessings || []

  return { data, site, update, addBlessing, removeBlessing, blessings, reset: doReset }
}
