// import type { Room } from '../../types/room'
// import './RoomCard.css'

// type Props = {
//   room: Room
//   disabled: boolean
// }

// export default function RoomCard({ room, disabled }: Props) {
//   return (
//     <div className={`room-card ${disabled ? 'disabled' : ''}`}>
//       <h3>{room.name}</h3>
//       <p>Capacity: {room.capacity} guests</p>
//       <p className="price">₹{room.basePrice} / night</p>

//       <button disabled={disabled}>
//         {disabled ? 'Not Available' : 'Select Room'}
//       </button>
//     </div>
//   )
// }

import type { Room } from '../../types/room'
import './RoomCard.css'

type Props = {
  room: Room
  selected: boolean
  disabled: boolean
  onSelect: () => void
}

export default function RoomCard({
  room,
  selected,
  disabled,
  onSelect,
}: Props) {
  return (
    <div
      className={`room-card ${selected ? 'selected' : ''} ${
        disabled ? 'disabled' : ''
      }`}
      onClick={!disabled ? onSelect : undefined}
    >
      {/* Seat / Room Number */}
      <div className="room-id">{room.id}</div>

      {/* Room Info */}
      <h3 className="room-name">{room.name}</h3>

      <p className="room-capacity">
        Capacity: {room.capacity} guests
      </p>

      <p className="room-price">
        ₹{room.basePrice} / night
      </p>

      {/* Selection indicator */}
      {selected && <div className="selected-tag">Selected</div>}
    </div>
  )
}

