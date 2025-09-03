'use client'

import BlogPostCard from '@/components/blogcard'

async function getPosts() {
  const res = await fetch('http://localhost:3000/api/posts', { cache: 'no-store' }) // Or use your deployed URL
  if (!res.ok) return []
  return await res.json()
}

export default async function BlogListPage() {
  const posts = await getPosts()
  return (
    <section className="mx-auto max-w-6xl p-6 flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-8">
        {posts.map((p) => (
          <BlogPostCard key={p.id} {...p} />
        ))}
      </div>
    </section>
  )
}
