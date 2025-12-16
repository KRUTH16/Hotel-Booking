import type { Hotel } from '../types/hotel'

/* 🔹 Curated hotel image pool (all hotel / resort / room images) */
const HOTEL_IMAGES = [
  'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
  'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg',
  'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
  'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg',
  'https://images.pexels.com/photos/237371/pexels-photo-237371.jpeg',
  'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg',
  'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg',
  'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg',
]

/* 🔹 Stable image selector */
const getHotelImage = (id: string) =>
  HOTEL_IMAGES[
    id.split('').reduce((sum, c) => sum + c.charCodeAt(0), 0) %
      HOTEL_IMAGES.length
  ]

export const hotels: Hotel[] = [

/* ===================== Delhi ===================== */
{ id: 'DEL1', hotelName: 'Delhi Palace Inn', location: 'Delhi', rating: '4.1', image: getHotelImage('DEL1'), price: 3400 },
{ id: 'DEL2', hotelName: 'Hotel Metro View', location: 'Delhi', rating: '3.9', image: getHotelImage('DEL2'), price: 2800 },
{ id: 'DEL3', hotelName: 'The Royal Residency', location: 'Delhi', rating: '4.3', image: getHotelImage('DEL3'), price: 4200 },
{ id: 'DEL4', hotelName: 'Capital Stay', location: 'Delhi', rating: '3.8', image: getHotelImage('DEL4'), price: 2600 },
{ id: 'DEL5', hotelName: 'Red Fort Suites', location: 'Delhi', rating: '4.0', image: getHotelImage('DEL5'), price: 3100 },
{ id: 'DEL6', hotelName: 'Hotel Lotus Grand', location: 'Delhi', rating: '4.2', image: getHotelImage('DEL6'), price: 3900 },

/* ===================== Mumbai ===================== */
{ id: 'MUM1', hotelName: 'Sea View Residency', location: 'Mumbai', rating: '4.3', image: getHotelImage('MUM1'), price: 4800 },
{ id: 'MUM2', hotelName: 'Hotel Marine Plaza', location: 'Mumbai', rating: '4.5', image: getHotelImage('MUM2'), price: 6200 },
{ id: 'MUM3', hotelName: 'Urban Stay Andheri', location: 'Mumbai', rating: '4.0', image: getHotelImage('MUM3'), price: 3600 },
{ id: 'MUM4', hotelName: 'Gateway Suites', location: 'Mumbai', rating: '4.4', image: getHotelImage('MUM4'), price: 5400 },
{ id: 'MUM5', hotelName: 'Hotel Silver Sands', location: 'Mumbai', rating: '3.8', image: getHotelImage('MUM5'), price: 3100 },
{ id: 'MUM6', hotelName: 'Sunshine Residency', location: 'Mumbai', rating: '3.9', image: getHotelImage('MUM6'), price: 3300 },

/* ===================== Bengaluru ===================== */
{ id: 'BLR1', hotelName: 'The Central Court', location: 'Bengaluru', rating: '3.6', image: getHotelImage('BLR1'), price: 2716 },
{ id: 'BLR2', hotelName: 'Hotel Raintr33', location: 'Bengaluru', rating: '4.0', image: getHotelImage('BLR2'), price: 1938 },
{ id: 'BLR3', hotelName: 'Tech Park Residency', location: 'Bengaluru', rating: '4.2', image: getHotelImage('BLR3'), price: 3400 },
{ id: 'BLR4', hotelName: 'Green View Suites', location: 'Bengaluru', rating: '4.1', image: getHotelImage('BLR4'), price: 3200 },
{ id: 'BLR5', hotelName: 'Urban Hive', location: 'Bengaluru', rating: '3.9', image: getHotelImage('BLR5'), price: 2600 },
{ id: 'BLR6', hotelName: 'Silicon Valley Stay', location: 'Bengaluru', rating: '4.4', image: getHotelImage('BLR6'), price: 4100 },

/* ===================== Chennai ===================== */
{ id: 'CHE1', hotelName: 'Chennai Grand Residency', location: 'Chennai', rating: '4.2', image: getHotelImage('CHE1'), price: 3100 },
{ id: 'CHE2', hotelName: 'Marina Bay Hotel', location: 'Chennai', rating: '4.4', image: getHotelImage('CHE2'), price: 4200 },
{ id: 'CHE3', hotelName: 'Coastal Comfort Inn', location: 'Chennai', rating: '3.9', image: getHotelImage('CHE3'), price: 2600 },
{ id: 'CHE4', hotelName: 'The Pearl Suites', location: 'Chennai', rating: '4.1', image: getHotelImage('CHE4'), price: 3300 },
{ id: 'CHE5', hotelName: 'Hotel Blue Shore', location: 'Chennai', rating: '3.8', image: getHotelImage('CHE5'), price: 2400 },
{ id: 'CHE6', hotelName: 'City Palace Chennai', location: 'Chennai', rating: '4.3', image: getHotelImage('CHE6'), price: 3700 },

/* ===================== Hyderabad ===================== */
{ id: 'HYD1', hotelName: 'Charminar Residency', location: 'Hyderabad', rating: '4.0', image: getHotelImage('HYD1'), price: 3000 },
{ id: 'HYD2', hotelName: 'Hitech City Inn', location: 'Hyderabad', rating: '4.3', image: getHotelImage('HYD2'), price: 3800 },
{ id: 'HYD3', hotelName: 'Pearl Grand', location: 'Hyderabad', rating: '4.4', image: getHotelImage('HYD3'), price: 4200 },
{ id: 'HYD4', hotelName: 'Hotel Deccan Stay', location: 'Hyderabad', rating: '3.8', image: getHotelImage('HYD4'), price: 2600 },
{ id: 'HYD5', hotelName: 'Royal Nizam Suites', location: 'Hyderabad', rating: '4.5', image: getHotelImage('HYD5'), price: 4700 },
{ id: 'HYD6', hotelName: 'Urban Comfort', location: 'Hyderabad', rating: '3.9', image: getHotelImage('HYD6'), price: 2800 },

/* ===================== Kolkata ===================== */
{ id: 'KOL1', hotelName: 'Howrah Residency', location: 'Kolkata', rating: '4.0', image: getHotelImage('KOL1'), price: 2800 },
{ id: 'KOL2', hotelName: 'The Bengal Crown', location: 'Kolkata', rating: '4.3', image: getHotelImage('KOL2'), price: 3600 },
{ id: 'KOL3', hotelName: 'Park Street Inn', location: 'Kolkata', rating: '4.1', image: getHotelImage('KOL3'), price: 3100 },
{ id: 'KOL4', hotelName: 'Urban Nest Kolkata', location: 'Kolkata', rating: '3.9', image: getHotelImage('KOL4'), price: 2600 },
{ id: 'KOL5', hotelName: 'The Royal Ganges', location: 'Kolkata', rating: '4.4', image: getHotelImage('KOL5'), price: 4200 },
{ id: 'KOL6', hotelName: 'Elite Residency Kolkata', location: 'Kolkata', rating: '4.2', image: getHotelImage('KOL6'), price: 3500 },

/* ===================== Pune ===================== */
{ id: 'PUN1', hotelName: 'Shivaji Nagar Inn', location: 'Pune', rating: '3.9', image: getHotelImage('PUN1'), price: 2600 },
{ id: 'PUN2', hotelName: 'The Deccan Residency', location: 'Pune', rating: '4.2', image: getHotelImage('PUN2'), price: 3400 },
{ id: 'PUN3', hotelName: 'Urban Stay Hinjewadi', location: 'Pune', rating: '4.1', image: getHotelImage('PUN3'), price: 3200 },
{ id: 'PUN4', hotelName: 'Blue Ridge Suites', location: 'Pune', rating: '4.3', image: getHotelImage('PUN4'), price: 3800 },
{ id: 'PUN5', hotelName: 'Hotel Lotus Executive', location: 'Pune', rating: '3.8', image: getHotelImage('PUN5'), price: 2500 },
{ id: 'PUN6', hotelName: 'Elite Crown Pune', location: 'Pune', rating: '4.5', image: getHotelImage('PUN6'), price: 4500 },

/* ===================== Goa ===================== */
{ id: 'GOA1', hotelName: 'Sea Breeze Resort', location: 'Goa', rating: '4.6', image: getHotelImage('GOA1'), price: 5200 },
{ id: 'GOA2', hotelName: 'Palm Grove Retreat', location: 'Goa', rating: '4.4', image: getHotelImage('GOA2'), price: 4800 },
{ id: 'GOA3', hotelName: 'Beachside Bliss', location: 'Goa', rating: '4.2', image: getHotelImage('GOA3'), price: 4300 },
{ id: 'GOA4', hotelName: 'Ocean Pearl Suites', location: 'Goa', rating: '4.5', image: getHotelImage('GOA4'), price: 5000 },
{ id: 'GOA5', hotelName: 'Casa de Goa', location: 'Goa', rating: '4.1', image: getHotelImage('GOA5'), price: 4000 },
{ id: 'GOA6', hotelName: 'Blue Lagoon Resort', location: 'Goa', rating: '4.7', image: getHotelImage('GOA6'), price: 5600 },

/* ===================== Jaipur ===================== */
{ id: 'JAI1', hotelName: 'Pink City Palace', location: 'Jaipur', rating: '4.5', image: getHotelImage('JAI1'), price: 4200 },
{ id: 'JAI2', hotelName: 'Royal Heritage Inn', location: 'Jaipur', rating: '4.3', image: getHotelImage('JAI2'), price: 3900 },
{ id: 'JAI3', hotelName: 'Hotel Amber View', location: 'Jaipur', rating: '4.0', image: getHotelImage('JAI3'), price: 3100 },
{ id: 'JAI4', hotelName: 'The Maharaja Suites', location: 'Jaipur', rating: '4.6', image: getHotelImage('JAI4'), price: 4800 },
{ id: 'JAI5', hotelName: 'Elite Residency Jaipur', location: 'Jaipur', rating: '4.2', image: getHotelImage('JAI5'), price: 3400 },
{ id: 'JAI6', hotelName: 'The Golden Fort', location: 'Jaipur', rating: '4.4', image: getHotelImage('JAI6'), price: 4100 },

/* ===================== Ahmedabad ===================== */
{ id: 'AMD1', hotelName: 'Sabarmati Residency', location: 'Ahmedabad', rating: '4.0', image: getHotelImage('AMD1'), price: 2900 },
{ id: 'AMD2', hotelName: 'Hotel Heritage Plaza', location: 'Ahmedabad', rating: '4.2', image: getHotelImage('AMD2'), price: 3300 },
{ id: 'AMD3', hotelName: 'Urban Stay Ahmedabad', location: 'Ahmedabad', rating: '3.9', image: getHotelImage('AMD3'), price: 2700 },
{ id: 'AMD4', hotelName: 'The Grand Ashram', location: 'Ahmedabad', rating: '4.4', image: getHotelImage('AMD4'), price: 3800 },
{ id: 'AMD5', hotelName: 'Elite Crown Ahmedabad', location: 'Ahmedabad', rating: '4.5', image: getHotelImage('AMD5'), price: 4200 },
{ id: 'AMD6', hotelName: 'Hotel Riverfront View', location: 'Ahmedabad', rating: '4.1', image: getHotelImage('AMD6'), price: 3200 },

/* ===================== Chandigarh ===================== */
{ id: 'CHD1', hotelName: 'Sector 17 Residency', location: 'Chandigarh', rating: '4.1', image: getHotelImage('CHD1'), price: 3200 },
{ id: 'CHD2', hotelName: 'The Capital Crown', location: 'Chandigarh', rating: '4.4', image: getHotelImage('CHD2'), price: 3800 },
{ id: 'CHD3', hotelName: 'Urban Nest Chandigarh', location: 'Chandigarh', rating: '4.0', image: getHotelImage('CHD3'), price: 3000 },
{ id: 'CHD4', hotelName: 'Elite Residency Chandigarh', location: 'Chandigarh', rating: '4.3', image: getHotelImage('CHD4'), price: 3600 },
{ id: 'CHD5', hotelName: 'The Royal Court', location: 'Chandigarh', rating: '4.5', image: getHotelImage('CHD5'), price: 4200 },
{ id: 'CHD6', hotelName: 'City Pride Chandigarh', location: 'Chandigarh', rating: '4.2', image: getHotelImage('CHD6'), price: 3400 },

/* ===================== Kochi ===================== */
{ id: 'KOC1', hotelName: 'Marine Drive Residency', location: 'Kochi', rating: '4.3', image: getHotelImage('KOC1'), price: 3600 },
{ id: 'KOC2', hotelName: 'Backwater Bliss Inn', location: 'Kochi', rating: '4.5', image: getHotelImage('KOC2'), price: 4200 },
{ id: 'KOC3', hotelName: 'Hotel Fort Cochin', location: 'Kochi', rating: '4.2', image: getHotelImage('KOC3'), price: 3400 },
{ id: 'KOC4', hotelName: 'The Pearl Residency', location: 'Kochi', rating: '4.1', image: getHotelImage('KOC4'), price: 3100 },
{ id: 'KOC5', hotelName: 'Hotel Sea Breeze', location: 'Kochi', rating: '4.4', image: getHotelImage('KOC5'), price: 3800 },
{ id: 'KOC6', hotelName: 'Elite Crown Kochi', location: 'Kochi', rating: '4.6', image: getHotelImage('KOC6'), price: 4500 },

/* ===================== Trivandrum ===================== */
{ id: 'TVM1', hotelName: 'Capital Residency', location: 'Trivandrum', rating: '4.1', image: getHotelImage('TVM1'), price: 3000 },
{ id: 'TVM2', hotelName: 'Hotel Green Leaf', location: 'Trivandrum', rating: '4.3', image: getHotelImage('TVM2'), price: 3400 },
{ id: 'TVM3', hotelName: 'The Royal Palm', location: 'Trivandrum', rating: '4.5', image: getHotelImage('TVM3'), price: 3900 },
{ id: 'TVM4', hotelName: 'Elite Residency TVM', location: 'Trivandrum', rating: '4.2', image: getHotelImage('TVM4'), price: 3300 },
{ id: 'TVM5', hotelName: 'The Heritage Crown', location: 'Trivandrum', rating: '4.4', image: getHotelImage('TVM5'), price: 3700 },
{ id: 'TVM6', hotelName: 'Hotel Lotus Inn', location: 'Trivandrum', rating: '4.0', image: getHotelImage('TVM6'), price: 2800 },

/* ===================== Coimbatore ===================== */
{ id: 'CBE1', hotelName: 'Textile City Inn', location: 'Coimbatore', rating: '4.0', image: getHotelImage('CBE1'), price: 2800 },
{ id: 'CBE2', hotelName: 'The Grand Kovai', location: 'Coimbatore', rating: '4.3', image: getHotelImage('CBE2'), price: 3400 },
{ id: 'CBE3', hotelName: 'Urban Nest Coimbatore', location: 'Coimbatore', rating: '3.9', image: getHotelImage('CBE3'), price: 2600 },
{ id: 'CBE4', hotelName: 'Elite Crown Kovai', location: 'Coimbatore', rating: '4.4', image: getHotelImage('CBE4'), price: 3800 },
{ id: 'CBE5', hotelName: 'Hotel Green View', location: 'Coimbatore', rating: '4.1', image: getHotelImage('CBE5'), price: 3100 },
{ id: 'CBE6', hotelName: 'The Southern Pearl', location: 'Coimbatore', rating: '4.5', image: getHotelImage('CBE6'), price: 4200 },

/* ===================== Mysuru ===================== */
{ id: 'MYS1', hotelName: 'Palace View Residency', location: 'Mysuru', rating: '4.4', image: getHotelImage('MYS1'), price: 3600 },
{ id: 'MYS2', hotelName: 'The Royal Heritage', location: 'Mysuru', rating: '4.6', image: getHotelImage('MYS2'), price: 4200 },
{ id: 'MYS3', hotelName: 'Hotel City Pride', location: 'Mysuru', rating: '4.0', image: getHotelImage('MYS3'), price: 3000 },
{ id: 'MYS4', hotelName: 'Urban Nest Mysuru', location: 'Mysuru', rating: '3.9', image: getHotelImage('MYS4'), price: 2700 },
{ id: 'MYS5', hotelName: 'The Golden Palace Inn', location: 'Mysuru', rating: '4.5', image: getHotelImage('MYS5'), price: 3900 },
{ id: 'MYS6', hotelName: 'Elite Crown Mysuru', location: 'Mysuru', rating: '4.3', image: getHotelImage('MYS6'), price: 3500 },


]


