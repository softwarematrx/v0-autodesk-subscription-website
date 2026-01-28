import { getDb } from '@/lib/local-db';

export async function GET() {
  try {
    const db = getDb();
    const activeProducts = db.products.filter((p: any) => p.status === 'active');
    return Response.json(activeProducts);
  } catch (error) {
    console.error('API error:', error);
    return Response.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
