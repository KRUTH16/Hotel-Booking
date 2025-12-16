type City = {
  city: string
}


const API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities'
const API_KEY = 'YOUR_RAPID_API_KEY' // keep in env later

// Popular Indian cities (used for fallback + popular searches)
export const POPULAR_CITIES = [
  'Delhi',
  'Mumbai',
  'Bengaluru',
  'Chennai',
  'Hyderabad',
  'Kolkata',
  'Pune',
  'Goa',
  'Jaipur',
  'Ahmedabad',
  'Chandigarh',
  'Kochi',
  'Trivandrum',
  'Coimbatore',
  'Mysuru',
]

export async function fetchCities(query: string) {
  if (!query) return []

  try {
    const res = await fetch(
      `${API_URL}?namePrefix=${query}&countryIds=IN&limit=6&sort=-population`,
      {
        headers: {
          'X-RapidAPI-Key': API_KEY,
          'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
        },
      }
    )

    const data = await res.json()
    return data.data.map((c: City) => c.city)
  } catch {
    // INDIA-ONLY fallback
    return POPULAR_CITIES.filter(city =>
      city.toLowerCase().includes(query.toLowerCase())
    )
  }
}
