import React, { useState } from "react";
import TaskList from "./TaskList";
import { Icon } from "@iconify/react";

const CampaignModal = ({ campaign, onClose }) => {
  const [statusIndex, setStatusIndex] = useState(0);
  const currentStatus = campaign.statusUpdates[statusIndex];

  const nextStatus = () => {
    setStatusIndex((prev) => (prev + 1) % campaign.statusUpdates.length);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
      <div className="bg-gray-900 p-6 rounded-2xl max-w-lg w-full shadow-lg border border-gray-700">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-white">{campaign.title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <Icon icon="ic:round-close" width="28" height="28" />
          </button>
        </div>

        {/* Description */}
        <p className="text-gray-400">{campaign.description}</p>

        {/* Metrics */}
        <div className="mt-4 text-sm">
          <p className="text-blue-400">📋 {campaign.tasks.length} Tasks</p>
          <p className="text-green-400">📂 {campaign.assets} Assets Managed</p>
          <p className="text-purple-400">📡 Channels: {campaign.channels.join(", ")}</p>
        </div>

        {/* Status Update */}
        <div className="mt-4 flex items-center space-x-2">
          <button
            className="px-3 py-1 text-xs bg-blue-600 rounded-full hover:bg-blue-500 transition"
            onClick={nextStatus}
          >
            🔄 Update Status
          </button>
          <span className="text-sm text-gray-300">{currentStatus}</span>
        </div>

        {/* Task List */}
        <TaskList tasks={campaign.tasks} />

        {/* Close Button */}
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-5 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignModal;