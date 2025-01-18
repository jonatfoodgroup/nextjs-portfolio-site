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
    const [paddingSize, setPaddingSize] = useState(2);
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
        <div className="">
            {/* Display projects by company */}
            {companies.map((company) => {
                const companyProjects = projects.filter((project) => project.hubspotId === company.id);
                return (
                    <div key={company.id} className="mb-4 p-6 bg-gray-800 rounded-xl border border-gray-700">
                        <div className="flex items-center space-x-2 mb-4">
                            <Link className="text-xl font-semibold text-white mr-2"
                                href={`/portal/${company.id}`}
                            >{company.properties.name}
                            </Link>
                            <div className="opacity-80 text-gray-500 flex items-center space-x-3 hover:opacity-100">
                                <HubspotLinkButton hubspotId={company.id} />
                                <DriveLinkButton folderId={company.properties.drive_folder_id} />
                            </div>
                        </div>
                        <table className="min-w-full divide-y divide-gray-600">
                            {/* <ProjectTableHeader /> */}
                            <tbody className="bg-gray-800">
                                {companyProjects.map((project) => (
                                    <tr key={project.id}>
                                        <td className={`px-6 py-${paddingSize} whitespace-nowrap text-center w-32`}>
                                            <ProjectStatus status={project.status?.status} />
                                        </td>
                                        <td className={`px-6 py-${paddingSize} whitespace-nowrap w-96`}>
                                            <Link
                                                href={`/portal/${company.id}/projects/${project.id}`}
                                                className="text-sm font-semibold text-gray-300 hover:text-white"
                                            >{project.title}</Link>
                                        </td>
                                        
                                        {/* <td className={`px-6 py-${paddingSize} whitespace-nowrap`}>
                                            <span className="text-xs text-gray-400">{project.jobNumber.slice(-5)}</span>
                                        </td> */}
                                        <td className={`px-6 py-${paddingSize}`}>
                                            <StatusUpdate note={project.status?.note} status={project.status?.status} timestamp={project.status?.timestamp} />
                                        </td>
                                        <td className={`px-6 py-${paddingSize} text-xl whitespace-nowrap text-center`}>
                                            <DiscordLinkButton discordChannelId={project.discordChannelId} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )
            })}
        </div>
    )
}

const ProjectTableHeader = () => {
    return (
        <thead className="bg-gray-800">
            <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Status</th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-96">Project Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Job #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Note</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32 text-center">Actions</th>
            </tr>
        </thead>
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
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${badgeStyle(status)}`}>
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