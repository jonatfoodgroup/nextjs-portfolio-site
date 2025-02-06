"use client";
import React, { useEffect, useState } from "react";
import { useTasks } from "../../providers/TasksProvider";
import { firestore } from "../../firebase/config";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import SubTaskItem from "./SubTaskItem";
import { StepsProvider } from "../../providers/StepsProvider";
import Button from "../Button";

const Subtasks = ({ parentTaskId }) => {
    const [subtasks, setSubtasks] = useState([]);
    const { addTask } = useTasks();
    const [newSubtaskName, setNewSubtaskName] = useState("");

    useEffect(() => {
        if (!parentTaskId) return;

        const q = query(
            collection(firestore, "tasks"),
            where("parentTaskId", "==", parentTaskId),
            orderBy("createdAt")
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const subtasksData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setSubtasks(subtasksData);
        });

        return () => unsubscribe();
    }, [parentTaskId]);

    const handleAddSubtask = () => {
        if (!newSubtaskName.trim()) return;

        addTask({
            name: newSubtaskName,
            parentTaskId,
        });

        setNewSubtaskName("");
    }
    return (
        <>
            {/* Subtasks Section */}
            < div className="space-y-4" >
             {/* Add Subtask Input */}
             <div className="flex flex-row items-center w-full bg-gray-800 rounded-lg my-4 space-x-4">
                    {/* Subtask Input */}
                    <input
                        type="text"
                        value={newSubtaskName}
                        onChange={(e) => setNewSubtaskName(e.target.value)}
                        placeholder="Enter subtask name..."
                        className="flex-grow p-3 bg-gray-900 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                    />

                    {/* Add Button */}
                    <Button
                        variant="solid"
                        onClick={handleAddSubtask}
                        className="bg-green-500 text-white px-8 py-3 rounded-lg shadow-md hover:bg-green-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
                    >
                        Add Subtask
                    </Button>
                </div>
                <h3 className="text-lg font-semibold text-white">Subtasks</h3>
                <ul className="space-y-2">
                    {subtasks
                        .map((subtask) => (
                            <StepsProvider key={subtask.id} taskId={subtask.id}>
                                <SubTaskItem key={subtask.id} subtask={subtask} />
                            </StepsProvider>
                        ))}
                </ul>

               
            </div >
        </>
    )
};

export default Subtasks;