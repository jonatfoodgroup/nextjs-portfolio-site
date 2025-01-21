"use client";

import React, { useEffect, useState } from "react";
import {
    DndContext,
    closestCenter,
    DragOverlay,
    useSensor,
    useSensors,
    PointerSensor,
} from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
    arrayMove,
} from "@dnd-kit/sortable";
import { Droppable, Draggable } from "../DndKitHelpers"; // Helper components to simplify droppable/drag behavior
import { useTasks } from "../../providers/TasksProvider";
import TaskDetails from "./TaskDetails";
import Modal from "../Modal";

const TaskKanban = () => {
    const { tasks, updateTask } = useTasks();
    const [columns, setColumns] = useState({});
    const [activeTask, setActiveTask] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const openModal = (task) => {
        console.log(task);
        setSelectedTask(task);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTask(null);
    };

    useEffect(() => {
        if (!tasks) return;

        const groupedTasks = tasks.reduce((acc, task) => {
            if (!acc[task.status]) acc[task.status] = [];
            acc[task.status].push(task);
            return acc;
        }, {});

        const initialColumns = ["pending", "in-progress", "completed"].reduce(
            (acc, status) => {
                acc[status] = {
                    id: status,
                    title: status.charAt(0).toUpperCase() + status.slice(1),
                    tasks: groupedTasks[status] || [],
                };
                return acc;
            },
            {}
        );

        setColumns(initialColumns);
    }, [tasks]);

    const sensors = useSensors(useSensor(PointerSensor));

    const handleDragStart = (event) => {
        const { id } = event.active;
        const task = Object.values(columns)
            .flatMap((col) => col.tasks)
            .find((t) => t.id === id);
        setActiveTask(task);
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (!over) {
            setActiveTask(null);
            return;
        }

        const sourceColumnId = Object.keys(columns).find((colId) =>
            columns[colId].tasks.some((task) => task.id === active.id)
        );
        const targetColumnId = over.id;

        if (sourceColumnId === targetColumnId) {
            // Reordering within the same column
            const updatedTasks = arrayMove(
                columns[sourceColumnId].tasks,
                columns[sourceColumnId].tasks.findIndex((task) => task.id === active.id),
                columns[sourceColumnId].tasks.findIndex((task) => task.id === over.id)
            );
            setColumns({
                ...columns,
                [sourceColumnId]: { ...columns[sourceColumnId], tasks: updatedTasks },
            });
        } else {
            // Moving between columns
            const sourceTasks = columns[sourceColumnId].tasks.filter(
                (task) => task.id !== active.id
            );
            const targetTasks = [
                ...columns[targetColumnId].tasks,
                columns[sourceColumnId].tasks.find((task) => task.id === active.id),
            ];

            setColumns({
                ...columns,
                [sourceColumnId]: { ...columns[sourceColumnId], tasks: sourceTasks },
                [targetColumnId]: { ...columns[targetColumnId], tasks: targetTasks },
            });

            // Update task status in the backend
            updateTask(active.id, { status: targetColumnId });
        }

        setActiveTask(null);
    };

    return (
        <>
        <div className="kanban-container flex gap-4 p-4 bg-gray-900">
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <div className="flex gap-4 w-full bg-gray-900 columns">
                    {Object.entries(columns).map(([columnId, column]) => (
                        <Droppable key={columnId} id={columnId}>
                            <div className="w-80 bg-gray-800 p-4 rounded-lg shadow-md">
                                <h3 className="text-lg font-semibold mb-4 text-gray-100">
                                    {column.title}
                                </h3>
                                <SortableContext
                                    items={column.tasks.map((task) => task.id)}
                                    strategy={verticalListSortingStrategy}
                                >
                                    {column.tasks.map((task) => (
                                        <Draggable key={task.id} id={task.id}>
                                            <div className="p-4 mb-3 bg-gray-700 rounded-md shadow-sm border border-gray-600">
                                                <strong className="block text-gray-200">
                                                    {task.name}
                                                </strong>
                                                <p className="text-sm text-gray-400 break-words">
                                                    {task.description}
                                                </p>
                                                
                                            </div>
                                        </Draggable>
                                    ))}
                                </SortableContext>
                            </div>
                        </Droppable>
                    ))}
                </div>
                <DragOverlay>
                    {activeTask ? (
                        <div className="p-4 bg-gray-700 rounded-md shadow-md border border-gray-600">
                            <strong className="block text-gray-200">{activeTask.name}</strong>
                            <p className="text-sm text-gray-400">{activeTask.description}</p>
                        </div>
                    ) : null}
                </DragOverlay>
            </DndContext>
        </div>
        {isModalOpen && selectedTask && (
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={`${selectedTask.name}`}
            >
                <TaskDetails task={selectedTask} updateTask={updateTask} />
            </Modal>
        )}
        </>
    );
};

export default TaskKanban;