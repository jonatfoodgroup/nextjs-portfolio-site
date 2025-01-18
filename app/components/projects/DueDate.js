"use client";

// A due date component that displays today, tomorrow, the date if it is more than 2 days away, or highlights past due dates
const DueDate = ({ date }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to compare dates properly
  const dueDate = new Date(date);
  dueDate.setHours(0, 0, 0, 0); // Reset time to compare dates properly
  const diffTime = dueDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const getStyledLabel = () => {
    if (diffDays === 0) {
      return (
        <span className="text-red-500 font-regular">
          <span className="block text-sm text-gray-500">Due Date:</span> Today
        </span>
      );
    } else if (diffDays === 1) {
      return (
        <span className="text-yellow-500 font-regular">
          <span className="block text-sm text-gray-500">Due Date:</span> Tomorrow
        </span>
      );
    } else if (diffDays < 0) {
      return (
        <span className="text-red-700 font-regular">
          <span className="block text-sm text-gray-500">Due Date:</span> Past Due
        </span>
      );
    } else {
      return (
        <span className="text-gray-700 font-regular">
          <span className="block text-sm text-gray-500">Due Date:</span> {dueDate.toLocaleDateString()}
        </span>
      );
    }
  };

  return <div className="inline-flex items-center space-x-2">{getStyledLabel()}</div>;
};

export default DueDate;