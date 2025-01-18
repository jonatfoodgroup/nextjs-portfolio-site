"use client";
import StatusUpdateComponent from "./StatusUpdateComponent";

const StatusUpdates = ({ project, statuses = [] }) => (
    <div className="mt-4 p-6 bg-gray-900 rounded-xl">
      <div className="flex justify-between items-center mb-4">
       <h3 className="text-lg font-regular text-gray-400">Status Updates</h3>
      </div>
      <StatusUpdateComponent project={project} projectId={project.id} hubspotId={project.hubspotId} />
      {statuses.length === 0 ? (
        <p className="text-sm text-gray-500">No status updates yet.</p>
      ) : (
        <ul className="space-y-2">
          {statuses.map((status, index) => (
            <StatusItem key={index} status={status} />
          ))}
        </ul>
      )}
    </div>
  );

  const ProjectStatus = ({ status }) => {
    const badgeStyle = (status) => {
        switch (status) {
            case "On track":
                return "bg-gray-800 text-green-500";
            case "Off track":
                return "bg-gray-800 text-red-500";
            case "On hold":
                return "bg-gray-800 text-yellow-500";
            default:
                return "bg-gray-800 text-gray-500";
        }
    };

    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${badgeStyle(status)}`}>
            {status || "No status"}
        </span>
    );
}

  const StatusItem = ({ status }) => (
    <li className={`p-4 border border-gray-700 rounded-xl space-y-2`}>
      <ProjectStatus status={status.status} />
      <p className="text-md text-gray-200 font-regular">
        {status.note ? status.note : "No additional notes"}
      </p>
      
    </li>
  );

  export default StatusUpdates;