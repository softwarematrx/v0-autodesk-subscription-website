import { writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Save to public/images
        const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
        const uploadPath = path.join(process.cwd(), 'public', 'images', filename);

        await writeFile(uploadPath, buffer);
        const publicUrl = `/images/${filename}`;

        return NextResponse.json({ success: true, url: publicUrl });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
