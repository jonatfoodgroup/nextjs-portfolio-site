import React, { useState, useEffect, useContext } from "react";
import { DataContext } from "../providers/DataProvider";
import { db } from "../firebase/config";
import {ref,get,child} from "firebase/database";

const Client = ({ id = null }) => {
  const { clients, loading } = useContext(DataContext);
  const [client, setClient] = useState(null);

  useEffect(() => {
    if (id) {
      const dbRef = ref(db, `clients/${id}`);
    
      get(child(dbRef, id)).then((snapshot) => {
        console.log(snapshot.val());
        setClient(snapshot.val());
      });
    }

  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (client) {
    return <span>{client.name}</span>;
  }

  return null;
};

export default Client;
