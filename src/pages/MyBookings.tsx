

// // import { useState } from 'react'
// // import './MyBookings.css'



// // type Booking = {
// //   id: string
// //   hotelName: string
// //   location: string
// //   checkIn: string
// //   checkOut: string
// //   guests: {
// //     adults: number
// //     childrenAges: number[]
// //     rooms: number
// //   }
// //   rooms: number[]
// //   total: number
// //   bookedAt: string
// // }

// // export default function MyBookings() {
// //   const [bookings, setBookings] = useState<Booking[]>(() => {
// //     return JSON.parse(sessionStorage.getItem('myBookings') || '[]')
// //   })

// //   function handleCancelBooking(id: string) {
// //     const confirmCancel = window.confirm(
// //       'Are you sure you want to cancel this booking?'
// //     )
// //     if (!confirmCancel) return

// //     const updatedBookings = bookings.filter(b => b.id !== id)

// //     setBookings(updatedBookings)
// //     sessionStorage.setItem(
// //       'myBookings',
// //       JSON.stringify(updatedBookings)
// //     )
// //   }

// //   if (bookings.length === 0) {
// //     return (
// //       <div className="mybookings-empty">
// //         <h2>No bookings yet</h2>
// //         <p>Your confirmed bookings will appear here.</p>
// //       </div>
// //     )
// //   }

// //   return (
// //     <div className="mybookings-wrapper">
// //       <h2 className="page-title">My Bookings</h2>

// //       {bookings.map(b => (
// //         <div key={b.id} className="booking-card">
// //           <h3>{b.hotelName}</h3>
// //           <p className="location">{b.location}</p>

// //           <p>
// //             <strong>Dates:</strong> {b.checkIn} → {b.checkOut}
// //           </p>

// //           <p>
// //             <strong>Guests:</strong> {b.guests.adults} Adults |{' '}
// //             {b.guests.rooms} Rooms
// //           </p>

// //           <div className="rooms">
// //             {b.rooms.map(r => (
// //               <span key={r} className="room-chip">
// //                 Room {r}
// //               </span>
// //             ))}
// //           </div>

// //           <div className="booking-footer">
// //             <div className="price">₹{b.total}</div>

// //             <button
// //               className="cancel-btn"
// //               onClick={() => handleCancelBooking(b.id)}
// //             >
// //               Cancel Booking
// //             </button>
// //           </div>
// //         </div>
// //       ))}
// //     </div>
// //   )
// // }


// import { useState } from 'react'
// import './MyBookings.css'
// import { removeRoomBooking } from '../utils/bookings'

// type Booking = {
//   id: string
//   hotelName: string
//   location: string
//   checkIn: string
//   checkOut: string
//   guests: {
//     adults: number
//     childrenAges: number[]
//     rooms: number
//   }
//   rooms: number[]
//   total: number
//   bookedAt: string
// }

// export default function MyBookings() {
//   const [bookings, setBookings] = useState<Booking[]>(() => {
//     return JSON.parse(sessionStorage.getItem('myBookings') || '[]')
//   })

//   function handleCancelBooking(id: string) {
//     const bookingToCancel = bookings.find(b => b.id === id)
//     if (!bookingToCancel) return

//     const confirmCancel = window.confirm(
//       'Are you sure you want to cancel this booking?'
//     )
//     if (!confirmCancel) return

//     // 🔹 Restore room availability
//     bookingToCancel.rooms.forEach(roomId => {
//       removeRoomBooking(
//         roomId,
//         bookingToCancel.checkIn,
//         bookingToCancel.checkOut
//       )
//     })

//     // 🔹 Remove booking from My Bookings
//     const updatedBookings = bookings.filter(b => b.id !== id)

//     setBookings(updatedBookings)
//     sessionStorage.setItem(
//       'myBookings',
//       JSON.stringify(updatedBookings)
//     )
//   }

//   if (bookings.length === 0) {
//     return (
//       <div className="mybookings-empty">
//         <h2>No bookings yet</h2>
//         <p>Your confirmed bookings will appear here.</p>
//       </div>
//     )
//   }

//   return (
//     <div className="mybookings-wrapper">
//       <h2 className="page-title">My Bookings</h2>

