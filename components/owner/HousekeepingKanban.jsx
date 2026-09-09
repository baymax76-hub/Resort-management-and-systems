'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  Play,
  Check,
  Trash2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Bed,
  BellRing
} from 'lucide-react';
import { useHotel } from '@/context/HotelContext';
import { useToast } from '@/context/ToastContext';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

export default function HousekeepingKanban() {
  const { requests, updateRequestStatus, deleteRequest } = useHotel();
  const { addToast } = useToast();

  const columns = [
    {
      id: 'Pending',
      title: 'Pending Requests',
      subtitle: 'Awaiting butler / staff assignment',
      color: 'border-amber-400 bg-amber-500/10 text-amber-800',
      badgeColor: 'bg-amber-500 text-slate-950',
      items: requests.filter((r) => r.status === 'Pending')
    },
    {
      id: 'In Progress',
      title: 'In Progress',
      subtitle: 'Staff actively attending to suite',
      color: 'border-sky-400 bg-sky-500/10 text-sky-800',
      badgeColor: 'bg-sky-500 text-white',
      items: requests.filter((r) => r.status === 'In Progress')
    },
    {
      id: 'Completed',
      title: 'Completed & Resolved',
      subtitle: 'Fulfilled service tickets',
      color: 'border-emerald-400 bg-emerald-500/10 text-emerald-800',
      badgeColor: 'bg-emerald-600 text-white',
      items: requests.filter((r) => r.status === 'Completed')
    }
  ];

  const handleAdvanceStatus = (req, targetStatus) => {
    updateRequestStatus(req.id, targetStatus);
    addToast({
      title: 'Ticket Updated',
      message: `${req.serviceType} (Room ${req.roomNumber}) moved to ${targetStatus}.`,
      type: targetStatus === 'Completed' ? 'success' : 'info'
    });
  };

  const handleDelete = (req) => {
    deleteRequest(req.id);
    addToast({
      title: 'Ticket Removed',
      message: `Ticket ${req.id} for Room ${req.roomNumber} deleted.`,
      type: 'warning'
    });
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200/90 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span>Housekeeping & In-Stay Dispatch Kanban</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">
            Real-time feed of guest service orders dispatched live from the guest in-stay app.
          </p>
        </div>

        <div className="text-xs text-stone-500 bg-stone-100 px-3 py-1.5 rounded-xl border border-stone-200">
          Total Active Tickets: <strong className="text-slate-900">{requests.length}</strong>
        </div>
      </div>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {columns.map((col) => (
          <div
            key={col.id}
            className="bg-stone-50 rounded-3xl p-4 border border-stone-200/90 flex flex-col min-h-[450px]"
          >
            {/* Column Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-200/80">
              <div>
                <h4 className="text-sm font-bold text-slate-900">{col.title}</h4>
                <p className="text-[11px] text-stone-500">{col.subtitle}</p>
              </div>
              <span
                className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center shadow-sm ${col.badgeColor}`}
              >
                {col.items.length}
              </span>
            </div>

            {/* Column Tickets Feed */}
            <div className="space-y-3 flex-1 overflow-y-auto max-h-[600px] pr-1">
              <AnimatePresence mode="popLayout">
                {col.items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-12 text-center text-xs text-stone-400 border border-dashed border-stone-200 rounded-2xl"
                  >
                    No tickets in this lane
                  </motion.div>
                ) : (
                  col.items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      className="bg-white rounded-2xl p-4 border border-stone-200/90 shadow-sm hover:shadow-md transition-all space-y-3"
                    >
                      {/* Ticket Header */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-extrabold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                              Room {item.roomNumber}
                            </span>
                            <span className="text-[10px] font-mono text-stone-400">
                              {item.id}
                            </span>
                          </div>
                          <h5 className="text-sm font-bold text-slate-900 mt-1.5 leading-snug">
                            {item.serviceType}
                          </h5>
                        </div>

                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            item.priority === 'High'
                              ? 'bg-rose-50 text-rose-700 border-rose-200'
                              : item.priority === 'Medium'
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : 'bg-stone-100 text-stone-600 border-stone-200'
                          }`}
                        >
                          {item.priority}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-stone-600 leading-relaxed bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                        {item.description}
                      </p>

                      {/* Footer Details */}
                      <div className="flex items-center justify-between text-[11px] text-stone-400 pt-1">
                        <span>Guest: <strong className="text-slate-700">{item.guestName}</strong></span>
                        <span>{item.timestamp}</span>
                      </div>

                      {/* Action Controls */}
                      <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
                        {col.id === 'Pending' && (
                          <>
                            <button
                              onClick={() => handleDelete(item)}
                              className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                              title="Dismiss Ticket"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                            <Button
                              onClick={() => handleAdvanceStatus(item, 'In Progress')}
                              variant="primary"
                              size="sm"
                              className="w-full text-xs py-1"
                              icon={Play}
                            >
                              Start Work
                            </Button>
                          </>
                        )}

                        {col.id === 'In Progress' && (
                          <>
                            <button
                              onClick={() => handleAdvanceStatus(item, 'Pending')}
                              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
                              title="Move back to Pending"
                            >
                              <ArrowLeft className="w-3.5 h-3.5" />
                            </button>
                            <Button
                              onClick={() => handleAdvanceStatus(item, 'Completed')}
                              variant="emerald"
                              size="sm"
                              className="w-full text-xs py-1"
                              icon={Check}
                            >
                              Mark Resolved
                            </Button>
                          </>
                        )}

                        {col.id === 'Completed' && (
                          <div className="w-full flex items-center justify-between">
                            <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Fulfilled
                            </span>
                            <button
                              onClick={() => handleDelete(item)}
                              className="text-[11px] text-stone-400 hover:text-rose-600 underline"
                            >
                              Archive
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
