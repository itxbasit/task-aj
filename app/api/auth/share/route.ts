import { getDocumentShares, removeShare, shareDocument } from '@/lib/document'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const shares = await getDocumentShares(params.id)
  return NextResponse.json(shares)
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { userId, permission } = await request.json()

  const share = await shareDocument(params.id, userId, permission || 'view')
  return NextResponse.json(share)
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { shareId } = await request.json()

  await removeShare(shareId)
  return NextResponse.json({ success: true })
}