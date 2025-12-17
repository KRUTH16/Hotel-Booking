export function isRoomAvailable(
  unavailableDates: string[],
  checkIn: string,
  checkOut: string
): boolean {
  const start = new Date(checkIn)
  const end = new Date(checkOut)

  for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split('T')[0]
    if (unavailableDates.includes(dateStr)) {
      return false
    }
  }
  return true
}
