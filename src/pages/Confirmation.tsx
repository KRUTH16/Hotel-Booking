import { useLocation } from 'react-router-dom'
import './Confirmation.css'

type ConfirmationState = {
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
  total: number
}

export default function Confirmation() {
  const { state } = useLocation() as {
    state: ConfirmationState | null
  }

  if (!state) return <p>No booking found</p>

  const {
    hotelName,
    location,
    checkIn,
    checkOut,
    guests,
    selectedRoomIds,
    total,
  } = state


  return (
    // <div className="container">
    //   <h2>🎉 Booking Confirmed!</h2>

    //   <p><strong>Hotel:</strong> {hotelName}</p>
    //   <p><strong>Location:</strong> {location}</p>
    //   <p><strong>Dates:</strong> {checkIn} → {checkOut}</p>
    //   <p><strong>Rooms:</strong> {selectedRoomIds.length}</p>
    //   <p><strong>Guests:</strong> {guests.adults} Adults</p>

    //   <h3>Total Paid: ₹{total}</h3>

    //   <p>Your booking is confirmed. Have a great stay!</p>
    // </div>

    <div className="confirmation-page">
  <h2>Booking Confirmed 🎉</h2>

  <p>Your rooms have been successfully booked.</p>
  <p><strong>Hotel:</strong> {hotelName}</p>
<p><strong>Location:</strong> {location}</p>
<p>
  <strong>Dates:</strong> {checkIn} → {checkOut}
</p>
<p>
  <strong>Guests:</strong> {guests.adults} Adults
</p>

  <div className="seat-confirmation">
    {selectedRoomIds.map(id => (
      <span key={id} className="seat-badge">
        Room {id}
      </span>
    ))}
  </div>

  <div className="final-price">
    Total Paid: <strong>₹{total}</strong>
  </div>
</div>

  )
}
