import { z } from 'zod';
import { leadSchema } from './validator';

export type LeadInput = z.infer<typeof leadSchema>;

export interface LeadUpdateInput {
  status: "new" | "contacted" | "converted" | "dead";
}
