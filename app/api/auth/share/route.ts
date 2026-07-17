import { getDocumentShares, removeShare, shareDocument } from '@/lib/document'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'Document id is required' }, { status: 400 })
  }

  const shares = await getDocumentShares(id)
  return NextResponse.json(shares)
}

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'Document id is required' }, { status: 400 })
  }

  const { userId, permission } = await request.json()

  const share = await shareDocument(id, userId, permission || 'view')
  return NextResponse.json(share)
}

export async function DELETE(request: NextRequest) {
  const { shareId } = await request.json()

  await removeShare(shareId)
  return NextResponse.json({ success: true })
}