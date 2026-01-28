import { Pool } from '@neondatabase/serverless';

// Super-safe initialization for Cloudflare build phase
const dbUrl = process.env.DATABASE_URL;
const isDbConfigured = typeof dbUrl === 'string' && dbUrl.startsWith('postgres');

export const pool = isDbConfigured
  ? new Pool({ connectionString: dbUrl })
  : null;

export async function query(text: string, params?: unknown[]) {
  if (!pool) {
    console.error('Database connection failed: DATABASE_URL is missing or invalid.');
    throw new Error('Database not configured');
  }

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
  if (!pool) throw new Error('Database not configured');
  return await pool.connect();
}
