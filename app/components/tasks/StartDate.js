"use client";
import { useState, useEffect } from "react";
import { useTasks } from "../../providers/TasksProvider";

export const StartDate = ({ task }) => {
    const { updateTask } = useTasks();
    const [startDate, setStartDate] = useState(task.startDate || "");

    useEffect(() => {
        setStartDate(task.startDate || "");
    }, [task.startDate]); // Re-sync when task data updates

    const handleStartDateChange = (e) => {
        const newStartDate = e.target.value;
        setStartDate(newStartDate);
        updateTask(task.id, { startDate: newStartDate });
    };

    return (
        <div className="flex flex-col">
            <label className="text-gray-400 text-sm">Start Date</label>
            <input
                type="date"
                value={startDate}
                onChange={handleStartDateChange}
                className="border border-gray-300 bg-gray-800 border-gray-600  rounded-md p-2"
            />
        </div>

    );
}
