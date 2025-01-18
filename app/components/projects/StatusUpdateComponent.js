import React, { useState } from "react";
import { useProjects } from "../../providers/ProjectsProvider";
import { useHubspot } from "../../providers/HubspotProvider";
import Button from "../Button";

const StatusUpdateComponent = ({ project,projectId, hubspotId }) => {
  const [selectedStatus, setSelectedStatus] = useState("On track");
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState("");
  const [showAddStatusForm, setShowAddStatusForm] = useState(false);
  const { fetchCompanyById } = useHubspot();

  const { addStatusUpdate } = useProjects();

  const statuses = [
    { value: "On track", label: "On track" },
    { value: "On hold", label: "On hold" },
    { value: "Off track", label: "Off track" },
    { value: "No recent updates", label: "No recent updates" },
    { value: "Complete", label: "Complete" },
  ];

  const handleSave = async () => {
    setLoading(true);

    const newStatus = {
      status: selectedStatus,
      note, // Optional note
      timestamp: new Date(),
      submittedBy: "John Doe", // Replace with the actual user
    };

    const statusColors = {
      "On track": 65280, // Green
      "On hold": 16776960, // Yellow
      "Off track": 16711680, // Red
      "No recent updates": 8421504, // Gray
      "Complete": 255, // Blue
    };

    try {
      const company = await fetchCompanyById(hubspotId);

      await addStatusUpdate(projectId, newStatus);
      
      let jobNumber = project.jobNumber.slice(-5);

      await fetch("/api/discord/send-card", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          channelId: "1329274279052836894",
          title: `${company.properties.name}\n#${jobNumber} - ${project.title} - ${selectedStatus}`,
          description: note || "No additional notes",
          url: `https://strongstart.digital/portal/${hubspotId}/projects/${projectId}`,
          buttonLabel: "View Project",
          color: statusColors[selectedStatus],
        }),
      });

      // Reset input fields
      setSelectedStatus("On track");
      setNote("");
    } catch (error) {
      console.error("Error saving status update:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setShowAddStatusForm(!showAddStatusForm)}
      >
        {showAddStatusForm ? "Cancel" : "Update Project Status"}
      </Button>

      {
        showAddStatusForm && (
          <div className=" p-4 bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-white text-lg font-semibold mb-2">Update Project Status</h3>

            <div className="mb-4">
              <label htmlFor="status" className="block text-sm font-medium text-gray-300">
                Select Status
              </label>
              <select
                id="status"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring focus:ring-indigo-500"
                disabled={loading}
              >
                {statuses.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="note" className="block text-sm font-medium text-gray-300">
                Add a Note (Optional)
              </label>
              <textarea
                id="note"
                rows="3"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add any additional details about this status update..."
                className="w-full mt-1 p-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring focus:ring-indigo-500"
                disabled={loading}
              ></textarea>
            </div>

            <Button
              onClick={handleSave}
              disabled={loading}
              className="w-full"
              >
              {loading ? "Saving..." : "Save Status Update"}
              </Button>
          </div>
        )
      }
    </>
  );
};

export default StatusUpdateComponent;