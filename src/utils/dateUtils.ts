export function isDateAvailable(
  date: string,
  unavailableDates: string[]
): boolean {
  return !unavailableDates.includes(date)
}
