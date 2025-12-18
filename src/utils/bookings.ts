

const STORAGE_KEY = 'roomBookings'

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

export function getBookedDates(roomId: number): string[] {
  const bookings = JSON.parse(
    sessionStorage.getItem(STORAGE_KEY) || '{}'
  )

  return bookings[roomId] || []
}
