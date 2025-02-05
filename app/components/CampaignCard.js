import React, { useState } from "react";

const CampaignCard = ({ campaign, onClick }) => {
  const totalTasks = campaign.tasks.length;
  const [completedTasks, setCompletedTasks] = useState(0); // Start from 0
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // State for tracking campaign status
  const [statusIndex, setStatusIndex] = useState(0);
  const currentStatus = campaign.statusUpdates.length > 0 ? campaign.statusUpdates[statusIndex] : "Not Started";

  // Function to cycle status
  const nextStatus = (e) => {
    e.stopPropagation(); // Prevent triggering onClick for the card
    setStatusIndex((prev) => (prev + 1) % campaign.statusUpdates.length);
  };

  // Function to mark a task as completed
  const completeTask = (e) => {
    e.stopPropagation(); // Prevent triggering onClick for the card
    setCompletedTasks((prev) => (prev < totalTasks ? prev + 1 : prev));
  };

  return (
    <div
      className="bg-gray-800 text-white p-6 rounded-lg shadow-md border border-gray-700 cursor-pointer hover:border-blue-500 transition duration-200"
      onClick={onClick}
    >
      <h2 className="text-xl font-semibold">{campaign.title}</h2>
      <p className="text-gray-400 mt-2">{campaign.description}</p>

      {/* Metrics */}
      <div className="mt-4 space-y-1">
        <p className="text-sm text-blue-400">📋 {totalTasks} Tasks</p>
        <p className="text-sm text-green-400">📂 {campaign.assets} Assets Managed</p>
        <p className="text-sm text-purple-400">📡 Channels: {campaign.channels.join(", ")}</p>
      </div>

      {/* Status Update */}
      <div className="mt-4 flex items-center space-x-2">
        <button
          className="px-3 py-1 text-xs bg-blue-600 rounded-full hover:bg-blue-500 transition duration-200"
          onClick={nextStatus}
        >
          🔄 Update Status
        </button>
        <span className={`text-sm ${statusIndex === campaign.statusUpdates.length - 1 ? "text-green-300" : "text-gray-300"}`}>
          {currentStatus}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mt-4 bg-gray-700 h-2 rounded-full">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-xs text-gray-300 mt-1">{progress}% Completed</p>
    </div>
  );
};

export default CampaignCard;