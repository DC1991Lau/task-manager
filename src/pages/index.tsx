/* eslint-disable @typescript-eslint/no-misused-promises */
import { type NextPage } from "next";
import { useSession } from "next-auth/react";

import { Header } from "../components/Header";
import { SignIn } from "../components/SignIn";

import { ActionBar } from "../components/ActionBar";
import { useState } from "react";
import { api } from "../utils/api";
import { TaskList } from "../components/TaskList";

const Home: NextPage = () => {
  const { data: session } = useSession();

  //trpc
  const { mutateAsync: createTask } = api.task.createTask.useMutation();
  const { data, isLoading, error, refetch } = api.task.getTasks.useQuery();
  if (isLoading) {
    return <p>Loading task list...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  const handleCreateTask = async () => {
    await createTask({
      authorId: session?.user?.id,
      title: "A minha primeira tarefa",
    });
    await refetch();
  };

  if (!session) {
    return <SignIn />;
  }

  return (
    <main className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col bg-slate-50 py-4 text-sm sm:px-8">
      <Header />
      <div className="mt-10 flex-1">
        <div className="bg-white py-4 px-4 md:py-7 md:px-8 xl:px-10">
          <ActionBar handleCreateTask={handleCreateTask} />
          <div className="mt-7 overflow-x-auto">
            <TaskList data={data} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
