import { query } from '@/lib/db';

export const runtime = 'edge';

export async function GET() {
    try {
        const result = await query("SELECT value FROM settings WHERE key = 'store_settings'");
        if (result.rows.length > 0) {
            return Response.json(result.rows[0].value);
        }
        return Response.json({});
    } catch (error) {
        return Response.json({ error: 'Failed' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Use UPSERT (On Conflict Update)
        await query(
            `INSERT INTO settings (key, value, updated_at) 
             VALUES ('store_settings', $1, NOW())
             ON CONFLICT (key) DO UPDATE SET 
             value = EXCLUDED.value, 
             updated_at = NOW()`,
            [JSON.stringify(body)]
        );

        return Response.json({ success: true, settings: body });
    } catch (error) {
        console.error('Settings save error:', error);
        return Response.json({ error: 'Failed' }, { status: 500 });
    }
}
