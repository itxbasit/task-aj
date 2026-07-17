import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL! || "https://dsqpajzvhxayxogsuwwg.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzcXBhanp2aHhheXhvZ3N1d3dnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQyMjU5NjQsImV4cCI6MjA5OTgwMTk2NH0.tLDLPwQvgg08LTJVNa8rJA72EXaDTnqU71MsEOWjlxo"

// Client for browser-side operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storageKey: "auth"
  }
})

export type Database = any