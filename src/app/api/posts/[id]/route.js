import { NextResponse } from 'next/server';
import connectToDB from '@/lib/db';
import Post from '@/models/Post';
import User from '@/models/User';
import Comment from '@/models/Comment';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

function mapPost(post, withComments = false) {
  const defaultBio = "This is a dummy sentence to check CRUD operations.";
  const base = {
    id: post._id.toString(),
    title: post.title,
    content: post.content,
    category: post.category || null,
    readTime: post.readTime || 5,
    coverImage: post.coverImage || '/img1.jpg',
    excerpt: post.excerpt || post.content?.slice(0, 140) || '',
    date: new Date(post.createdAt).toLocaleDateString(),
    authorName: post.author?.name || 'Unknown',
    authorAbout: post.author?.about || defaultBio,
    authorId: post.author?._id?.toString?.() || null,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
  };
  if (withComments && post.comments) {
    base.comments = post.comments.map((c) => ({
      _id: c._id.toString(),
      userName: c.author?.name || 'Unknown',
      userId: c.author?._id?.toString?.() || null,
      message: c.message,
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
    }));
  }
  return base;
}

export async function GET(_req, { params }) {
  const { id } = params;
  await connectToDB();
  const post = await Post.findById(id).populate('author');
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(mapPost(post));
}

export async function PATCH(req, { params }) {
  const { id } = params;
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await connectToDB();
  const existing = await Post.findById(id);
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  if (existing.author.toString() !== session.user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const body = await req.json();
  const allowed = ['title', 'content', 'category', 'readTime', 'coverImage', 'excerpt'];
  for (const key of Object.keys(body)) {
    if (allowed.includes(key)) existing[key] = body[key];
  }
  await existing.save();
  await existing.populate('author');
  return NextResponse.json(mapPost(existing));
}

export async function DELETE(_req, { params }) {
  const { id } = params;
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await connectToDB();
  const existing = await Post.findById(id);
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  if (existing.author.toString() !== session.user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  await Comment.deleteMany({ post: id });
  await existing.deleteOne();
  return NextResponse.json({ ok: true });
}


