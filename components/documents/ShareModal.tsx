'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { Users, X } from 'lucide-react'
import type { Database } from '@/types/supabase'

interface ShareModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  documentId: string
  documentTitle: string
}

export function ShareModal({ open, onOpenChange, documentId, documentTitle }: ShareModalProps) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sharedUsers, setSharedUsers] = useState<any[]>([])

  async function handleShare(e: React.FormEvent) {
    e.preventDefault()
    if (!email) {
      toast.error('Please enter an email address')
      return
    }

    setIsLoading(true)
    try {
      const res = await fetch(`/api/documents/${documentId}/share`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to share document')
      }

      toast.success(`Document shared with ${email}`)
      setEmail('')
      router.refresh()
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  async function removeShare(shareId: string) {
    try {
      const res = await fetch(`/api/documents/${documentId}/share`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shareId }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to remove sharing')
      }

      toast.success('Sharing removed')
      router.refresh()
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Document</DialogTitle>
          <DialogDescription>
            Share "{documentTitle}" with other users
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleShare} className="flex gap-2">
          <Input
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Sharing...' : 'Share'}
          </Button>
        </form>

        {sharedUsers.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Shared with:
            </h4>
            <div className="space-y-2">
              {sharedUsers.map((share) => (
                <div
                  key={share.id}
                  className="flex items-center justify-between p-2 bg-muted/50 rounded-lg"
                >
                  <span className="text-sm">
                    {share.user?.name || share.user?.email || 'Unknown'}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeShare(share.id)}
                    className="h-8 w-8 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}