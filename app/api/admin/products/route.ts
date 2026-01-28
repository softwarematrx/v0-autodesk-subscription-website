import { query } from '@/lib/db';

export async function GET() {
  try {
    const result = await query('SELECT * FROM products ORDER BY created_at DESC');
    return Response.json(result.rows.map(p => ({
      ...p,
      fullDescription: p.full_description,
      originalPrice: p.original_price,
      tiers: typeof p.tiers === 'string' ? JSON.parse(p.tiers) : p.tiers,
      features: typeof p.features === 'string' ? JSON.parse(p.features) : p.features
    })));
  } catch (error) {
    return Response.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (body.id) {
      // Update
      await query(
        `UPDATE products SET 
         name = $1, description = $2, full_description = $3, image = $4, status = $5, 
         tiers = $6, features = $7, price = $8, original_price = $9
         WHERE id = $10`,
        [
          body.name, body.description, body.fullDescription, body.image, body.status,
          JSON.stringify(body.tiers), JSON.stringify(body.features), body.price, body.originalPrice,
          body.id
        ]
      );
    } else {
      // Insert
      const id = `prod-${Date.now()}`;
      await query(
        `INSERT INTO products (id, name, description, full_description, image, status, tiers, features, price, original_price)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [
          id, body.name, body.description, body.fullDescription, body.image, body.status || 'active',
          JSON.stringify(body.tiers), JSON.stringify(body.features), body.price || 0, body.originalPrice || 0
        ]
      );
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error('Save error:', error);
    return Response.json({ error: 'Failed to save' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await query('DELETE FROM products WHERE id = $1', [id]);
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
