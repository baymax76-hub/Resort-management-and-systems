'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package,
  Plus,
  Search,
  Filter,
  AlertTriangle,
  CheckCircle2,
  TrendingDown,
  RefreshCw,
  Trash2,
  Edit3,
  ShoppingCart,
  DollarSign,
  Boxes,
  Sparkles,
  Layers,
  Archive,
  ArrowUpRight,
  ShieldAlert,
  ChevronDown
} from 'lucide-react';
import { useHotel } from '@/context/HotelContext';
import { useToast } from '@/context/ToastContext';
import Button from '../ui/Button';

export default function SuppliesInventory() {
  const {
    inventory,
    updateInventoryStock,
    addInventoryItem,
    deleteInventoryItem,
    reorderInventoryItem,
    kpis
  } = useHotel();
  const { addToast } = useToast();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All'); // 'All' | 'LowStock' | 'Normal'
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isReorderModalOpen, setIsReorderModalOpen] = useState(false);
  const [selectedItemForReorder, setSelectedItemForReorder] = useState(null);
  const [reorderQty, setReorderQty] = useState(50);

  // New Item Form State
  const [newItem, setNewItem] = useState({
    name: '',
    category: 'Toiletries',
    stock: 50,
    unit: 'Units',
    minThreshold: 20,
    costPerUnit: 12.5,
    location: 'Central Depot',
    supplier: 'Resort Procurement Partners',
    burnRate: '8 / day'
  });

  const categories = [
    'All',
    'Toiletries',
    'Linens',
    'Food & Beverage',
    'Cleaning Supplies',
    'Maintenance Materials'
  ];

  const filteredInventory = inventory.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchQuery.toLowerCase());
    const isLowStock = item.stock <= item.minThreshold;
    const matchesStatus =
      statusFilter === 'All' ||
      (statusFilter === 'LowStock' && isLowStock) ||
      (statusFilter === 'Normal' && !isLowStock);

    return matchesCategory && matchesSearch && matchesStatus;
  });

  const handleStockChange = (id, delta, name) => {
    updateInventoryStock(id, delta, 'delta');
    addToast({
      title: delta > 0 ? 'Stock Replenished' : 'Stock Dispatched',
      message: `${name}: ${delta > 0 ? `+${delta}` : delta} units logged.`,
      type: delta > 0 ? 'info' : 'default'
    });
  };

  const handleOpenReorder = (item) => {
    setSelectedItemForReorder(item);
    setReorderQty(Math.max(25, item.minThreshold * 2 - item.stock));
    setIsReorderModalOpen(true);
  };

  const handleConfirmReorder = (e) => {
    e.preventDefault();
    if (!selectedItemForReorder) return;
    reorderInventoryItem(selectedItemForReorder.id, reorderQty);
    addToast({
      title: 'Purchase Order Dispatched!',
      message: `Ordered ${reorderQty} ${selectedItemForReorder.unit} of "${selectedItemForReorder.name}" from ${selectedItemForReorder.supplier}.`,
      type: 'gold'
    });
    setIsReorderModalOpen(false);
  };

  const handleCreateItem = (e) => {
    e.preventDefault();
    if (!newItem.name.trim()) return;
    addInventoryItem(newItem);
    addToast({
      title: 'New Supply Cataloged',
      message: `Added "${newItem.name}" to ${newItem.category}.`,
      type: 'gold'
    });
    setIsAddModalOpen(false);
    setNewItem({
      name: '',
      category: 'Toiletries',
      stock: 50,
      unit: 'Units',
      minThreshold: 20,
      costPerUnit: 12.5,
      location: 'Central Depot',
      supplier: 'Resort Procurement Partners',
      burnRate: '8 / day'
    });
  };

  return (
    <div className="space-y-6">
      {/* 1. Header & Quick Stat Ribbon */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0e1626] border border-[#1e2a42] rounded-3xl p-6 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-wider text-amber-400">
            <Boxes className="w-4 h-4" />
            <span>Resort Physical Supplies & Stock Control</span>
          </div>
          <h2 className="text-2xl font-bold text-white font-sans mt-1">
            Hospitality Inventory Management
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Monitor stock levels across Toiletries, Linens, Food & Beverage, Cleaning Supplies, and Maintenance Materials.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => setIsAddModalOpen(true)}
            variant="primary"
            size="md"
            icon={Plus}
            className="!bg-[#f59e0b] !text-slate-950 font-bold shadow-lg shadow-amber-500/20"
          >
            Add New Item
          </Button>
        </div>
      </div>

      {/* 2. Key Inventory Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0e1626] border border-[#1e2a42] rounded-2xl p-5 shadow-lg">
          <span className="text-xs text-slate-400 font-medium">Total Cataloged Items</span>
          <div className="text-2xl font-extrabold text-white font-mono mt-1">
            {kpis.totalInventoryItems || inventory.length} SKUs
          </div>
          <span className="text-[11px] text-slate-400">Across 5 resort supply categories</span>
        </div>

        <div className="bg-[#0e1626] border border-[#1e2a42] rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Low Stock Alerts</span>
            {kpis.lowStockCount > 0 && (
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
            )}
          </div>
          <div className="text-2xl font-extrabold text-rose-400 font-mono mt-1">
            {kpis.lowStockCount} Items
          </div>
          <span className="text-[11px] text-rose-400/90 font-medium">Below minimum safety threshold</span>
        </div>

        <div className="bg-[#0e1626] border border-[#1e2a42] rounded-2xl p-5 shadow-lg">
          <span className="text-xs text-slate-400 font-medium">Total Stock Valuation</span>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono mt-1">
            ${kpis.totalInventoryValue?.toLocaleString() || '48,250'}
          </div>
          <span className="text-[11px] text-emerald-400/80">Asset value at unit cost</span>
        </div>

        <div className="bg-[#0e1626] border border-[#1e2a42] rounded-2xl p-5 shadow-lg">
          <span className="text-xs text-slate-400 font-medium">Procurement SLA</span>
          <div className="text-2xl font-extrabold text-cyan-400 font-mono mt-1">24 Hours</div>
          <span className="text-[11px] text-cyan-400/80">VIP Supplier Express Dispatch</span>
        </div>
      </div>

      {/* 3. Filter and Search Ribbon */}
      <div className="bg-[#0e1626] border border-[#1e2a42] rounded-3xl p-5 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-[#141d2e] text-slate-400 hover:text-white hover:bg-[#1a263d]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:min-w-[260px] md:w-auto">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search supply, bay, supplier..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#141d2e] border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-sans"
            />
          </div>
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80 text-xs">
          <span className="text-slate-400 font-semibold">Filter Status:</span>
          {[
            { id: 'All', label: 'All Stock' },
            { id: 'LowStock', label: '⚠️ Low Stock Only' },
            { id: 'Normal', label: '✅ Healthy Stock' }
          ].map((st) => (
            <button
              key={st.id}
              onClick={() => setStatusFilter(st.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                statusFilter === st.id
                  ? 'bg-slate-700 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Inventory Data Grid */}
      <div className="bg-[#0e1626] border border-[#1e2a42] rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto -webkit-overflow-scrolling-touch">
          <table className="w-full min-w-[700px] text-left text-xs">
            <thead className="bg-[#0b101c] text-slate-400 border-b border-[#1a253b] uppercase tracking-wider text-[10px] font-mono">
              <tr>
                <th className="px-6 py-4">Item Name & SKU</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Location / Bay</th>
                <th className="px-6 py-4">Stock Level</th>
                <th className="px-6 py-4">Unit Cost</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Quick Stock Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-200">
              {filteredInventory.map((item) => {
                const isLow = item.stock <= item.minThreshold;
                const stockPct = Math.min(100, Math.round((item.stock / (item.minThreshold * 2.5)) * 100));

                return (
                  <tr key={item.id} className="hover:bg-[#141d2e]/60 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-white text-sm">{item.name}</div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5 font-mono">
                        <span>Supplier: {item.supplier}</span>
                        <span>•</span>
                        <span>Burn: {item.burnRate}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#182338] text-amber-400 border border-amber-500/20">
                        {item.category}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-slate-300 font-mono text-[11px]">
                      {item.location}
                    </td>

                    <td className="px-6 py-4">
                      <div className="space-y-1 min-w-[120px]">
                        <div className="flex justify-between font-mono text-xs">
                          <span className={`font-bold ${isLow ? 'text-rose-400' : 'text-white'}`}>
                            {item.stock} {item.unit}
                          </span>
                          <span className="text-slate-500 text-[10px]">Min: {item.minThreshold}</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${isLow ? 'bg-rose-500' : 'bg-emerald-500'}`}
                            style={{ width: `${stockPct}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 font-mono font-bold text-white">
                      ${item.costPerUnit.toFixed(2)}
                    </td>

                    <td className="px-6 py-4">
                      {isLow ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                          <AlertTriangle className="w-3 h-3" />
                          Low Stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          <CheckCircle2 className="w-3 h-3" />
                          In Stock
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleStockChange(item.id, -1, item.name)}
                          className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center font-bold text-sm cursor-pointer"
                          title="Dispatch 1 Unit"
                        >
                          -
                        </button>
                        <button
                          onClick={() => handleStockChange(item.id, 5, item.name)}
                          className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center font-bold text-sm cursor-pointer"
                          title="Restock 5 Units"
                        >
                          +
                        </button>
                        <button
                          onClick={() => handleOpenReorder(item)}
                          className="px-2.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[11px] flex items-center gap-1 shadow-sm cursor-pointer"
                          title="Quick Reorder PO"
                        >
                          <ShoppingCart className="w-3 h-3" />
                          Reorder
                        </button>
                        <button
                          onClick={() => deleteInventoryItem(item.id)}
                          className="p-1.5 rounded-lg hover:bg-rose-500/20 text-slate-500 hover:text-rose-400 cursor-pointer"
                          title="Delete Item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: Add New Supply Item Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0e1626] border border-[#1e2a42] rounded-3xl p-5 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    <Plus className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Add Resort Supply SKU</h3>
                    <p className="text-xs text-slate-400">Catalog a new supply item into inventory</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="text-slate-400 hover:text-white text-lg font-bold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateItem} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Item Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Organic Lavender Essential Oils (100ml)"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141d2e] border border-slate-700 text-white outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Category</label>
                    <select
                      value={newItem.category}
                      onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#141d2e] border border-slate-700 text-white outline-none focus:border-amber-500"
                    >
                      <option value="Toiletries">Toiletries</option>
                      <option value="Linens">Linens</option>
                      <option value="Food & Beverage">Food & Beverage</option>
                      <option value="Cleaning Supplies">Cleaning Supplies</option>
                      <option value="Maintenance Materials">Maintenance Materials</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Stock Unit</label>
                    <input
                      type="text"
                      placeholder="e.g. Bottles, Sets, Pieces"
                      value={newItem.unit}
                      onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#141d2e] border border-slate-700 text-white outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Current Stock</label>
                    <input
                      type="number"
                      required
                      value={newItem.stock}
                      onChange={(e) => setNewItem({ ...newItem, stock: Number(e.target.value) })}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#141d2e] border border-slate-700 text-white outline-none focus:border-amber-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Min Threshold</label>
                    <input
                      type="number"
                      required
                      value={newItem.minThreshold}
                      onChange={(e) => setNewItem({ ...newItem, minThreshold: Number(e.target.value) })}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#141d2e] border border-slate-700 text-white outline-none focus:border-amber-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Unit Cost ($)</label>
                    <input
                      type="number"
                      step="0.1"
                      required
                      value={newItem.costPerUnit}
                      onChange={(e) => setNewItem({ ...newItem, costPerUnit: Number(e.target.value) })}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#141d2e] border border-slate-700 text-white outline-none focus:border-amber-500 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Storage Location</label>
                    <input
                      type="text"
                      placeholder="e.g. Central Depot - Bay B2"
                      value={newItem.location}
                      onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#141d2e] border border-slate-700 text-white outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Supplier Partner</label>
                    <input
                      type="text"
                      placeholder="e.g. Ecolab Global"
                      value={newItem.supplier}
                      onChange={(e) => setNewItem({ ...newItem, supplier: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#141d2e] border border-slate-700 text-white outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold cursor-pointer text-center"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-lg shadow-amber-500/20 cursor-pointer text-center"
                  >
                    Catalog Item
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: Reorder Purchase Order Modal */}
      <AnimatePresence>
        {isReorderModalOpen && selectedItemForReorder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0e1626] border border-[#1e2a42] rounded-3xl p-5 sm:p-8 max-w-md w-full shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <ShoppingCart className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Purchase Order Reorder</h3>
                    <p className="text-xs text-slate-400">Dispatch restock order to vendor</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsReorderModalOpen(false)}
                  className="text-slate-400 hover:text-white text-lg font-bold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleConfirmReorder} className="space-y-4 text-xs">
                <div className="bg-[#141d2e] p-4 rounded-2xl border border-slate-800 space-y-2">
                  <div className="font-bold text-white text-sm">{selectedItemForReorder.name}</div>
                  <div className="flex justify-between text-slate-400">
                    <span>Supplier: {selectedItemForReorder.supplier}</span>
                    <span>Current: {selectedItemForReorder.stock} {selectedItemForReorder.unit}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Reorder Quantity ({selectedItemForReorder.unit})
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={reorderQty}
                    onChange={(e) => setReorderQty(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141d2e] border border-slate-700 text-white font-mono text-base font-bold outline-none focus:border-amber-500"
                  />
                </div>

                <div className="bg-[#101828] p-3.5 rounded-xl border border-slate-800 space-y-1.5 text-slate-400">
                  <div className="flex justify-between">
                    <span>Unit Cost:</span>
                    <span className="font-mono text-white">${selectedItemForReorder.costPerUnit.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-white">
                    <span>Estimated PO Total:</span>
                    <span className="font-mono text-emerald-400">
                      ${(reorderQty * selectedItemForReorder.costPerUnit).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => setIsReorderModalOpen(false)}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold cursor-pointer text-center"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#22c55e] hover:bg-[#16a34a] text-slate-950 font-bold shadow-lg shadow-emerald-500/20 cursor-pointer text-center"
                  >
                    Confirm Purchase Order
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
