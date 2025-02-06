"use client";

import React from "react";
import Timeline, { TimelineMarkers, TodayMarker } from "react-calendar-timeline";
import moment from "moment";

const TimelineView = ({ project }) => {
  // Ensure tasks exist
  if (!project || !project.tasks || project.tasks.length === 0) {
    return <p className="text-gray-500">No tasks available</p>;
  }

  // Groups: Each task is its own group
  const groups = project.tasks
    .filter((task) => task.startDate && task.endDate)
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
    .map((task) => ({
      id: task.id,
      title: task.name,
      height: 50,
    }));

  // Timeline items: Each task is an item
  const items = project.tasks
    .filter((task) => task.startDate && task.endDate)
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
    .map((task) => ({
      id: task.id,
      group: task.id,
      title: task.name,
      start_time: moment(task.startDate).toDate(),
      end_time: moment(task.endDate).toDate(),
      className:
        task.status === "completed"
          ? "completed"
          : task.status === "in progress"
          ? "in-progress"
          : "upcoming",
    }));

  return (
    <div className="bg-gray-800 rounded-xl" id="timelineContainer">
      <Timeline
        groups={groups}
        items={items}
        defaultTimeStart={moment().subtract(7, "days")}
        defaultTimeEnd={moment().add(14, "days")}
        canMove={false}
        canResize={false}
        sidebarWidth={250}
        itemHeightRatio={0.8}
        stackItems
        timeSteps={{
          day: 1,
        }}
        headerLabelFormats={{
          dayShort: "D", // Show only the day number
          dayLong: "D", // Show only the day number
        }}
        groupRenderer={({ group }) => (
          <div className="text-gray-300 font-semibold">{group.title}</div>
        )}
        itemRenderer={({ item, itemContext, getItemProps }) => {
          const { key, ...restProps } = getItemProps({
            style: {
              background:
                item.className === "completed"
                  ? "#4caf50"
                  : item.className === "in-progress"
                  ? "#ff9800"
                  : "#2196f3",
              color: "#fff",
              borderRadius: "4px",
              padding: "6px",
              fontSize: "12px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textAlign: "center",
            },
          });

          return (
            <div key={key} {...restProps} className={`timeline-item ${item.className}`}>
              <span>{item.title}</span>
            </div>
          );
        }}
      >
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