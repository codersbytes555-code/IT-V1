import { z } from 'zod';
import { projectSchema } from './validator';

export type ProjectInput = z.infer<typeof projectSchema>;
