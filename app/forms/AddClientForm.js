"use client";
import React, { useState } from "react";
import { db } from "../firebase/config";
import { ref, push } from "firebase/database";

const AddClientForm = ({
  setAddNewClient
}) => {
  const [name, setName] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const dbRef = ref(db, "clients");
    push(dbRef, {
      name,
    });

    setName("");
    setAddNewClient(false);
  };

  return (
    <div className="container mx-auto px-4 mt-4">
      <div className="flex flex-col space-y-4">
        <label className="flex flex-col">
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-200 p-2"
          />
        </label>
        <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded">
          Add Client
        </button>
      </div>
    </div>
  );
}

export default AddClientForm;