import { getDb, saveDb } from '@/lib/local-db';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const db = getDb();

        const newMessage = {
            ...body,
            id: `msg-${Date.now()}`,
            date: new Date().toISOString(),
            status: 'unread'
        };

        db.messages = [newMessage, ...(db.messages || [])];
        saveDb(db);

        return Response.json({ success: true });
    } catch (error) {
        return Response.json({ error: 'Failed' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const db = getDb();
        return Response.json(db.messages || []);
    } catch (error) {
        return Response.json({ error: 'Failed' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();
        const db = getDb();
        db.messages = db.messages.filter((m: any) => m.id !== id);
        saveDb(db);
        return Response.json({ success: true });
    } catch (error) {
        return Response.json({ error: 'Failed' }, { status: 500 });
    }
}
