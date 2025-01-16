"use client";
import { useState } from "react";
import { useProjects } from "../../providers/ProjectsProvider";

const EditableDescription = ({ project }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [description, setDescription] = useState(project.description);
    const { updateProject } = useProjects();
    const handleSave = async () => {
      setIsEditing(false);
      await updateProject(project.id, { description });
    };
  
    return (
      <div className="mt-4">
        <h4 className="text-sm font-semibold">Description</h4>
        {isEditing ? (
          <div className="flex">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded ml-2">
              Save
            </button>
          </div>
        ) : (
          <p className="text-sm text-gray-600">{description}</p>
        )}
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-xs text-blue-500 mt-2"
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>
    );
  }

  export default EditableDescription;