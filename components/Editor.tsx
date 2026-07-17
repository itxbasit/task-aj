'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Heading from '@tiptap/extension-heading'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import { useCallback } from 'react'
import { Bold, Italic, Underline as UnderlineIcon, Heading1, Heading2, List, ListOrdered } from 'lucide-react'

interface EditorProps {
  content: string
  onChange: (content: string) => void
  readOnly?: boolean
}

export function Editor({ content, onChange, readOnly = false }: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Heading.configure({ levels: [1, 2, 3] }),
      BulletList,
      OrderedList
    ],
    content,
    editable: !readOnly,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    }
  })

  if (!editor) return null

  const buttonClass = 'p-2 hover:bg-gray-100 rounded transition text-gray-700 text-sm'
  const activeClass = 'bg-gray-200'

  return (
    <div className="border rounded-lg overflow-hidden">
      {!readOnly && (
        <div className="bg-gray-50 border-b p-2 flex gap-1 flex-wrap">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`${buttonClass} ${editor.isActive('bold') ? activeClass : ''}`}
            title="Bold (Ctrl+B)"
          >
            <Bold size={18} />
          </button>

          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`${buttonClass} ${editor.isActive('italic') ? activeClass : ''}`}
            title="Italic (Ctrl+I)"
          >
            <Italic size={18} />
          </button>

          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`${buttonClass} ${editor.isActive('underline') ? activeClass : ''}`}
            title="Underline (Ctrl+U)"
          >
            <UnderlineIcon size={18} />
          </button>

          <div className="border-l mx-1" />

          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`${buttonClass} ${editor.isActive('heading', { level: 1 }) ? activeClass : ''}`}
            title="Heading 1"
          >
            <Heading1 size={18} />
          </button>

          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`${buttonClass} ${editor.isActive('heading', { level: 2 }) ? activeClass : ''}`}
            title="Heading 2"
          >
            <Heading2 size={18} />
          </button>

          <div className="border-l mx-1" />

          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`${buttonClass} ${editor.isActive('bulletList') ? activeClass : ''}`}
            title="Bullet List"
          >
            <List size={18} />
          </button>

          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`${buttonClass} ${editor.isActive('orderedList') ? activeClass : ''}`}
            title="Ordered List"
          >
            <ListOrdered size={18} />
          </button>
        </div>
      )}

      <EditorContent
        editor={editor}
        className="prose prose-sm max-w-none p-4 min-h-96 focus:outline-none"
      />
    </div>
  )
}