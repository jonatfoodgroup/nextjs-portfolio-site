"use client";
import React from "react";
import Link from "next/link";
import DiscordLinkButton from "../DiscordLinkButton";
import PMAvatar from "./PMAvatar";


const ProjectCard = ({ project, company, showClient = false }) => {
    // Ensure project and company exist
    if (!project || !company) {
        return (
            <div className="border border-gray-700 rounded-xl p-4 bg-gray-800">
                <p className="text-gray-400">Loading project details...</p>
            </div>
        );
    }

    const pm = project.projectManager;

    return (
        <Link
            href={`/portal/${company.id}/projects/${project.id}`}
            className={`border border-gray-700 rounded-xl p-4 ${project.status?.status === "Off track"
                ? "border-red-500"
                : "border-gray-800 bg-gray-800"
                }`}
        >
            {/* Project Status */}
            <div className="flex items-center justify-between">
                <ProjectStatus status={project.status?.status} />
                <div className="text-xs text-gray-600 bg-transparent border border-gray-800 px-2 py-1 rounded">
                    {/* Display job number if available */}
                    {/* {project.jobNumber ? project.jobNumber.slice(-5) : "N/A"} */}
                    {company.properties.name}
                </div>
            </div>

            {/* Project Title */}
            <div className="pt-2 pb-1">
                <h3
                    className="text-md font-semibold text-gray-300 hover:text-white"
                >
                    {project.title || "Untitled Project"}
                </h3>
            </div>

            {/* Status Update */}
            <div>
                <StatusUpdate
                    note={project.status?.note}
                    status={project.status?.status}
                    timestamp={project.status?.timestamp}
                />
            </div>

            <div className="flex items-center justify-between mt-6 align-middle">
                {/* Project Manager */}
                <PMAvatar pmId={pm?.id} />
                {/* Discord Button */}
                <div className="text-xl">
                    <DiscordLinkButton discordChannelId={project.discordChannelId} />
                </div>
            </div>
        </Link>
    );
};

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
        <div className="flex flex-col space-y-1 mt-1">
            <span
                className={`text-sm ${(status === 'Off track') ? 'text-red-600 font-semibold' : 'text-gray-400'} break-words`}
            >{note}</span>
        </div>
    );
}

export default ProjectCard;