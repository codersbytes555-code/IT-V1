import { z } from 'zod';
import { requirementSchema } from './validator';

export type RequirementInput = z.infer<typeof requirementSchema>;
