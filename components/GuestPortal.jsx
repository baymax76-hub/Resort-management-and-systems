'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Calendar,
  Users,
  Sparkles,
  Key,
  ShieldCheck,
  Compass,
  SlidersHorizontal,
  Sun,
  Bed,
  QrCode,
  CheckCircle,
  FileText,
  DollarSign,
  Heart,
  ChevronRight,
  ArrowRight,
  MapPin,
  Star,
  LogOut,
  Award
} from 'lucide-react';
import { useHotel } from '@/context/HotelContext';
import { useToast } from '@/context/ToastContext';
import RoomCard from './guest/RoomCard';
import BookingModal from './guest/BookingModal';
import ServiceRequests from './guest/ServiceRequests';
import QRModal from './ui/QRModal';
import Button from './ui/Button';
import Badge from './ui/Badge';
import ThemeToggle from './ui/ThemeToggle';
import ResortMap from './map/ResortMap';
import ReviewSection from './reviews/ReviewSection';
import AIConciergeWidget from './ai/AIConciergeWidget';
import GuestSidebar from './ui/GuestSidebar';

export default function GuestPortal({ onSwitchRole }) {
  const { rooms, bookings, currentUser, activeGuestBooking, updateBookingStatus } = useHotel();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState('discover'); // 'discover' | 'mystay' | 'services' | 'map' | 'reviews'
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState(1500);

  // Filters
  const [checkInDate, setCheckInDate] = useState('2026-09-08');
  const [checkOutDate, setCheckOutDate] = useState('2026-09-12');
  const [guestsCount, setGuestsCount] = useState(2);

  // Modals
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [activeBookingForQR, setActiveBookingForQR] = useState(null);

  // Filter rooms
  const filteredRooms = rooms.filter((room) => {
    const matchesCategory =
      selectedCategory === 'All' || room.category === selectedCategory;
    const matchesSearch =
      room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.amenities.some((a) => a.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesPrice = room.price <= maxPrice;
    return matchesCategory && matchesSearch && matchesPrice;
  });

  const handleBookNow = (room) => {
    setSelectedRoomForBooking(room);
    setIsBookingModalOpen(true);
  };

  const handleBookingCompleted = (newBooking) => {
    setActiveBookingForQR(newBooking);
    setActiveTab('mystay');
    setIsQRModalOpen(true);
  };

  const handleOpenDigitalKey = (booking) => {
    setActiveBookingForQR(booking || activeGuestBooking);
    setIsQRModalOpen(true);
  };

  const handleGuestCheckIn = (bookingId) => {
    updateBookingStatus(bookingId, 'Checked-In');
    addToast({
      title: 'Checked In Successfully!',
      message: 'Your Digital Room Key is now activated.',
      type: 'gold'
    });
  };

  const guestBookings = bookings.filter(
    (b) =>
      b.guestName.toLowerCase().includes(currentUser?.name?.toLowerCase() || '') ||
      b.id === currentUser?.activeBookingId ||
      b.stayStatus !== 'Cancelled'
  );

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const tabLabels = {
    discover: 'Discover & Reserve Luxury Penthouses',
    mystay: 'My Active Stays & Digital Room Key',
    services: 'In-Room Concierge & AI Butler Services',
    map: 'Resort GPS Map & Satellite View',
    reviews: 'Verified Guest Reviews & Community Ratings'
  };

  const tabMobileLabels = {
    discover: 'Discover',
    mystay: 'My Stays',
    services: 'Concierge',
    map: 'Resort Map',
    reviews: 'Reviews'
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-white flex flex-col md:flex-row transition-colors duration-300 p-2.5 sm:p-4 gap-3 sm:gap-4 pb-24 md:pb-8">
      {/* 1. LEFT GUEST FLOATING THOR-STYLE SIDEBAR */}
      <GuestSidebar
        activeTab={activeTab}
        onSelectTab={(tabId) => setActiveTab(tabId)}
        bookingsCount={guestBookings.length}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        className="hidden md:flex sticky top-4 h-[calc(100vh-2rem)] z-30"
      />

      {/* 2. MAIN GUEST PORTAL CONTENT CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0 space-y-5 sm:space-y-6">
        {/* Top Header */}
        <header className="bg-[#0e1626]/90 backdrop-blur-xl text-white border border-[#1e2a42] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">
          <div className="px-3 sm:px-6 md:px-8 min-h-14 sm:min-h-16 py-2.5 sm:py-3 flex items-center justify-between gap-2">
            {/* Active View Title */}
            <div className="flex items-center gap-2 sm:gap-3.5 min-w-0">
              <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-300 text-slate-950 flex items-center justify-center shadow-md shadow-amber-500/20 font-serif font-black text-base sm:text-xl shrink-0">
                LA
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <h1 className="text-sm sm:text-lg md:text-xl font-bold tracking-tight text-white leading-tight font-sans truncate">
                    <span className="sm:hidden">{tabMobileLabels[activeTab] || 'Sanctuary'}</span>
                    <span className="hidden sm:inline">{tabLabels[activeTab] || 'Guest Sanctuary Portal'}</span>
                  </h1>
                  <span className="hidden sm:inline-block text-[10px] uppercase font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full shrink-0">
                    VIP Guest
                  </span>
                </div>
                <span className="text-[10px] sm:text-xs text-slate-400 mt-0.5 block truncate">
                  L'Horizon Azure Ultra-Luxury Sanctuary • Azure Bay
                </span>
              </div>
            </div>

            {/* Right Header Controls */}
            <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
              <ThemeToggle className="!bg-[#141d2e] !border-slate-700 !text-amber-400" />

              <div className="hidden lg:flex items-center gap-2 bg-amber-500/10 text-amber-400 border border-amber-500/30 px-3.5 py-1.5 rounded-2xl text-xs font-semibold">
                <Sun className="w-4 h-4 text-amber-400" />
                <span>Azure Bay • 28°C Sunny</span>
              </div>

              {/* Switch Portal Button */}
              <Button
                onClick={() => onSwitchRole('landing')}
                variant="outline"
                size="sm"
                className="!bg-[#141d2e] !text-slate-200 !border-slate-700 hover:!bg-[#1f2c45] text-xs px-2 sm:px-3"
                icon={LogOut}
                title="Switch Portal"
              >
                <span className="hidden sm:inline">Switch Portal</span>
              </Button>
            </div>
          </div>

          {/* Mobile Quick Tab Bar */}
          <div className="md:hidden bg-[#0b101c] border-t border-[#1a253b] px-3 sm:px-4 flex overflow-x-auto gap-1.5 sm:gap-2 py-2 text-xs font-semibold no-scrollbar scroll-smooth">
            {[
              { id: 'discover', label: 'Discover', icon: Compass },
              { id: 'mystay', label: 'My Stay', icon: Key, badge: guestBookings.length },
              { id: 'services', label: 'Services', icon: Sparkles },
              { id: 'map', label: 'Map', icon: MapPin },
              { id: 'reviews', label: 'Reviews', icon: Star }
            ].map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`px-3 py-1.5 min-h-[38px] rounded-xl font-bold flex items-center gap-1.5 shrink-0 touch-manipulation transition-colors ${
                    activeTab === t.id
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-400 hover:text-white bg-[#141d2e]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{t.label}</span>
                  {t.badge > 0 && (
                    <span className="text-[10px] bg-black/20 px-1.5 rounded-md font-mono">
                      {t.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </header>

        {/* Main Content Body */}
        <main className="space-y-6 flex-1">
        {/* TAB 1: DISCOVERY & EXPLORER */}
        {activeTab === 'discover' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
          >
            {/* Hero Welcome Banner */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-stone-900 text-white p-5 sm:p-8 lg:p-12 shadow-2xl border border-slate-800">
              <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-30 pointer-events-none hidden lg:block overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80"
                  alt="Luxury Resort"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="relative z-10 max-w-2xl space-y-3 sm:space-y-4">
                <span className="inline-flex items-center gap-1.5 text-xs uppercase font-bold tracking-widest text-amber-400 bg-amber-500/15 border border-amber-500/30 px-3.5 py-1 rounded-full">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Bespoke Oceanfront Escapes
                </span>

                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight font-serif text-white">
                  Where Oceanic Serenity Meets Impeccable Luxury
                </h2>

                <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed font-normal">
                  Immerse in bespoke hospitality, private rooftop plunge pools, and round-the-clock dedicated butler care. Reserve your sanctuary today.
                </p>
              </div>
            </div>

            {/* Filter Floating Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl border border-stone-200/90 dark:border-slate-800 -mt-6 sm:-mt-10 lg:-mt-12 relative z-20 mx-0 sm:mx-4 lg:mx-6 transition-colors duration-300">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[11px] uppercase font-bold text-stone-500 dark:text-slate-400 mb-1.5 tracking-wider">
                    Keywords / Suite Name
                  </label>
                  <div className="relative">
                    <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. Ocean View, Spa, Penthouse..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-slate-700 focus:outline-none focus:border-amber-500 text-xs text-slate-900 dark:text-white bg-stone-50/60 dark:bg-slate-800/60"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-bold text-stone-500 dark:text-slate-400 mb-1.5 tracking-wider">
                    Check-in Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="date"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-slate-700 focus:outline-none focus:border-amber-500 text-xs text-slate-900 dark:text-white bg-stone-50/60 dark:bg-slate-800/60"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-bold text-stone-500 dark:text-slate-400 mb-1.5 tracking-wider">
                    Check-out Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="date"
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-slate-700 focus:outline-none focus:border-amber-500 text-xs text-slate-900 dark:text-white bg-stone-50/60 dark:bg-slate-800/60"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-bold text-stone-500 dark:text-slate-400 mb-1.5 tracking-wider">
                    Guests
                  </label>
                  <div className="relative">
                    <Users className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <select
                      value={guestsCount}
                      onChange={(e) => setGuestsCount(Number(e.target.value))}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-slate-700 focus:outline-none focus:border-amber-500 text-xs text-slate-900 dark:text-white bg-stone-50/60 dark:bg-slate-800/60"
                    >
                      <option value={1}>1 Guest</option>
                      <option value={2}>2 Guests (Couples)</option>
                      <option value={3}>3 Guests</option>
                      <option value={4}>4 Guests (Family Suite)</option>
                      <option value={6}>6+ Guests (Penthouse)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Category Pills & Price Slider */}
              <div className="mt-5 pt-4 border-t border-stone-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-1.5">
                  {['All', 'Penthouse', 'Ocean View', 'Executive Suite', 'Deluxe'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                        selectedCategory === cat
                          ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                          : 'bg-stone-100 dark:bg-slate-800 text-stone-600 dark:text-slate-300 hover:bg-stone-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between sm:justify-start gap-3 bg-stone-50 dark:bg-slate-800/60 px-4 py-2 rounded-2xl border border-stone-200/80 dark:border-slate-700 w-full sm:w-auto">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-stone-400 shrink-0" />
                    <span className="text-xs text-stone-600 dark:text-slate-300 font-medium">
                      Max Price: <strong className="text-slate-900 dark:text-white">${maxPrice}/nt</strong>
                    </span>
                  </div>
                  <input
                    type="range"
                    min="300"
                    max="1500"
                    step="50"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="accent-amber-500 cursor-pointer w-24 sm:w-28"
                  />
                </div>
              </div>
            </div>

            {/* Room Results Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Available Luxury Suites ({filteredRooms.length})
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-slate-400">
                    All suites feature oceanfront balconies, daily housekeeping, and smart climate controls.
                  </p>
                </div>
              </div>

              {filteredRooms.length === 0 ? (
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-stone-200/80 dark:border-slate-800 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-stone-100 dark:bg-slate-800 text-stone-400 mx-auto flex items-center justify-center">
                    <Bed className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    No suites match your exact filters
                  </h4>
                  <p className="text-xs text-stone-500 dark:text-slate-400 max-w-md mx-auto">
                    Try raising the price slider or clearing search keywords to view our complete collection of villas and suites.
                  </p>
                  <Button
                    onClick={() => {
                      setSelectedCategory('All');
                      setSearchQuery('');
                      setMaxPrice(1500);
                    }}
                    variant="outline"
                    size="sm"
                  >
                    Reset All Filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRooms.map((room) => (
                    <RoomCard
                      key={room.id}
                      room={room}
                      onBook={handleBookNow}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* TAB 2: MY STAYS & DIGITAL KEY */}
        {activeTab === 'mystay' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
          >
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-stone-200/90 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors duration-300">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 px-3 py-1 rounded-full border border-amber-200 dark:border-amber-500/30">
                  Guest In-Stay Hub
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  Welcome back, {currentUser?.name || 'Guest'}
                </h2>
                <p className="text-xs text-stone-500 dark:text-slate-400">
                  Access your active reservations, digital room door key, and contactless stay services.
                </p>
              </div>

              {activeGuestBooking && (
                <Button
                  onClick={() => handleOpenDigitalKey(activeGuestBooking)}
                  variant="primary"
                  size="lg"
                  className="shadow-gold-glow"
                  icon={QrCode}
                >
                  Open Digital Door Key
                </Button>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Your Active Stays</h3>

              {guestBookings.length === 0 ? (
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-10 text-center border border-stone-200/80 dark:border-slate-800 space-y-3">
                  <Key className="w-10 h-10 text-stone-400 mx-auto" />
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">No active bookings found</h4>
                  <p className="text-xs text-stone-500 dark:text-slate-400">
                    You don't have any upcoming or active reservations yet. Browse our luxury suites to book!
                  </p>
                  <Button onClick={() => setActiveTab('discover')} variant="primary" size="md">
                    Explore Suites
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {guestBookings.map((b) => (
                    <div
                      key={b.id}
                      className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-stone-200/90 dark:border-slate-800 flex flex-col justify-between hover:shadow-md transition-all relative overflow-hidden"
                    >
                      <div>
                        <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-slate-800">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-200 dark:border-amber-500/30">
                              {b.bookingNumber}
                            </span>
                            <span className="text-xs text-stone-400">• {b.roomType}</span>
                          </div>
                          <Badge variant={b.stayStatus} showDot>
                            {b.stayStatus}
                          </Badge>
                        </div>

                        <div className="mt-4 flex items-start justify-between">
                          <div>
                            <h4 className="text-lg font-bold text-slate-900 dark:text-white">{b.roomName}</h4>
                            <p className="text-xs font-medium text-stone-500 dark:text-slate-400">
                              Suite {b.roomNumber}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="text-xs text-stone-400 block">Total Bill</span>
                            <span className="text-lg font-bold text-slate-900 dark:text-white">
                              ${Number(b.totalPrice).toLocaleString()}
                            </span>
                          </div>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-3 bg-stone-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-stone-100 dark:border-slate-700 text-xs">
                          <div>
                            <span className="text-[10px] uppercase font-bold text-stone-400 block">
                              Check-In
                            </span>
                            <span className="font-bold text-slate-800 dark:text-slate-200">{b.checkIn}</span>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-bold text-stone-400 block">
                              Check-Out
                            </span>
                            <span className="font-bold text-slate-800 dark:text-slate-200">{b.checkOut}</span>
                          </div>
                        </div>

                        <div className="mt-3 flex items-center justify-between text-xs bg-amber-50/60 dark:bg-amber-500/10 p-2.5 rounded-xl border border-amber-200/60 dark:border-amber-500/30">
                          <span className="text-amber-900 dark:text-amber-300 font-medium">Smart Door PIN:</span>
                          <span className="font-mono font-bold text-amber-700 dark:text-amber-400 text-sm tracking-wider">
                            {b.digitalKeyPin || '4921'}
                          </span>
                        </div>
                      </div>

                      <div className="mt-5 pt-3 border-t border-stone-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2.5">
                        {b.stayStatus === 'Confirmed' && (
                          <Button
                            onClick={() => handleGuestCheckIn(b.id)}
                            variant="emerald"
                            size="sm"
                            className="w-full sm:w-auto"
                            icon={CheckCircle}
                          >
                            Online Check-In Now
                          </Button>
                        )}

                        <Button
                          onClick={() => handleOpenDigitalKey(b)}
                          variant="primary"
                          size="sm"
                          className="w-full sm:w-auto sm:ml-auto"
                          icon={QrCode}
                        >
                          View Digital Key
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* TAB 3: IN-ROOM CONCIERGE */}
        {activeTab === 'services' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <ServiceRequests activeBooking={activeGuestBooking} />
          </motion.div>
        )}

        {/* TAB 4: RESORT MAP */}
        {activeTab === 'map' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <ResortMap />
          </motion.div>
        )}

        {/* TAB 5: GUEST REVIEWS */}
        {activeTab === 'reviews' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <ReviewSection />
          </motion.div>
        )}
      </main>
      </div>

      {/* Floating AI Concierge Agent */}
      <AIConciergeWidget />

      {/* Booking Drawer Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        selectedRoom={selectedRoomForBooking}
        initialCheckIn={checkInDate}
        initialCheckOut={checkOutDate}
        initialGuests={{ adults: guestsCount, children: 0 }}
        onBookingSuccess={handleBookingCompleted}
      />

      {/* Digital Key QR Modal */}
      <QRModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        booking={activeBookingForQR || activeGuestBooking}
      />
    </div>
  );
}
