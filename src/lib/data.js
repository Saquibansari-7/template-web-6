import { supabase, isSupabaseConfigured, CONTENT_TABLE, DUAS_TABLE, BUCKET, SITE_ID } from './supabase.js'

export { isSupabaseConfigured }
import { DEFAULT_CONTENT } from './defaults.js'

export const NOT_CONFIGURED_MESSAGE =
  'Supabase is not configured. Add VITE_PUBLIC_SUPABASE_URL and VITE_PUBLIC_SUPABASE_PUBLISHABLE_KEY to your .env file.'

function normalizeContent(raw) {
  const base = structuredClone(DEFAULT_CONTENT)
  if (!raw || typeof raw !== 'object') return base
  return {
    ...base,
    ...raw,
    settings: { ...base.settings, ...(raw.settings || {}) },
    ceremony: { ...base.ceremony, ...(raw.ceremony || {}) },
    location: { ...base.location, ...(raw.location || {}) },
    sections: { ...base.sections, ...(raw.sections || {}) },
    story: Array.isArray(raw.story) && raw.story.length ? raw.story : base.story,
    party: Array.isArray(raw.party) && raw.party.length ? raw.party : base.party,
    guidelines: Array.isArray(raw.guidelines) && raw.guidelines.length ? raw.guidelines : base.guidelines,
    gallery: Array.isArray(raw.gallery) && raw.gallery.length ? raw.gallery : base.gallery,
  }
}

export async function getContent() {
  if (!isSupabaseConfigured) {
    return structuredClone(DEFAULT_CONTENT)
  }
  const { data, error } = await supabase
    .from(CONTENT_TABLE)
    .select('data')
    .eq('site_id', SITE_ID)
    .single()

  if (error && error.code !== 'PGRST116') {
    console.error('[getContent] Supabase error:', error)
    return structuredClone(DEFAULT_CONTENT)
  }
  return normalizeContent(data?.data)
}

export async function saveContent(content) {
  if (!isSupabaseConfigured) {
    throw new Error(NOT_CONFIGURED_MESSAGE)
  }
  const { error } = await supabase
    .from(CONTENT_TABLE)
    .upsert(
      { site_id: SITE_ID, data: content, updated_at: new Date().toISOString() },
      { onConflict: 'site_id' }
    )
  if (error) {
    console.error('[saveContent] Supabase error:', error)
    throw new Error(`Failed to save content: ${error.message}`)
  }
  return content
}

export async function resetContent() {
  return saveContent(structuredClone(DEFAULT_CONTENT))
}

/* ---------------- Du'as / Blessings ---------------- */

export async function getDuas() {
  if (!isSupabaseConfigured) return []
  const { data, error } = await supabase
    .from(DUAS_TABLE)
    .select('*')
    .order('created_at', { ascending: false })
  if (error) {
    console.error('[getDuas] Supabase error:', error)
    return []
  }
  return (data || []).map((d) => ({ id: d.id, name: d.name, text: d.text, date: d.date || '' }))
}

export async function addDua(dua) {
  if (!isSupabaseConfigured) {
    throw new Error(NOT_CONFIGURED_MESSAGE)
  }
  const { data, error } = await supabase
    .from(DUAS_TABLE)
    .insert([{ name: dua.name, text: dua.text, date: dua.date || new Date().toLocaleDateString() }])
    .select()
  if (error) {
    console.error('[addDua] Supabase error:', error)
    throw new Error(`Failed to save blessing: ${error.message}`)
  }
  return data?.[0] || dua
}

export async function deleteDua(id) {
  if (!isSupabaseConfigured) {
    throw new Error(NOT_CONFIGURED_MESSAGE)
  }
  const { error } = await supabase.from(DUAS_TABLE).delete().eq('id', id)
  if (error) {
    console.error('[deleteDua] Supabase error:', error)
    throw new Error(`Failed to delete blessing: ${error.message}`)
  }
}

/* ---------------- Image upload ---------------- */

export async function uploadImage(file) {
  if (!isSupabaseConfigured) {
    throw new Error(NOT_CONFIGURED_MESSAGE)
  }
  const fileExt = (file.name.split('.').pop() || 'bin').toLowerCase()
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${fileExt}`
  const filePath = `${SITE_ID}/${fileName}`

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(filePath, file, { cacheControl: '3600', upsert: false })
  if (error) {
    const msg = error.message || String(error)
    if (msg.toLowerCase().includes('bucket')) {
      throw new Error(`Storage bucket "${BUCKET}" not found. Create it in Supabase Storage.`)
    }
    if (msg.includes('Unauthorized') || msg.toLowerCase().includes('jwt')) {
      throw new Error('Storage upload unauthorized. Check Storage RLS policies.')
    }
    throw new Error(`Image upload failed: ${msg}`)
  }
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(filePath)
  return data?.publicUrl || ''
}

/* ---------------- Realtime sync ---------------- */

export function subscribeToContent(onChange) {
  if (!isSupabaseConfigured) return () => {}
  const channel = supabase
    .channel('site_content_changes')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: CONTENT_TABLE, filter: `site_id=eq.${SITE_ID}` },
      () => onChange()
    )
    .subscribe()
  return () => supabase.removeChannel(channel)
}

export function subscribeToDuas(onChange) {
  if (!isSupabaseConfigured) return () => {}
  const channel = supabase
    .channel('duas_changes')
    .on('postgres_changes', { event: '*', schema: 'public', table: DUAS_TABLE }, () => onChange())
    .subscribe()
  return () => supabase.removeChannel(channel)
}

/* ---------------- Admin auth (client-side, simple) ---------------- */

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123'
const SESSION_KEY = 'wedding_admin_session'

export function login(password) {
  if (password === ADMIN_PASSWORD) {
    try { localStorage.setItem(SESSION_KEY, '1') } catch {}
    return true
  }
  return false
}

export function logout() {
  try { localStorage.removeItem(SESSION_KEY) } catch {}
}

export function isLoggedIn() {
  try { return localStorage.getItem(SESSION_KEY) === '1' } catch { return false }
}
