"use client";
import { useState } from "react";
import { useProjects } from "../../providers/ProjectsProvider";
import { Icon } from "@iconify/react/dist/iconify.js";

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
        <h4 className="text-lg font-regular text-gray-200 flex items-center space-x-2 mb-4"><span>About Project</span> <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-xs text-gray-500"
        >
          {isEditing ? <Icon icon="mdi:close" /> : <Icon icon="mdi:pencil" />}{" "}
        </button></h4>
        {isEditing ? (
          <div className="flex">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border bg-gray-800 text-white rounded text-sm border-gray-700"
            />
            <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded ml-2">
              Save
            </button>
          </div>
        ) : (
          <p className="text-md text-gray-400 leading-relaxed
          ">{description}</p>
        )}
        
      </div>
    );
  }

  export default EditableDescription;