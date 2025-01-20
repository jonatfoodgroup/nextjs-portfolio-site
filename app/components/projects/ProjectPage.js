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
import EditableTitle from "./EditableTitle";
import AssignPM from "./AssignPM";
import DriveLinkButton from "./DriveFolderLink";

const ProjectPage = ({ project }) => {
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  let jobNumber = project.jobNumber.slice(-5);

  return (
    <TasksProvider projectId={project.id}>
      <div className="bg-gray-800 min-h-screen">
        <Breadcrumb hubspotId={project.hubspotId} />
        <div className="flex justify-between items-center md:flex-row flex-col">
          <EditableTitle project={project} />
          <p className="text-gray-400 text-sm">Job Number: {jobNumber}</p>
          <div className="flex space-x-4 justify-end text-2xl">
            <AddTask showAddTaskForm={showAddTaskForm} setShowAddTaskForm={setShowAddTaskForm} />
            <DiscordLinkButton discordChannelId={project.discordChannelId} />
            <DriveLinkButton driveFolderId={project.googleDriveFolderId} />
          </div>
        </div>
        <div className="flex items-start flex-col md:flex-row">
          <div className="w-full md:w-2/3 pr-0 md:pr-8">
            <div className="border-b border-gray-700 pb-8 mb-8">
              <EditableDescription project={project} />
            </div>
            {/* Assign PM Component */}
            <AssignPM projectId={project.id} currentPM={project.projectManager} />
            <StatusUpdates statuses={project.statuses} project={project} />
          </div>
          <div className="w-full md:w-1/3">
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