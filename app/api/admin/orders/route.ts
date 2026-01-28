import { getDb, saveDb } from '@/lib/local-db';

export async function POST(request: Request) {
    try {
        const { items, email, status = 'processing' } = await request.json();
        const db = getDb();

        // Create a new order log entry
        const newOrder = {
            id: `ORD-${Date.now().toString().slice(-6)}`,
            email: email,
            product: items.map((i: any) => i.name).join(', '),
            amount: items.reduce((sum: number, i: any) => sum + (i.price * i.quantity), 0),
            status: status, // e.g., 'processing', 'whop_redirect'
            date: new Date().toLocaleString()
        };

        if (!db.orders) db.orders = [];
        db.orders.unshift(newOrder); // Add to beginning

        saveDb(db);

        return Response.json({ success: true, orderId: newOrder.id });
    } catch (error) {
        return Response.json({ error: 'Failed to log order' }, { status: 500 });
    }
}
