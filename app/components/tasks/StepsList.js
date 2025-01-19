"use client";

import React, { useState } from "react";
import { useSteps } from "../../providers/StepsProvider";

const StepsList = ({ taskId }) => {
  const { steps, addStep, updateStep, removeStep, loading } = useSteps();
  const [newStepName, setNewStepName] = useState("");
  const [isAddStepCollapsed, setIsAddStepCollapsed] = useState(true); // Default state for add step form

  const handleAddStep = async () => {
    if (!newStepName.trim()) return;

    await addStep({
      name: newStepName,
    });

    setNewStepName("");
    // setIsAddStepCollapsed(true); // Collapse the form after adding a step
  };

  const handleToggleStep = async (step) => {
    await updateStep(step.id, {
      status: step.status === "completed" ? "pending" : "completed",
    });
  };

  const handleRemoveStep = async (stepId) => {
    await removeStep(stepId);
  };

  return (
    <div className="mt-6">
      {/* Steps Header */}
      <div className="flex items-center justify-between">
        {steps && steps.length === 0 ? (
          <h4 className="text-sm font-semibold text-gray-400">No Steps Yet</h4>
        ) : (
          <h4 className="text-sm font-semibold text-gray-400">Steps ({steps.length})</h4>
        )}
      </div>

      {/* Steps List */}
      <>
        {loading ? (
          <p className="text-gray-500"></p>
        ) : (
          <ul className="space-y-1 mt-2">
            {steps.map((step) => (
              <li
                key={step.id}
                className="flex items-center justify-between py-1 bg-gray-800 rounded shadow-sm align-middle"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={step.status === "completed"}
                    onChange={() => handleToggleStep(step)}
                    className="form-checkbox h-5 w-5 text-blue-500 rounded mr-3"
                  />
                  <p
                    className={`text-sm ${
                      step.status === "completed"
                        ? "line-through text-gray-500"
                        : "text-gray-300"
                    }`}
                  >
                    {step.name}
                  </p>
                </div>
                <button
                  onClick={() => handleRemoveStep(step.id)}
                  className="text-red-500 hover:text-red-700"
                  aria-label="Remove step"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </>

      {/* Add New Step */}
      <div className="mt-4">
        <button
          onClick={() => setIsAddStepCollapsed(!isAddStepCollapsed)}
          className="text-sm text-green-500 hover:text-green-700"
        >
          {isAddStepCollapsed ? "Add Step" : "Cancel"}
        </button>

        {!isAddStepCollapsed && (
          <div className="flex items-center mt-2">
            <input
              type="text"
              value={newStepName}
              onChange={(e) => setNewStepName(e.target.value)}
              placeholder="Add a new step"
              className="flex-grow p-2 text-sm bg-gray-900 text-white border rounded"
            />
            <button
              onClick={handleAddStep}
              className="ml-3 px-4 py-2 bg-green-500 text-white text-sm font-medium rounded hover:bg-green-600"
            >
              Add Step
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StepsList;