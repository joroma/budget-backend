import env from './config';
import { drizzle } from 'drizzle-orm/libsql/node';

export const db = drizzle({
  connection: env.DB_FILE_NAME,
  casing: 'snake_case',
});
