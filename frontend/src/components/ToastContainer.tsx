'use client';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { useToast } from '@/contexts/ToastContext';

export function ToastContainer() {
  const { toasts, remove } = useToast();
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex items-center gap-2 px-3 py-2 rounded shadow ${
            t.type === 'success'
              ? 'bg-green-100 text-green-800'
              : t.type === 'error'
              ? 'bg-red-100 text-red-800'
              : 'bg-blue-100 text-blue-800'
          }`}
          onClick={() => remove(t.id)}
        >
          {t.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4" />
          ) : t.type === 'error' ? (
            <AlertCircle className="w-4 h-4" />
          ) : (
            <Info className="w-4 h-4" />
          )}
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
}

