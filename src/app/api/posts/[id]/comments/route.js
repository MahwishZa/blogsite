import { NextResponse } from 'next/server';
import connectToDB from '@/lib/db';
import Comment from '@/models/Comment';
import Post from '@/models/Post';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(_req, { params }) {
  const { id } = params;
  await connectToDB();
  const comments = await Comment.find({ post: id }).populate('author').sort({ createdAt: -1 });
  return NextResponse.json(
    comments.map((c) => ({
      _id: c._id.toString(),
      userName: c.author?.name || 'Unknown',
      userId: c.author?._id?.toString?.() || null,
      message: c.message,
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
    }))
  );
}

export async function POST(req, { params }) {
  const { id } = params;
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { message } = await req.json();
  if (!message || !message.trim()) {
    return NextResponse.json({ error: 'Message required' }, { status: 400 });
  }
  await connectToDB();
  const post = await Post.findById(id);
  if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 });

  const comment = await Comment.create({ post: id, author: session.user.id, message });
  return NextResponse.json({
    _id: comment._id.toString(),
    userName: session.user.name,
    userId: session.user.id,
    message: comment.message,
    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt,
  }, { status: 201 });
}


