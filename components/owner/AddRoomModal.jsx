'use client';

import React, { useState } from 'react';
import { Sparkles, Plus, Image, DollarSign, Home, Check } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { useHotel } from '@/context/HotelContext';
import { useToast } from '@/context/ToastContext';

const AVAILABLE_AMENITIES = [
  'Private Infinity Pool',
  '24/7 Butler Service',
  'Free High-Speed Wi-Fi',
  'Deep Soaking Marble Tub',
  'Smart 65" OLED TV',
  'Complimentary Champagne & Mini Bar',
  'Ocean Balcony',
  'Rainfall Shower',
  'Dedicated Workstation',
  'Private Garden & Jacuzzi'
];

export default function AddRoomModal({ isOpen, onClose }) {
  const { addRoom } = useHotel();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    number: '',
    name: '',
    category: 'Deluxe',
    floor: '1st Floor',
    price: 350,
    size: '75 m²',
    bed: '1 King Bed',
    adults: 2,
    children: 1,
    status: 'Available',
    imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
    description: '',
    selectedAmenities: ['Free High-Speed Wi-Fi', 'Smart 65" OLED TV', 'Rainfall Shower']
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleAmenity = (amenity) => {
    setFormData((prev) => {
      const exists = prev.selectedAmenities.includes(amenity);
      return {
        ...prev,
        selectedAmenities: exists
          ? prev.selectedAmenities.filter((a) => a !== amenity)
          : [...prev.selectedAmenities, amenity]
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.number || !formData.name) {
      addToast({
        title: 'Missing Room Fields',
        message: 'Please provide both room number and suite name.',
        type: 'warning'
      });
      return;
    }

    addRoom({
      number: formData.number,
      name: formData.name,
      type: formData.category,
      category: formData.category,
      floor: formData.floor,
      price: Number(formData.price),
      size: formData.size,
      bed: formData.bed,
      adults: Number(formData.adults),
      children: Number(formData.children),
      status: formData.status,
      images: [formData.imageUrl],
      amenities: formData.selectedAmenities,
      description: formData.description || `Luxury ${formData.category} suite overlooking resort grounds.`
    });

    addToast({
      title: 'Room Created',
      message: `Suite ${formData.number} (${formData.name}) is now live in resort inventory.`,
      type: 'gold'
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Suite to Inventory"
      subtitle="Expand resort capacity with customized suite specifications and amenities."
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Basic Info */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-stone-600 mb-1">
              Room / Suite Number *
            </label>
            <input
              type="text"
              placeholder="e.g. 504"
              value={formData.number}
              onChange={(e) => handleChange('number', e.target.value)}
              required
              className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs text-slate-900 bg-white focus:outline-none focus:border-amber-500"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-stone-600 mb-1">
              Suite Name / Title *
            </label>
            <input
              type="text"
              placeholder="e.g. Sapphire Horizon Presidential Suite"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              required
              className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs text-slate-900 bg-white focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Category, Floor, Price */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-stone-600 mb-1">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-slate-900 bg-white focus:outline-none focus:border-amber-500"
            >
              <option value="Deluxe">Deluxe</option>
              <option value="Executive Suite">Executive Suite</option>
              <option value="Ocean View">Ocean View</option>
              <option value="Penthouse">Penthouse</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-stone-600 mb-1">
              Floor Location
            </label>
            <input
              type="text"
              placeholder="e.g. 4th Floor Sky Wing"
              value={formData.floor}
              onChange={(e) => handleChange('floor', e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs text-slate-900 bg-white focus:outline-none focus:border-amber-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-stone-600 mb-1">
              Base Price ($ / night)
            </label>
            <input
              type="number"
              placeholder="550"
              value={formData.price}
              onChange={(e) => handleChange('price', e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs text-slate-900 bg-white focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Dimensions, Bed, Status */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-stone-600 mb-1">
              Suite Area (m²)
            </label>
            <input
              type="text"
              placeholder="e.g. 95 m²"
              value={formData.size}
              onChange={(e) => handleChange('size', e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs text-slate-900 bg-white focus:outline-none focus:border-amber-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-stone-600 mb-1">
              Bed Layout
            </label>
            <input
              type="text"
              placeholder="e.g. 1 Emperor Bed"
              value={formData.bed}
              onChange={(e) => handleChange('bed', e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs text-slate-900 bg-white focus:outline-none focus:border-amber-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-stone-600 mb-1">
              Initial Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => handleChange('status', e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-slate-900 bg-white focus:outline-none focus:border-amber-500"
            >
              <option value="Available">Available</option>
              <option value="Occupied">Occupied</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Dirty">Dirty</option>
            </select>
          </div>
        </div>

        {/* Image URL & Description */}
        <div>
          <label className="block text-xs font-semibold text-stone-600 mb-1">
            Photo URL
          </label>
          <input
            type="url"
            value={formData.imageUrl}
            onChange={(e) => handleChange('imageUrl', e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs text-slate-900 bg-white focus:outline-none focus:border-amber-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-600 mb-1">
            Suite Description
          </label>
          <textarea
            rows={2}
            placeholder="A picturesque suite with direct infinity lagoon access..."
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs text-slate-900 bg-white focus:outline-none focus:border-amber-500 resize-none"
          />
        </div>

        {/* Amenities Selection */}
        <div>
          <label className="block text-xs font-semibold text-stone-600 mb-2">
            Included Amenities
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {AVAILABLE_AMENITIES.map((amenity) => {
              const checked = formData.selectedAmenities.includes(amenity);
              return (
                <button
                  type="button"
                  key={amenity}
                  onClick={() => toggleAmenity(amenity)}
                  className={`px-3 py-2 rounded-xl border text-left text-xs font-medium flex items-center justify-between transition-all ${
                    checked
                      ? 'border-amber-500 bg-amber-50 text-amber-900'
                      : 'border-stone-200 text-stone-600 bg-white hover:border-stone-300'
                  }`}
                >
                  <span className="truncate">{amenity}</span>
                  {checked && <Check className="w-3.5 h-3.5 text-amber-600 shrink-0 ml-1" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit */}
        <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2 sm:gap-3 pt-3 border-t border-stone-100">
          <Button type="button" onClick={onClose} variant="ghost" size="md" className="w-full sm:w-auto justify-center">
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="md" icon={Plus} className="w-full sm:w-auto justify-center">
            Save & Add Suite
          </Button>
        </div>
      </form>
    </Modal>
  );
}
