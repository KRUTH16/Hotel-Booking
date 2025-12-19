
import { useState } from 'react'

type Guests = {
  adults: number
  childrenAges: number[]
  rooms: number
}

type SearchInitialState = {
  city?: string
  checkIn?: string
  checkOut?: string
  guests?: Guests
}

export function useSearchLogic(initial?: SearchInitialState) {
  const [city, setCity] = useState(initial?.city ?? '')
  const [checkIn, setCheckIn] = useState(initial?.checkIn ?? '')
  const [checkOut, setCheckOut] = useState(initial?.checkOut ?? '')
  const [guests, setGuests] = useState<Guests>(
    initial?.guests ?? {
      adults: 2,
      childrenAges: [],
      rooms: 1,
    }
  )

  return {
    city,
    setCity,
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    guests,
    setGuests,
  }
}
