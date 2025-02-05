"use client";

import { useState, useEffect, useCallback } from "react";
import { useProjects } from "../../providers/ProjectsProvider";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import debounce from "lodash.debounce"; // Debounce added

const EditableDescription = ({ project }) => {
  const { updateProject } = useProjects();
  const [description, setDescription] = useState(project?.description || "<p>Describe your project here...</p>");
  const [isSaving, setIsSaving] = useState(false); // Track save state

  // TipTap Editor
  const editor = useEditor({
    extensions: [StarterKit],
    content: description,
    editorProps: {
      attributes: {
        class: "w-full min-h-[300px] p-4 bg-gray-900 text-white rounded-md border border-gray-700 focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      const newContent = editor.getHTML();
      if (newContent !== description) {
        setDescription(newContent); // Update state only if content changes
      }
    },
  });

  // Debounced Save Function
  const saveDescription = useCallback(
    debounce(async (content) => {
      if (content !== project?.description) {
        setIsSaving(true);
        await updateProject(project.id, { description: content });
        setIsSaving(false);
      }
    }, 1000), // 1 second delay
    [project.id, updateProject]
  );

  // Auto-save when `description` updates
  useEffect(() => {
    if (description !== project?.description) {
      saveDescription(description);
    }
  }, [description, saveDescription, project?.description]);

  // Ensure the editor syncs with the project’s latest description
  useEffect(() => {
    if (editor && project?.description !== description) {
      editor.commands.setContent(project.description);
    }
  }, [project?.description, editor]);

  return (
    <div className="mt-4">
      <h4 className="text-lg font-semibold text-gray-200 mb-4">About Project</h4>
      <div className="w-full min-h-[300px] border border-gray-700 rounded-md bg-gray-900 p-4">
        {editor ? <EditorContent editor={editor} /> : <p className="text-gray-400">Loading editor...</p>}
      </div>
      {isSaving && <p className="text-gray-500 text-sm mt-2">Saving...</p>}
    </div>
  );
};

export default EditableDescription;