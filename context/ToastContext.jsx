'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, Info, XCircle, Sparkles, X } from 'lucide-react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(({ title, message, type = 'success', duration = 4000 }) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    const newToast = { id, title, message, type, duration };

    setToasts((prev) => [newToast, ...prev].slice(0, 5));

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      {/* Toast Notification Container */}
      <aside aria-label="Notifications" className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none max-w-md w-full px-4">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="pointer-events-auto rounded-2xl p-4 shadow-2xl backdrop-blur-xl border flex items-start gap-3.5 relative overflow-hidden bg-slate-900/95 text-white border-slate-700/60"
            >
              {/* Icon */}
              <div className="shrink-0 mt-0.5">
                {toast.type === 'success' && (
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                )}
                {toast.type === 'error' && (
                  <div className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center">
                    <XCircle className="w-5 h-5" />
                  </div>
                )}
                {toast.type === 'warning' && (
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                )}
                {toast.type === 'gold' && (
                  <div className="w-9 h-9 rounded-xl bg-gold-500/20 text-gold-400 border border-gold-500/30 flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                )}
                {toast.type === 'info' && (
                  <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center">
                    <Info className="w-5 h-5" />
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="flex-1 pr-2">
                {toast.title && <h4 className="text-sm font-semibold text-white leading-tight">{toast.title}</h4>}
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{toast.message}</p>
              </div>

              {/* Close Button */}
              <button
                onClick={() => removeToast(toast.id)}
                className="text-slate-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Progress bar */}
              {toast.duration > 0 && (
                <motion.div
                  initial={{ width: '100%' }}
                  animate={{ width: '0%' }}
                  transition={{ duration: toast.duration / 1000, ease: 'linear' }}
                  className={`absolute bottom-0 left-0 h-0.5 ${
                    toast.type === 'success'
                      ? 'bg-emerald-400'
                      : toast.type === 'error'
                      ? 'bg-rose-400'
                      : toast.type === 'warning'
                      ? 'bg-amber-400'
                      : toast.type === 'gold'
                      ? 'bg-gold-400'
                      : 'bg-sky-400'
                  }`}
                />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </aside>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
