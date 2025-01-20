"use client";

import React from "react";
import Timeline from "react-calendar-timeline";
// import 'react-calendar-timeline/lib/Timeline.css';
// import 'react-calendar-timeline/lib/Timeline.css'
import moment from "moment";

const TimelineView = ({ projects }) => {
  // Format the projects into timeline items
  const items = projects.map((project, index) => {
    const startDate = moment().add(index * 7, "days").toDate(); // Start date is dynamically calculated
    const dueDate = moment(startDate).add(14, "days").toDate(); // Example: Duration of 14 days

    return {
      id: index,
      group: index + 1, // Match group ID
      title: `${project.jobNumber} - ${project.title}`,
      start_time: startDate,
      end_time: dueDate,
      className: project.status === "on track" ? "on-track" : "off-track",
    };
  });

  // Groups can be extended if you have categories or teams
  const groups = projects.map((project, index) => ({
    id: index + 1, // Ensure unique group IDs
    title: `${project.jobNumber} - ${project.title}`,
    height: 50,

  }));

  return (
    <div className="bg-gray-900 p-6 rounded" id="timelineContainer">
      <Timeline
        groups={groups}
        items={items}
        defaultTimeStart={moment().subtract(1, "month")}
        defaultTimeEnd={moment().add(1, "month")}
        canMove={false}
        sidebarWidth={400}
        canResize={false}
        groupRenderer={({ group }) => (
          <div style={{ width: "400px !important", padding: "4px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {group.title} 
          </div>
        )}
        itemRenderer={({ item, itemContext, getItemProps }) => {
          const { key, ...restProps } = getItemProps({
            style: {
              background: itemContext.selected ? "#2196f3" : "#f5f5f5",
              borderColor: itemContext.resizing ? "#f44336" : "#000",
              color: item.className === "on-track" ? "#4caf50" : "#ff9800",
              padding: "4px",
              borderRadius: "4px",
              textAlign: "center",
            },
          });

          return (
            <div key={key} {...restProps} className={`timeline-item ${item.className}`}>
              <span>{item.title}</span>
            </div>
          );
        }}
      />
    </div>
  );
};

export default TimelineView;