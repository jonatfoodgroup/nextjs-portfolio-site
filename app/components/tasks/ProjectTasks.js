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
    <div className="rounded-xl">
      {loading ? (
        <p className="text-gray-500">Loading tasks...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
          {sortedTasks.filter((task) => !task.parentTaskId).map((task) => (
            <div
              key={task.id}
              className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border-gray-800 cursor-pointer bg-gray-900"
              onClick={() => openModal(task)}
            >
              <div className="flex flex-col space-y-4">
                {/* Assignee + Title */}
                <div className="flex items-center flex-col">
                  <span className="text-3xl my-4"><AssigneeAvatar assignee={task.assignee} /></span>
                  <div className="flex flex-col items-center space-y-1">
                    <p className="font-medium text-lg text-gray-300 hover:text-white">{task.name}</p>
                    <p className="text-sm text-gray-500">
                      {moment(task.startDate).format("MMM D, YYYY")} - {moment(task.endDate).format("MMM D, YYYY")}
                    </p>
                  </div>
                </div>
                <div className="flex w-full items-center text-center justify-center">
                {/* Status Badge */}
                <p
                  className={`text-xs px-2 py-1 rounded font-semibold self-start ${task.status === "completed"
                      ? "bg-green-200 text-green-800"
                      : task.status === "in progress"
                        ? "bg-yellow-200 text-yellow-800"
                        : "bg-gray-700 text-gray-400 mx-auto"
                    }`}
                >
                  {task.status.toUpperCase()}
                </p>
                </div>

                {/* Subtasks */}
                {task.subtasks.length > 0 && (
                  <div className="mt-2">
                    <h4 className="text-sm font-semibold text-gray-400 mb-1">Subtasks</h4>
                    <ul className="text-sm text-gray-500 space-y-1">
                      {task.subtasks.map((subtask, index) => (
                        <li key={index} className="pl-2 border-l-2 border-gray-700">{subtask.name}</li>
                      ))}
                    </ul>
                  </div>
                )}

                
              </div>
            </div>
          ))}
        </div>
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