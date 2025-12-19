

import type { Room } from '../../types/room'
import RoomCard from '../RoomCard/RoomCard'
import './BookingGrid.css'

type Props = {
  rooms: Room[]
  selectedRooms: number[]
  setSelectedRooms: React.Dispatch<React.SetStateAction<number[]>>
  checkIn: string
  checkOut: string
  maxRooms:number
}

export default function BookingGrid({
  rooms,
  selectedRooms,
  setSelectedRooms,
  maxRooms,
  checkIn,
  checkOut,
}: Props) {


 const toggle = (roomId: number) => {
    setSelectedRooms(prev => {
      // 1️⃣ Unselect if already selected
      if (prev.includes(roomId)) {
        return prev.filter(id => id !== roomId)
      }

      // 2️⃣ Stop if limit reached
      if (prev.length >= maxRooms) {
        return prev
      }

      // 3️⃣ Otherwise select
      return [...prev, roomId]
    })
  }

  return (
    <div className="booking-grid">
      {rooms.map(room => {
        const isSelected = selectedRooms.includes(room.roomId)

        return (
          <RoomCard
            key={room.roomId}
            room={room}
            checkIn={checkIn}
            checkOut={checkOut}
            selected={isSelected}
            booked={false /* handled internally */}
            onSelect={() => toggle(room.roomId)}
          />
        )
      })}
    </div>
  )
}

