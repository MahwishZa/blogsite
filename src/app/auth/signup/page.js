'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useToast } from '@/components/ToastProvider';

export default function SignupPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();
  const toast = useToast();
  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error);
      toast.add('Signup failed', 'error');
    } else {
      toast.add('Signup successful', 'success');
      router.push('/dashboard');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="box px-8 py-10 rounded leading-relaxed card-fade-in">
        <h2 className="font-black text-5xl text-white text-center mb-4">
          Sign Up
        </h2>
        <p className="text-center mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className=" w-full p-3 rounded text-black" />
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className=" w-full p-3 rounded text-black" />
          <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} className=" w-full p-3 rounded text-black" />
          <button type="submit" className="btn-dark font-semibold px-6 py-3 rounded">Sign Up</button>
        </form>
        <Link href="/auth/signin" className="block text-center mt-8 text-sm text-white hover:underline">
          Already have an account? Sign in
        </Link>
      </div>
    </div>
  );
}
