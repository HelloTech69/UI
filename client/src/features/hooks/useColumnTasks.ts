import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

import { ColumnType, debug, TaskModel } from "~utils";

import useTaskCollection from "./useTaskCollection";

const MAX_TASK_PER_COLUMN = 100;

function swap<T>(arr: T[], num1: number, num2: number): T[] {
  const copy = [...arr];
  const tmp = copy[num1];
  copy[num1] = copy[num2];
  copy[num2] = tmp;
  return copy;
}

function useColumnTasks(column: ColumnType) {
  const [tasks, setTasks] = useTaskCollection();

  const columnTasks = tasks[column];

  const getColumnColor = (columnName: ColumnType): string => {
    const colorMap: Record<ColumnType, string> = {
      Blocked: "red.300",
      Completed: "green.300",
      "In Progress": "blue.300",
      Todo: "gray.300",
    };

    return colorMap[columnName] || "blue.300";
  };

  const addEmptyTask = useCallback(() => {
    debug(`Adding new empty task to ${column} column`);
    setTasks((allTasks) => {
      const columnTasks = allTasks[column];

      if (columnTasks.length > MAX_TASK_PER_COLUMN) {
        debug("Too many task!");
        return allTasks;
      }

      const newColumnTask: TaskModel = {
        id: uuidv4(),
        title: `New ${column} task`,
        color: getColumnColor(column),
        column: column,
      };

      return {
        ...allTasks,
        [column]: [newColumnTask, ...columnTasks],
      };
    });
  }, [column, setTasks]);

  const deleteTask = useCallback(
    (id: TaskModel["id"]) => {
      debug(`Removing task ${id}..`);
      setTasks((allTasks) => {
        const columnTasks = allTasks[column];
        return {
          ...allTasks,
          [column]: columnTasks.filter((task) => task.id !== id),
        };
      });
    },
    [column, setTasks],
  );

  const updateTask = useCallback(
    (id: TaskModel["id"], updatedTask: Omit<Partial<TaskModel>, "id">) => {
      debug(`Updating task ${id} with ${JSON.stringify(updateTask)}`);
      setTasks((allTasks) => {
        const columnTasks = allTasks[column];
        return {
          ...allTasks,
          [column]: columnTasks.map((task) =>
            task.id === id ? { ...task, ...updatedTask } : task,
          ),
        };
      });
    },
    [column, setTasks],
  );

  const dropTaskFrom = useCallback(
    (from: ColumnType, id: TaskModel["id"]) => {
      setTasks((allTasks) => {
        const fromColumnTasks = allTasks[from];
        const toColumnTasks = allTasks[column];
        const movingTask = fromColumnTasks.find((task) => task.id === id);

        debug(`Moving task ${movingTask?.id} from ${from} to ${column}`);

        if (!movingTask) {
          return allTasks;
        }

        const updatedMovingTask = {
          ...movingTask,
          column,
          color: getColumnColor(column),
        };

        return {
          ...allTasks,
          [from]: fromColumnTasks.filter((task) => task.id !== id),
          [column]: [updatedMovingTask, ...toColumnTasks],
        };
      });
    },
    [column, setTasks],
  );

  const swapTasks = useCallback(
    (num1: number, num2: number) => {
      debug(`Swapping task ${num1} with ${num2} in ${column} column`);
      setTasks((allTasks) => {
        let columnTasks = allTasks[column];

        columnTasks = columnTasks.map((task, index) => {
          if (index === num1 || index === num2) {
            return { ...task, color: getColumnColor(column) };
          }
          return task;
        });

        columnTasks = swap(columnTasks, num1, num2).map((task, index) => {
          if (index === num1 || index === num2) {
            return { ...task, color: getColumnColor(column) };
          }
          return task;
        });

        return {
          ...allTasks,
          [column]: columnTasks,
        };
      });
    },
    [column, setTasks, getColumnColor],
  );

  return {
    tasks: columnTasks,
    addEmptyTask,
    updateTask,
    dropTaskFrom,
    deleteTask,
    swapTasks,
  };
}

export default useColumnTasks;
