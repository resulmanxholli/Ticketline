import { useState } from 'react'
import SeatsBar from '../components/SeatsBar'
import { categories, events, type Category } from '../data'
import { categoryStyle, dayOf, seatsOf, whenOf } from '../design'

type HomeProps = {
  onOpenEvent: (id: string) => void
}

export default function Home({ onOpenEvent }: HomeProps) {
  const [filter, setFilter] = useState<Category | 'All'>('All')
  const shown = filter === 'All' ? events : events.filter((e) => e.category === filter)

  return (
    <>
      <div className="band">
        <section className="shell hero">
          <div className="hero-row">
            <div className="hero-copy">
              <span className="eyebrow">Albania · On sale now</span>
              <h1 className="display">
                Find your next <em>night out.</em>
              </h1>
            </div>
            <div className="chips" role="group" aria-label="Filter by category">
              {(['All', ...categories] as const).map((category) => (
                <button
                  key={category}
                  className={filter === category ? 'chip on' : 'chip'}
                  aria-pressed={filter === category}
                  onClick={() => setFilter(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>

      <section className="shell page" id="browse">
        <div className="event-grid">
          {shown.map((event) => {
            const style = categoryStyle[event.category]
            const { capacity, remaining } = seatsOf(event.tiers)
            const soldOut = event.status === 'soldout'
            return (
              <article key={event.id} className="card ev">
                <div className="ev-top" style={{ background: style.bg, color: style.ink }}>
                  <span className="ev-tag">{style.tag}</span>
                  <span className="ev-day">{dayOf(event)}</span>
                </div>
                <div className="ev-body">
                  <span className="ev-when">{whenOf(event)}</span>
                  <h3>{event.title}</h3>
                  <p className="muted ev-venue">
                    {event.venue}, {event.city}
                  </p>
                  <SeatsBar remaining={remaining} capacity={capacity} />
                  <div className="ev-foot">
                    <span className="ev-price">
                      <small>from </small>€{event.minPrice}
                    </span>
                    <button
                      className={`btn sm ${soldOut ? 'btn-outline' : 'btn-primary'}`}
                      disabled={soldOut}
                      onClick={() => onOpenEvent(event.id)}
                    >
                      {soldOut ? 'Sold out' : 'Reserve'}
                    </button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        <h2 className="display section-title" id="venues">
          Popular <em>venues</em>
        </h2>
        <div className="venue-grid">
          {[
            ['Halle Arena', 'Tirana', '12 events'],
            ['Teatri Kombëtar', 'Tirana', '8 events'],
            ['Durrës Waterfront', 'Durrës', '3 events'],
            ['Sala Verde', 'Shkodër', '5 events'],
          ].map(([name, city, count]) => (
            <a key={name} className="card venue-card" href="#browse">
              <strong>{name}</strong>
              <span className="muted">{city}</span>
              <span className="venue-count">{count}</span>
            </a>
          ))}
        </div>
      </section>
    </>
  )
}
