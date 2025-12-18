

// import { useLocation } from 'react-router-dom'
// import './Confirmation.css'
// import { saveRoomBooking } from '../utils/bookings'

// type ConfirmationState = {
//   hotelName: string
//   location: string
//   checkIn: string
//   checkOut: string
//   guests: {
//     adults: number
//     childrenAges: number[]
//     rooms: number
//   }
//   selectedRoomIds: number[]
//   total: number
// }

// export default function Confirmation() {
//   const { state } = useLocation() as {
//     state: ConfirmationState | null
//   }

//   if (!state) return <p>No booking found</p>

//   const {
//     hotelName,
//     location,
//     checkIn,
//     checkOut,
//     guests,
//     selectedRoomIds,
//     total,
//   } = state

//   function handleConfirmBooking() {
//     selectedRoomIds.forEach(roomId => {
//       saveRoomBooking(roomId, checkIn, checkOut)
//     })

//     alert('Booking confirmed!')
//   }

//   return (
//     <div className="confirmation-wrapper">
//       <div className="confirmation-card">
//         <h2 className="title">Booking Confirmation</h2>
//         <p className="subtitle">Your reservation details are below</p>

//         <div className="details">
//           <p><strong>Hotel:</strong> {hotelName}</p>
//           <p><strong>Location:</strong> {location}</p>
//           <p><strong>Dates:</strong> {checkIn} → {checkOut}</p>
//           <p><strong>Guests:</strong> {guests.adults} Adults</p>
//         </div>

//         <div className="rooms">
//           {selectedRoomIds.map(id => (
//             <span key={id} className="room-chip">
//               Room {id}
//             </span>
//           ))}
//         </div>

//         <div className="amount">
//           Total Paid: <span>₹{total}</span>
//         </div>

//         <button
//           className="confirm-btn"
//           onClick={handleConfirmBooking}
//         >
//           Confirm
//         </button>
//       </div>
//     </div>
//   )
// }


import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './Confirmation.css'
import { saveRoomBooking } from '../utils/bookings'

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

  const navigate = useNavigate()
  const [bookingDone, setBookingDone] = useState(false)

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

  function handleConfirmBooking() {
    selectedRoomIds.forEach(roomId => {
      saveRoomBooking(roomId, checkIn, checkOut)
    })

      const booking = {
  id: Date.now().toString(),
  hotelName,
  location,
  checkIn,
  checkOut,
  guests,
  rooms: selectedRoomIds,
  total,
  bookedAt: new Date().toISOString(),

  status: 'CONFIRMED' as const, // 🔹 NEW
}


     const existing =
    JSON.parse(sessionStorage.getItem('myBookings') || '[]')

  sessionStorage.setItem(
    'myBookings',
    JSON.stringify([...existing, booking])
  )

    setBookingDone(true)

    // Navigate to Rooms page after short delay
    setTimeout(() => {
      navigate('/my-bookings', {
  })
    }, 2000)
  }

  return (
    <div className="confirmation-wrapper">
      <div className="confirmation-card">
        <h2 className="title">Booking Confirmation</h2>
        <p className="subtitle">Your reservation details are below</p>

        <div className="details">
          <p><strong>Hotel:</strong> {hotelName}</p>
          <p><strong>Location:</strong> {location}</p>
          <p><strong>Dates:</strong> {checkIn} → {checkOut}</p>
          <p><strong>Guests:</strong> {guests.adults} Adults</p>
        </div>

        <div className="rooms">
          {selectedRoomIds.map(id => (
            <span key={id} className="room-chip">
              Room {id}
            </span>
          ))}
        </div>

        <div className="amount">
          Total Paid: <span>₹{total}</span>
        </div>

        <button
          className={`confirm-btn ${bookingDone ? 'done' : ''}`}
          onClick={handleConfirmBooking}
          disabled={bookingDone}
        >
          {bookingDone ? 'Booking Done ✓' : 'Confirm'}
        </button>
      </div>
    </div>
  )
}
