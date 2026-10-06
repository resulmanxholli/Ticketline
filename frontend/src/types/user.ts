export type Role = 'attendee' | 'organizer' | 'admin'

export type User = {
  _id: string
  name: string
  email: string
  role: Role
}