import { useState } from 'react'
import SeatsBar from '../components/SeatsBar'
import { bookingFee, findEvent } from '../data'
import { seatLevel, seatsOf, splitTitle } from '../design'

type EventDetailProps = {
  eventId: string
  onBack: () => void
  onCheckout: (eventId: string, tierId: string, quantity: number) => void
}

export default function EventDetail({ eventId, onBack, onCheckout }: EventDetailProps) {
  const event = findEvent(eventId)
  const [tierId, setTierId] = useState(event.tiers[0].id)
  const [quantity, setQuantity] = useState(2)

  const tier = event.tiers.find((t) => t.id === tierId) ?? event.tiers[0]
  const total = tier.price * quantity + bookingFee * quantity
  const { capacity, remaining } = seatsOf(event.tiers)
  const [titleStart, titleEnd] = splitTitle(event.title)

  return (
    <>
      <div className="band">
        <section className="shell hero">
          <button className="back-link" onClick={onBack}>
            ← All events
          </button>
          <div className="hero-row">
            <div className="hero-copy">
              <span className="eyebrow">
                {event.date} · Doors {event.doors}
              </span>
              <h1 className="display event-title">
                {titleStart}
                {titleEnd && <em>{titleEnd}</em>}
              </h1>
              <p className="hero-sub">
                {event.venue}, {event.city} · {event.artist}
              </p>
            </div>
            <span className="hero-pill">
              {remaining === 0
                ? 'Sold out'
                : `${remaining.toLocaleString('en-GB')} of ${capacity.toLocaleString('en-GB')} seats left`}
            </span>
          </div>
        </section>
      </div>

      <div className="shell page checkout">
        <div className="stack">
          <section className="card panel">
            <div className="panel-head">
              <h2>How many seats?</h2>
              <span className="muted fine">Maximum 6 per person</span>
            </div>

            <div className="tier-options" role="radiogroup" aria-label="Ticket type">
              {event.tiers.map((option) => {
                const soldOut = option.remaining === 0
                return (
                  <label
                    key={option.id}
                    className={`tier-option${option.id === tierId ? ' on' : ''}${soldOut ? ' out' : ''}`}
                  >
                    <input
                      type="radio"
                      name="tier"
                      checked={option.id === tierId}
                      disabled={soldOut}
                      onChange={() => setTierId(option.id)}
                    />
                    <span>
                      <strong>{option.name}</strong>
                      <span className="muted">{option.note}</span>
                    </span>
                    <span className="tier-price">
                      €{option.price}
                      <span className="muted">{soldOut ? 'Sold out' : `${option.remaining} left`}</span>
                    </span>
                  </label>
                )
              })}
            </div>

            <div className="stepper">
              <button
                className="step-btn"
                aria-label="One seat fewer"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                −
              </button>
              <output className="display qty" aria-live="polite">
                {quantity}
              </output>
              <button
                className="step-btn plus"
                aria-label="One seat more"
                onClick={() => setQuantity((q) => Math.min(6, q + 1))}
              >
                +
              </button>
              <span className="muted" style={{ marginLeft: 8, fontSize: 14 }}>
                {tier.name} · €{tier.price} each
              </span>
            </div>

            <SeatsBar remaining={tier.remaining} capacity={tier.capacity} large />

            {seatLevel(tier.remaining, tier.capacity) === 'low' && (
              <p className="warn-note">
                Nearly full. Seats are held for 10 minutes once you continue, and go back to other guests if the
                timer runs out.
              </p>
            )}
          </section>

          <section className="card panel">
            <h2>About this event</h2>
            <dl className="facts">
              <div>
                <dt>Date</dt>
                <dd>{event.date}</dd>
              </div>
              <div>
                <dt>Doors</dt>
                <dd>{event.doors}</dd>
              </div>
              <div>
                <dt>Venue</dt>
                <dd>
                  {event.venue}, {event.city}
                </dd>
              </div>
              <div>
                <dt>Category</dt>
                <dd>{event.category}</dd>
              </div>
            </dl>
            <p>{event.blurb}</p>
          </section>

          <section className="card panel">
            <h2>Good to know</h2>
            <ul className="notes">
              <li>Mobile tickets only — your QR code is issued 48 hours before doors.</li>
              <li>Maximum 6 tickets per customer, per event.</li>
              <li>Resale opens if the event sells out; face value plus fee.</li>
            </ul>
          </section>
        </div>

        <aside className="card summary">
          <h2>Order summary</h2>
          <div className="summary-line">
            <span>
              {tier.name} × {quantity}
            </span>
            <strong>€{(tier.price * quantity).toFixed(2)}</strong>
          </div>
          <div className="summary-line">
            <span>Booking fee</span>
            <strong>€{(bookingFee * quantity).toFixed(2)}</strong>
          </div>
          <div className="divider" />
          <div className="summary-total">
            <span>Total</span>
            <span className="display">€{total.toFixed(2)}</span>
          </div>
          <button
            className="btn btn-primary lg block"
            disabled={event.status === 'soldout'}
            onClick={() => onCheckout(event.id, tier.id, quantity)}
          >
            {event.status === 'soldout' ? 'Sold out' : 'Continue to checkout'}
          </button>
          <p className="muted fine">Seats are held for 10 minutes once you continue.</p>
        </aside>
      </div>
    </>
  )
}
