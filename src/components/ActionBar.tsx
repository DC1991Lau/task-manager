import type { Task } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { FiSliders } from "react-icons/fi";
import { api } from "../utils/api";

export const ActionBar = () => {
  const { data: session } = useSession();

  //trpc
  const { mutateAsync: createTask } = api.task.createTask.useMutation();
  const { refetch } = api.task.getTasks.useQuery();

  const handleCreateTask = async () => {
    await createTask({
      authorId: session?.user?.id,
      title: "A minha primeira tarefa",
    });

    await refetch();
  };

  return (
    <div className="items-center justify-between sm:flex">
      <div className="flex items-center">
        <Link href="/">
          <div className="rounded-full focus:bg-indigo-50 focus:outline-none ">
            <div className="rounded-full bg-blue-800 py-2 px-8 text-white hover:bg-blue-100 hover:text-blue-700 ">
              <p>All</p>
            </div>
          </div>
        </Link>
        <Link href="/">
          <div className="ml-4 rounded-full focus:bg-indigo-50 focus:outline-none sm:ml-8">
            <div className="rounded-full py-2 px-8 text-gray-600 hover:bg-blue-100 hover:text-blue-700 ">
              <p>Active</p>
            </div>
          </div>
        </Link>
        <Link href="/">
          <div className="ml-4 rounded-full focus:bg-indigo-50 focus:outline-none sm:ml-8">
            <div className="rounded-full py-2 px-8 text-gray-600 hover:bg-blue-100 hover:text-blue-700 ">
              <p>Done</p>
            </div>
          </div>
        </Link>
        <Link href="/">
          <div className="ml-4 rounded-full focus:bg-indigo-50 focus:outline-none sm:ml-8">
            <div className="rounded-full py-2 px-8 text-gray-600 hover:bg-blue-100 hover:text-blue-700 ">
              <p>Pending</p>
            </div>
          </div>
        </Link>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={handleCreateTask}
          className="mt-4 inline-flex items-start justify-start rounded bg-blue-800 px-6 py-3 hover:bg-blue-700 focus:outline-none sm:mt-0"
        >
          <p className="text-sm font-medium leading-none text-white">
            Add Task
          </p>
        </button>
        <button className="mt-4 inline-flex items-start justify-start gap-3 rounded bg-slate-800 px-6 py-3 text-white hover:bg-slate-700 focus:outline-none sm:mt-0">
          <p className="text-sm font-medium leading-none ">Filter</p>
          <FiSliders />
        </button>
      </div>
    </div>
  );
};
