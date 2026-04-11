import { z } from 'zod';

export const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  status: z.enum(["start", "in-progress", "completed"]).optional().default("start"),
  clientId: z.number().int().positive()
});
