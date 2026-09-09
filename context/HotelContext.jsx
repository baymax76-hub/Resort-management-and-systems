'use client';

import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { INITIAL_ROOMS, INITIAL_BOOKINGS, INITIAL_REQUESTS, INITIAL_REVIEWS, INITIAL_INVENTORY } from '@/data/mockData';

const HotelContext = createContext(null);

export function HotelProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({
    role: 'guest', // 'guest' | 'owner'
    name: 'Eleanor Vance',
    email: 'eleanor.vance@vanguard.com',
    roomNumber: '101',
    activeBookingId: 'BK-8941'
  });

  const [rooms, setRooms] = useState(INITIAL_ROOMS);
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [inventory, setInventory] = useState(INITIAL_INVENTORY);

  // 1. Book Room Action
  const bookRoom = useCallback((bookingData) => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const bookingId = `BK-${randomSuffix}`;
    const bookingNumber = `RES-${randomSuffix}`;
    const digitalKeyPin = Math.floor(1000 + Math.random() * 9000).toString();

    const nights = Math.max(1, bookingData.nights || 1);
    const baseRate = Number(bookingData.baseRate) || 0;
    const subtotal = baseRate * nights;
    const tax = Math.round(subtotal * 0.18 * 100) / 100;
    const serviceFee = 45;
    const totalPrice = subtotal + tax + serviceFee;

    const newBooking = {
      id: bookingId,
      bookingNumber,
      guestName: bookingData.guestName,
      guestEmail: bookingData.guestEmail,
      guestPhone: bookingData.guestPhone,
      roomId: bookingData.roomId,
      roomName: bookingData.roomName,
      roomNumber: bookingData.roomNumber,
      roomType: bookingData.roomType,
      checkIn: bookingData.checkIn,
      checkOut: bookingData.checkOut,
      nights,
      adults: bookingData.adults || 1,
      children: bookingData.children || 0,
      baseRate,
      tax,
      serviceFee,
      totalPrice,
      paymentMethod: bookingData.paymentMethod || 'Credit Card',
      paymentStatus: bookingData.paymentMethod === 'Pay at Check-in' ? 'Pending' : 'Paid',
      stayStatus: 'Confirmed',
      specialRequests: bookingData.specialRequests || 'None',
      digitalKeyPin,
      createdAt: new Date().toISOString()
    };

    setBookings((prev) => [newBooking, ...prev]);

    setRooms((prev) =>
      prev.map((room) =>
        room.id === bookingData.roomId ? { ...room, status: 'Occupied' } : room
      )
    );

    if (currentUser?.role === 'guest') {
      setCurrentUser((prev) => ({
        ...prev,
        name: newBooking.guestName,
        email: newBooking.guestEmail,
        roomNumber: newBooking.roomNumber,
        activeBookingId: newBooking.id
      }));
    }

    return newBooking;
  }, [currentUser?.role]);

  // 2. Update Booking Status Action
  const updateBookingStatus = useCallback((bookingId, newStayStatus) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId) {
          return {
            ...b,
            stayStatus: newStayStatus,
            paymentStatus: newStayStatus === 'Completed' ? 'Paid' : b.paymentStatus
          };
        }
        return b;
      })
    );

    const booking = bookings.find((b) => b.id === bookingId);
    if (booking) {
      if (newStayStatus === 'Completed') {
        setRooms((prev) =>
          prev.map((r) => (r.id === booking.roomId ? { ...r, status: 'Dirty' } : r))
        );
      } else if (newStayStatus === 'Cancelled') {
        setRooms((prev) =>
          prev.map((r) => (r.id === booking.roomId ? { ...r, status: 'Available' } : r))
        );
      } else if (newStayStatus === 'Checked-In') {
        setRooms((prev) =>
          prev.map((r) => (r.id === booking.roomId ? { ...r, status: 'Occupied' } : r))
        );
      }
    }
  }, [bookings]);

  // 3. Room Status Quick Toggle
  const updateRoomStatus = useCallback((roomId, newStatus) => {
    setRooms((prev) =>
      prev.map((room) => (room.id === roomId ? { ...room, status: newStatus } : room))
    );
  }, []);

  // 4. Add Custom Room
  const addRoom = useCallback((roomData) => {
    const newRoom = {
      id: `room-${Date.now()}`,
      number: roomData.number,
      name: roomData.name,
      type: roomData.type || 'Deluxe',
      category: roomData.category || 'Deluxe',
      floor: roomData.floor || '1st Floor',
      price: Number(roomData.price) || 300,
      rating: 5.0,
      reviewsCount: 1,
      status: roomData.status || 'Available',
      capacity: {
        adults: Number(roomData.adults) || 2,
        children: Number(roomData.children) || 0
      },
      size: roomData.size || '70 m²',
      view: roomData.view || 'Resort View',
      bed: roomData.bed || '1 King Bed',
      images: roomData.images?.length
        ? roomData.images
        : [
            'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80'
          ],
      amenities: roomData.amenities?.length
        ? roomData.amenities
        : ['High-Speed Wi-Fi', 'Smart TV', 'Air Conditioning', 'Rainfall Shower', 'Mini Bar'],
      description:
        roomData.description || 'Spacious and beautifully curated luxury suite with designer amenities.'
    };

    setRooms((prev) => [newRoom, ...prev]);
    return newRoom;
  }, []);

  // 5. Create Service / Housekeeping Request
  const createServiceRequest = useCallback((requestData) => {
    const newRequest = {
      id: `REQ-${Math.floor(100 + Math.random() * 900)}`,
      bookingId: requestData.bookingId || currentUser?.activeBookingId || 'BK-8941',
      roomNumber: requestData.roomNumber || currentUser?.roomNumber || '101',
      guestName: requestData.guestName || currentUser?.name || 'Guest',
      serviceType: requestData.serviceType,
      category: requestData.category || 'Housekeeping',
      description: requestData.description || `${requestData.serviceType} requested by guest.`,
      priority: requestData.priority || 'Medium',
      status: 'Pending',
      timestamp: 'Just now',
      createdAt: new Date().toISOString()
    };

    setRequests((prev) => [newRequest, ...prev]);
    return newRequest;
  }, [currentUser]);

  // 6. Update Request Status
  const updateRequestStatus = useCallback((requestId, newStatus) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === requestId ? { ...req, status: newStatus } : req))
    );
  }, []);

  // 7. Delete Request
  const deleteRequest = useCallback((requestId) => {
    setRequests((prev) => prev.filter((req) => req.id !== requestId));
  }, []);

  // 8. Add Review Action
  const addReview = useCallback((reviewData) => {
    const newReview = {
      id: `rev-${Date.now()}`,
      author: reviewData.author || currentUser?.name || 'Anonymous Guest',
      location: reviewData.location || 'Verified Traveler',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
      roomName: reviewData.roomName || 'Luxury Resort Suite',
      rating: Number(reviewData.rating) || 5,
      ratings: {
        cleanliness: Number(reviewData.ratings?.cleanliness) || 5,
        comfort: Number(reviewData.ratings?.comfort) || 5,
        location: Number(reviewData.ratings?.location) || 5,
        service: Number(reviewData.ratings?.service) || 5,
        value: Number(reviewData.ratings?.value) || 5
      },
      date: 'Just now',
      title: reviewData.title || 'Exceptional experience',
      comment: reviewData.comment || 'Wonderful stay from start to finish.',
      verifiedGuest: true,
      likes: 1
    };

    setReviews((prev) => [newReview, ...prev]);

    // Update room rating averages
    if (reviewData.roomId) {
      setRooms((prev) =>
        prev.map((r) => {
          if (r.id === reviewData.roomId || r.name === reviewData.roomName) {
            const newCount = r.reviewsCount + 1;
            const newRating = Math.round(((r.rating * r.reviewsCount + newReview.rating) / newCount) * 100) / 100;
            return { ...r, rating: newRating, reviewsCount: newCount };
          }
          return r;
        })
      );
    }

    return newReview;
  }, [currentUser]);

  // 9. Reply to Review Action (Owner / Staff Management Response)
  const replyToReview = useCallback((reviewId, replyText, staffName = 'GM Alexandra Vance') => {
    setReviews((prev) =>
      prev.map((rev) => {
        if (rev.id === reviewId) {
          return {
            ...rev,
            ownerReply: {
              text: replyText,
              responder: staffName,
              role: 'General Manager',
              date: 'Just now',
              timestamp: new Date().toISOString()
            }
          };
        }
        return rev;
      })
    );
  }, []);

  // 10. Inventory Stock Update (Increment / Decrement / Set)
  const updateInventoryStock = useCallback((itemId, deltaOrValue, mode = 'delta') => {
    setInventory((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const newStock = mode === 'delta' ? Math.max(0, item.stock + deltaOrValue) : Math.max(0, deltaOrValue);
          return {
            ...item,
            stock: newStock,
            lastRestocked: deltaOrValue > 0 ? new Date().toISOString().split('T')[0] : item.lastRestocked
          };
        }
        return item;
      })
    );
  }, []);

  // 11. Add New Inventory Item
  const addInventoryItem = useCallback((itemData) => {
    const newItem = {
      id: `inv-${Date.now()}`,
      name: itemData.name || 'New Resort Supply',
      category: itemData.category || 'Toiletries',
      stock: Number(itemData.stock) || 50,
      unit: itemData.unit || 'Units',
      minThreshold: Number(itemData.minThreshold) || 15,
      costPerUnit: Number(itemData.costPerUnit) || 10,
      location: itemData.location || 'Central Depot',
      supplier: itemData.supplier || 'Resort Global Procurement',
      lastRestocked: new Date().toISOString().split('T')[0],
      burnRate: itemData.burnRate || '5 / day'
    };

    setInventory((prev) => [newItem, ...prev]);
    return newItem;
  }, []);

  // 12. Delete Inventory Item
  const deleteInventoryItem = useCallback((itemId) => {
    setInventory((prev) => prev.filter((item) => item.id !== itemId));
  }, []);

  // 13. Quick Reorder Inventory Item (Purchase Order Simulator)
  const reorderInventoryItem = useCallback((itemId, orderQty = 50) => {
    setInventory((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            stock: item.stock + Number(orderQty),
            lastRestocked: new Date().toISOString().split('T')[0]
          };
        }
        return item;
      })
    );
  }, []);

  // Computed KPIs for Owner
  const kpis = useMemo(() => {
    const totalRevenue = bookings
      .filter((b) => b.stayStatus !== 'Cancelled')
      .reduce((acc, b) => acc + (Number(b.totalPrice) || 0), 0);

    const occupiedRooms = rooms.filter((r) => r.status === 'Occupied').length;
    const occupancyRate = rooms.length > 0 ? Math.round((occupiedRooms / rooms.length) * 100) : 0;
    
    const activeBookings = bookings.filter(
      (b) => b.stayStatus === 'Confirmed' || b.stayStatus === 'Checked-In'
    ).length;

    const pendingRequests = requests.filter((r) => r.status === 'Pending').length;
    const inProgressRequests = requests.filter((r) => r.status === 'In Progress').length;
    const completedRequests = requests.filter((r) => r.status === 'Completed').length;

    const totalNights = bookings.reduce((acc, b) => acc + (b.nights || 1), 0);
    const averageDailyRate = totalNights > 0 ? Math.round(totalRevenue / totalNights) : 480;

    const avgReviewRating = reviews.length > 0
      ? Math.round((reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length) * 10) / 10
      : 4.9;

    const lowStockCount = inventory.filter((i) => i.stock <= i.minThreshold).length;
    const totalInventoryValue = Math.round(
      inventory.reduce((acc, i) => acc + i.stock * i.costPerUnit, 0)
    );

    return {
      totalRevenue: Math.round(totalRevenue),
      occupancyRate,
      activeBookings,
      pendingRequests,
      inProgressRequests,
      completedRequests,
      totalRooms: rooms.length,
      availableRooms: rooms.filter((r) => r.status === 'Available').length,
      averageDailyRate,
      avgReviewRating,
      totalReviews: reviews.length,
      lowStockCount,
      totalInventoryValue,
      totalInventoryItems: inventory.length
    };
  }, [rooms, bookings, requests, reviews, inventory]);

  const activeGuestBooking = useMemo(() => {
    if (!currentUser?.activeBookingId && !currentUser?.roomNumber) {
      return bookings.find((b) => b.stayStatus !== 'Cancelled') || bookings[0];
    }
    return (
      bookings.find((b) => b.id === currentUser.activeBookingId) ||
      bookings.find((b) => b.roomNumber === currentUser.roomNumber) ||
      bookings[0]
    );
  }, [bookings, currentUser]);

  const value = {
    currentUser,
    setCurrentUser,
    rooms,
    bookings,
    requests,
    reviews,
    inventory,
    kpis,
    activeGuestBooking,
    bookRoom,
    updateBookingStatus,
    updateRoomStatus,
    addRoom,
    createServiceRequest,
    updateRequestStatus,
    deleteRequest,
    addReview,
    replyToReview,
    updateInventoryStock,
    addInventoryItem,
    deleteInventoryItem,
    reorderInventoryItem
  };

  return <HotelContext.Provider value={value}>{children}</HotelContext.Provider>;
}

export function useHotel() {
  const context = useContext(HotelContext);
  if (!context) {
    throw new Error('useHotel must be used within a HotelProvider');
  }
  return context;
}
