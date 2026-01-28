import { query } from '@/lib/db';

export const runtime = 'edge';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const id = `msg-${Date.now()}`;
        await query(
            `INSERT INTO messages (id, name, email, subject, message, status, date)
             VALUES ($1, $2, $3, $4, $5, 'unread', NOW())`,
            [id, body.name, body.email, body.subject, body.message]
        );

        return Response.json({ success: true });
    } catch (error) {
        console.error('Contact error:', error);
        return Response.json({ error: 'Failed' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const result = await query('SELECT * FROM messages ORDER BY date DESC');
        return Response.json(result.rows);
    } catch (error) {
        return Response.json({ error: 'Failed' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();
        await query('DELETE FROM messages WHERE id = $1', [id]);
        return Response.json({ success: true });
    } catch (error) {
        return Response.json({ error: 'Failed' }, { status: 500 });
    }
}
