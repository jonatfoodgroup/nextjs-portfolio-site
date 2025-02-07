import { createContext, useContext, useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { firestore } from "../firebase/config";

const BountyContext = createContext();

export const BountyProvider = ({ children }) => {
    const [bounties, setBounties] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {  
      // Firestore real-time listener for tasks related to this project
      const q = query(
        collection(firestore, "tasks"),
        where("isBounty", "==", true),
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const tasksData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBounties(tasksData);
        setLoading(false);
      });
  
      // Cleanup listener on component unmount
      return () => unsubscribe();
    }, []);

    return (
        <BountyContext.Provider value={{ bounties, loading }}>
            {children}
        </BountyContext.Provider>
    );
}

export const useBounties = () => {
    return useContext(BountyContext);
}