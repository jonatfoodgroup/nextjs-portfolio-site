import React, { useState } from "react";

const TaskList = ({ tasks }) => {
  const [completedTasks, setCompletedTasks] = useState([]);

  const toggleTask = (task) => {
    setCompletedTasks((prev) =>
      prev.includes(task) ? prev.filter((t) => t !== task) : [...prev, task]
    );
  };

  return (
    <div className="mt-4 space-y-2">
      {tasks.map((task, index) => (
        <div key={index} className="flex items-center space-x-3">
          <input
            type="checkbox"
            className="w-5 h-5 accent-blue-500"
            checked={completedTasks.includes(task)}
            onChange={() => toggleTask(task)}
          />
          <span
            className={`text-gray-300 ${completedTasks.includes(task) ? "line-through text-gray-500" : ""}`}
          >
            {task}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TaskList;