"use client";
import React, { useEffect, useState } from "react";

import TaskTimer from "./TaskTimer";
import { Icon } from "@iconify/react/dist/iconify.js";
import { toast } from "react-hot-toast";
import Assignee from "./Assignee";
import ImageUploader from "../ImageUploader";
import Subtasks from "./Subtasks";
import StatusSelector from "./StatusSelector";
import TaskSidebar from "./TaskSidebar";
import TaskEditableDescription from "./TaskEditableDescription";


const TaskDetails = ({ task, updateTask, addTask, project }) => {
    const [tabs, setTabs] = useState(["subtasks", "files"]);
    const [activeTab, setActiveTab] = useState("subtasks");

    const copyId = () => {
        navigator.clipboard.writeText(task.id);
        toast.success("Task ID copied to clipboard");
    };

    return (
        <div className="space-y-6">

            <div className="w-full flex flex-row justify-between items-start">
                <div className="w-3/4">
                    {/* Action Row */}
                    <div className="flex items-center justify-between">
                        {/* Left Section */}
                        <TaskEditableDescription task={task} />
                    </div>
                    <div className="mt-4">
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
                    </div>

                    <div className="flex flex-col h-full w-full">
                        {
                            activeTab === "description" && (
                                <>


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
                    <TaskSidebar task={task} />
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