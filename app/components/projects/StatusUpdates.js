const statusColors = {
  "On track": 65280, // Green
  "On hold": 16776960, // Yellow
  "Off track": '#16711680', // Red
  "No recent updates": 8421504, // Gray
  "Complete": 255, // Blue
};


const StatusUpdates = ({ statuses = [] }) => (
    <div className="mt-4">
      <h4 className="text-sm font-semibold">Status Updates</h4>
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
    <li className={`p-4 border border-gray-200 rounded bg-white shadow-sm border-l-4`}>
      <p className="text-sm text-gray-500 mb-2">
         {status.status}
      </p>
      <p className="text-md font-semibold">
        {status.note ? status.note : "No additional notes"}
      </p>
      
    </li>
  );

  export default StatusUpdates;