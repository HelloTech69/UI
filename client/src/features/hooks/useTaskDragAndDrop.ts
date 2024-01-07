import { useRef } from "react";
import { DropTargetMonitor, useDrag, useDrop, XYCoord } from "react-dnd";

import { DragItem, ItemType, TaskModel } from "~utils";

export function useTaskDragAndDrop<T extends HTMLElement>(
  { task, index }: { task: TaskModel; index: number },
  handleDropHover: (num1: number, num2: number) => void,
) {
  const ref = useRef<T>(null);

  const [{ isDragging }, drag] = useDrag<
    DragItem,
    void,
    { isDragging: boolean }
  >({
    item: { from: task.column, id: task.id, index },
    type: ItemType.TASK,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const canItemHover = (
    item: DragItem,
    monitor: DropTargetMonitor,
  ): boolean => {
    if (!ref.current) return false;
    if (item.from !== task.column) return false;
    if (item.index === index) return false;

    const { y: mouseY } = monitor.getClientOffset() as XYCoord;
    const hoveredBoundingRect = ref.current.getBoundingClientRect();
    const hoveredMiddleHeight =
      (hoveredBoundingRect.bottom - hoveredBoundingRect.top) / 2;
    const mouseYRelativeToHovered = mouseY - hoveredBoundingRect.top;

    const isAboveMiddle = mouseYRelativeToHovered < hoveredMiddleHeight;
    const isBelowMiddle = mouseYRelativeToHovered > hoveredMiddleHeight;
    const isDraggedItemAbove = item.index < index;
    const isDraggedItemBelow = !isDraggedItemAbove;

    return (
      (isDraggedItemAbove && !isAboveMiddle) ||
      (isDraggedItemBelow && !isBelowMiddle)
    );
  };

  // eslint-disable-next-line
  const [_, drop] = useDrop<DragItem, void, unknown>({
    accept: ItemType.TASK,
    hover: (item, monitor) => {
      if (canItemHover(item, monitor)) {
        handleDropHover(item.index, index);
        item.index = index;
      }
    },
  });

  drag(drop(ref));

  return {
    ref,
    isDragging,
  };
}
