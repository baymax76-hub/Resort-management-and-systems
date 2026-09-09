'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Key, ShieldCheck, Wifi, Check, Sparkles, Smartphone, Lock, Unlock } from 'lucide-react';
import Modal from './Modal';
import Button from './Button';

export default function QRModal({ isOpen, onClose, booking }) {
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleSimulateUnlock = () => {
    setIsUnlocking(true);
    setTimeout(() => {
      setIsUnlocking(false);
      setIsUnlocked(true);
      setTimeout(() => {
        setIsUnlocked(false);
      }, 4000);
    }, 1200);
  };

  if (!booking) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Digital Key & QR Access"
      subtitle={`Room ${booking.roomNumber} • ${booking.roomName}`}
      maxWidth="max-w-md"
    >
      <div className="flex flex-col items-center text-center">
        {/* Pass Card Container */}
        <div className="w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl border border-slate-700/80 relative overflow-hidden">
          {/* Subtle gold decorative glow */}
          <div className="absolute -right-12 -top-12 w-36 h-36 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />

          {/* Card Top */}
          <div className="flex items-center justify-between border-b border-slate-700/60 pb-3 sm:pb-4 mb-4 sm:mb-5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-amber-400">
                L'Horizon Azure
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-400">
              <Wifi className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>NFC Active</span>
            </div>
          </div>

          {/* QR Code Graphic (SVG based clean high-contrast scannable QR pattern) */}
          <div className="bg-white p-3 sm:p-4 rounded-2xl shadow-inner mx-auto w-36 h-36 sm:w-48 sm:h-48 flex items-center justify-center relative">
            {/* SVG QR Code Simulation */}
            <svg viewBox="0 0 100 100" className="w-full h-full text-slate-950 fill-current">
              {/* Corner 1 */}
              <rect x="5" y="5" width="28" height="28" rx="4" />
              <rect x="10" y="10" width="18" height="18" fill="white" />
              <rect x="14" y="14" width="10" height="10" />

              {/* Corner 2 */}
              <rect x="67" y="5" width="28" height="28" rx="4" />
              <rect x="72" y="10" width="18" height="18" fill="white" />
              <rect x="76" y="14" width="10" height="10" />

              {/* Corner 3 */}
              <rect x="5" y="67" width="28" height="28" rx="4" />
              <rect x="10" y="72" width="18" height="18" fill="white" />
              <rect x="14" y="76" width="10" height="10" />

              {/* Data Blocks Grid Pattern */}
              <rect x="38" y="10" width="6" height="6" />
              <rect x="48" y="10" width="6" height="6" />
              <rect x="58" y="16" width="6" height="6" />
              <rect x="38" y="24" width="6" height="6" />
              <rect x="48" y="32" width="6" height="6" />
              <rect x="10" y="42" width="6" height="6" />
              <rect x="22" y="42" width="6" height="6" />
              <rect x="38" y="42" width="24" height="24" rx="4" fill="#f59e0b" />
              <rect x="68" y="42" width="6" height="6" />
              <rect x="80" y="42" width="12" height="6" />
              <rect x="68" y="54" width="10" height="6" />
              <rect x="84" y="54" width="6" height="6" />
              <rect x="38" y="72" width="10" height="6" />
              <rect x="54" y="72" width="6" height="12" />
              <rect x="68" y="68" width="10" height="6" />
              <rect x="80" y="76" width="12" height="12" />
              <rect x="38" y="84" width="10" height="6" />
            </svg>

            {/* Central Key Icon */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-8 h-8 rounded-full bg-slate-900 border-2 border-white flex items-center justify-center text-amber-400 shadow-md">
                <Key className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* PIN & Door Info */}
          <div className="mt-5 grid grid-cols-2 gap-3 text-left bg-slate-800/80 rounded-2xl p-3.5 border border-slate-700/50">
            <div>
              <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                Room Number
              </span>
              <p className="text-base font-bold text-white leading-tight">
                Suite {booking.roomNumber}
              </p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                Backup Key PIN
              </span>
              <p className="text-base font-mono font-bold text-amber-400 leading-tight tracking-wider">
                {booking.digitalKeyPin || '7429'}
              </p>
            </div>
          </div>

          {/* Guest Name & Valid Dates */}
          <div className="mt-3 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-1 px-1">
            <span>Guest: {booking.guestName}</span>
            <span>Check-out: {booking.checkOut}</span>
          </div>
        </div>

        {/* Interactive Tap to Unlock Simulator */}
        <div className="mt-6 w-full flex flex-col items-center">
          <AnimatePresence mode="wait">
            {isUnlocked ? (
              <motion.div
                key="unlocked"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="w-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 rounded-2xl p-4 flex items-center justify-center gap-2 font-semibold text-center text-sm"
              >
                <Unlock className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Door Unlocked! Welcome into Suite {booking.roomNumber}</span>
              </motion.div>
            ) : (
              <Button
                key="simulate"
                onClick={handleSimulateUnlock}
                isLoading={isUnlocking}
                variant="primary"
                size="lg"
                className="w-full flex items-center justify-center gap-2"
                icon={isUnlocking ? undefined : Smartphone}
              >
                Tap Phone to Simulate Door Unlock
              </Button>
            )}
          </AnimatePresence>

          <p className="text-xs text-stone-400 mt-3 flex items-center justify-center text-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            Encrypted 256-Bit Bluetooth Smart Lock Frequency
          </p>
        </div>
      </div>
    </Modal>
  );
}
