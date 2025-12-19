import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Header.css'

export default function Header() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <header className="app-header">
      {/* ☰ Menu Icon */}
      <div
        className="menu-icon"
        onClick={() => setOpen(prev => !prev)}
      >
        <span />
        <span />
        <span />
      </div>

      {/* 🏨 Logo + Name */}
      <div
        className="brand"
        onClick={() => navigate('/')}
      >
      
      </div>

      {/* Dropdown */}
      {open && (
        <div className="menu-dropdown">
          <div onClick={() => navigate('/')}>Home</div>
          <div onClick={() => navigate('/my-bookings')}>
            My Bookings
          </div>
        </div>
      )}
    </header>
  )
}
