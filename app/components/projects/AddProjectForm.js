"use client";

import React, { useState } from "react";
import { useProjects } from "../../providers/ProjectsProvider";

const AddProjectForm = () => {
  const { addProject } = useProjects();
  const [title, setTitle] = useState("");
  const [owner, setOwner] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addProject({ title, owner, dueDate, notes });
      setTitle("");
      setOwner("");
      setDueDate("");
      setNotes("");
    } catch (error) {
      console.error("Failed to add project:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto space-y-4"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-bold text-gray-700">Add a New Project</h2>
      <div className="flex flex-col">
        <label htmlFor="title" className="text-sm font-medium text-gray-600">
          Project Title
        </label>
        <input
          type="text"
          id="title"
          placeholder="Enter project title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="owner" className="text-sm font-medium text-gray-600">
          Owner
        </label>
        <input
          type="text"
          id="owner"
          placeholder="Enter project owner"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="dueDate" className="text-sm font-medium text-gray-600">
          Due Date
        </label>
        <input
          type="date"
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="notes" className="text-sm font-medium text-gray-600">
          Notes
        </label>
        <textarea
          id="notes"
          placeholder="Enter additional notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
        ></textarea>
      </div>
      <button
        className={`w-full py-2 px-4 text-white font-medium rounded-md ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
        type="submit"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Project"}
      </button>
    </form>
  );
};

export default AddProjectForm;