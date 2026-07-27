import PouchDB from 'pouchdb-browser'
import type { Alarm } from './types'

export const db = new PouchDB<Alarm>('alarms')