import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = import.meta.env.DATABASE_URL || process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('[DB] DATABASE_URL not configured');
}

const client = postgres(connectionString, { max: 10 });
export const db = drizzle(client, { schema });
