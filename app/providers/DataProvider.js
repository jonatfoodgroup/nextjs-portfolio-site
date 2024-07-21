"use client";
// an auth provider that watches onAuthState change for firebase with a context provider
import { useEffect, useState, createContext } from 'react';
import { onValue, ref } from 'firebase/database';
import { db } from '../firebase/config';
export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [proposals, setProposals] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const dbRef = ref(db, 'proposals');
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      let arr = [];
      for (let id in data) {
        arr.push({ id, ...data[id] });
      }
      setProposals(arr);
    });

    const dbRefClients = ref(db, 'clients');
    onValue(dbRefClients, (snapshot) => {
      const data = snapshot.val();
      let arr = [];
      for (let id in data) {
        arr.push({ id, ...data[id] });
      }
      setClients(arr);
    });

    setLoading(false);
  }, []);

  return (
    <DataContext.Provider value={{ 
      loading,
      proposals,
      clients
    }}>
      {children}
    </DataContext.Provider>
  );
}