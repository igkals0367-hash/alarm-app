import { useState } from 'react'
import './App.css'
import type { Alarm } from './types'


function App() {
  const [alarms, setAlarms] = useState<Alarm[]>([
  { id: '1', time: '07:00', label: 'Wake up', enabled: true },
  { id: '2', time: '08:30', label: 'Leave for work', enabled: false }
  ])

  const [time, setTime] = useState('')
  const [label, setLabel] = useState('')

  function addAlarm() {
    const newAlarm: Alarm = {
      id: crypto.randomUUID(),
      time: time,
      label: label,
      enabled: true,
    }
    setAlarms([...alarms, newAlarm])
    setTime('')
    setLabel('')
  }

  return (
    <div>
      <h1>Alarm Clock</h1>

      <div>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <input
          type="text"
          placeholder="Label"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
        <button onClick={addAlarm}>Add alarm</button>
      </div>
      
      <ul>
        {alarms.map((alarm) => (
          <li key={alarm.id}>
            {alarm.time} - {alarm.label} - {alarm.enabled ? 'On' : 'Off'}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App