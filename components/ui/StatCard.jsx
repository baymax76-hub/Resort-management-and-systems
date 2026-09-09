'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatCard({
  title,
  value,
  subtitle,
  trend,
  trendType = 'up',
  icon: Icon,
  colorScheme = 'gold',
  className = ''
}) {
  const schemeStyles = {
    gold: {
      bgIcon: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20',
      accentGlow: 'hover:shadow-amber-500/10',
      border: 'hover:border-amber-400/40'
    },
    emerald: {
      bgIcon: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20',
      accentGlow: 'hover:shadow-emerald-500/10',
      border: 'hover:border-emerald-400/40'
    },
    blue: {
      bgIcon: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20',
      accentGlow: 'hover:shadow-sky-500/10',
      border: 'hover:border-sky-400/40'
    },
    navy: {
      bgIcon: 'bg-slate-900/10 text-slate-800 dark:text-slate-200 border border-slate-900/20',
      accentGlow: 'hover:shadow-slate-900/10',
      border: 'hover:border-slate-400/40'
    }
  };

  const scheme = schemeStyles[colorScheme] || schemeStyles.gold;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className={`bg-white dark:bg-[#0e1626] rounded-3xl p-5 sm:p-6 shadow-sm border border-stone-200/90 dark:border-[#1e2a42] transition-all duration-300 relative overflow-hidden ${scheme.accentGlow} ${scheme.border} ${className}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-slate-400">
          {title}
        </span>
        {Icon && (
          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${scheme.bgIcon}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-4 flex items-baseline gap-2">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-mono">{value}</h3>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-stone-500 dark:text-slate-400 pt-3 border-t border-stone-100 dark:border-slate-800/80">
        <span className="truncate">{subtitle}</span>
        {trend && (
          <span
            className={`inline-flex items-center gap-1 font-semibold ${
              trendType === 'up' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
            }`}
          >
            {trendType === 'up' ? (
              <TrendingUp className="w-3.5 h-3.5" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5" />
            )}
            {trend}
          </span>
        )}
      </div>
    </motion.div>
  );
}
