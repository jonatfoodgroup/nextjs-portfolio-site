"use client";

import React, { useEffect, createContext, useState, useContext } from "react";
import { toast } from "react-hot-toast";
import { firestore } from "../firebase/config";
import { collection, addDoc, updateDoc, deleteDoc, where,doc, query, onSnapshot, orderBy } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";


const FirebaseContext = createContext();

export const FirebaseProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [transcripts, setTranscripts] = useState([]);

  useEffect(() => {
    const q = query(collection(firestore, "tasks"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const taskData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const groupedTasks = taskData.reduce((acc, task) => {
        const parentId = task.parentTaskId || "root";
        if (!acc[parentId]) {
          acc[parentId] = [];
        }
        acc[parentId].push(task);
        return acc;
      }, {});
      setTasks(groupedTasks);
    });

    return () => unsubscribe();
  }, []);

  // useEffect(() => {
  //   const q = query(collection(firestore, "transcripts"), orderBy("timestamp", "desc"));
  //   const unsubscribe = onSnapshot(q, (snapshot) => {
  //     const transcriptData = snapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     setTranscripts(transcriptData);
  //   });

  //   return () => unsubscribe();
  // }, []);

  const addTask = async (task) => {
    task.id = uuidv4();

    await addDoc(collection(firestore, "tasks"), task);
    toast.success("Task added!");
  };

  const updateTask = async (id, updatedFields) => {
    const taskDoc = doc(firestore, "tasks", id);
    await updateDoc(taskDoc, updatedFields);
    toast.success("Task updated!");
  };

  const deleteTask = async (id) => {
    const taskDoc = doc(firestore, "tasks", id);
    await deleteDoc(taskDoc);
    toast.error("Task removed!");
  };

  const deleteTranscript = async (id) => {
    const transcriptDoc = doc(firestore, "transcripts", id);
    await deleteDoc(transcriptDoc);
    toast.error("Transcript removed!");
  }


  return (
    <FirebaseContext.Provider value={{ tasks, addTask, updateTask, deleteTask, transcripts, deleteTranscript }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => useContext(FirebaseContext);