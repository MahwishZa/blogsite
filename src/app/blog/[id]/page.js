'use client';

import Image from "next/image";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import RelatedPost from "@/components/relatedpost";
import Comments from '@/components/comments';
import AboutCard from '@/components/authorcard';

export default function BlogPostPage() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [related, setRelated] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const res = await fetch(`/api/posts/${id}`, { cache: 'no-store' });
            if (res.ok) setPost(await res.json());
            const all = await fetch('/api/posts', { cache: 'no-store' });
            if (all.ok) setRelated(await all.json());
            setLoading(false);
        };
        if (id) load();
    }, [id]);

    if (loading) {
        return (
            <section className="mx-auto max-w-6xl p-6">
                <div className="text-center py-12">Loading...</div>
            </section>
        );
    }
    if (!post) {
        return (
            <section className="mx-auto max-w-6xl p-6">
                <div className="text-center py-12 text-red-600">Post not found</div>
            </section>
        );
    }

    const { coverImage, category, title, date, readTime, authorName, authorAbout, excerpt, content } = post;

    return (
        <article className="mx-auto max-w-6xl p-6 flex flex-col gap-4 text-justify">
            <header className="py-6">
                {category && (
                    <span className="tag text-xs rounded px-3 py-1 mb-2">
                        {category}
                    </span>
                )}
                <h1 className="text-3xl font-bold mb-2">{title}</h1>
                <p className="text-sm mb-4">
                    {date} &bull; {readTime} min read
                </p>
                {coverImage && (
                    <div className="relative h-64 w-full">
                        <Image
                            src={coverImage}
                            alt={title}
                            fill
                            style={{ objectFit: 'cover' }}
                            className="rounded shadow-lg"
                            priority
                        />
                    </div>
                )}
            </header>
            <section className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-neutral-100 font-semibold flex items-center justify-center">
                    {authorName?.charAt(0)}
                </div>
                <span className="font-semibold">{authorName}</span>
            </section>
            <section className="prose prose-sm sm:prose-base max-w-6xl">
                <p className="font-medium text-base my-4 py-4">{excerpt}</p>
                <p className="mt-2 text-sm whitespace-pre-wrap">{content}</p>
            </section>
            <section className="mt-12 card-fade-in">
                <AboutCard authorName={authorName} aboutAuthor={authorAbout || ""} />
            </section>
            <section className="mt-12">
                <RelatedPost authorName={authorName} currentPostId={post.id} posts={related} />
            </section>
            <section className="mt-12">
                <Comments postId={post.id} />
            </section>
        </article>
    );
}
