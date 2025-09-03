'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { FiMenu, FiX } from 'react-icons/fi'
import { useSession, signOut } from 'next-auth/react'

export default function Header() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const { data: session } = useSession()
    const isAuthed = !!session?.user
    const router = useRouter()
    const pathname = usePathname()
    const isDashboard = pathname?.startsWith('/dashboard')
    const isAuth = pathname?.startsWith('/auth')
    useEffect(() => {
        document.body.style.overflow = isSidebarOpen ? 'hidden' : 'auto'
    }, [isSidebarOpen])
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsSidebarOpen(false)
            }
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])
    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev)
    }
    const handleSignOut = async () => {
        await signOut({ redirect: true, callbackUrl: '/' })
    }

    return (
        <nav className="bg-transparent relative z-50">
            <div className="max-w-6xl mx-auto p-6 flex justify-between items-center">
                <Link href="/" className="logo text-base md:text-xl font-bold font-black">
                    Dev Ninja
                </Link>
                {!isAuth && (
                    <>
                        {isDashboard ? (
                            <div>
                                {isAuthed && (
                                    <button
                                        onClick={handleSignOut}
                                        className="px-4 py-1 rounded bg-neutral-100 hover:bg-neutral-200 text-sm"
                                    >
                                        Sign Out
                                    </button>
                                )}
                            </div>
                        ) : (
                            <>
                                <div className="hidden md:flex space-x-10 text-sm items-center">
                                    <Link href="/" className="hover:underline">Home</Link>
                                    {isAuthed ? (
                                        <>
                                            <Link href="/dashboard" className="hover:underline">Dashboard</Link>
                                            <button
                                                onClick={handleSignOut}
                                                className="px-4 py-1 rounded bg-neutral-100 hover:bg-neutral-200"
                                            >
                                                Sign Out
                                            </button>
                                        </>
                                    ) : (
                                        <Link href="/auth/signup" className="hover:underline">Get Started</Link>
                                    )}
                                </div>
                                <button
                                    className="md:hidden text-2xl"
                                    onClick={toggleSidebar}
                                    aria-label="Toggle Sidebar"
                                >
                                    {isSidebarOpen ? <FiX /> : <FiMenu />}
                                </button>
                            </>
                        )}
                    </>
                )}
            </div>
            {!isAuth && !isDashboard && (
                <>
                    <div
                        className={`fixed top-0 left-0 h-full w-64 bg-[#1a1a1a] text-white transform transition-transform duration-300 ease-in-out z-[60] md:hidden ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                            }`}
                    >
                        <div className="flex justify-between items-center p-4 border-b border-white/10">
                            <h1 className="text-xl font-semibold">Dev Ninja</h1>
                            <FiX className="w-5 h-5 cursor-pointer" onClick={toggleSidebar} />
                        </div>
                        <ul className="p-4 space-y-4 text-sm">
                            <li>
                                <Link href="/" className="block hover:underline" onClick={toggleSidebar}>
                                    Home
                                </Link>
                            </li>
                            {isAuthed ? (
                                <>
                                    <li>
                                        <Link href="/dashboard" className="block hover:underline" onClick={toggleSidebar}>
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <button
                                            onClick={async () => { await handleSignOut(); toggleSidebar() }}
                                            className="block w-full text-left hover:underline"
                                        >
                                            Sign Out
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <li>
                                    <Link href="/auth/signup" className="block hover:underline" onClick={toggleSidebar}>
                                        Get Started
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                    {isSidebarOpen && (
                        <div
                            className="fixed inset-0 bg-black bg-opacity-40 z-50 md:hidden"
                            onClick={toggleSidebar}
                        />
                    )}
                </>
            )}
        </nav>
    );
}