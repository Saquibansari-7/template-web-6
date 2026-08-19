import { useEffect, useState } from 'react'
import { getContent, subscribeToContent } from './data.js'

export function useWeddingData() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    getContent()
      .then((content) => {
        if (active) setData(content)
      })
      .catch((err) => {
        console.error('[useWeddingData]', err)
        if (active) setData(null)
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    const unsubscribe = subscribeToContent(() => {
      getContent()
        .then((content) => active && setData(content))
        .catch(() => {})
    })

    return () => {
      active = false
      unsubscribe()
    }
  }, [])

  return { data, loading }
}
