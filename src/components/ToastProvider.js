'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const ToastCtx = createContext({ add: () => {} })

export function useToast() {
  return useContext(ToastCtx)
}

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const add = useCallback((message, kind = 'info', timeout = 3000) => {
    const id = Date.now() + Math.random()
    setToasts((t) => [...t, { id, message, kind }])
    if (timeout) setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), timeout)
  }, [])

  const value = useMemo(() => ({ add }), [add])

  return (
    <ToastCtx.Provider value={value}>
      {children}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] space-y-2 w-[90%] max-w-sm">
        {toasts.map(t => (
          <div
            key={t.id}
            className={`px-4 py-3 rounded shadow text-white border ${
              t.kind === 'error'
                ? 'bg-red-600 border-red-700'
                : t.kind === 'warning'
                ? 'bg-amber-500 border-amber-600'
                : 'bg-[#000538] border-[#000538]'
            }`}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  )
}


