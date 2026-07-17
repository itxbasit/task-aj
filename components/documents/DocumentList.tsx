'use client'

import { Database } from "@/types/supabase"
import { DocumentCard } from "./DocumentCard"


type Document = Database['public']['Tables']['documents']['Row'] & {
  owner: Database['public']['Tables']['users']['Row'] | null
  shared_with: {
    id: string
    user: Database['public']['Tables']['users']['Row'] | null
  }[]
}

interface DocumentListProps {
  documents: Document[]
  isShared?: boolean
}

export function DocumentList({ documents, isShared }: DocumentListProps) {
  if (documents.length === 0) {
    return (
      <div className="text-center py-12 bg-muted/30 rounded-lg border-2 border-dashed">
        <p className="text-muted-foreground">
          {isShared ? 'No documents shared with you yet' : 'No documents yet'}
        </p>
        {!isShared && (
          <p className="text-sm text-muted-foreground mt-1">
            Create your first document to get started
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {documents.map((doc) => (
        <DocumentCard key={doc.id} document={doc} isShared={isShared} />
      ))}
    </div>
  )
}