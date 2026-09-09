'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Key,
  Shield,
  User,
  Sparkles,
  Lock,
  Mail,
  ArrowRight,
  CheckCircle,
  Building,
  Crown
} from 'lucide-react';
import { useHotel } from '@/context/HotelContext';
import { useToast } from '@/context/ToastContext';
import Modal from './ui/Modal';
import Button from './ui/Button';

export default function AuthModal({
  isOpen,
  onClose,
  initialRole = 'guest',
  onSuccess
}) {
  const { setCurrentUser } = useHotel();
  const { addToast } = useToast();

  const [activeRole, setActiveRole] = useState(initialRole); // 'guest' | 'owner'
  const [guestName, setGuestName] = useState('Eleanor Vance');
  const [guestEmail, setGuestEmail] = useState('eleanor.vance@vanguard.com');
  const [passcode, setPasscode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setActiveRole(initialRole);
      setErrorMsg('');
      setPasscode('');
    }
  }, [isOpen, initialRole]);

  const handleGuestLogin = (e) => {
    e.preventDefault();
    if (!guestName || !guestEmail) {
      setErrorMsg('Please enter your name and email.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setCurrentUser({
        role: 'guest',
        name: guestName,
        email: guestEmail,
        roomNumber: '101',
        activeBookingId: 'BK-8941'
      });
      setIsLoading(false);
      addToast({
        title: 'Welcome Back!',
        message: `Logged in as Guest: ${guestName}.`,
        type: 'gold'
      });
      if (onSuccess) onSuccess('guest');
      onClose();
    }, 500);
  };

  const handleOwnerLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Accept demo passcodes: 'owner123', 'admin', '8899', or any non-empty in demo
    if (passcode !== 'owner123' && passcode !== 'admin' && passcode !== '8899' && passcode.trim() !== 'demo') {
      setErrorMsg('Invalid passcode. Use demo passcode: owner123 or 8899');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setCurrentUser({
        role: 'owner',
        name: 'General Manager Montgomery',
        email: 'management@lhorizon-azure.com',
        roomNumber: null,
        activeBookingId: null
      });
      setIsLoading(false);
      addToast({
        title: 'Staff Access Granted',
        message: 'Welcome to the Resort Operations & Analytics Portal.',
        type: 'success'
      });
      if (onSuccess) onSuccess('owner');
      onClose();
    }, 500);
  };

  const fillDemoOwner = () => {
    setPasscode('owner123');
    setErrorMsg('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-lg"
      className="!p-0 border-slate-700/60 shadow-glass-dark"
      showCloseButton={true}
    >
      <div className="bg-slate-950 text-white p-5 sm:p-8 relative overflow-hidden">
        {/* Background ambient lighting */}
        <div className="absolute -right-20 -top-20 w-60 h-60 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="text-center relative z-10 mb-5 sm:mb-6">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 mx-auto flex items-center justify-center mb-2.5 sm:mb-3">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            L'Horizon Azure Portal
          </h3>
          <p className="text-[11px] sm:text-xs text-slate-400 mt-1">
            Choose your portal mode to access custom hospitality suites.
          </p>
        </div>

        {/* Role Pill Switcher */}
        <div className="bg-slate-900/90 p-1 rounded-2xl border border-slate-800 flex items-center gap-1 mb-5 sm:mb-6 relative z-10">
          <button
            type="button"
            onClick={() => {
              setActiveRole('guest');
              setErrorMsg('');
            }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              activeRole === 'guest'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Guest Experience</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveRole('owner');
              setErrorMsg('');
            }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              activeRole === 'owner'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Owner & Staff</span>
          </button>
        </div>

        {/* Form Body with AnimatePresence */}
        <AnimatePresence mode="wait">
          {activeRole === 'guest' ? (
            <motion.form
              key="guest-form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onSubmit={handleGuestLogin}
              className="space-y-4 relative z-10"
            >
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Guest Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    required
                    placeholder="e.g. Eleanor Vance"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    required
                    placeholder="eleanor.vance@example.com"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {errorMsg && (
                <p className="text-xs text-rose-400 bg-rose-500/10 p-2.5 rounded-xl border border-rose-500/20">
                  {errorMsg}
                </p>
              )}

              <Button
                type="submit"
                isLoading={isLoading}
                variant="primary"
                size="lg"
                className="w-full shadow-gold-glow mt-2 font-bold"
                icon={ArrowRight}
                iconPosition="right"
              >
                Enter Guest Portal
              </Button>
            </motion.form>
          ) : (
            <motion.form
              key="owner-form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onSubmit={handleOwnerLogin}
              className="space-y-4 relative z-10"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-300">
                    Owner / Staff Passcode
                  </label>
                  <button
                    type="button"
                    onClick={fillDemoOwner}
                    className="text-[11px] text-amber-400 hover:underline"
                  >
                    Auto-fill Demo PIN
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    required
                    placeholder="Enter passcode (e.g. owner123)"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
              </div>

              {errorMsg && (
                <p className="text-xs text-rose-400 bg-rose-500/10 p-2.5 rounded-xl border border-rose-500/20">
                  {errorMsg}
                </p>
              )}

              <div className="bg-slate-900/70 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Demo Passcodes:</span>
                <span className="font-mono text-amber-400 font-bold">owner123</span>
                <span className="text-slate-600">or</span>
                <span className="font-mono text-amber-400 font-bold">8899</span>
              </div>

              <Button
                type="submit"
                isLoading={isLoading}
                variant="primary"
                size="lg"
                className="w-full shadow-gold-glow mt-2 font-bold"
                icon={ArrowRight}
                iconPosition="right"
              >
                Unlock Operations Suite
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </Modal>
  );
}
