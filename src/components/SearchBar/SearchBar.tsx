


import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GuestsPopup from './GuestsPopup'
import { fetchCities, POPULAR_CITIES } from './cityService'
import './SearchBar.css'

export default function SearchBar() {
  const navigate = useNavigate()

  /* ---------------- CITY ---------------- */
  const [city, setCity] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showCityDropdown, setShowCityDropdown] = useState(false)

  /* ---------------- DATES ---------------- */
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')

  /* ---------------- GUESTS ---------------- */
  const [showGuests, setShowGuests] = useState(false)
  const [guests, setGuests] = useState({
    rooms: 1,
    adults: 2,
    childrenAges: [] as number[],
  })

  /* ---------------- REFS ---------------- */
  const guestsRef = useRef<HTMLDivElement>(null)
  const cityRef = useRef<HTMLDivElement>(null)

  /* ---------------- CITY AUTOCOMPLETE ---------------- */
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (city.length >= 2) {
        const result = await fetchCities(city)
        setSuggestions(result)
      } else {
        setSuggestions([])
      }
    }, 400)

    return () => clearTimeout(timer)
  }, [city])

  /* ---------------- OUTSIDE CLICK ---------------- */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (guestsRef.current && !guestsRef.current.contains(e.target as Node)) {
        setShowGuests(false)
      }
      if (cityRef.current && !cityRef.current.contains(e.target as Node)) {
        setShowCityDropdown(false)
      }
    }

    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  /* ---------------- SEARCH ---------------- */
  const handleSearch = () => {
    if (!city || !checkIn || !checkOut) return

    navigate('/booking', {
      state: {
        city,
        checkIn,
        checkOut,
        guests,
      },
    })
  }

  return (
    <div className="sb-container">
      {/* ================= CITY ================= */}
      {/* <h1 className="Title">Book Hotels and Homestays</h1> */}
      <div className="sb-field sb-field-large" ref={cityRef}>
        <label className="sb-label">Where to</label>

        <input
          className="sb-input"
          value={city}
          placeholder="Area, Landmark or Property Name"
          onChange={e => setCity(e.target.value)}

          /* ✅ KEY FIX HERE */
          onFocus={() => {
            setCity('')                // reset input
            setSuggestions([])         // reset suggestions
            setShowCityDropdown(true)  // show all cities
          }}
        />

        {showCityDropdown && (
          <div className="sb-dropdown">
            {/* POPULAR CITIES */}
            {city.length === 0 && (
              <>
                <div className="sb-dropdown-title">Popular Searches</div>
                <ul className="sb-city-list">
                  {POPULAR_CITIES.map(c => (
                    <li
                      key={c}
                      onClick={() => {
                        setCity(c)
                        setShowCityDropdown(false)
                      }}
                    >
                      📍 {c}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {/* AUTOCOMPLETE RESULTS */}
            {city.length >= 2 && (
              <ul>
                {suggestions.map(c => (
                  <li
                    key={c}
                    onClick={() => {
                      setCity(c)
                      setShowCityDropdown(false)
                    }}
                  >
                    📍 {c}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {/* ================= CHECK-IN ================= */}
      <div className="sb-field">
        <label className="sb-label">Check-in</label>
        <input
          type="date"
          className="sb-input"
          value={checkIn}
          onChange={e => setCheckIn(e.target.value)}
        />
      </div>

      {/* ================= CHECK-OUT ================= */}
      <div className="sb-field">
        <label className="sb-label">Check-out</label>
        <input
          type="date"
          className="sb-input"
          value={checkOut}
          onChange={e => setCheckOut(e.target.value)}
        />
      </div>

      {/* ================= ROOMS & GUESTS ================= */}
      <div className="sb-field sb-guests" ref={guestsRef}>
        <label className="sb-label">Rooms & Guests</label>

        <div
          className="sb-input sb-guests-input"
          onClick={() => setShowGuests(prev => !prev)}
        >
          {guests.adults} Adult{guests.adults > 1 ? 's' : ''}
          {guests.childrenAges.length > 0 &&
            ` | ${guests.childrenAges.length} Child`}
          {' | '}
          {guests.rooms} Room{guests.rooms > 1 ? 's' : ''}
        </div>

        {showGuests && (
          <div className="sb-guests-popup">
            <GuestsPopup guests={guests} setGuests={setGuests} />
          </div>
        )}
      </div>

      {/* ================= SEARCH ================= */}
      <button className="sb-search-btn" onClick={handleSearch}>
        SEARCH
      </button>
    </div>
  )
}

