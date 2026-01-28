import { getDb, saveDb } from '@/lib/local-db';

export async function GET() {
    try {
        const db = getDb();
        return Response.json({
            orders: db.orders || [],
            totalRevenue: (db.orders || []).reduce((sum: number, o: any) => o.status === 'completed' ? sum + o.amount : sum, 0),
            totalSales: (db.orders || []).filter((o: any) => o.status === 'completed').length
        });
    } catch (error) {
        return Response.json({ error: 'Failed' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();
        const db = getDb();
        db.orders = db.orders.filter((o: any) => o.id !== id);
        saveDb(db);
        return Response.json({ success: true });
    } catch (error) {
        return Response.json({ error: 'Failed to delete' }, { status: 500 });
    }
}
