"use client";
import React, { useState, useEffect, useRef } from "react";
import { useHubspot } from "../providers/HubspotProvider";
import DriveLinkButton from "../components/DriveLinkButton";
import HubspotLinkButton from "../components/portal/HubspotLinkButton";
import Link from "next/link";
import ProjectCard from "../components/projects/ProjectCard";
import Button from "../components/Button";
import PortalTimelineView from "../components/portal/PortalTimelineView";
import { useTasks } from "../providers/TasksProvider";
import { motion } from "framer-motion";
import { useFirebase } from "../providers/FirebaseProvider";
import { useRouter } from "next/navigation";

export default function PortalSelector() {
    const [projects, setProjects] = useState([]);
    const { tasks } = useTasks();
    const [companiesWithProjects, setCompaniesWithProjects] = useState([]);
    const { companies } = useHubspot();
    const [loading, setLoading] = useState(false);
    const [bootComplete, setBootComplete] = useState(false);
    const [activeView, setActiveView] = useState("timeline"); // "board" or "timeline"

    useEffect(() => {
        if (!companies || companies.length === 0) return;
    
        const bootAndFetch = async () => {
    
            // Boot sequence duration (3 seconds)
            await new Promise((resolve) => setTimeout(resolve, 1000));
    
            try {
                const res = await fetch("/api/projects/get-projects");
                const data = await res.json();
    
                const updatedCompanies = companies.map((company) => ({
                    ...company,
                    projects: data.filter((project) => project.hubspotId === company.id),
                }));
    
                setProjects(data);
                setCompaniesWithProjects(updatedCompanies);
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setLoading(false); // Finish loading after boot + data fetch
            }
        };
    
        bootAndFetch();
    }, [companies]);

    // if (loading || !bootComplete) {
    //     return (
    //         <div className="flex flex-col items-center justify-center h-screen bg-black text-green-400 font-mono">
    //             <BootSequence onComplete={() => setBootComplete(true)} />
    //         </div>
    //     );
    // }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            {/* Tab Selector */}
            <div className="flex space-x-4 border-b border-gray-700 mb-6  sticky top-0 bg-black z-10">
                <button
                    className={`px-4 py-2 text-sm font-medium ${
                        activeView === "board" ? "text-white border-b-2 border-blue-500" : "text-gray-400"
                    }`}
                    onClick={() => setActiveView("board")}
                >
                    Board
                </button>
                <button
                    className={`px-4 py-4 text-sm font-medium ${
                        activeView === "timeline" ? "text-white border-b-2 border-blue-500" : "text-gray-400"
                    }`}
                    onClick={() => setActiveView("timeline")}
                >
                    Timeline
                </button>
                <button
                    className={`px-4 py-4 text-sm font-medium ${
                        activeView === "tasks" ? "text-white border-b-2 border-blue-500" : "text-gray-400"
                    }`}
                    onClick={() => setActiveView("tasks")}
                >
                    Tasks
                </button>
                <button
                    className={`px-4 py-4 text-sm font-medium ${
                        activeView === "calendar" ? "text-white border-b-2 border-blue-500" : "text-gray-400"
                    }`}
                    onClick={() => setActiveView("calendar")}
                >
                    Calendar
                </button>
                {/* Documents */}
                <button
                    className={`px-4 py-4 text-sm font-medium ${
                        activeView === "documents" ? "text-white border-b-2 border-blue-500" : "text-gray-400"
                    }`}
                    onClick={() => setActiveView("documents")}
                >
                    Documents
                </button>
            </div>

            {/* Content Based on Active View */}
            {activeView === "timeline" && <PortalTimelineView companies={companiesWithProjects} />}
            {activeView === "board" && (
                <div className="grid grid-cols-1 gap-4">
                    {companiesWithProjects.map((company) => (
                        <div key={company.id} className="p-6 bg-black border border-gray-700">
                            <CompanyHeader company={company} />
                            <div className="bg-black align-top grid grid-cols-1 md:grid-cols-6 gap-4">
                                {company.projects.map((project) => (
                                    <ProjectCard key={project.id} project={project} company={company} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {activeView === "tasks" && (
                <div className="grid grid-cols-1 gap-4">
                    <TasksView tasks={tasks} />
                </div>
            )}
            {activeView === "calendar" && (
                <div className="grid grid-cols-1 gap-4">
                    {tasks.map((task) => (
                        <div key={task.id} className="p-6 bg-black rounded-xl border border-gray-700"></div>
                    ))}
                </div>
            )}
        </motion.div>
    );
}


const TasksView = () => {
    const { tasks } = useFirebase();
    const router = useRouter();

    // Flatten tasks into a single list
    const taskArrays = Object.values(tasks || {});
    const flatTasks = taskArrays.flat();

    // Group tasks by projectId
    const groupedByProject = flatTasks.reduce((acc, task) => {
        if (!task.projectId) return acc;
        if (!acc[task.projectId]) acc[task.projectId] = [];
        acc[task.projectId].push(task);
        return acc;
    }, {});

    const scrollContainerRef = useRef(null);
    const projectIds = Object.keys(groupedByProject);

    const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
    const [selectedTaskIndex, setSelectedTaskIndex] = useState(0);
    const taskContainerRefs = useRef({});

    useEffect(() => {
        if (!projectIds.length) return;
    
        const handleKeyDown = (e) => {
            if (projectIds.length === 0) return;
    
            const currentProjectTasks = groupedByProject[projectIds[selectedProjectIndex]] || [];
            const isAtLastTask = selectedTaskIndex === currentProjectTasks.length - 1;
            const isAtFirstTask = selectedTaskIndex === 0;
    
            if (e.key === "ArrowRight") {
                setSelectedProjectIndex((prev) => Math.min(prev + 1, projectIds.length - 1));
                setSelectedTaskIndex(0); // Reset task selection when switching projects
            } else if (e.key === "ArrowLeft") {
                setSelectedProjectIndex((prev) => Math.max(prev - 1, 0));
                setSelectedTaskIndex(0);
            } else if (e.key === "ArrowDown") {
                setSelectedTaskIndex((prev) => (isAtLastTask ? prev : prev + 1));
            } else if (e.key === "ArrowUp") {
                setSelectedTaskIndex((prev) => (isAtFirstTask ? prev : prev - 1));
            } else if (e.key === "Enter") {
                if (currentProjectTasks[selectedTaskIndex]) {
                    router.push(`/tasks/${currentProjectTasks[selectedTaskIndex].id}`);
                }
            }
        };
    
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedProjectIndex, selectedTaskIndex, groupedByProject, projectIds, router]);

    // Scroll task into view when selected
    useEffect(() => {
        const selectedTaskRef = taskContainerRefs.current[selectedTaskIndex];
        if (selectedTaskRef) {
            selectedTaskRef.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
    }, [selectedTaskIndex]);

    return (
        <div className="relative min-h-screen flex items-end">
            <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto space-x-6 pb-10 scrollbar-hide snap-x snap-mandatory pt-10"
                style={{ scrollBehavior: "smooth", whiteSpace: "nowrap" }}
            >
                {projectIds.map((projectId, projectIndex) => {
                    const projectTasks = groupedByProject[projectId] || [];

                    return (
                        <motion.div
                            key={projectId}
                            className={`p-6 rounded-xl border min-w-[400px] max-w-[400px] snap-center relative transition-all duration-300 ${
                                projectIndex === selectedProjectIndex ? "bg-blue-800 border-blue-500 text-white" : "bg-black border-gray-700"
                            }`}
                        >
                            {/* Project Name */}
                            <div className="text-white font-semibold text-3xl mb-2">
                                {projectTasks[0]?.projectName || "Unnamed Project"}
                            </div>

                            {/* Scrollable Task List */}
                            <div className="space-y-2 max-h-[400px] overflow-y-auto">
                                {projectTasks.map((task, taskIndex) => {
                                    const isSelectedTask = projectIndex === selectedProjectIndex && taskIndex === selectedTaskIndex;
                                    return (
                                        <div
                                            key={task.id}
                                            ref={(el) => (taskContainerRefs.current[taskIndex] = el)}
                                            className={`p-4 rounded-lg border transition-all duration-200 ${
                                                isSelectedTask
                                                    ? "bg-blue-500 border-blue-300 text-white"
                                                    : "bg-gray-900 border-gray-600"
                                            }`}
                                        >
                                            <div className="font-semibold">{task.name || "Unnamed Task"}</div>
                                            <div className="text-gray-400">{task.description || "No description available."}</div>
                                            <div className="text-gray-400">Status: {task.status}</div>
                                            <div className="text-gray-400">Created: {task.createdAt}</div>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Scroll Buttons */}
            <div className="absolute top-1/2 -translate-y-1/2 left-2">
                <button
                    className="p-2 bg-gray-700 text-white rounded-full shadow-lg hover:bg-gray-600"
                    onClick={() => setSelectedProjectIndex((prev) => Math.max(prev - 1, 0))}
                >
                    ◀
                </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-2">
                <button
                    className="p-2 bg-gray-700 text-white rounded-full shadow-lg hover:bg-gray-600"
                    onClick={() => setSelectedProjectIndex((prev) => Math.min(prev + 1, projectIds.length - 1))}
                >
                    ▶
                </button>
            </div>
        </div>
    );
};



const CompanyHeader = ({ company }) => {
    const [showProjects, setShowProjects] = useState(false);
    return (
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
                <Link className="text-xl font-semibold text-white mr-2" href={`/portal/${company.id}`}>
                    {company.properties.name}
                </Link>
                <div className="opacity-80 text-gray-500 flex items-center space-x-3 hover:opacity-100">
                    <HubspotLinkButton hubspotId={company.id} />
                    <DriveLinkButton folderId={company.properties.drive_folder_id} />
                    {company.properties.managing_content_ === "true" && (
                        <Button>
                            <Link href={`/portal/${company.id}/content`}>Content</Link>
                        </Button>
                    )}
                </div>
            </div>
            <button
                onClick={() => setShowProjects(!showProjects)}
                className="text-sm font-semibold text-gray-300 hover:text-white"
            >
                {showProjects ? "Hide projects" : "Show projects"}
            </button>
        </div>
    );
}

// Boot Sequence Component
// const BootSequence = ({ onComplete }) => {
//     const [text, setText] = useState([]);
//     const [isComplete, setIsComplete] = useState(false);
    
//     const bootLines = [
//         "Initializing StrongStart Portal...",
//         "Loading user settings...",
//         "Fetching projects from database...",
//         "Optimizing data...",
//         "Finalizing setup...",
//         "System Ready."
//     ];

//     useEffect(() => {
//         let i = 0;
//         setText([]);
//         console.log("Boot sequence started...");

//         const interval = setInterval(() => {
//             if (i < bootLines.length) {
//                 setText((prev) => [...prev, bootLines[i]]);
//                 console.log(bootLines[i]);
//                 i++;
//             } else {
//                 clearInterval(interval);
//                 setIsComplete(true); // Marks boot sequence as complete
//                 setTimeout(onComplete, 500); // Delays removal for smooth fade-out
//             }
//         }, 700);

//         return () => clearInterval(interval);
//     }, [onComplete]);

//     return (
//         <motion.div
//             initial={{ opacity: 1 }}
//             animate={{ opacity: isComplete ? 0 : 1 }}
//             transition={{ duration: 1 }}
//             className="flex flex-col items-start text-left font-mono text-green-400 tracking-wide bg-black p-6 rounded-lg shadow-lg"
//         >
//             {text.map((line, index) => (
//                 <motion.div
//                     key={index}
//                     initial={{ opacity: 0, y: 5 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.5, delay: index * 0.3 }}
//                     className="text-sm md:text-lg"
//                 >
//                     {line}
//                 </motion.div>
//             ))}
//         </motion.div>
//     );
// };
