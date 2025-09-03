import Image from "next/image";
import Link from 'next/link'

{ /* Blog Post Card */ }
export default function BlogPostCard({ coverImage, category, title, date, readTime, excerpt, authorName, id }) {
    return (
        <Link href={`/blog/${id}`} className="max-w-6xl mx-auto p-6 flex flex-col gap-6 transition-colors w-full card-fade-in">
            <div className="relative h-64 w-full">
                <Image
                    src={coverImage}
                    alt={title}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded"
                    priority
                />
            </div>
            <div className="py-6">
                {category && (
                    <span className="tag text-xs rounded px-3 py-1 mb-2">
                        {category}
                    </span>
                )}
                <h2 className="text-2xl font-bold mb-2">
                    {title}
                </h2>
                <p className="text-sm mb-4">
                    {date} &bull; {readTime} min read
                </p>
                <p className="text-sm mb-6">{excerpt}</p>
                <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-neutral-100 font-semibold flex items-center justify-center">
                        {authorName.charAt(0)}
                    </div>
                    <span className="font-semibold">
                        {authorName}
                    </span>
                </div>
            </div>
        </Link>
    );
}
