import { getBookedDates } from './bookings'

export function isRoomBooked(
  roomId: number,
  unavailableDates: string[] = [],
  checkIn: string,
  checkOut: string
): boolean {
  const storedDates = getBookedDates(roomId)
  const allDates = [...new Set([...unavailableDates, ...storedDates])]

  const start = new Date(checkIn)
  const end = new Date(checkOut)

  for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split('T')[0]
    if (allDates.includes(dateStr)) {
      return true
    }
  }

  return false
}

export function getDateRange(
  checkIn: string,
  checkOut: string
): string[] {
  const dates: string[] = []
  const start = new Date(checkIn)
  const end = new Date(checkOut)

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    dates.push(d.toISOString().split('T')[0])
  }

  return dates
}

