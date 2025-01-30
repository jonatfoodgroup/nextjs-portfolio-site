import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

const CalendarView = ({
    project
}) => {
    const [tasks, setTasks] = useState([]); 

    useEffect(() => {
        if (project.tasks) {
            setTasks(project.tasks.map((task) => ({
                title: task.name,
                start: task.startDate,
                end: task.endDate,
            })));
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