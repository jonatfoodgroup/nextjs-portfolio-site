"use client";
import React, { useState, useContext } from "react";
import { DataContext } from "../providers/DataProvider";
import DataTable from "react-data-table-component";
import Link from "next/link";
import AddProposalForm from "../forms/AddProposalForm";
import { db } from "../firebase/config";
import { remove,ref } from "firebase/database";

export default function ProposalsPage() {
  const { proposals,loading } = useContext(DataContext);
  const [columns, setColumns] = useState([
    {
      name: "ID",
      selector: (row) => row.id,
      maxWidth: "140px",
    },
    {
      name: "Client",
      selector: (row) => row.client,
      maxWidth: "240px",
      cell: (row) => (
        <Link href={`/proposals/${row.id}`}>
          {row.client}
        </Link>
      ),
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row) => row.createdAt,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <button
          onClick={() => remove(ref(db, `proposals/${row.id}`))}
          className="bg-red-500 text-white p-2 rounded"
        >
          Delete
        </button>
      ),
    }
  ]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="container mx-auto px-4">
      <DataTable
        title="Proposals"
        columns={columns}
        data={proposals}
        pagination
        highlightOnHover
        pointerOnHover
        />

        <AddProposalForm />
      </div>
      
    </>
  )
}

