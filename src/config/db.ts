import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../db/schema';

// dotenv.config() is called globally in src/app.ts.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.connect()
  .then(() => console.log('Database Connected Successfully'))
  .catch((err: Error) => console.error('Database Connection Error: ', err));

export const db = drizzle(pool, { schema });
export default pool;
