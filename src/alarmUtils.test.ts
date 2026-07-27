import { describe, it, expect } from 'vitest'
import { sortAlarmsByTime, isValidAlarmInput  } from './alarmUtils'
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

describe('isValidAlarmInput', () => {
    it('accepts a time and a label', () => {
        expect(isValidAlarmInput('07:00', 'Gym')).toBe(true)
    })

    it('rejects an empty time', () => {
        expect(isValidAlarmInput('', 'Gym')).toBe(false)
    })

    it('rejects an empty label', () => {
        expect(isValidAlarmInput('07:00', '')).toBe(false)
    })

    it('rejects a label of only spaces', () => {
        expect(isValidAlarmInput('07:00', '   ')).toBe(false)
    })
})
