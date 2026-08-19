import { createClient } from '@supabase/supabase-js'

const url = (import.meta.env.VITE_PUBLIC_SUPABASE_URL || '').trim()
const key = (import.meta.env.VITE_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '').trim()

function createClientIfConfigured() {
  if (!url || !key) {
    if (import.meta.env.DEV) {
      console.error('[supabase] Missing env vars: VITE_PUBLIC_SUPABASE_URL / VITE_PUBLIC_SUPABASE_PUBLISHABLE_KEY')
    }
    return null
  }
  const finalUrl = url.startsWith('http') ? url : `https://${url}`
  if (import.meta.env.DEV) console.log('[supabase] Using URL:', finalUrl)
  return createClient(finalUrl, key, {
    auth: { persistSession: true, detectSessionInUrl: true },
  })
}

export const supabase = createClientIfConfigured()

export const isSupabaseConfigured = Boolean(supabase)

export const CONTENT_TABLE = 'site_content'
export const DUAS_TABLE = 'duas'
export const BUCKET = 'sites'
export const SITE_ID = 'default'
