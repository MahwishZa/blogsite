'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FiSave } from 'react-icons/fi'
import { useToast } from '@/components/ToastProvider'

export default function CreatePage() {
    const router = useRouter();
    const toast = useToast()
    const [form, setForm] = useState({
        title: '',
        category: '',
        readTime: 5,
        content: '',
        coverImage: ''
    });
    const [uploading, setUploading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        });
        if (res.ok) {
            toast.add('Post created', 'success')
            router.push('/');
        } else if (res.status === 401) {
            toast.add('Please sign in to create a post', 'error')
            router.push('/auth/signin');
        } else {
            toast.add('Failed to create post', 'error')
        }
    };

    return (
        <section className="max-w-6xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold mb-6">Create Blog</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Title"
                    className="w-full border px-3 py-2 rounded"
                />
                <select
                    value={form.category}
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
                    onChange={(e) => setForm({ ...form, readTime: e.target.value })}
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
                        <img src={form.coverImage} alt="cover" className="w-full h-48 object-cover rounded border" />
                    )}
                </div>
                <textarea
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    placeholder="Content"
                    rows="5"
                    className="w-full border px-3 py-2 rounded"
                />
                <button
                    type="submit"
                    className="btn px-5 py-2 rounded inline-flex items-center justify-center"
                    aria-label="Create blog"
                    title="Create"
                >
                    <FiSave />
                </button>
            </form>
        </section>
    );
}