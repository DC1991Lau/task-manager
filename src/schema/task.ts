import z from "zod";

export const createTaskSchema = z.object({
  title: z.string(),
});

export type CreateTaskInput = z.TypeOf<typeof createTaskSchema>;

export const updateTaskSchema = z.object({
  taskId: z.string().cuid(),
  title: z.string(),
});

export const completeTaskSchema = z.object({
  taskId: z.string().cuid(),
});

export const toggleTaskStatusSchema = z.object({
  taskId: z.string().cuid(),
});

export type updateTaskInput = z.TypeOf<typeof updateTaskSchema>;

export const getSingleTaskSchema = z.object({
  taskId: z.string().cuid(),
});

export const getTaskByStatusSchema = z.object({
  status: z.enum(["ACTIVE", "BLOCKED", "DONE", "ARCHIVED"]).optional(),
});

export const deleteTaskSchema = z.object({
  taskId: z.string().cuid(),
});
