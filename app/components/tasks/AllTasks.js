"use client";
import React, { useState, useEffect } from "react";
import { useTasks } from "../../providers/TasksProvider";

export default function AllTasks() {
    const { getAllTasks } = useTasks();
    const [groupedTasks, setGroupedTasks] = useState({});

    useEffect(() => {
        getAllTasks().then((tasks) => {

            // Group tasks by hubspotId, then by projectId
            const groupedByClient = tasks.reduce((acc, task) => {
                const clientId = task.hubspotId || "Unassigned Client"; // Handle tasks without hubspotId
                const projectId = task.projectId || "Unassigned Project"; // Handle tasks without projectId

                if (!acc[clientId]) {
                    acc[clientId] = {};
                }

                if (!acc[clientId][projectId]) {
                    acc[clientId][projectId] = [];
                }

                acc[clientId][projectId].push(task);
                return acc;
            }, {});

            // Sort tasks within each project by startDate
            Object.keys(groupedByClient).forEach((clientId) => {
                Object.keys(groupedByClient[clientId]).forEach((projectId) => {
                    groupedByClient[clientId][projectId].sort((a, b) => {
                        const startA = a.startDate ? new Date(a.startDate) : null;
                        const startB = b.startDate ? new Date(b.startDate) : null;
                        if (startA && startB) {
                            return startA - startB;
                        }
                        return startA ? -1 : startB ? 1 : 0;
                    });
                });
            });

            setGroupedTasks(groupedByClient);
        });
    }, []);

    return (
        <div>
            <h1>All Tasks</h1>
            {Object.entries(groupedTasks).map(([clientId, projects]) => (
                <div key={clientId} className="mb-8">
                    <h2 className="text-xl font-bold mb-4">
                        Client: {clientId}
                    </h2>
                    {Object.entries(projects).map(([projectId, tasks]) => (
                        <div key={projectId} className="mb-6 ml-4">
                            <h3 className="text-lg font-semibold mb-2">
                                <Project projectId={projectId} />
                            </h3>
                            <ul>
                                {tasks.map((task) => (
                                    <li
                                        key={task.id}
                                        className="border p-4 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow mb-2"
                                    >
                                        <strong>{task.name}</strong>
                                        <p>
                                            Start:{" "}
                                            {task.startDate
                                                ? new Date(task.startDate).toLocaleString()
                                                : "No start date available"}
                                        </p>
                                        <p>
                                            End:{" "}
                                            {task.endDate
                                                ? new Date(task.endDate).toLocaleString()
                                                : "No end date available"}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

const Project = ({ projectId }) => {
    const [project, setProject] = useState(null);

    // make api request to /api/projects/get-project/{projectId}
    useEffect(() => {
        fetch(`/api/projects/get-projects/${projectId}`)
            .then((response) => response.json())
            .then((data) => setProject(data));
    }, [projectId]);

    if (!project) {
        return <span>Loading...</span>;
    }
    return (
        <>
           {project.title}
        </>
    );
}