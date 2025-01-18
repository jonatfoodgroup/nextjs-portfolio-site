"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useTasks } from "../../providers/TasksProvider";
import Modal from "../Modal";
import TaskDetails from "./TaskDetails";

const ProjectTasks = ({ project }) => {
  const { tasks, loading, updateTask } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // Sort tasks by active timers
  let sortedTasks = [...tasks].sort((a, b) => {
    if (a.activeTimer && !b.activeTimer) return -1;
    if (!a.activeTimer && b.activeTimer) return 1;
    return 0;
  });

  // filter out tasks that have been completed
  sortedTasks = sortedTasks.filter((task) => task.status !== "completed");

  const openModal = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  return (
    <div className="p-6 bg-gray-900 rounded-xl">
      <h3 className="text-lg font-regular mb-4 text-gray-400">Tasks</h3>
      {loading ? (
        <p className="text-gray-500">Loading tasks...</p>
      ) : (
        <ul className="space-y-4">
          {sortedTasks.map((task) => (
            <li
              key={task.id}
              className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border-gray-800 cursor-pointer"
              onClick={() => openModal(task)}
            >
              <div className="flex justify-between items-center">
                <p className="font-regular text-lg text-gray-400 hover:text-white">{task.name}</p>
                <p
                  className={`text-sm px-2 py-1 rounded ${
                    task.status === "Completed"
                      ? "bg-green-100 text-green-800"
                      : task.status === "In Progress"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-800 text-gray-500"
                  }`}
                >
                  {task.status}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Modal for Task Details */}
      {isModalOpen && selectedTask && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={`${selectedTask.name}`}
        >
          <TaskDetails task={selectedTask} updateTask={updateTask} project={project} />
        </Modal>
      )}
    </div>
  );
};



export default ProjectTasks;