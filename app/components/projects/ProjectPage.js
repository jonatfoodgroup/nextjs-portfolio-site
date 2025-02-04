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
  console.log('ProjectPage', project);
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); // State for the active tab

  let jobNumber = project?.jobNumber ? project.jobNumber.slice(-5) : "N/A";
  let tabs = [
    { name: 'overview', label: 'Overview' },
    { name: 'tasks', label: 'Tasks' },
    { name: 'board', label: 'Board' },
    { name: 'calendar', label: 'Calendar' },
    { name: 'timeline', label: 'Timeline' },
    { name: 'updates', label: 'Updates' },
    { name: 'resources', label: 'Resources' }
  ];

  return (
    <TasksProvider projectId={project.id}>
      <div className="bg-black min-h-screen">
        <div className="flex justify-between items-center md:flex-col flex-col">
          <div className="flex flex-col md:flex-row items-start md:items-center align-middle space-y-4 md:space-y-0 md:space-x-4">
            {/* <Breadcrumb hubspotId={project.hubspotId} /> */}
            <EditableTitle project={project} />
            <div className="flex items-center space-x-4 mb-4 text-2xl">
              <DiscordLinkButton discordChannelId={project.discordChannelId} />
              <DriveLinkButton driveFolderId={project.googleDriveFolderId} />
            </div>
          </div>
          {/* <p className="text-gray-400 text-sm">Job Number: {jobNumber}</p> */}
          <div className="flex space-x-4 mb-8">
            {tabs.map(tab => (
              <button
                key={tab.name}
                className={`px-4 py-2 ${activeTab === tab.name ? 'bg-transparent' : 'bg-transparent'} text-sm font-medium ${activeTab === tab.name ? 'text-white border-b-2 border-blue-500' : 'text-gray-400'}`}
                onClick={() => setActiveTab(tab.name)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-start flex-col md:flex-row">
          <div className="w-full pr-0 container">
            {
              activeTab === 'overview' && (
                <div className="flex items-start space-x-4 mb-8">
                  <div className="w-2/3">
                    <div className="border-b border-gray-700 pb-8 mb-8">
                      <EditableDescription project={project} />
                    </div>



                  </div>
                  <div className="w-1/3">

                    <div className="flex items-start space-x-4 mb-16">
                      <StartDate project={project} />
                      <EndDate project={project} />
                    </div>
                    <AssignPM projectId={project.id} currentPM={project.projectManager} />
                    <StatusUpdates statuses={project.statuses} project={project} />
                  </div>
                </div>
              )
            }

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