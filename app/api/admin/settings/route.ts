import { getDb, saveDb } from '@/lib/local-db';

export async function GET() {
    try {
        const db = getDb();
        return Response.json(db.settings);
    } catch (error) {
        return Response.json({ error: 'Failed' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const db = getDb();
        db.settings = { ...db.settings, ...body };
        saveDb(db);
        return Response.json({ success: true, settings: db.settings });
    } catch (error) {
        return Response.json({ error: 'Failed' }, { status: 500 });
    }
}
