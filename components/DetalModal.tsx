// components/DocumentDetailModal.tsx
'use client'

import { useEffect, useState } from 'react'
import { X, Calendar, FileText as FileIcon } from 'lucide-react'
import { Document } from '@/lib/type'
import { supabase } from '@/lib/supabase'

interface DocumentDetailModalProps {
  isOpen: boolean
  onClose: () => void
  documentId: string | null
}

export default function DocumentDetailModal({ 
  isOpen, 
  onClose, 
  documentId 
}: DocumentDetailModalProps) {
  const [document, setDocument] = useState<Document | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen && documentId) {
      loadDocumentDetail()
    }
  }, [isOpen, documentId])

  async function loadDocumentDetail() {
    if (!documentId) return
    
    try {
      setLoading(true)
      setError(null)
      
      // Get document details
      const { data: doc, error: docError } = await supabase
        .from('documents')
        .select('*')
        .eq('id', documentId)
        .single()

      if (docError) throw docError
      setDocument(doc)
    } catch (error) {
      console.error('Error loading document:', error)
      setError('Failed to load document details')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Document Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : error ? (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              {error}
            </div>
          ) : document ? (
            <div className="space-y-6">
              {/* Title */}
              <div>
                <h3 className="text-3xl font-bold text-gray-900">{document.title}</h3>
              </div>

              {/* Metadata */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-500 border-b pb-4">
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  <span>Created: {new Date(document.created_at).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  <span>Updated: {new Date(document.updated_at).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Content */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Content</h4>
                <div className="p-4 bg-gray-50 rounded-lg min-h-[200px]">
                  {document.content ? (
                    <div className="prose max-w-none">
                      {document.content}
                    </div>
                  ) : (
                    <p className="text-gray-400 italic">No content</p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500 py-12">Document not found</p>
          )}
        </div>
      </div>
    </div>
  )
}