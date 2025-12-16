const LOCATION_API =
  'https://travel-advisor.p.rapidapi.com/locations/search'

const API_KEY = 'YOUR_RAPIDAPI_KEY'

type LocationResult = {
  result_object?: {
    location_id?: string
  }
}

export async function getLocationId(
  city: string
): Promise<string | null> {
  try {
    const res = await fetch(
      `${LOCATION_API}?query=${city}`,
      {
        headers: {
          'X-RapidAPI-Key': API_KEY,
          'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
        },
      }
    )

    if (!res.ok) {
      throw new Error('Location API failed')
    }

    const data = await res.json()

    const results = (data?.data ?? []) as LocationResult[]

    return results[0]?.result_object?.location_id ?? null
  } catch (err) {
    console.error('Location lookup failed:', err)
    return null
  }
}
