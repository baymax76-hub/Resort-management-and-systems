'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Utensils,
  Clock,
  Wine,
  Briefcase,
  Brush,
  Plus,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Send,
  Bed,
  BellRing
} from 'lucide-react';
import { SERVICE_OPTIONS } from '@/data/mockData';
import { useHotel } from '@/context/HotelContext';
import { useToast } from '@/context/ToastContext';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

export default function ServiceRequests({ activeBooking }) {
  const { requests, createServiceRequest } = useHotel();
  const { addToast } = useToast();

  const [customDescription, setCustomDescription] = useState('');
  const [customCategory, setCustomCategory] = useState('Housekeeping');
  const [customPriority, setCustomPriority] = useState('Medium');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('catalog'); // 'catalog' | 'history'

  const currentRoomNumber = activeBooking?.roomNumber || '101';
  const currentGuestName = activeBooking?.guestName || 'Valued Guest';

  // Filter requests belonging to this guest/room
  const myRequests = requests.filter(
    (r) =>
      r.roomNumber === currentRoomNumber ||
      (activeBooking && r.bookingId === activeBooking.id) ||
      r.guestName === currentGuestName
  );

  const handleQuickRequest = (service) => {
    setIsSubmitting(true);
    setTimeout(() => {
      createServiceRequest({
        bookingId: activeBooking?.id || 'BK-8941',
        roomNumber: currentRoomNumber,
        guestName: currentGuestName,
        serviceType: service.title,
        category: service.category,
        description: `${service.subtitle} - Requested via quick in-stay concierge.`,
        priority: service.priority
      });

      setIsSubmitting(false);
      addToast({
        title: 'Request Dispatched',
        message: `${service.title} has been forwarded to resort staff for Room ${currentRoomNumber}. (ETA: ${service.eta})`,
        type: 'gold'
      });
    }, 400);
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customDescription.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      createServiceRequest({
        bookingId: activeBooking?.id || 'BK-8941',
        roomNumber: currentRoomNumber,
        guestName: currentGuestName,
        serviceType: 'Custom Guest Request',
        category: customCategory,
        description: customDescription,
        priority: customPriority
      });

      setCustomDescription('');
      setIsSubmitting(false);
      addToast({
        title: 'Concierge Notified',
        message: 'Your custom request has been routed to the resort management team.',
        type: 'success'
      });
    }, 400);
  };

  const getServiceIcon = (iconName) => {
    switch (iconName) {
      case 'Sparkles':
        return Sparkles;
      case 'Brush':
        return Brush;
      case 'Utensils':
        return Utensils;
      case 'Clock':
        return Clock;
      case 'Briefcase':
        return Briefcase;
      case 'Wine':
        return Wine;
      default:
        return BellRing;
    }
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-sm border border-stone-200/90 space-y-5 sm:space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-b border-stone-100 pb-4 sm:pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-amber-600">
            <BellRing className="w-4 h-4" />
            <span>24/7 Digital Concierge & In-Room Services</span>
          </div>
          <h3 className="text-lg sm:text-2xl font-bold text-slate-900 mt-1">
            Guest Services for Suite {currentRoomNumber}
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">
            1-Click requests are instantly routed to our on-duty butler & housekeeping crew.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center bg-stone-100 p-1 rounded-2xl border border-stone-200 shrink-0">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-xl transition-all ${
              activeTab === 'catalog'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-stone-600 hover:text-slate-900'
            }`}
          >
            Service Catalog
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'history'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-stone-600 hover:text-slate-900'
            }`}
          >
            <span>Live Requests</span>
            {myRequests.length > 0 && (
              <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-bold flex items-center justify-center">
                {myRequests.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* VIEW 1: CATALOG OF 1-CLICK QUICK SERVICES */}
      {activeTab === 'catalog' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="space-y-6"
        >
          {/* Quick Buttons Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICE_OPTIONS.map((srv) => {
              const IconComponent = getServiceIcon(srv.icon);
              return (
                <motion.div
                  key={srv.id}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="bg-stone-50 hover:bg-amber-50/40 border border-stone-200/80 hover:border-amber-400/60 rounded-2xl p-5 transition-all flex flex-col justify-between group cursor-pointer shadow-sm hover:shadow-md"
                  onClick={() => handleQuickRequest(srv)}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-stone-200 flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-semibold text-stone-500 bg-white/80 px-2 py-0.5 rounded-full border border-stone-200">
                        ETA: {srv.eta}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 mt-3 group-hover:text-amber-700 transition-colors">
                      {srv.title}
                    </h4>
                    <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                      {srv.subtitle}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-200/60 flex items-center justify-between text-xs font-semibold text-amber-700">
                    <span>Dispatch 1-Click Order</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Custom Request Form */}
          <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200/80">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              Custom Concierge Request
            </h4>
            <p className="text-xs text-stone-500 mt-0.5">
              Need personalized dining, spa booking, transport, or special amenities? Tell us what you need.
            </p>

            <form onSubmit={handleCustomSubmit} className="mt-4 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                    Department / Category
                  </label>
                  <select
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-slate-900 bg-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Housekeeping">Housekeeping & Linens</option>
                    <option value="Dining">In-Room Dining & Chef</option>
                    <option value="Concierge">Concierge & Excursions</option>
                    <option value="Front Desk">Front Desk & Checkout</option>
                    <option value="Maintenance">Room Tech & Maintenance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                    Urgency Priority
                  </label>
                  <select
                    value={customPriority}
                    onChange={(e) => setCustomPriority(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-slate-900 bg-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Low">Low - Whenever available</option>
                    <option value="Medium">Medium - Within 30 minutes</option>
                    <option value="High">High - Urgent (Within 10 minutes)</option>
                  </select>
                </div>
              </div>

              <div>
                <textarea
                  rows={2}
                  placeholder="Describe your request in detail (e.g. ice bucket, fresh mint tea, extra hypoallergenic pillows)..."
                  value={customDescription}
                  onChange={(e) => setCustomDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs text-slate-900 bg-white focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={!customDescription.trim()}
                  isLoading={isSubmitting}
                  variant="navy"
                  size="sm"
                  icon={Send}
                  iconPosition="right"
                >
                  Send Request to Front Desk
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      )}

      {/* VIEW 2: LIVE REQUESTS TRACKER */}
      {activeTab === 'history' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="space-y-4"
        >
          {myRequests.length === 0 ? (
            <div className="text-center py-10 bg-stone-50 rounded-2xl border border-stone-200/80">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto opacity-70" />
              <h4 className="text-sm font-bold text-slate-800 mt-2">No active service tickets</h4>
              <p className="text-xs text-stone-500 mt-1">
                You haven't requested any room services yet. Select from our catalog above!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {myRequests.map((req) => (
                <div
                  key={req.id}
                  className="p-4 rounded-2xl border border-stone-200/90 bg-stone-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        req.status === 'Completed'
                          ? 'bg-emerald-100 text-emerald-700'
                          : req.status === 'In Progress'
                          ? 'bg-sky-100 text-sky-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {req.status === 'Completed' ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : req.status === 'In Progress' ? (
                        <Clock className="w-5 h-5 animate-spin" />
                      ) : (
                        <BellRing className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-900">{req.serviceType}</h4>
                        <span className="text-[10px] text-stone-400 font-mono">({req.id})</span>
                      </div>
                      <p className="text-xs text-stone-600 mt-0.5">{req.description}</p>
                      <div className="flex items-center gap-3 mt-1.5 text-[11px] text-stone-400">
                        <span>Category: {req.category}</span>
                        <span>•</span>
                        <span>Time: {req.timestamp}</span>
                        <span>•</span>
                        <span>Priority: {req.priority}</span>
                      </div>
                    </div>
                  </div>

                  <div className="sm:self-center shrink-0">
                    <Badge variant={req.status} showDot>
                      {req.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
