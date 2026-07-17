import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  await supabase.auth.signOut()

  const response = NextResponse.json({ success: true })
  response.cookies.delete('sb-access-token')
  
  return response
}