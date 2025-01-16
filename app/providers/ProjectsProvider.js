"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { collection, query, onSnapshot, where, getDoc, updateDoc, doc } from "firebase/firestore";
import { firestore } from "../firebase/config";
import { useHubspot } from "./HubspotProvider";

const ProjectsContext = createContext();

export const ProjectsProvider = ({ children, hubspotId }) => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const { fetchCompanyById } = useHubspot();

    // Firestore subscription
    useEffect(() => {
        const q = query(collection(firestore, "projects"), where("hubspotId", "==", hubspotId));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const updatedProjects = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setProjects(updatedProjects);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const addProject = async (project) => {

        project.hubspotId = hubspotId;

        let discord_category_id = "";

        if (hubspotId) {
            const company = await fetchCompanyById(hubspotId);
            discord_category_id = company?.properties.discord_category_id;   
        }

        if (!discord_category_id) {
            throw new Error("Discord category ID not found for this company.");
        }

        project.discord_category_id = discord_category_id;
        try {
            const response = await fetch("/api/projects/add-project", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(project),
            });

            if (!response.ok) {
                throw new Error("Failed to create project");
            }

            console.log("Project successfully added via API.");
        } catch (error) {
            console.error("Error adding project:", error.message);
        }
    };

    const removeProject = async (projectId, discordChannelId, title) => {
        try {
            const response = await fetch("/api/projects/remove-project", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ projectId, discordChannelId, title }),
            });

            if (!response.ok) {
                throw new Error("Failed to remove project");
            }

            console.log("Project removed successfully.");
        } catch (error) {
            console.error("Error removing project:", error.message);
        }
    };

    const updateProject = async (projectId, updatedFields) => {
        try {
            const projectRef = doc(firestore, "projects", projectId);
            await updateDoc(projectRef, updatedFields);
    
            console.log("Project successfully updated:", updatedFields);
        } catch (error) {
            console.error("Error updating project:", error.message);
            throw new Error("Failed to update project");
        }
    };

    const addStatusUpdate = async (projectId, newStatus) => {
        const projectRef = doc(firestore, "projects", projectId);
      
        try {
          // Fetch the current project document
          const projectSnap = await getDoc(projectRef);
      
          if (projectSnap.exists()) {
            const projectData = projectSnap.data();
      
            // Check if 'statuses' exists and is an array
            const currentStatuses = Array.isArray(projectData.statuses)
              ? projectData.statuses
              : [];
      
            // Add the new status to the array
            const updatedStatuses = [...currentStatuses, newStatus];
      
            // Update the document with the new statuses array
            await updateDoc(projectRef, { statuses: updatedStatuses });
      

        } else {
            // If the document doesn't exist, initialize it with the new status
            await setDoc(projectRef, { statuses: [newStatus] }, { merge: true });
            console.log("Document initialized and status added!");
          }
        } catch (error) {
          console.error("Error updating status:", error.message);
          throw new Error("Failed to update status");
        }
      };

    const getProjectById = (projectId) => {
        // query from database
        const projectRef = collection(firestore, "projects").doc(projectId);
        const projectDoc = getDoc(projectRef);
        return projectDoc;
    };

    const updateStatus = async (projectId, updatedStatus) => {
        const projectRef = doc(firestore, "projects", projectId);
    
        try {
            // Fetch the current project document
            const projectSnap = await getDoc(projectRef);
    
            if (projectSnap.exists()) {
                const projectData = projectSnap.data();
    
                // Check if 'statuses' exists and is an array
                const currentStatuses = Array.isArray(projectData.statuses) ? projectData.statuses : [];
    
                // Update the specific status by matching a unique property (e.g., timestamp)
                const updatedStatuses = currentStatuses.map((status) =>
                    status.timestamp === updatedStatus.timestamp ? updatedStatus : status
                );
    
                // Update the document with the modified statuses array
                await updateDoc(projectRef, { statuses: updatedStatuses });
    
                console.log("Status successfully updated!");
            } else {
                throw new Error("Project does not exist.");
            }
        } catch (error) {
            console.error("Error updating status:", error.message);
            throw new Error("Failed to update status");
        }
    };
    
    const removeStatus = async (projectId, statusToRemove) => {
        const projectRef = doc(firestore, "projects", projectId);
    
        try {
            // Fetch the current project document
            const projectSnap = await getDoc(projectRef);
    
            if (projectSnap.exists()) {
                const projectData = projectSnap.data();
    
                // Check if 'statuses' exists and is an array
                const currentStatuses = Array.isArray(projectData.statuses) ? projectData.statuses : [];
    
                // Filter out the status to be removed by matching a unique property (e.g., timestamp)
                const updatedStatuses = currentStatuses.filter(
                    (status) => status.timestamp !== statusToRemove.timestamp
                );
    
                // Update the document with the new statuses array
                await updateDoc(projectRef, { statuses: updatedStatuses });
    
                console.log("Status successfully removed!");
            } else {
                throw new Error("Project does not exist.");
            }
        } catch (error) {
            console.error("Error removing status:", error.message);
            throw new Error("Failed to remove status");
        }
    };

    return (
        <ProjectsContext.Provider value={{ projects, loading, addProject, removeProject,getProjectById, updateProject, addStatusUpdate, updateStatus, removeStatus }}>
            {children}
        </ProjectsContext.Provider>
    );
};

export const useProjects = () => useContext(ProjectsContext);