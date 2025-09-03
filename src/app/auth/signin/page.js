'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ToastProvider';
import Link from 'next/link';

export default function SigninPage() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const router = useRouter();
    const toast = useToast();
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await signIn('credentials', {
            redirect: false,
            email: form.email,
            password: form.password,
        });
        if (res?.error) {
            setError(res.error);
            toast.add('Sign in failed', 'error');
        } else {
            toast.add('Welcome back!', 'success');
            router.push('/dashboard');
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="box px-8 py-10 rounded leading-relaxed">
                <h2 className="font-black text-5xl text-white text-center mb-4">
                    Sign In
                </h2>
                <p className="text-center mb-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className=" w-full p-3 rounded text-black" />
                    <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} className=" w-full p-3 rounded text-black" />
                    <button type="submit" className="btn-dark font-semibold px-6 py-3 rounded">Sign In</button>
                </form>
                <Link href="/auth/signup" className="block text-center mt-8 text-sm text-white hover:underline">
                    Don&apos;t have an account? Sign up
                </Link>
            </div>
        </div>
    );
}
