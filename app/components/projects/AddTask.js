import React from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';

const AddTask = ({
    showAddTaskForm,
    setShowAddTaskForm
}) => {
    return (
        <button
              onClick={() => setShowAddTaskForm(!showAddTaskForm)}
              className="border border-gray-500 rounded px-4 py-2 text-sm text-gray-800 hover:text-gray-600"
            >
                {showAddTaskForm ? "Hide" : "Add Task"}
            </button>
    )
}

export default AddTask;