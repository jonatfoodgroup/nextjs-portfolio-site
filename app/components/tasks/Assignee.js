"use client";

import React, { useMemo, useState } from "react";
import Select from "react-select";
import { useUsers } from "../../providers/UserProvider";
import { firestore } from "../../firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import { toast } from "react-hot-toast";
import customStyles from "../../utils/select-styles";

const Assignee = ({ task }) => {
    const { users } = useUsers();
    const [selectedUser, setSelectedUser] = useState(
        task.assignee ? { value: task.assignee.id, label: task.assignee.name, avatar: task.assignee.avatar } : null );

    // Map users to options for react-select
    const userOptions = useMemo(() => {
        return users.map((user) => ({
            value: user.id,
            label: user.username || "Unknown User",
            avatar: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` || null,
        }));
    }, [users]);

    // Handle assignee change
    const handleChange = async (selectedOption) => {
        const userId = selectedOption?.value || null;
        const userName = selectedOption?.label || null;
        const userAvatar = selectedOption?.avatar || null;

        // Update local state
        setSelectedUser(selectedOption);

        // Update the task in Firestore
        const taskDoc = doc(firestore, "tasks", task.id);
        try {
            await updateDoc(taskDoc, {
                assignee: userId ? { id: userId, name: userName, avatar: userAvatar } : null,
            });
            toast.success("Assignee updated successfully!");
        } catch (error) {
            console.error("Failed to update assignee:", error);
            toast.error("Failed to update assignee.");
        }
    };

    return (
        <div className="flex flex-col space-y-2">
            {/* <label className="text-gray-400 text-sm font-medium">Assignee:</label> */}
            <Select
                options={userOptions}
                value={selectedUser}
                onChange={handleChange}
                placeholder="Select Assignee"
                isClearable
                styles={customStyles}
                getOptionLabel={(e) => (
                    <div className="flex items-center space-x-2">
                        {e.avatar ? (
                            <img
                                src={e.avatar}
                                alt={e.label || "Avatar"}
                                className="w-6 h-6 rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-700 text-white">
                                {(e.label || "N/A")
                                    .split(" ")
                                    .map((part) => part[0])
                                    .join("")
                                    .toUpperCase()}
                            </div>
                        )}
                        <span>{e.label || "N/A"}</span>
                    </div>
                )}
            />
        </div>
    );
};

export default Assignee;