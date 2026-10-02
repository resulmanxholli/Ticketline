export type Role = 'attendee' | 'organizer'

export type User = {
  _id: string
  name: string
  email: string
  role: Role
}