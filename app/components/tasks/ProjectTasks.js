"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useTasks } from "../../providers/TasksProvider";
import MarkAsBountyButton from "./MarkAsBounty";
import TaskTimer from "./TaskTimer";
import TimeEntries from "./TimeEntries";
const ProjectTasks = ({
  project
}) => {
  const { tasks, loading, updateTask } = useTasks();

  // Sort tasks by active timers
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.activeTimer && !b.activeTimer) return -1; // Move tasks with active timers to the top
    if (!a.activeTimer && b.activeTimer) return 1;
    return 0; // Maintain order for tasks without active timers
  });

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Tasks</h3>
      {loading ? (
        <p className="text-gray-500">Loading tasks...</p>
      ) : (
        <ul className="space-y-4">
          {sortedTasks.map((task) => (
            <li
              key={task.id}
              className="border p-4 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center">
                <p className="font-semibold text-lg text-gray-800">{task.name}</p>
                <p className={`text-sm px-2 py-1 rounded ${task.status === "Completed"
                  ? "bg-green-100 text-green-800"
                  : task.status === "In Progress"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-gray-100 text-gray-800"
                  }`}>
                  {task.status}
                </p>
              </div>

              {/* Inline Editable Description */}
              <EditableDescription task={task} updateTask={updateTask} />


              <div className="flex items-center space-x-4 mt-2">
                {/* Mark as Bounty Button */}
                <MarkAsBountyButton taskId={task.id} isBounty={task.isBounty} />

                {/* Timer Controls */}
                <TaskTimer task={task} project={project} updateTask={updateTask} />
              </div>
              
              <div className="mt-4">
                <TimeEntries task={task} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const EditableDescription = ({ task, updateTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(task.description || "");
  const [debouncedDescription, setDebouncedDescription] = useState(description);

  // Debounce function
  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  // Update the database with the debounced description
  const saveDescription = useCallback(
    debounce((newDescription) => {
      updateTask(task.id, { description: newDescription });
    }, 500), // Adjust the debounce delay as needed
    [task.id, updateTask]
  );

  useEffect(() => {
    // Only save when the debounced value changes
    if (debouncedDescription !== task.description) {
      saveDescription(debouncedDescription);
    }
  }, [debouncedDescription, task.description, saveDescription]);

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    setDebouncedDescription(e.target.value); // Update the debounced value
  };

  return (
    <div className="mt-2">
      {isEditing ? (
        <textarea
          className="w-full p-2 border rounded text-sm"
          value={description}
          onChange={handleDescriptionChange}
          onBlur={() => setIsEditing(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              setIsEditing(false);
            }
          }}
        />
      ) : (
        <p
          className="text-sm text-gray-600 cursor-pointer hover:underline"
          onClick={() => setIsEditing(true)}
        >
          {description || "Click to add a description..."}
        </p>
      )}
    </div>
  );
};




export default ProjectTasks;


