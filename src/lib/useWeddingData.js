import { useEffect, useState } from 'react'
import { getContent, loadContentByCustomer, subscribeToContent } from './data.js'

export function useWeddingData() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    let unsubscribe = () => {}
    let currentSiteId

    const params = new URLSearchParams(window.location.search)
    const customer = params.get('customer')
    const isCustomer = Boolean(customer && customer.trim())

    const load = async () => {
      try {
        let content
        if (isCustomer) {
          const result = await loadContentByCustomer(customer.trim())
          if (result) {
            content = result.content
            currentSiteId = result.site.id
          } else {
            console.warn('[useWeddingData] customer not found, using default site')
            content = await getContent()
          }
        } else {
          content = await getContent()
        }
        if (active) setData(content)
      } catch (err) {
        console.error('[useWeddingData]', err)
        if (active) setData(null)
      } finally {
        if (active) setLoading(false)
      }
    }

    load()

    const table = isCustomer ? 'sites' : undefined
    const filter = isCustomer ? `subdomain=eq.${encodeURIComponent(customer.trim())}` : undefined

    unsubscribe = subscribeToContent(
      () => {
        getContent(currentSiteId)
          .then((content) => active && setData(content))
          .catch(() => {})
      },
      filter,
      table
    )

    return () => {
      active = false
      unsubscribe()
    }
  }, [])

  return { data, loading }
}
