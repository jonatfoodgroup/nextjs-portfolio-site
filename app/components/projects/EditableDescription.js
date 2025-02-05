"use client";

import { useState, useEffect, useCallback } from "react";
import { useProjects } from "../../providers/ProjectsProvider";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import debounce from "lodash.debounce"; // Add lodash debounce

const EditableDescription = ({ project }) => {
  const { updateProject } = useProjects();
  const [description, setDescription] = useState(project?.description || "<p>Describe your project here...</p>");

  // Initialize TipTap Editor
  const editor = useEditor({
    extensions: [StarterKit],
    content: description,
    editorProps: {
      attributes: {
        class: "w-full min-h-[300px] p-4 bg-gray-900 text-white rounded-md border border-gray-700 focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      setDescription(editor.getHTML()); // Only update description state
    },
  });

  // Debounced Save Function
  const saveDescription = useCallback(
    debounce(async (content) => {
      await updateProject(project.id, { description: content });
    }, 1000), // Only saves after 1 second of inactivity
    [project.id, updateProject]
  );

  // Auto-save when description updates
  useEffect(() => {
    if (description !== project?.description) {
      saveDescription(description);
    }
  }, [description, saveDescription]);

  return (
    <div className="mt-4">
      <h4 className="text-lg font-semibold text-gray-200 mb-4">About Project</h4>
      <div className="w-full min-h-[300px] border border-gray-700 rounded-md bg-gray-900 p-4">
        {editor ? <EditorContent editor={editor} /> : <p className="text-gray-400">Loading editor...</p>}
      </div>
    </div>
  );
};

export default EditableDescription;