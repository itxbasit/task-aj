import { createServerSupabaseClient } from '@/lib/supabase-server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createServerSupabaseClient()

    const { data, error } = await supabase
      .from('document_shares')
      .select('id, permission, users:shared_with_user_id(id, email, name)')
      .eq('document_id', params.id)

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching shares:', error)
    return NextResponse.json(
      { error: 'Failed to fetch shares' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
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
      .eq('id', params.id)
      .single()

    if (!doc || doc.owner_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { userId, permission } = await request.json()

    const { data, error } = await supabase
      .from('document_shares')
      .insert([
        {
          document_id: params.id,
          shared_with_user_id: userId,
          permission: permission || 'view'
        }
      ])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error: any) {
    console.error('Error sharing document:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to share document' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
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
      .eq('id', params.id)
      .single()

    if (!doc || doc.owner_id !== user.session?.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { shareId } = await request.json()

    const { error } = await supabase
      .from('document_shares')
      .delete()
      .eq('id', shareId)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error removing share:', error)
    return NextResponse.json(
      { error: 'Failed to remove share' },
      { status: 500 }
    )
  }
}