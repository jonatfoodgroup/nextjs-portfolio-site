import { useDroppable, useDraggable } from "@dnd-kit/core";

export const Droppable = ({ id, children }) => {
  const { setNodeRef } = useDroppable({ id });
  return (
    <div ref={setNodeRef} className="bg-gray-800 p-1 rounded-lg">
      {children}
    </div>
  );
};

export const Draggable = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useDraggable({ id });
  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
  };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};