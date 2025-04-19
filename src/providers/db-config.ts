import env from './config';
import { drizzle } from 'drizzle-orm/libsql/node';
import * as schema from '@/db/schemas';

export const db = drizzle({
  connection: env.DB_FILE_NAME,
  casing: 'snake_case',
  schema,
});
