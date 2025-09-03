import BlogPostCard from '@/components/blogcard'
import { headers } from 'next/headers'

async function getPosts() {
  const hdrs = headers()
  const host = hdrs.get('host') || 'localhost:3000'
  const protocol = process.env.VERCEL ? 'https' : 'http'
  const base = `${protocol}://${host}`
  const res = await fetch(`${base}/api/posts`, { cache: 'no-store' })
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
