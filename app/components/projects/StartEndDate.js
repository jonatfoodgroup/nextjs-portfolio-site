"use client";

import { useState, useEffect } from "react";
import { useProjects } from "../../providers/ProjectsProvider";

export const StartDate = ({ project }) => {
    const { updateProject } = useProjects();
    const [startDate, setStartDate] = useState(project.startDate || "");

    useEffect(() => {
        setStartDate(project.startDate || "");
    }, [project.startDate]); // Re-sync when project data updates

    const handleStartDateChange = (e) => {
        const newStartDate = e.target.value;
        setStartDate(newStartDate);
        updateProject(project.id, { startDate: newStartDate });
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
};

export const EndDate = ({ project }) => {
    const { updateProject } = useProjects();
    const [endDate, setEndDate] = useState(project.endDate || "");

    useEffect(() => {
        setEndDate(project.endDate || "");
    }, [project.endDate]); // Re-sync when project data updates

    const handleEndDateChange = (e) => {
        const newEndDate = e.target.value;
        setEndDate(newEndDate);
        updateProject(project.id, { endDate: newEndDate });
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