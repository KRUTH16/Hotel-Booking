export function calculateNights(checkIn: string, checkOut: string): number {
  const start = new Date(checkIn)
  const end = new Date(checkOut)
  const diff =
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  return Math.max(1, Math.ceil(diff))
}

export function hasWeekend(checkIn: string, checkOut: string): boolean {
  const d = new Date(checkIn)
  const end = new Date(checkOut)

  while (d < end) {
    const day = d.getDay() // 0 Sun, 6 Sat
    if (day === 0 || day === 6) return true
    d.setDate(d.getDate() + 1)
  }
  return false
}

export function calculateGuestMultiplier(
  adults: number,
  childrenCount: number
): number {
  // adults = full price, children = 50%
  return adults + childrenCount * 0.5
}

export function calculateTotalPrice(params: {
  basePrice: number
  nights: number
  roomsCount: number
  hasWeekend: boolean
  guestMultiplier: number
}) {
  let price =
    params.basePrice *
    params.nights *
    params.roomsCount *
    params.guestMultiplier

  // Weekend surge: +20%
  if (params.hasWeekend) {
    price *= 1.2
  }

  return Math.round(price)
}
