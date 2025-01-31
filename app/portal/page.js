"use client";
import React, { useState, useEffect } from "react";
import { useHubspot } from "../providers/HubspotProvider";
import DriveLinkButton from "../components/DriveLinkButton";
import HubspotLinkButton from "../components/portal/HubspotLinkButton";
import Link from "next/link";
import ProjectCard from "../components/projects/ProjectCard";
import Button from "../components/Button";
import PortalTimelineView from "../components/portal/PortalTimelineView";
import { useTasks } from "../providers/TasksProvider";
import { motion } from "framer-motion";

export default function PortalSelector() {
    const [projects, setProjects] = useState([]);
    const {tasks } = useTasks();
    const [companiesWithProjects, setCompaniesWithProjects] = useState([]);
    const { companies } = useHubspot();
    const [loading, setLoading] = useState(false);
    const [activeView, setActiveView] = useState("board"); // "board" or "timeline"

    useEffect(() => {
        if (!companies || companies.length === 0 || loading) return;
    
        const bootAndFetch = async () => {
            setLoading(true); // Ensure loading is set early to prevent UI flicker
    
            // Boot sequence duration (e.g., 3 seconds)
            await new Promise((resolve) => setTimeout(resolve, 3000));
    
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

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-black text-green-400 font-mono">
                <div className="text-lg">
                    <BootSequence />
                </div>
            </div>
        );
    }

    return (
        <div className="">
            {/* Tab Selector */}
            <div className="flex space-x-4 border-b border-gray-700 mb-6 mt-1 sticky top-20 bg-black z-10">
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
            </div>

            {/* Content Based on Active View */}
            {activeView === "timeline" && (
                <PortalTimelineView companies={companiesWithProjects} />
            )}
               
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
            {
                activeView === "tasks" && (
                    <div className="grid grid-cols-1 gap-4">
                        {tasks.map((task) => (
                            <div key={task.id} className="p-6 bg-black rounded-xl border border-gray-700">
                                
                            </div>
                        ))}
                    </div>
                )
            }
            {
                activeView === "calendar" && (
                    <div className="grid grid-cols-1 gap-4">
                        {tasks.map((task) => (
                            <div key={task.id} className="p-6 bg-black rounded-xl border border-gray-700">
                                
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
    );
}

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
const BootSequence = () => {
    const [text, setText] = useState([]);
    const bootLines = [
        "Initializing StrongStart Portal...",
        "Loading user settings...",
        "Fetching projects from database...",
        "Optimizing data...",
        "Finalizing setup...",
        "System Ready."
    ];

    useEffect(() => {
        let i = 0;
        setText([]);
        console.log("Boot sequence started...");

        const interval = setInterval(() => {
            if (i < bootLines.length) {
                setText((prev) => [...prev, bootLines[i]]);
                console.log(bootLines[i]);
                i++;
            } else {
                clearInterval(interval);
            }
        }, 700);

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-start text-left font-mono text-green-400 tracking-wide bg-black p-6 rounded-lg shadow-lg"
        >
            {text.map((line, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.3 }}
                    className="text-sm md:text-lg"
                >
                    {line}
                </motion.div>
            ))}
        </motion.div>
    );
};