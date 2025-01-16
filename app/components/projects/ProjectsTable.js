"use client";

import React from "react";
import { useProjects } from "../../providers/ProjectsProvider";
import Link from "next/link";

const ProjectsTable = () => {
  const { projects, loading, removeProject } = useProjects();

  if (loading) return <p>Loading projects...</p>;
  if (projects.length === 0) return <p>No projects found for this client.</p>;


  return (
    <div className="border-t border-gray-200">
      {projects.map((project) => (
        <div
          key={project.id}
          className="border-b border-gray-200 py-4 flex justify-between items-center"
        >
          <ProjectItem project={project} />
        </div>
      ))}
    </div>
  );
};

const ProjectItem = ({ project }) => {
  // take the first 5 characters off of the project.jobNumber and return it as a string 2025-0001 => 0001
  const jobNumber = project.jobNumber.slice(-5);

  return (
    <Link href={`/portal/${project.hubspotId}/projects/${project.id}`} className=" text-gray-800 hover:text-gray-500">
      <h3 className="text-sm font-semibold">#{jobNumber}-{project.title}</h3>
    </Link>
  );
};


export default ProjectsTable;