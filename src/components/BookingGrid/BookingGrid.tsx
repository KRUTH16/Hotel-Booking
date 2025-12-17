import  type { Room } from '../../types/room'
import RoomCard from '../RoomCard/RoomCard'
import './BookingGrid.css'

type Props = {
  rooms: Room[]
  selectedRooms: string[]
  setSelectedRooms: React.Dispatch<React.SetStateAction<string[]>>
  maxRooms: number
   checkIn: string
  checkOut: string
}

export default function BookingGrid({
  rooms,
  selectedRooms,
  setSelectedRooms,
  maxRooms,
   checkIn,
  checkOut

}: Props) {

  const toggle = (id: string) => {
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
           checkIn={checkIn}
  checkOut={checkOut}
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
