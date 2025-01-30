"use client";
import { useState, useEffect } from "react";
import { useTasks } from "../../providers/TasksProvider";

export const EndDate = ({ task }) => {
    const { updateTask } = useTasks();
    const [endDate, setEndDate] = useState(task.endDate || "");

    useEffect(() => {
        setEndDate(task.endDate || "");
    }, [task.endDate]); // Re-sync when task data updates

    const handleEndDateChange = (e) => {
        const newEndDate = e.target.value;
        setEndDate(newEndDate);
        updateTask(task.id, { endDate: newEndDate });
    };

    return (
        <div className="flex flex-col">
            <label className="text-gray-400 text-sm">End Date</label>
            <input
                type="date"
                value={endDate}
                onChange={handleEndDateChange}
                className="border border-gray-300 bg-gray-800 border-gray-600  rounded-md p-2"
            />
        </div>
    );
};