import { query } from '@/lib/db';

export const runtime = 'edge';

export async function GET() {
  try {
    // Try to fetch from Postgres first
    const result = await query('SELECT * FROM products WHERE is_active = true');

    if (result.rows.length > 0) {
      // Map SQL rows back to the frontend format if needed
      return Response.json(result.rows.map(p => ({
        ...p,
        tiers: typeof p.tiers === 'string' ? JSON.parse(p.tiers) : p.tiers,
        features: typeof p.features === 'string' ? JSON.parse(p.features) : p.features
      })));
    }

    // Fallback or empty
    return Response.json([]);
  } catch (error) {
    console.error('API error:', error);
    return Response.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
