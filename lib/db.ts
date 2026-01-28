import { Pool } from '@neondatabase/serverless';

export const pool = process.env.DATABASE_URL
  ? new Pool({ connectionString: process.env.DATABASE_URL })
  : null;

export async function query(text: string, params?: unknown[]) {
  const start = Date.now();
  if (!pool) throw new Error('Database pool is not initialized');
  try {
    const result = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('[v0] Query executed:', { text, duration, rows: result.rowCount });
    return result;
  } catch (error) {
    console.error('[v0] Database error:', error);
    throw error;
  }
}

export async function getConnection() {
  if (!pool) throw new Error('Database pool is not initialized');
  return await pool.connect();
}
