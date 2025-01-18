"use client";
import React, { useState, useEffect } from "react";
import ProjectPage from "../../../../components/projects/ProjectPage";
import { useParams } from 'next/navigation'
import { Icon } from "@iconify/react/dist/iconify.js";
import { ProjectsProvider } from "../../../../providers/ProjectsProvider";

export default function Page({ params }) {
    const { id,hubspotId } = useParams();
    const [project, setProject] = useState(null);

    useEffect(() => {
        // Fetch project data from API
        fetch(`/api/projects/get-projects/${id}`)
            .then((res) => res.json())
            .then((data) => setProject(data))
            .catch((error) => console.error("Error fetching project:", error));
    }, [id]);

    return (
        <div>
            {
                project ? (
                    <ProjectsProvider hubspotId={hubspotId}>
                        <ProjectPage project={project} />
                    </ProjectsProvider>
                ) : (
                    <div className="flex items-center justify-center h-screen">
                        <Icon icon="akar-icons:loading" className="animate-spin text-4xl text-gray-300" />
                    </div>
                )
            }
            
        </div>
    );
}
    