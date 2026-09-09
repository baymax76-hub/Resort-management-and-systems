'use client';

import React, { useState } from 'react';
import { Star, Sparkles, Check, Upload } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { useHotel } from '@/context/HotelContext';
import { useToast } from '@/context/ToastContext';

export default function AddReviewModal({ isOpen, onClose }) {
  const { addReview, currentUser, rooms } = useHotel();
  const { addToast } = useToast();

  const [authorName, setAuthorName] = useState(currentUser?.name || 'Alexander Hayes');
  const [selectedRoomName, setSelectedRoomName] = useState(rooms[0]?.name || 'Azure Presidential Penthouse');
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [overallRating, setOverallRating] = useState(5);

  const [subRatings, setSubRatings] = useState({
    cleanliness: 5,
    comfort: 5,
    location: 5,
    service: 5,
    value: 5
  });

  const handleSubRatingChange = (key, val) => {
    setSubRatings((prev) => ({ ...prev, [key]: val }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reviewTitle.trim() || !reviewComment.trim()) {
      addToast({
        title: 'Missing Feedback',
        message: 'Please provide a title and review comment.',
        type: 'warning'
      });
      return;
    }

    addReview({
      author: authorName,
      location: 'Verified Resort Guest',
      roomName: selectedRoomName,
      rating: overallRating,
      ratings: subRatings,
      title: reviewTitle,
      comment: reviewComment
    });

    addToast({
      title: 'Review Published!',
      message: 'Thank you for sharing your resort experience.',
      type: 'gold'
    });

    setReviewTitle('');
    setReviewComment('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Share Your Resort Experience"
      subtitle="Your feedback helps maintain our world-class 5-star hospitality standards."
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Guest & Suite info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-600 dark:text-slate-300 mb-1">
              Your Name
            </label>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white bg-white dark:bg-slate-900 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-600 dark:text-slate-300 mb-1">
              Suite Experienced
            </label>
            <select
              value={selectedRoomName}
              onChange={(e) => setSelectedRoomName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white bg-white dark:bg-slate-900 focus:outline-none focus:border-amber-500"
            >
              {rooms.map((r) => (
                <option key={r.id} value={r.name}>
                  {r.name} (Suite {r.number})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Overall Star Rating Selector */}
        <div className="bg-stone-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-stone-200/80 dark:border-slate-700 text-center space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            Overall Rating Score
          </label>
          <div className="flex justify-center items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setOverallRating(star)}
                className="p-1 hover:scale-125 transition-transform"
              >
                <Star
                  className={`w-7 h-7 ${
                    star <= overallRating
                      ? 'text-amber-400 fill-amber-400'
                      : 'text-stone-300 dark:text-slate-700'
                  }`}
                />
              </button>
            ))}
          </div>
          <span className="text-xs text-stone-500 dark:text-slate-400 block">
            {overallRating === 5
              ? 'Flawless 5-Star Experience'
              : overallRating === 4
              ? 'Great Stay'
              : 'Average Stay'}
          </span>
        </div>

        {/* Sub-Category Ratings Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
          {[
            { key: 'cleanliness', label: 'Cleanliness' },
            { key: 'comfort', label: 'Suite Comfort' },
            { key: 'location', label: 'Location & View' },
            { key: 'service', label: 'Butler Service' },
            { key: 'value', label: 'Overall Value' }
          ].map((cat) => (
            <div key={cat.key} className="bg-stone-50 dark:bg-slate-800/40 p-3 rounded-xl border border-stone-200/70 dark:border-slate-800">
              <span className="block text-stone-600 dark:text-slate-300 font-medium mb-1">{cat.label}</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => handleSubRatingChange(cat.key, s)}
                    className="p-1 -m-0.5 rounded hover:scale-110 active:scale-95 transition-transform touch-manipulation"
                    aria-label={`${cat.label} ${s} stars`}
                  >
                    <Star
                      className={`w-3.5 h-3.5 ${
                        s <= subRatings[cat.key]
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-stone-300 dark:text-slate-700'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Title & Comment */}
        <div>
          <label className="block text-xs font-semibold text-stone-600 dark:text-slate-300 mb-1">
            Review Title *
          </label>
          <input
            type="text"
            placeholder="e.g. Unforgettable oceanfront views & butler care"
            value={reviewTitle}
            onChange={(e) => setReviewTitle(e.target.value)}
            required
            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white bg-white dark:bg-slate-900 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-600 dark:text-slate-300 mb-1">
            Detailed Review & Highlights *
          </label>
          <textarea
            rows={3}
            placeholder="Describe your dining, room amenities, spa experience..."
            value={reviewComment}
            onChange={(e) => setReviewComment(e.target.value)}
            required
            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white bg-white dark:bg-slate-900 focus:outline-none focus:border-amber-500 resize-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2 sm:gap-3 pt-3 border-t border-stone-100 dark:border-slate-800">
          <Button type="button" onClick={onClose} variant="ghost" size="md" className="w-full sm:w-auto justify-center">
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="md" icon={Sparkles} className="w-full sm:w-auto justify-center">
            Submit Review
          </Button>
        </div>
      </form>
    </Modal>
  );
}
