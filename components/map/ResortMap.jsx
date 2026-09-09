'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Navigation,
  Compass,
  Plane,
  Anchor,
  Utensils,
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  Layers,
  Sun,
  ShieldCheck
} from 'lucide-react';
import { RESORT_LANDMARKS } from '@/data/mockData';
import Button from '../ui/Button';

export default function ResortMap() {
  const landmarks = RESORT_LANDMARKS || [];
  const [selectedLandmark, setSelectedLandmark] = useState(landmarks[0] || null);
  const [copiedCoords, setCopiedCoords] = useState(false);
  const [mapType, setMapType] = useState('roadmap'); // 'roadmap' | 'satellite'

  const handleCopyCoords = () => {
    if (!selectedLandmark?.coords) return;
    const coordString = `${selectedLandmark.coords.lat}, ${selectedLandmark.coords.lng}`;
    navigator.clipboard.writeText(coordString);
    setCopiedCoords(true);
    setTimeout(() => setCopiedCoords(false), 2000);
  };

  // Google Maps embed URL
  const googleMapEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14372.482937102927!2d-77.34821!3d25.07812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDA0JzQxLjMiTiA3N8KwMjAnMTYuOCJX!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus&t=${mapType === 'satellite' ? 'k' : 'm'}`;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-stone-200/90 dark:border-slate-800 space-y-6 transition-colors duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-amber-600 dark:text-amber-400">
            <Compass className="w-4 h-4" />
            <span>Interactive Resort Map & Surroundings</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
            L'Horizon Azure Private Bay Location
          </h3>
          <p className="text-xs text-stone-500 dark:text-slate-400 mt-0.5">
            Explore our beachfront sanctuary, Michelin dining decks, private yacht marina, and VIP helipad.
          </p>
        </div>

        {/* Satellite / Map View Switcher */}
        <div className="flex items-center bg-stone-100 dark:bg-slate-800 p-1 rounded-2xl border border-stone-200 dark:border-slate-700 shrink-0">
          <button
            onClick={() => setMapType('roadmap')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all ${
              mapType === 'roadmap'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-stone-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Terrain Map
          </button>
          <button
            onClick={() => setMapType('satellite')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all ${
              mapType === 'satellite'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-stone-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Satellite View
          </button>
        </div>
      </div>

      {/* Map + Hotspots Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Google Map Embed Frame */}
        <div className="lg:col-span-2 relative rounded-3xl overflow-hidden shadow-lg border border-stone-200/90 dark:border-slate-800 bg-slate-950 min-h-[380px] sm:min-h-[460px]">
          <iframe
            title="L'Horizon Azure Google Map"
            src={googleMapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: '380px' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full object-cover filter contrast-[1.05]"
          />

          {/* Map Overlay Badge */}
          <div className="absolute top-4 left-4 bg-slate-950/85 backdrop-blur-md text-white px-4 py-2.5 rounded-2xl border border-white/10 shadow-xl flex items-center gap-2">
            <MapPin className="w-4 h-4 text-amber-400 animate-bounce" />
            <div>
              <span className="text-xs font-bold block leading-tight">Azure Bay Sanctuary</span>
              <span className="text-[10px] text-slate-400">Lat: 25.078° N • Lng: 77.340° W</span>
            </div>
          </div>
        </div>

        {/* Landmark Selection List & Details Panel */}
        <div className="space-y-4 flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-slate-400 mb-3">
              Hotspot Destinations
            </h4>

            <div className="space-y-2.5">
              {landmarks.map((lm) => (
                <motion.button
                  key={lm.id}
                  onClick={() => setSelectedLandmark(lm)}
                  whileHover={{ x: 2 }}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                    selectedLandmark?.id === lm.id
                      ? 'bg-amber-500/10 border-amber-500 text-slate-900 dark:text-white shadow-sm'
                      : 'bg-stone-50 dark:bg-slate-800/60 border-stone-200/80 dark:border-slate-800 text-stone-600 dark:text-slate-300 hover:border-amber-400/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={lm.image}
                      alt={lm.name}
                      className="w-10 h-10 rounded-xl object-cover shadow-sm shrink-0"
                    />
                    <div>
                      <h5 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                        {lm.name}
                      </h5>
                      <span className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">
                        {lm.category}
                      </span>
                    </div>
                  </div>
                  <Navigation className={`w-4 h-4 shrink-0 ${selectedLandmark?.id === lm.id ? 'text-amber-500' : 'text-stone-400'}`} />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Landmark Card Detail */}
          {selectedLandmark && (
            <div className="bg-stone-50 dark:bg-slate-800/80 p-4 rounded-2xl border border-stone-200/80 dark:border-slate-700/60 space-y-3">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400">
                    {selectedLandmark.category}
                  </span>
                  <button
                    onClick={handleCopyCoords}
                    className="text-[10px] text-stone-500 dark:text-slate-400 hover:text-amber-600 flex items-center gap-1 font-mono"
                  >
                    {copiedCoords ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    {copiedCoords ? 'Copied!' : 'Copy Coords'}
                  </button>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                  {selectedLandmark.name}
                </h4>
                <p className="text-xs text-stone-600 dark:text-slate-300 mt-1 leading-relaxed">
                  {selectedLandmark.description}
                </p>
              </div>

              {/* Airport Transfer Note */}
              <div className="pt-2 border-t border-stone-200 dark:border-slate-700 flex items-center justify-between text-xs text-stone-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <Plane className="w-3.5 h-3.5 text-amber-500" /> Airport: 25 mins
                </span>
                <span className="flex items-center gap-1">
                  <Anchor className="w-3.5 h-3.5 text-amber-500" /> Marina Deck 4
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
