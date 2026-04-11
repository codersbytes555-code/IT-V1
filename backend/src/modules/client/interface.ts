import { z } from 'zod';
import { clientSchema } from './validator';

export type ClientInput = z.infer<typeof clientSchema>;
