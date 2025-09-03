'use client';

import { FiSearch } from 'react-icons/fi';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

{ /* Search Bar */ }
export default function SearchBar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const defaultSearch = searchParams.get('search') || '';
    const [search, setSearch] = useState(defaultSearch);
    const handleSubmit = (e) => {
        e.preventDefault();
        const query = search.trim();
        router.push(query ? `/?search=${encodeURIComponent(query)}` : '/');
    }
    return (
        <form onSubmit={handleSubmit} className="relative flex items-center justify-center gap-2 w-full max-w-xs md:max-w-sm mx-auto my-4">
            <input
                type="text"
                placeholder="Search for articles"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#000538] resize-none"
            />
            <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-400" size={18} />
        </form>
    );
}