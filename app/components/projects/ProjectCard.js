"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import PMAvatar from "./PMAvatar";

const ProjectCard = ({ project, company }) => {
    if (!project || !company) {
        return (
            <div className="border border-gray-700 rounded-xl p-4 bg-gray-800">
                <p className="text-gray-400">Loading project details...</p>
            </div>
        );
    }

    const pm = project.projectManager;

    // Map status to colors
    const getStatusColor = (status) => {
        switch (status) {
            case "Off track":
                return "bg-red-600";
            case "On track":
                return "bg-green-600";
            case "On hold":
                return "bg-yellow-600";
            case "Complete":
                return "bg-gray-600";
            default:
                return "bg-gray-800";
        }
    };

    // Determine card border color based on status
    const statusColor = project.status?.status === "Off track" ? "bg-red-700 border-red-500" : "bg-black/40 border-gray-700";

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
            className={`relative ${statusColor} backdrop-blur-md border rounded-xl p-6 transition-all 
            hover:shadow-lg min-h-[420px] flex flex-col items-center text-center`}
        >
            {/* Project Status Badge */}
            <div className={`absolute bottom-2 right-2 px-3 py-1 rounded-lg text-xs font-medium text-white ${getStatusColor(project.status?.status)}`}>
                {project.status?.status || "On hold"}
            </div>

            {/* Company Name & Project ID */}
            <div className="absolute top-2 right-2 bg-gray-800 text-xs px-3 py-1 rounded-lg text-white">
                {company.properties.name}
            </div>

            <div className="absolute top-2 left-2 bg-gray-800 text-xs px-3 py-1 rounded-lg text-white">
                {project.id}
            </div>

            {/* Title & Description */}
            <div className="w-full flex flex-col text-start mt-12">
                <Link
                    href={`/portal/${company.id}/projects/${project.id}`}
                    className="text-lg font-semibold text-white"
                >
                    {project.title || "Untitled Project"}
                </Link>

                <p className="text-sm text-gray-400 mt-2 text-start">{project.status?.note || "No details available."}</p>
            </div>

            {/* Project Manager Avatar */}
            {pm && (
                <div className="mt-6 flex flex-col items-center">
                    <PMAvatar pm={pm} />
                </div>
            )}
        </motion.div>
    );
};

export default ProjectCard;