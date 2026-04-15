import { z } from "zod";

export const TechStackSchema = z.enum([
  "FRONTEND",
  "BACKEND",
  "DATABASE",
  "TOOLS",
  "DATA_SCIENCE",
  "LIBRARIES",
]);

export const CreateTechSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  category: TechStackSchema,
});

export type CreateTechInput = z.infer<typeof CreateTechSchema>;

export interface Technology {
  id: string;
  name: string;
  category: string;
  createdAt: string;
  isDeleted: boolean;
}
