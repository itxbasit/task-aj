// app/page.tsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Document } from '@/lib/type'
import { FileText, LogOut, Plus, Share2, Eye } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'
import CreateDocumentModal from '@/components/cretaeModal'
import ShareModal from '@/components/SharingModal'
import DocumentDetailModal from '@/components/DetalModal'

export default function Home() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [ownedDocuments, setOwnedDocuments] = useState<Document[]>([])
  const [sharedDocuments, setSharedDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null)

  useEffect(() => {
    checkAuthAndLoadData()
  }, [])

  async function checkAuthAndLoadData() {
    try {
      setError(null)
      
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        router.push('/login')
        return
      }

      setUser(session.user)
      await loadDocuments(session.user.id)
      
    } catch (error) {
      console.error('Error loading data:', error)
      setError('Failed to load documents. Please refresh and try again.')
    } finally {
      setLoading(false)
    }
  }

  async function loadDocuments(userId: string) {
    // Get owned documents
    const { data: owned, error: ownedError } = await supabase
      .from('documents')
      .select('*')
      .eq('owner_id', userId)
      .order('updated_at', { ascending: false })

    if (ownedError) {
      console.error('Owned documents error:', ownedError)
      if (ownedError.message.includes('infinite recursion')) {
        setError('Database policy issue. Please contact support.')
        return
      }
      throw ownedError
    }
    setOwnedDocuments(owned || [])

    // Get shared documents
    const { data: shares, error: sharesError } = await supabase
      .from('document_shares')
      .select('document_id')
      .eq('shared_with_user_id', userId)

    if (sharesError) {
      console.error('Shares error:', sharesError)
      setSharedDocuments([])
    } else if (shares && shares.length > 0) {
      const docIds = shares.map(s => s.document_id)
      const { data: docs, error: docsError } = await supabase
        .from('documents')
        .select('*')
        .in('id', docIds)
        .order('updated_at', { ascending: false })

      if (docsError) {
        console.error('Error fetching shared docs:', docsError)
        setSharedDocuments([])
      } else {
        setSharedDocuments(docs || [])
      }
    } else {
      setSharedDocuments([])
    }
  }

  async function createDocument(title: string, content: string) {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        throw new Error('Not authenticated')
      }

      const res = await fetch('/api/documents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({ title, content })
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Unknown error' }))
        throw new Error(errorData.error || 'Failed to create document')
      }

      const doc = await res.json()
      
      // Add to local state
      setOwnedDocuments(prev => [doc, ...prev])
      
      // Open detail modal instead of navigating
      setSelectedDocumentId(doc.id)
      setIsDetailModalOpen(true)
    } catch (error) {
      console.error('Error creating document:', error)
      throw error
    }
  }

  async function handleLogout() {
    try {
      await supabase.auth.signOut()
      router.push('/login')
    } catch (error) {
      console.error('Error logging out:', error)
      setError('Failed to logout. Please try again.')
    }
  }

  function openShareModal(documentId: string) {
    setSelectedDocumentId(documentId)
    setIsShareModalOpen(true)
  }

  function openDetailModal(documentId: string) {
    setSelectedDocumentId(documentId)
    setIsDetailModalOpen(true)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">📄 AJAIA Docs</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            <p className="font-medium">Error</p>
            <p>{error}</p>
            <button 
              onClick={() => setError(null)}
              className="mt-2 text-sm font-medium hover:underline"
            >
              Dismiss
            </button>
          </div>
        )}

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Your Documents</h2>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Plus size={20} />
            New Document
          </button>
        </div>

        {ownedDocuments.length === 0 && sharedDocuments.length === 0 ? (
          <div className="text-center py-12">
            <FileText size={48} className="mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500 mb-4">No documents yet. Create one to get started.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {ownedDocuments.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Your Documents</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {ownedDocuments.map((doc) => (
                    <div key={doc.id} className="group relative bg-white rounded-lg border hover:border-blue-500 hover:shadow-md transition cursor-pointer">
                      {/* Clickable area for detail view */}
                      <div 
                        onClick={() => openDetailModal(doc.id)}
                        className="block p-4"
                      >
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition">
                          {doc.title}
                        </h3>
                        <p className="text-gray-500 text-sm line-clamp-2">
                          {doc.content?.replace(/<[^>]*>/g, '') || 'No content'}
                        </p>
                        <p className="text-xs text-gray-400 mt-4">
                          Updated: {new Date(doc.updated_at).toLocaleDateString()}
                        </p>
                        <span className="inline-block mt-3 px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                          Owner
                        </span>
                      </div>
                      
                      {/* Action buttons */}
                      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            openDetailModal(doc.id)
                          }}
                          className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition"
                          title="View details"
                        >
                          <Eye size={16} className="text-gray-600" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            openShareModal(doc.id)
                          }}
                          className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition"
                          title="Share"
                        >
                          <Share2 size={16} className="text-gray-600" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {sharedDocuments.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Shared with You</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sharedDocuments.map((doc) => (
                    <div key={doc.id} className="group relative bg-white rounded-lg border hover:border-blue-500 hover:shadow-md transition cursor-pointer">
                      <div 
                        onClick={() => openDetailModal(doc.id)}
                        className="block p-4"
                      >
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition">
                          {doc.title}
                        </h3>
                        <p className="text-gray-500 text-sm line-clamp-2">
                          {doc.content?.replace(/<[^>]*>/g, '') || 'No content'}
                        </p>
                        <p className="text-xs text-gray-400 mt-4">
                          Updated: {new Date(doc.updated_at).toLocaleDateString()}
                        </p>
                        <span className="inline-block mt-3 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                          Shared
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          openDetailModal(doc.id)
                        }}
                        className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition opacity-0 group-hover:opacity-100"
                        title="View details"
                      >
                        <Eye size={16} className="text-gray-600" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <CreateDocumentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={createDocument}
      />

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => {
          setIsShareModalOpen(false)
          setSelectedDocumentId(null)
        }}
        documentId={selectedDocumentId || ''}
        onShareUpdated={() => {
          if (user) loadDocuments(user.id)
        }}
      />

      <DocumentDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false)
          setSelectedDocumentId(null)
        }}
        documentId={selectedDocumentId}
      />
    </div>
  )
}