'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Newsletter() {
    const [allPosts, setAllPosts] = useState([])

    useEffect(() => {
        const load = async () => {
            const res = await fetch('/api/posts')
            if (res.ok) setAllPosts(await res.json())
        }
        load()
    }, [])

    const popularPosts = [...allPosts]
        .sort((a, b) => (b.comments?.length || 0) - (a.comments?.length || 0))
        .slice(0, 3)
    const recentPosts = [...allPosts]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 3)

    const handleNewsletterSubmit = (e) => {
        e.preventDefault()
        const email = e.currentTarget.querySelector('input[name="newsletterEmail"]').value || ''
        const subject = encodeURIComponent('Newsletter Subscription')
        const body = encodeURIComponent(`Please subscribe this email: ${email}`)
        window.location.href = `mailto:subscribe@example.com?subject=${subject}&body=${body}`
    }

    return (
        <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-3 gap-8">
            {/* Newsletter Subscription Box */}
            <div className="box px-8 py-10 rounded leading-relaxed order-last md:order-first">
                <h2 className="font-black text-2xl text-white text-center mb-4">
                    Subscribe To<br />Our Newsletter
                </h2>
                <p className="text-center mb-6">
                    Get weekly news, articles, and videos delivered to your inbox.
                </p>
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col items-start gap-4">
                    <input
                        name="newsletterEmail"
                        type="email"
                        placeholder="Email"
                        className="w-full p-3 rounded text-black"
                        required
                    />
                    <button
                        type="submit"
                        className="btn-dark font-semibold px-6 py-3 rounded"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
            {/* Popular Posts */}
            <div className="leading-snug text-sm md:ml-8 order-first md:order-last">
                <p className="mb-6 font-bold uppercase">Popular Posts</p>
                <ul className="space-y-4">
                    {popularPosts.map((post) => (
                        <li key={post.id}>
                            <Link href={`/blog/${post.id}`} className="hover:underline">
                                {post.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            {/* Recent Posts */}
            <div className="leading-snug text-sm md:ml-8 order-first md:order-last">
                <p className="mb-6 font-bold uppercase">Recent Posts</p>
                <ul className="space-y-4">
                    {recentPosts.map((post) => (
                        <li key={post.id}>
                            <Link href={`/blog/${post.id}`} className="hover:underline">
                                {post.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}