"use client";

import { TasksProvider } from "../../providers/TasksProvider";
import AddTaskForm from "../tasks/AddTaskForm";
import DiscordLinkButton from "../DiscordLinkButton";
import ProjectTasks from "../tasks/ProjectTasks";
import { useState } from "react";
import EditableDescription from "./EditableDescription";
import StatusUpdateComponent from "./StatusUpdateComponent";
import DueDate from "./DueDate";
import Breadcrumb from "./Breadcrumb";
import StatusUpdates from "./StatusUpdates";
import AddTask from "./AddTask";

const ProjectPage = ({ project }) => {
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  let jobNumber = project.jobNumber.slice(-5);

  return (
    <TasksProvider projectId={project.id}>
      <div className="p-6 bg-gray-50 min-h-screen pt-10">
        <Breadcrumb hubspotId={project.hubspotId} />
        <div className="flex justify-between items-center mt-4">
          <h2 className="text-2xl font-bold mb-4">#{jobNumber} - {project.title}</h2>
          <div className="flex space-x-4 justify-end">
            <AddTask showAddTaskForm={showAddTaskForm} setShowAddTaskForm={setShowAddTaskForm} />
            <DiscordLinkButton discordChannelId={project.discordChannelId} />
          </div>
        </div>
        <div className="flex items-start">
          <div className="w-1/2 pr-8">
            <div className="mt-4">
              <DueDate date={project.dueDate} />
            </div>
            <EditableDescription project={project} />
            <StatusUpdateComponent project={project} projectId={project.id} hubspotId={project.hubspotId} />
            <StatusUpdates statuses={project.statuses} />
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


export default ProjectPage;