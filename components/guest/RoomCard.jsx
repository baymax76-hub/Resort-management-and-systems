'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Star,
  Users,
  Maximize2,
  Wifi,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Eye,
  Check,
  Coffee,
  Waves,
  Tv
} from 'lucide-react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

export default function RoomCard({ room, onBook }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = room.images && room.images.length > 0 ? room.images : [
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80'
  ];

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const isAvailable = room.status === 'Available';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-stone-200/90 dark:border-slate-800 transition-all duration-300 flex flex-col group"
    >
      {/* Image Carousel Header */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-900">
        <motion.img
          key={currentImageIndex}
          initial={{ opacity: 0.6, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          src={images[currentImageIndex]}
          alt={room.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
          <Badge
            variant={room.status}
            showDot
            className="shadow-md bg-white/90 dark:bg-slate-900/90 backdrop-blur-md font-semibold"
          >
            {room.status}
          </Badge>
          <div className="bg-slate-900/85 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 shadow-md border border-white/10">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>{room.rating}</span>
            <span className="text-slate-400 font-normal">({room.reviewsCount})</span>
          </div>
        </div>

        {/* Carousel Arrows */}
        {images.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between px-2 sm:px-3 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <button
              onClick={prevImage}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 text-slate-900 backdrop-blur-md flex items-center justify-center shadow-lg hover:bg-white transition-all transform hover:scale-110 cursor-pointer pointer-events-auto"
            >
              <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            <button
              onClick={nextImage}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 text-slate-900 backdrop-blur-md flex items-center justify-center shadow-lg hover:bg-white transition-all transform hover:scale-110 cursor-pointer pointer-events-auto"
            >
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        )}

        {/* Carousel Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 pointer-events-none">
            {images.map((_, idx) => (
              <span
                key={idx}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === currentImageIndex
                    ? 'w-6 bg-white shadow-md'
                    : 'bg-white/50 backdrop-blur-sm'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Card Content Body */}
      <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-stone-500 dark:text-slate-400 font-medium">
            <span className="uppercase tracking-wider text-amber-600 dark:text-amber-400 font-semibold text-[11px] sm:text-xs">
              {room.category}
            </span>
            <span className="text-[11px] sm:text-xs">Suite {room.number} • {room.floor}</span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-1.5 sm:mt-2 line-clamp-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
            {room.name}
          </h3>

          <p className="text-xs text-stone-500 dark:text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
            {room.description}
          </p>

          <div className="mt-3 sm:mt-4 flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-stone-600 dark:text-slate-300 bg-stone-50 dark:bg-slate-800/60 p-2.5 rounded-2xl border border-stone-100 dark:border-slate-800">
            <div className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <span>Up to {room.capacity.adults + (room.capacity.children || 0)} Guests</span>
            </div>
            <span className="text-stone-300 dark:text-slate-700">•</span>
            <div className="flex items-center gap-1 truncate">
              <Maximize2 className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <span>{room.size}</span>
            </div>
          </div>

          <div className="mt-3 sm:mt-4 flex flex-wrap gap-1.5">
            {room.amenities.slice(0, 3).map((amenity, idx) => (
              <span
                key={idx}
                className="text-[10px] sm:text-[11px] bg-stone-100 dark:bg-slate-800 text-stone-700 dark:text-slate-300 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg font-medium flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3 text-amber-500" />
                {amenity}
              </span>
            ))}
            {room.amenities.length > 3 && (
              <span className="text-[10px] sm:text-[11px] text-stone-400 px-1 py-0.5 font-medium">
                +{room.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>

        <div className="mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-stone-100 dark:border-slate-800 flex items-center justify-between gap-2">
          <div>
            <span className="text-[11px] sm:text-xs text-stone-400 block font-medium">Starting from</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">${room.price}</span>
              <span className="text-[11px] sm:text-xs text-stone-500 dark:text-slate-400 font-medium">/ night</span>
            </div>
          </div>

          <Button
            onClick={() => onBook(room)}
            disabled={!isAvailable}
            variant={isAvailable ? 'primary' : 'outline'}
            size="md"
            className="px-4 sm:px-5 font-semibold"
          >
            {isAvailable ? 'Book Suite' : 'Occupied'}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
