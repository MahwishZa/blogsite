import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import connectToDB from '@/lib/db';
import User from '@/models/User';

export async function GET(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await connectToDB();
  const user = await User.findById(token.id).select('name email about');
  return NextResponse.json({ name: user.name, email: user.email, about: user.about || '' });
}

export async function PATCH(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { about } = await req.json();
  await connectToDB();
  const updated = await User.findByIdAndUpdate(
    token.id,
    { about: about || '' },
    { new: true }
  ).select('name email about');
  return NextResponse.json({ name: updated.name, email: updated.email, about: updated.about || '' });
}


