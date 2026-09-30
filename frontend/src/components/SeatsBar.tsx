import { seatLevel } from '../design'

type SeatsBarProps = {
  remaining: number
  capacity: number
  large?: boolean
}

// The bar shows how full it is; the label always says it in words too, so color is never the only signal
export default function SeatsBar({ remaining, capacity, large = false }: SeatsBarProps) {
  const level = seatLevel(remaining, capacity)
  const taken = capacity ? Math.round(((capacity - remaining) / capacity) * 100) : 0
  const label =
    level === 'out' ? 'Sold out' : large && level === 'low' ? 'Almost full' : `${remaining.toLocaleString('en-GB')} left`

  return (
    <div className={`seats${large ? ' lg' : ''}`}>
      <span className={`bar ${level}`} aria-hidden="true">
        <span style={{ width: `${taken}%` }} />
      </span>
      <span className={`seats-label${level === 'low' ? ' low' : ''}`}>{label}</span>
    </div>
  )
}
