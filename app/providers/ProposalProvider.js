"use client";

import React, { useEffect, createContext, useState, useContext } from "react";
import { toast } from "react-hot-toast";
import { firestore } from "../firebase/config";
import { collection, addDoc, updateDoc, deleteDoc, doc, query, onSnapshot, orderBy } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";


const FirebaseContext = createContext();

export const ProposalProvider = ({ children }) => {
  // const [proposals, setProposals] = useState([]);
  // const [transcripts, setTranscripts] = useState([]);

  // useEffect(() => {
  //   const q = query(collection(firestore, "tasks"), orderBy("timestamp", "desc"));
  //   const unsubscribe = onSnapshot(q, (snapshot) => {
  //     const taskData = snapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     setTasks(taskData);
  //   });

  //   return () => unsubscribe();
  // }, []);

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

  const getProposal = async (id) => {
    const taskDoc = doc(firestore, "proposals", id);
    await taskDoc;
  };

  const addProposal = async (task) => {
    task.id = uuidv4();

    await addDoc(collection(firestore, "proposals"), task);
    toast.success("Proposal added!");
  };

  const updateProposal = async (id, updatedFields) => {
    const taskDoc = doc(firestore, "proposals", id);
    await updateDoc(taskDoc, updatedFields);
    toast.success("Proposal updated!");
  };

  const deleteProposal = async (id) => {
    const taskDoc = doc(firestore, "proposals", id);
    await deleteDoc(taskDoc);
    toast.error("Proposal removed!");
  };

  return (
    <FirebaseContext.Provider value={{ getProposal, addProposal, updateProposal, deleteProposal }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useProposal = () => useContext(FirebaseContext);