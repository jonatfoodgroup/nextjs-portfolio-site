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
import ProjectResourceLinks from "./ProjectResourceLinks";

const ProjectPage = ({ project }) => {
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  let jobNumber = project.jobNumber.slice(-5);

  return (
    <TasksProvider projectId={project.id}>
      <div className="bg-gray-800 min-h-screen">
        <Breadcrumb hubspotId={project.hubspotId} />
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-regular mb-4 text-white">#{jobNumber} - {project.title}</h2>
          <div className="flex space-x-4 justify-end">
            <AddTask showAddTaskForm={showAddTaskForm} setShowAddTaskForm={setShowAddTaskForm} />
            <DiscordLinkButton discordChannelId={project.discordChannelId} />
          </div>
        </div>
        <div className="flex items-start">
          <div className="w-2/3 pr-8">
          <div className="border-b border-gray-700 pb-4"> 
            <EditableDescription project={project} />
            </div>
           <StatusUpdates statuses={project.statuses} project={project} />
            
          </div>
          <div className="w-1/3">
            <div className="mt-4">
              {showAddTaskForm && <AddTaskForm projectId={project.id} />}
              <ProjectTasks project={project} />
            </div>
            <div className="mt-4">
            <ProjectResourceLinks projectId={project.id} links={project.resourceLinks} />
            </div>
          </div>
        </div>
      </div>
    </TasksProvider>
  );
};


export default ProjectPage;