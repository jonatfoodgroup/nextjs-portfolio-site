"use client";
import React from "react";
import Link from "next/link";
import DiscordLinkButton from "../DiscordLinkButton";
import PMAvatar from "./PMAvatar";
import { motion } from "framer-motion";



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
        <motion.div
            initial={{ opacity: 0.9, scale: 1 }}
            whileHover={{
                scale: 1.05,
                y: -5,
                boxShadow: "0px 0px 20px rgba(255, 255, 255, 0.3)",
                background: "linear-gradient(120deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03))",
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="relative bg-black/40 backdrop-blur-md border border-gray-700 rounded-xl p-4 transition-all 
        hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/50 min-h-[420px]"
        >
            {/* Project Status */}
            <div className="absolute bottom-2 left-2 bg-yellow-600 text-xs px-2 py-1 rounded-lg text-white">
                {project.status?.status || "On hold"}
            </div>

            <div className="absolute top-2 right-2 bg-gray-800 text-xs px-2 py-1 rounded-lg text-white">
                {company.properties.name}
            </div>

            <div className="absolute top-2 left-2 bg-gray-800 text-xs px-2 py-1 rounded-lg text-white">
                {project.id}
            </div>

            <div className="absolute top-24 left-4 right-4 flex flex-col items-center justify-end space-y-2">
                {/* Title */}
                <Link 
                    href={`/portal/${company.id}/projects/${project.id}`}
                className="text-lg font-semibold text-white">{project.title || "Untitled Project"}</Link>

                {/* Description */}
                <p className="text-sm text-gray-400">{project.status?.note || "No details available."}</p>

                {/* Dates */}
                <div className="flex justify-between text-xs text-gray-500 w-full px-4">
                    {/* 
                     */}
                </div>

                {/* Bottom Avatar & Discord Icon */}
                <div className="flex items-center text-center mt-4 w-full px-4">
                    <img
                        src={project.manager?.avatar || "/default-avatar.png"}
                        alt="Manager"
                        className="w-8 h-8 rounded-full border border-gray-600"
                    />
                </div>
            </div>
        </motion.div>
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