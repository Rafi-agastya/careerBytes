const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

pool
  .connect()
  .then(() => console.log('Database Connected'))
  .catch((err: Error) => console.error('Database Connection error: ', err));
export default pool;
