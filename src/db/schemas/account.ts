import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const account = sqliteTable('account', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull().default(''),
});

export const accountSchema = createSelectSchema(account);
export const createAccountSchema = z.object({
  name: z.string().min(1, 'Account name is required'),
});
export const updateAccountSchema = z.object({
  id: z.coerce.number({ message: 'Id is required' }),
  name: z.string().min(1, 'Account name is required'),
});

export type Account = z.infer<typeof accountSchema>;
export type CreateAccountSchema = z.infer<typeof createAccountSchema>;
export type UpdateAccountSchema = z.infer<typeof updateAccountSchema>;
