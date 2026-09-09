export const INITIAL_ROOMS = [
  {
    id: 'room-101',
    number: '101',
    name: 'Azure Presidential Penthouse',
    type: 'Penthouse',
    category: 'Penthouse',
    floor: '5th Floor (Private Key Access)',
    price: 950,
    rating: 4.98,
    reviewsCount: 124,
    status: 'Occupied',
    capacity: { adults: 4, children: 2 },
    size: '185 m²',
    view: 'Panoramic 360° Ocean & Marina View',
    bed: '1 Emperor Bed + 1 King Bed',
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Private Infinity Pool', '24/7 Butler Service', 'Free High-Speed Wi-Fi', 'Complimentary Champagne & Mini Bar', 'Smart Climate & Lights', 'Jacuzzi Spa', 'Bose Surround Sound'],
    description: 'The pinnacle of coastal luxury. Featuring an expansive private wrap-around terrace with a heated infinity pool, private butler quarters, and floor-to-ceiling panoramic ocean vistas.'
  },
  {
    id: 'room-204',
    number: '204',
    name: 'Royal Oceanfront Villa',
    type: 'Ocean View',
    category: 'Ocean View',
    floor: '2nd Floor Beachfront',
    price: 680,
    rating: 4.95,
    reviewsCount: 98,
    status: 'Available',
    capacity: { adults: 3, children: 1 },
    size: '120 m²',
    view: 'Direct Turquoise Oceanfront & Sunset View',
    bed: '1 California King Bed',
    images: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Private Ocean Balcony', 'Deep Soaking Marble Tub', 'High-Speed Wi-Fi', 'Nespresso Coffee Bar', 'Smart TV 65"', 'Luxury Bathrobe & Slippers', 'Daily Sunset Cocktails'],
    description: 'Wake up to the tranquil sound of ocean waves. This beachfront sanctuary offers direct private access to white sandy beaches, a private plunge pool, and hand-carved teak furnishings.'
  },
  {
    id: 'room-302',
    number: '302',
    name: 'Executive Horizon Suite',
    type: 'Executive Suite',
    category: 'Executive Suite',
    floor: '3rd Floor South Wing',
    price: 490,
    rating: 4.89,
    reviewsCount: 86,
    status: 'Occupied',
    capacity: { adults: 2, children: 1 },
    size: '85 m²',
    view: 'Resort Lagoon & Palm Gardens',
    bed: '1 King Bed',
    images: [
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Executive Lounge Access', 'High-Speed Wi-Fi', 'Dedicated Workstation', 'Rainfall Shower', '24/7 Room Service', 'Marshall Speaker', 'Premium Wine Cooler'],
    description: 'Designed for the discerning executive and leisure traveler alike. Offers a seamless blend of ergonomic workspace, opulent living quarters, and private terrace overlooking the lagoon.'
  },
  {
    id: 'room-405',
    number: '405',
    name: 'Deluxe Palm Oasis Suite',
    type: 'Deluxe',
    category: 'Deluxe',
    floor: '4th Floor Palm Wing',
    price: 350,
    rating: 4.84,
    reviewsCount: 142,
    status: 'Available',
    capacity: { adults: 2, children: 0 },
    size: '65 m²',
    view: 'Lush Botanical Gardens & Waterfall',
    bed: '1 Queen Bed',
    images: [
      'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507038772120-7e61ef0764c5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Garden Patio', 'High-Speed Wi-Fi', 'Artisan Mini Bar', 'Smart 55" OLED TV', 'Aromatherapy Diffuser', 'Custom Pillow Menu'],
    description: 'Immerse yourself in serenity surrounded by tropical greenery, artisan crafted interiors, and an open-concept bathroom with a rainfall shower and dual marble vanities.'
  },
  {
    id: 'room-501',
    number: '501',
    name: 'Grand Imperial Presidential Suite',
    type: 'Penthouse',
    category: 'Penthouse',
    floor: '5th Floor Penthouse Wing',
    price: 1200,
    rating: 5.0,
    reviewsCount: 64,
    status: 'Maintenance',
    capacity: { adults: 6, children: 3 },
    size: '240 m²',
    view: 'Unobstructed 360° Coastal Sunset & Sky Horizon',
    bed: '2 Emperor Beds + 2 Twin Beds',
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Private Rooftop Helipad Transfer', 'Personal Chef on Demand', 'Private Wine Cellar', 'Infinity Sky Pool', 'Cinema Room', 'Bvlgari Toiletries'],
    description: 'The crowning jewel of the resort. Two private floors featuring a private cinema, dedicated sommelier, heated glass-bottom infinity pool, and personal round-the-clock chauffeur.'
  },
  {
    id: 'room-108',
    number: '108',
    name: 'Deluxe Sunset Bungalow',
    type: 'Deluxe',
    category: 'Deluxe',
    floor: 'Ground Floor Garden',
    price: 320,
    rating: 4.79,
    reviewsCount: 77,
    status: 'Dirty',
    capacity: { adults: 2, children: 1 },
    size: '60 m²',
    view: 'Private Garden & Hammock Area',
    bed: '1 King Bed',
    images: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Private Garden Hammock', 'Outdoor Rain Shower', 'High-Speed Wi-Fi', 'Espresso Maker', 'Organic Bath Amenities'],
    description: 'Charming standalone bungalow with natural cedarwood accents, a private sun terrace, and an outdoor stone rain shower surrounded by exotic flora.'
  }
];

export const INITIAL_BOOKINGS = [
  {
    id: 'BK-8941',
    bookingNumber: 'RES-8941',
    guestName: 'Eleanor Vance',
    guestEmail: 'eleanor.vance@vanguard.com',
    guestPhone: '+1 (555) 382-9104',
    roomId: 'room-101',
    roomName: 'Azure Presidential Penthouse',
    roomNumber: '101',
    roomType: 'Penthouse',
    checkIn: '2026-09-06',
    checkOut: '2026-09-10',
    nights: 4,
    adults: 2,
    children: 1,
    baseRate: 950,
    tax: 684,
    serviceFee: 45,
    totalPrice: 4529,
    paymentMethod: 'Credit Card (ending 4242)',
    paymentStatus: 'Paid',
    stayStatus: 'Checked-In',
    specialRequests: 'High floor, champagne on arrival, allergy-free pillows.',
    digitalKeyPin: '9421',
    createdAt: '2026-09-01T10:30:00.000Z'
  },
  {
    id: 'BK-8938',
    bookingNumber: 'RES-8938',
    guestName: 'Alexander Hayes',
    guestEmail: 'alex.hayes@apexcapital.io',
    guestPhone: '+1 (555) 749-2810',
    roomId: 'room-302',
    roomName: 'Executive Horizon Suite',
    roomNumber: '302',
    roomType: 'Executive Suite',
    checkIn: '2026-09-07',
    checkOut: '2026-09-12',
    nights: 5,
    adults: 2,
    children: 0,
    baseRate: 490,
    tax: 441,
    serviceFee: 45,
    totalPrice: 2936,
    paymentMethod: 'Pay at Check-in',
    paymentStatus: 'Pending',
    stayStatus: 'Confirmed',
    specialRequests: 'Quiet room for remote video calls, late check-in at 8 PM.',
    digitalKeyPin: '3028',
    createdAt: '2026-09-03T14:15:00.000Z'
  },
  {
    id: 'BK-8920',
    bookingNumber: 'RES-8920',
    guestName: 'Sophia Lorenze',
    guestEmail: 'sophia.lorenze@stylemag.fr',
    guestPhone: '+33 6 82 91 03 44',
    roomId: 'room-204',
    roomName: 'Royal Oceanfront Villa',
    roomNumber: '204',
    roomType: 'Ocean View',
    checkIn: '2026-08-30',
    checkOut: '2026-09-05',
    nights: 6,
    adults: 2,
    children: 0,
    baseRate: 680,
    tax: 734.4,
    serviceFee: 45,
    totalPrice: 4859.4,
    paymentMethod: 'Credit Card (ending 8812)',
    paymentStatus: 'Paid',
    stayStatus: 'Completed',
    specialRequests: 'Sunset view guaranteed, spa booking on day 2.',
    digitalKeyPin: '2045',
    createdAt: '2026-08-20T09:00:00.000Z'
  }
];

export const INITIAL_REQUESTS = [
  {
    id: 'REQ-101',
    bookingId: 'BK-8941',
    roomNumber: '101',
    guestName: 'Eleanor Vance',
    serviceType: 'Extra Towels',
    category: 'Housekeeping',
    description: 'Set of 4 plush Egyptian cotton bath towels requested for the master suite.',
    priority: 'Medium',
    status: 'Pending',
    timestamp: '15 mins ago',
    createdAt: '2026-09-07T14:15:00.000Z'
  },
  {
    id: 'REQ-102',
    bookingId: 'BK-8941',
    roomNumber: '101',
    guestName: 'Eleanor Vance',
    serviceType: 'Food Order',
    category: 'Dining',
    description: 'Truffle Lobster Bisque, Grilled Sea Bass, and 2 bottles of Sparkling Water.',
    priority: 'High',
    status: 'In Progress',
    timestamp: '32 mins ago',
    createdAt: '2026-09-07T13:58:00.000Z'
  },
  {
    id: 'REQ-103',
    bookingId: 'BK-8938',
    roomNumber: '302',
    guestName: 'Alexander Hayes',
    serviceType: 'Room Cleaning',
    category: 'Housekeeping',
    description: 'Evening turndown service and organic lavender pillow mist replenishment.',
    priority: 'Low',
    status: 'Pending',
    timestamp: '45 mins ago',
    createdAt: '2026-09-07T13:45:00.000Z'
  },
  {
    id: 'REQ-104',
    bookingId: 'BK-8920',
    roomNumber: '204',
    guestName: 'Sophia Lorenze',
    serviceType: 'Late Checkout',
    category: 'Front Desk',
    description: 'Requested checkout extension until 2:00 PM for afternoon flight.',
    priority: 'Medium',
    status: 'Completed',
    timestamp: '2 hours ago',
    createdAt: '2026-09-07T12:00:00.000Z'
  }
];

export const SERVICE_OPTIONS = [
  {
    id: 'srv-towels',
    title: 'Extra Towels & Linens',
    subtitle: 'Plush Egyptian cotton towels & satin pillowcases',
    category: 'Housekeeping',
    icon: 'Sparkles',
    priority: 'Medium',
    eta: '10-15 mins'
  },
  {
    id: 'srv-cleaning',
    title: 'Express Room Cleaning',
    subtitle: 'Complete dusting, bed making & vacuuming',
    category: 'Housekeeping',
    icon: 'Brush',
    priority: 'High',
    eta: '20-30 mins'
  },
  {
    id: 'srv-dining',
    title: 'Gourmet In-Room Dining',
    subtitle: 'Chef-curated appetizers, mains, wine & desserts',
    category: 'Dining',
    icon: 'Utensils',
    priority: 'High',
    eta: '30-40 mins'
  },
  {
    id: 'srv-latecheckout',
    title: 'Late Checkout (2:00 PM)',
    subtitle: 'Complimentary extension subject to suite availability',
    category: 'Front Desk',
    icon: 'Clock',
    priority: 'Medium',
    eta: 'Instant Approval'
  },
  {
    id: 'srv-luggage',
    title: 'Bellhop Luggage Assistance',
    subtitle: 'Assistance with baggage upon arrival or departure',
    category: 'Concierge',
    icon: 'Briefcase',
    priority: 'Low',
    eta: '5-10 mins'
  },
  {
    id: 'srv-minibar',
    title: 'Mini Bar & Champagne Refill',
    subtitle: 'Replenish premium spirits, juices & artisan snacks',
    category: 'Beverage',
    icon: 'Wine',
    priority: 'Medium',
    eta: '15-20 mins'
  }
];

export const INITIAL_REVIEWS = [
  {
    id: 'rev-1',
    author: 'Victoria Sterling',
    location: 'London, UK',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    roomName: 'Azure Presidential Penthouse',
    rating: 5,
    ratings: {
      cleanliness: 5,
      comfort: 5,
      location: 5,
      service: 5,
      value: 5
    },
    date: '3 days ago',
    title: 'An absolute masterpiece of coastal hospitality',
    comment: 'The private wrap-around terrace and infinity pool in Penthouse 101 blew us away. The dedicated butler service was beyond prompt—our sunset cocktails were brought right as the sun touched the ocean horizon.',
    verifiedGuest: true,
    likes: 34
  },
  {
    id: 'rev-2',
    author: 'Marcus Vance',
    location: 'Zurich, Switzerland',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    roomName: 'Royal Oceanfront Villa',
    rating: 5,
    ratings: {
      cleanliness: 5,
      comfort: 5,
      location: 5,
      service: 5,
      value: 4
    },
    date: '1 week ago',
    title: 'Flawless beachfront sanctuary',
    comment: 'Direct private beach access from Villa 204 made our anniversary unforgettable. The Digital Key feature on our phone worked seamlessly from check-in to accessing the lagoon cabanas.',
    verifiedGuest: true,
    likes: 21
  },
  {
    id: 'rev-3',
    author: 'Elena & Julian Rostova',
    location: 'Milan, Italy',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    roomName: 'Executive Horizon Suite',
    rating: 4.8,
    ratings: {
      cleanliness: 5,
      comfort: 5,
      location: 4,
      service: 5,
      value: 5
    },
    date: '2 weeks ago',
    title: 'Unmatched dining and concierge',
    comment: 'The 1-click in-room dining service was extraordinarily fast. The Truffle Lobster Bisque was Michelin-grade. We will definitely return next summer!',
    verifiedGuest: true,
    likes: 19
  }
];

export const INITIAL_INVENTORY = [
  // 1. Toiletries
  {
    id: 'inv-1',
    name: 'Artisan Sandalwood Luxury Shampoo & Conditioner (250ml)',
    category: 'Toiletries',
    stock: 145,
    unit: 'Bottles',
    minThreshold: 40,
    costPerUnit: 14.5,
    location: 'Central Depot - Bay A2',
    supplier: 'L\'Occitane & Co.',
    lastRestocked: '2026-09-02',
    burnRate: '12 / day'
  },
  {
    id: 'inv-2',
    name: 'Organic Dead Sea Bath Salts & Botanicals',
    category: 'Toiletries',
    stock: 68,
    unit: 'Jars',
    minThreshold: 25,
    costPerUnit: 18.0,
    location: 'Spa & Suite Supply Room',
    supplier: 'Mediterranean Spa Labs',
    lastRestocked: '2026-08-28',
    burnRate: '8 / day'
  },
  {
    id: 'inv-3',
    name: 'Bamboo Toothbrush & Dental Care VIP Kit',
    category: 'Toiletries',
    stock: 22,
    unit: 'Kits',
    minThreshold: 30, // Low stock!
    costPerUnit: 4.2,
    location: 'Floor 1-5 Housekeeping Closets',
    supplier: 'EcoLuxe Hospitality',
    lastRestocked: '2026-08-15',
    burnRate: '15 / day'
  },
  {
    id: 'inv-4',
    name: 'Hydrating Botanical Body Lotion (300ml)',
    category: 'Toiletries',
    stock: 94,
    unit: 'Bottles',
    minThreshold: 35,
    costPerUnit: 12.8,
    location: 'Central Depot - Bay A3',
    supplier: 'L\'Occitane & Co.',
    lastRestocked: '2026-09-01',
    burnRate: '9 / day'
  },

  // 2. Linens
  {
    id: 'inv-5',
    name: '800-Thread Egyptian Cotton King Sheet Sets',
    category: 'Linens',
    stock: 48,
    unit: 'Sets',
    minThreshold: 20,
    costPerUnit: 95.0,
    location: 'Linens Depot - Floor 2 Laundry',
    supplier: 'Frette Luxury Textiles',
    lastRestocked: '2026-08-20',
    burnRate: '6 / day'
  },
  {
    id: 'inv-6',
    name: 'Plush Turkish Cotton Bath Sheets (900 GSM)',
    category: 'Linens',
    stock: 110,
    unit: 'Pieces',
    minThreshold: 45,
    costPerUnit: 28.5,
    location: 'Floor 1-5 Linen Pantries',
    supplier: 'Anatolian Loom Co.',
    lastRestocked: '2026-09-04',
    burnRate: '24 / day'
  },
  {
    id: 'inv-7',
    name: 'Hypoallergenic Goose Down King Pillows',
    category: 'Linens',
    stock: 14,
    unit: 'Pairs',
    minThreshold: 20, // Low stock!
    costPerUnit: 85.0,
    location: 'Master Linen Vault',
    supplier: 'Frette Luxury Textiles',
    lastRestocked: '2026-08-10',
    burnRate: '2 / day'
  },
  {
    id: 'inv-8',
    name: 'Embroidered Silk & Velvet Throw Pillowcases',
    category: 'Linens',
    stock: 36,
    unit: 'Pairs',
    minThreshold: 15,
    costPerUnit: 42.0,
    location: 'Penthouse Service Hub',
    supplier: 'Venetian Atelier',
    lastRestocked: '2026-08-22',
    burnRate: '3 / day'
  },

  // 3. Food & Beverage
  {
    id: 'inv-9',
    name: 'Champagne Louis Roederer Cristal 2014 (750ml)',
    category: 'Food & Beverage',
    stock: 32,
    unit: 'Bottles',
    minThreshold: 12,
    costPerUnit: 340.0,
    location: 'Sommelier Wine Cellar',
    supplier: 'Roederer Estate Imports',
    lastRestocked: '2026-08-30',
    burnRate: '4 / day'
  },
  {
    id: 'inv-10',
    name: 'Artisan Single-Origin Colombian Espresso Pods',
    category: 'Food & Beverage',
    stock: 420,
    unit: 'Pods',
    minThreshold: 150,
    costPerUnit: 1.25,
    location: 'Kitchen Pantry & Suite Carts',
    supplier: 'Medellin Specialty Roasters',
    lastRestocked: '2026-09-05',
    burnRate: '60 / day'
  },
  {
    id: 'inv-11',
    name: 'A5 Miyazaki Wagyu Tenderloin (250g Portions)',
    category: 'Food & Beverage',
    stock: 8,
    unit: 'Portions',
    minThreshold: 15, // Low stock!
    costPerUnit: 120.0,
    location: 'Executive Chef Deep Freeze #1',
    supplier: 'Kyoto Prime Imports',
    lastRestocked: '2026-09-01',
    burnRate: '5 / day'
  },
  {
    id: 'inv-12',
    name: 'Evian Natural Spring Glass Bottles (750ml)',
    category: 'Food & Beverage',
    stock: 180,
    unit: 'Bottles',
    minThreshold: 60,
    costPerUnit: 3.8,
    location: 'Beverage Vault B',
    supplier: 'Danone Waters Global',
    lastRestocked: '2026-09-06',
    burnRate: '30 / day'
  },

  // 4. Cleaning Supplies
  {
    id: 'inv-13',
    name: 'Hospital-Grade Eco Disinfectant Concentrate (5L)',
    category: 'Cleaning Supplies',
    stock: 24,
    unit: 'Canisters',
    minThreshold: 10,
    costPerUnit: 48.0,
    location: 'Housekeeping Chemical Room',
    supplier: 'Ecolab Solutions',
    lastRestocked: '2026-08-25',
    burnRate: '2 / day'
  },
  {
    id: 'inv-14',
    name: 'Streak-Free Marine Glass & Mirror Cleaner',
    category: 'Cleaning Supplies',
    stock: 52,
    unit: 'Spray Cans',
    minThreshold: 20,
    costPerUnit: 8.5,
    location: 'Floor 1-5 Housekeeping Closets',
    supplier: 'Ecolab Solutions',
    lastRestocked: '2026-09-03',
    burnRate: '4 / day'
  },
  {
    id: 'inv-15',
    name: 'Microfiber Anti-Scratch Cleaning Cloth Packs',
    category: 'Cleaning Supplies',
    stock: 11,
    unit: 'Packs (10pc)',
    minThreshold: 25, // Low stock!
    costPerUnit: 16.0,
    location: 'Housekeeping Chemical Room',
    supplier: 'CleanPro Industrial',
    lastRestocked: '2026-08-14',
    burnRate: '3 / day'
  },

  // 5. Maintenance Materials
  {
    id: 'inv-16',
    name: 'RFID / NFC Suite Smart Lock CR123A Lithium Batteries',
    category: 'Maintenance Materials',
    stock: 85,
    unit: 'Units',
    minThreshold: 30,
    costPerUnit: 4.5,
    location: 'Engineering Workshop Bay 3',
    supplier: 'Assa Abloy Security',
    lastRestocked: '2026-08-18',
    burnRate: '5 / day'
  },
  {
    id: 'inv-17',
    name: 'HEPA Multi-Stage HVAC Suite Air Filters',
    category: 'Maintenance Materials',
    stock: 6,
    unit: 'Filters',
    minThreshold: 12, // Low stock!
    costPerUnit: 38.0,
    location: 'HVAC Storage Annex',
    supplier: 'Carrier Marine Systems',
    lastRestocked: '2026-08-05',
    burnRate: '1 / day'
  },
  {
    id: 'inv-18',
    name: 'Warm Dimmable LED Chandelier Bulbs (E14 2700K)',
    category: 'Maintenance Materials',
    stock: 45,
    unit: 'Bulbs',
    minThreshold: 20,
    costPerUnit: 6.2,
    location: 'Engineering Workshop Bay 1',
    supplier: 'Philips Lumileds',
    lastRestocked: '2026-08-29',
    burnRate: '2 / day'
  }
];

export const RESORT_LANDMARKS = [
  {
    id: 'lm-1',
    name: "Main Resort & Presidential Suites",
    category: "Sanctuary & Penthouses",
    coords: { lat: 25.07812, lng: -77.34821 },
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80",
    description: "The architectural centerpiece of L'Horizon Azure featuring 5 exclusive penthouse residences, private butler quarters, and 360-degree ocean views."
  },
  {
    id: 'lm-2',
    name: "Azure Private Beach Club & Cabanas",
    category: "Beachfront & Cabanas",
    coords: { lat: 25.07685, lng: -77.34698 },
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
    description: "Private powder-soft white sand cove reserved exclusively for resort guests with luxury shaded daybeds, towel butler, and oceanside cocktail service."
  },
  {
    id: 'lm-3',
    name: "Le Sommet 3-Star Michelin Restaurant",
    category: "Fine Dining & Wine Cellar",
    coords: { lat: 25.07945, lng: -77.34965 },
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
    description: "Multi-award winning ocean-terrace dining directed by Chef Jean-Luc Fontaine, featuring fresh catch seafood, Miyazaki A5 Wagyu, and rare vintage cellars."
  },
  {
    id: 'lm-4',
    name: "VIP Helipad & Yacht Charter Marina",
    category: "Arrival & Marina Dock",
    coords: { lat: 25.08012, lng: -77.34582 },
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
    description: "Dedicated deep-water private marina accommodating yachts up to 180ft alongside our FAA-certified VIP helipad with 15-minute transfers to Nassau International."
  }
];
