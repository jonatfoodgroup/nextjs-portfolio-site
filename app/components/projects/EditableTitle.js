"use client";

import { useState } from "react";
import { useProjects } from "../../providers/ProjectsProvider";
import { Icon } from "@iconify/react/dist/iconify.js";

const EditableTitle = ({ project }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(project.title);
  const { updateProject } = useProjects();

  const handleSave = async () => {
    try {
      setIsEditing(false);
      await updateProject(project.id, { title }); // Update the title in Firestore
      console.log("Title successfully updated:", title);
    } catch (error) {
      console.error("Failed to update title:", error.message);
    }
  };

  return (
    <div className="mt-4">
      <div className="flex items-center space-x-2 mb-4">
        {!isEditing ? (
          <>
            <h2 className="text-3xl font-regular text-white">{title}</h2>
            <button
              onClick={() => setIsEditing(true)}
              className="text-sm text-gray-500 hover:text-gray-400"
              aria-label="Edit project title"
            >
              <Icon icon="mdi:pencil" />
            </button>
          </>
        ) : (
          <div className="flex w-full">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border bg-gray-800 text-white rounded text-sm border-gray-700"
            />
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
              aria-label="Save project title"
            >
              Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setTitle(project.title); // Reset to original title if cancelled
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
              aria-label="Cancel editing project title"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditableTitle;