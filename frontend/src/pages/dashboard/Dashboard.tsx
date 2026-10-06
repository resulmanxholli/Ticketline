import { useState } from 'react'
import { useAdminStatsQuery, useAdminUsersQuery, useUpdateUserRoleMutation } from '../../store/adminApi'
import { readError } from '../../store/errors'
import { useAppSelector } from '../../store/hooks'
import type { Role } from '../../types/user'
import CreateUserForm from './CreateUserForm'

const ROLES: Role[] = ['attendee', 'organizer', 'admin']

type DashboardProps = {
  onBack: () => void
}

export default function Dashboard({ onBack }: DashboardProps) {
  const me = useAppSelector((s) => s.auth.user)
  const { data: stats } = useAdminStatsQuery()
  const { data: usersData } = useAdminUsersQuery()
  const [updateRole, { isLoading: saving }] = useUpdateUserRoleMutation()
  const [error, setError] = useState<string | null>(null)

  async function changeRole(id: string, role: Role) {
    setError(null)
    try {
      await updateRole({ id, role }).unwrap()
    } catch (err) {
      setError(readError(err).message)
    }
  }

  const soldPercent =
    stats && stats.seats.capacity > 0 ? Math.round((stats.seats.taken / stats.seats.capacity) * 100) : 0

  return (
    <>
      <div className="band">
        <section className="shell hero">
          <button className="back-link" onClick={onBack}>
            ← Back
          </button>
          <div className="hero-copy">
            <span className="eyebrow">Admin</span>
            <h1 className="display">Dashboard</h1>
          </div>
        </section>
      </div>

      <section className="shell page">
        {!stats ? (
          <p className="muted">Loading stats…</p>
        ) : (
          <div className="stat-grid">
            <div className="card stat">
              <span className="eyebrow muted">Users</span>
              <span className="stat-value display">{stats.users.total}</span>
              <span className="muted fine">
                {stats.users.attendee} attendees · {stats.users.organizer} organizers · {stats.users.admin} admins
              </span>
            </div>
            <div className="card stat">
              <span className="eyebrow muted">Published events</span>
              <span className="stat-value display">{stats.events.published}</span>
              <span className="muted fine">
                {stats.events.draft} drafts · {stats.events.cancelled} cancelled
              </span>
            </div>
            <div className="card stat">
              <span className="eyebrow muted">Seats sold</span>
              <span className="stat-value display">{stats.seats.taken.toLocaleString()}</span>
              <span className="muted fine">
                {soldPercent}% of {stats.seats.capacity.toLocaleString()} on sale
              </span>
            </div>
          </div>
        )}

        <h2 className="section-title display">Staff accounts</h2>
        <CreateUserForm />

        <h2 className="section-title display">Users</h2>
        {error && <p className="form-error" role="alert">{error}</p>}

        {!usersData ? (
          <p className="muted">Loading users…</p>
        ) : (
          <div className="card table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                {usersData.users.map((user) => {
                  const isMe = user._id === me?._id
                  return (
                    <tr key={user._id}>
                      <td>
                        {user.name}
                        {isMe && <span className="muted"> (you)</span>}
                      </td>
                      <td className="muted">{user.email}</td>
                      <td>
                        <select
                          className="role-select"
                          value={user.role}
                          disabled={saving || isMe}
                          onChange={(e) => changeRole(user._id, e.target.value as Role)}
                          aria-label={`Role for ${user.name}`}
                        >
                          {ROLES.map((role) => (
                            <option key={role} value={role}>
                              {role}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="muted">{new Date(user.createdAt).toLocaleDateString()}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  )
}