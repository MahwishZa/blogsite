'use client'

{/* About Author */ }
export default function AboutCard({ authorName, aboutAuthor }) {
    const cardClass = "flex flex-col md:flex-row items-center md:items-start gap-4 bg-neutral-100 p-6 rounded border w-full";
    return (
        <div className={cardClass}>
            <div className="w-20 h-20 rounded-full bg-neutral-200 flex items-center justify-center text-3xl font-semibold md:p-6 md:m-2">
                {authorName?.charAt(0)}
            </div>
            <div className="text-center md:text-left md:my-4 md:mr-4">
                {authorName && (
                    <h6 className="text-md font-bold mb-2">
                        Written by {authorName}
                    </h6>
                )}
                <p className="text-sm leading-relaxed">
                    {aboutAuthor}
                </p>
            </div>
        </div>
    );
}