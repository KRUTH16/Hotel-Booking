// import { getLocationId } from "./Locations"

// const API_URL = 'https://travel-advisor.p.rapidapi.com/hotels/list'
// const API_KEY = 'YOUR_RAPIDAPI_KEY'

// type TravelAdvisorHotel = {
//   location_id: string
//   name?: string
//   rating?: string
//   price?: string
//   photo?: {
//     images?: {
//       large?: {
//         url?: string
//       }
//     }
//   }
// }




// export async function fetchHotelsByCity(city: string) {
//   try {
//     const locationId = await getLocationId(city)
//     if (!locationId) return []

//     const res = await fetch(
//       `${API_URL}?location_id=${locationId}&limit=20`,
//       {
//         headers: {
//           'X-RapidAPI-Key': API_KEY,
//           'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
//         },
//       }
//     )

//     if (!res.ok) {
//       throw new Error('Hotel API failed')
//     }

//     const data = await res.json()

//     const hotels = (data?.data ?? []) as TravelAdvisorHotel[]

//     return hotels
//       .filter(h => h.name && h.location_id)
//       .map(h => ({
//         id: h.location_id,
//         hotelName: h.name!,
//         location: city,
//         rating: h.rating ?? '4.0',
//         image: h.photo?.images?.large?.url || '',
//         price: Number(h.price?.replace(/[^\d]/g, '')) || 3000,
//       }))
//   } catch (err) {
//     console.error('Hotel API failed:', err)
//     return [] // ✅ safe fallback, no crash
//   }
// }

import { hotels as dummyHotels } from '../data/hotels'
import type { Hotel } from '../types/hotel'

/**
 * Fetch hotels by city
 * -------------------------------------------------
 * Frontend-stable implementation using dummy data.
 * Keeps async structure so real APIs can be plugged in later.
 */
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
