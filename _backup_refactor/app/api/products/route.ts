import { Pool } from '@neondatabase/serverless';

const MOCK_PRODUCTS = [
  {
    id: 'autocad',
    name: 'AutoCAD 2026',
    description: 'Professional 2D/3D design and drafting software',
    icon: '📐',
    pricing: [
      { duration: '1 Month', price: 50 },
      { duration: '3 Months', price: 140 },
      { duration: '12 Months', price: 480 }
    ]
  },
  {
    id: 'revit',
    name: 'Revit 2026',
    description: 'Building Information Modeling for architecture',
    icon: '🏗️',
    pricing: [
      { duration: '1 Month', price: 55 },
      { duration: '3 Months', price: 155 },
      { duration: '12 Months', price: 540 }
    ]
  },
  {
    id: 'fusion360',
    name: 'Fusion 360',
    description: 'Cloud-based CAD/CAM for design and manufacturing',
    icon: '⚙️',
    pricing: [
      { duration: '1 Month', price: 45 },
      { duration: '3 Months', price: 125 },
      { duration: '12 Months', price: 420 }
    ]
  }
];

export async function GET() {
  if (!process.env.DATABASE_URL) {
    console.warn('DATABASE_URL not set, returning mock products');
    return Response.json(MOCK_PRODUCTS);
  }

  try {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
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
    console.error('Database connection failed, falling back to mock products:', error);
    return Response.json(MOCK_PRODUCTS);
  }
}
