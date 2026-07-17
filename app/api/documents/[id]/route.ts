import { createServerSupabaseClient } from '@/lib/supabase-server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createServerSupabaseClient()

    const { data: document, error } = await supabase
      .from('documents')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 })
    }

    return NextResponse.json(document)
  } catch (error) {
    console.error('Error fetching document:', error)
    return NextResponse.json(
      { error: 'Failed to fetch document' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createServerSupabaseClient()

    const {
      data:  user ,
      error: authError
    } = await supabase.auth.getSession()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify ownership
    const { data: doc } = await supabase
      .from('documents')
      .select('owner_id')
      .eq('id', id)
      .single()

    if (!doc || doc.owner_id !== user.session?.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { title, content } = await request.json()

    const { data: updatedDoc, error } = await supabase
      .from('documents')
      .update({
        ...(title && { title }),
        ...(content !== undefined && { content }),
        updated_at: new Date()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(updatedDoc)
  } catch (error) {
    console.error('Error updating document:', error)
    return NextResponse.json(
      { error: 'Failed to update document' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createServerSupabaseClient()

    const {
      data:  user ,
      error: authError
    } = await supabase.auth.getSession()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify ownership
    const { data: doc } = await supabase
      .from('documents')
      .select('owner_id')
      .eq('id', id)
      .single()

    if (!doc || doc.owner_id !== user.session?.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { error } = await supabase
      .from('documents')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting document:', error)
    return NextResponse.json(
      { error: 'Failed to delete document' },
      { status: 500 }
    )
  }
}