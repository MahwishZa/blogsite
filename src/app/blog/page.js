'use client'

import { useEffect, useState, Suspense } from 'react'
import BlogPostCard from '@/components/blogcard'
import SearchBar from '@/components/searchbar'

export const dynamic = 'force-dynamic'

export default function BlogListPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    let isMounted = true
    const load = async () => {
      const res = await fetch('/api/posts', { cache: 'no-store' })
      if (res.ok) {
        const data = await res.json()
        if (isMounted) setPosts(data)
      }
      if (isMounted) setLoading(false)
    }
    load()
    return () => { isMounted = false }
  }, [])

  return (
    <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
      <section className="mx-auto max-w-6xl p-6 flex flex-col gap-4">
        <Suspense fallback={<div className="text-center">Loading search...</div>}>
          <SearchBar />
        </Suspense>
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {posts.map((p) => (
              <BlogPostCard key={p.id} {...p} />
            ))}
          </div>
        )}
      </section>
    </Suspense>
  )
}
