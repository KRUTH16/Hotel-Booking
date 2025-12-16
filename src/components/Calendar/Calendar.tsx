import './Calendar.css'

type Props = {
  label: string
  value: string
  onChange: (date: string) => void
}

export  function Calendar({ label, value, onChange }: Props) {
  return (
    <div className="calendar-field">
      <label>{label}</label>
      <input
        type="date"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  )
}
