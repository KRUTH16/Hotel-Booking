// import { useLocation } from 'react-router-dom'
// import rooms from '../data/rooms'
// import type { Room } from '../types/room'
// import RoomCard from '../components/RoomCard/RoomCard'
// import PricingSummary from '../components/PricingSummary/PricingSummary'
// import SearchBar from '../components/SearchBar/SearchBar'
// import { useState } from 'react'
// import {
//   calculateNights,
//   hasWeekend,
//   calculateGuestMultiplier,
//   calculateTotalPrice,
// } from '../utils/pricing'

// export default function Rooms() {
//   const { state } = useLocation()
//   const { hotel, checkIn, checkOut, guests } = state
//   const [selectedRoomIds, setSelectedRoomIds] = useState<number[]>([])


//   const eligibleRooms: Room[] = rooms.filter(
//     r => r.capacity >= guests.adults
//   )

//   const nights = calculateNights(checkIn, checkOut)
//   const weekend = hasWeekend(checkIn, checkOut)
//   const guestMultiplier = calculateGuestMultiplier(
//     guests.adults,
//     guests.childrenAges.length
//   )

//   const basePrice =
//     eligibleRooms.length > 0 ? eligibleRooms[0].basePrice : 0

//   const total = calculateTotalPrice({
//     basePrice,
//     nights,
//     roomsCount: guests.rooms,
//     hasWeekend: weekend,
//     guestMultiplier,
//   })

//   return (
//     <>
//       {/* Sticky Search Bar */}
//       <div className="sticky-search">
//         <SearchBar />
//       </div>

//       <div className="container">
//         <h2>{hotel.hotelName} – Select Rooms</h2>

//         {/* ROOM LIST (NOT GRID) */}
//         {eligibleRooms.map(room => (
//           <RoomCard key={room.id} room={room} />
//         ))}

//         <PricingSummary
//           nights={nights}
//           roomsCount={guests.rooms}
//           hasWeekend={weekend}
//           guestMultiplier={guestMultiplier}
//           basePrice={basePrice}
//           total={total}
//         />
//       </div>
//     </>
//   )
// }


import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import rooms from '../data/rooms'
import type { Room } from '../types/room'
import RoomCard from '../components/RoomCard/RoomCard'
import PricingSummary from '../components/PricingSummary/PricingSummary'
import BookingSearchBar from '../components/SearchBar/BookingSearchBar'
import type { Hotel } from '../types/hotel'
import '../components/SearchBar/SearchBar.css'


import {
  calculateNights,
  hasWeekend,
  calculateGuestMultiplier,
  calculateTotalPrice,
} from '../utils/pricing'

export default function Rooms() {
  const { state } = useLocation() as {
    state: {
      hotel: Hotel
      checkIn: string
      checkOut: string
      guests: {
        adults: number
        childrenAges: number[]
        rooms: number
      }
    }
  }

  const { hotel, checkIn, checkOut, guests } = state

  const [selectedRoomIds, setSelectedRoomIds] = useState<number[]>([])

  const eligibleRooms: Room[] = rooms.filter(
    r => r.capacity >= guests.adults
  )

  const nights = calculateNights(checkIn, checkOut)
  const weekend = hasWeekend(checkIn, checkOut)
  const guestMultiplier = calculateGuestMultiplier(
    guests.adults,
    guests.childrenAges.length
  )

  const basePrice =
    eligibleRooms.length > 0 ? eligibleRooms[0].basePrice : 0

  const total = calculateTotalPrice({
    basePrice,
    nights,
    roomsCount: selectedRoomIds.length,
    hasWeekend: weekend,
    guestMultiplier,
  })

  return (
    <>
      <div className="sticky-search">
        <BookingSearchBar />
      </div>

      <div className="container">
        <h2>{hotel.hotelName} – Select Rooms</h2>

        {eligibleRooms.map(room => {
          const selected = selectedRoomIds.includes(room.id)
          const disabled =
            !selected && selectedRoomIds.length >= guests.rooms

          return (
            <RoomCard
              key={room.id}
              room={room}
              selected={selected}
              disabled={disabled}
              onSelect={() => {
                setSelectedRoomIds(prev =>
                  selected
                    ? prev.filter(id => id !== room.id)
                    : [...prev, room.id]
                )
              }}
            />
          )
        })}

        <PricingSummary
          nights={nights}
          roomsCount={selectedRoomIds.length}
          hasWeekend={weekend}
          guestMultiplier={guestMultiplier}
          basePrice={basePrice}
          total={total}
        />
      </div>
    </>
  )
}
