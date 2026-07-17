import bcrypt from 'bcryptjs'
import { supabase, supabaseAdmin } from './supabase'
import { User } from './type'

export async function registerUser(email: string, password: string, name: string) {
  try {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const { data, error } = await supabaseAdmin
      .from('users')
      .insert([
        {
          email,
          password_hash: passwordHash,
          name
        }
      ])
      .select()
      .single()

    if (error) throw error
    return { user: data as User, error: null }
  } catch (error: any) {
    return { user: null, error: error.message }
  }
}

export async function loginUser(email: string, password: string) {
  try {
    const { data: user, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('email', email)
      .single()

    if (error || !user) {
      return { user: null, error: 'User not found' }
    }

    const isValid = await bcrypt.compare(password, user.password_hash)
    if (!isValid) {
      return { user: null, error: 'Invalid password' }
    }

    // Store user in session/state (you'll manage this in your app)
    return {
      user: { id: user.id, email: user.email, name: user.name } as User,
      error: null
    }
  } catch (error: any) {
    return { user: null, error: error.message }
  }
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const { data, error } = await supabase.auth.getSession()
    if (error || !data.session) return null

    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, email, name')
      .eq('id', data.session.user.id)
      .single()

    return userError ? null : user as User
  } catch {
    return null
  }
}