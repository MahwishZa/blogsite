'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FiSave, FiTrash2 } from 'react-icons/fi'
import { useToast } from '@/components/ToastProvider'

export default function EditPage() {
    const router = useRouter();
    const { id } = useParams();
    const [form, setForm] = useState(null);
    const [uploading, setUploading] = useState(false)
    const toast = useToast()

    useEffect(() => {
        const load = async () => {
            const res = await fetch(`/api/posts/${id}`);
            if (res.ok) {
                const p = await res.json();
                setForm(p);
            } else {
                alert('Post not found');
                router.push('/dashboard');
            }
        };
        load();
    }, [id, router]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const res = await fetch(`/api/posts/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: form.title,
                category: form.category,
                readTime: form.readTime,
                content: form.content,
                coverImage: form.coverImage,
            })
        });
        if (res.ok) {
            toast.add('Post updated', 'success')
            router.push('/dashboard');
        }
        else if (res.status === 401) {
            toast.add('Please sign in to update the post', 'error')
            router.push('/auth/signin');
        } else {
            toast.add('Failed to update post', 'error')
        }
    };

    const handleDelete = async () => {
        const confirmDelete = confirm('Are you sure you want to delete this post?');
        if (confirmDelete) {
            const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
            if (res.ok) {
                toast.add('Post deleted', 'success')
                router.push('/dashboard');
            }
            else if (res.status === 401) {
                toast.add('Please sign in to delete the post', 'error')
                router.push('/auth/signin');
            } else {
                toast.add('Failed to delete post', 'error')
            }
        }
    };
    if (!form) return null;

    return (
        <section className="max-w-6xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold mb-6">Edit Blog</h1>
            <form onSubmit={handleUpdate} className="space-y-4">
                <input
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Title"
                    className="w-full border px-3 py-2 rounded"
                />
                <select
                    value={form.category || ''}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full border px-3 py-2 rounded"
                    required
                >
                    <option value="">Select a category</option>
                    <option value="Programming">Programming</option>
                    <option value="Design">Design</option>
                    <option value="DevOps">DevOps</option>
                    <option value="AI">AI</option>
                    <option value="Career">Career</option>
                </select>
                <input
                    type="number"
                    min="1"
                    value={form.readTime}
                    onChange={(e) => setForm({ ...form, readTime: Number(e.target.value) })}
                    placeholder="Read Time (mins)"
                    className="w-full border px-3 py-2 rounded"
                />
                <div className="flex flex-col gap-2">
                    <input type="file" accept="image/*" onChange={async (e) => {
                        const file = e.target.files?.[0]
                        if (!file) return
                        setUploading(true)
                        const fd = new FormData()
                        fd.append('file', file)
                        const res = await fetch('/api/upload', { method: 'POST', body: fd })
                        setUploading(false)
                        if (res.ok) {
                            const { url } = await res.json()
                            setForm((f) => ({ ...f, coverImage: url }))
                        }
                    }} />
                    {uploading && <span className="text-sm text-gray-500">Uploading...</span>}
                    {form.coverImage && (
                        <div className="relative w-full h-48">
                            <img src={form.coverImage} alt="cover" className="w-full h-full object-cover rounded border" />
                        </div>
                    )}
                </div>
                <textarea
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    placeholder="Content"
                    rows="5"
                    className="w-full border px-3 py-2 rounded"
                />
                <div className="flex justify-between pt-4">
                    <button
                        type="submit"
                        className="btn px-5 py-2 rounded inline-flex items-center justify-center"
                        aria-label="Update blog"
                        title="Update"
                    >
                        <FiSave />
                    </button>
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="bg-red-100 text-red-700 hover:bg-red-200 px-5 py-2 rounded inline-flex items-center justify-center"
                        aria-label="Delete blog"
                        title="Delete"
                    >
                        <FiTrash2 />
                    </button>
                </div>
            </form>
        </section>
    );
}
