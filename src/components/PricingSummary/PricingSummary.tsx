type Props = {
  nights: number
  roomsCount: number
  hasWeekend: boolean
  guestMultiplier: number
  basePrice: number
  total: number
}

export default function PricingSummary({
  nights,
  roomsCount,
  hasWeekend,
  guestMultiplier,
  basePrice,
  total,
}: Props) {
  return (
    <div className="price-box">
      <p>Nights: {nights}</p>
      <p>Rooms: {roomsCount}</p>
      <p>Base Price / Night: ₹{basePrice}</p>
      <p>Guest Multiplier: ×{guestMultiplier}</p>
      {hasWeekend && <p>Weekend Surge: +20%</p>}
      <hr />
      <h3>Total: ₹{total}</h3>
    </div>
  )
}
