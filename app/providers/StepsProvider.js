"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  where,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  orderBy,
} from "firebase/firestore";
import { firestore } from "../firebase/config";
import { toast } from "react-hot-toast";

const StepsContext = createContext();

export const StepsProvider = ({ children, taskId }) => {
  const [steps, setSteps] = useState([]);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch steps for the provided taskId
  useEffect(() => {
    if (!taskId) return;

    const stepsRef = collection(firestore, "tasks", taskId, "steps");
    const q = query(stepsRef, orderBy("createdAt"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const stepsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSteps(stepsData);

      const completedStepsData = stepsData.filter(
        (step) => step.status === "completed"
      );

      setCompletedSteps(completedStepsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [taskId]);

  // Add a new step
  const addStep = async (step) => {
    try {
      if (!step.name) {
        throw new Error("Step name is required.");
      }

      const stepsRef = collection(firestore, "tasks", taskId, "steps");
      await addDoc(stepsRef, {
        ...step,
        status: "pending",
        createdAt: new Date(),
      });

      toast.success("Step added!");
    } catch (error) {
      console.error("Error adding step:", error.message);
      toast.error("Failed to add step.");
    }
  };

  // Update a step
  const updateStep = async (stepId, updates) => {
    try {
      const stepRef = doc(firestore, "tasks", taskId, "steps", stepId);
      await updateDoc(stepRef, updates);

      toast.success("Step updated!");
    } catch (error) {
      console.error("Error updating step:", error.message);
      toast.error("Failed to update step.");
    }
  };

  // Remove a step
  const removeStep = async (stepId) => {
    try {
      const stepRef = doc(firestore, "tasks", taskId, "steps", stepId);
      await deleteDoc(stepRef);

      toast.success("Step removed!");
    } catch (error) {
      console.error("Error removing step:", error.message);
      toast.error("Failed to remove step.");
    }
  };

  return (
    <StepsContext.Provider
      value={{
        steps,
        loading,
        addStep,
        updateStep,
        removeStep,
        completedSteps,
      }}
    >
      {children}
    </StepsContext.Provider>
  );
};

// Custom hook to use StepsContext
export const useSteps = () => {
  const context = useContext(StepsContext);
  if (!context) {
    throw new Error("useSteps must be used within a StepsProvider");
  }
  return context;
};