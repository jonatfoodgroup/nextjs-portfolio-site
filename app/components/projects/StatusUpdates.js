const StatusUpdates = ({ statuses = [] }) => (
    <div className="mt-4">
      <h4 className="text-sm font-semibold">Status Updates</h4>
      {statuses.length === 0 ? (
        <p className="text-sm text-gray-500">No status updates yet.</p>
      ) : (
        <ul className="space-y-2">
          {statuses.map((status, index) => (
            <li key={index} className="p-2 border border-gray-200 rounded">
              <p className={`font-bold ${status.status === "Complete" ? "text-green-700" : ""}`}>
              {status.note}
              </p>
              <p className="text-sm text-gray-600">{status.status}</p>
              <p className="text-xs text-gray-400">
                Updated: {new Date(status.timestamp).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  export default StatusUpdates;