import { sqliteTable, int, text } from 'drizzle-orm/sqlite-core';
import { createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const categoryGroup = sqliteTable('category_group', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text({ length: 100 }),
});

export const categoryGroupSchema = createSelectSchema(categoryGroup);
export const createCategoryGroupSchema = z.object({
  name: z
    .string()
    .min(1, 'Category group name is required')
    .max(100, 'Name max length is only 100'),
});
export const updateCategoryGroupSchema = z.object({
  name: z
    .string()
    .min(1, 'Category group name is required')
    .max(100, 'Name max length is 100'),
});

export type CategoryGroup = z.infer<typeof categoryGroupSchema>;
export type CreateCategoryGroup = z.infer<typeof createCategoryGroupSchema>;
export type UpdateCategoryGroup = z.infer<typeof updateCategoryGroupSchema>;
