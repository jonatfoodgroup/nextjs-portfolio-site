"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Button  from "../Button";
import { useUsers } from "../../providers/UserProvider";

const TaskTimer = ({ task, project, updateTask }) => {
    const [activeTimer, setActiveTimer] = useState(null);
    const { data: session } = useSession();
    const { updateActiveTimer } = useUsers();
    useEffect(() => {
      // Check if there is an active timer when the component mounts
      if (task.activeTimer) {
        setActiveTimer(task.activeTimer);
      }
    }, [task.activeTimer]);
  
    const startTimer = async () => {
      if (activeTimer) {
        console.warn("A timer is already running for this task.");
        return;
      }
  
      const startTime = Date.now();
  
      const newTimeEntry = {
        id: `${task.id}-${startTime}`, // Unique ID for the time entry
        startTime: new Date(startTime).toISOString(),
        endTime: null, // End time will be set when stopped
        duration: null, // Duration will be calculated when stopped
      };
  
      // Save the active timer entry in Firestore
      await updateTask(task.id, {
        timeEntries: [...(task.timeEntries || []), newTimeEntry],
        activeTimer: newTimeEntry.id,
      });

      updateActiveTimer(session.user.id, {
          taskId: task.id,
          timeEntryId: newTimeEntry.id,
          task: task,
          project: project,
          startTime: new Date(startTime).toISOString(),
      });
  
      setActiveTimer(newTimeEntry.id);
  
      // Send a Discord message
      await fetch("/api/discord/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          channelId: project.discordChannelId,
          message: `🚀 Timer started for **${task.name}**. Stay focused!`,
        }),
      });
    };
  
    const stopTimer = async () => {
      if (!activeTimer) {
        console.warn("No active timer to stop.");
        return;
      }
  
      const endTime = Date.now();
  
      // Find the active time entry
      const updatedTimeEntries = task.timeEntries.map((entry) => {
        if (entry.id === activeTimer) {
          const duration = Math.round((endTime - new Date(entry.startTime).getTime()) / 60000); // Duration in minutes
          return {
            ...entry,
            endTime: new Date(endTime).toISOString(),
            duration,
          };
        }
        return entry;
      });
  
      // Update the task with the completed time entry and clear the active timer
      await updateTask(task.id, {
        timeEntries: updatedTimeEntries,
        activeTimer: null,
      });

      updateActiveTimer(session.user.id, null);
  
      setActiveTimer(null);
  
      // Send a Discord message
      await fetch("/api/discord/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          channelId: project.discordChannelId,
          message: `⏹️ Timer stopped for **${task.name}**. Duration: ${updatedTimeEntries.find((entry) => entry.id === activeTimer)?.duration
            } minutes.`,
        }),
      });
    };
  
    return (
      <div>
        {activeTimer ? (
          <Button
            onClick={stopTimer}
            variant="danger"
          >
            Stop Timer
          </Button>
        ) : (
          <Button
            onClick={startTimer}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Start Timer
          </Button>
        )}
      </div>
    );
  };

  export default TaskTimer;