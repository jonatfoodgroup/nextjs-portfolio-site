"use client";

import React, { useState } from "react";
import { useGoals } from "../../providers/GoalsProvider";

const AddGoalForm = () => {
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [loading, setLoading] = useState(false);
  const { addGoal } = useGoals();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addGoal({ description, deadline });
      setDescription("");
      setDeadline("");
    } catch (error) {
      console.error("Error adding goal:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <h3 className="text-lg font-bold mb-2">Add a New Goal</h3>
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Goal Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          placeholder="E.g., Increase website traffic by 20%"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Deadline</label>
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Goal"}
      </button>
    </form>
  );
};

export default AddGoalForm;