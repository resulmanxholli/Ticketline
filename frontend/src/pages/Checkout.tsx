import { useEffect, useState } from 'react'
import { bookingFee, findEvent } from '../data'
import { splitTitle } from '../design'

const HOLD_SECONDS = 10 * 60

type CheckoutProps = {
  eventId: string
  tierId: string
  quantity: number
  onBack: () => void
  onDone: () => void
}

export default function Checkout({ eventId, tierId, quantity, onBack, onDone }: CheckoutProps) {
  const event = findEvent(eventId)
  const tier = event.tiers.find((t) => t.id === tierId) ?? event.tiers[0]
  const total = tier.price * quantity + bookingFee * quantity
  const [titleStart, titleEnd] = splitTitle(event.title)

  // Visual countdown only: this static preview doesn't actually hold seats
  const [secondsLeft, setSecondsLeft] = useState(HOLD_SECONDS)
  useEffect(() => {
    const timer = setInterval(() => setSecondsLeft((s) => Math.max(0, s - 1)), 1000)
    return () => clearInterval(timer)
  }, [])
  const clock = `${Math.floor(secondsLeft / 60)}:${String(secondsLeft % 60).padStart(2, '0')}`

  return (
    <>
      <div className="band">
        <section className="shell hero">
          <button className="back-link" onClick={onBack}>
            ← Back to event
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
                {event.venue}, {event.city}
              </p>
            </div>
            <ol className="steps" aria-label="Checkout progress">
              <li className="done">Tickets</li>
              <li className="on">Details &amp; payment</li>
              <li>Confirmation</li>
            </ol>
          </div>
        </section>
      </div>

      <form
        className="shell page checkout"
        onSubmit={(e) => {
          e.preventDefault()
          onDone()
        }}
      >
        <div className="stack">
          <section className="card panel form">
            <h2>Who&apos;s coming</h2>
            <div className="field-row">
              <label>
                First name
                <input defaultValue="" placeholder="Ana" />
              </label>
              <label>
                Last name
                <input defaultValue="" placeholder="Berisha" />
              </label>
            </div>
            <div className="field-row">
              <label>
                Email for tickets
                <input type="email" placeholder="you@example.com" />
              </label>
              <label>
                Phone
                <input type="tel" placeholder="+355 …" />
              </label>
            </div>
            <p className="muted">Every seat gets its own QR code. It can be scanned at the door once.</p>
          </section>

          <section className="card panel form">
            <h2>Payment</h2>
            <label>
              Card number
              <input placeholder="4242 4242 4242 4242" />
            </label>
            <div className="field-row">
              <label>
                Expiry
                <input placeholder="MM / YY" />
              </label>
              <label>
                CVC
                <input placeholder="123" />
              </label>
            </div>
            <label className="check">
              <input type="checkbox" defaultChecked />
              Email me about this artist&apos;s future dates
            </label>
          </section>
        </div>

        <aside className="stack">
          <section className="lime-card" aria-label="Seat hold timer">
            <span className="eyebrow">Seats held for you</span>
            <span className="display clock" role="timer">
              {clock}
            </span>
            <span className="bar" aria-hidden="true">
              <span style={{ width: `${Math.round((secondsLeft / HOLD_SECONDS) * 100)}%` }} />
            </span>
            <p>
              {quantity} {quantity === 1 ? 'seat' : 'seats'} set aside. Nothing is charged until you confirm.
            </p>
            {secondsLeft <= 120 && (
              <p className="expiring" role="status">
                Under two minutes left — confirm now to keep them.
              </p>
            )}
          </section>

          <section className="card summary">
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
            <button className="btn btn-primary lg block" type="submit">
              Pay €{total.toFixed(2)}
            </button>
            <button type="button" className="text-btn" onClick={onBack}>
              Give up these seats
            </button>
            <p className="muted fine">Static preview — this form does not submit anywhere.</p>
          </section>
        </aside>
      </form>
    </>
  )
}
