import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const files = data.getAll('files') as File[];
    
    if (files.length === 0) return NextResponse.json({ error: 'No files uploaded' }, { status: 400 });

    const uploadDir = join(process.cwd(), 'public', 'uploads');
    
    try { await mkdir(uploadDir, { recursive: true }); } catch (e) {} // Ignore if exists

    const fileUrls = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uniqueName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.\-_]/g, '')}`;
      const filepath = join(uploadDir, uniqueName);
      await writeFile(filepath, buffer);
      fileUrls.push(`/uploads/${uniqueName}`);
    }

    return NextResponse.json({ urls: fileUrls }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
