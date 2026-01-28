import { query } from '@/lib/db';

export const runtime = 'edge';

export async function GET() {
    try {
        const result = await query('SELECT * FROM orders ORDER BY date DESC');
        const orders = result.rows;

        return Response.json({
            orders: orders,
            totalRevenue: orders.reduce((sum: number, o: any) => o.status === 'completed' ? sum + Number(o.amount || 0) : sum, 0),
            totalSales: orders.filter((o: any) => o.status === 'completed').length
        });
    } catch (error) {
        return Response.json({ error: 'Failed' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();
        await query('DELETE FROM orders WHERE id = ?', [id]);
        return Response.json({ success: true });
    } catch (error) {
        return Response.json({ error: 'Failed to delete' }, { status: 500 });
    }
}
