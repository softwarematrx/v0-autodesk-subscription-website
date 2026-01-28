import { Pool } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function query(text: string, params?: unknown[]) {
  const start = Date.now();
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
  return await pool.connect();
}

export { pool };
