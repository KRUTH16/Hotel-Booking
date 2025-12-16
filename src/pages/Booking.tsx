


import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './Booking.css'
import { fetchHotelsByCity } from '../Services/Hotels'
import HotelCard from '../components/HotelCard/HotelCard'
import type { Hotel } from '../types/hotel'
import BookingSearchBar from '../components/SearchBar/BookingSearchBar'

type BookingState = {
  city: string
  checkIn: string
  checkOut: string
  guests: {
    adults: number
    childrenAges: number[]
    rooms: number
  }
}

export default function Booking() {
  const { state } = useLocation() as { state: BookingState }
  const { city, checkIn, checkOut, guests } = state

  const [hotels, setHotels] = useState<Hotel[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    async function loadHotels() {
      setLoading(true)
      const result = await fetchHotelsByCity(city)
      if (mounted) {
        setHotels(result)
        setLoading(false)
      }
    }

    loadHotels()

    return () => {
      mounted = false
    }
  }, [city])

  return (
    <div>
      {/* SEARCH SUMMARY */}

      <div className="sticky-search">
              <BookingSearchBar />
            </div>


      {/* RESULTS */}
      <div className="container">
        <h2 className="results-title">
          Showing Properties in {city}
        </h2>

        {loading ? (
          <p>Loading hotels...</p>
        ) : (
          hotels.map(hotel => (
            <HotelCard
              key={hotel.id}
              hotel={hotel}
              guests={guests}
              checkIn={checkIn}
              checkOut={checkOut}
            />
          ))
        )}
      </div>
    </div>
  )
}
