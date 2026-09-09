'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Bed,
  Users,
  Calendar,
  Sparkles,
  PieChart,
  ArrowUpRight,
  ShieldCheck,
  Download,
  Filter,
  CheckCircle2,
  Clock,
  Boxes,
  Star,
  Activity,
  Zap,
  Layers
} from 'lucide-react';
import { useHotel } from '@/context/HotelContext';
import { useToast } from '@/context/ToastContext';

export default function AnalyticsAnalyzer() {
  const { kpis, rooms, bookings, requests, reviews, inventory } = useHotel();
  const { addToast } = useToast();

  const [timeRange, setTimeRange] = useState('30d'); // '7d' | '30d' | 'quarter' | 'ytd'
  const [activeAnalysisView, setActiveAnalysisView] = useState('financial'); // 'financial' | 'occupancy' | 'supplies' | 'sentiment'

  const handleExport = () => {
    addToast({
      title: 'Executive Analytics Report Generated',
      message: `Exported comprehensive ${timeRange.toUpperCase()} telemetry dossier (CSV & PDF).`,
      type: 'gold'
    });
  };

  // Calculated metrics
  const revPAR = Math.round(kpis.averageDailyRate * (kpis.occupancyRate / 100));
  const goppar = Math.round(revPAR * 0.72);
  const totalStaysCount = bookings.filter((b) => b.stayStatus !== 'Cancelled').length;

  const categoryExpenditures = [
    { name: 'Toiletries & Spa Amenities', amount: 4850, pct: 18, color: 'bg-amber-400' },
    { name: 'Luxury Linens & Textiles', amount: 8200, pct: 31, color: 'bg-emerald-400' },
    { name: 'Food, Wines & Caviar Provisions', amount: 7400, pct: 28, color: 'bg-sky-400' },
    { name: 'Cleaning & Sanitation Compounds', amount: 2600, pct: 10, color: 'bg-purple-400' },
    { name: 'Engineering & Maintenance Spares', amount: 3400, pct: 13, color: 'bg-slate-400' }
  ];

  return (
    <div className="space-y-6">
      {/* 1. Header & Timeframe Control */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0e1626] border border-[#1e2a42] rounded-3xl p-6 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-wider text-amber-400">
            <Activity className="w-4 h-4" />
            <span>Executive Operations & Financial Intelligence</span>
          </div>
          <h2 className="text-2xl font-bold text-white font-sans mt-1">
            Resort Performance & Yield Analyzer
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Deep-dive operational analytics: Revenue, RevPAR, Suite Yield, Inventory Burn, and SLA telemetry.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Time Range Selector */}
          <div className="bg-[#141d2e] border border-slate-700/80 p-1 rounded-2xl flex items-center gap-1 text-xs font-semibold overflow-x-auto no-scrollbar">
            {[
              { id: '7d', label: '7 Days' },
              { id: '30d', label: '30 Days' },
              { id: 'quarter', label: 'Q3 2026' },
              { id: 'ytd', label: 'YTD 2026' }
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTimeRange(t.id)}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                  timeRange === t.id
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Export Report Button */}
          <button
            onClick={handleExport}
            className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            Export Dossier
          </button>
        </div>
      </div>

      {/* 2. Top Analytical KPI Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* RevPAR */}
        <div className="bg-[#0e1626] border border-[#1e2a42] rounded-3xl p-5 shadow-xl space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Revenue Per Available Room (RevPAR)</span>
            <span className="text-emerald-400 font-bold flex items-center gap-0.5">
              <TrendingUp className="w-3.5 h-3.5" /> +11.8%
            </span>
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">${revPAR}</div>
          <p className="text-[11px] text-slate-400">ADR (${kpis.averageDailyRate}) × Occupancy ({kpis.occupancyRate}%)</p>
        </div>

        {/* GOPPAR */}
        <div className="bg-[#0e1626] border border-[#1e2a42] rounded-3xl p-5 shadow-xl space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Gross Operating Profit (GOPPAR)</span>
            <span className="text-emerald-400 font-bold flex items-center gap-0.5">
              <TrendingUp className="w-3.5 h-3.5" /> +14.2%
            </span>
          </div>
          <div className="text-3xl font-extrabold text-amber-400 font-mono">${goppar}</div>
          <p className="text-[11px] text-slate-400">Operational net margin after payroll & supply cost</p>
        </div>

        {/* Inventory Capital Value */}
        <div className="bg-[#0e1626] border border-[#1e2a42] rounded-3xl p-5 shadow-xl space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Supplies Stock Value</span>
            <span className="text-cyan-400 font-bold font-mono">5 Categories</span>
          </div>
          <div className="text-3xl font-extrabold text-cyan-400 font-mono">
            ${kpis.totalInventoryValue?.toLocaleString() || '48,250'}
          </div>
          <p className="text-[11px] text-slate-400">{kpis.lowStockCount} items flagged for replenishment</p>
        </div>

        {/* Guest Satisfaction SLA */}
        <div className="bg-[#0e1626] border border-[#1e2a42] rounded-3xl p-5 shadow-xl space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Overall Guest Rating Index</span>
            <span className="text-purple-400 font-bold flex items-center gap-0.5">
              <Star className="w-3.5 h-3.5 fill-purple-400 text-purple-400" /> 4.98 / 5.0
            </span>
          </div>
          <div className="text-3xl font-extrabold text-purple-400 font-mono">99.4%</div>
          <p className="text-[11px] text-slate-400">Verified guest satisfaction across {reviews.length} reviews</p>
        </div>
      </div>

      {/* 3. Deep-Dive Analytical Navigation Tabs */}
      <div className="flex items-center gap-2 bg-[#0e1626] border border-[#1e2a42] p-1.5 rounded-2xl overflow-x-auto no-scrollbar">
        {[
          { id: 'financial', label: 'Financial & Revenue Modeling', icon: DollarSign },
          { id: 'occupancy', label: 'Suite Occupancy & Yield Matrix', icon: Bed },
          { id: 'supplies', label: 'Supplies Burn & Procurement', icon: Boxes },
          { id: 'sentiment', label: 'Guest Sentiment & SLA Resolution', icon: Sparkles }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeAnalysisView === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveAnalysisView(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-[#141d2e]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 4. Active Analysis Module */}
      {activeAnalysisView === 'financial' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Breakdown */}
          <div className="lg:col-span-2 bg-[#0e1626] border border-[#1e2a42] rounded-3xl p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-white">Gross Revenue Decomposition</h3>
                <p className="text-xs text-slate-400">Income distribution across hospitality segments</p>
              </div>
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
                Total: ${kpis.totalRevenue.toLocaleString()}
              </span>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between mb-1.5 font-medium">
                  <span className="text-slate-300">Presidential & Luxury Suite Stays (82%)</span>
                  <span className="font-bold text-white font-mono">
                    ${Math.round(kpis.totalRevenue * 0.82).toLocaleString()}
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '82%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1.5 font-medium">
                  <span className="text-slate-300">Resort VAT & City Hospitality Taxes (15%)</span>
                  <span className="font-bold text-white font-mono">
                    ${Math.round(kpis.totalRevenue * 0.15).toLocaleString()}
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 rounded-full" style={{ width: '15%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1.5 font-medium">
                  <span className="text-slate-300">Michelin Dining & Concierge Services (3%)</span>
                  <span className="font-bold text-white font-mono">
                    ${Math.round(kpis.totalRevenue * 0.03).toLocaleString()}
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '3%' }} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-center font-mono">
              <div className="bg-[#141d2e] p-3 rounded-2xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-sans">Avg Stay Length</span>
                <div className="text-lg font-bold text-white mt-0.5">3.8 Nights</div>
              </div>
              <div className="bg-[#141d2e] p-3 rounded-2xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-sans">Average Daily Rate</span>
                <div className="text-lg font-bold text-amber-400 mt-0.5">${kpis.averageDailyRate}</div>
              </div>
              <div className="bg-[#141d2e] p-3 rounded-2xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-sans">Gross Operating Margin</span>
                <div className="text-lg font-bold text-emerald-400 mt-0.5">68.4%</div>
              </div>
            </div>
          </div>

          {/* AI Executive Intelligence */}
          <div className="bg-[#0e1626] border border-[#1e2a42] rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">AI Yield Optimization</h4>
                <span className="text-[10px] text-slate-400">Live Forecasting Telemetry</span>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-[#141d2e] border border-amber-500/20 space-y-1">
                <div className="font-bold text-amber-400 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5" /> Weekend Demand Surge
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  Projected 94% occupancy for upcoming weekend. Recommend dynamic pricing bump of <strong>+12% on Penthouses</strong>.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#141d2e] border border-emerald-500/20 space-y-1">
                <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> High Return Rate
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  42% of active bookings are repeat verified VIP guests. Average spend per stay up <strong>+$380</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeAnalysisView === 'occupancy' && (
        <div className="bg-[#0e1626] border border-[#1e2a42] rounded-3xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-white">Suite Category Utilization & Status Matrix</h3>
              <p className="text-xs text-slate-400">Live room inventory readiness and distribution</p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400">
              {rooms.length} Suites Under Active Management
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Occupied Suites', count: rooms.filter((r) => r.status === 'Occupied').length, color: 'bg-rose-500', desc: 'Active in-house guests' },
              { label: 'Available Suites', count: rooms.filter((r) => r.status === 'Available').length, color: 'bg-emerald-500', desc: 'Ready for instant booking' },
              { label: 'Dirty (Cleaning)', count: rooms.filter((r) => r.status === 'Dirty').length, color: 'bg-amber-500', desc: 'Housekeeping in turnaround' },
              { label: 'Under Maintenance', count: rooms.filter((r) => r.status === 'Maintenance').length, color: 'bg-slate-600', desc: 'HVAC / Cosmetic updates' }
            ].map((stat) => (
              <div key={stat.label} className="bg-[#141d2e] p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-semibold">{stat.label}</span>
                  <span className={`w-2.5 h-2.5 rounded-full ${stat.color}`} />
                </div>
                <div className="text-3xl font-extrabold text-white font-mono">{stat.count}</div>
                <p className="text-[11px] text-slate-400">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeAnalysisView === 'supplies' && (
        <div className="bg-[#0e1626] border border-[#1e2a42] rounded-3xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-white">Monthly Supplies Consumption & Burn Rate</h3>
              <p className="text-xs text-slate-400">Expenditure across Toiletries, Linens, F&B, Cleaning, and Maintenance</p>
            </div>
            <span className="text-xs font-mono text-cyan-400 font-bold">
              ${categoryExpenditures.reduce((a, b) => a + b.amount, 0).toLocaleString()} Total Monthly Burn
            </span>
          </div>

          <div className="space-y-4 text-xs">
            {categoryExpenditures.map((cat) => (
              <div key={cat.name} className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-300 font-semibold">{cat.name}</span>
                  <span className="font-bold text-white font-mono">
                    ${cat.amount.toLocaleString()} ({cat.pct}%)
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full ${cat.color} rounded-full`} style={{ width: `${cat.pct * 2.5}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeAnalysisView === 'sentiment' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#0e1626] border border-[#1e2a42] rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white">Multi-Category Quality Score Radar</h3>
            <div className="space-y-3 text-xs">
              {[
                { name: 'Cleanliness & Sanitation', score: 5.0, pct: '100%' },
                { name: 'Suite Comfort & Bedding', score: 4.9, pct: '98%' },
                { name: 'Beachfront Location & Views', score: 5.0, pct: '100%' },
                { name: 'Butler & Concierge Service', score: 4.9, pct: '98%' },
                { name: 'Value & Dining Experience', score: 4.8, pct: '96%' }
              ].map((cat) => (
                <div key={cat.name} className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-300 font-medium">{cat.name}</span>
                    <span className="font-bold text-amber-400 font-mono">{cat.score} / 5.0</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: cat.pct }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0e1626] border border-[#1e2a42] rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white">Housekeeping & Concierge SLA Resolution</h3>
            <div className="space-y-4 text-xs">
              <div className="bg-emerald-500/10 p-4 rounded-2xl border border-emerald-500/30 flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-emerald-300">Average Service Fulfillment SLA</h4>
                  <p className="text-xl font-extrabold text-emerald-400 font-mono">14.2 Minutes</p>
                  <span className="text-[10px] text-emerald-300/80">98.2% of guest requests resolved under 20 mins</span>
                </div>
              </div>

              <div className="bg-amber-500/10 p-4 rounded-2xl border border-amber-500/30 flex items-center gap-3">
                <Clock className="w-8 h-8 text-amber-400 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-amber-300">Active Turnaround Queue</h4>
                  <p className="text-xl font-extrabold text-amber-400 font-mono">
                    {kpis.pendingRequests} Tickets Pending
                  </p>
                  <span className="text-[10px] text-amber-300/80">Dispatched to floor staff en route</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
