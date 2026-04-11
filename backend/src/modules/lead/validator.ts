import { z } from 'zod';

export const leadSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  phone: z.string().optional(),
  source: z.string().min(1, "Source is required"),
  status: z.enum(["new", "contacted", "converted", "dead"]).optional().default("new")
});

export const updateLeadStatusSchema = z.object({
  status: z.enum(["new", "contacted", "converted", "dead"])
});
