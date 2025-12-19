

import { hotels as dummyHotels } from '../data/hotels'
import type { Hotel } from '../types/hotel'


export async function fetchHotelsByCity(
  city: string
): Promise<Hotel[]> {
  try {
    if (!city) return []

    const normalizedCity = city.trim().toLowerCase()

    // Simulate API delay (realistic UX)
    await new Promise(resolve => setTimeout(resolve, 300))

    return dummyHotels.filter(
      hotel =>
        hotel.location.trim().toLowerCase() === normalizedCity
    )
  } catch (error) {
    console.error('Hotel fetch failed:', error)
    return []
  }
}
