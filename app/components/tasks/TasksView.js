"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Button from "../Button";
import { useTasks } from "../../providers/TasksProvider";
import { useProjects } from "../../providers/ProjectsProvider";

const TasksView = () => {
  const { data: session, status } = useSession();
  const { tasks, loading } = useTasks();
  const { projects, loading: projectsLoading } = useProjects();
  const [filter, setFilter] = useState("all");

  if (status === "loading") {
    return <p>Loading your session...</p>;
  }

  const currentUser = session?.user;

  // 1) Apply filters to tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "unassigned") return !task.assignee;
    if (filter === "mine") {
      return task.assignee?.id === currentUser?.id;
    }
    return true;
  });

  // 2) Group tasks by projectId (including a “noProject” bucket)
  const tasksByProject = filteredTasks.reduce((acc, task) => {
    const pid = task.projectId || "noProject";
    if (!acc[pid]) acc[pid] = [];
    acc[pid].push(task);
    return acc;
  }, {});

  // 3) Handle loading states
  if (loading || projectsLoading) {
    return <p>Loading tasks & projects...</p>;
  }

  return (
    <div>
      {/* Filter Buttons */}
      <div className="flex space-x-2 mb-6">
        <Button onClick={() => setFilter("all")} variant="outline">
          All
        </Button>
        <Button onClick={() => setFilter("unassigned")} variant="outline">
          Unassigned
        </Button>
        <Button onClick={() => setFilter("mine")} variant="outline">
          Mine
        </Button>
      </div>

      {/* 4) Render each project section */}
      {Object.keys(tasksByProject).map((projectId) => {
        const project = projects.find((p) => p.id === projectId);

        return (
          <div key={projectId} className="mb-8">
            {/* Project Header */}
            <h2 className="text-xl text-white font-bold mb-3 border-b border-gray-700 pb-1">
              {project ? project.title : "No Project"}
              <span className="ml-2 text-sm text-gray-400">
                ({tasksByProject[projectId].length})
              </span>
            </h2>

            {/* Indented tasks */}
            {tasksByProject[projectId].map((task) => (
              <div
                key={task.id}
                className="ml-4 pl-4 py-3 border-l border-gray-700"
              >
                <TaskItem task={task} />
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

const TaskItem = ({ task }) => {
  const [project, setProject] = useState(null);
  const { getProjectById } = useProjects();

  useEffect(() => {
    if (!task.projectId) return;
    const fetchProject = async () => {
      const proj = await getProjectById(task.projectId);
      setProject(proj);
    };
    fetchProject();
  }, [task.projectId, getProjectById]);

  return (
    <div className="bg-[#111] rounded-md p-3 border border-gray-800">
      <h3 className="text-white font-semibold mb-1">{task.name}</h3>
      <div className="text-sm text-gray-400 space-y-1">
        <p>
          <span className="text-gray-300">Status:</span> {task.status || "—"}
        </p>
        <p>
          <span className="text-gray-300">Project:</span>{" "}
          {project?.title || "No project"}
        </p>
        {task.description && (
          <p className="text-gray-400">{task.description}</p>
        )}
        <p className="flex items-center">
          <span className="text-gray-300 mr-1">Assignee:</span>
          {task.assignee ? (
            <>
              <img
                src={task.assignee.avatar}
                alt={task.assignee.name}
                className="w-5 h-5 rounded-full inline-block mr-2"
              />
              <span>{task.assignee.name}</span>
            </>
          ) : (
            "Unassigned"
          )}
        </p>
      </div>
    </div>
  );
};

export default TasksView;