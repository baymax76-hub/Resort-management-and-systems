'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  Key,
  Sparkles,
  MapPin,
  Star,
  PanelLeftClose,
  PanelLeftOpen,
  ShieldCheck,
  Award,
  Sun
} from 'lucide-react';

export default function GuestSidebar({
  activeTab = 'discover',
  onSelectTab,
  bookingsCount = 0,
  isCollapsed = false,
  setIsCollapsed,
  className = ''
}) {
  const [hoveredItem, setHoveredItem] = useState(null);

  const guestNavItems = [
    {
      id: 'discover',
      label: 'Discover & Reserve',
      icon: Compass,
      accent: 'gold',
      description: 'Explore Luxury Suites'
    },
    {
      id: 'mystay',
      label: 'My Stays & Digital Key',
      icon: Key,
      accent: 'cyan',
      badge: bookingsCount > 0 ? bookingsCount : undefined,
      description: 'Unlock Door & Active Stays'
    },
    {
      id: 'services',
      label: 'In-Room Concierge',
      icon: Sparkles,
      accent: 'emerald',
      badge: 'Aura AI',
      description: 'Butler & Dining Orders'
    },
    {
      id: 'map',
      label: 'Resort GPS Map',
      icon: MapPin,
      accent: 'default',
      description: 'Satellite Landmarks'
    },
    {
      id: 'reviews',
      label: 'Guest Reviews',
      icon: Star,
      accent: 'purple',
      description: 'Verified Ratings'
    }
  ];

  const getButtonStyles = (item) => {
    const isActive = activeTab === item.id;
    if (!isActive) {
      return 'text-slate-400 hover:text-white hover:bg-[#152033]';
    }

    if (item.accent === 'gold') {
      return 'bg-[#f59e0b] text-slate-950 font-bold shadow-lg shadow-amber-500/30';
    }
    if (item.accent === 'emerald') {
      return 'bg-[#22c55e] text-slate-950 font-bold shadow-lg shadow-emerald-500/30';
    }
    if (item.accent === 'cyan') {
      return 'bg-[#38bdf8] text-slate-950 font-bold shadow-lg shadow-sky-500/30';
    }
    if (item.accent === 'purple') {
      return 'bg-[#a855f7] text-white font-bold shadow-lg shadow-purple-500/30';
    }
    return 'bg-[#1e293b] text-white font-bold border border-slate-700 shadow-md';
  };

  const getFlyoutBg = (item) => {
    if (item.accent === 'gold') return 'bg-[#f59e0b] text-slate-950 font-bold';
    if (item.accent === 'emerald') return 'bg-[#22c55e] text-slate-950 font-bold';
    if (item.accent === 'cyan') return 'bg-[#38bdf8] text-slate-950 font-bold';
    if (item.accent === 'purple') return 'bg-[#a855f7] text-white font-bold';
    return 'bg-[#131d2e] text-white border border-slate-700 font-semibold';
  };

  return (
    <motion.aside
      animate={{ width: isCollapsed ? 76 : 255 }}
      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
      className={`relative select-none flex flex-col justify-between bg-[#0b1220] text-slate-300 border border-[#1e2a42] rounded-[34px] pt-4 pb-5 px-3 shadow-2xl backdrop-blur-2xl shrink-0 transition-all z-30 ${className}`}
      style={{
        boxShadow:
          '0 25px 50px -12px rgba(0, 0, 0, 0.85), inset 0 1px 1px 0 rgba(255, 255, 255, 0.08), 0 0 0 1px rgba(30, 42, 66, 0.6)'
      }}
    >
      {/* 1. Header Logo & Quick Collapse */}
      <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between px-1'} pb-2.5 mb-1 border-b border-[#162033]`}>
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-300 text-slate-950 flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/25 font-serif font-black text-lg">
            LA
          </div>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              className="flex-1 overflow-hidden"
            >
              <span className="text-sm font-extrabold tracking-tight text-white block leading-tight font-serif truncate">
                L'Horizon Azure
              </span>
              <span className="text-[10px] text-amber-400 font-bold tracking-wider uppercase font-mono">
                Guest Sanctuary
              </span>
            </motion.div>
          )}
        </div>

        {/* Top collapse button visible in expanded mode */}
        {!isCollapsed && (
          <button
            onClick={() => setIsCollapsed && setIsCollapsed(true)}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#152033] transition-colors shrink-0 cursor-pointer"
            title="Collapse Sidebar"
          >
            <PanelLeftClose className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* 2. Navigation Items (Scroll-free, perfectly fitted) */}
      <div
        className="flex-1 flex flex-col justify-start space-y-1 my-auto overflow-y-auto no-scrollbar scrollbar-none [&::-webkit-scrollbar]:hidden py-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="space-y-1">
          {guestNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <div
                key={item.id}
                className="relative flex justify-center"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <button
                  onClick={() => onSelectTab && onSelectTab(item.id)}
                  className={`transition-all cursor-pointer ${
                    isCollapsed
                      ? 'w-10 h-10 rounded-2xl flex items-center justify-center'
                      : 'w-full h-10 rounded-2xl flex items-center justify-between px-3'
                  } ${getButtonStyles(item)}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        isActive && (item.accent === 'gold' || item.accent === 'emerald' || item.accent === 'cyan')
                          ? 'text-slate-950 stroke-[2.2]'
                          : isActive
                          ? 'text-white stroke-[2.2]'
                          : 'text-slate-400'
                      }`}
                    />
                    {!isCollapsed && (
                      <span className="text-xs font-semibold tracking-tight whitespace-nowrap truncate text-left">
                        {item.label}
                      </span>
                    )}
                  </div>

                  {!isCollapsed && item.badge !== undefined && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                        isActive
                          ? 'bg-slate-950 text-white'
                          : 'bg-[#182235] text-amber-400 border border-slate-700/60'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>

                {/* Collapsed Tooltip */}
                <AnimatePresence>
                  {isCollapsed && hoveredItem === item.id && (
                    <motion.div
                      initial={{ opacity: 0, x: 10, scale: 0.95 }}
                      animate={{ opacity: 1, x: 16, scale: 1 }}
                      exit={{ opacity: 0, x: 10, scale: 0.95 }}
                      transition={{ duration: 0.12 }}
                      className="absolute left-full top-1/2 -translate-y-1/2 z-50 pointer-events-none"
                    >
                      <div
                        className={`px-3.5 py-2 rounded-xl text-xs whitespace-nowrap shadow-2xl flex items-center gap-2 ${getFlyoutBg(
                          item
                        )}`}
                      >
                        <div
                          className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 rotate-45"
                          style={{
                            backgroundColor:
                              item.accent === 'gold'
                                ? '#f59e0b'
                                : item.accent === 'emerald'
                                ? '#22c55e'
                                : item.accent === 'cyan'
                                ? '#38bdf8'
                                : item.accent === 'purple'
                                ? '#a855f7'
                                : '#131d2e'
                          }}
                        />
                        <span>{item.label}</span>
                        {item.badge !== undefined && (
                          <span className="text-[10px] bg-black/25 text-white px-1.5 py-0.5 rounded-md font-mono">
                            {item.badge}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Bottom Section: Seamless Collapse Toggle & Status Indicator */}
      <div className="pt-2 flex flex-col items-center gap-2">
        {/* Collapse / Expand Toggle Button - Uniform dimensions */}
        <div
          className="relative flex justify-center w-full"
          onMouseEnter={() => setHoveredItem('collapse-toggle')}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <button
            onClick={() => setIsCollapsed && setIsCollapsed(!isCollapsed)}
            className={`transition-all text-slate-400 hover:text-white hover:bg-[#152033] cursor-pointer ${
              isCollapsed
                ? 'w-10 h-10 rounded-2xl flex items-center justify-center'
                : 'w-full h-10 rounded-2xl flex items-center px-3 gap-3'
            }`}
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? (
              <PanelLeftOpen className="w-4 h-4 shrink-0 text-slate-400 group-hover:text-white" />
            ) : (
              <PanelLeftClose className="w-4 h-4 shrink-0 text-slate-400 group-hover:text-white" />
            )}
            {!isCollapsed && (
              <span className="text-xs font-semibold tracking-tight whitespace-nowrap truncate text-left">
                Collapse Sidebar
              </span>
            )}
          </button>

          {/* Tooltip for Collapse/Expand in Collapsed Mode */}
          <AnimatePresence>
            {isCollapsed && hoveredItem === 'collapse-toggle' && (
              <motion.div
                initial={{ opacity: 0, x: 10, scale: 0.95 }}
                animate={{ opacity: 1, x: 16, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.95 }}
                transition={{ duration: 0.12 }}
                className="absolute left-full top-1/2 -translate-y-1/2 z-50 pointer-events-none"
              >
                <div className="px-3.5 py-2 rounded-xl text-xs whitespace-nowrap shadow-2xl bg-[#131d2e] text-white border border-slate-700 font-semibold flex items-center gap-2">
                  <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 rotate-45 bg-[#131d2e]" />
                  <span>Expand Sidebar</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Subtle Status Footer: Centered in the bottom capsule curve */}
        <div className="w-full flex items-center justify-center pt-1">
          {isCollapsed ? (
            <div
              className="flex items-center justify-center py-0.5"
              title="Sanctuary Concierge Live"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-between w-full px-2 py-1 text-[10px] text-slate-400 border border-slate-800/80 rounded-xl bg-[#0e1626]/60">
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span>
                </span>
                <span className="font-mono text-amber-400 font-semibold">VIP Concierge</span>
              </div>
              <span className="font-mono text-slate-400 font-bold">Azure Bay</span>
            </div>
          )}
        </div>
      </div>
    </motion.aside>
  );
}
