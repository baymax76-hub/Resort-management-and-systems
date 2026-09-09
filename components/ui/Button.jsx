'use client';

import React from 'react';
import { motion } from 'framer-motion';

const variants = {
  primary: 'bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold shadow-md shadow-amber-500/20 hover:shadow-amber-500/30 border border-amber-400/40',
  navy: 'bg-slate-900 hover:bg-slate-800 text-white font-medium shadow-md shadow-slate-900/20 border border-slate-700/50',
  emerald: 'bg-emerald-600 hover:bg-emerald-700 text-white font-medium shadow-md shadow-emerald-600/20 border border-emerald-500/30',
  danger: 'bg-rose-600 hover:bg-rose-700 text-white font-medium shadow-md shadow-rose-600/20 border border-rose-500/30',
  outline: 'bg-white/80 hover:bg-white text-slate-800 font-medium border border-stone-300 hover:border-stone-400 shadow-sm',
  ghost: 'bg-transparent hover:bg-stone-100 text-slate-700 font-medium hover:text-slate-950',
  glass: 'bg-white/70 hover:bg-white/90 backdrop-blur-md text-slate-900 border border-white/60 shadow-glass font-medium'
};

const sizes = {
  sm: 'px-3 py-1.5 min-h-[34px] sm:min-h-[32px] text-xs rounded-xl gap-1.5 touch-manipulation',
  md: 'px-4 py-2.5 min-h-[40px] text-sm rounded-xl gap-2 touch-manipulation',
  lg: 'px-6 py-3.5 min-h-[46px] text-base rounded-2xl gap-2.5 touch-manipulation',
  icon: 'p-2.5 min-h-[38px] min-w-[38px] rounded-xl aspect-square touch-manipulation'
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  isLoading = false,
  onClick,
  type = 'button',
  icon: Icon,
  iconPosition = 'left',
  ...props
}) {
  return (
    <motion.button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      whileHover={disabled || isLoading ? {} : { scale: 1.02 }}
      whileTap={disabled || isLoading ? {} : { scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 500, damping: 25 }}
      className={`inline-flex items-center justify-center transition-colors transition-shadow cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin -ml-1 mr-1 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </span>
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
          {children}
          {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
        </>
      )}
    </motion.button>
  );
}
