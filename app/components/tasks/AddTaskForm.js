"use client";

import { useState } from "react";
import { useTasks } from "../../providers/TasksProvider";
import Button from "../Button";

const AddTaskForm = () => {
  const { addTask } = useTasks();
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedHours, setEstimatedHours] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [assignee, setAssignee] = useState("");

  const handleAddTask = async () => {
    try {
      if (!taskName) {
        alert("Task name is required.");
        return;
      }

      await addTask({
        name: taskName,
        description,
        estimatedHours: estimatedHours ? parseFloat(estimatedHours) : null,
        startDate,
        endDate,
        assignee,
      });

      // Reset form fields
      setTaskName("");
      setDescription("");
      setEstimatedHours("");
      setStartDate("");
      setEndDate("");
      setAssignee("");
    } catch (error) {
      console.error("Error adding task:", error.message);
    }
  };

  return (
    <div className="bg-white p-4 shadow rounded">
      <h3 className="text-lg font-semibold mb-2">Add a New Task</h3>
      <input
        type="text"
        placeholder="Task Name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
      />
      <textarea
        placeholder="Task Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
      />
      <input
        type="number"
        placeholder="Estimated Hours"
        value={estimatedHours}
        onChange={(e) => setEstimatedHours(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
      />
      <input
        type="date"
        placeholder="Start Date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
      />
      <input
        type="date"
        placeholder="End Date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
      />
      <input
        type="text"
        placeholder="Assignee"
        value={assignee}
        onChange={(e) => setAssignee(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
      />
      <Button
        onClick={handleAddTask}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Task
      </Button>
    </div>
  );
};

export default AddTaskForm;