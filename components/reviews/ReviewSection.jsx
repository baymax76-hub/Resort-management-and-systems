'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  ThumbsUp,
  Sparkles,
  CheckCircle,
  Filter,
  MessageSquare,
  Plus,
  Award,
  ShieldCheck,
  Reply,
  Send,
  Edit3,
  Building,
  CheckCircle2
} from 'lucide-react';
import { useHotel } from '@/context/HotelContext';
import { useToast } from '@/context/ToastContext';
import Button from '../ui/Button';
import AddReviewModal from './AddReviewModal';

export default function ReviewSection({ isOwner = false }) {
  const { reviews, kpis, currentUser, replyToReview } = useHotel();
  const { addToast } = useToast();

  const [ratingFilter, setRatingFilter] = useState('All');
  const [isAddReviewModalOpen, setIsAddReviewModalOpen] = useState(false);
  
  // Reply modal / composer state
  const [replyingReviewId, setReplyingReviewId] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [responderName, setResponderName] = useState('GM Alexandra Vance');

  const filteredReviews = reviews.filter((rev) => {
    if (ratingFilter === '5') return Math.floor(rev.rating) === 5;
    if (ratingFilter === '4') return Math.floor(rev.rating) === 4;
    return true;
  });

  const handleOpenReply = (review) => {
    setReplyingReviewId(review.id);
    setReplyText(review.ownerReply?.text || '');
  };

  const handleQuickTemplate = (templateType, author) => {
    if (templateType === 'warm') {
      setReplyText(
        `Dear ${author}, thank you warmly for your delightful review. It was an absolute privilege hosting you at L'Horizon Azure. Our entire team looks forward to welcoming you back for another unforgettable oceanfront escape.`
      );
    } else if (templateType === 'service') {
      setReplyText(
        `Dear ${author}, thank you for choosing L'Horizon Azure. We are thrilled to hear that our dedicated butler service and in-room dining met your expectations. Please do let our VIP Concierge know when you plan your next stay!`
      );
    } else if (templateType === 'appreciation') {
      setReplyText(
        `Dear ${author}, we sincerely appreciate you taking the time to share your feedback. Your kind words regarding our penthouse suites have been passed along to our housekeeping and culinary teams. Warmest regards from Azure Bay.`
      );
    }
  };

  const handleSubmitReply = (e) => {
    e.preventDefault();
    if (!replyingReviewId || !replyText.trim()) return;

    replyToReview(replyingReviewId, replyText, responderName);
    addToast({
      title: 'Management Response Published!',
      message: 'Your official response is now live on the guest review card.',
      type: 'gold'
    });

    setReplyingReviewId(null);
    setReplyText('');
  };

  const isOwnerMode = isOwner || currentUser?.role === 'owner';

  return (
    <div className="bg-[#0e1626] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#1e2a42] space-y-8 transition-colors duration-300">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-amber-400">
            <Award className="w-4 h-4" />
            <span>{isOwnerMode ? 'Management Review Moderation & Response' : 'Verified Guest Experiences & Ratings'}</span>
          </div>
          <h3 className="text-xl sm:text-3xl font-bold text-white font-serif mt-1">
            {isOwnerMode ? 'Guest Review Center & Reply Hub' : 'Resort Reviews & Guest Testimonials'}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {isOwnerMode
              ? 'Review guest ratings, inspect multi-category scores, and publish official management responses.'
              : 'Read verified reviews from guests who have stayed in our oceanfront suites and penthouses.'}
          </p>
        </div>

        {/* Guest gets "Write a Review", Owner gets Management Badge */}
        {!isOwnerMode ? (
          <Button
            onClick={() => setIsAddReviewModalOpen(true)}
            variant="primary"
            size="md"
            icon={Plus}
            className="shrink-0 !bg-amber-500 !text-slate-950 font-bold shadow-lg shadow-amber-500/20"
          >
            Write a Review
          </Button>
        ) : (
          <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-3.5 py-2 rounded-2xl text-xs font-bold text-amber-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Official Management Responder</span>
          </div>
        )}
      </div>

      {/* Overview Score Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-[#141d2e] p-6 rounded-3xl border border-slate-800">
        {/* Score Box */}
        <div className="flex flex-col items-center justify-center text-center p-4 lg:border-r border-slate-800">
          <div className="text-5xl font-extrabold text-white tracking-tight font-mono">
            {kpis.avgReviewRating}
          </div>
          <div className="flex items-center gap-1 my-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-5 h-5 text-amber-400 fill-amber-400" />
            ))}
          </div>
          <span className="text-xs font-semibold text-slate-300">
            Based on {kpis.totalReviews} verified guest reviews
          </span>
          <span className="text-[11px] text-emerald-400 font-bold mt-1 inline-flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> 100% Verified Guests
          </span>
        </div>

        {/* Category Breakdown */}
        <div className="lg:col-span-2 space-y-2.5 justify-center flex flex-col px-2">
          {[
            { name: 'Cleanliness & Sanitation', score: 5.0, pct: '100%' },
            { name: 'Suite Comfort & Bedding', score: 4.9, pct: '98%' },
            { name: 'Beachfront Location & Views', score: 5.0, pct: '100%' },
            { name: 'Butler & Concierge Service', score: 4.9, pct: '98%' },
            { name: 'Value & Dining Experience', score: 4.8, pct: '96%' }
          ].map((cat) => (
            <div key={cat.name} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-300">{cat.name}</span>
                <span className="font-bold text-amber-400 font-mono">{cat.score} / 5.0</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: cat.pct }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400">Filter:</span>
          {['All', '5', '4'].map((f) => (
            <button
              key={f}
              onClick={() => setRatingFilter(f)}
              className={`px-3 py-1.5 text-xs rounded-xl font-semibold transition-all cursor-pointer ${
                ratingFilter === f
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'bg-[#141d2e] text-slate-400 hover:text-white'
              }`}
            >
              {f === 'All' ? 'All Reviews' : `${f} Stars`}
            </button>
          ))}
        </div>
        <span className="text-xs text-slate-400 font-mono">{filteredReviews.length} reviews cataloged</span>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {filteredReviews.map((review) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-3xl bg-[#121a2a] border border-slate-800 space-y-4 shadow-sm"
          >
            {/* Review Author & Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={review.avatar}
                  alt={review.author}
                  className="w-11 h-11 rounded-2xl object-cover border border-slate-700 shadow-sm"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white">{review.author}</h4>
                    {review.verifiedGuest && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        <CheckCircle2 className="w-3 h-3" /> Verified Stay
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-slate-400">
                    {review.location} • Stayed in <strong className="text-slate-300">{review.roomName}</strong>
                  </span>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center gap-1 text-amber-400 justify-end">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(review.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-700'
                      }`}
                    />
                  ))}
                  <span className="ml-1 text-xs font-bold text-white font-mono">{review.rating}</span>
                </div>
                <span className="text-[11px] text-slate-500 mt-0.5 block">{review.date}</span>
              </div>
            </div>

            {/* Review Title & Comment */}
            <div className="space-y-1.5">
              <h5 className="text-sm font-bold text-white">{review.title}</h5>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">{review.comment}</p>
            </div>

            {/* Sub-Ratings Chips */}
            {review.ratings && (
              <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800/80">
                {Object.entries(review.ratings).map(([key, val]) => (
                  <span
                    key={key}
                    className="text-[10px] bg-[#141d2e] border border-slate-800 text-slate-400 px-2.5 py-1 rounded-lg capitalize font-mono"
                  >
                    {key}: <strong className="text-amber-400">{val}.0</strong>
                  </span>
                ))}
              </div>
            )}

            {/* Official Management Reply Block (if present) */}
            {review.ownerReply && (
              <div className="mt-4 p-4 rounded-2xl bg-[#162238] border border-amber-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xs">
                      LA
                    </div>
                    <span className="text-xs font-bold text-amber-400">
                      Response from {review.ownerReply.responder} ({review.ownerReply.role || 'Management'})
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">• {review.ownerReply.date}</span>
                  </div>

                  {isOwnerMode && (
                    <button
                      onClick={() => handleOpenReply(review)}
                      className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      Edit Reply
                    </button>
                  )}
                </div>
                <p className="text-xs text-slate-200 leading-relaxed pl-8 italic">
                  "{review.ownerReply.text}"
                </p>
              </div>
            )}

            {/* If Owner and NO reply yet: show Reply Button */}
            {isOwnerMode && !review.ownerReply && (
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => handleOpenReply(review)}
                  className="px-4 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500 text-amber-400 hover:text-slate-950 border border-amber-500/30 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Reply className="w-3.5 h-3.5" />
                  Reply as Management
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Guest: Add Review Modal */}
      {!isOwnerMode && (
        <AddReviewModal
          isOpen={isAddReviewModalOpen}
          onClose={() => setIsAddReviewModalOpen(false)}
        />
      )}

      {/* Owner: Reply to Review Modal Composer */}
      <AnimatePresence>
        {isOwnerMode && replyingReviewId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0e1626] border border-[#1e2a42] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    <Reply className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Management Response Composer</h3>
                    <p className="text-xs text-slate-400">Publish official response to verified guest</p>
                  </div>
                </div>
                <button
                  onClick={() => setReplyingReviewId(null)}
                  className="text-slate-400 hover:text-white text-lg font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmitReply} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Responding Official Name / Title
                  </label>
                  <input
                    type="text"
                    required
                    value={responderName}
                    onChange={(e) => setResponderName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141d2e] border border-slate-700 text-white outline-none focus:border-amber-500 font-sans"
                  />
                </div>

                {/* Quick Templates */}
                <div className="space-y-1.5">
                  <span className="text-[11px] text-slate-400 font-semibold">1-Click Luxury Templates:</span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        handleQuickTemplate(
                          'warm',
                          reviews.find((r) => r.id === replyingReviewId)?.author || 'Guest'
                        )
                      }
                      className="px-2.5 py-1 rounded-lg bg-[#141d2e] hover:bg-slate-800 text-slate-300 text-[11px] border border-slate-700 cursor-pointer"
                    >
                      ✨ Warm Hospitality
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleQuickTemplate(
                          'service',
                          reviews.find((r) => r.id === replyingReviewId)?.author || 'Guest'
                        )
                      }
                      className="px-2.5 py-1 rounded-lg bg-[#141d2e] hover:bg-slate-800 text-slate-300 text-[11px] border border-slate-700 cursor-pointer"
                    >
                      🛎️ Butler & Dining
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleQuickTemplate(
                          'appreciation',
                          reviews.find((r) => r.id === replyingReviewId)?.author || 'Guest'
                        )
                      }
                      className="px-2.5 py-1 rounded-lg bg-[#141d2e] hover:bg-slate-800 text-slate-300 text-[11px] border border-slate-700 cursor-pointer"
                    >
                      💎 VIP Appreciation
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Official Response Message
                  </label>
                  <textarea
                    rows="4"
                    required
                    placeholder="Write a personalized, courteous response on behalf of resort management..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141d2e] border border-slate-700 text-white outline-none focus:border-amber-500 resize-none font-sans"
                  />
                </div>

                <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setReplyingReviewId(null)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-lg shadow-amber-500/20 cursor-pointer"
                  >
                    Publish Management Response
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
