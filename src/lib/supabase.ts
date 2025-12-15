import { createClient } from '@supabase/supabase-js';

export function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;

  if (!url) throw new Error('Missing SUPABASE_URL');
  if (!key) throw new Error('Missing SUPABASE_ANON_KEY');

  return createClient(url, key);
}
