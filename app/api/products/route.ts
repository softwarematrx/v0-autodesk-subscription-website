import { Pool } from '@neondatabase/serverless';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query(`
      SELECT p.*, json_agg(json_build_object('duration', pt.duration, 'price', pt.price)) as pricing
      FROM products p
      LEFT JOIN product_tiers pt ON p.id = pt.product_id
      GROUP BY p.id
      ORDER BY p.name
    `);
    client.release();
    return Response.json(result.rows);
  } catch (error) {
    console.error('Database error:', error);
    return Response.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
