import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import connectToDB from '@/lib/db';
import User from '@/models/User';

export async function POST(req) {
    try {
        const { name, email, password } = await req.json();

        if (!name || !email || !password) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
        }

        await connectToDB();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });

        return NextResponse.json({ message: 'User created', user }, { status: 201 });
    } catch (err) {
        console.error('Signup error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}