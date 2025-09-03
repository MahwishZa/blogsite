import { NextResponse } from 'next/server';
import connectToDB from '@/lib/db';
import Comment from '@/models/Comment';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function PATCH(req, { params }) {
  const { commentid } = params;
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await connectToDB();
  const body = await req.json();
  const comment = await Comment.findById(commentid);
  if (!comment) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  if (comment.author.toString() !== session.user.id) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  comment.message = body.message ?? comment.message;
  await comment.save();
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req, { params }) {
  const { commentid } = params;
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await connectToDB();
  const comment = await Comment.findById(commentid);
  if (!comment) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  if (comment.author.toString() !== session.user.id) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  await comment.deleteOne();
  return NextResponse.json({ ok: true });
}


