"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { collection, onSnapshot, query, where, addDoc,deleteDoc, getDocs,doc,updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/config";

const TasksContext = createContext();

export const TasksProvider = ({ children, projectId }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!projectId) return;

    // Firestore real-time listener for tasks related to this project
    const q = query(collection(firestore, "tasks"), where("projectId", "==", projectId));
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
    } catch (error) {
      console.error("Error updating task:", error.message);
    }
  };
  
  const addTask = async (task) => {
    try {
      if (!task.name || !projectId) {
        throw new Error("Task name and project ID are required.");
      }

      // 

      const newTask = {
        ...task,
        projectId,
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      const docRef = await addDoc(collection(firestore, "tasks"), newTask);
      console.log("Task added successfully:", docRef.id);
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

  return (
    <TasksContext.Provider value={{ tasks, loading, addTask,getAllTasks,removeTask, updateTask }}>
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