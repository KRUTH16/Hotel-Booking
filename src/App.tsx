import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Booking from './pages/Booking'
import Rooms from './pages/Rooms'
import Pricing from './pages/Pricing'
import Confirmation from './pages/Confirmation'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
     

<Route path="/rooms" element={<Rooms />} />



<Route path="/pricing" element={<Pricing />} />
<Route path="/confirmation" element={<Confirmation />} />


      </Routes>
    </BrowserRouter>
  )
}



