


import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import rooms from '../data/rooms'
import type { Room } from '../types/room'
import RoomCard from '../components/RoomCard/RoomCard'
// import PricingSummary from '../components/PricingSummary/PricingSummary'
import BookingSearchBar from '../components/SearchBar/BookingSearchBar'
// import type { Hotel } from '../types/hotel'
import '../components/SearchBar/SearchBar.css'
import { useNavigate } from 'react-router-dom'
import { isRoomBooked } from '../utils/dateUtils'
import { getBookedDates } from '../utils/bookings'

import './Rooms.css'




export default function Rooms() {


  const [selectedRoomIds, setSelectedRoomIds] = useState<number[]>([])
  const navigate = useNavigate()

  const locationState = useLocation().state as {
  hotelId: string
  hotelName: string
  location: string
  checkIn: string
  checkOut: string
  guests: {
    adults: number
    childrenAges: number[]
    rooms: number
  }
} | null


if (!locationState) {
  return (
    <div className="container">
      <h2>No hotel selected</h2>
      <p>Please go back and select a hotel.</p>
    </div>
  )
}





      const {  hotelId,hotelName,location, checkIn, checkOut, guests } = locationState
   console.log('ROOMS PAGE STATE:', locationState)





const eligibleRooms: Room[] = rooms.filter(
  r =>
    r.id === hotelId &&
    r.location.toLowerCase() === location.toLowerCase() &&
    r.capacity >= guests.adults
)


// console.log('FILTERED ROOMS:', eligibleRooms)



  return (
    <>
      <div className="sticky-search">
        <BookingSearchBar />
      </div>

      <div className="container">
        <h2>{hotelName} – Select Rooms</h2>

        {eligibleRooms.length === 0 && (
  <p>No rooms available for this hotel</p>
)}


        {eligibleRooms.map(room => {



const bookedDates = getBookedDates(room.roomId)

const isBooked = isRoomBooked(
    room.roomId,
  [...(room.unavailableDates || []), ...bookedDates],
  checkIn,
  checkOut
)

const isSelected = selectedRoomIds.includes(room.roomId)

        


          return (
            <RoomCard
              key={room.roomId}
              room={room}
              selected={isSelected}
              booked={isBooked}
               checkIn={checkIn}
  checkOut={checkOut}
            //   onSelect={() => {
            //     if(isBooked) return
            //     setSelectedRoomIds(prev =>
            //       isSelected
            //         ? prev.filter(id => id !== room.roomId)
            //         : [...prev, room.roomId]
            //     )
            
            //   }}
            onSelect={() => {
  if (isBooked) return

  setSelectedRoomIds(prev => {
    if (prev.includes(room.roomId)) {
      // unselect
      return prev.filter(id => id !== room.roomId)
    }

    if (prev.length >= guests.rooms) {
      // ❌ limit reached → do nothing
      return prev
    }

    // select
    return [...prev, room.roomId]
  })
}}

            />
          )
        })}

     

        {selectedRoomIds.length > 0 && (
              <div className="rooms-footer">
    <div className="rooms-summary">
      <strong>{selectedRoomIds.length}</strong> Room(s) selected
    </div>

            
  <button
    className="continue-btn"
    onClick={() =>
      navigate('/pricing', {
        state: {
          hotelId,
          hotelName,
          location,
          checkIn,
          checkOut,
          guests,
          selectedRoomIds,
        },
      })
    }
  >
    Continue to Pricing →

  </button>
  </div>
)}



      </div>
    </>
  )
}
