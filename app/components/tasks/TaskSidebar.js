"use client";
import React, { useState } from "react";
import TaskChat from "./Chat";
import MarkAsBountyButton from "./MarkAsBounty";
import Assignee from "./Assignee";
import TaskEditableDescription from "./TaskEditableDescription";
import { StartDate } from "./StartDate";
import { EndDate } from "./EndDate";
import TaskTimer from "./TaskTimer";
import { useTasks } from "../../providers/TasksProvider";
import StatusSelector from "./StatusSelector";
const TaskSidebar = ({ task }) => {
    const [status, setStatus] = useState(task.status || "pending");

    const [tabs, setTabs] = useState(["chat", "activity"]);
    const [activeTab, setActiveTab] = useState("chat");
    const { updateTask, project } = useTasks();
    const handleStatusChange = (e) => {
        const newStatus = e.target.value;
        setStatus(newStatus);
        updateTask(task.id, { status: newStatus });
    };
    return (
        <div className="w-1/4 flex flex-col h-full bg-gray-800 p-4 w-full space-y-4">

            <div className="flex flex-col items-center space-y-4">
                <TaskTimer task={task} updateTask={updateTask} project={project} />
                <MarkAsBountyButton taskId={task.id} isBounty={task.isBounty} />
            </div>
            <Assignee task={task} />
            <div className="flex items-center space-x-4">
                <StartDate task={task} />
                <EndDate task={task} />
            </div>
            {/* Right Section: Status Dropdown */}
            <div className="flex items-center space-x-2">
                <StatusSelector status={status} handleStatusChange={handleStatusChange} />
            </div>
            {/* <div className="flex items-center space-x-4">
            {
                tabs.map((tab) => (
                    <button
                        key={tab}
                        className="text-sm px-4 py-2 font-medium text-gray-400 hover:text-white transition"
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))
            }
            </div>

            <div className="mt-6 border-t border-gray-700 pt-4 flex flex-col h-full w-full">
                {
                    activeTab === "chat" && (
                        <TaskChat />
                    )
                }
            </div> */}
        </div>
    )
}


export default TaskSidebar;