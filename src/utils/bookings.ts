

// const STORAGE_KEY = 'roomBookings'

// export function saveRoomBooking(
//   roomId: number,
//   checkIn: string,
//   checkOut: string
// ) {
//   const bookings = JSON.parse(
//     sessionStorage.getItem(STORAGE_KEY) || '{}'
//   )

//   const dates: string[] = []

//   for (
//     let d = new Date(checkIn);
//     d < new Date(checkOut);
//     d.setDate(d.getDate() + 1)
//   ) {
//     dates.push(d.toISOString().split('T')[0])
//   }

//   bookings[roomId] = [
//     ...new Set([...(bookings[roomId] || []), ...dates]),
//   ]

//   sessionStorage.setItem(STORAGE_KEY, JSON.stringify(bookings))
// }

// export function getBookedDates(roomId: number): string[] {
//   const bookings = JSON.parse(
//     sessionStorage.getItem(STORAGE_KEY) || '{}'
//   )

//   return bookings[roomId] || []
// }

const STORAGE_KEY = 'roomBookings'

/* ---------------- SAVE ROOM BOOKING ---------------- */
export function saveRoomBooking(
  roomId: number,
  checkIn: string,
  checkOut: string
) {
  const bookings = JSON.parse(
    sessionStorage.getItem(STORAGE_KEY) || '{}'
  )

  const dates: string[] = []

  for (
    let d = new Date(checkIn);
    d < new Date(checkOut);
    d.setDate(d.getDate() + 1)
  ) {
    dates.push(d.toISOString().split('T')[0])
  }

  bookings[roomId] = [
    ...new Set([...(bookings[roomId] || []), ...dates]),
  ]

  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(bookings))
}

/* ---------------- GET BOOKED DATES ---------------- */
export function getBookedDates(roomId: number): string[] {
  const bookings = JSON.parse(
    sessionStorage.getItem(STORAGE_KEY) || '{}'
  )

  return bookings[roomId] || []
}

/* ---------------- REMOVE ROOM BOOKING (CANCEL) ---------------- */
export function removeRoomBooking(
  roomId: number,
  checkIn: string,
  checkOut: string
) {
  const bookings = JSON.parse(
    sessionStorage.getItem(STORAGE_KEY) || '{}'
  )

  if (!bookings[roomId]) return

  const datesToRemove: string[] = []

  for (
    let d = new Date(checkIn);
    d < new Date(checkOut);
    d.setDate(d.getDate() + 1)
  ) {
    datesToRemove.push(d.toISOString().split('T')[0])
  }

  bookings[roomId] = bookings[roomId].filter(
    (date: string) => !datesToRemove.includes(date)
  )

  // Cleanup empty room entry
  if (bookings[roomId].length === 0) {
    delete bookings[roomId]
  }

  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(bookings))
}
