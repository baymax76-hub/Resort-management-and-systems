'use client';

import React from 'react';

const statusVariants = {
  // Stay/Room States
  Available: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
  Occupied: 'bg-rose-50 text-rose-700 border-rose-200/80',
  Maintenance: 'bg-amber-50 text-amber-700 border-amber-200/80',
  Dirty: 'bg-slate-100 text-slate-700 border-slate-300',
  
  // Stay Statuses
  Confirmed: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
  'Checked-In': 'bg-sky-50 text-sky-700 border-sky-200/80',
  Completed: 'bg-slate-100 text-slate-700 border-slate-300',
  Cancelled: 'bg-rose-50 text-rose-700 border-rose-200/80',

  // Request Statuses
  Pending: 'bg-amber-50 text-amber-700 border-amber-200/80',
  'In Progress': 'bg-blue-50 text-blue-700 border-blue-200/80',
  
  // Payment
  Paid: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
  
  // Generic
  gold: 'bg-amber-50 text-amber-800 border-amber-300',
  navy: 'bg-slate-900 text-white border-slate-700',
  default: 'bg-stone-100 text-stone-700 border-stone-200'
};

const dotColors = {
  Available: 'bg-emerald-500',
  Occupied: 'bg-rose-500',
  Maintenance: 'bg-amber-500',
  Dirty: 'bg-slate-400',
  Confirmed: 'bg-emerald-500',
  'Checked-In': 'bg-sky-500',
  Completed: 'bg-slate-400',
  Cancelled: 'bg-rose-500',
  Pending: 'bg-amber-500',
  'In Progress': 'bg-blue-500',
  Paid: 'bg-emerald-500',
  gold: 'bg-amber-500',
  default: 'bg-stone-400'
};

export default function Badge({
  children,
  variant = 'default',
  showDot = false,
  className = '',
  size = 'md'
}) {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';
  const colorClass = statusVariants[variant] || statusVariants.default;
  const dotColor = dotColors[variant] || dotColors.default;

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ${sizeClasses} ${colorClass} ${className}`}
    >
      {showDot && (
        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${dotColor}`} />
      )}
      {children}
    </span>
  );
}
