"use client";
import React, { useEffect, useState } from "react";
import MarkAsBountyButton from "./MarkAsBounty";
import TaskTimer from "./TaskTimer";
import { Icon } from "@iconify/react/dist/iconify.js";
import TaskEditableDescription from "./TaskEditableDescription";
import { toast } from "react-hot-toast";
import { StartDate } from "./StartDate";
import { EndDate } from "./EndDate";
import Assignee from "./Assignee";
import ImageUploader from "../ImageUploader";
import Subtasks from "./Subtasks";
import StatusSelector from "./StatusSelector";
import TaskSidebar from "./TaskSidebar";

const TaskDetails = ({ task, updateTask, addTask, project }) => {
    const [status, setStatus] = useState(task.status || "pending");
    const [tabs, setTabs] = useState(["description", "subtasks", "files"]);
    const [activeTab, setActiveTab] = useState("description");

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
        <div className="space-y-6">
            
            <div className="w-full flex flex-row justify-between">
                <div className="w-3/4">
                {/* Action Row */}
            <div className="flex items-center justify-between">
                {/* Left Section */}
                <div className="flex items-center space-x-4">
                    <TaskTimer task={task} updateTask={updateTask} project={project} />
                    <MarkAsBountyButton taskId={task.id} isBounty={task.isBounty} />
                </div>

                {/* Right Section: Status Dropdown */}
                <div className="flex items-center space-x-2">
                    <StatusSelector status={status} handleStatusChange={handleStatusChange} />
                </div>

            </div>
                    {
                        tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`text-sm px-4 py-2
                            font-medium text-gray-400 hover:text-white transition ${tab === activeTab ? "text-white border-b border-white" : ""
                                    }`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))
                    }

                    <div className="mt-6 border-t border-gray-700 pt-4">
                        {
                            activeTab === "description" && (
                                <>
                                    <TaskEditableDescription task={task} />
                                    <div className="flex items-center space-x-4">
                                        <StartDate task={task} />
                                        <EndDate task={task} />
                                    </div>
                                    <Assignee task={task} />
                                </>
                            )
                        }

                        {
                            activeTab === "subtasks" && (
                                <Subtasks parentTaskId={task.id} />
                            )
                        }

                        {
                            activeTab === "files" && (
                                <ImageUploader />
                            )
                        }

                    </div>
                </div>

                <div className="w-1/4">
                    <TaskSidebar />
                </div>

            </div>
            {/* Task ID Section */}
            <div className="flex items-center space-x-2 text-xs text-gray-600">
                <span>Task ID:</span>
                <span>{task.id}</span>
                <button
                    onClick={copyId}
                    className="text-gray-500 hover:text-gray-400 transition"
                    aria-label="Copy Task ID"
                >
                    <Icon icon="mdi:content-copy" className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};






export default TaskDetails;