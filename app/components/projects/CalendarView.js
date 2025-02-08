import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Modal from '../Modal';
import TaskDetails from '../tasks/TaskDetails';
import { useTasks } from '../../providers/TasksProvider';


const categoryColors = {
    Research: "rgba(0, 150, 255, 0.2)",
    "Ideation Station": "rgba(255, 165, 0, 0.2)",
    Onboarding: "rgba(255, 51, 102, 0.2)",
    "Drafting & Editing": "rgba(51, 255, 153, 0.2)",
    "Design Dojo": "rgba(204, 102, 255, 0.2)",
    "Revisions & Editing": "rgba(255, 204, 0, 0.2)",
    default: "rgba(255, 255, 255, 0.1)"
};

const CalendarView = ({ project }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [tasks, setTasks] = useState([]); 
    const { updateTask } = useTasks();

    useEffect(() => {
        if (project.tasks) {
            const parentTasks = project.tasks.filter(task => !task.parentTaskId);
            const subtasks = project.tasks.filter(task => task.parentTaskId);

            const events = parentTasks.map((task) => {
                const taskSubtasks = subtasks.filter(subtask => subtask.parentTaskId === task.id);
                return {
                    title: task.name,
                    start: task.startDate,
                    end: task.endDate,
                    extendedProps: {
                        subtasks: taskSubtasks.map(subtask => ({
                            title: subtask.name,
                            start: subtask.startDate,
                            end: subtask.endDate,
                            steps: subtask.steps || []
                        }))
                    }
                };
            });

            setTasks(events);
        }
    }, [project]);

    const handleDateClick = (info) => {

    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTask(null);
    };

    if (!project.tasks) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ width: '100%', margin: '0 auto' }}>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridWeek"
                events={tasks}
                dateClick={handleDateClick}
                eventClick={(info) => {
                    setSelectedTask(project.tasks.find(task => task.name === info.event.title));
                    setIsModalOpen(true);
                }}
                eventContent={(eventInfo) => {
                    const { title, extendedProps } = eventInfo.event;
                    const { subtasks } = extendedProps;

                    // Determine background color based on category
                    const bgColor = categoryColors[title] || categoryColors.default;

                    // Styled list of subtasks
                    const subtaskList = subtasks.map((subtask, index) => (
                        <li key={index} className="text-gray-300">{subtask.title}
                            {subtask.steps.length > 0 && (
                                <ul className="text-xs list-disc pl-4 mt-2">
                                    {subtask.steps.map((step, index) => (
                                        <li key={index}>{step}</li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ));

                    return (
                        <div className="glass-card" style={{ backgroundColor: bgColor }}>
                            <strong className="text-lg text-white">{title}</strong>
                            {subtaskList.length > 0 && (
                                <ul className="text-sm list-disc pl-4 mt-2">
                                    {subtaskList}
                                </ul>
                            )}
                        </div>
                    );
                }}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,dayGridWeek',
                }}
            />
            
            {/* Custom styles for glassmorphism effect */}
            <style jsx>{`
                .glass-card {
                cursor: pointer;
                    backdrop-filter: blur(15px);
                    border-radius: 12px;
                    padding: 14px;
                    color: white;
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.15);
                    transition: transform 0.1s ease-in-out, box-shadow 0.3s ease;
                }

                .glass-card:hover {
                    transform: scale(1.01);
                    box-shadow: 0px 0px 20px rgba(255, 255, 255, 0.5);
                }
            `}</style>

            {/* Modal for Task Details */}
      {isModalOpen && selectedTask && (
        <Modal isOpen={isModalOpen} onClose={closeModal} title={selectedTask.name}>
          <TaskDetails task={selectedTask} updateTask={updateTask} project={project} />
        </Modal>
      )}
        </div>

    );
};

export default CalendarView;