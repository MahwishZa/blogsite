'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function RelatedPost({ authorName, currentPostId, posts }) {
    const relatedPosts = posts
        .filter(post => post.authorName === authorName && post.id !== currentPostId)
        .slice(0, 2)

    return (
        <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">Keep reading</h2>
            {relatedPosts.length === 0 ? (
                <p className="text-sm">No related posts found.</p>
            ) : (
                <div className="space-y-6">
                    {relatedPosts.map((post) => (
                        <Link href={`/blog/${post.id}`} key={post.id} className="flex gap-4 group card-fade-in">
                            <div className="w-48 h-32 flex-shrink-0 relative">
                                <Image
                                    src={post.coverImage}
                                    alt={post.title}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    className="rounded shadow-lg"
                                    priority
                                />
                            </div>
                            
                            <div className='pl-2 ml-2'>
                                <h3 className="font-medium text-lg leading-snug group-hover:underline">
                                    {post.title}
                                </h3>
                                <p className="text-sm mt-1 leading-snug line-clamp-3">
                                    {post.excerpt}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}
