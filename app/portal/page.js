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

export default function PortalSelector() {
    const [projects, setProjects] = useState([]);
    const {tasks } = useTasks();
    const [companiesWithProjects, setCompaniesWithProjects] = useState([]);
    const { companies } = useHubspot();
    const [loading, setLoading] = useState(false);
    const [activeView, setActiveView] = useState("board"); // "board" or "timeline"

    useEffect(() => {
        if (!companies || companies.length === 0 || loading) return;

        const fetchProjects = async () => {
            setLoading(true);
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
                setLoading(false);
            }
        };

        fetchProjects();
    }, [companies]);

    return (
        <div className="">
            {/* Tab Selector */}
            <div className="flex space-x-4 border-b border-gray-700 mb-6 mt-1 sticky top-20 bg-gray-800 z-10">
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