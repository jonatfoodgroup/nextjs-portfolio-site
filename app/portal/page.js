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
import BountyPage from "../bounties/page";
import { BountyProvider } from "../providers/BountyProvider";

export default function PortalSelector() {
    const [projects, setProjects] = useState([]);
    const { tasks } = useTasks();
    const [companiesWithProjects, setCompaniesWithProjects] = useState([]);
    const { companies } = useHubspot();
    const [loading, setLoading] = useState(false);
    const [bootComplete, setBootComplete] = useState(false);
    const [activeView, setActiveView] = useState("board"); // "board" or "timeline"

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
                        activeView === "list" ? "text-white border-b-2 border-blue-500" : "text-gray-400"
                    }`}
                    onClick={() => setActiveView("list")}
                >
                    List
                </button>
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
                        activeView === "bounties" ? "text-white border-b-2 border-blue-500" : "text-gray-400"
                    }`}
                    onClick={() => setActiveView("bounties")}
                >
                    Bounties
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

            {activeView === "list" && <ListView companies={companiesWithProjects} />}

            {/* Content Based    on Active View */}
            {activeView === "timeline" && <PortalTimelineView companies={companiesWithProjects} />}
            {activeView === "board" && (
                <div className="grid grid-cols-1 gap-4">
                    {companiesWithProjects.map((company) => (
                        <div key={company.id} className="p-6 bg-transparent border border-gray-700">
                            <CompanyHeader company={company} />
                            <div className="bg-transparent align-top grid grid-cols-1 md:grid-cols-5 gap-4">
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
                    {/* <TasksView tasks={tasks} /> */}
                </div>
            )}

            {activeView === "bounties" && (
                <BountyProvider>
                    <BountyPage />
                </BountyProvider>
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




const ListView = ({ companies }) => {
    if (!companies) {
        return null;
    }
    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse border border-gray-700">
                <thead className="bg-gray-800 text-gray-300">
                    <tr>
                        <th className="p-3 border border-gray-700">Company</th>
                        <th className="p-3 border border-gray-700">Projects</th>
                        <th className="p-3 border border-gray-700">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {companies.length > 0 ? (
                        companies.map((company, index) => (
                            <motion.tr
                                key={company.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="border border-gray-700 hover:bg-gray-700 transition"
                            >
                                <td className="p-3 text-white">{company.properties.name}</td>
                                <td className="p-3 text-gray-400">{company.projects?.length} Projects</td>
                                <td className="p-3">
                                    <a href={`/portal/${company.id}`} className="text-blue-400 hover:text-blue-300">
                                        View
                                    </a>
                                </td>
                            </motion.tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="p-4 text-center text-gray-400">
                                No companies available.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};


const CompanyHeader = ({ company }) => {
    return (
        <div className="flex flex-col items-center mb-6">
            <div className="flex flex-col text-center items-center">
                <Link className="text-4xl flex font-semibold text-white mr-2" href={`/portal/${company.id}`}>
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
        </div>
    );
}

// Boot Sequence Component
const BootSequence = ({ onComplete }) => {
    const [text, setText] = useState([]);
    const [isComplete, setIsComplete] = useState(false);
    
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
                setIsComplete(true); // Marks boot sequence as complete
                setTimeout(onComplete, 500); // Delays removal for smooth fade-out
            }
        }, 700);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: isComplete ? 0 : 1 }}
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
