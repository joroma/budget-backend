import { int, real, sqliteTable } from 'drizzle-orm/sqlite-core';
import { categoryGroup } from './category-group';
import { account } from './account';

export const transaction = sqliteTable('transaction', {
  id: int().notNull().primaryKey({ autoIncrement: true }),
  transactionDate: int({ mode: 'timestamp' }).notNull(),
  outFlow: real().notNull().default(0),
  inFlow: real().notNull().default(0),
  categoryGroupId: int()
    .notNull()
    .references(() => categoryGroup.id),
  accountId: int()
    .notNull()
    .references(() => account.id),
});
