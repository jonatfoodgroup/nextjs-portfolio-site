"use client";
import React from "react";
import Link from "next/link";
import DiscordLinkButton from "../DiscordLinkButton";


const ProjectCard = ({ project, company }) => {
    return (
        <div className="border border-gray-700 rounded-xl p-4 bg-gray-800">
            {/* Project Status */}
            <div>
                <ProjectStatus status={project.status?.status} />
            </div>

            {/* Project Title */}
            <div className="pt-2 pb-1">
                <Link
                    href={`/portal/${company.id}/projects/${project.id}`}
                    className="text-md font-semibold text-gray-300 hover:text-white"
                >
                    {project.title}
                </Link>
            </div>

            {/* Status Update */}
            <div>
                <StatusUpdate 
                    note={project.status?.note} 
                    status={project.status?.status} 
                    timestamp={project.status?.timestamp} 
                />
            </div>

            {/* Discord Button */}
            <div className="mt-4 flex text-xl">
                <DiscordLinkButton discordChannelId={project.discordChannelId} />
            </div>
        </div>
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
        <div className="flex flex-col space-y-1">
            <span
                className={`text-sm ${(status === 'Off track') ? 'text-red-600 font-semibold' : 'text-gray-400'}`}
            >{note}</span>
        </div>
    );
}

export default ProjectCard;