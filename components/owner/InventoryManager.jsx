'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Grid,
  List,
  Plus,
  Filter,
  Sparkles,
  Bed,
  Users,
  CheckCircle,
  AlertCircle,
  Wrench,
  Brush,
  Tag
} from 'lucide-react';
import { useHotel } from '@/context/HotelContext';
import { useToast } from '@/context/ToastContext';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import AddRoomModal from './AddRoomModal';

export default function InventoryManager() {
  const { rooms, updateRoomStatus } = useHotel();
  const { addToast } = useToast();

  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredRooms = rooms.filter((r) => {
    const matchesCategory =
      categoryFilter === 'All' || r.category === categoryFilter;
    const matchesStatus =
      statusFilter === 'All' || r.status === statusFilter;
    return matchesCategory && matchesStatus;
  });

  const handleQuickStatusChange = (roomId, roomNumber, newStatus) => {
    updateRoomStatus(roomId, newStatus);
    addToast({
      title: 'Room Status Changed',
      message: `Suite ${roomNumber} is now marked as ${newStatus}.`,
      type: newStatus === 'Available' ? 'success' : newStatus === 'Dirty' ? 'warning' : 'info'
    });
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200/90 space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900">Room Inventory & Maintenance</h3>
          <p className="text-xs text-stone-500 mt-0.5">
            Monitor real-time suite readiness, toggle housekeeping states, or provision new luxury suites.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* View Toggle */}
          <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'grid'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-stone-500 hover:text-slate-900'
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'list'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-stone-500 hover:text-slate-900'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Add Room Button */}
          <Button
            onClick={() => setIsAddModalOpen(true)}
            variant="primary"
            size="sm"
            icon={Plus}
          >
            Add New Suite
          </Button>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-stone-100">
        <span className="text-xs font-semibold text-stone-400 mr-1">Filter by:</span>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5">
          {['All', 'Penthouse', 'Ocean View', 'Executive Suite', 'Deluxe'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1 text-xs rounded-xl font-medium transition-all ${
                categoryFilter === cat
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <span className="text-stone-300 mx-1">|</span>

        {/* Status Pills */}
        <div className="flex flex-wrap gap-1.5">
          {['All', 'Available', 'Occupied', 'Dirty', 'Maintenance'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-2.5 py-1 text-xs rounded-xl font-medium transition-all ${
                statusFilter === st
                  ? 'bg-amber-500 text-slate-950 font-semibold'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* GRID VIEW */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredRooms.map((room) => (
            <div
              key={room.id}
              className="bg-stone-50 rounded-2xl p-4 border border-stone-200/90 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden"
            >
              <div>
                <div className="relative h-36 rounded-xl overflow-hidden mb-3">
                  <img
                    src={room.images[0]}
                    alt={room.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <Badge variant={room.status} showDot size="sm">
                      {room.status}
                    </Badge>
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-0.5 rounded-lg border border-white/10">
                    ${room.price} / nt
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
                  <span className="uppercase text-amber-600 font-bold">{room.category}</span>
                  <span>Suite {room.number}</span>
                </div>

                <h4 className="text-base font-bold text-slate-900 mt-1 line-clamp-1">
                  {room.name}
                </h4>
                <p className="text-xs text-stone-500 mt-0.5">{room.floor} • {room.bed}</p>
              </div>

              {/* Quick Status Switcher Toolbar */}
              <div className="mt-4 pt-3 border-t border-stone-200/80">
                <span className="text-[10px] uppercase font-bold text-stone-400 block mb-1.5">
                  Set Room State
                </span>
                <div className="grid grid-cols-4 gap-1">
                  {[
                    { key: 'Available', label: 'Ready', color: 'hover:bg-emerald-100 hover:text-emerald-800' },
                    { key: 'Occupied', label: 'Occupied', color: 'hover:bg-rose-100 hover:text-rose-800' },
                    { key: 'Dirty', label: 'Dirty', color: 'hover:bg-amber-100 hover:text-amber-800' },
                    { key: 'Maintenance', label: 'Repair', color: 'hover:bg-stone-200 hover:text-slate-900' }
                  ].map((s) => (
                    <button
                      key={s.key}
                      onClick={() => handleQuickStatusChange(room.id, room.number, s.key)}
                      className={`px-1.5 py-1 text-[11px] rounded-lg font-semibold transition-all border ${
                        room.status === s.key
                          ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                          : `bg-white text-stone-600 border-stone-200 ${s.color}`
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* LIST VIEW */}
      {viewMode === 'list' && (
        <div className="overflow-x-auto rounded-2xl border border-stone-200/80">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-stone-50 text-stone-500 font-semibold border-b border-stone-200 uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Suite</th>
                <th className="py-3 px-4">Name & Category</th>
                <th className="py-3 px-4">Floor & Specs</th>
                <th className="py-3 px-4">Price / Night</th>
                <th className="py-3 px-4">Current Status</th>
                <th className="py-3 px-4 text-right">Quick State Toggle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredRooms.map((room) => (
                <tr key={room.id} className="hover:bg-amber-50/20 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">
                    Suite {room.number}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-900">{room.name}</div>
                    <div className="text-[11px] text-amber-600 font-medium">{room.category}</div>
                  </td>
                  <td className="py-3 px-4 text-stone-600">
                    <div>{room.floor}</div>
                    <div className="text-[11px] text-stone-400">{room.bed} • {room.size}</div>
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-900">
                    ${room.price}
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant={room.status} showDot size="sm">
                      {room.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <select
                      value={room.status}
                      onChange={(e) =>
                        handleQuickStatusChange(room.id, room.number, e.target.value)
                      }
                      className="px-2 py-1 rounded-xl border border-stone-200 text-xs font-semibold text-slate-800 bg-white hover:border-amber-400 cursor-pointer"
                    >
                      <option value="Available">Available</option>
                      <option value="Occupied">Occupied</option>
                      <option value="Dirty">Dirty (Needs Clean)</option>
                      <option value="Maintenance">Maintenance</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Room Modal */}
      <AddRoomModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}
