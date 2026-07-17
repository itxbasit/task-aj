// components/ShareModal.tsx
'use client'

import { useState, useEffect } from 'react'
import { X, UserPlus, Trash2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  documentId: string
  onShareUpdated?: () => void
}

interface Share {
  id: string
  shared_with_user_id: string
  permission: string
  users?: {
    email: string
    name?: string
  }
}

export default function ShareModal({ 
  isOpen, 
  onClose, 
  documentId,
  onShareUpdated 
}: ShareModalProps) {
  const [shares, setShares] = useState<Share[]>([])
  const [email, setEmail] = useState('')
  const [permission, setPermission] = useState<'view' | 'edit'>('view')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    if (isOpen && documentId) {
      loadShares()
      getCurrentUser()
    }
  }, [isOpen, documentId])

  async function getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
  }

  async function loadShares() {
    try {
      setLoading(true)
      const response = await fetch(`/api/documents/${documentId}/shares`, {
        headers: {
          'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
        }
      })

      if (!response.ok) throw new Error('')
      
      const data = await response.json()
      setShares(data)
    } catch (err) {
      console.error('Error loading shares:', err)
      setError('Failed to load shares')
    } finally {
      setLoading(false)
    }
  }

  async function handleShare(e: React.FormEvent) {
    e.preventDefault()
    
    if (!email.trim()) {
      setError('Email is required')
      return
    }

    try {
      setLoading(true)
      setError(null)

      // First, find the user by email
      const { data: users, error: userError } = await supabase
        .from('auth.users')
        .select('id, email')
        .eq('email', email.trim())
        .maybeSingle()

      if (userError || !users) {
        throw new Error('User not found. Please make sure the email is correct.')
      }

      const response = await fetch(`/api/documents/${documentId}/shares`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
        },
        body: JSON.stringify({
          userId: users.id,
          permission
        })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to share document')
      }

      setEmail('')
      setPermission('view')
      await loadShares()
      if (onShareUpdated) onShareUpdated()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to share document')
    } finally {
      setLoading(false)
    }
  }

  async function handleRemoveShare(shareId: string) {
    try {
      setLoading(true)
      
      const response = await fetch(`/api/documents/${documentId}/shares`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
        },
        body: JSON.stringify({ shareId })
      })

      if (!response.ok) throw new Error('Failed to remove share')
      
      await loadShares()
      if (onShareUpdated) onShareUpdated()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove share')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md mx-4 p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6">Share Document</h2>

        <form onSubmit={handleShare} className="mb-6">
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={permission}
              onChange={(e) => setPermission(e.target.value as 'view' | 'edit')}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="view">View</option>
              <option value="edit">Edit</option>
            </select>
          </div>
          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
          >
            <UserPlus size={18} />
            {loading ? 'Sharing...' : 'Share Document'}
          </button>
        </form>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">People with access</h3>
          {loading && shares.length === 0 ? (
            <p className="text-sm text-gray-500">Loading shares...</p>
          ) : shares.length === 0 ? (
            <p className="text-sm text-gray-500">No one has access to this document yet.</p>
          ) : (
            <div className="space-y-2">
              {shares.map((share) => (
                <div
                  key={share.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="text-sm font-medium">
                      {share.users?.email || share.shared_with_user_id}
                    </p>
                    <p className="text-xs text-gray-500">
                      {share.permission === 'edit' ? 'Can edit' : 'Can view'}
                    </p>
                  </div>
                  {share.shared_with_user_id !== user?.id && (
                    <button
                      onClick={() => handleRemoveShare(share.id)}
                      className="text-red-500 hover:text-red-700 transition"
                      disabled={loading}
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}