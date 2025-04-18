import { z } from 'zod';

export const createAccountSchema = z.object({
  name: z.string().min(2).max(100),
});

export const updateAccountSchema = z.object({
  name: z.string().min(2).max(100),
});
