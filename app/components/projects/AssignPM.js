"use client";

import React, { useState } from "react";
import Select from "react-select";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../firebase/config";
import { useUsers } from "../../providers/UserProvider";
import customStyles from "../../utils/select-styles";
import { toast } from "react-hot-toast";

const AssignPM = ({ projectId, currentPM }) => {
    const { users, loading } = useUsers();
    const [selectedPM, setSelectedPM] = useState(
        currentPM ? { value: currentPM.id, label: currentPM.name } : null
    );

    // Options for the Select dropdown
    const userOptions = users.map((user) => ({
        value: user.id,
        label: `${user.username}`,
    }));

    // Handle PM assignment
    const handleAssignPM = async (selectedOption) => {
        const userId = selectedOption?.value;
        setSelectedPM(selectedOption);

        if (!userId) return;

        const projectDoc = doc(firestore, "projects", projectId);
        try {
            await updateDoc(projectDoc, {
                projectManager: {
                    id: userId,
                    name: selectedOption.label,
                },
            });
            console.log("PM assigned successfully!");
            toast.success("Project Manager assigned!");
        } catch (error) {
            console.error("Error assigning PM:", error);
        }
    };

    console.log('Current PM:', currentPM);

    return (
        <div className="p-4 bg-gray-800 rounded-md">
            <h3 className="text-white text-lg font-semibold mb-2">Assign Project Manager</h3>
            {loading ? (
                <p className="text-gray-400">Loading users...</p>
            ) : (
                <Select
                    options={userOptions}
                    value={selectedPM}
                    onChange={handleAssignPM}
                    placeholder="Select Project Manager"
                    isClearable
                    styles={customStyles}
                />
            )}
            {selectedPM && (
                <p className="text-gray-400 mt-2">
                    Assigned PM: <span className="text-white">{selectedPM.label}</span>
                </p>
            )}
        </div>
    );
};

export default AssignPM;