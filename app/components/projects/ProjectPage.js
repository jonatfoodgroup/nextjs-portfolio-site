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
import TaskKanban from "../tasks/TaskKanban";
import { EndDate, StartDate } from "./StartEndDate";
import TimelineView from "./TimelineView";
import CalenderView from "./CalendarView";

const ProjectPage = ({ project }) => {
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [activeTab, setActiveTab] = useState('tasks'); // State for the active tab

  let jobNumber = project.jobNumber.slice(-5);
  return (
    <TasksProvider projectId={project.id}>
      <div className="bg-gray-800 min-h-screen">
        <Breadcrumb hubspotId={project.hubspotId} />
        <div className="flex justify-between items-center md:flex-row flex-col">
          <div className="flex flex-col">
            <EditableTitle project={project} />
            <div className="flex items-center space-x-4">
              <DiscordLinkButton discordChannelId={project.discordChannelId} />
              <DriveLinkButton driveFolderId={project.googleDriveFolderId} />
            </div>
          </div>
          {/* <p className="text-gray-400 text-sm">Job Number: {jobNumber}</p> */}
          
          <div className="flex space-x-4 justify-end">

          <AssignPM projectId={project.id} currentPM={project.projectManager} />
          </div>
        </div>

        <div className="flex items-start flex-col md:flex-row">
          <div className="w-full pr-0">
            <div className="border-b border-gray-700 pb-8 mb-8">
              <EditableDescription project={project} />
            </div>

            <div className="flex items-start space-x-4 mb-16">
              <StartDate project={project} />
              <EndDate project={project} />
            </div>

            {/* Tabs for tasks, board, timeline, and updates */}
            <div className="flex space-x-4 mb-8">
              <button
                className={`px-4 py-2 ${activeTab === 'tasks' ? 'bg-blue-500' : 'bg-gray-700'}`}
                onClick={() => setActiveTab('tasks')}
              >
                Tasks
              </button>
              <button
                className={`px-4 py-2 ${activeTab === 'board' ? 'bg-blue-500' : 'bg-gray-700'}`}
                onClick={() => setActiveTab('board')}
              >
                Board
              </button>
              <button
                className={`px-4 py-2 ${activeTab === 'calendar' ? 'bg-blue-500' : 'bg-gray-700'}`}
                onClick={() => setActiveTab('calendar')}
              >
                Calendar
              </button>
              <button
                className={`px-4 py-2 ${activeTab === 'timeline' ? 'bg-blue-500' : 'bg-gray-700'}`}
                onClick={() => setActiveTab('timeline')}
              >
                Timeline
              </button>
              <button
                className={`px-4 py-2 ${activeTab === 'updates' ? 'bg-blue-500' : 'bg-gray-700'}`}
                onClick={() => setActiveTab('updates')}
              >
                Updates
              </button>
              <button
                // resource links
                className={`px-4 py-2 ${activeTab === 'resources' ? 'bg-blue-500' : 'bg-gray-700'}`}
                onClick={() => setActiveTab('resources')}
              >
                Resources
              </button>
            </div>

            {/* Conditional Rendering based on active tab */}
            {activeTab === 'tasks' && (
              <>
                <div className="mt-4">
                  <AddTask showAddTaskForm={showAddTaskForm} setShowAddTaskForm={setShowAddTaskForm} />
                  {showAddTaskForm && <AddTaskForm projectId={project.id} />}
                </div>
                <ProjectTasks project={project} />
              </>
            )}
            {activeTab === 'board' && <TaskKanban />}
            {activeTab === 'timeline' && <TimelineView project={project} />}
            {activeTab === 'updates' && <StatusUpdates statuses={project.statuses} project={project} />}
            {activeTab === 'resources' && <ProjectResourceLinks projectId={project.id} links={project.resourceLinks} />}
            {activeTab === 'calendar' && <CalenderView project={project} />}

          </div>
        </div>

      </div>
    </TasksProvider>
  );
};

export default ProjectPage;