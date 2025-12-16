// type Props = {
//   guests: {
//     rooms: number
//     adults: number
//     children: number
//   }
//   setGuests: React.Dispatch<
//     React.SetStateAction<{
//       rooms: number
//       adults: number
//       children: number
//     }>
//   >
// }

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
  const update = (key: 'rooms' | 'adults' | 'children', value: number) => {
    setGuests(prev => ({
      ...prev,
      [key]:  value,
    }))
  }

  return (
     <div
      className="guests-popup"
      onClick={e => e.stopPropagation()}   // ✅ FIX GOES HERE
    >
      <Row
        label="Room"
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
        // onMinus={() => update('children', guests.children - 1)}
        // onPlus={() => update('children', guests.children + 1)}
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

      {guests.childrenAges.map((age, index) => (
  <div key={index} className="child-age">
    <span>Child {index + 1} Age</span>

    <select
      value={age}
      onChange={e => {
        const newAges = [...guests.childrenAges]
        newAges[index] = Number(e.target.value)
        setGuests(p => ({ ...p, childrenAges: newAges }))
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
        <button onClick={onMinus} disabled={label === 'Room' && value === 1}>
  −
</button>


        <span>{value}</span>
        <button onClick={onPlus}>+</button>
      </div>
    </div>
  )
}
