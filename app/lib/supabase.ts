//C:\Users\Shanon\al-rajjak-1\app\lib\supabase.ts


import { createClient } from '@supabase/supabase-js'

// এনভায়রনমেন্ট ভেরিয়েবল চেক করা
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase URL or Anon Key in .env.local')
}

// সুপাবেস ক্লায়েন্ট তৈরি এবং এক্সপোর্ট
export const supabase = createClient(supabaseUrl, supabaseAnonKey)