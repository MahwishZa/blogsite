'use client';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import BlogPostCard from "@/components/blogcard";
import Pagination from "@/components/pagination";
import SearchBar from "@/components/searchbar";

export default function Home() {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page')) || 1;
  const searchTerm = searchParams.get('search')?.toLowerCase() || '';
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const res = await fetch('/api/posts', { cache: 'no-store' });
      if (res.ok) setAllPosts(await res.json());
      setLoading(false);
    };
    load();
  }, []);

  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) =>
      (post.title || '').toLowerCase().includes(searchTerm) ||
      (post.category || '').toLowerCase().includes(searchTerm) ||
      (post.excerpt || '').toLowerCase().includes(searchTerm) ||
      (post.authorName || '').toLowerCase().includes(searchTerm)
    );
  }, [allPosts, searchTerm]);

  const postsPerPage = 2;
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage) || 1;
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  return (
    <div className="max-w-6xl mx-auto p-6 flex flex-col gap-4">
      <h1 className="text-5xl font-black mt-16 text-center">The Dev Ninja Blog</h1>
      <p className="text-base text-center">
        A blog about development, design, and programming
      </p>
      <SearchBar />
      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <div className="max-w-6xl mx-auto py-6 grid md:grid-cols-2 gap-10">
          {paginatedPosts.length > 0 ? (
            paginatedPosts.map((post) => (
              <BlogPostCard
                key={post.id}
                coverImage={post.coverImage}
                category={post.category}
                title={post.title}
                date={post.date}
                readTime={post.readTime}
                excerpt={post.excerpt}
                authorName={post.authorName}
                id={post.id}
              />
            ))
          ) : (
            <p className="text-center py-12 col-span-2">No posts found</p>
          )}
        </div>
      )}
      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      )}
    </div>
  );
}