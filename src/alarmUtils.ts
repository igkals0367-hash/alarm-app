import type { Alarm } from './types'

export function sortAlarmsByTime(alarms: Alarm[]): Alarm[] {
    return [...alarms].sort((a,b) => a.time.localeCompare(b.time))
}

export function isValidAlarmInput(time: string, label: string): boolean {
    return time.trim() !== '' && label.trim() !== ''
}

export function nextOccurence(time: string, now: Date = new Date()) : Date {
    const [hours, minutes] = time.split(':').map(Number)

    const target = new Date(now)
    target.setHours(hours, minutes, 0, 0)

    if (target <= now){
        target.setDate(target.getDate() + 1)
    }

    return target
}