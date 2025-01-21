"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { collection, onSnapshot, query, where, addDoc, deleteDoc, getDocs, doc, updateDoc, orderBy } from "firebase/firestore";
import { firestore } from "../firebase/config";
import { toast } from "react-hot-toast";

const ContentContext = createContext();

export const ContentProvider = ({ children, hubspotId }) => {
    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!hubspotId) return;
        // Firestore real-time listener for content
        const q = query(
            collection(firestore, "content"),
            where("hubspotId", "==", hubspotId),
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const contentData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setContent(contentData);
            setLoading(false);
        });

        // Cleanup listener on component unmount
        return () => unsubscribe();
    }, [hubspotId]);

    const addContent = async (newContent) => {
        newContent.hubspotId = hubspotId;
        try {
            const docRef = await addDoc(collection(firestore, "content"), newContent);
            console.log("Document written with ID: ", docRef.id);
            toast.success("Content added!");
        } catch (error) {
            console.error("Error adding content: ", error.message);
        }
    };

    const deleteContent = async (contentId) => {
        try {
            await deleteDoc(doc(firestore, "content", contentId));
            console.log(`Content ${contentId} deleted successfully`);
            toast.success("Content deleted!");
        } catch (error) {
            console.error("Error deleting content: ", error.message);
        }
    };

    const updateContent = async (contentId, updates) => {
        try {
            const contentRef = doc(firestore, "content", contentId);
            await updateDoc(contentRef, updates);
            console.log(`Content ${contentId} updated successfully`);
            toast.success("Content updated!");
        } catch (error) {
            console.error("Error updating content: ", error.message);
        }
    };

    return (
        <ContentContext.Provider value={{ content, loading, addContent, deleteContent, updateContent }}>
            {children}
        </ContentContext.Provider>
    );
}

export const useContent = () => {
    const context = useContext(ContentContext);
    if (!context) {
        throw new Error("useContent must be used within a ContentProvider");
    }
    return context;
}