import { query } from '@/lib/db';

export const runtime = 'edge';

export async function GET() {
  try {
    const result = await query('SELECT * FROM products WHERE status = ?', ['active']);

    return Response.json(result.rows.map(p => ({
      ...p,
      tiers: typeof p.tiers === 'string' ? JSON.parse(p.tiers) : (p.tiers || []),
      features: typeof p.features === 'string' ? JSON.parse(p.features) : (p.features || [])
    })));
  } catch (error) {
    console.error('API error:', error);
    return Response.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
