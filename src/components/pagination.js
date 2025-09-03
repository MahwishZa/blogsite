'use client'

import { useRouter } from 'next/navigation'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

{ /* Pagination */ }
export default function Pagination({ currentPage, totalPages }) {
    const router = useRouter()
    const goToPage = (page) => {
        if (page !== currentPage && page >= 1 && page <= totalPages) {
            router.push(`?page=${page}`)
        }
    }
    const renderPages = () => {
        const pages = []
        const showPage = (page) => (
            <button
                key={page}
                onClick={() => goToPage(page)}
                className={`w-10 h-10 rounded-full text-sm font-semibold transition-all duration-200 ease-in-out 
                    ${currentPage === page ? 'bg-[#000538] text-white' : 'bg-neutral-100'}`}
            >
                {page}
            </button>
        )
        const showEllipsis = (key) => (
            <span key={key} className="text-xl font-bold px-1">...</span>
        )
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(showPage(i))
            }
        } else {
            pages.push(showPage(1))
            if (currentPage > 3) {
                pages.push(showEllipsis('left'))
            }
            const startPage = Math.max(2, currentPage - 1)
            const endPage = Math.min(totalPages - 1, currentPage + 1)
            for (let i = startPage; i <= endPage; i++) {
                pages.push(showPage(i))
            }
            if (currentPage < totalPages - 2) {
                pages.push(showEllipsis('right'))
            }
            pages.push(showPage(totalPages))
        }
        return pages
    }
    
    return (
        <div className="flex items-center justify-center gap-2 py-6 transition-all duration-300 ease-in-out">
            <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-full bg-neutral-100 disabled:opacity-50 transition hover:bg-neutral-200"
                aria-label="Previous Page"
            >
                <FiChevronLeft className="w-5 h-5" />
            </button>
            {renderPages()}
            <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-full bg-neutral-100 disabled:opacity-50 transition hover:bg-neutral-200"
                aria-label="Next Page"
            >
                <FiChevronRight className="w-5 h-5" />
            </button>
        </div>
    );
}