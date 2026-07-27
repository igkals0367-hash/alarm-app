import type { Alarm } from './types'

export function sortAlarmsByTime(alarms: Alarm[]): Alarm[] {
    return [...alarms].sort((a,b) => a.time.localeCompare(b.time))
}