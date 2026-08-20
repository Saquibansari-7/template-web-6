import { useEffect, useState, useCallback } from 'react'
import {
  getContent,
  saveContent,
  resetContent,
  subscribeToContent,
} from '../../lib/data.js'
import { toast } from '../../lib/toast.js'

export function useAdminData() {
  const [data, setData] = useState(null)

  const reload = useCallback(async () => {
    const content = await getContent()
    setData(content)
  }, [])

  useEffect(() => {
    reload().catch((err) => console.error('[useAdminData]', err))

    const offContent = subscribeToContent(() => reload().catch(() => {}))
    const offReset = () => window.dispatchEvent(new Event('admin-reset-event'))
    window.addEventListener('admin-reset-event', reload)
    return () => {
      offContent()
      window.removeEventListener('admin-reset-event', reload)
    }
  }, [reload])

  const update = useCallback(async (mutator) => {
    setData((prev) => {
      const next = typeof mutator === 'function' ? mutator(prev) : { ...prev, ...mutator }
      saveContent(next).catch((err) => toast(err.message || 'Save failed'))
      return next
    })
  }, [])

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
    const fresh = await resetContent()
    setData(fresh)
  }, [])

  const blessings = data?.blessings || []

  return { data, update, addBlessing, removeBlessing, blessings, reset: doReset }
}
