'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  MessageSquare,
  X,
  Send,
  Bot,
  User,
  Bed,
  BellRing,
  Utensils,
  Sun,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  Volume2,
  VolumeX
} from 'lucide-react';
import { useHotel } from '@/context/HotelContext';
import { useToast } from '@/context/ToastContext';
import Button from '../ui/Button';

export default function AIConciergeWidget() {
  const { rooms, createServiceRequest, currentUser, bookRoom } = useHotel();
  const { addToast } = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const [messages, setMessages] = useState([
    {
      id: 'msg-1',
      sender: 'ai',
      text: `Hello ${currentUser?.name || 'Valued Guest'}! I am Aura AI, your 24/7 Virtual Resort Butler. How may I assist your stay today?`,
      timestamp: 'Just now',
      suggestions: [
        'Recommend a romantic penthouse',
        'Send extra towels to my suite',
        'Order gourmet seafood dinner',
        'What are the spa & infinity pool hours?'
      ]
    }
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      scrollToBottom();
    }
  }, [isOpen, messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputMessage;
    if (!query.trim()) return;

    const userMsg = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsTyping(true);

    // AI Intent Processing Simulation
    setTimeout(() => {
      let aiResponseText = '';
      let suggestions = [];
      const lowerQuery = query.toLowerCase();

      if (lowerQuery.includes('towel') || lowerQuery.includes('clean') || lowerQuery.includes('housekeeping')) {
        // Execute real live action: create service request
        createServiceRequest({
          serviceType: 'Extra Towels & Linens',
          category: 'Housekeeping',
          description: `Dispatched by Aura AI Concierge: "${query}"`,
          priority: 'High'
        });

        aiResponseText = `I have immediately dispatched an express housekeeping ticket to Suite ${currentUser?.roomNumber || '101'} for Extra Towels & Linens! An on-duty butler is en route (ETA: 10 mins).`;
        suggestions = ['Order room dining', 'View active tickets', 'Spa timing'];

        addToast({
          title: 'Aura AI Action Executed',
          message: 'Housekeeping ticket created and assigned to floor butler.',
          type: 'gold'
        });
      } else if (lowerQuery.includes('dinner') || lowerQuery.includes('food') || lowerQuery.includes('seafood') || lowerQuery.includes('menu')) {
        createServiceRequest({
          serviceType: 'Gourmet In-Room Dining',
          category: 'Dining',
          description: `Chef order placed via Aura AI: "${query}"`,
          priority: 'High'
        });

        aiResponseText = `I've placed a Gourmet In-Room Dining request for Suite ${currentUser?.roomNumber || '101'}! Our Michelin-starred kitchen will prepare fresh Truffle Lobster & Sea Bass.`;
        suggestions = ['Wine pairings', 'Late checkout', 'Spa booking'];

        addToast({
          title: 'Dining Order Sent',
          message: 'Kitchen staff notified for Suite ' + (currentUser?.roomNumber || '101'),
          type: 'success'
        });
      } else if (lowerQuery.includes('penthouse') || lowerQuery.includes('recommend') || lowerQuery.includes('suite') || lowerQuery.includes('room')) {
        const topPenthouse = rooms.find((r) => r.category === 'Penthouse') || rooms[0];
        aiResponseText = `I highly recommend the ${topPenthouse.name} (Suite ${topPenthouse.number})! It features ${topPenthouse.view}, ${topPenthouse.size} of opulent space, and a heated infinity plunge pool for $${topPenthouse.price}/night. Would you like me to open the reservation drawer for you?`;
        suggestions = [`Book ${topPenthouse.name}`, 'Show Ocean View villas', 'Filter by price'];
      } else if (lowerQuery.includes('spa') || lowerQuery.includes('pool') || lowerQuery.includes('hours') || lowerQuery.includes('time')) {
        aiResponseText = `The L'Horizon Hydrotherapy Spa & Fitness Pavilion is open daily from 6:00 AM to 10:00 PM. Our heated infinity lagoon pool and sunset cabanas remain accessible 24/7 with your Digital Room Key!`;
        suggestions = ['Book spa massage', 'Private cabana rental', 'Airport transfer'];
      } else if (lowerQuery.includes('weather') || lowerQuery.includes('temperature') || lowerQuery.includes('sun')) {
        aiResponseText = `Azure Bay weather today is 28°C (82°F) with clear skies, light coastal breeze, and ideal 100% ocean swimming conditions. Sunset is scheduled for 7:18 PM!`;
        suggestions = ['Sunset yacht charter', 'Pool cabana rental', 'Dinner reservation'];
      } else {
        aiResponseText = `Thank you for asking! As your private virtual butler, I can arrange room service, recommend luxury suites, check dining menus, or dispatch housekeeping to your suite. What would you like to explore next?`;
        suggestions = [
          'Recommend a penthouse',
          'Dispatch extra towels',
          'Order room dining',
          'Resort map & attractions'
        ];
      }

      const aiMsg = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-50"
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative group p-4 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-slate-950 shadow-2xl shadow-amber-500/40 border-2 border-amber-300 hover:scale-105 transition-all duration-300 flex items-center justify-center cursor-pointer"
          title="Aura AI Virtual Concierge"
        >
          <Sparkles className="w-6 h-6 animate-pulse" />

          {/* Unread badge */}
          {unreadCount > 0 && !isOpen && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-600 text-white font-bold text-[10px] flex items-center justify-center shadow-md animate-bounce">
              {unreadCount}
            </span>
          )}

          {/* Tooltip hover */}
          <span className="absolute right-full mr-3 bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-slate-800">
            Aura AI Concierge
          </span>
        </button>
      </motion.div>

      {/* Floating AI Chat Window Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            aria-label="Aura AI Virtual Concierge Chat"
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="fixed bottom-[8.5rem] md:bottom-24 right-3 sm:right-6 z-50 w-[94vw] sm:w-[420px] max-h-[70vh] sm:max-h-[600px] h-[75vh] sm:h-[80vh] bg-slate-950 text-white rounded-3xl shadow-2xl border border-slate-800 overflow-hidden flex flex-col"
          >
            {/* Window Header */}
            <div className="p-4 sm:p-5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shadow-inner">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white leading-tight">Aura AI Concierge</h3>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <p className="text-[10px] text-slate-400">24/7 Virtual Resort Butler • Live State Linked</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-950 text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-amber-500 text-slate-950 font-medium rounded-br-none shadow-md'
                        : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-bl-none shadow-sm'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className={`text-[9px] mt-1.5 block ${msg.sender === 'user' ? 'text-slate-900/70 text-right' : 'text-slate-500'}`}>
                      {msg.timestamp}
                    </span>
                  </div>

                  {/* Suggestion Chips */}
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="mt-2.5 flex flex-wrap gap-1.5 max-w-[90%]">
                      {msg.suggestions.map((sug, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(sug)}
                          className="text-[11px] bg-slate-900 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2.5 py-1 rounded-xl transition-all font-medium text-left"
                        >
                          ✨ {sug}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-center gap-2 text-slate-400 bg-slate-900 p-3 rounded-2xl border border-slate-800 w-28">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                  <span className="text-[11px]">Typing...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Box */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask Aura AI (e.g. towels, food, rooms)..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
              <Button
                type="submit"
                disabled={!inputMessage.trim()}
                variant="primary"
                size="sm"
                className="!p-2.5 rounded-2xl shadow-gold-glow"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
