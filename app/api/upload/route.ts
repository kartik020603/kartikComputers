import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const files = data.getAll('files') as File[];
    
    if (files.length === 0) return NextResponse.json({ error: 'No files uploaded' }, { status: 400 });

    const fileUrls = [];

    for (const file of files) {
      // Upload to Vercel Blob
      const blob = await put(file.name, file, {
        access: 'public',
      });
      fileUrls.push(blob.url);
    }

    return NextResponse.json({ urls: fileUrls }, { status: 201 });
  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json({ error: 'Upload failed: Make sure BLOB_READ_WRITE_TOKEN is set in Vercel' }, { status: 500 });
  }
}
