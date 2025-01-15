"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useTasks } from "../../providers/TasksProvider";


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
              {/* <p className="text-sm text-gray-600 mt-2">{task.description || "No description provided."}</p> */}

              {/* Inline Editable Description */}
              <EditableDescription task={task} updateTask={updateTask} />

              {/* Timer Controls */}
              <TaskTimer task={task} project={project} updateTask={updateTask} />

              {/* Time Entries */}
              {task.timeEntries && task.timeEntries.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-semibold">Time Entries</h4>
                  <ul className="text-sm text-gray-600">
                    {task.timeEntries.map((entry, index) => (
                      <li key={index}>
                        {new Date(entry.startTime).toLocaleTimeString()} -{" "}
                        {new Date(entry.endTime).toLocaleTimeString()} (
                        {entry.duration} minutes)
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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

const TaskTimer = ({ task, project, updateTask }) => {
  const [activeTimer, setActiveTimer] = useState(null);

  useEffect(() => {
    // Check if there is an active timer when the component mounts
    if (task.activeTimer) {
      setActiveTimer(task.activeTimer);
    }
  }, [task.activeTimer]);

  const startTimer = async () => {
    if (activeTimer) {
      console.warn("A timer is already running for this task.");
      return;
    }

    const startTime = Date.now();

    const newTimeEntry = {
      id: `${task.id}-${startTime}`, // Unique ID for the time entry
      startTime: new Date(startTime).toISOString(),
      endTime: null, // End time will be set when stopped
      duration: null, // Duration will be calculated when stopped
    };

    // Save the active timer entry in Firestore
    await updateTask(task.id, {
      timeEntries: [...(task.timeEntries || []), newTimeEntry],
      activeTimer: newTimeEntry.id,
    });

    setActiveTimer(newTimeEntry.id);

    // Send a Discord message
    await fetch("/api/discord/send-message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        channelId: project.discordChannelId,
        message: `🚀 Timer started for **${task.name}**. Stay focused!`,
      }),
    });
  };

  const stopTimer = async () => {
    if (!activeTimer) {
      console.warn("No active timer to stop.");
      return;
    }

    const endTime = Date.now();

    // Find the active time entry
    const updatedTimeEntries = task.timeEntries.map((entry) => {
      if (entry.id === activeTimer) {
        const duration = Math.round((endTime - new Date(entry.startTime).getTime()) / 60000); // Duration in minutes
        return {
          ...entry,
          endTime: new Date(endTime).toISOString(),
          duration,
        };
      }
      return entry;
    });

    // Update the task with the completed time entry and clear the active timer
    await updateTask(task.id, {
      timeEntries: updatedTimeEntries,
      activeTimer: null,
    });

    setActiveTimer(null);

    // Send a Discord message
    await fetch("/api/discord/send-message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        channelId: project.discordChannelId,
        message: `⏹️ Timer stopped for **${task.name}**. Duration: ${
          updatedTimeEntries.find((entry) => entry.id === activeTimer)?.duration
        } minutes.`,
      }),
    });
  };

  return (
    <div className="mt-4">
      {activeTimer ? (
        <button
          onClick={stopTimer}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Stop Timer
        </button>
      ) : (
        <button
          onClick={startTimer}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Start Timer
        </button>
      )}
    </div>
  );
};


export default ProjectTasks;


