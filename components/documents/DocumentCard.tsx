'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FileText, MoreVertical, Trash2, Users, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { formatDistanceToNow } from 'date-fns'
import { toast } from 'sonner'
import { useState } from 'react'
import { ShareModal } from './ShareModal'
import { Database } from '@/types/supabase'

type Document = Database['public']['Tables']['documents']['Row'] & {
  owner: Database['public']['Tables']['users']['Row'] | null
  shared_with: {
    id: string
    user: Database['public']['Tables']['users']['Row'] | null
  }[]
}

interface DocumentCardProps {
  document: Document
  isShared?: boolean
}

export function DocumentCard({ document, isShared }: DocumentCardProps) {
  const router = useRouter()
  const [showShareModal, setShowShareModal] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  async function deleteDocument() {
    if (!confirm('Are you sure you want to delete this document?')) return

    setIsDeleting(true)
    try {
      const res = await fetch(`/api/documents/${document.id}`, {
        method: 'DELETE',
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Failed to delete')
      }

      toast.success('Document deleted successfully')
      router.refresh()
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete document')
    } finally {
      setIsDeleting(false)
    }
  }

  const getSharedWithCount = () => {
    return document.shared_with?.length || 0
  }

  const getOwnerName = () => {
    return document.owner?.name || document.owner?.email || 'Unknown'
  }

  return (
    <>
      <div className="group bg-background border rounded-lg hover:shadow-lg transition-all duration-200 hover:border-primary/20">
        <Link href={`/documents/${document.id}`}>
          <div className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3 min-w-0">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FileText className="w-5 h-5 text-primary flex-shrink-0" />
                </div>
                <h3 className="font-semibold line-clamp-1 text-sm md:text-base">
                  {document.title || 'Untitled'}
                </h3>
              </div>
              {!isShared && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
                      onClick={(e) => e.preventDefault()}
                    >
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem 
                      onClick={(e) => {
                        e.preventDefault()
                        setShowShareModal(true)
                      }}
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={(e) => {
                        e.preventDefault()
                        deleteDocument()
                      }}
                      className="text-destructive focus:text-destructive"
                      disabled={isDeleting}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      {isDeleting ? 'Deleting...' : 'Delete'}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            <div className="flex items-center justify-between text-xs md:text-sm text-muted-foreground mt-4">
              <div className="flex items-center gap-2">
                <span>
                  Updated {formatDistanceToNow(new Date(document.updated_at), { addSuffix: true })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {isShared ? (
                  <span className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs">
                    <Users className="w-3 h-3" />
                    Shared
                  </span>
                ) : (
                  <>
                    {getSharedWithCount() > 0 && (
                      <span className="flex items-center gap-1 text-xs">
                        <Users className="w-3 h-3" />
                        {getSharedWithCount()}
                      </span>
                    )}
                    <span className="text-xs text-muted-foreground/60">
                      by {getOwnerName()}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </Link>
      </div>

      <ShareModal
        open={showShareModal}
        onOpenChange={setShowShareModal}
        documentId={document.id}
        documentTitle={document.title || 'Untitled'}
      />
    </>
  )
}