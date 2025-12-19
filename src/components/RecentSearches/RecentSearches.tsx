import './RecentSearches.css'
import { useNavigate } from 'react-router-dom'

type RecentSearch = {
  city: string
  checkIn: string
  checkOut: string
  guestsText: string
}

export default function RecentSearches() {
  const navigate = useNavigate()

  const recentSearches: RecentSearch[] = JSON.parse(
    sessionStorage.getItem('recentSearches') || '[]'
  )

  if (recentSearches.length === 0) return null

  return (
    <div className="recent-wrapper">
      <h3 className="recent-title">Recent Searches</h3>

      <div className="recent-scroll">
        {recentSearches.map((s, i) => (
          <div
            key={i}
            className="recent-card"
            onClick={() =>
              navigate('/hotels', {
                state: {
                  city: s.city,
                  checkIn: s.checkIn,
                  checkOut: s.checkOut,
                },
              })
            }
          >
            <span className="recent-city">{s.city}</span>

            <div className="recent-dates">
              {new Date(s.checkIn).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}{' '}
              -{' '}
              {new Date(s.checkOut).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </div>

            <div className="recent-guests">{s.guestsText}</div>

            <span className="recent-arrow">›</span>
          </div>
        ))}
      </div>
    </div>
  )
}
