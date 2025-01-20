"use client";

import React, { useState } from "react";
import { useProjects } from "../../providers/ProjectsProvider";
import Button from "../Button";

const AddProjectForm = ({ hubspotId }) => {
  const { addProject } = useProjects();
  const [title, setTitle] = useState("");
  const [owner, setOwner] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addProject({ title, owner, dueDate, description, hubspotId });
      setTitle("");
      setOwner("");
      setDueDate("");
      setDescription("");
    } catch (error) {
      console.error("Failed to add project:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="bg-gray-800 p-4 rounded-lg shadow-md mx-auto space-y-4"
      onSubmit={handleSubmit}
    >
      {/* <h2 className="text-2xl font-semibold text-gray-200">Add a New Project</h2> */}

      {/* Project Title */}
      <div className="space-y-1">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-400"
        >
          Project Title
        </label>
        <input
          type="text"
          id="title"
          placeholder="Enter project title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 rounded-md bg-gray-900 text-gray-200 border border-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Owner */}
      <div className="space-y-1">
        <label
          htmlFor="owner"
          className="block text-sm font-medium text-gray-400"
        >
          Owner
        </label>
        <input
          type="text"
          id="owner"
          placeholder="Enter project owner"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          className="w-full p-3 rounded-md bg-gray-900 text-gray-200 border border-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Due Date */}
      <div className="space-y-1">
        <label
          htmlFor="dueDate"
          className="block text-sm font-medium text-gray-400"
        >
          Due Date
        </label>
        <input
          type="date"
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full p-3 rounded-md bg-gray-900 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Notes */}
      <div className="space-y-1">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-400"
        >
          Description
        </label>
        <textarea
          id="description"
          placeholder="Enter additional notes"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 h-28 rounded-md bg-gray-900 text-gray-200 border border-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>

      {/* Submit Button */}
      <Button
        onClick={handleSubmit}
        variant="primary"
        size="lg"
      >
        {loading ? "Adding Project..." : "Add Project"}
      </Button>
    </form>
  );
};

export default AddProjectForm;