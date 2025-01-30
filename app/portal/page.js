"use client";
import React, { useState, useEffect } from "react";
import { useHubspot } from "../providers/HubspotProvider";
import DriveLinkButton from "../components/DriveLinkButton";
import HubspotLinkButton from "../components/portal/HubspotLinkButton";
import Link from "next/link";
import ProjectCard from "../components/projects/ProjectCard";
import Button from "../components/Button";
import PortalTimelineView from "../components/portal/PortalTimelineView";

export default function PortalSelector() {
    const [projects, setProjects] = useState([]);
    const [companiesWithProjects, setCompaniesWithProjects] = useState([]);
    const { companies } = useHubspot();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Exit early if companies are not available or if loading is in progress
        if (!companies || companies.length === 0 || loading) return;
    
        const fetchProjects = async () => {
            setLoading(true); // Set loading to true to prevent further fetches during the current one
            try {
                const res = await fetch("/api/projects/get-projects");
                const data = await res.json();
    
                // Map projects to their respective companies
                const updatedCompanies = companies.map((company) => ({
                    ...company,
                    projects: data.filter((project) => project.hubspotId === company.id),
                }));
    
                setProjects(data);
                setCompaniesWithProjects(updatedCompanies);
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setLoading(false); // Reset loading state once the request completes
            }
        };
    
        fetchProjects();
    }, [companies]); // Only depends on `companies`, not `loading` anymore// Now it only depends on `companies`ng` in dependency ensures effect runs after it is reset

    return (
        <div className="grid grid-cols-1 gap-4">
            {/* Pass the updated companies list with projects to the Timeline */}
            <PortalTimelineView companies={companiesWithProjects} />

            {/* Display projects grouped by company */}
            {companiesWithProjects.map((company) => (
                <div key={company.id} className="p-6 bg-gray-900 rounded-xl border border-gray-700">
                    <CompanyHeader company={company} />
                    <div className="bg-gray-900 align-top grid grid-cols-1 md:grid-cols-6 gap-4">
                        {company.projects.map((project) => (
                            <ProjectCard key={project.id} project={project} company={company} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

const CompaniesCard = ({ company }) => {
    const [showProjects, setShowProjects] = useState(false);
    return (
        <div className="flex items-center space-x-2">
            <Link
                href={`/portal/${company.id}`}
                className="text-xl font-semibold text-white"
            >{company.properties.name}
            </Link>
            <div className="opacity-80 text-gray-500 flex items-center space-x-3 hover:opacity-100">
                <HubspotLinkButton hubspotId={company.id} />
                <DriveLinkButton folderId={company.properties.drive_folder_id} />
            </div>
        </div>
    )
}

const CompanyHeader = ({
    company,
    showProjects,
    setShowProjects,
}) => {

    return (
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
                <Link className="text-xl font-semibold text-white mr-2"
                    href={`/portal/${company.id}`}
                >{company.properties.name}
                </Link>
                <div className="opacity-80 text-gray-500 flex items-center space-x-3 hover:opacity-100">
                    <HubspotLinkButton hubspotId={company.id} />
                    <DriveLinkButton folderId={company.properties.drive_folder_id} />

                    {
                        company.properties.managing_content_ == "true" ? (
                            <Button>
                                <Link href={`/portal/${company.id}/content`}>
                                    Content
                                </Link>
                            </Button>
                        ) : null
                    }
                </div>
            </div>
            <button
                onClick={() => setShowProjects(!showProjects)}
                className="text-sm font-semibold text-gray-300 hover:text-white"
            >
                {showProjects ? "Hide projects" : "Show projects"}
            </button>
        </div>
    )
}
