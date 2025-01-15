"use client";

import React from "react";
import { useProjects } from "../../providers/ProjectsProvider";
import Link from "next/link";

const ProjectsList = () => {
  const { projects, loading, removeProject } = useProjects();

  if (loading) return <p>Loading projects...</p>;
  if (projects.length === 0) return <p>No projects found for this client.</p>;


  return (
    <ul className="space-y-2">
      {projects.map((project) => (
        <li
          key={project.id}
          className=""
        >
          <ProjectItem project={project} />
        </li>
      ))}
    </ul>
  );
};

const ProjectItem = ({ project }) => {
  // take the first 5 characters off of the project.jobNumber and return it as a string 2025-0001 => 0001
  const jobNumber = project.jobNumber.slice(-5);

  return (
    <Link href={`/portal/${project.hubspotId}/projects/${project.id}`} className=" text-gray-500 hover:text-gray-300">
      <h3 className="text-sm font-semibold">#{jobNumber}-{project.title}</h3>
    </Link>
  );
};

export default ProjectsList;