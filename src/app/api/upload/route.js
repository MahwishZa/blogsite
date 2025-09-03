import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { createWriteStream } from 'fs';
import { randomBytes } from 'crypto';
import path from 'path';
import { mkdir } from 'fs/promises';

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const contentType = req.headers.get('content-type') || '';
  if (!contentType.includes('multipart/form-data')) {
    return NextResponse.json({ error: 'Expected multipart/form-data' }, { status: 400 });
  }

  const formData = await req.formData();
  const file = formData.get('file');
  if (!file || typeof file === 'string') {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  await mkdir(uploadsDir, { recursive: true });
  const ext = path.extname(file.name || '') || '.jpg';
  const filename = `${Date.now()}-${randomBytes(6).toString('hex')}${ext}`;
  const filepath = path.join(uploadsDir, filename);

  await new Promise((resolve, reject) => {
    const stream = createWriteStream(filepath);
    stream.on('error', reject);
    stream.on('finish', resolve);
    stream.end(buffer);
  });

  const publicUrl = `/uploads/${filename}`;
  return NextResponse.json({ url: publicUrl }, { status: 201 });
}


