import 'server-only';

import postgres from 'postgres';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('Missing DATABASE_URL environment variable for Neon/Postgres connection');
}

export const sql = postgres(databaseUrl, {
  max: 10,
  ssl: 'require',
});
