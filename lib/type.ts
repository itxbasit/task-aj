export interface User {
  id: string
  email: string
  name: string
}

export interface Document {
  id: string
  owner_id: string
  title: string
  content: string
  created_at: string
  updated_at: string
}

export interface DocumentShare {
  id: string
  document_id: string
  shared_with_user_id: string
  created_at: string
}

export interface AuthState {
  user: User | null
  loading: boolean
  isAuthenticated: boolean
}