export interface GuestInfo {
  rooms: number
  adults: number
  children: number
}

export interface SearchParams {
  city: string
  checkIn: string
  checkOut: string
  guests: GuestInfo
}
