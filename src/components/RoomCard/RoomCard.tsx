

import type { Room } from '../../types/room'
import './RoomCard.css'
import { getBookedDates } from '../../utils/bookings'
import { isRoomBooked } from '../../utils/dateUtils'



type Props = {
  room: Room
  selected: boolean
  booked:boolean
  checkIn: string
  checkOut: string
  onSelect: () => void
}



export default function RoomCard({
  room,
  selected,
 

  onSelect,
  checkIn,
  checkOut,

}: Props) {




console.log(
  'ROOM:', room.roomId,
  'BOOKED DATES:', getBookedDates(room.roomId),
  'CHECK:', checkIn, '→', checkOut
)

const booked = isRoomBooked(
  room.roomId,
 room.unavailableDates,
  checkIn,
  checkOut
)



  return (


    <div
  className={`room-card
    ${selected ? 'selected' : ''}
    ${booked ? 'booked' : ''}
  `}
  onClick={!booked ? onSelect : undefined}
>

    
    

      {/* LEFT: IMAGE */}
      <div className="room-image">
        <img
          src={room.image || '/room-placeholder.jpg'}
          alt={room.name}
        />
      </div>

      {/* MIDDLE: INFO */}
      <div className="room-info">
        <div className="room-header">
          <span className="room-code">{room.id}</span>
          <h3 className="room-name">{room.name}</h3>
        </div>

        <p className="room-capacity">
          Capacity: {room.capacity} guests
        </p>
      

      {/* ✅ AVAILABILITY MESSAGE */}
        {booked && (
          <p className="room-unavailable">
            Not available for selected dates
          </p>
        )}
      </div>


      {/* RIGHT: PRICE & ACTION */}
      <div className="room-price-box">
        <div className="price">₹{room.basePrice}</div>
        <div className="per-night">per night</div>

        {selected && (
          <div className="selected-pill">Selected</div>
        )}
      </div>

  
    </div>
  )
}

