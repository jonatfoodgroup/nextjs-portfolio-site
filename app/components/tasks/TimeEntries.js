"use client";
import React, { useState, useEffect, useCallback } from "react";

const TimeEntries = ({ task }) => {
    return (
        <>
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
        </>
    )
}

export default TimeEntries; 