"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/config";
import { useSession } from "next-auth/react";
// Create User Context
const UserContext = createContext();

// UserProvider Component
export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    const usersCollection = collection(firestore, "users");

    // Subscribe to changes in the users collection
    const unsubscribe = onSnapshot(
      usersCollection,
      (snapshot) => {
        const userList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(userList);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    );

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);

  const subscribeToCurrentUser = (userId) => {
    const userDoc = doc(firestore, "users", userId);

    // Subscribe to changes in the current user document
    const unsubscribe = onSnapshot(
      userDoc,
      (doc) => {
        setCurrentUser({
          id: doc.id,
          ...doc.data(),
        });
      },
      (error) => {
        console.error("Error fetching current user:", error);
      }
    );

    // Clean up subscription on unmount
    return () => unsubscribe();
  }

  useEffect(() => {
    if (session) {
      subscribeToCurrentUser(session.user.id);
    }
  }, [session]);


  const updateActiveTimer = (userId, activeTimer) => {
    // if activeTimer is null, remove the activeTimer field
    const userDoc = doc(firestore, "users", userId);

    updateDoc(userDoc, {
      activeTimer: activeTimer,
    })
      .then(() => {
        console.log("Active timer updated successfully");
      })
      .catch((error) => {
        console.error("Error updating active timer:", error);
      });
  }

  return (
    <UserContext.Provider value={{ users, loading, updateActiveTimer,subscribeToCurrentUser, currentUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom Hook to Use UserContext
export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUsers must be used within a UserProvider");
  }
  return context;
};