"use client";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const Timeline = () => {
  const [events, setEvents] = useState(null);
  useEffect(() => {
    // load in 3 events related to the request
    setEvents([
      {
        date: "2024-06-20",
        title: "The Food Group",
        description: "The request was created and logged into the system.",
      },
      {
        date: "2024-06-21",
        title: "Social Revolt Agency",
        description:
          "An initial assessment was carried out to determine the scope of the request.",
      },
      {
        date: "2024-06-22",
        title: "ParkHub",
        description:
          "The request was assigned to a technician for further action.",
      },
      {
        date: "2024-06-22",
        title: "Belfort Design Agency",
        description:
          "The request was assigned to a technician for further action.",
      },
    ]);
  }, []);

  if (!events) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container mx-auto p-4 mb-2 mt-4">
      {/* <h2 className="text-5xl font-medium mb-10">Work Experience</h2> */}
      <ol className="relative border-s border-gray-200 dark:border-gray-700 ml-10">
        {events.map((event, index) => (
          <li key={index} className="mb-16 ml-4">
            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
            <time className="mb-1 text-xl font-normal leading-none text-gray-400 dark:text-gray-500">
              {new Date(event.date).toLocaleDateString()}
            </time>
            <h3 className="text-3xl font-semibold text-gray-900 dark:text-white">
              {event.title}
            </h3>
            <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
              {event.description}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Timeline;
