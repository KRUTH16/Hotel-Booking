

import type { Room } from '../../types/room'
import './RoomCard.css'
import { isRoomAvailable } from '../../utils/dateUtils'

type Props = {
  room: Room
  selected: boolean
  disabled: boolean
  available?:boolean
  checkIn: string
  checkOut: string
  onSelect: () => void
}

// export default function RoomCard({
//   room,
//   selected,
//   disabled,
//   onSelect,
// }: Props) {
//   return (
//     <div
//       className={`room-card ${selected ? 'selected' : ''} ${
//         disabled ? 'disabled' : ''
//       }`}
//       onClick={!disabled ? onSelect : undefined}
//     >

//    {/* LEFT: IMAGE */}
//       <div className="room-image">
//         <img
//           src={room.image || '/room-placeholder.jpg'}
//           alt={room.name}
//         />
//       </div>

//       {/* Seat / Room Number */}
//       <div className="room-id">{room.id}</div>

//       {/* Room Info */}
//       <h3 className="room-name">{room.name}</h3>

//       <p className="room-capacity">
//         Capacity: {room.capacity} guests
//       </p>

//       <p className="room-price">
//         ₹{room.basePrice} / night
//       </p>

//       {/* Selection indicator */}
//       {selected && <div className="selected-tag">Selected</div>}
//     </div>
//   )
// }

export default function RoomCard({
  room,
  selected,
  disabled,

  onSelect,
  checkIn,
  checkOut,

}: Props) {

    const available = isRoomAvailable(
    room.unavailableDates,
    checkIn,
    checkOut
  )



  return (
    
    <div
      className={`room-card ${selected ? 'selected' : ''} 
        ${ disabled ? 'disabled' : '' }
          ${!available ? 'unavailable' : ''}`}
      onClick={!disabled ? onSelect : undefined}
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
        {!available && (
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

