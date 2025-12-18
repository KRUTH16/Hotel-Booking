

// import { useLocation, useNavigate } from 'react-router-dom'
// import rooms from '../data/rooms'
// import {
//   calculateNights,
//   hasWeekend,
//   calculateGuestMultiplier,
//   calculateTotalPrice,
// } from '../utils/pricing'
// import './Pricing.css'

// type PricingState = {
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
// }


// export default function Pricing() {
//   const navigate = useNavigate()
//   const { state } = useLocation() as { state: PricingState | null }

//   if (!state) return <p>No booking data</p>

//   const {
//     hotelName,
//     location,     // ✅ NOW DEFINED
//     checkIn,
//     checkOut,
//     guests,
//     selectedRoomIds,
//   } = state

//   const selectedRooms = rooms.filter(r =>
//     selectedRoomIds.includes(r.roomId)
//   )

//   const nights = calculateNights(checkIn, checkOut)
//   const weekend = hasWeekend(checkIn, checkOut)
//   const guestMultiplier = calculateGuestMultiplier(
//     guests.adults,
//     guests.childrenAges.length
//   )

//   const basePrice = selectedRooms[0]?.basePrice ?? 0

//   const total = calculateTotalPrice({
//     basePrice,
//     nights,
//     roomsCount: selectedRooms.length,
//     hasWeekend: weekend,
//     guestMultiplier,
//   })

//   return (
//     <div className="pricing-page">
//       <h2>Price Breakdown – {hotelName}</h2>

//       <div className="pricing-card">
//         <div className="price-row">
//           <span>Room Price</span>
//           <span>₹{basePrice}</span>
//         </div>

//         <div className="price-row">
//           <span>Nights</span>
//           <span>{nights}</span>
//         </div>

//         <div className="price-row">
//           <span>Rooms</span>
//           <span>{selectedRooms.length}</span>
//         </div>

//         <div className="price-row total">
//           <span>Total Payable</span>
//           <span>₹{total}</span>
//         </div>

//         <button
//           type="button"  // 🔑 IMPORTANT
//           className="confirm-btn"
//           onClick={() =>
//             navigate('/confirmation', {
//               state: {
//                 hotelName,
//                 location,
//                 checkIn,
//                 checkOut,
//                 guests,
//                 selectedRoomIds,
//                 total,
//               },
//             })
//           }
//         >
//           Proceed to Confirmation
//         </button>
//       </div>
//     </div>
//   )
// }

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

  // ✅ Sum of selected room prices (per night)
  const roomPriceTotal = selectedRooms.reduce(
    (sum, room) => sum + room.basePrice,
    0
  )

  // ✅ FINAL CORRECT TOTAL
  let total = roomPriceTotal * nights

  // Optional weekend surge
  if (weekend) {
    total *= 1.2
  }

  total = Math.round(total)

  return (
    <div className="pricing-page">
      <h2>Price Breakdown – {hotelName}</h2>

      <div className="pricing-card">
        <div className="price-row">
          <span>Room Price</span>
          <span>₹{roomPriceTotal}</span>
        </div>

        <div className="price-row">
          <span>Nights</span>
          <span>{nights}</span>
        </div>

        <div className="price-row">
          <span>Rooms</span>
          <span>{selectedRooms.length}</span>
        </div>

        <div className="price-row total">
          <span>Total Payable</span>
          <span>₹{total}</span>
        </div>

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

