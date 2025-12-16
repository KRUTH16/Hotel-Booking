import { useEffect, useState,useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import GuestsPopup from './GuestsPopup'
import { fetchCities, POPULAR_CITIES } from './cityService'
import './BookingSearchBar.css'
// import rooms  from '../../data/rooms'

export default function BookingSearchBar() {
  const navigate = useNavigate()

  /* ---------------- CITY SEARCH ---------------- */
  const [city, setCity] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showCityDropdown, setShowCityDropdown] = useState(false)

  /* ---------------- DATE STATE ---------------- */
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')

  /* ---------------- GUESTS STATE ---------------- */
  const [showGuests, setShowGuests] = useState(false)
//   const [guests, setGuests] = useState({
//     rooms: 1,
//     adults: 2,
//     children: [],
//   })
const [guests, setGuests] = useState({
  rooms: 1,
  adults: 2,
  childrenAges: [] as number[],
})

  const [activeField, setActiveField] = useState<
  'city' | 'checkin' | 'checkout' | 'guests' | null
>(null)


  const guestsRef = useRef<HTMLDivElement>(null)
  const cityRef = useRef<HTMLDivElement>(null)



  /* ---------------- CITY AUTOCOMPLETE EFFECT ---------------- */
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (city.length >= 2) {
        const results = await fetchCities(city)
        setSuggestions(results)
      } else {
        setSuggestions([])
      }
    }, 400)

    return () => clearTimeout(timer)
  }, [city])

//   useEffect(() => {
//   const handleClickOutside = (e: MouseEvent) => {
//     if (
//       guestsRef.current &&
//       !guestsRef.current.contains(e.target as Node)
//     ) {
//       setShowGuests(false)
//     }
//   }

//   document.addEventListener('mousedown', handleClickOutside)
//   return () => document.removeEventListener('mousedown', handleClickOutside)
// }, [])

useEffect(() => {
  const handleClickOutside = (e: MouseEvent) => {
    if (
      guestsRef.current &&
      !guestsRef.current.contains(e.target as Node)
    ) {
      setShowGuests(false)
    }

    if (
      cityRef.current &&
      !cityRef.current.contains(e.target as Node)
    ) {
      setShowCityDropdown(false)
    }

    setActiveField(null)
  }

  document.addEventListener('mousedown', handleClickOutside)
  return () =>
    document.removeEventListener('mousedown', handleClickOutside)
}, [])


  /* ---------------- HANDLERS ---------------- */
  const handleCitySelect = (selectedCity: string) => {
    setCity(selectedCity)
    setSuggestions([])
    setShowCityDropdown(false)
  }

//   const handleSearch = () => {
//     if (!city || !checkIn || !checkOut) return

//     navigate('/booking', {
//       state: {
//         city,
//         checkIn,
//         checkOut,
//         guests,
//       },
//     })
//   }

const handleSearch = () => {
  if (!city || !checkIn || !checkOut) return

  // 🔑 City-level filtering happens HERE
//   const cityRooms = rooms.filter(
//     room => room.location.toLowerCase() === city.toLowerCase()
//   )

  navigate('/booking', {
    state: {
      city,
      checkIn,
      checkOut,
      guests,
    //   rooms: cityRooms, // ⬅️ already filtered
    },
  })
}

  return (
    <div className="search-card">

      {/* ================= CITY ================= */}
      <div className={`field large ${activeField === 'city' ? 'active' : ''}`} ref={cityRef}>
        <label>Where to</label>
        <input
          value={city}
          placeholder="Area, Landmark or Property Name"
          onFocus={() => {
  setCity('')
  setSuggestions([])
  setActiveField('city')
  setShowCityDropdown(true)
}}

          onChange={e => setCity(e.target.value)}
        />

        {showCityDropdown && (
          <div className="dropdown">
            {/* POPULAR SEARCHES */}
            {city.length === 0 && (
              <>
                <div className="dropdown-title">Popular Searches</div>
                <ul>
                  {POPULAR_CITIES.map(c => (
                    <li key={c} onClick={() => handleCitySelect(c)}>
                      📍 {c}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {/* API SEARCH RESULTS */}
            {city.length >= 2 && suggestions.length > 0 && (
              <ul>
                {suggestions.map(c => (
                  <li key={c} onClick={() => handleCitySelect(c)}>
                    📍 {c}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {/* ================= CHECK-IN ================= */}
     <div
  className={`field ${activeField === 'checkin' ? 'active' : ''}`}
>

        <label>Check-in</label>
        <input
          type="date"
          value={checkIn}
          onChange={e => setCheckIn(e.target.value)}
          onFocus={() => setActiveField('checkin')}

        />
      </div>

      {/* ================= CHECK-OUT ================= */}
      <div
  className={`field ${activeField === 'checkout' ? 'active' : ''}`}
>
        <label>Check-out</label>
        <input
          type="date"
          value={checkOut}
          onChange={e => setCheckOut(e.target.value)}
          onFocus={() => setActiveField('checkout')}

        />
      </div>

      {/* ================= GUESTS ================= */}
     <div
  className={`field guests ${activeField === 'guests' ? 'active' : ''}`}
  ref={guestsRef}
>

  <div
    className="guests-trigger"
   onClick={() => {
  setActiveField('guests')
  setShowGuests(prev => !prev)
}}

  >
    <label>Rooms & Guests</label>
 


<strong>
  {guests.adults} Adult{guests.adults > 1 ? 's' : ''}

  {guests.childrenAges.length > 0 &&
    ` | ${guests.childrenAges.length} Child${
      guests.childrenAges.length > 1 ? 'ren' : ''
    }`}

  {' | '}
  {guests.rooms} Room{guests.rooms > 1 ? 's' : ''}
</strong>


  </div>

  {showGuests && (
    <GuestsPopup guests={guests} setGuests={setGuests} />
  )}
</div>


      {/* ================= SEARCH ================= */}
      <button className="search-btn" onClick={handleSearch}>
        SEARCH
      </button>
    </div>
  )
}


