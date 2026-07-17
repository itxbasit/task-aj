export type Json = 
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          password: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          password?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          password?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      documents: {
        Row: {
          id: string
          title: string
          content: Json
          owner_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title?: string
          content?: Json
          owner_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: Json
          owner_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      shared_access: {
        Row: {
          id: string
          document_id: string
          user_id: string
          created_at: string
        }
        Insert: {
          id?: string
          document_id: string
          user_id: string
          created_at?: string
        }
        Update: {
          id?: string
          document_id?: string
          user_id?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Helper types for easier use
export type User = Database['public']['Tables']['users']['Row']
export type Document = Database['public']['Tables']['documents']['Row']
export type SharedAccess = Database['public']['Tables']['shared_access']['Row']

// Extended types with relations
export type DocumentWithRelations = Document & {
  owner: User | null
  shared_with: (SharedAccess & {
    user: User | null
  })[]
}

export type UserWithDocuments = User & {
  documents: Document[]
  shared_with: SharedAccess[]
}