import './HotelCard.css'
import { useNavigate } from 'react-router-dom'

type Guests = {
  adults: number
  childrenAges: number[]
  rooms: number
}

type Props = {
  hotel: {
    id: string
    hotelName: string
    rating: string
    image?: string
    price: number
  }
  guests: Guests
  checkIn: string
  checkOut: string
}

function calculateNights(checkIn: string, checkOut: string): number {
  const inDate = new Date(checkIn)
  const outDate = new Date(checkOut)
  const diff = outDate.getTime() - inDate.getTime()
  return Math.max(diff / (1000 * 60 * 60 * 24), 1)
}

export default function HotelCard({
  hotel,
  guests,
  checkIn,
  checkOut,
  
}: Props) {
  const nights = calculateNights(checkIn, checkOut)

  const totalPrice =
    hotel.price * nights * guests.rooms

    const navigate = useNavigate()

  return (
    <div className="hotel-card">

      {/* LEFT: Hotel Image */}
      <div className="hotel-image">
        <img
          src={hotel.image || '/placeholder.jpg'}
          alt={hotel.hotelName}
        />
      </div>

      {/* MIDDLE: Hotel Details */}
      <div className="hotel-info">
        <h3>{hotel.hotelName}</h3>

        <div className="rating">
          ⭐ {hotel.rating}/5
        </div>

        <p className="dates">
          {checkIn} → {checkOut} ({nights} night{nights > 1 ? 's' : ''})
        </p>

        <p className="guests">
          {guests.adults} Adults
          {guests.childrenAges.length > 0 &&
            `, ${guests.childrenAges.length} Children`}
          , {guests.rooms} Room{guests.rooms > 1 ? 's' : ''}
        </p>

        <p className="amenities">
          Free Cancellation • Breakfast Available • Couple Friendly
        </p>
      </div>

      {/* RIGHT: Price */}
      <div className="hotel-price">
        <span className="amount">₹{hotel.price}</span>
        <span className="per-night">per night</span>

        <div className="total">
          Total: <strong>₹{totalPrice}</strong>
        </div>

        {/* <button className="book-btn">
          Book Now
        </button> */}
        {/* <button className="book-btn" onClick={onSelect}>
  Select Rooms
</button> */}

<button
  className="book-btn"
  onClick={() =>
    navigate('/rooms', {
      state: {
        hotel,
        
        checkIn,
        checkOut,
        guests,
      },
    })
  }
>
  Select Rooms
</button>


      </div>

    </div>
  )
}
