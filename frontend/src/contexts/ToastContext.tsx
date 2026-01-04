'use client';
import { createContext, useContext, useMemo, useState } from 'react';

type Toast = { id: string; type: 'success' | 'error' | 'info'; message: string };
type ToastContextType = {
  toasts: Toast[];
  show: (t: Omit<Toast, 'id'>) => void;
  remove: (id: string) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

function uid() {
  return Math.random().toString(36).slice(2);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  function show(t: Omit<Toast, 'id'>) {
    const id = uid();
    const toast = { ...t, id };
    setToasts((list) => [...list, toast]);
    setTimeout(() => {
      setToasts((list) => list.filter((x) => x.id !== id));
    }, 3000);
  }

  function remove(id: string) {
    setToasts((list) => list.filter((x) => x.id !== id));
  }

  const value = useMemo(() => ({ toasts, show, remove }), [toasts]);
  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

