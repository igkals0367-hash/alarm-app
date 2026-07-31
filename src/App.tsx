import { useState, useEffect } from 'react'
import './App.css'
import type { Alarm } from './types'
import { db } from './db'
import { sortAlarmsByTime, isValidAlarmInput, nextOccurence  } from './alarmUtils'
import { LocalNotifications } from '@capacitor/local-notifications'


function App() {

  const [alarms, setAlarms] = useState<Alarm[]>([])
  const [time, setTime] = useState('')
  const [label, setLabel] = useState('')
  const [error, setError] = useState('')
  const[search, setSearch] = useState('')


  async function loadAlarms() {
      const result = await db.allDocs({ include_docs:true })
      const loaded = result.rows.map((row) => row.doc as Alarm)
      setAlarms(sortAlarmsByTime(loaded))
    }

  useEffect(() => {
    loadAlarms()
  }, [])

  useEffect(() => {
    async function requestPermission() {
      try {
        const result = await LocalNotifications.requestPermissions()
        console.log('Notification Permission:', result.display)
      } catch (err) {
        console.log('Notification not available', err)
      }
    }
    requestPermission()
  }, [])

  async function addAlarm() {
    if (!isValidAlarmInput(time, label)) {
      setError('Please enter both time and label')
      return
    }

    setError('')

    const newAlarm: Alarm = {
      _id: crypto.randomUUID(),
      time: time,
      label: label,
      enabled: true,
    }

    try{
      await db.put(newAlarm)
      await LocalNotifications.schedule({
        notifications: [
          {
            id: Math.floor(Math.random() * 100000),
            title: 'Alarm',
            body: label,
            schedule: { at: nextOccurence(time)}, 
          }
        ]
      })
      loadAlarms()
      setTime('')
      setLabel('')
    } catch (err) {
      setError('Could not save the alarm')
      console.error('Failed to save alarm', err)
    }
    

  }

  async function deleteAlarm(alarm: Alarm) {
    await db.remove(alarm._id, alarm._rev!)
    loadAlarms()
  }

  async function toggleAlarm(alarm: Alarm) {
    await db.put({...alarm, enabled: !alarm.enabled})
    loadAlarms()
  }

  const searchResult = alarms.filter((alarm) => alarm.label.toLowerCase().includes(search.toLocaleLowerCase()))


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
        {error && <p style={{ color: 'red'}}>{error}</p>}
      </div>

      <ul>
        <input
          type='text'
          placeholder='text'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {searchResult.map((alarm) => (
          <li key={alarm._id}>
            <input
              type="checkbox"
              checked={alarm.enabled}
              onChange={() => toggleAlarm(alarm)}
            />
            {alarm.time} - {alarm.label}  
            <button onClick={() => deleteAlarm(alarm)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App