import { getDb, saveDb } from '@/lib/local-db';

export async function GET() {
  try {
    const db = getDb();
    return Response.json(db.products);
  } catch (error) {
    return Response.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = getDb();

    if (body.id) {
      db.products = db.products.map((p: any) => p.id === body.id ? { ...p, ...body } : p);
    } else {
      const newProduct = { ...body, id: `prod-${Date.now()}` };
      db.products.push(newProduct);
    }

    saveDb(db);
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: 'Failed to save' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const db = getDb();
    db.products = db.products.filter((p: any) => p.id !== id);
    saveDb(db);
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
