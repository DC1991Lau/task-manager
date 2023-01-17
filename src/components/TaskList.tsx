import type { Task } from "@prisma/client";
import React from "react";
import { TaskCard } from "./TaskCard";

interface TaskListProps {
  data: Task[];
}

export const TaskList = ({ data }: TaskListProps) => {
  if (!data) return <h1>Sem tarefas criadas</h1>;
  return (
    <table className="w-full whitespace-nowrap">
      <tbody>
        <ul>
          {data?.map((task) => (
            <TaskCard
              id={task.id}
              key={task.id}
              title={task.title}
              createdAt={task.createdAt}
              status={task.status}
            />
          ))}
        </ul>
      </tbody>
    </table>
  );
};
