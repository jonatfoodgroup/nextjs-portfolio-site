"use client";
import { useState } from "react";
import { useTasks } from "../../providers/TasksProvider";
import { Icon } from "@iconify/react/dist/iconify.js";

const TaskEditableDescription = ({ task }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [description, setDescription] = useState(task.description);
    const { updateTask } = useTasks();
    const handleSave = async () => {
      setIsEditing(false);
      await updateTask(task.id, { description });
    };
  
    return (
      <div className="mt-4">
        <h4 className="text-lg font-regular text-gray-200 flex items-center space-x-2 mb-4"><span>Description</span> <button
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
          <p className="text-md text-gray-400">{description}</p>
        )}
        
      </div>
    );
  }

  export default TaskEditableDescription;