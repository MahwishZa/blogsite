import { NextResponse } from 'next/server';
import connectToDB from '@/lib/db';
import Post from '@/models/Post';
import User from '@/models/User';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

function mapPost(post) {
  const defaultBio = "This is a dummy sentence to check CRUD operations.";
  return {
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
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const mine = searchParams.get('mine');
  const category = searchParams.get('category');
  await connectToDB();
  const session = await getServerSession(authOptions);

  const query = {};
  if (category) query.category = category;
  if (mine) {
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    query.author = session.user.id;
  }

  const posts = await Post.find(query).populate('author').sort({ createdAt: -1 });
  return NextResponse.json(posts.map(mapPost));
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { title, content, category, readTime, coverImage, excerpt } = body;
  if (!title || !content) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  await connectToDB();
  const post = await Post.create({
    author: session.user.id,
    title,
    content,
    category,
    readTime,
    coverImage,
    excerpt,
  });
  await post.populate('author');
  return NextResponse.json(mapPost(post), { status: 201 });
}

