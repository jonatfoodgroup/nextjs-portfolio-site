"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { collection, onSnapshot, query, where, addDoc,deleteDoc, getDocs,doc,updateDoc, orderBy } from "firebase/firestore";
import { firestore } from "../firebase/config";
import { toast } from "react-hot-toast";

const TasksContext = createContext();

export const TasksProvider = ({ children, projectId }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subtasks, setSubtasks] = useState([]);

  useEffect(() => {
    if (!projectId) {
      // get all tasks if no project is selected
      const q = query(collection(firestore, "tasks"), orderBy("createdAt", "desc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const tasksData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTasks(tasksData);
        setLoading(false);
      });

      // Cleanup listener on component unmount
      return () => unsubscribe();
    } else {

    // Firestore real-time listener for tasks related to this project
    const q = query(
      collection(firestore, "tasks"),
      where("projectId", "==", projectId),
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasksData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(tasksData);
      setLoading(false);
    });

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }

    
  }, [projectId]);

  const getAllTasks = async () => {
    try {
      // Query to fetch all tasks where projectId is not null
      const q = query(collection(firestore, "tasks"), where("projectId", "!=", null));
      const querySnapshot = await getDocs(q);
  
      const tasksData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      
      return tasksData;
    } catch (error) {
      console.error("Error fetching tasks:", error.message);
    }
  };

  const updateTask = async (taskId, updates) => {
    try {
      const taskRef = doc(firestore, "tasks", taskId);
      await updateDoc(taskRef, updates);
      console.log(`Task ${taskId} updated successfully`);
      toast.success("Task updated!");
    } catch (error) {
      console.error("Error updating task:", error.message);
    }
  };
  
  const addTask = async (task, parentTaskId) => {
    try {
      if (!task.name || !projectId) {
        throw new Error("Task name and project ID are required.");
      }

      // 

      let newTask = {
        ...task,
        projectId,
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      if (parentTaskId) {
        newTask.parentTaskId = parentTaskId;
      }

      const docRef = await addDoc(collection(firestore, "tasks"), newTask);
      console.log("Task added with ID:", docRef.id);
      toast.success(`${parentTaskId ? "Subtask" : "Task"} added!`);
    } catch (error) {
      console.error("Error adding task:", error.message);
    }
  };

  const removeTask = async (taskId) => {
    try {
      await deleteDoc(doc(firestore, "tasks", taskId));
      console.log("Task deleted successfully:", taskId);
    } catch (error) {
      console.error("Error deleting task:", error.message);
    }
  };

  // === Bounty Integration ===
  const markAsBounty = async (taskId) => {
    try {
      const taskRef = doc(firestore, "tasks", taskId);
      await updateDoc(taskRef, {
        isBounty: true,
        status: "open", // Set the status to open when marking as a bounty
      });
      console.log(`Task ${taskId} marked as a bounty.`);
    } catch (error) {
      console.error("Error marking task as bounty:", error.message);
    }
  };

  const claimBounty = async (taskId, claimerId) => {
    try {
      const taskRef = doc(firestore, "tasks", taskId);
      await updateDoc(taskRef, {
        status: "claimed",
        claimedBy: claimerId,
        claimedAt: new Date().toISOString(),
      });
      console.log(`Bounty ${taskId} claimed by ${claimerId}`);
    } catch (error) {
      console.error("Error claiming bounty:", error.message);
    }
  };


  return (
    <TasksContext.Provider value={{ tasks, loading, addTask,getAllTasks,removeTask, updateTask, markAsBounty, claimBounty, subtasks}}>
      {children}
    </TasksContext.Provider>
  );
};


export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
}