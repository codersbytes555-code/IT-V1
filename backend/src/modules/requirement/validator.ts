import { z } from 'zod';

export const requirementSchema = z.object({
  projectTitle: z.string().min(1, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  technologyStack: z.array(z.string()).min(1, "At least one technology is required"),
  specialRequirements: z.string().optional(),
  estimatedDays: z.number().int().positive(),
  targetAudience: z.string().optional(),
  developersRequired: z.number().int().positive(),
  experienceLevel: z.enum(["junior", "mid", "senior"]),
  budget: z.number().positive(),
  paymentType: z.enum(["fixed", "hourly"]),
  hourlyRate: z.number().positive().optional(),
  leadId: z.number().int().positive()
}).refine(data => {
  if (data.paymentType === 'hourly' && !data.hourlyRate) return false;
  return true;
}, { message: "Hourly rate is required for hourly payment type", path: ["hourlyRate"] });
