import { supabase } from './supabase'
import { Document, DocumentShare } from './type'

export async function createDocument(ownerId: string, title: string = 'Untitled Document') {
  const { data, error } = await supabase
    .from('documents')
    .insert([{ owner_id: ownerId, title, content: '' }])
    .select()
    .single()

  if (error) throw error
  return data as Document
}

export async function getDocument(documentId: string) {
  const { data, error } = await supabase
    .from('documents')
    .select('*')
    .eq('id', documentId)
    .single()

  if (error) throw error
  return data as Document
}

export async function getUserDocuments(userId: string) {
  const { data, error } = await supabase
    .from('documents')
    .select('*')
    .eq('owner_id', userId)
    .order('updated_at', { ascending: false })

  if (error) throw error
  return data as Document[]
}

export async function getSharedDocuments(userId: string) {
  const { data, error } = await supabase
    .from('document_shares')
    .select('documents(*)')
    .eq('shared_with_user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return (data?.map((share) => (share.documents as unknown as Document)) || []) as Document[]
}

export async function updateDocument(documentId: string, title?: string, content?: string) {
  const updates: any = { updated_at: new Date() }
  if (title !== undefined) updates.title = title
  if (content !== undefined) updates.content = content

  const { data, error } = await supabase
    .from('documents')
    .update(updates)
    .eq('id', documentId)
    .select()
    .single()

  if (error) throw error
  return data as Document
}

export async function deleteDocument(documentId: string) {
  const { error } = await supabase
    .from('documents')
    .delete()
    .eq('id', documentId)

  if (error) throw error
}

export async function shareDocument(documentId: string, userId: string, permission: 'view' | 'edit' = 'view') {
  const { data, error } = await supabase
    .from('document_shares')
    .insert([{ document_id: documentId, shared_with_user_id: userId, permission }])
    .select()
    .single()

  if (error) throw error
  return data as DocumentShare
}

export async function getDocumentShares(documentId: string) {
  const { data, error } = await supabase
    .from('document_shares')
    .select('*, users:shared_with_user_id(email, name)')
    .eq('document_id', documentId)

  if (error) throw error
  return data || []
}

export async function removeShare(shareId: string) {
  const { error } = await supabase
    .from('document_shares')
    .delete()
    .eq('id', shareId)

  if (error) throw error
}