'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  User,
  Shield,
  Compass,
  ArrowRight,
  ShieldCheck,
  Building,
  Key,
  Calendar,
  CheckCircle2,
  RefreshCw,
  Sun
} from 'lucide-react';
import { useHotel } from '@/context/HotelContext';
import AuthModal from '@/components/AuthModal';
import GuestPortal from '@/components/GuestPortal';
import OwnerDashboard from '@/components/OwnerDashboard';
import ThemeToggle from '@/components/ui/ThemeToggle';

export default function HomePage() {
  const { setCurrentUser } = useHotel();

  // Active Screen View: 'landing' | 'guest' | 'owner'
  const [activeView, setActiveView] = useState('landing');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [targetRoleForAuth, setTargetRoleForAuth] = useState('guest');

  const handleOpenAuth = (role) => {
    setTargetRoleForAuth(role);
    setIsAuthModalOpen(true);
  };

  const handleAuthSuccess = (role) => {
    setActiveView(role);
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] dark:bg-[#090d16] text-slate-900 dark:text-white transition-colors duration-300 relative">
      {/* VIEW 1: EXCLUSIVE START LANDING & ROLE SELECTION SCREEN */}
      {activeView === 'landing' && (
        <div className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-gradient-to-b from-stone-900 via-slate-950 to-slate-900 text-white">
          {/* Ambient Lighting Glows */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Landing Header */}
          <header className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-4 sm:py-8 flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-300 text-slate-950 flex items-center justify-center font-serif font-black text-base sm:text-lg shadow-lg shrink-0">
                LA
              </div>
              <div>
                <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-amber-400 block">
                  Ultra-Luxury Resort & Spa
                </span>
                <span className="text-base sm:text-lg font-bold tracking-tight text-white font-serif">
                  L'Horizon Azure
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <ThemeToggle className="!bg-slate-900 !border-slate-800 !text-amber-400" />
              <div className="hidden sm:flex items-center gap-2 text-xs text-slate-300 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-md">
                <Sun className="w-4 h-4 text-amber-400" />
                <span>Azure Bay • Private Lagoon</span>
              </div>
            </div>
          </header>

          {/* Hero Content & Split Selection Cards */}
          <main className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-12 relative z-10 flex-1 flex flex-col justify-center">
            {/* Title Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-3 sm:space-y-4 max-w-2xl mx-auto mb-8 sm:mb-12"
            >
              <span className="inline-flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs uppercase font-bold tracking-widest text-amber-400 bg-amber-500/15 border border-amber-500/30 px-3 sm:px-4 py-1.5 rounded-full">
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
                Hotel Management & Guest Platform
              </span>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white font-serif leading-tight">
                Select Your Hospitality Experience
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-slate-400 max-w-xl mx-auto">
                Choose between the interactive Guest In-Stay Concierge or the comprehensive Owner Operations & Housekeeping Suite.
              </p>
            </motion.div>

            {/* Split Selection Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
              {/* Card 1: Guest Portal */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ y: -6, scale: 1.01 }}
                onClick={() => handleOpenAuth('guest')}
                className="bg-slate-900/80 hover:bg-slate-900 backdrop-blur-xl border border-slate-800 hover:border-amber-500/50 rounded-3xl p-5 sm:p-8 shadow-2xl transition-all duration-300 flex flex-col justify-between group cursor-pointer relative overflow-hidden"
              >
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all pointer-events-none" />

                <div>
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Compass className="w-7 h-7" />
                  </div>

                  <span className="text-xs uppercase font-bold tracking-widest text-amber-400 block mb-1">
                    For Guests & Travelers
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white font-serif">
                    Guest Portal
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 mt-2.5 leading-relaxed">
                    Explore luxury penthouses, book in 3 steps, access your <strong>Digital Room Key</strong>, use the <strong>AI Concierge</strong>, explore Google Maps, and submit guest reviews.
                  </p>

                  <div className="mt-6 space-y-2 text-xs text-slate-400">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Interactive Google Maps resort location & Satellite view</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Conversational AI Butler ("Aura AI") with action triggers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Verified Guest Review system with category analytics</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between text-sm font-bold text-amber-400 group-hover:text-amber-300">
                  <span>Enter Guest Experience</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </div>
              </motion.div>

              {/* Card 2: Owner / Staff Portal */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ y: -6, scale: 1.01 }}
                onClick={() => handleOpenAuth('owner')}
                className="bg-slate-900/80 hover:bg-slate-900 backdrop-blur-xl border border-slate-800 hover:border-amber-500/50 rounded-3xl p-5 sm:p-8 shadow-2xl transition-all duration-300 flex flex-col justify-between group cursor-pointer relative overflow-hidden"
              >
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all pointer-events-none" />

                <div>
                  <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <ShieldCheck className="w-7 h-7" />
                  </div>

                  <span className="text-xs uppercase font-bold tracking-widest text-indigo-400 block mb-1">
                    For Staff & Administration
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white font-serif">
                    Owner / Staff Portal
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 mt-2.5 leading-relaxed">
                    Manage bookings ledger, update real-time room readiness status (Occupied, Available, Dirty), oversee revenue KPIs, and resolve housekeeping Kanban tickets.
                  </p>

                  <div className="mt-6 space-y-2 text-xs text-slate-400">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                      <span>Live updating Revenue ($), Occupancy (%), and ADR metrics</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                      <span>Room Inventory CRUD with Quick State toggles</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                      <span>Real-time Housekeeping & Dining Kanban board</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between text-sm font-bold text-indigo-400 group-hover:text-indigo-300">
                  <span>Enter Operations Suite</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </div>
              </motion.div>
            </div>
          </main>

          {/* Footer */}
          <footer className="max-w-7xl mx-auto w-full px-6 py-6 text-center text-xs text-slate-500 relative z-10 border-t border-slate-800/80">
            L'Horizon Azure Hospitality System • Built with Next.js App Router, Tailwind CSS, & Framer Motion
          </footer>
        </div>
      )}

      {/* VIEW 2: GUEST PORTAL */}
      {activeView === 'guest' && (
        <GuestPortal onSwitchRole={(role) => setActiveView(role)} />
      )}

      {/* VIEW 3: OWNER DASHBOARD */}
      {activeView === 'owner' && (
        <OwnerDashboard onSwitchRole={(role) => setActiveView(role)} />
      )}

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialRole={targetRoleForAuth}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}
