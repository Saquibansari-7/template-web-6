import { useEffect, useState, useCallback } from 'react'
import {
  getContent,
  saveContent,
  resetContent,
  getDuas,
  deleteDua,
  subscribeToContent,
  subscribeToDuas,
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

  const doReset = useCallback(async () => {
    const fresh = await resetContent()
    setData(fresh)
  }, [])

  return { data, update, reset: doReset }
}

export function useDuasState() {
  const [duas, setDuas] = useState([])

  const reload = useCallback(() => {
    getDuas().then(setDuas).catch(() => setDuas([]))
  }, [])

  useEffect(() => {
    reload()
    const off = subscribeToDuas(reload)
    return off
  }, [reload])

  const remove = useCallback(async (id) => {
    await deleteDua(id)
    setDuas((prev) => prev.filter((d) => d.id !== id))
  }, [])

  return { duas, reload, remove }
}
