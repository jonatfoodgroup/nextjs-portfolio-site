"use client";

import React from "react";
import { useGoals } from "../../providers/GoalsProvider";

const GoalsList = () => {
  const { goals, loading } = useGoals();

  if (loading) {
    return <p className="text-gray-500">Loading goals...</p>;
  }

  if (!goals || goals.length === 0) {
    return <p className="text-gray-500">No goals established for this client yet.</p>;
  }

  return (
    <ul className="list-disc pl-5">
      {goals.map((goal) => (
        <li key={goal.id} className="mb-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">{goal.description}</h3>
              <p className="text-sm text-gray-600">
                Deadline: {goal.deadline || "No deadline set"}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GoalsList;