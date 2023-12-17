import type { Database as DB, Enums } from './database'

export type Event = DB['public']['Tables']['events']['Row']
export type EventColor = DB['public']['Enums']['Color']
export type Database = DB
