import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { createErrorResponse, createSuccessResponse } from '@/lib/api-helpers';

export async function GET(req: NextRequest) {
  try {
    const result = await query(`
      SELECT p.*, json_agg(
        json_build_object(
          'id', pr.id,
          'plan_type', pr.plan_type,
          'price', pr.price,
          'discount_percentage', pr.discount_percentage
        )
      ) as pricing
      FROM products p
      LEFT JOIN pricing pr ON p.id = pr.product_id
      GROUP BY p.id
      ORDER BY p.created_at DESC
    `);

    return createSuccessResponse(result.rows);
  } catch (error) {
    console.error('[v0] Error fetching products:', error);
    return createErrorResponse(500, 'Failed to fetch products');
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, description, image_url, category, pricing } = await req.json();

    const productResult = await query(
      `INSERT INTO products (name, description, image_url, category)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, description, image_url, category],
    );

    const product = productResult.rows[0];

    if (pricing && Array.isArray(pricing)) {
      for (const price of pricing) {
        await query(
          `INSERT INTO pricing (product_id, plan_type, price, discount_percentage)
           VALUES ($1, $2, $3, $4)`,
          [product.id, price.plan_type, price.price, price.discount_percentage || 0],
        );
      }
    }

    return createSuccessResponse(product, 201);
  } catch (error) {
    console.error('[v0] Error creating product:', error);
    return createErrorResponse(500, 'Failed to create product');
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, name, description, image_url, category } = await req.json();

    const result = await query(
      `UPDATE products
       SET name = $1, description = $2, image_url = $3, category = $4
       WHERE id = $5 RETURNING *`,
      [name, description, image_url, category, id],
    );

    if (result.rows.length === 0) {
      return createErrorResponse(404, 'Product not found');
    }

    return createSuccessResponse(result.rows[0]);
  } catch (error) {
    console.error('[v0] Error updating product:', error);
    return createErrorResponse(500, 'Failed to update product');
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return createErrorResponse(400, 'Product ID is required');
    }

    const result = await query(`DELETE FROM products WHERE id = $1 RETURNING *`, [id]);

    if (result.rows.length === 0) {
      return createErrorResponse(404, 'Product not found');
    }

    return createSuccessResponse({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('[v0] Error deleting product:', error);
    return createErrorResponse(500, 'Failed to delete product');
  }
}
