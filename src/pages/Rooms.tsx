


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
import { isRoomAvailable } from '../utils/dateUtils'
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

            const available = isRoomAvailable(
  room.unavailableDates || [],
  checkIn,
  checkOut
)

          const selected = selectedRoomIds.includes(room.roomId)
        //   const disabled =
        //     !selected && selectedRoomIds.length >= guests.rooms

        
  const disabled =
    !available || (!selected && selectedRoomIds.length >= guests.rooms)
          return (
            <RoomCard
              key={room.id}
              room={room}
              selected={selected}
              disabled={disabled}
              available={available}
               checkIn={checkIn}
  checkOut={checkOut}
              onSelect={() => {
                if(!disabled){
                setSelectedRoomIds(prev =>
                  selected
                    ? prev.filter(id => id !== room.roomId)
                    : [...prev, room.roomId]
                )
            }
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
