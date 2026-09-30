import { findEvent } from '../data'
import { splitTitle } from '../design'

type ConfirmationProps = {
  eventId: string
  tierId: string
  quantity: number
  onHome: () => void
}

export default function Confirmation({ eventId, tierId, quantity, onHome }: ConfirmationProps) {
  const event = findEvent(eventId)
  const tier = event.tiers.find((t) => t.id === tierId) ?? event.tiers[0]
  const [titleStart, titleEnd] = splitTitle(event.title)

  return (
    <>
      <div className="band">
        <section className="shell hero">
          <div className="hero-row">
            <div className="hero-copy">
              <span className="eyebrow">Order TL-2026-004821</span>
              <h1 className="display">
                See you at the <em>door.</em>
              </h1>
            </div>
            <ol className="steps" aria-label="Checkout progress">
              <li className="done">Tickets</li>
              <li className="done">Details &amp; payment</li>
              <li className="on">Confirmation</li>
            </ol>
          </div>
        </section>
      </div>

      <section className="shell page">
        <div className="card ticket">
          <div className="ticket-side" aria-hidden="true">
            Seatly
          </div>
          <div className="ticket-body">
            <span className="eyebrow muted">
              {event.date} · Doors {event.doors}
            </span>
            <h2 className="display">
              {titleStart}
              {titleEnd && <em>{titleEnd}</em>}
            </h2>
            <p className="muted">
              {event.venue}, {event.city}
            </p>
            <dl className="ticket-facts">
              <div>
                <dt>Ticket</dt>
                <dd>{tier.name}</dd>
              </div>
              <div>
                <dt>Quantity</dt>
                <dd>{quantity}</dd>
              </div>
            </dl>
          </div>
          <div className="ticket-code">
            <div className="qr" aria-hidden="true" />
            <span className="muted fine">QR issued 48h before doors</span>
          </div>
        </div>

        <div className="after-ticket">
          <p className="muted">
            A confirmation has been sent to your email. You can also find this order under &ldquo;My tickets&rdquo;.
          </p>
          <button className="btn btn-primary" onClick={onHome}>
            Back to events
          </button>
        </div>
      </section>
    </>
  )
}
