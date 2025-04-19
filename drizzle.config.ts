import env from './src/providers/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schemas/index.ts',
  dialect: 'sqlite',
  dbCredentials: { url: env.DB_FILE_NAME },
  casing: 'snake_case',
});
