"use client";

import React, { useEffect, useState, useRef } from "react";
import {
    DndContext,
    closestCenter,
    DragOverlay,
    useSensor,
    useSensors,
    PointerSensor,
    useDraggable
} from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
    arrayMove,
} from "@dnd-kit/sortable";
import { Droppable, Draggable } from "./DndKitHelpers";

const Kanban = ({
    columnsData,
    onDragEnd,
    onItemClick,
    renderCardContent, // Custom render function for card content
    columnClassName,
    cardClassName,
}) => {
    const [columns, setColumns] = useState(columnsData);
    const [activeItem, setActiveItem] = useState(null);

    useEffect(() => {
        if (columnsData) {
            setColumns(columnsData);
        }
    }, [columnsData]);

    const sensors = useSensors(useSensor(PointerSensor));

    const handleDragStart = (event) => {
        const { id } = event.active;
        const item = Object.values(columns)
            .flatMap((col) => col.items)
            .find((i) => i.id === id);
        setActiveItem(item);
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (!over) {
            setActiveItem(null);
            return;
        }

        const sourceColumnId = Object.keys(columns).find((colId) =>
            columns[colId].items.some((item) => item.id === active.id)
        );
        const targetColumnId = over.id;

        if (sourceColumnId === targetColumnId) {
            // Reordering within the same column
            const updatedItems = arrayMove(
                columns[sourceColumnId].items,
                columns[sourceColumnId].items.findIndex((item) => item.id === active.id),
                columns[sourceColumnId].items.findIndex((item) => item.id === over.id)
            );
            setColumns({
                ...columns,
                [sourceColumnId]: { ...columns[sourceColumnId], items: updatedItems },
            });
        } else {
            // Moving between columns
            const sourceItems = columns[sourceColumnId].items.filter(
                (item) => item.id !== active.id
            );
            const targetItems = [
                ...columns[targetColumnId].items,
                columns[sourceColumnId].items.find((item) => item.id === active.id),
            ];

            setColumns({
                ...columns,
                [sourceColumnId]: { ...columns[sourceColumnId], items: sourceItems },
                [targetColumnId]: { ...columns[targetColumnId], items: targetItems },
            });

            // Trigger external callback
            onDragEnd && onDragEnd(active.id, sourceColumnId, targetColumnId);
        }

        setActiveItem(null);
    };

    return (
        <div className="kanban-container flex gap-4 p-4 bg-black">
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                options={{
                    delay: {
                        mouse: 200, // 200ms delay for mouse
                        touch: 200, // 200ms delay for touch
                    },
                }}
            >
                <div className="flex gap-4 w-full">
                    {Object.entries(columns).map(([columnId, column]) => {
                        return (
                            <Droppable key={columnId} id={columnId}>
                                <div className={`w-96 p-4 rounded-lg shadow-md ${columnClassName}`}>
                                    <h3 className="text-lg font-semibold mb-4 text-gray-100">
                                        {column.title}
                                    </h3>
                                    <SortableContext
                                        items={column.items.map((item) => item.id)}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        {column.items.map((item) => (
                                            <DraggableElement key={item.id} item={item} onItemClick={onItemClick} renderCardContent={renderCardContent} cardClassName={cardClassName} />
                                        ))}
                                    </SortableContext>
                                </div>
                            </Droppable>
                        )
                    })}
                </div>
                <DragOverlay>
                    {activeItem ? (
                        <div className={`p-4 rounded-md shadow-md ${cardClassName}`}>
                            {renderCardContent
                                ? renderCardContent(activeItem)
                                : activeItem.name}
                        </div>
                    ) : null}
                </DragOverlay>
            </DndContext>
        </div>
    );
};

const DraggableElement = ({ item, onItemClick, renderCardContent, cardClassName }) => {
    const { attributes, listeners, setNodeRef } = useDraggable({
        id: item.id,
    });

    return (
        <div ref={setNodeRef} className={`p-4 mb-3 rounded-md relative shadow-sm ${cardClassName} hover:shadow-md hover:border-orange-500`}>
            {/* Drag Handle */}
            <div
                {...listeners} // Attach drag listeners
                {...attributes} // Attach drag attributes
                className="cursor-grab bg-gray-600 p-2 rounded-md mb-2 absolute top-1 right-2"
                title="Drag"
            >
                <span className="text-white text-sm">::</span>
            </div>

            {/* Card Content */}
            <div
                onClick={() => onItemClick && onItemClick(item)} // Handle clicks separately
                className="cursor-pointer"
            >
                {renderCardContent ? renderCardContent(item) : item.title}
            </div>
        </div>
    );
};

export default Kanban;