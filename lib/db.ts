// @ts-ignore
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

export async function getDb(): Promise<D1Database | null> {
  try {
    // @ts-ignore
    const env = getRequestContext()?.env;
    if (env && env.DB) {
      return env.DB;
    }
  } catch (e) {
    console.warn('getRequestContext failed, falling back to process.env (local/build phase)');
  }

  // Fallback for environment variables or missing context
  // @ts-ignore
  return (process.env.DB as any) || null;
}

export async function query(sql: string, params: any[] = []) {
  const db = await getDb();

  if (!db) {
    console.error('Database connection failed: D1 binding "DB" is missing.');
    // Keep it functional during build/dev if possible
    return { rows: [], rowCount: 0 };
  }

  try {
    // Map $1, $2 to D1 style or just use them if D1 supports ?
    // D1 uses ? for parameters, but we can try to sanitize or just use the prepare API
    // If the app uses $1, $2, we should probably map them to ?
    const normalizedSql = sql.replace(/\$\d+/g, '?');

    const statement = db.prepare(normalizedSql);
    const result = await (params.length > 0 ? statement.bind(...params) : statement).all();

    return {
      rows: result.results || [],
      rowCount: result.results?.length || 0,
      meta: result.meta
    };
  } catch (error) {
    console.error('[D1] Database error:', error);
    throw error;
  }
}
