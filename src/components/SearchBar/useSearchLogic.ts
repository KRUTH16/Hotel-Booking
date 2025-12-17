import { useState } from 'react'

export function useSearchLogic(initial?: any) {
  const [city, setCity] = useState(initial?.city ?? '')
  const [checkIn, setCheckIn] = useState(initial?.checkIn ?? '')
  const [checkOut, setCheckOut] = useState(initial?.checkOut ?? '')
  const [guests, setGuests] = useState(initial?.guests ?? {
    adults: 2,
    childrenAges: [],
    rooms: 1,
  })

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
