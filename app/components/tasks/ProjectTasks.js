"use client";
import React, { useState, useEffect } from "react";
import { useTasks } from "../../providers/TasksProvider";
import Modal from "../Modal";
import TaskDetails from "./TaskDetails";
import AssigneeAvatar from "./AssigneeAvatar";
// import TimelineView from "../TimelineView";
import moment from "moment";

const ProjectTasks = ({ project }) => {
  const { tasks, loading, updateTask } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // add subtasks to the task by parentTaskId
  tasks.forEach((task) => {
    task.subtasks = tasks.filter((subtask) => subtask.parentTaskId === task.id);
  });

  // Filter out completed tasks and sort by start date
  let sortedTasks = [...tasks]
    .filter((task) => task.status !== "completed") // Exclude completed tasks
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));


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
      <h3 className="text-lg font-semibold mb-4 text-gray-300">Tasks</h3>

      {/* Timeline View */}
      <div className="mb-6">
        {/* <TimelineView project={{ ...project, tasks: sortedTasks }} /> */}
      </div>

      {loading ? (
        <p className="text-gray-500">Loading tasks...</p>
      ) : (
        <ul className="space-y-4">
          {sortedTasks.filter((task) => !task.parentTaskId).map((task) => (
            <li
              key={task.id}
              className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border-gray-800 cursor-pointer"
              onClick={() => openModal(task)}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <AssigneeAvatar assignee={task.assignee} />
                  <div className="flex flex-col">
                    <p className="font-medium text-lg text-gray-400 hover:text-white">{task.name}</p>
                    <p className="text-sm text-gray-500">
                      {moment(task.startDate).format("MMM D, YYYY")} - {moment(task.endDate).format("MMM D, YYYY")}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col">
                  <ul className="flex flex-col mt-2 space-y-1">
                    {task.subtasks.map((subtask, index) => (
                      <li key={index} className="text-sm text-gray-500">
                        {subtask.name}
                      </li>
                    ))}
                  </ul>
                </div>

                <p
                  className={`text-sm px-2 py-1 rounded font-semibold ${task.status === "completed"
                    ? "bg-green-200 text-green-800"
                    : task.status === "in progress"
                      ? "bg-yellow-200 text-yellow-800"
                      : "bg-gray-700 text-gray-400"
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
        <Modal isOpen={isModalOpen} onClose={closeModal} title={selectedTask.name}>
          <TaskDetails task={selectedTask} updateTask={updateTask} project={project} />
        </Modal>
      )}
    </div>
  );
};

export default ProjectTasks;