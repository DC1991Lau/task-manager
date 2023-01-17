/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  createTaskSchema,
  getSingleTaskSchema,
  updateTaskSchema,
  deleteTaskSchema,
  completeTaskSchema,
  toggleTaskStatusSchema,
  getTaskByStatusSchema,
} from "../../../schema/task";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const taskRouter = createTRPCRouter({
  createTask: protectedProcedure
    .input(createTaskSchema)
    .mutation(async ({ ctx, input }) => {
      const task = await ctx.prisma.task.create({
        data: {
          ...input,
          authorId: ctx.session?.user?.id,
        },
      });
      return task;
    }),
  getTasks: protectedProcedure.query(async ({ ctx }) => {
    const response = await ctx.prisma.task.findMany({
      where: {
        authorId: ctx.session?.user?.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return response;
  }),

  getSingleTask: protectedProcedure
    .input(getSingleTaskSchema)
    .query(({ ctx, input }) => {
      return ctx.prisma.task.findUnique({
        where: {
          id: input.taskId,
        },
      });
    }),
  updateTask: protectedProcedure
    .input(updateTaskSchema)
    .mutation(async ({ ctx, input }) => {
      const task = await ctx.prisma.task.update({
        where: {
          id: input.taskId,
        },
        data: {
          title: input.title,
        },
      });
      return task;
    }),
  completeTask: protectedProcedure
    .input(completeTaskSchema)
    .mutation(async ({ ctx, input }) => {
      const task = await ctx.prisma.task.update({
        where: {
          id: input.taskId,
        },
        data: {
          status: "DONE",
        },
      });
      return task;
    }),
  uncompleteTask: protectedProcedure
    .input(completeTaskSchema)
    .mutation(async ({ ctx, input }) => {
      const task = await ctx.prisma.task.update({
        where: {
          id: input.taskId,
        },
        data: {
          status: "ACTIVE",
        },
      });
      return task;
    }),
  pauseTask: protectedProcedure
    .input(toggleTaskStatusSchema)
    .mutation(async ({ ctx, input }) => {
      const task = await ctx.prisma.task.update({
        where: {
          id: input.taskId,
        },
        data: {
          status: "BLOCKED",
        },
      });
      return task;
    }),
  activeTask: protectedProcedure
    .input(toggleTaskStatusSchema)
    .mutation(async ({ ctx, input }) => {
      const task = await ctx.prisma.task.update({
        where: {
          id: input.taskId,
        },
        data: {
          status: "ACTIVE",
        },
      });
      return task;
    }),
  deleteTask: protectedProcedure
    .input(deleteTaskSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.task.delete({
        where: {
          id: input.taskId,
        },
      });
    }),
});
