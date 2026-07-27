import { describe, it, expect } from 'vitest'
import { sortAlarmsByTime  } from './alarmUtils'
import type { Alarm } from './types'

describe("sortAlarmsbyTime", () => {
    it("puts earlier times first", () => {
        const alarms: Alarm[] = [
            { _id: '1', time: '22:00', label: 'Sleep', enabled: true },
            { _id: '2', time: '06:00', label: 'Gym', enabled: true },
            { _id: '3', time: '14:30', label: 'Lunch', enabled: true },
        ]

        const sorted = sortAlarmsByTime(alarms)

        expect(sorted[0].time).toBe('06:00')
        expect(sorted[1].time).toBe('14:30')
        expect(sorted[2].time).toBe('22:00')
    })
})