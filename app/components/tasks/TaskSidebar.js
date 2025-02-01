"use client";
import React, { useState } from "react";
import TaskChat from "./Chat";

const TaskSidebar = () => {
    const [tabs, setTabs] = useState(["chat", "activity"]);
    const [activeTab, setActiveTab] = useState("chat");
    return (
        <div className="w-1/4 flex flex-col h-full bg-gray-800 p-4 w-full">
            <div className="flex items-center space-x-4">
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
            </div>
        </div>
    )
}


export default TaskSidebar;