import { query } from '@/lib/db';

export const runtime = 'edge';

export async function POST(request: Request) {
    try {
        const { items, email, status = 'processing' } = await request.json();

        const id = `ORD-${Date.now().toString().slice(-6)}`;
        const productName = items.map((i: any) => i.name).join(', ');
        const amount = items.reduce((sum: number, i: any) => sum + (Number(i.price) * Number(i.quantity)), 0);

        await query(
            `INSERT INTO orders (id, email, product, amount, status, date)
       VALUES ($1, $2, $3, $4, $5, NOW())`,
            [id, email, productName, amount, status]
        );

        return Response.json({ success: true, orderId: id });
    } catch (error) {
        console.error('Order log error:', error);
        return Response.json({ error: 'Failed to log order' }, { status: 500 });
    }
}
