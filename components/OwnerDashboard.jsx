'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DollarSign,
  TrendingUp,
  Bed,
  Users,
  ClipboardList,
  Sparkles,
  Plus,
  RefreshCw,
  LogOut,
  ShieldCheck,
  Building,
  CheckCircle,
  Clock,
  BarChart3,
  Calendar,
  Star,
  Award,
  Zap,
  LayoutGrid,
  MapPin,
  Key,
  Globe,
  Boxes
} from 'lucide-react';
import { useHotel } from '@/context/HotelContext';
import { useToast } from '@/context/ToastContext';
import StatCard from './ui/StatCard';
import Button from './ui/Button';
import ThemeToggle from './ui/ThemeToggle';
import BookingsTable from './owner/BookingsTable';
import InventoryManager from './owner/InventoryManager';
import SuppliesInventory from './owner/SuppliesInventory';
import HousekeepingKanban from './owner/HousekeepingKanban';
import ReviewSection from './reviews/ReviewSection';
import AnalyticsAnalyzer from './owner/AnalyticsAnalyzer';
import ResortMap from './map/ResortMap';
import ThorSidebar from './ui/ThorSidebar';

export default function OwnerDashboard({ onSwitchRole }) {
  const { kpis, rooms, bookings, requests } = useHotel();
  const { addToast } = useToast();

  // Navigation state driven directly by the contextual Thor-style sidebar
  const [activeTab, setActiveTab] = useState('bookings'); // 'dashboard' | 'bookings' | 'inventory' | 'supplies' | 'housekeeping' | 'reviews' | 'analytics' | 'concierge' | 'vault' | 'map' | 'telemetry'
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleRefresh = () => {
    addToast({
      title: 'Resort Telemetry Synchronized',
      message: 'Room readiness, supply inventory stock, and occupancy metrics updated.',
      type: 'info'
    });
  };

  const handleSelectTab = (tabId) => {
    setActiveTab(tabId);
  };

  const tabLabels = {
    dashboard: 'Operations Dashboard Overview',
    bookings: 'Bookings & Financial Ledger',
    inventory: 'Suite Inventory & Room CRUD Management',
    supplies: 'Resort Physical Supplies & Stock Control',
    housekeeping: 'Housekeeping & Maintenance Kanban',
    reviews: 'Verified Guest Reviews & Management Reply Hub',
    analytics: 'Executive Performance & Yield Analyzer',
    concierge: 'In-Room Concierge & AI Butler Dispatch',
    vault: 'Digital Room Key & Guest Vault',
    map: 'Resort GPS Map & Satellite View',
    telemetry: 'Live Resort Telemetry & Sensor SLA'
  };

  const tabMobileLabels = {
    dashboard: 'Operations',
    bookings: 'Bookings',
    inventory: 'Suites',
    supplies: 'Supplies',
    housekeeping: 'Housekeeping',
    reviews: 'Reviews',
    analytics: 'Analytics',
    concierge: 'Concierge',
    vault: 'Digital Key',
    map: 'Resort Map',
    telemetry: 'Telemetry'
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-white flex flex-col md:flex-row transition-colors duration-300 p-2.5 sm:p-4 gap-3 sm:gap-4 pb-24 md:pb-8">
      {/* 1. LEFT CONTEXTUAL THOR-STYLE SIDEBAR */}
      <ThorSidebar
        activeTab={activeTab}
        onSelectTab={(tabId) => setActiveTab(tabId)}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        kpis={kpis}
        className="hidden md:flex sticky top-4 h-[calc(100vh-2rem)] z-30"
      />

      {/* 2. MAIN CONTENT REGION */}
      <div className="flex-1 flex flex-col min-w-0 space-y-5 sm:space-y-6">
        {/* Top Staff Navigation Header */}
        <header className="bg-[#0e1626]/90 backdrop-blur-xl text-white border border-[#1e2a42] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">
          <div className="px-3 sm:px-6 md:px-8 min-h-14 sm:min-h-16 py-2.5 sm:py-3 flex items-center justify-between gap-2">
            {/* Brand / Active View Title */}
            <div className="flex items-center gap-2 sm:gap-3.5 min-w-0">
              <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-base sm:text-xl shadow-md shadow-amber-500/20 shrink-0">
                <ShieldCheck className="w-4 h-4 sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <h1 className="text-sm sm:text-lg md:text-xl font-bold tracking-tight text-white leading-tight font-sans truncate">
                    <span className="sm:hidden">{tabMobileLabels[activeTab] || 'Operations'}</span>
                    <span className="hidden sm:inline">{tabLabels[activeTab] || 'Resort Operations Suite'}</span>
                  </h1>
                  <span className="hidden sm:inline-block text-[10px] uppercase font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full shrink-0">
                    Admin Active
                  </span>
                </div>
                <span className="text-[10px] sm:text-xs text-slate-400 mt-0.5 block truncate">
                  L'Horizon Azure Hospitality System • Azure Bay
                </span>
              </div>
            </div>

            {/* Quick Staff Actions */}
            <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
              <ThemeToggle className="!bg-[#141d2e] !border-slate-700 !text-amber-400" />

              <button
                onClick={handleRefresh}
                className="p-2 sm:p-2.5 rounded-xl bg-[#141d2e] hover:bg-[#1f2c45] text-slate-400 hover:text-white border border-slate-700/80 transition-colors cursor-pointer touch-manipulation"
                title="Sync Live Data"
              >
                <RefreshCw className="w-4 h-4" />
              </button>

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
              { id: 'bookings', label: 'Bookings', count: kpis.activeBookings },
              { id: 'inventory', label: 'Suites', count: kpis.totalRooms },
              { id: 'supplies', label: 'Supplies', count: kpis.lowStockCount > 0 ? `${kpis.lowStockCount} Low` : kpis.totalInventoryItems },
              { id: 'housekeeping', label: 'Housekeeping', count: kpis.pendingRequests },
              { id: 'reviews', label: 'Reviews', count: kpis.totalReviews },
              { id: 'analytics', label: 'Analytics' },
              { id: 'map', label: 'Map' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 min-h-[38px] rounded-xl shrink-0 flex items-center gap-1.5 touch-manipulation transition-colors ${
                  activeTab === tab.id
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white bg-[#141d2e]'
                }`}
              >
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className="text-[10px] bg-black/20 px-1.5 rounded-md font-mono">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </header>

        {/* Dynamic KPI Overview Ribbon */}
        <section className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-sans">
              Live Operational Performance Metrics
            </h2>
            <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1.5 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              Live Telemetry Connected
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Revenue"
              value={`$${kpis.totalRevenue.toLocaleString()}`}
              subtitle="All active stays & bookings"
              trend="+14.2%"
              trendType="up"
              colorScheme="gold"
              icon={DollarSign}
            />

            <StatCard
              title="Occupancy Rate"
              value={`${kpis.occupancyRate}%`}
              subtitle={`${rooms.filter((r) => r.status === 'Occupied').length} of ${rooms.length} suites occupied`}
              trend="+8.5%"
              trendType="up"
              colorScheme="emerald"
              icon={Bed}
            />

            <StatCard
              title="Active Bookings"
              value={kpis.activeBookings}
              subtitle="Confirmed / Checked-in guests"
              trend="+4 today"
              trendType="up"
              colorScheme="blue"
              icon={Users}
            />

            <StatCard
              title="Pending Housekeeping"
              value={kpis.pendingRequests}
              subtitle={`${kpis.inProgressRequests} in progress, ${kpis.completedRequests} done`}
              trend={kpis.pendingRequests > 0 ? 'Attention' : 'All Clear'}
              trendType={kpis.pendingRequests > 0 ? 'down' : 'up'}
              colorScheme={kpis.pendingRequests > 0 ? 'gold' : 'emerald'}
              icon={ClipboardList}
            />
          </div>
        </section>

        {/* Active Tab View Rendering */}
        <main className="space-y-6 flex-1">
          {activeTab === 'bookings' && <BookingsTable />}

          {activeTab === 'inventory' && <InventoryManager />}

          {activeTab === 'supplies' && <SuppliesInventory />}

          {activeTab === 'housekeeping' && <HousekeepingKanban />}

          {activeTab === 'reviews' && <ReviewSection isOwner={true} />}

          {activeTab === 'analytics' && <AnalyticsAnalyzer />}

          {activeTab === 'map' && (
            <div className="bg-[#0e1626] border border-[#1e2a42] rounded-3xl p-6 shadow-2xl">
              <ResortMap />
            </div>
          )}

          {activeTab === 'vault' && (
            <div className="bg-[#0e1626] border border-[#1e2a42] rounded-3xl p-6 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                    <Key className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Digital Key & Access Vault</h3>
                    <p className="text-xs text-slate-400">Encrypted RFID / NFC Key Passcode Simulator</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full">
                  Hardware Vault Online
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-[#141d2e] p-4 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-slate-400">Active NFC Key Dispatches</span>
                  <div className="text-2xl font-bold font-mono text-white">
                    {bookings.filter((b) => b.stayStatus === 'Checked-In').length} Active Keys
                  </div>
                  <p className="text-slate-400">Guest mobile devices paired with smart suite locks.</p>
                </div>
                <div className="bg-[#141d2e] p-4 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-slate-400">Security Access Log</span>
                  <div className="text-2xl font-bold font-mono text-emerald-400">0 Breaches</div>
                  <p className="text-slate-400">AES-256 rotating QR encryption valid.</p>
                </div>
              </div>
            </div>
          )}

          {(activeTab === 'dashboard' || activeTab === 'telemetry') && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue Breakdown */}
                <div className="bg-[#0e1626] rounded-3xl p-6 shadow-xl border border-[#1e2a42] space-y-4">
                  <h3 className="text-base font-bold text-white">Revenue Breakdown</h3>
                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between py-2 border-b border-slate-800">
                      <span className="text-slate-400">Suite Accommodations</span>
                      <span className="font-bold text-white">
                        ${Math.round(kpis.totalRevenue * 0.82).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-800">
                      <span className="text-slate-400">Resort Taxes & VAT (18%)</span>
                      <span className="font-bold text-white">
                        ${Math.round(kpis.totalRevenue * 0.15).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-800">
                      <span className="text-slate-400">Concierge & In-Room Dining</span>
                      <span className="font-bold text-white">
                        ${Math.round(kpis.totalRevenue * 0.03).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 text-sm">
                      <span className="font-bold text-white">Average Daily Rate (ADR)</span>
                      <span className="font-extrabold text-amber-400 font-mono">
                        ${kpis.averageDailyRate} / night
                      </span>
                    </div>
                  </div>
                </div>

                {/* Occupancy Status Distribution */}
                <div className="bg-[#0e1626] rounded-3xl p-6 shadow-xl border border-[#1e2a42] space-y-4">
                  <h3 className="text-base font-bold text-white">Room Status Distribution</h3>
                  <div className="space-y-3">
                    {[
                      {
                        label: 'Occupied Suites',
                        count: rooms.filter((r) => r.status === 'Occupied').length,
                        color: 'bg-rose-500'
                      },
                      {
                        label: 'Available for Booking',
                        count: rooms.filter((r) => r.status === 'Available').length,
                        color: 'bg-emerald-500'
                      },
                      {
                        label: 'Dirty (Awaiting Cleaning)',
                        count: rooms.filter((r) => r.status === 'Dirty').length,
                        color: 'bg-amber-500'
                      },
                      {
                        label: 'Under Maintenance',
                        count: rooms.filter((r) => r.status === 'Maintenance').length,
                        color: 'bg-slate-600'
                      }
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-300 font-medium">{item.label}</span>
                          <span className="font-bold text-white">{item.count} suites</span>
                        </div>
                        <div className="w-full h-2 bg-[#141d2e] rounded-full overflow-hidden">
                          <div
                            className={`h-full ${item.color} rounded-full`}
                            style={{
                              width: `${(item.count / rooms.length) * 100}%`
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Housekeeping Performance */}
                <div className="bg-[#0e1626] rounded-3xl p-6 shadow-xl border border-[#1e2a42] space-y-4">
                  <h3 className="text-base font-bold text-white">Service Response SLA</h3>
                  <div className="space-y-4">
                    <div className="bg-emerald-500/10 p-4 rounded-2xl border border-emerald-500/30 flex items-center gap-3">
                      <CheckCircle className="w-8 h-8 text-emerald-400 shrink-0" />
                      <div>
                        <h4 className="text-xs font-bold text-emerald-300">Avg Fulfillment Time</h4>
                        <p className="text-lg font-extrabold text-emerald-400 font-mono">14.2 Minutes</p>
                      </div>
                    </div>
                    <div className="bg-amber-500/10 p-4 rounded-2xl border border-amber-500/30 flex items-center gap-3">
                      <Clock className="w-8 h-8 text-amber-400 shrink-0" />
                      <div>
                        <h4 className="text-xs font-bold text-amber-300">Active Turnaround Queue</h4>
                        <p className="text-lg font-extrabold text-amber-400 font-mono">
                          {kpis.pendingRequests} Tickets Pending
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'concierge' && (
            <div className="bg-[#0e1626] border border-[#1e2a42] rounded-3xl p-6 shadow-2xl space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Aura AI & Butler Service Center</h3>
                  <p className="text-xs text-slate-400">Live Guest In-Room Orders & Service Tickets</p>
                </div>
              </div>
              <div className="space-y-3">
                {requests.map((req) => (
                  <div key={req.id} className="bg-[#141d2e] p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{req.type}</span>
                        <span className="text-[10px] bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full font-bold">
                          Suite {req.roomNumber}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1">{req.details}</p>
                    </div>
                    <span className="text-xs font-mono text-slate-400">{req.status}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
