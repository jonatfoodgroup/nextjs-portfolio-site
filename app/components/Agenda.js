import React, { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useContent } from "../providers/ContentProvider";

// Sample data with content types
const sampleEvents = [
  {
    date: "2025-01-23",
    events: [
      {
        time: "2:00 PM",
        title: "Road to the Summit: A Look at Our Pre-Summit Event Series",
        goals: "Increase awareness of the pre-summit event series",
        assignee: "Samantha Bright",
        priority: "High",
        type: "email", // Type: blog, article, social
        channel: "Hubspot",
        image: null,
      },
      // {
      //   time: "One-off",
      //   title: "Sponsor Form",
      //   goals: "Segment sponsors from pages hosted on the YTexas website",
      //   assignee: "Samantha Bright",
      //   priority: "High",
      //   type: "form",
      //   channel: "Hubspot",
      //   image: null,
      // },
      {
        time: "3:15 PM ",
        title: "City Deep Dive: Why Houston Is a Beacon for Innovation and Industry",
        assignee: "John Heart",
        priority: "Low",
        type: "article",
        channel: "Wordpress",
        image: "https://ytexas.com/wp-content/uploads/2024/10/241001-T-Texas-051-copy-scaled.jpg",
      },
      {
        time: "4:15 PM",
        title: "YTexas Partners with Greater Houston Partnership",
        assignee: "John Heart",
        priority: "High",
        type: "social",
        channel: "Linkedin",
        image: "https://placehold.co/100",
      },
    ],
  },
  {
    date: "2025-01-24",
    events: [
      {
        time: "9:30 AM - 10:30 AM",
        title: "New on the YTexas App: Exclusive Networking Features",
        assignee: "Sandra Johnson",
        priority: "Low",
        type: "article",
        channel: "Wordpress",
        image: null,
      },
      {
        time: "9:30 AM - 10:30 AM",
        title: "New on the YTexas App: Exclusive Networking Features",
        assignee: "Sandra Johnson",
        priority: "Low",
        type: "article",
        channel: "Wordpress",
        image: null,
      },
      {
        time: "9:30 AM - 10:30 AM",
        title: "New on the YTexas App: Exclusive Networking Features",
        assignee: "Sandra Johnson",
        priority: "Low",
        type: "article",
        channel: "Wordpress",
        image: null,
      },
    ],
  },
];

// Map type to Iconify icons
const typeIcons = {
  email: "mdi:hubspot", // Email icon
  article: "mdi:wordpress", // Article icon
  social: "mdi:linkedin", // Social Media icon
};

const AgendaView = () => {
  const { content, updateContent } = useContent();
  const [currentWeek, setCurrentWeek] = useState(0); // Week offset (0 = this week)
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleWeekChange = (offset) => {
    setCurrentWeek((prev) => prev + offset);
  };

  const getFormattedDateRange = (weekOffset) => {
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() + weekOffset * 7);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const options = { month: "short", day: "numeric" };
    return `${startOfWeek.toLocaleDateString(undefined, options)} - ${endOfWeek.toLocaleDateString(
      undefined,
      options
    )}`;
  };

  return (
    <div className="w-full bg-gray-800 text-gray-200 mx-auto">
      <div className="flex">
        <div className="w-1/2">
          <div className="flex items-top justify-between">
            {/* Header with Week Switcher */}
            <div className="flex items-center justify-start mb-6 space-x-4">
              <button
                onClick={() => handleWeekChange(-1)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-700 text-gray-200 rounded-md"
              >
                {"<"}
              </button>
              <h2 className="text-lg font-semibold">{getFormattedDateRange(currentWeek)}</h2>
              <button
                onClick={() => handleWeekChange(1)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-700 text-gray-200 rounded-md"
              >
                {">"}
              </button>
            </div>

            <div className="flex items-top justify-end mb-6 space-x-4">
              <button
                onClick={() => updateContent({ type: "add" })}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-700 text-gray-200 rounded-md"
              >
                List
              </button>
              <button
                onClick={() => updateContent({ type: "add" })}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-700 text-gray-200 rounded-md"
              >
                Calendar
              </button>
            </div>
          </div>

          {/* Agenda List */}
          <div className="h-[600px] overflow-y-auto">
            {sampleEvents.map((day) => (
              <div key={day.date} className="flex items-start">
                <div className="flex align-top w-full border-t border-gray-700">
                  <div className="md:w-1/12 border-r pr-4 border-gray-700">
                    <h3 className="text-md text-gray-400 font-regular mb-4 pt-4">
                      {new Date(day.date).toLocaleDateString(undefined, {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                    </h3>
                  </div>
                  <div className="md:w-11/12">
                    <ul className="space-y-2 pb-4">
                      {day.events.map((event, index) => (
                        <li
                          onClick={() => setSelectedEvent(event)}
                          key={index}
                          className={`flex items-top p-4 rounded-lg bg-gray-800 hover:bg-gray-700 transition cursor-pointer`}
                        >
                          {/* Image/Type Placeholder */}
                          <div className="flex-shrink-0 w-24 h-24 rounded-md bg-gray-700 flex items-center justify-center mr-4">
                            {event.image ? (
                              <img
                                src={event.image}
                                alt={event.type}
                                className="w-full h-full object-cover rounded-md"
                              />
                            ) : (
                              <img
                                src="https://placehold.co/100"
                                alt={event.type}
                                className="w-full h-full object-cover rounded-md"
                              />
                            )}
                          </div>

                          {/* Event Details */}
                          <div className="flex-1">
                            <div className="font-regular text-gray-400 text-sm">
                              <Icon icon={typeIcons[event.type]} className="w-4 h-4 inline mr-1" />
                              {event.time}</div>
                            <div className="text-base font-medium">{event.title}</div>

                            {/* Channel and Type Badges */}
                            <div className="mt-2 flex items-center space-x-2">
                              {/* Channel Badge */}
                              <span
                                className={`inline-block px-2 py-1 text-xs font-semibold rounded-md ${event.channel === "Linkedin"
                                  ? "bg-blue-500 text-white"
                                  : event.channel === "Wordpress"
                                    ? "bg-green-500 text-white"
                                    : event.channel === "Hubspot"
                                      ? "bg-orange-500 text-white"
                                      : "bg-gray-500 text-white"
                                  }`}
                              >
                                {event.channel}
                              </span>

                              {/* Type Badge */}
                              <span
                                className={`inline-block px-2 py-1 text-xs font-semibold rounded-md ${event.type === "social"
                                  ? "bg-blue-400 text-white"
                                  : event.type === "blog"
                                    ? "bg-purple-500 text-white"
                                    : event.type === "article"
                                      ? "bg-teal-500 text-white"
                                      : "bg-gray-500 text-white"
                                  }`}
                              >
                                {event.type}
                              </span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {selectedEvent && (
        <div className="w-1/2 px-6">
        
          <div className="flex flex-col h-full">
            <h2 className="text-2xl font-semibold mb-4">{selectedEvent.title}</h2>
            <p className="text-gray-400 mb-4">Goal: {selectedEvent.goals}</p>
          </div>
       
        </div>
         )}
      </div>
    </div>
  );
};

export default AgendaView;