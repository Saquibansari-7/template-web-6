import { useEffect, useState } from 'react'
import { getContent, loadContentByCustomer, subscribeToContent } from './data.js'

export function useWeddingData() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    let active = true
    let unsubscribe = () => {}
    let currentSiteId
    let customerParam = ''

    const params = new URLSearchParams(window.location.search)
    const customer = params.get('customer')
    const isCustomer = Boolean(customer && customer.trim())

    const load = async () => {
      try {
        let content
        if (isCustomer) {
          customerParam = customer.trim()
          const result = await loadContentByCustomer(customerParam)
          if (result) {
            content = result.content
            currentSiteId = result.site.subdomain
          } else {
            if (active) {
              setNotFound(true)
              setData(null)
            }
            setLoading(false)
            return
          }
        } else {
          content = await getContent()
        }
        if (active) setData(content)
      } catch (err) {
        console.error('[useWeddingData]', err)
        if (active) {
          setData(null)
          if (isCustomer) setNotFound(true)
        }
      } finally {
        if (active) setLoading(false)
      }
    }

    load()

    const table = isCustomer ? 'sites' : undefined
    const filter = isCustomer ? `subdomain=eq.${encodeURIComponent(customer.trim())}` : undefined

    unsubscribe = subscribeToContent(
      () => {
        if (currentSiteId) {
          loadContentByCustomer(customerParam)
            .then((result) => {
              if (result && active) setData(result.content)
            })
            .catch(() => {})
        } else {
          getContent()
            .then((content) => active && setData(content))
            .catch(() => {})
        }
      },
      filter,
      table
    )

    return () => {
      active = false
      unsubscribe()
    }
  }, [])

  return { data, loading, notFound }
}
