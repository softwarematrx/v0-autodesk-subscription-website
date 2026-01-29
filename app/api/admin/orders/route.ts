import { query } from '@/lib/db';

export const runtime = 'edge';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, status = 'processing' } = body;

        const id = body.id || `ORD-${Date.now().toString().slice(-6)}`;

        let productName = '';
        let amount = 0;

        if (body.items && Array.isArray(body.items)) {
            productName = body.items.map((i: any) => i.name).join(', ');
            amount = body.items.reduce((sum: number, i: any) => sum + (Number(i.price) * Number(i.quantity)), 0);
        } else if (body.product) {
            productName = body.product;
            amount = Number(body.amount) || 0;
        }

        // Format date as YYYY-MM-DD HH:MM:SS for SQLite matching CURRENT_TIMESTAMP
        const now = new Date();
        const pad = (n: number) => n.toString().padStart(2, '0');
        const formattedDate = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

        await query(
            `INSERT INTO orders (id, email, product, amount, status, date)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [id, email, productName, amount, status, formattedDate]
        );

        return Response.json({ success: true, orderId: id, date: formattedDate });
    } catch (error) {
        console.error('Order log error:', error);
        return Response.json({ error: 'Failed to log order' }, { status: 500 });
    }
}
