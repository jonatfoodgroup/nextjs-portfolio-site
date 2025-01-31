'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello World! 🌎️</p>',
    immediatelyRender: false
  })

  if (!editor) return;

  return <div className="bg-white p-4 rounded-md shadow-md">
    <EditorContent id="forshizzle" editor={editor} /> <button onClick={console.log(editor.getJSON())}></button>
    </div>
}

export default Tiptap
