'use server'

import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL! || "https://dsqpajzvhxayxogsuwwg.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzcXBhanp2aHhheXhvZ3N1d3dnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQyMjU5NjQsImV4cCI6MjA5OTgwMTk2NH0.tLDLPwQvgg08LTJVNa8rJA72EXaDTnqU71MsEOWjlxo"

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

// Server-side client with cookies
export async function createServerSupabaseClient() {
  const cookieStore = await cookies()

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options as CookieOptions)
          })
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware that will refresh
          // the cookies.
        }
      }
    }
  })
}