import { ReactNode, createContext, useContext, useState } from 'react'

import { ToastContainer } from '../components/toast'

export interface ToastData {
  id: string
  message: string
  type: 'error' | 'success' | 'default'
}

type ToastInput = Omit<ToastData, 'id'>

interface ContextData {
  addToast(toast: ToastInput): void
  removeToast(id: string): void
}

const TIME_REMOVE_TOAST = 6 * 1000 // 6seg
const ToastContext = createContext<ContextData | null>(null)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<ToastData[]>([])

  const addToast = ({ message, type }: ToastInput) => {
    const item = {
      id: crypto.randomUUID(),
      message,
      type,
    }

    setMessages((state) => [...state, item])
    setTimeout(
      () => setMessages((state) => state.filter((row) => row.id !== item.id)),
      TIME_REMOVE_TOAST,
    )
  }

  const removeToast = (id: string) => {
    setMessages((state) => state.filter((message) => message.id !== id))
  }

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  )
}

export function useToast(): ContextData {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('Toast context not provided')
  }

  return context
}
