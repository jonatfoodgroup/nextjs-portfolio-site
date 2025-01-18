"use client";

import React, { useEffect, useState } from "react";
import Button from "../Button";
import { useTasks } from "../../providers/TasksProvider";

const MarkAsBountyButton = ({ taskId, isBounty = false, disabled = false }) => {
  const [bountyStatus, setBountyStatus] = useState(isBounty);
    const { markAsBounty } = useTasks();

  useEffect(() => {
    // Update local state if `isBounty` prop changes
    setBountyStatus(isBounty);
  }, [isBounty]);

  const handleMarkAsBounty = async () => {
    try {
      if (!taskId) {
        console.error("Task ID is required to mark a task as a bounty.");
        return;
      }

      if (bountyStatus) {
        console.warn(`Task ${taskId} is already marked as a bounty.`);
        return;
      }

      await markAsBounty(taskId);
      setBountyStatus(true); // Update local state after successful marking
      console.log(`Task ${taskId} marked as a bounty.`);
    } catch (error) {
      console.error("Error marking task as bounty:", error.message);
    }
  };

  return (
    <Button
      onClick={handleMarkAsBounty}
      disabled={disabled || bountyStatus}
      variant={bountyStatus ? "outline" : "outline"}
      icon="carbon:debug"
    >
      {bountyStatus ? "Bounty Details" : "Mark as Bounty"}
    </Button>
  );
};

export default MarkAsBountyButton;