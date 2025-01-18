"use client";
import StatusUpdateComponent from "./StatusUpdateComponent";

const StatusUpdates = ({ project, statuses = [] }) => (
    <div className="mt-4 p-6 bg-gray-900 rounded-xl">
      <div className="flex justify-between items-center mb-4">
       <h3 className="text-lg font-regular text-gray-400">Status Updates</h3>
       <StatusUpdateComponent project={project} projectId={project.id} hubspotId={project.hubspotId} />
      </div>
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

  const StatusItem = ({ status }) => (
    <li className={`p-4 border border-gray-700 rounded`}>
      <p className="text-sm text-gray-500 mb-2">
         {status.status}
      </p>
      <p className="text-md text-gray-200 font-regular">
        {status.note ? status.note : "No additional notes"}
      </p>
      
    </li>
  );

  export default StatusUpdates;