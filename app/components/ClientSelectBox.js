"use client";
import React from "react";
const ClientSelectBox = ({ clients, setClient }) => {
  return (
    <select
      onChange={(e) => setClient(e.target.value)}
      className="border border-gray-200 p-2"
    >
      <option value="">Select Client</option>
      {clients.map((client) => (
        <option key={client.id} value={client.id}>
          {client.name}
        </option>
      ))}
    </select>
  );
};

export default ClientSelectBox;