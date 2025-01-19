"use client";
import React, { useState, useEffect } from "react";
import { useHubspot } from "../providers/HubspotProvider";
import DriveLinkButton from "../components/DriveLinkButton";
import HubspotLinkButton from "../components/portal/HubspotLinkButton";
import DiscordLinkButton from "../components/DiscordLinkButton";
import Link from "next/link";
import UserList from "../components/users/UserList";
export default function PortalSelector() {
    const [projects, setProjects] = useState([]);
    const [paddingSize, setPaddingSize] = useState(4);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [filters, setFilters] = useState({
        search: "",
        status: "",
    });

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
                    <div key={company.id} className="mb-4 p-6 bg-gray-800 rounded-xl border border-gray-700">
                        <CompanyHeader company={company} />
                        {/* <ProjectTableHeader /> */}
                        <div className="bg-gray-800 align-top grid grid-cols-1 md:grid-cols-4 gap-4">
                            {companyProjects.map((project) => (
                                <div key={project.id} className="border border-gray-700 rounded-xl p-4">
                                    <div >
                                        <ProjectStatus status={project.status?.status} />
                                    </div>
                                    <div className="py-1">
                                        <Link
                                            href={`/portal/${company.id}/projects/${project.id}`}
                                            className="text-sm font-semibold text-gray-300 hover:text-white"
                                        >{project.title}</Link>
                                    </div>

                                    {/* <td className={`px-6 py-${paddingSize} whitespace-nowrap`}>
                                            <span className="text-xs text-gray-400">{project.jobNumber.slice(-5)}</span>
                                        </td> */}
                                    <div >
                                        <StatusUpdate note={project.status?.note} status={project.status?.status} timestamp={project.status?.timestamp} />
                                    </div>
                                    <div className="mt-4 flex">
                                        <DiscordLinkButton discordChannelId={project.discordChannelId} />
                                    </div>
                                </div>
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
        <div className="flex items-center justify-between mb-4">
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

const ProjectStatus = ({ status }) => {
    const badgeStyle = (status) => {
        switch (status) {
            case "On track":
                return "bg-gray-800 text-green-500";
            case "Off track":
                return "bg-gray-800 text-red-500";
            case "On hold":
                return "bg-gray-800 text-yellow-500";
            default:
                return "bg-gray-800 text-gray-500";
        }
    };

    return (
        <span className={`rounded-full text-xs font-medium ${badgeStyle(status)}`}>
            {status || "No status"}
        </span>
    );
}

const StatusUpdate = ({ note, timestamp, status }) => {
    return (
        <div className="flex flex-col space-y-1">
            <span
                className={`text-sm ${(status === 'Off track') ? 'text-red-600 font-semibold' : 'text-gray-400'}`}
            >{note}</span>
        </div>
    );
}