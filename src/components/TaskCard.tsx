import Link from "next/link";
import { useEffect, useState } from "react";
import { FiCheck, FiEdit, FiPause, FiPlay, FiTrash } from "react-icons/fi";
import { api } from "../utils/api";

interface TaskCardProps {
  id: string;
  title: string;
  status: string;
  createdAt: Date;
}

const colorStatus = [
  { status: "DONE", color: "bg-red-400" },
  { status: "ACTIVE", color: "bg-green-400" },
];

export const TaskCard = ({ createdAt, status, title, id }: TaskCardProps) => {
  //trpc
  const { mutateAsync: deleteTask } = api.task.deleteTask.useMutation();
  const { mutateAsync: completeTask } = api.task.completeTask.useMutation();
  const { mutateAsync: uncompleteTask } = api.task.uncompleteTask.useMutation();
  const { mutateAsync: pauseTask } = api.task.pauseTask.useMutation();
  const { mutateAsync: activeTask } = api.task.activeTask.useMutation();
  const { refetch } = api.task.getTasks.useQuery();

  const handleDeleteTask = async () => {
    await deleteTask({ taskId: id });

    await refetch();
  };

  const handleCompleteTask = async () => {
    await completeTask({ taskId: id });

    await refetch();
  };

  const handleUnCompleteTask = async () => {
    await uncompleteTask({ taskId: id });

    await refetch();
  };

  const handlePauseTask = async () => {
    await pauseTask({ taskId: id });

    await refetch();
  };

  const handleActiveTask = async () => {
    await activeTask({ taskId: id });

    await refetch();
  };

  return (
    <Link href="/">
      <div
        tabIndex={0}
        className={`mb-4 flex h-16 items-center justify-between rounded border border-gray-100  px-5 text-base text-gray-600 transition-all focus:outline-none ${
          status === "DONE"
            ? "cursor-default"
            : "cursor-pointer hover:border-l-2 hover:border-l-blue-800"
        }`}
      >
        <div className="flex items-center">
          <p
            key={title}
            className={`rounded-full ${
              status === "DONE"
                ? "bg-red-400"
                : status === "ACTIVE"
                ? "bg-green-400"
                : "bg-yellow-400"
            } p-2 text-center text-xs leading-none text-white `}
          >
            {status}
          </p>
        </div>
        <div>
          <div className="flex items-center">
            <p
              className={`mr-2  font-medium leading-none text-gray-700 ${
                status === "DONE" ? "line-through" : ""
              }`}
            >
              {title}
            </p>
          </div>
        </div>

        <div>
          <div className="flex items-center">
            <p className="ml-2 text-sm leading-none text-gray-600">
              {createdAt.toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {status === "DONE" ? (
            <>
              <button
                onClick={handleUnCompleteTask}
                className="flex items-center gap-3  rounded-full border p-2 text-gray-600 transition-all hover:bg-green-500 hover:text-white"
              >
                <FiEdit size={20} />
              </button>
            </>
          ) : status === "BLOCKED" ? (
            <>
              <button
                onClick={handleActiveTask}
                className="flex items-center gap-3  rounded-full border p-2 text-gray-600 transition-all hover:bg-green-500 hover:text-white"
              >
                <FiPlay size={20} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleCompleteTask}
                className="flex items-center gap-3  rounded-full border p-2 text-gray-600 transition-all hover:bg-green-500 hover:text-white"
              >
                <FiCheck size={20} />
              </button>
              <button
                onClick={handlePauseTask}
                className="flex items-center gap-3  rounded-full border p-2 text-gray-600 transition-all hover:bg-green-500 hover:text-white"
              >
                <FiPause size={20} />
              </button>
            </>
          )}
          <button
            onClick={handleDeleteTask}
            className="flex items-center gap-3  rounded-full border p-2 text-gray-600 transition-all hover:bg-red-500 hover:text-white"
          >
            <FiTrash size={20} />
          </button>
        </div>
      </div>
    </Link>
  );
};
