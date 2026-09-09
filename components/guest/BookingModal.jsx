'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Calendar,
  CreditCard,
  CheckCircle2,
  Users,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Lock,
  Building,
  QrCode,
  FileText
} from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { useHotel } from '@/context/HotelContext';
import { useToast } from '@/context/ToastContext';

export default function BookingModal({
  isOpen,
  onClose,
  selectedRoom,
  initialCheckIn,
  initialCheckOut,
  initialGuests,
  onBookingSuccess
}) {
  const { bookRoom, currentUser } = useHotel();
  const { addToast } = useToast();

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    guestName: currentUser?.name || 'Alexander Hayes',
    guestEmail: currentUser?.email || 'alex.hayes@apexcapital.io',
    guestPhone: '+1 (555) 749-2810',
    checkIn: initialCheckIn || '2026-09-08',
    checkOut: initialCheckOut || '2026-09-12',
    adults: initialGuests?.adults || 2,
    children: initialGuests?.children || 0,
    specialRequests: 'High floor ocean view if possible, quiet zone.',
    paymentMethod: 'credit-card', // 'credit-card' | 'pay-at-checkin'
    cardNumber: '4242 •••• •••• 9104',
    cardExpiry: '08/29',
    cardCvc: '884',
    cardHolder: 'ALEXANDER HAYES'
  });

  // Calculate nights & pricing
  const calculateNights = () => {
    try {
      const start = new Date(formData.checkIn);
      const end = new Date(formData.checkOut);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return isNaN(diffDays) || diffDays <= 0 ? 3 : diffDays;
    } catch {
      return 3;
    }
  };

  const nights = calculateNights();
  const baseRate = selectedRoom?.price || 450;
  const subtotal = baseRate * nights;
  const tax = Math.round(subtotal * 0.18 * 100) / 100;
  const serviceFee = 45;
  const grandTotal = subtotal + tax + serviceFee;

  // Reset modal state on open
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setConfirmedBooking(null);
      if (initialCheckIn) setFormData((prev) => ({ ...prev, checkIn: initialCheckIn }));
      if (initialCheckOut) setFormData((prev) => ({ ...prev, checkOut: initialCheckOut }));
    }
  }, [isOpen, initialCheckIn, initialCheckOut]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (!formData.guestName || !formData.guestEmail) {
        addToast({
          title: 'Missing Details',
          message: 'Please provide guest name and contact email.',
          type: 'warning'
        });
        return;
      }
      setStep(2);
    } else if (step === 2) {
      handleFinalizeBooking();
    }
  };

  const handleFinalizeBooking = () => {
    setIsSubmitting(true);

    setTimeout(() => {
      const newBooking = bookRoom({
        roomId: selectedRoom.id,
        roomName: selectedRoom.name,
        roomNumber: selectedRoom.number,
        roomType: selectedRoom.type,
        guestName: formData.guestName,
        guestEmail: formData.guestEmail,
        guestPhone: formData.guestPhone,
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        nights,
        adults: Number(formData.adults),
        children: Number(formData.children),
        baseRate,
        paymentMethod:
          formData.paymentMethod === 'credit-card'
            ? `Credit Card (${formData.cardNumber.slice(-4)})`
            : 'Pay at Check-in',
        specialRequests: formData.specialRequests
      });

      setConfirmedBooking(newBooking);
      setIsSubmitting(false);
      setStep(3);

      // Trigger Celebration Confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        console.error(e);
      }

      addToast({
        title: 'Booking Confirmed!',
        message: `Suite ${selectedRoom.number} is secured for ${formData.guestName}.`,
        type: 'gold'
      });
    }, 1000);
  };

  const handleFinishAndNavigate = () => {
    onClose();
    if (onBookingSuccess) {
      onBookingSuccess(confirmedBooking);
    }
  };

  if (!selectedRoom) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        step === 3
          ? 'Booking Confirmed!'
          : `Reserve ${selectedRoom.name}`
      }
      subtitle={
        step === 1
          ? 'Step 1 of 2: Guest Details & Dates'
          : step === 2
          ? 'Step 2 of 2: Review & Secure Payment'
          : `Reservation Reference: ${confirmedBooking?.bookingNumber || 'RES-9901'}`
      }
      maxWidth="max-w-3xl"
    >
      {/* Step Progress Indicators */}
      {step < 3 && (
        <div className="mb-6 flex items-center justify-between relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-stone-200 dark:bg-slate-700 -z-0" />
          <div className="relative z-10 flex items-center gap-2 bg-white dark:bg-slate-900 pr-2 sm:pr-3">
            <span
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                step >= 1 ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-stone-200 dark:bg-slate-700 text-stone-600 dark:text-slate-300'
              }`}
            >
              1
            </span>
            <span className="hidden sm:inline text-xs font-semibold text-slate-800 dark:text-white">Guest Information</span>
            <span className="sm:hidden text-xs font-semibold text-slate-800 dark:text-white">Guest Info</span>
          </div>

          <div className="relative z-10 flex items-center gap-2 bg-white dark:bg-slate-900 pl-2 sm:pl-3">
            <span
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                step >= 2 ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-stone-200 dark:bg-slate-700 text-stone-600 dark:text-slate-300'
              }`}
            >
              2
            </span>
            <span className="hidden sm:inline text-xs font-semibold text-slate-800 dark:text-white">Payment & Confirm</span>
            <span className="sm:hidden text-xs font-semibold text-slate-800 dark:text-white">Payment</span>
          </div>
        </div>
      )}

      {/* STEP 1: GUEST & DATE DETAILS */}
      {step === 1 && (
        <motion.form
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          onSubmit={handleNextStep}
          className="space-y-5"
        >
          {/* Room Banner Summary */}
          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/80 flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <img
                src={selectedRoom.images[0]}
                alt={selectedRoom.name}
                className="w-16 h-16 rounded-xl object-cover shadow-sm shrink-0"
              />
              <div>
                <span className="text-[11px] uppercase font-bold text-amber-600 tracking-wider">
                  Suite {selectedRoom.number} • {selectedRoom.category}
                </span>
                <h4 className="text-base font-bold text-slate-900 leading-snug">
                  {selectedRoom.name}
                </h4>
                <p className="text-xs text-stone-500">${baseRate} / night • {selectedRoom.bed}</p>
              </div>
            </div>
            <div className="text-right hidden sm:block">
              <span className="text-xs text-stone-400 block">Est. Duration</span>
              <span className="text-sm font-bold text-slate-900">{nights} Nights</span>
            </div>
          </div>

          {/* Dates & Guests Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1.5">
                Check-in Date
              </label>
              <input
                type="date"
                value={formData.checkIn}
                onChange={(e) => handleChange('checkIn', e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none text-sm text-slate-900 bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1.5">
                Check-out Date
              </label>
              <input
                type="date"
                value={formData.checkOut}
                onChange={(e) => handleChange('checkOut', e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none text-sm text-slate-900 bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1.5">
                Adults
              </label>
              <select
                value={formData.adults}
                onChange={(e) => handleChange('adults', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none text-sm text-slate-900 bg-white"
              >
                <option value={1}>1 Adult</option>
                <option value={2}>2 Adults</option>
                <option value={3}>3 Adults</option>
                <option value={4}>4 Adults</option>
                <option value={6}>6 Adults</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1.5">
                Children
              </label>
              <select
                value={formData.children}
                onChange={(e) => handleChange('children', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none text-sm text-slate-900 bg-white"
              >
                <option value={0}>0 Children</option>
                <option value={1}>1 Child</option>
                <option value={2}>2 Children</option>
                <option value={3}>3 Children</option>
              </select>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-4 pt-2 border-t border-stone-100">
            <h5 className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Primary Guest Contact
            </h5>
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1.5">
                Full Legal Name
              </label>
              <input
                type="text"
                placeholder="e.g. Lord Alexander Hayes"
                value={formData.guestName}
                onChange={(e) => handleChange('guestName', e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none text-sm text-slate-900 bg-white"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1.5">
                  Email Address (for confirmation & key)
                </label>
                <input
                  type="email"
                  placeholder="alexander@example.com"
                  value={formData.guestEmail}
                  onChange={(e) => handleChange('guestEmail', e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none text-sm text-slate-900 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.guestPhone}
                  onChange={(e) => handleChange('guestPhone', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none text-sm text-slate-900 bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1.5">
                Special In-Room Preferences & Requests
              </label>
              <textarea
                rows={2}
                placeholder="Early check-in, featherless bedding, airport limousine pickup..."
                value={formData.specialRequests}
                onChange={(e) => handleChange('specialRequests', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none text-sm text-slate-900 bg-white resize-none"
              />
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-stone-100">
            <div>
              <span className="text-xs text-stone-400 block font-medium">Estimated Total</span>
              <span className="text-xl font-bold text-slate-900">${grandTotal.toLocaleString()}</span>
            </div>
            <Button type="submit" variant="primary" size="lg" icon={ArrowRight} iconPosition="right" className="w-full sm:w-auto justify-center">
              Proceed to Payment
            </Button>
          </div>
        </motion.form>
      )}

      {/* STEP 2: PAYMENT & ITEMIZED REVIEW */}
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-6"
        >
          {/* Payment Method Switcher */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
              Select Payment Method
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleChange('paymentMethod', 'credit-card')}
                className={`p-4 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                  formData.paymentMethod === 'credit-card'
                    ? 'border-amber-500 bg-amber-50/40 text-slate-950 shadow-sm'
                    : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    formData.paymentMethod === 'credit-card'
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-stone-100 text-stone-600'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-sm font-bold leading-tight">Credit / Debit Card</h5>
                  <p className="text-[11px] text-stone-500">Instant instant confirmation</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleChange('paymentMethod', 'pay-at-checkin')}
                className={`p-4 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                  formData.paymentMethod === 'pay-at-checkin'
                    ? 'border-amber-500 bg-amber-50/40 text-slate-950 shadow-sm'
                    : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    formData.paymentMethod === 'pay-at-checkin'
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-stone-100 text-stone-600'
                  }`}
                >
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-sm font-bold leading-tight">Pay at Check-In</h5>
                  <p className="text-[11px] text-stone-500">Pay upon arrival at resort</p>
                </div>
              </button>
            </div>
          </div>

          {/* Credit Card Simulation Inputs */}
          {formData.paymentMethod === 'credit-card' && (
            <div className="bg-stone-900 text-white rounded-3xl p-5 border border-stone-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono tracking-widest text-amber-400">
                  SECURE LUXURY TRANSACTION
                </span>
                <Lock className="w-4 h-4 text-emerald-400" />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold tracking-wider text-stone-400 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  value={formData.cardNumber}
                  onChange={(e) => handleChange('cardNumber', e.target.value)}
                  className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3.5 py-2 text-sm font-mono text-white tracking-widest focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-stone-400 mb-1">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    value={formData.cardHolder}
                    onChange={(e) => handleChange('cardHolder', e.target.value)}
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400 uppercase"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-stone-400 mb-1">
                      Expiry
                    </label>
                    <input
                      type="text"
                      value={formData.cardExpiry}
                      onChange={(e) => handleChange('cardExpiry', e.target.value)}
                      className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-sm font-mono text-white text-center focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-stone-400 mb-1">
                      CVV
                    </label>
                    <input
                      type="password"
                      value={formData.cardCvc}
                      onChange={(e) => handleChange('cardCvc', e.target.value)}
                      maxLength={4}
                      className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-sm font-mono text-white text-center focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Itemized Price Breakdown Table */}
          <div className="bg-stone-50 rounded-2xl p-4 sm:p-5 border border-stone-200/90 space-y-2.5">
            <h5 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
              Itemized Price Summary
            </h5>
            <div className="flex justify-between text-xs sm:text-sm text-stone-700">
              <span>
                Base Rate ({nights} nights × ${baseRate})
              </span>
              <span className="font-semibold">${subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs sm:text-sm text-stone-700">
              <span>Luxury Resort Tax & VAT (18%)</span>
              <span className="font-semibold">${tax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs sm:text-sm text-stone-700">
              <span>Concierge & Resort Service Fee</span>
              <span className="font-semibold">${serviceFee.toLocaleString()}</span>
            </div>
            <div className="pt-3 border-t border-stone-200 flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
              <div>
                <span className="text-base font-bold text-slate-900">Total Amount Due</span>
                <span className="text-[11px] text-stone-500 block">
                  {formData.paymentMethod === 'credit-card'
                    ? 'Charged securely to your card now'
                    : 'Payable at reception desk on arrival'}
                </span>
              </div>
              <span className="text-2xl font-extrabold text-slate-900">
                ${grandTotal.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            <Button
              type="button"
              onClick={() => setStep(1)}
              variant="outline"
              size="md"
              icon={ArrowLeft}
              className="w-full sm:w-auto justify-center"
            >
              Back to Details
            </Button>

            <Button
              type="button"
              onClick={handleFinalizeBooking}
              isLoading={isSubmitting}
              variant="primary"
              size="lg"
              className="w-full sm:w-auto justify-center px-6 shadow-gold-glow"
            >
              {formData.paymentMethod === 'credit-card'
                ? `Pay $${grandTotal.toLocaleString()} & Confirm`
                : 'Confirm Reservation'}
            </Button>
          </div>
        </motion.div>
      )}

      {/* STEP 3: INSTANT CONFIRMATION RECEIPT & QR ACCESS */}
      {step === 3 && confirmedBooking && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6 py-2"
        >
          {/* Animated Celebration Icon */}
          <div className="w-20 h-20 rounded-3xl bg-emerald-50 text-emerald-600 border border-emerald-200 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/10">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              <Sparkles className="w-3.5 h-3.5" />
              Reservation Guaranteed
            </span>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-2">
              We look forward to welcoming you, {confirmedBooking.guestName}!
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Confirmation receipt and digital room credentials have been sent to{' '}
              <strong className="text-slate-800">{confirmedBooking.guestEmail}</strong>.
            </p>
          </div>

          {/* Booking Summary Box */}
          <div className="bg-stone-50 rounded-3xl p-5 border border-stone-200/90 text-left space-y-3">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs border-b border-stone-200 pb-3">
              <div>
                <span className="text-stone-400 block">Booking Reference</span>
                <span className="font-mono font-bold text-slate-900">
                  {confirmedBooking.bookingNumber}
                </span>
              </div>
              <div>
                <span className="text-stone-400 block">Reserved Room</span>
                <span className="font-bold text-slate-900">
                  Suite {confirmedBooking.roomNumber}
                </span>
              </div>
              <div>
                <span className="text-stone-400 block">Check-In</span>
                <span className="font-bold text-slate-900">{confirmedBooking.checkIn}</span>
              </div>
              <div>
                <span className="text-stone-400 block">Total Paid</span>
                <span className="font-bold text-emerald-600">
                  ${confirmedBooking.totalPrice.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs pt-1">
              <span className="text-stone-600">
                Digital Key Access PIN: <strong className="font-mono text-amber-600 text-sm">{confirmedBooking.digitalKeyPin}</strong>
              </span>
              <span className="text-stone-500">Status: <strong className="text-emerald-600 font-semibold">{confirmedBooking.stayStatus}</strong></span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Button
              onClick={handleFinishAndNavigate}
              variant="primary"
              size="lg"
              className="w-full sm:w-auto shadow-gold-glow"
              icon={QrCode}
            >
              Access Digital Key & My Stays
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              Back to Explorer
            </Button>
          </div>
        </motion.div>
      )}
    </Modal>
  );
}
