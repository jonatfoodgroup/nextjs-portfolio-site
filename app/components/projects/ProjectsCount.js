"use client";
import { useProjects, ProjectsProvider } from "../../providers/ProjectsProvider";
import { useState, useEffect } from "react";

const ProjectsCount = ({
    hubspotId
}) => {    
    return (
        <ProjectsProvider hubspotId={hubspotId}>
            <Count />
        </ProjectsProvider>

    );
    }

    const Count = () => {
        const { projects, loading } = useProjects();
        if (loading) return <p>Loading projects...</p>;
        return <p>Project count: {projects.length}</p>;
    }
export default ProjectsCount;