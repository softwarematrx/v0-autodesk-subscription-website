import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
    try {
        // NOTE: Local file upload is NOT supported on Cloudflare Pages.
        // You should migrate this to use Cloudflare R2 or another cloud storage provider.
        return NextResponse.json({
            error: 'Image upload is not supported in the cloud environment. Please use external image URLs.'
        }, { status: 400 });
    } catch (error) {
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
