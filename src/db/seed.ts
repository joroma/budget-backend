import { account, category, categoryGroup, transaction } from '@/db/schemas';
import { db } from '../providers/db-config';
import { logger } from '../utils/logger';

async function main() {
  logger.warn('Erasing all data in preparation for initial seed');
  await Promise.all([
    db.delete(categoryGroup),
    db.delete(account),
    db.delete(category),
    db.delete(transaction),
  ]);

  const defaultGroups: (typeof categoryGroup.$inferInsert)[] = [
    {
      id: 1,
      name: 'System',
    },

    {
      id: 2,
      name: 'Expenses',
    },
    {
      id: 3,
      name: 'Monthly Bills',
    },
    {
      id: 4,
      name: 'Subscription',
    },
    {
      id: 5,
      name: 'Yearly Funds',
    },
    {
      id: 6,
      name: 'Long-term Funds',
    },
    {
      id: 7,
      name: 'Giving',
    },
  ];

  const defaultCategories: (typeof category.$inferInsert)[] = [
    {
      categoryGroupId: 1,
      name: 'Balance Adjustment',
    },
    {
      categoryGroupId: 1,
      name: 'Account Transfer',
    },
    {
      categoryGroupId: 2,
      name: 'Dining Out',
    },
    {
      categoryGroupId: 2,
      name: 'Groceries',
    },
    {
      categoryGroupId: 2,
      name: 'Laundry',
    },
    {
      categoryGroupId: 2,
      name: 'Everything Else',
    },
    {
      categoryGroupId: 2,
      name: 'Fun Money',
    },
    {
      categoryGroupId: 2,
      name: 'Toiletries / Supplies',
    },
    {
      categoryGroupId: 2,
      name: 'Hidden Charges',
    },
    {
      categoryGroupId: 2,
      name: 'Vices',
    },
    {
      categoryGroupId: 2,
      name: 'Vanity / Grooming',
    },

    {
      categoryGroupId: 2,
      name: 'Pet Expenses (Food, grooming, vet)',
    },
  ];

  const defaultAccounts: (typeof account.$inferInsert)[] = [
    {
      name: 'Checking Account',
    },
    {
      name: 'Cash',
    },
    {
      name: 'Payroll Account',
    },
    {
      name: 'Emergency Cash',
    },
    {
      name: 'Savings Account',
    },
  ];

  logger.info('Seeding category groups, categories, accounts');
  await Promise.all([
    db.insert(categoryGroup).values(defaultGroups),
    db.insert(category).values(defaultCategories),
    db.insert(account).values(defaultAccounts),
  ]);
  logger.info('Finished seeding');
  const [groups, categories, accounts] = await Promise.all([
    await db.select().from(categoryGroup),
    await db.select().from(category),
    await db.select().from(account),
  ]);

  logger.info('Category Groups', groups);
  logger.info('Categories', categories);
  logger.info('Accounts', accounts);
}

main();
