"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { collection, onSnapshot, query, where, addDoc, updateDoc, deleteDoc, doc,orderBy } from "firebase/firestore";
import { firestore } from "../firebase/config";

const GoalsContext = createContext();

export const GoalsProvider = ({ children, hubspotId }) => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!hubspotId) return;

    // Firestore real-time listener
    const q = query(collection(firestore, "goals"), where("hubspotId", "==", hubspotId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedGoals = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("Goals updated:", updatedGoals);
      setGoals(updatedGoals);
      setLoading(false);
    });

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, [hubspotId]);

  const addGoal = async (goal) => {
    try {
      // Validate the incoming goal object
      if (!goal.description || !hubspotId) {
        throw new Error("Missing required fields: description or hubspotId");
      }
  
      // Add timestamps and default values
      const newGoal = {
        ...goal,
        hubspotId,
        createdAt: new Date().toISOString(),
        deadline: goal.deadline || null, // Optional deadline
      };
  
      // Add the goal to Firestore
      const docRef = await addDoc(collection(firestore, "goals"), newGoal);
  
      console.log("Goal successfully added with ID:", docRef.id);
      return { id: docRef.id, ...newGoal }; // Return the created goal for further use
    } catch (error) {
      console.error("Error adding goal:", error.message);
      throw error; // Rethrow the error to handle it in the calling function
    }
  };

  return (
    <GoalsContext.Provider value={{ goals, loading, addGoal }}>
      {children}
    </GoalsContext.Provider>
  );
};

export const useGoals = () => useContext(GoalsContext);