import type { Category, Event, TicketTier } from './data'

// The one-word italic tag and soft tint on each card's colored block
export const categoryStyle: Record<Category, { tag: string; bg: string; ink: string }> = {
  Concerts: { tag: 'Music', bg: '#EEF9C8', ink: '#4D6B0A' },
  Festivals: { tag: 'Festival', bg: '#DDF3E4', ink: '#1F5F46' },
  Theatre: { tag: 'Stage', bg: '#F7E3D3', ink: '#8A4A1C' },
  Comedy: { tag: 'Comedy', bg: '#F4EDD8', ink: '#6E5A1E' },
  Sports: { tag: 'Sport', bg: '#D5ECEA', ink: '#155E5A' },
}

export function seatsOf(tiers: TicketTier[]) {
  const capacity = tiers.reduce((sum, tier) => sum + tier.capacity, 0)
  const remaining = tiers.reduce((sum, tier) => sum + tier.remaining, 0)
  return { capacity, remaining }
}

// From the design brief: a seat bar turns amber once 25% or less of the seats are left, grey when sold out
export function seatLevel(remaining: number, capacity: number): 'ok' | 'low' | 'out' {
  if (remaining <= 0) return 'out'
  return capacity > 0 && remaining / capacity <= 0.25 ? 'low' : 'ok'
}

// "Fri 14 Nov 2026" → "FRI"
export function dayOf(event: Event) {
  return event.date.split(' ')[0].toUpperCase()
}

// "Fri 14 Nov 2026" + "19:00" → "FRI 14 NOV · 19:00"
export function whenOf(event: Event) {
  return `${event.date.replace(/\s\d{4}$/, '')} · ${event.doors}`.toUpperCase()
}

// Titles like "Midnight Static — Afterglow Tour" set the part after the dash or colon in italics
export function splitTitle(title: string): [string, string] {
  const match = title.match(/^(.+?)(: | — )(.+)$/)
  return match ? [match[1] + match[2], match[3]] : [title, '']
}
