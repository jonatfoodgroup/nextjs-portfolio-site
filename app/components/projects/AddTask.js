import React from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import Button from '../Button';

const AddTask = ({
    showAddTaskForm,
    setShowAddTaskForm
}) => {
    return (
        <Button
              onClick={() => setShowAddTaskForm(!showAddTaskForm)}
            >
                {showAddTaskForm ? "Hide" : "Add Task"}
            </Button>
    )
}

export default AddTask;