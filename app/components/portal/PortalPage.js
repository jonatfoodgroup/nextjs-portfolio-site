"use client";
import React, { useState, useEffect } from "react";
import AddGoalForm from "../goals/AddGoalForm";
import { GoalsProvider } from "../../providers/GoalsProvider";
import GoalsList from "../goals/GoalsList";
import AddProjectForm from "../projects/AddProjectForm";
import { ProjectsProvider } from "../../providers/ProjectsProvider";
import DriveLinkButton from "../DriveLinkButton";
import ProjectsTable from "../projects/ProjectsTable";
import HubspotLinkButton from "./HubspotLinkButton";

export default function PortalPage({ hubspotId }) {
    const [company, setCompany] = useState(null);
    const [loadingCompany, setLoadingCompany] = useState(true);

    useEffect(() => {

        if (!hubspotId) {
            return;
        }
        // Fetch company details
        fetch(`/api/hubspot/get-companies/${hubspotId}`)
            .then((res) => res.json())
            .then((data) => setCompany(data.company))
            .finally(() => setLoadingCompany(false));

    }, [hubspotId]);


    if (!hubspotId) {
        return <p>No company ID provided.</p>;
    }
    return (
        <>
            {/* Company Section */}
            {loadingCompany ? (
                <p>Loading company details...</p>
            ) : (
                <>
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-2xl font-regular mb-2 text-white">
                            {company?.properties?.name || "Company Name"}
                        </h1>
                        <div className="flex items-center space-x-2">
                            <HubspotLinkButton hubspotId={hubspotId} />
                            <DriveLinkButton folderId={company.properties.drive_folder_id} />
                        </div>
                    </div>
                    <Projects hubspotId={hubspotId} />
                    <Goals hubspotId={hubspotId} />

                </>
            )}
        </>
    );
}

const Goals = ({
    hubspotId
}) => {
    const [showAddGoalForm, setShowAddGoalForm] = useState(false);
    return (
        <GoalsProvider hubspotId={hubspotId}>
            <div className="flex items-center justify-between mt-10">
                <h2 className="text-xl font-regular text-gray-400">Goals</h2>
                <button
                    onClick={() => setShowAddGoalForm(!showAddGoalForm)}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    {showAddGoalForm ? "Cancel" : "Add Goal"}
                </button>
            </div>
            {showAddGoalForm && <AddGoalForm />}
            <GoalsList />
        </GoalsProvider>
    );
}

const Projects = ({
    hubspotId
}) => {
    const [showAddProjectForm, setShowAddProjectForm] = useState(false);
    return (
        <ProjectsProvider hubspotId={hubspotId}>
            <div className="flex items-center justify-between py-4">
                <h2 className="text-xl font-regular text-gray-400">Projects</h2>

                <button
                    onClick={() => setShowAddProjectForm(!showAddProjectForm)}
                    className="text-gray-800 px-4 py-2 rounded border border-gray-800"
                >
                    {showAddProjectForm ? "Cancel" : "Add Project"}
                </button>
            </div>
            {showAddProjectForm && <AddProjectForm />}
            <ProjectsTable />
        </ProjectsProvider>
    );
}