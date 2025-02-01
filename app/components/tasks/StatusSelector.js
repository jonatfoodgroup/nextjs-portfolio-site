"use client";
import React from "react";

const StatusSelector = ({
    status,
    handleStatusChange,
}) => {
    return (
        <>
            <label className="text-gray-400 text-sm font-medium">Status:</label>
            <select
                value={status}
                onChange={handleStatusChange}
                className="px-2 py-1 bg-gray-900 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
            </select></>
    )
}

export default StatusSelector;