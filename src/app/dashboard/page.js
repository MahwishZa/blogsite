'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiPlus, FiEdit2, FiUser, FiBookOpen, FiSave, FiCheck } from 'react-icons/fi'
import { useToast } from '@/components/ToastProvider'

export default function DashboardPage() {
    const router = useRouter();
    const [posts, setPosts] = useState([]);
    const [profile, setProfile] = useState({ name: '', email: '', about: '' })
    const [saving, setSaving] = useState(false)
    const toast = useToast()

    useEffect(() => {
        const load = async () => {
            const [postsRes, profileRes] = await Promise.all([
                fetch('/api/posts?mine=1', { credentials: 'include', cache: 'no-store' }),
                fetch('/api/profile', { credentials: 'include', cache: 'no-store' })
            ])
            if (postsRes.ok) setPosts(await postsRes.json());
            if (profileRes.ok) setProfile(await profileRes.json())
        };
        load();
    }, []);

    const saveProfile = async () => {
        setSaving(true)
        const res = await fetch('/api/profile', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ about: profile.about }),
            credentials: 'include',
            cache: 'no-store'
        })
        setSaving(false)
        if (res.ok) {
            // Optimistic update to avoid clearing textarea on any server quirk
            setProfile((p) => ({ ...p, about: profile.about }))
            toast.add('Profile saved', 'success')
        } else {
            if (res.status === 401) {
                toast.add('Your session expired. Please sign in again.', 'error')
            } else {
                toast.add('Failed to save profile', 'error')
            }
        }
    }

    return (
        <section className="max-w-6xl mx-auto px-4 py-6 flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div>
                        <h1 className="text-4xl font-black">Dashboard</h1>
                        <p className="text-sm mt-1">Welcome back, {profile.name || 'Author'}</p>
                    </div>
                </div>
                <button
                    onClick={() => router.push('/dashboard/create')}
                    className="btn px-4 py-2 rounded inline-flex items-center gap-2"
                    aria-label="Create new blog"
                    title="Create New Blog"
                >
                    <FiPlus />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <div className="md:col-span-2 bg-white rounded shadow p-4 md:p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <FiBookOpen className="w-6 h-6 text-[#000538]" />
                        <h2 className="text-xl font-semibold">Your Blogs</h2>
                    </div>
                    {posts.length === 0 ? (
                        <p>No blog posts found.</p>
                    ) : (
                        <ul className="divide-y">
                            {posts.map((post) => (
                                <li key={post.id} className="py-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-medium">{post.title}</p>
                                            <p className="text-sm">
                                                {new Date(post.createdAt).toLocaleDateString()} • {post.readTime} • {post.category}
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => router.push(`/dashboard/edit/${post.id}`)}
                                                className="text-sm px-3 py-1 bg-neutral-100 hover:bg-neutral-200 rounded inline-flex items-center gap-2"
                                                aria-label={`Edit ${post.title}`}
                                                title="Edit"
                                            >
                                                <FiEdit2 />
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <aside className="bg-white rounded shadow p-4 md:p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <FiUser className="w-6 h-6 text-[#000538]" />
                        <h3 className="text-xl font-semibold">Author Profile</h3>
                    </div>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Name</label>
                            <input disabled value={profile.name} className="w-full border px-3 py-2 rounded bg-gray-50" />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Email</label>
                            <input disabled value={profile.email} className="w-full border px-3 py-2 rounded bg-gray-50" />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">About</label>
                            <textarea value={profile.about}
                                onChange={(e) => setProfile((p) => ({ ...p, about: e.target.value }))}
                                rows="5" className="w-full border px-3 py-2 rounded" placeholder="Tell readers about yourself..." />
                        </div>
                        <button onClick={saveProfile} className="btn px-4 py-2 rounded inline-flex items-center gap-2" aria-busy={saving} title="Save Profile">
                            <FiSave />
                        </button>
                    </div>
                </aside>
            </div>
        </section>
    );
}