"use client";
import React, { useState, useContext, useEffect } from "react";
import AddClientForm from "./AddClientForm";
import { DataContext } from "../providers/DataProvider";
import { db } from "../firebase/config";
import { ref, push } from "firebase/database";
import ClientSelectBox from "../components/ClientSelectBox";

const AddProposalForm = () => {
  const { clients, loading } = useContext(DataContext);
  const [client, setClient] = useState("");
  const [addNewClient, setAddNewClient] = useState(false);
  const [createdAt, setCreatedAt] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const dbRef = ref(db, "proposals");
    let createdAt = new Date().toISOString();
    push(dbRef, {
      client,
      createdAt,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="container mx-auto px-4 mt-4">
      <div className="flex flex-col space-y-4">
      {
          addNewClient ? (
            <AddClientForm setAddNewClient={setAddNewClient} />
          ) : (
            <button
              onClick={() => setAddNewClient(true)}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Add New Client
            </button>
          )
        }
        <ClientSelectBox clients={clients} setClient={setClient} />

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Proposal
        </button>
      </div>
    </form>
  );
};



export default AddProposalForm;
