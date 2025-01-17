"use client";
import React, { useEffect } from "react";
import { useUsers } from "../../providers/UserProvider";
import Button from "../Button";
import Link from "next/link";

// Helper function to format elapsed time
const formatElapsedTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // Format the time with leading zeros if necessary
    return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

const ActiveTimer = () => {
    const { currentUser } = useUsers();
    const [timeElapsed, setTimeElapsed] = React.useState(0);

    useEffect(() => {
        if (!currentUser || !currentUser.activeTimer) {
            return;
        }

        const interval = setInterval(() => {
            const startTime = new Date(currentUser.activeTimer.startTime);
            const currentTime = new Date();
            const elapsedTime = currentTime - startTime;
            setTimeElapsed(elapsedTime);
        }, 1000);

        return () => clearInterval(interval);
    }, [currentUser]);

    if (!currentUser || !currentUser.activeTimer) {
        return null;
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-orange text-gray-900 p-4 shadow-md">
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-sm font-semibold">Active Timer</p>
                    <Link className="text-xs" href={`/portal/${currentUser.activeTimer.project.hubspotId}/projects/${currentUser.activeTimer.project.id}`}>
                        {currentUser.activeTimer.task.name} -{" "}
                        {currentUser.activeTimer.project.title}
                    </Link>
                    
                </div>
                <div className="flex items-center space-x-2">
                <p className="text-xs font-mono mt-1">
                        {formatElapsedTime(timeElapsed)}
                    </p>
                <Button
                    
                    onClick={() => {
                        // Stop the timer
                    }}
                >
                    Stop
                </Button>
                </div>
            </div>
        </div>
    );
};

export default ActiveTimer;