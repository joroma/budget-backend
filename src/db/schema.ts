import { int, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const category = sqliteTable('category', {
  id: int().primaryKey({ autoIncrement: true }),
  categoryGroupId: int('category_group_id')
    .notNull()
    .references(() => categoryGroup.id, {
      onDelete: 'cascade',
    }),
  name: text().notNull().default(''),
  monthlyAmount: real().notNull().default(0),
  goalAMount: real(),
});

export const categoryGroup = sqliteTable('category_group', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().default(''),
});

export const account = sqliteTable('account', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull().default(''),
});

export const transaction = sqliteTable('transaction', {
  id: int().primaryKey({ autoIncrement: true }),
  transactionDate: int({ mode: 'timestamp' }),
  outFlow: real(),
  inFlow: real(),
  categoryGroupId: int().references(() => categoryGroup.id),
  accountId: int().references(() => account.id),
});
