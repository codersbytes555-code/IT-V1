import { z } from 'zod';

export const clientSchema = z.object({
  leadId: z.number().int().positive()
});
