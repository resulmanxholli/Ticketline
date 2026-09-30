// Static stand-in for the API. Everything here is hardcoded so the UI can be
// reviewed before /api/events exists.

export type TicketTier = {
  id: string
  name: string
  note: string
  price: number
  remaining: number
  capacity: number
}

export type Event = {
  id: string
  title: string
  artist: string
  category: Category
  venue: string
  city: string
  date: string
  doors: string
  image: string
  accent: string
  blurb: string
  minPrice: number
  status: 'onsale' | 'lowstock' | 'soldout'
  tiers: TicketTier[]
}

export type Category = 'Concerts' | 'Festivals' | 'Theatre' | 'Comedy' | 'Sports'

export const categories: Category[] = [
  'Concerts',
  'Festivals',
  'Theatre',
  'Comedy',
  'Sports',
]

// Poster art is a CSS gradient rather than an image file, so the mockup has no
// binary assets to ship.
export const events: Event[] = [
  {
    id: 'midnight-static',
    title: 'Midnight Static — Afterglow Tour',
    artist: 'Midnight Static',
    category: 'Concerts',
    venue: 'Halle Arena',
    city: 'Tirana',
    date: 'Fri 14 Nov 2026',
    doors: '19:00',
    image: 'linear-gradient(135deg, #334155 0%, #64748b 100%)',
    accent: '#64748b',
    blurb:
      'The synth-pop four-piece bring the Afterglow record to the arena, with a full light rig and a live string section.',
    minPrice: 34,
    status: 'onsale',
    tiers: [
      { id: 'ga', name: 'General Admission', note: 'Standing, floor level', price: 34, remaining: 420, capacity: 1000 },
      { id: 'seat', name: 'Reserved Seating', note: 'Tiers 1–3, numbered seat', price: 52, remaining: 138, capacity: 400 },
      { id: 'vip', name: 'VIP + Soundcheck', note: 'Early entry, merch bundle', price: 118, remaining: 12, capacity: 50 },
    ],
  },
  {
    id: 'harbour-lights',
    title: 'Harbour Lights Festival 2026',
    artist: '24 artists across 3 stages',
    category: 'Festivals',
    venue: 'Durrës Waterfront',
    city: 'Durrës',
    date: 'Sat 4 – Sun 5 Jul 2026',
    doors: '12:00',
    image: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)',
    accent: '#334155',
    blurb:
      'Two days on the seafront. Weekend passes include camping; day tickets are sold per stage day.',
    minPrice: 65,
    status: 'lowstock',
    tiers: [
      { id: 'day1', name: 'Saturday Day Pass', note: 'Valid 4 Jul only', price: 65, remaining: 91, capacity: 800 },
      { id: 'weekend', name: 'Weekend Pass', note: 'Both days, no camping', price: 110, remaining: 24, capacity: 400 },
      { id: 'camp', name: 'Weekend + Camping', note: 'Pitch for two', price: 145, remaining: 8, capacity: 150 },
    ],
  },
  {
    id: 'a-quiet-room',
    title: 'A Quiet Room',
    artist: 'National Theatre Company',
    category: 'Theatre',
    venue: 'Teatri Kombëtar',
    city: 'Tirana',
    date: 'Wed 22 Oct 2026',
    doors: '19:30',
    image: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
    accent: '#475569',
    blurb:
      'A two-act chamber drama about the last night of a family bookshop. Runs 2h 10m with one interval.',
    minPrice: 28,
    status: 'onsale',
    tiers: [
      { id: 'stalls', name: 'Stalls', note: 'Rows A–M', price: 46, remaining: 64, capacity: 200 },
      { id: 'circle', name: 'Dress Circle', note: 'Rows A–F', price: 38, remaining: 112, capacity: 180 },
      { id: 'balcony', name: 'Balcony', note: 'Restricted view', price: 28, remaining: 203, capacity: 250 },
    ],
  },
  {
    id: 'open-mic-finals',
    title: 'Stand-Up Finals: The Last Six',
    artist: 'Hosted by Ana Berisha',
    category: 'Comedy',
    venue: 'Klubi Bunk',
    city: 'Tirana',
    date: 'Thu 6 Nov 2026',
    doors: '20:30',
    image: 'linear-gradient(135deg, #475569 0%, #94a3b8 100%)',
    accent: '#94a3b8',
    blurb:
      'Six comics, one trophy, no second sets. Late show, 18+, bar open until 01:00.',
    minPrice: 18,
    status: 'lowstock',
    tiers: [
      { id: 'std', name: 'Standard Entry', note: 'Unreserved table seating', price: 18, remaining: 31, capacity: 250 },
      { id: 'front', name: 'Front Tables', note: 'Reserved, table of four', price: 30, remaining: 6, capacity: 40 },
    ],
  },
  {
    id: 'derby-round-9',
    title: 'City vs. United — Round 9',
    artist: 'Superliga',
    category: 'Sports',
    venue: 'Air Albania Stadium',
    city: 'Tirana',
    date: 'Sun 18 Oct 2026',
    doors: '16:00',
    image: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 100%)',
    accent: '#0369a1',
    blurb:
      'The season derby. Away supporters are allocated the north stand; ID required at the gate.',
    minPrice: 22,
    status: 'soldout',
    tiers: [
      { id: 'north', name: 'North Stand', note: 'Away allocation', price: 22, remaining: 0, capacity: 2000 },
      { id: 'main', name: 'Main Stand', note: 'Covered, numbered', price: 45, remaining: 0, capacity: 6000 },
    ],
  },
  {
    id: 'kora-nights',
    title: 'Kora Nights: Acoustic Sessions',
    artist: 'Lira Dema & guests',
    category: 'Concerts',
    venue: 'Sala Verde',
    city: 'Shkodër',
    date: 'Sat 29 Nov 2026',
    doors: '20:00',
    image: 'linear-gradient(135deg, #1e1b4b 0%, #334155 100%)',
    accent: '#334155',
    blurb:
      'An unamplified set in a 300-seat hall. Doors close at 20:15; no late admission.',
    minPrice: 25,
    status: 'onsale',
    tiers: [
      { id: 'seat', name: 'Seated', note: 'Unreserved, first come', price: 25, remaining: 140, capacity: 280 },
      { id: 'patron', name: 'Patron Seat', note: 'Front rows + programme', price: 60, remaining: 20, capacity: 20 },
    ],
  },
]

export const bookingFee = 3.5

export function findEvent(id: string): Event {
  return events.find((event) => event.id === id) ?? events[0]
}
