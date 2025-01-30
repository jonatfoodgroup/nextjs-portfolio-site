import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

const CalendarView = ({
    project
}) => {
    console.log(project);
    const [tasks, setTasks] = useState([]); 

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
                        }))
                    }
                };
            });

            setTasks(events);
        }
    }, [project]);

    const handleDateClick = (info) => {
        alert('You clicked on ' + info.dateStr);
    };

    if (!project.tasks) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ width: '100%', margin: '0 auto' }}>
            <h1>Project Task Calendar</h1>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridWeek"
                events={tasks} // Pass your tasks here
                dateClick={handleDateClick} // Handle clicks on dates
                eventClick={(info) => {
                    alert(`You clicked on task: ${info.event.title}`);
                }}
                eventContent={(eventInfo) => {
                    const { title, extendedProps } = eventInfo.event;
                    const { subtasks } = extendedProps;

                    // Create a list of subtasks
                    const subtaskList = subtasks.map((subtask, index) => (
                        <li key={index}>{subtask.title}</li>
                    ));

                    return (
                        <div className='text-sm p-2 bg-blue-500 rounded-md'>
                            <strong className='text-lg'>{title}</strong>
                            {subtaskList.length > 0 && (
                                <ul className='text-sm list-disc pl-4'>
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
        </div>
    );
};

export default CalendarView;