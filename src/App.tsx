import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Booking from './pages/Booking'
import Rooms from './pages/Rooms'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
     

<Route path="/rooms" element={<Rooms />} />

      </Routes>
    </BrowserRouter>
  )
}



