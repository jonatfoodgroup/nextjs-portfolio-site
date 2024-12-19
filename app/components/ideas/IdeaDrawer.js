"use client";
import { useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Blockquote from "@tiptap/extension-blockquote";
import CodeBlock from "@tiptap/extension-code-block";
import Strike from "@tiptap/extension-strike";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function NewIdeaDrawer({ hubspotId, ideaId, onClose, onSave }) {
  const [content, setContent] = useState(""); // Editor content
  const [title, setTitle] = useState(""); // Idea title
  const [isLoading, setIsLoading] = useState(!!ideaId);

  // Enhanced TipTap Editor setup
  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Underline,
      Heading.configure({ levels: [1, 2, 3] }),
      BulletList,
      OrderedList,
      Blockquote,
      CodeBlock,
      Strike,
    ],
    content: content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  // Fetch existing content for editing
  useEffect(() => {
    if (ideaId) {
      setIsLoading(true);
      fetch(`/api/ideas/${hubspotId}/${ideaId}`)
        .then((res) => res.json())
        .then((data) => {
          setContent(data.content || "");
          setTitle(data.title || "");
          editor?.commands.setContent(data.content || "");
        })
        .catch((err) => console.error("Failed to fetch idea:", err))
        .finally(() => setIsLoading(false));
    }
  }, [hubspotId, ideaId, editor]);

  // Save handler
  const handleSave = () => {
    if (content.trim()) {
      const endpoint = ideaId
        ? `/api/ideas/${hubspotId}/${ideaId}` // Update existing
        : `/api/ideas/${hubspotId}`; // Create new

      fetch(endpoint, {
        method: ideaId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          title,
          content,
         }),
      })
        .then(() => {
          onSave();
          // editor?.commands.clearContent();
        })
        .catch((err) => console.error("Failed to save idea:", err));
    }
  };

  return (
    <div className="fixed right-0 top-0 w-1/3 h-full bg-white shadow-lg p-4">
      <h2 className="text-lg font-bold mb-4">
        {ideaId ? "Edit Idea" : "New Idea"}
      </h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <label className="block mb-2">
            Idea Title:
            <input
              type="text"
              className="border w-full p-2 rounded"
              placeholder="Enter a title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>

          <label className="block mb-2">
            Idea Description:
          </label>
          <div className="flex space-x-2 mb-2 border-b pb-2">
            <button onClick={() => editor?.chain().focus().toggleBold().run()}>
              <Icon icon="mdi:format-bold" />
            </button>
            <button onClick={() => editor?.chain().focus().toggleItalic().run()}>
              <Icon icon="mdi:format-italic" />
            </button>
            <button onClick={() => editor?.chain().focus().toggleUnderline().run()}>
              <Icon icon="mdi:format-underline" />
            </button>
            <button onClick={() => editor?.chain().focus().toggleStrike().run()}>
              <Icon icon="mdi:format-strikethrough" />
            </button>
            <button onClick={() => editor?.chain().focus().toggleBulletList().run()}>
              <Icon icon="mdi:format-list-bulleted" />
            </button>
            <button onClick={() => editor?.chain().focus().toggleOrderedList().run()}>
              <Icon icon="mdi:format-list-numbered" />
            </button>
            <button onClick={() => editor?.chain().focus().toggleBlockquote().run()}>
              <Icon icon="mdi:format-quote" />
            </button>
            <button onClick={() => editor?.chain().focus().toggleCodeBlock().run()}>
              <Icon icon="mdi:code-tags" />
            </button>
            <button onClick={() => editor?.chain().focus().setHeading({ level: 2 }).run()}>
              <Icon icon="mdi:format-header-2" />
            </button>
            <button onClick={() => editor?.chain().focus().setHeading({ level: 3 }).run()}>
              <Icon icon="mdi:format-header-3" />
            </button>
          </div>

          {/* Editor Content */}
          <div className="border rounded-md p-2">
            <EditorContent editor={editor} className="prose" />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 mt-4">
            <button onClick={onClose} className="border px-4 py-1 rounded">
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-1 rounded"
            >
              Save
            </button>
          </div>
        </>
      )}
    </div>
  );
}