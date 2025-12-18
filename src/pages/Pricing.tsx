

import { useLocation, useNavigate } from 'react-router-dom'
import rooms from '../data/rooms'
import {
  calculateNights,
  hasWeekend,
} from '../utils/pricing'
import './Pricing.css'

type PricingState = {
  hotelName: string
  location: string
  checkIn: string
  checkOut: string
  guests: {
    adults: number
    childrenAges: number[]
    rooms: number
  }
  selectedRoomIds: number[]
}

export default function Pricing() {
  const navigate = useNavigate()
  const { state } = useLocation() as { state: PricingState | null }

  if (!state) return <p>No booking data</p>

  const {
    hotelName,
    location,
    checkIn,
    checkOut,
    guests,
    selectedRoomIds,
  } = state

  const selectedRooms = rooms.filter(r =>
    selectedRoomIds.includes(r.roomId)
  )

  const nights = calculateNights(checkIn, checkOut)
  const weekend = hasWeekend(checkIn, checkOut)

  /* ---------- ROOM-WISE CALC ---------- */
  const roomRows = selectedRooms.map(room => {
    const subtotal = room.basePrice * nights
    return {
      roomId: room.roomId,
      type: room.name,
      pricePerNight: room.basePrice,
      nights,
      subtotal,
    }
  })

  const subtotal = roomRows.reduce(
    (sum, r) => sum + r.subtotal,
    0
  )

  const weekendCharge = weekend ? Math.round(subtotal * 0.2) : 0
  const total = subtotal + weekendCharge

  return (
    <div className="pricing-page">
      <h2>Price Breakdown – {hotelName}</h2>

      <div className="pricing-card">
        {/* ---------- TABLE ---------- */}
        <table className="pricing-table">
          <thead>
            <tr>
              <th>Room</th>
              <th>Type</th>
              <th>Price / Night</th>
              <th>Nights</th>
              <th>Subtotal</th>
            </tr>
          </thead>

          <tbody>
            {roomRows.map(room => (
              <tr key={room.roomId}>
                <td>Room {room.roomId}</td>
                <td>{room.type}</td>
                <td>₹{room.pricePerNight}</td>
                <td>{room.nights}</td>
                <td>₹{room.subtotal}</td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr>
              <td colSpan={4}>Subtotal</td>
              <td>₹{subtotal}</td>
            </tr>

            {weekend && (
              <tr>
                <td colSpan={4}>Weekend Surge (20%)</td>
                <td>₹{weekendCharge}</td>
              </tr>
            )}

            <tr className="total-row">
              <td colSpan={4}>Total Payable</td>
              <td>₹{total}</td>
            </tr>
          </tfoot>
        </table>

        {/* ---------- CTA ---------- */}
        <button
          type="button"
          className="confirm-btn"
          onClick={() =>
            navigate('/confirmation', {
              state: {
                hotelName,
                location,
                checkIn,
                checkOut,
                guests,
                selectedRoomIds,
                total,
              },
            })
          }
        >
          Proceed to Confirmation
        </button>
      </div>
    </div>
  )
}
