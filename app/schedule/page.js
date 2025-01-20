"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useHubspot } from "../providers/HubspotProvider";
import Select from "react-select";
import ProjectCard from "../components/projects/ProjectCard";

// Custom styles for React Select
const customStyles = {
    control: (base) => ({
        ...base,
        backgroundColor: "#1a1a1a",
        borderColor: "#333",
        color: "#fff",
        boxShadow: "none",
        "&:hover": { borderColor: "#555" },
    }),
    menu: (base) => ({
        ...base,
        backgroundColor: "#1a1a1a",
        color: "#fff",
    }),
    singleValue: (base) => ({
        ...base,
        color: "#fff",
    }),
    option: (base, state) => ({
        ...base,
        backgroundColor: state.isFocused ? "#333" : "transparent",
        color: state.data.status === "Off track" ? "#ff4d4d" : "#fff",
        "&:hover": {
            backgroundColor: state.data.status === "Off track" ? "#ffcccc" : "#555",
        },
    }),
    placeholder: (base) => ({
        ...base,
        color: "#aaa",
    }),
};

export default function SchedulePage() {
    const { companies = [] } = useHubspot();
    const [projects, setProjects] = useState([]);
    const [schedule, setSchedule] = useState([]);

    // Fetch projects and attach company info
    useEffect(() => {
        if (!companies.length) return;

        const fetchProjects = async () => {
            try {
                const response = await fetch("/api/projects/get-projects");
                const data = await response.json();
                const projectsWithCompany = data.map((project) => {
                    const company = companies.find((c) => c.id === project.hubspotId);
                    return { ...project, company };
                });
                setProjects(projectsWithCompany);
            } catch (error) {
                console.error("Failed to fetch projects:", error);
            }
        };

        fetchProjects();
    }, [companies]);

    // Load schedule from localStorage
    useEffect(() => {
        const savedSchedule = localStorage.getItem("dailySchedule");
        if (savedSchedule && JSON.parse(savedSchedule).length > 0) {
            console.log("Loading saved schedule from localStorage", JSON.parse(savedSchedule));
            setSchedule(JSON.parse(savedSchedule));
        } else {
            const defaultSchedule = Array.from({ length: 12 }, (_, i) => {
                const hour = i + 9; // Start at 9 AM
                const isPM = hour >= 12;
                const formattedHour = hour > 12 ? hour - 12 : hour;
                const suffix = isPM ? "PM" : "AM";
                return { time: `${formattedHour}:00 ${suffix}`, projectId: "" };
            });
            console.log("Initializing default schedule", defaultSchedule);
            setSchedule(defaultSchedule);
            localStorage.setItem("dailySchedule", JSON.stringify(defaultSchedule));
        }
    }, []);

    // Save schedule to localStorage whenever it updates
    useEffect(() => {
        if (schedule.length > 0) {
            console.log("Saving updated schedule to localStorage", schedule);
            localStorage.setItem("dailySchedule", JSON.stringify(schedule));
        }
    }, [schedule]);

    // Initialize schedule if none exists
    const initializeSchedule = () => {
        const hours = Array.from({ length: 12 }, (_, i) => {
            const hour = i + 9; // Start at 9 AM
            const isPM = hour >= 12;
            const formattedHour = hour > 12 ? hour - 12 : hour;
            const suffix = isPM ? "PM" : "AM";
            return { time: `${formattedHour}:00 ${suffix}`, projectId: "" };
        });
        setSchedule(hours);
    };

    // Handle project selection
    const handleProjectChange = (index, selectedOption) => {
        const updatedSchedule = [...schedule];
        updatedSchedule[index].projectId = selectedOption?.value || "";
        setSchedule(updatedSchedule);
    };

    // Prepare project options
    const projectOptions = useMemo(() => {
        return projects
            .sort((a, b) => {
                if (a.status?.status === "Off track" && b.status?.status !== "Off track") return -1;
                if (b.status?.status === "Off track" && a.status?.status !== "Off track") return 1;
                return a.title.localeCompare(b.title);
            })
            .map((project) => ({
                id: project.id,
                value: project.id,
                label: project.title,
                project: project,
                company: project.company,
                hubspotId: project.hubspotId,
                status: project.status?.status || "No Status",
                clientName: project.company?.properties.name || "Unknown Client",
            }));
    }, [projects]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-800 p-4 min-h-screen">
            <div className="w-full md:col-span-1 bg-gray-900 p-4 rounded-md">
                <Scheduler
                    schedule={schedule}
                    projectOptions={projectOptions}
                    handleProjectChange={handleProjectChange}
                />
            </div>
            <div className="w-full md:col-span-2">
                <ProjectQueue schedule={schedule} projectOptions={projectOptions} />
            </div>
        </div>
    );
}

const Scheduler = ({ schedule, projectOptions, handleProjectChange }) => {
    return (
        <div>
            <h2 className="text-white text-lg font-bold mb-4">Daily Scheduler</h2>
            <div className="space-y-4">
                {schedule.map((block, index) => (
                    <div key={index} className="flex items-center space-x-4">
                        <span className="text-white">{block.time}</span>
                        <div className="flex-1">
                            <Select
                                options={projectOptions}
                                onChange={(selectedOption) =>
                                    handleProjectChange(index, selectedOption)
                                }
                                value={projectOptions.find(
                                    (option) => option.value === block.projectId
                                )}
                                placeholder="Select Project"
                                isClearable
                                styles={customStyles}
                                filterOption={(option, inputValue) => {
                                    const searchTerm = inputValue.toLowerCase();
                                    const label = option.label
                                        ? option.label.toString().toLowerCase()
                                        : "";
                                    const clientName = option.data?.clientName
                                        ? option.data.clientName.toString().toLowerCase()
                                        : "";
                                    const status = option.data?.status
                                        ? option.data.status.toString().toLowerCase()
                                        : "";
                                    return (
                                        label.includes(searchTerm) ||
                                        clientName.includes(searchTerm) ||
                                        status.includes(searchTerm)
                                    );
                                }}
                                getOptionLabel={(e) => (
                                    <div className="flex flex-col items-start">
                                        <span
                                            className={
                                                e.status === "Off track"
                                                    ? "text-red-500"
                                                    : "text-white"
                                            }
                                        >
                                            {e.label}
                                        </span>
                                        <small className="text-gray-400">
                                            Status: {e.status} | Client: {e.clientName}
                                        </small>
                                    </div>
                                )}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
const ProjectQueue = ({ schedule, projectOptions }) => {
    // Match the selected projects based on projectId in schedule
    const selectedProjects = schedule
        .map((block) => projectOptions.find((option) => option.value === block.projectId))
        .filter(Boolean); // Remove null or undefined values

    return (
        <div className="bg-gray-900 p-4 rounded-md">
            <h2 className="text-white text-lg font-bold mb-4">Project Queue</h2>
            <div className="grid grid-cols-1 gap-4">
            {selectedProjects.length > 0 ? (
                selectedProjects.map((project, index) => (
                    <ProjectCard key={index} project={project.project} company={project.company} />
                ))
            ) : (
                <p className="text-gray-400">No projects selected yet.</p>
            )}
            </div>
        </div>
    );
};