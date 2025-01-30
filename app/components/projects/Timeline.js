import React, { useEffect, useState } from "react";
import Timeline, {
  TimelineMarkers,
  TodayMarker,
} from "react-calendar-timeline";
import moment from "moment";

const TimelineView = ({ projects }) => {
  // Convert startDate to Date object and sort by it
  const groups = projects
    .filter(project => project.startDate && project.endDate)
    .sort((a, b) => moment(a.startDate).isBefore(moment(b.startDate)) ? -1 : 1) // Corrected sorting logic
    .map((project, index) => ({
      id: index + 1, // Ensure unique group IDs
      title: `${project.jobNumber} - ${project.title}`,
      status: project.status,
      height: 50,
    }));

  const items = projects
    .filter(project => project.startDate && project.endDate)
    .sort((a, b) => moment(a.startDate).isBefore(moment(b.startDate)) ? -1 : 1) // Corrected sorting logic
    .map((project, index) => {
      const startDate = moment(project.startDate).toDate();
      const dueDate = moment(project.endDate).toDate();

      return {
        id: index,
        group: index + 1, // Match group ID
        title: `${project.jobNumber} - ${project.title}`,
        start_time: startDate,
        end_time: dueDate,
        className: project.status === "on track" ? "on-track" : "off-track",
        status: project.status, // Include the status to check if it's complete
      };
    });

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
              {/* Check if the project is complete and add a badge */}
              {item.status === "complete" && (
                <span className="ml-2 px-2 py-1 text-sm text-gray-500 bg-gray-300 rounded">
                  Complete
                </span>
              )}
            </div>
          );
        }}
      >
        {/* Add Today Marker */}
        <TimelineMarkers>
          <TodayMarker
            date={moment().toDate()}
            className="today-marker"
            style={{ backgroundColor: "red", width: "2px", zIndex: 50 }}
          />
        </TimelineMarkers>
      </Timeline>
    </div>
  );
};

export default TimelineView;