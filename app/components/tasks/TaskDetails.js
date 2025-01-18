"use client";
import React, { useEffect, useState } from "react";
import { useTasks } from "../../providers/TasksProvider";
import { firestore } from "../../firebase/config";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import MarkAsBountyButton from "./MarkAsBounty";
import TaskTimer from "./TaskTimer";
import { StepsProvider, useSteps } from "../../providers/StepsProvider";
import StepsList from "./StepsList";
import { Icon } from "@iconify/react/dist/iconify.js";
import TaskEditableDescription from "./TaskEditableDescription";
import { toast } from "react-hot-toast";
import Button from "../Button";

const TaskDetails = ({ task, updateTask, addTask, project }) => {
    const [description, setDescription] = useState(task.description || "");
    const [status, setStatus] = useState(task.status || "pending");

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
        updateTask(task.id, { description: e.target.value });
    };

    const handleStatusChange = (e) => {
        const newStatus = e.target.value;
        setStatus(newStatus);
        updateTask(task.id, { status: newStatus });
    };

    const copyId = () => {
        navigator.clipboard.writeText(task.id);
        toast.success("Task ID copied to clipboard");
    };

    return (
        <div>
            <div className="mt-4 flex items-center space-x-2">
                <TaskTimer task={task} updateTask={updateTask} project={project} />
                <MarkAsBountyButton taskId={task.id} isBounty={task.isBounty} />
            </div>

            {/* Task Status Dropdown */}
            <div className="mt-4">
                <label className="text-gray-400 text-sm font-medium mr-2">
                    Status:
                </label>
                <select
                    value={status}
                    onChange={handleStatusChange}
                    className="p-2 border rounded bg-gray-900 text-white border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
            </div>

            <TaskEditableDescription task={task} />

            <div className="mt-6">
                <Subtasks parentTaskId={task.id} />
            </div>

            {/* Task id */}
            <p className="text-gray-600 text-xs inline-flex space-x-2">
                <span>Task ID: </span>
                <span>{task.id}</span>
                <button onClick={copyId} className="text-gray-600">
                    <Icon icon="mdi:content-copy" className="w-4 h-4" />
                </button>
            </p>
        </div>
    );
};

const Subtasks = ({ parentTaskId }) => {
    const [subtasks, setSubtasks] = useState([]);
    const { addTask } = useTasks();
    const [newSubtaskName, setNewSubtaskName] = useState("");

    useEffect(() => {
        if (!parentTaskId) return;

        const q = query(
            collection(firestore, "tasks"),
            where("parentTaskId", "==", parentTaskId),
            orderBy("createdAt")
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const subtasksData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setSubtasks(subtasksData);
        });

        return () => unsubscribe();
    }, [parentTaskId]);

    const handleAddSubtask = () => {
        if (!newSubtaskName.trim()) return;

        addTask({
            name: newSubtaskName,
            parentTaskId,
        });

        setNewSubtaskName("");
    }
    return (
        <>
            {/* Subtasks Section */}
            < div className="mt-6" >
                <h3 className="text-lg font-semibold text-white">Subtasks</h3>
                <ul className="mt-4 space-y-2">
                    {subtasks
                        .map((subtask) => (
                            <StepsProvider key={subtask.id} taskId={subtask.id}>
                                <SubTaskItem key={subtask.id} subtask={subtask} />
                            </StepsProvider>
                        ))}
                </ul>

                {/* Add Subtask */}
                <div className="mt-4 flex items-center space-x-2">
                    <input
                        type="text"
                        value={newSubtaskName}
                        onChange={(e) => setNewSubtaskName(e.target.value)}
                        placeholder="New Subtask Name"
                        className="p-2 border rounded bg-gray-900 text-white w-full border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                    />
                    <Button
                        variant="outline"
                        onClick={handleAddSubtask}
                    >
                        Add Subtask
                    </Button>
                </div>
            </div >
        </>
    )
};

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

export default TaskDetails;