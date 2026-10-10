import { drizzle } from 'drizzle-orm/mysql2';
import { sql } from 'drizzle-orm';
import mysql from 'mysql2/promise';
import { env } from '../config/env.ts';
import * as schema from '../db/schema';

export const dbPool = mysql.createPool({
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,

  waitForConnections: true,
  connectionLimit: env.DB_CONNECTION_LIMIT,
  queueLimit: env.DB_QUEUE_LIMIT,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
  timezone: '+00:00',

  /*
  ssl: env.NODE_ENV === 'production' ? {
    rejectUnauthorized: true,
    // ca: fs.readFileSync('/path/to/server-ca.pem').toString(),
  } : undefined,
  */
});

export const db = drizzle(dbPool, { 
  schema, 
  mode: 'default' 
});

export async function testDatabaseConnection() {
  try {
    const connection = await dbPool.getConnection();
    console.log('✅ [Database Pool] Successfully connected to the database pool.');
    connection.release();

    await db.execute(sql`SELECT 1`);
    console.log('✅ [Drizzle ORM] Successfully executed query via Drizzle.');

  } catch (error) {
    console.error('❌ [Database] Connection or Drizzle ORM test failed:', error);
    process.exit(1);
  }
}
// await testDatabaseConnection();

const closePool = async () => {
  console.log('Closing database pool...');
  await dbPool.end();
  console.log('Database pool closed.');
};

process.on('SIGINT', async () => {
  await closePool();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await closePool();
  process.exit(0);
});
