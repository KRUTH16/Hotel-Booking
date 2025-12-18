
type Guests = {
  rooms: number
  adults: number
  childrenAges: number[]
}

type Props = {
  guests: Guests
  setGuests: React.Dispatch<React.SetStateAction<Guests>>
}

export default function GuestsPopup({ guests, setGuests }: Props) {
  const update = (key: 'rooms' | 'adults', value: number) => {
    setGuests(prev => ({
      ...prev,
      [key]: Math.max(1, value),
    }))
  }

  return (
    <div
      className="guests-popup"
      onClick={e => e.stopPropagation()}
    >

         <div className="guest-row-group">

      <Row
        label="Rooms"
        value={guests.rooms}
        onMinus={() => update('rooms', guests.rooms - 1)}
        onPlus={() => update('rooms', guests.rooms + 1)}
      />

      <Row
        label="Adults"
        value={guests.adults}
        onMinus={() => update('adults', guests.adults - 1)}
        onPlus={() => update('adults', guests.adults + 1)}
      />

      <Row
        label="Children"
        value={guests.childrenAges.length}
        onPlus={() =>
          setGuests(p => ({
            ...p,
            childrenAges: [...p.childrenAges, 0],
          }))
        }
        onMinus={() =>
          setGuests(p => ({
            ...p,
            childrenAges: p.childrenAges.slice(0, -1),
          }))
        }
      />
      </div>


      <div className="child-age-group">


      {guests.childrenAges.map((age, index) => (
        <div key={index} className="child-age">
          <span>Child {index + 1} Age</span>
          <select
            value={age}
            onChange={e => {
              const ages = [...guests.childrenAges]
              ages[index] = Number(e.target.value)
              setGuests(p => ({ ...p, childrenAges: ages }))
            }}
          >
            <option value={0}>Select</option>
            {Array.from({ length: 18 }).map((_, i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>
      ))}
      </div>
    </div>
  )
}

function Row({
  label,
  value,
  onMinus,
  onPlus,
}: {
  label: string
  value: number
  onMinus: () => void
  onPlus: () => void
}) {
  return (
    <div className="guest-row">
      <span>{label}</span>
      <div className="counter">
        <button onClick={onMinus} disabled={value === 1}>
          −
        </button>
        <span>{value}</span>
        <button onClick={onPlus}>+</button>
      </div>
    </div>
  )
}
