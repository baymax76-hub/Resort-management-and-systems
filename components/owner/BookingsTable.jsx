'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Calendar,
  User,
  CreditCard,
  ChevronDown,
  Sparkles,
  CheckCircle2,
  Clock,
  XCircle,
  ArrowUpDown
} from 'lucide-react';
import { useHotel } from '@/context/HotelContext';
import { useToast } from '@/context/ToastContext';
import Badge from '../ui/Badge';

export default function BookingsTable() {
  const { bookings, updateBookingStatus } = useHotel();
  const { addToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.bookingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.roomNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.roomName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'All' || b.stayStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (bookingId, guestName, newStatus) => {
    updateBookingStatus(bookingId, newStatus);
    addToast({
      title: 'Booking Updated',
      message: `Status for ${guestName} (${bookingId}) changed to ${newStatus}.`,
      type: newStatus === 'Cancelled' ? 'warning' : 'success'
    });
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm border border-stone-200/90 space-y-4 sm:space-y-5">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900">Reservations & Stay Ledger</h3>
          <p className="text-xs text-stone-500 mt-0.5">
            Real-time management of active guest check-ins, payments, and suite assignments.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 w-full sm:w-auto">
          {/* Search Box */}
          <div className="relative min-w-[180px] w-full sm:w-auto flex-1 sm:flex-initial">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search guest, ID, suite..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500 bg-stone-50 focus:bg-white"
            />
          </div>

          {/* Status Filter Pill Dropdown */}
          <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200 text-xs overflow-x-auto no-scrollbar w-full sm:w-auto">
            {['All', 'Confirmed', 'Checked-In', 'Completed', 'Cancelled'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-2.5 sm:px-3 py-1 rounded-lg font-medium transition-all shrink-0 ${
                  statusFilter === st
                    ? 'bg-white text-slate-900 shadow-sm font-semibold'
                    : 'text-stone-600 hover:text-slate-900'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="overflow-x-auto rounded-2xl border border-stone-200/80 -webkit-overflow-scrolling-touch">
        <table className="w-full min-w-[640px] text-left border-collapse text-xs">
          <thead>
            <tr className="bg-stone-50/90 text-stone-500 font-semibold border-b border-stone-200 uppercase tracking-wider text-[10px]">
              <th className="py-3 px-4">Booking Ref</th>
              <th className="py-3 px-4">Guest Details</th>
              <th className="py-3 px-4">Assigned Suite</th>
              <th className="py-3 px-4">Stay Dates</th>
              <th className="py-3 px-4">Payment</th>
              <th className="py-3 px-4">Stay Status</th>
              <th className="py-3 px-4 text-right">Quick Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {filteredBookings.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-stone-400">
                  No reservations found matching your criteria.
                </td>
              </tr>
            ) : (
              filteredBookings.map((b) => (
                <tr
                  key={b.id}
                  className="hover:bg-amber-50/30 transition-colors group"
                >
                  {/* Reference */}
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                    {b.bookingNumber || b.id}
                  </td>

                  {/* Guest */}
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-900">{b.guestName}</div>
                    <div className="text-[11px] text-stone-400">{b.guestEmail}</div>
                    {b.specialRequests && b.specialRequests !== 'None' && (
                      <div className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded mt-1 max-w-[200px] truncate">
                        Pref: {b.specialRequests}
                      </div>
                    )}
                  </td>

                  {/* Room */}
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-900">
                      Suite {b.roomNumber}
                    </div>
                    <div className="text-[11px] text-stone-500">{b.roomName}</div>
                  </td>

                  {/* Dates */}
                  <td className="py-3.5 px-4">
                    <div className="font-medium text-slate-800">
                      {b.checkIn} <span className="text-stone-400">→</span> {b.checkOut}
                    </div>
                    <div className="text-[11px] text-stone-400">
                      {b.nights} {b.nights === 1 ? 'Night' : 'Nights'} • {b.adults} Adults
                    </div>
                  </td>

                  {/* Payment */}
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">
                      ${Number(b.totalPrice).toLocaleString()}
                    </div>
                    <div className="mt-0.5">
                      <Badge
                        variant={b.paymentStatus === 'Paid' ? 'Paid' : 'Maintenance'}
                        size="sm"
                      >
                        {b.paymentStatus}
                      </Badge>
                    </div>
                  </td>

                  {/* Stay Status */}
                  <td className="py-3.5 px-4">
                    <Badge variant={b.stayStatus} showDot size="sm">
                      {b.stayStatus}
                    </Badge>
                  </td>

                  {/* Dynamic Status Dropdown */}
                  <td className="py-3.5 px-4 text-right">
                    <select
                      value={b.stayStatus}
                      onChange={(e) =>
                        handleStatusChange(b.id, b.guestName, e.target.value)
                      }
                      className="px-2.5 py-1.5 rounded-xl border border-stone-200 text-xs font-semibold text-slate-800 bg-white hover:border-amber-400 focus:outline-none focus:border-amber-500 shadow-sm cursor-pointer"
                    >
                      <option value="Confirmed">Confirmed</option>
                      <option value="Checked-In">Checked-In</option>
                      <option value="Completed">Check-Out / Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
