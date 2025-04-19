import { int, text, real, sqliteTable } from 'drizzle-orm/sqlite-core';
import { categoryGroup } from '@/db/schemas/category-group';
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from 'drizzle-zod';
import { z } from 'zod';

export const category = sqliteTable('category', {
  id: int().primaryKey({ autoIncrement: true }),
  categoryGroupId: int('category_group_id')
    .notNull()
    .references(() => categoryGroup.id, {
      onDelete: 'cascade',
    }),
  name: text().notNull().unique(),
  monthlyAmount: real().notNull().default(0),
  goalAMount: real(),
});

const test = createInsertSchema(category);

export const createAccountSchema = test.omit({ id: true });
export const updateAccountSchema = createUpdateSchema(category);
export const categorySchema = createSelectSchema(category);

export type CreateAccountSchema = z.infer<typeof createAccountSchema>;
export type UpdateAccountSchema = z.infer<typeof updateAccountSchema>;
export type CategorySchema = z.infer<typeof categorySchema>;
