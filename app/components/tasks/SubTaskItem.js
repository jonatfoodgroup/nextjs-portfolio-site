import React, { useState } from "react";
import { useTasks } from "../../providers/TasksProvider";
import { useSteps } from "../../providers/StepsProvider";
import StepsList from "./StepsList";
import { Icon } from "@iconify/react/dist/iconify";
import TaskTimer from "./TaskTimer";


const SubTaskItem = ({ subtask }) => {
    const { updateTask } = useTasks();
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(subtask.name);
    const [showSteps, setShowSteps] = useState(false); // Tracks if StepsList is visible
    const { steps, completedSteps } = useSteps();

    const handleCheckboxChange = async () => {
        await updateTask(subtask.id, {
            status: subtask.status === "completed" ? "incomplete" : "completed",
        });
    };

    const handleNameChange = async () => {
        if (editedName.trim() && editedName !== subtask.name) {
            await updateTask(subtask.id, { name: editedName });
        }
        setIsEditing(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleNameChange();
        } else if (e.key === "Escape") {
            setEditedName(subtask.name); // Revert to the original name
            setIsEditing(false);
        }
    };

    return (
        <li
            key={subtask.id}
            className="flex flex-col p-3 border rounded-xl bg-gray-800 border-gray-700 align-top"
        >

            <div className="flex flex-row items-center">
                <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-green-500 rounded mr-3 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 bg-gray-900"
                    checked={subtask.status === "completed"}
                    onChange={handleCheckboxChange}
                />
                <div className="flex-grow">
                    {isEditing ? (
                        <input
                            type="text"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                            onBlur={handleNameChange}
                            onKeyDown={handleKeyDown}
                            autoFocus
                            className="p-1 bg-gray-900 text-white border rounded w-full border-gray-700"
                        />
                    ) : (
                        <p
                            onClick={() => setIsEditing(true)}
                            className={`text-gray-300 cursor-pointer ${subtask.status === "completed" ? "line-through text-gray-500" : ""
                                }`}
                        >
                            {subtask.name}
                        </p>
                    )}
                </div>
                <button
                    onClick={() => setShowSteps(!showSteps)}
                    className="ml-3 text-gray-300 hover:text-gray-500 flex flex-row items-center space-x-2"
                    aria-label="Toggle Steps"
                >
                    {
                        steps.length > 0 && (
                            <span className="text-sm text-gray-600">
                                {completedSteps.length}/{steps.length}
                            </span>
                        )

                    }
                    {
                        steps.length === 0 && (
                            <span className="text-sm text-gray-600">
                                0/0
                            </span>
                        )
                    }
                    <Icon
                        icon={showSteps ? "mdi:chevron-up" : "mdi:chevron-down"}
                        className="w-5 h-5"
                    />
                </button>

                <TaskTimer task={subtask} project={subtask.projectId} updateTask={updateTask} />
            </div>

            {/* Conditionally render Steps List */}
            {showSteps && (
                <div className="mt-2 pl-8">
                    <StepsList />
                </div>
            )}
        </li>
    );
};

export default SubTaskItem;