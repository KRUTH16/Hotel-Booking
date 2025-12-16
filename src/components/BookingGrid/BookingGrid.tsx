import  type { Room } from '../../types/room'
import RoomCard from '../RoomCard/RoomCard'
import './BookingGrid.css'

type Props = {
  rooms: Room[]
  selectedRooms: number[]
  setSelectedRooms: React.Dispatch<React.SetStateAction<number[]>>
  maxRooms: number
}

export default function BookingGrid({
  rooms,
  selectedRooms,
  setSelectedRooms,
  maxRooms,
}: Props) {
  const toggle = (id: number) => {
    setSelectedRooms(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : prev.length < maxRooms
        ? [...prev, id]
        : prev
    )
  }

  return (
    <div className="booking-grid">
      {rooms.map(room => (
        <RoomCard
          key={room.id}
          room={room}
          selected={selectedRooms.includes(room.id)}
          disabled={
            !selectedRooms.includes(room.id) &&
            selectedRooms.length >= maxRooms
          }
           onSelect={() => toggle(room.id)}
        />
      ))}
    </div>
  )
}