//       {bookings.map(b => (
//         <div key={b.id} className="booking-card">
//           <h3>{b.hotelName}</h3>
//           <p className="location">{b.location}</p>

//           <p>
//             <strong>Dates:</strong> {b.checkIn} → {b.checkOut}
//           </p>

//           <p>
//             <strong>Guests:</strong> {b.guests.adults} Adults |{' '}
//             {b.guests.rooms} Rooms
//           </p>

//           <div className="rooms">
//             {b.rooms.map(r => (
//               <span key={r} className="room-chip">
//                 Room {r}
//               </span>
//             ))}
//           </div>

//           <div className="booking-footer">
//             <div className="price">₹{b.total}</div>

//             <button
//               className="cancel-btn"
//               onClick={() => handleCancelBooking(b.id)}
//             >
//               Cancel Booking
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }

import { useState } from 'react'
import './MyBookings.css'
import { removeRoomBooking } from '../utils/bookings'

/* 🔹 CHANGE 1:
   Added `status` field to booking type
*/
type Booking = {
  id: string
  hotelName: string
  location: string
  checkIn: string
  checkOut: string
  guests: {
    adults: number
    childrenAges: number[]
    rooms: number
  }
  rooms: number[]
  total: number
  bookedAt: string

  /* 🔹 NEW */
  status: 'CONFIRMED' | 'CANCELLED'
}

export default function MyBookings() {
  /* 🔹 NO CHANGE:
     Lazy initialization from sessionStorage
  */
  const [bookings, setBookings] = useState<Booking[]>(() => {
    return JSON.parse(sessionStorage.getItem('myBookings') || '[]')
  })

  function handleCancelBooking(id: string) {
    const bookingToCancel = bookings.find(b => b.id === id)
    if (!bookingToCancel) return

    /* 🔹 Prevent double cancel */
    if (bookingToCancel.status === 'CANCELLED') return

    const confirmCancel = window.confirm(
      'Are you sure you want to cancel this booking?'
    )
    if (!confirmCancel) return

    /* 🔹 CHANGE 2:
       Restore room availability when cancelled
    */
    bookingToCancel.rooms.forEach(roomId => {
      removeRoomBooking(
        roomId,
        bookingToCancel.checkIn,
        bookingToCancel.checkOut
      )
    })

    /* 🔹 CHANGE 3:
       Update booking STATUS instead of deleting
    */
    const updatedBookings = bookings.map(b =>
      b.id === id ? { ...b, status: 'CANCELLED' as const } : b
    )

    setBookings(updatedBookings)
    sessionStorage.setItem(
      'myBookings',
      JSON.stringify(updatedBookings)
    )
  }

  if (bookings.length === 0) {
    return (
      <div className="mybookings-empty">
        <h2>No bookings yet</h2>
        <p>Your confirmed bookings will appear here.</p>
      </div>
    )
  }

  return (
    <div className="mybookings-wrapper">
      <h2 className="page-title">My Bookings</h2>

      {bookings.map(b => (
        <div key={b.id} className="booking-card">
          <h3>{b.hotelName}</h3>
          <p className="location">{b.location}</p>

          <p>
            <strong>Dates:</strong> {b.checkIn} → {b.checkOut}
          </p>

          <p>
            <strong>Guests:</strong> {b.guests.adults} Adults |{' '}
            {b.guests.rooms} Rooms
          </p>

          {/* 🔹 STATUS LABEL */}
          <p>
            <strong>Status:</strong>{' '}
            <span
              style={{
                color:
                  b.status === 'CONFIRMED'
                    ? 'green'
                    : 'crimson',
                fontWeight: 600,
              }}
            >
              {b.status}
            </span>
          </p>

          <div className="rooms">
            {b.rooms.map(r => (
              <span key={r} className="room-chip">
                Room {r}
              </span>
            ))}
          </div>

          <div className="booking-footer">
            <div className="price">₹{b.total}</div>

            {/* 🔹 CHANGE 4:
               Show Cancel button ONLY if booking is CONFIRMED
            */}
            {b.status === 'CONFIRMED' && (
              <button
                className="cancel-btn"
                onClick={() => handleCancelBooking(b.id)}
              >
                Cancel Booking
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
