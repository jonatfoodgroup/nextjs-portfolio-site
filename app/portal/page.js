"use client";
import React, { useState, useEffect } from "react";
import { useHubspot } from "../providers/HubspotProvider";
import DriveLinkButton from "../components/DriveLinkButton";
import HubspotLinkButton from "../components/portal/HubspotLinkButton";
import Link from "next/link";
import ProjectCard from "../components/projects/ProjectCard";

export default function PortalSelector() {
    const [projects, setProjects] = useState([]);
    const { companies } = useHubspot();

    useEffect(() => {
        fetch("/api/projects/get-projects")
            .then((res) => res.json())
            .then((data) => {
                const projectsWithCompany = data.map((project) => {
                    const company = companies.find(
                        (company) => company.id === project.hubspotId
                    );
                    return { ...project, company };
                });
                projectsWithCompany.sort((a, b) => a.title.localeCompare(b.title));
                setProjects(projectsWithCompany);
            })
    }, []);
    return (
        <div className="grid grid-cols-1 gap-4">
            {/* Display projects by company */}
            {companies.map((company) => {
                const companyProjects = projects.filter((project) => project.hubspotId === company.id);
                // const [showProjects, setShowProjects] = useState(false);
                return (
                    <div key={company.id} className="p-6 bg-gray-900 rounded-xl border border-gray-700">
                        <CompanyHeader company={company} />
                        {/* <ProjectTableHeader /> */}
                        <div className="bg-gray-900 align-top grid grid-cols-1 md:grid-cols-6 gap-4">
                            {companyProjects.map((project) => (
                                <ProjectCard key={project.id} project={project} company={company} />
                            ))}
                        </div>
                    </div>
                )
            })}
        </div>
    )
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
