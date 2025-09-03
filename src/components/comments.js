'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { FiMessageCircle, FiThumbsUp, FiSend, FiEdit, FiTrash2 } from 'react-icons/fi'
import { useToast } from '@/components/ToastProvider'

export default function Comments({ postId }) {
    const router = useRouter()
    const { data: session } = useSession()
    const [comments, setComments] = useState([])
    const [message, setMessage] = useState('')
    const isSignedIn = !!session?.user
    const toast = useToast()

    useEffect(() => {
        const load = async () => {
            const res = await fetch(`/api/posts/${postId}/comments`, { cache: 'no-store' })
            if (res.ok) {
                setComments(await res.json())
            }
        }
        if (postId) load()
    }, [postId])

    const handleAdd = async (e) => {
        e.preventDefault()
        if (!isSignedIn) { toast.add('Please sign in to comment', 'error'); router.push('/auth/signin'); return }
        if (!message.trim()) return
        const res = await fetch(`/api/posts/${postId}/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
        })
        if (res.ok) {
            const created = await res.json()
            setComments((prev) => [created, ...prev])
            setMessage('')
            toast.add('Comment added', 'success')
        }
    }

    const handleEdit = async (id) => {
        if (!isSignedIn) { toast.add('Please sign in to edit', 'error'); router.push('/auth/signin'); return }
        const next = prompt('Edit your comment:', comments.find(c => c._id === id)?.message)
        if (next != null) {
            const res = await fetch(`/api/posts/${postId}/comments/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: next })
            })
            if (res.ok) {
                setComments((prev) => prev.map((c) => (c._id === id ? { ...c, message: next } : c)))
                toast.add('Comment updated', 'success')
            }
        }
    }

    const handleDelete = async (id) => {
        if (!isSignedIn) { toast.add('Please sign in to delete', 'error'); router.push('/auth/signin'); return }
        if (confirm('Delete this comment?')) {
            const res = await fetch(`/api/posts/${postId}/comments/${id}`, { method: 'DELETE' })
            if (res.ok) {
                setComments((prev) => prev.filter((c) => c._id !== id))
                toast.add('Comment deleted', 'warning')
            }
        }
    }

    const handleLike = () => {
        if (!isSignedIn) {
            router.push('/auth/signin')
            return
        }
        alert('Like feature is not implemented yet')
    }

    return (
        <div className="w-full max-w-6xl mx-auto p-6 flex flex-col gap-4">
            <h2 className="text-2xl font-semibold mb-6">
                Responses ({comments.length})
            </h2>
            <form onSubmit={handleAdd} className="mb-6 flex items-center gap-2">
                <FiMessageCircle className="w-6 h-6" />
                <input
                    type="text"
                    placeholder="What are your thoughts?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 border border-gray-300 px-4 py-2 rounded"
                />
                <button
                    disabled={!message.trim()}
                    type="submit"
                    className="p-2 rounded bg-blue-600 text-white disabled:opacity-50"
                >
                    <FiSend className="w-5 h-5" />
                </button>
            </form>
            {comments.map((comment) => (
                <div key={comment._id} className="flex items-start mb-6">
                    <div className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center font-semibold">
                        {comment.userName?.charAt(0)}
                    </div>
                    <div className="ml-4 flex-1">
                        <div className="text-sm font-medium">
                            {comment.userName}
                        </div>
                        <p className="text-xs text-gray-500">
                            {new Date(comment.createdAt).toLocaleString()}
                        </p>
                        <p className="mt-2 text-sm">{comment.message}</p>
                        <div className="flex items-center space-x-4 text-sm mt-2">
                            <button
                                onClick={() => handleLike(comment._id)}
                                className="flex items-center text-blue-500"
                            >
                                <FiThumbsUp className="w-4 h-4 mr-1" />
                            </button>
                            {isSignedIn && session.user.name === comment.userName && (
                                <>
                                    <button
                                        onClick={() => handleEdit(comment._id)}
                                        className="flex items-center"
                                    >
                                        <FiEdit className="w-4 h-4 mr-1" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(comment._id)}
                                        className="flex items-center text-red-600"
                                    >
                                        <FiTrash2 className="w-4 h-4 mr-1" />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}