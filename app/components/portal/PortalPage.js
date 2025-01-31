"use client";
import React, { useState, useEffect } from "react";
import { ProjectsProvider } from "../../providers/ProjectsProvider";
import DriveLinkButton from "../DriveLinkButton";
import HubspotLinkButton from "./HubspotLinkButton";
import ProjectCard from "../projects/ProjectCard"; // Import ProjectCard
import Modal from "../Modal"; // Import Modal
import AddProjectForm from "../projects/AddProjectForm";
import Button from "../Button";
import TimelineView from "../projects/Timeline";
import StepsTracker from "../Tracker";
import Link from "next/link";

let steps = [
    {
        title: "SoW & Proposal",
        description: "Define the scope of work and create a proposal.",
        icon: "carbon:document-pdf",
    },
    {
        title: "Onboarding",
        description: "Onboard the client and team members.",
        icon: "carbon:user",
    },
    {
        title: "Operating",
        description: "Execute the project plan.",
        icon: "carbon:tools",
    }
]

export default function PortalPage({ hubspotId }) {
    const [company, setCompany] = useState(null);
    const [loadingCompany, setLoadingCompany] = useState(true);
    const [projects, setProjects] = useState([]);
    const [showAddProjectModal, setShowAddProjectModal] = useState(false);
    const [currentStep, setCurrentStep] = useState(2);

    useEffect(() => {
        if (!hubspotId) return;

        // Fetch company details
        fetch(`/api/hubspot/get-companies/${hubspotId}`)
            .then((res) => res.json())
            .then((data) => setCompany(data.company))
            .finally(() => setLoadingCompany(false));

        // Fetch projects
        fetch(`/api/projects/get-projects`)
            .then((res) => res.json())
            .then((data) => {
                const filteredProjects = data.filter((project) => project.hubspotId === hubspotId);
                // order by name
                filteredProjects.sort((a, b) => a.title.localeCompare(b.title));
                setProjects(filteredProjects);
            });
    }, [hubspotId]);

    const handleProjectAdded = (newProject) => {
        setProjects((prevProjects) => [...prevProjects, newProject]);
        setShowAddProjectModal(false); // Close modal after adding project
    };

    if (!hubspotId) {
        return <p>No company ID provided.</p>;
    }

    return (
        <>
            {/* Company Section */}
            {loadingCompany ? (
                <p>Loading company details...</p>
            ) : (
                <div className="space-y-10">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-regular mb-2 text-white">
                            {company?.properties?.name || "Company Name"}
                        </h1>
                        <div className="w-1/2">
                            {/* <StepsTracker steps={steps} currentStep={currentStep} /> */}
                        </div>
                        <div className="flex items-center space-x-2">
                            <HubspotLinkButton hubspotId={hubspotId} />
                            <DriveLinkButton folderId={company?.properties?.drive_folder_id} />
                            <Link href={`/portal/${hubspotId}/content`}>
                                <Button>
                                    Content
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Projects Section */}
                    <ProjectsProvider hubspotId={hubspotId}>
                        <div className="bg-black p-6 rounded-lg border border-gray-700">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-regular text-gray-400">Projects</h2>
                                <Button
                                    onClick={() => setShowAddProjectModal(true)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Add Project
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                                {projects.map((project) => (
                                    <ProjectCard key={project.id} project={project} company={company} />
                                ))}
                            </div>
                        </div>


                        <TimelineView projects={projects} />

                        {/* Modal for Adding Project */}
                        <Modal
                            isOpen={showAddProjectModal}
                            onClose={() => setShowAddProjectModal(false)}
                            title="Add Project"
                        >
                            <AddProjectForm onProjectAdded={handleProjectAdded} hubspotId={hubspotId} />
                        </Modal>
                    </ProjectsProvider>
                </div>
            )}
        </>
    );
}