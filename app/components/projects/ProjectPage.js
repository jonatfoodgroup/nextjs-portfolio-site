"use client";

import { TasksProvider } from "../../providers/TasksProvider";
import AddTaskForm from "../tasks/AddTaskForm";
import DiscordLinkButton from "../DiscordLinkButton";
import ProjectTasks from "../tasks/ProjectTasks";
import { useState } from "react";
import { useProjects } from "../../providers/ProjectsProvider";
import DueDate from "./DueDate";
import Breadcrumb from "./Breadcrumb";

const ProjectPage = ({ project }) => {
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  let jobNumber = project.jobNumber.slice(-5);

  return (
    <TasksProvider projectId={project.id}>
      <div className="p-6 bg-gray-50 min-h-screen">
        <Breadcrumb hubspotId={project.hubspotId} />
        <div className="flex justify-between items-center mt-4">
          <h2 className="text-2xl font-bold mb-4">#{jobNumber} - {project.title}</h2>
          <div className="flex space-x-4">
            <button
              onClick={() => setShowAddTaskForm(!showAddTaskForm)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {showAddTaskForm ? "Cancel" : "Add Task"}
            </button>
            <DiscordLinkButton discordChannelId={project.discordChannelId} />
          </div>
        </div>
        <div className="flex items-start">
          <div className="w-1/2 pr-8">
            <div className="mt-4">
              <DueDate date={project.dueDate} />
            </div>
            <EditableDescription project={project} />
          </div>
          <div className="w-1/2">
            <div className="mt-4">
              {showAddTaskForm && <AddTaskForm projectId={project.id} />}
              <ProjectTasks project={project} />
            </div>
          </div>
        </div>
      </div>
    </TasksProvider>
  );
};

const EditableDescription = ({ project }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(project.description);
  const { updateProject } = useProjects();
  const handleSave = async () => {
    setIsEditing(false);
    await updateProject(project.id, { description });
  };

  return (
    <div className="mt-4">
      <h4 className="text-sm font-semibold">Description</h4>
      {isEditing ? (
        <div className="flex">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded ml-2">
            Save
          </button>
        </div>
      ) : (
        <p className="text-sm text-gray-600">{description}</p>
      )}
      <button
        onClick={() => setIsEditing(!isEditing)}
        className="text-xs text-blue-500 mt-2"
      >
        {isEditing ? "Cancel" : "Edit"}
      </button>
    </div>
  );
}

export default ProjectPage;