import { useState, type FormEvent } from 'react'
import FieldError from '../../components/FieldError'
import { useCreateUserMutation } from '../../store/adminApi'
import { readError } from '../../store/errors'

type StaffRole = 'organizer' | 'admin'

export default function CreateUserForm() {
  const [createUser, { isLoading }] = useCreateUserMutation()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<StaffRole>('organizer')
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})
  const [created, setCreated] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setFieldErrors({})
    setCreated(null)
    try {
      const { user } = await createUser({ name, email, password, role }).unwrap()
      setCreated(`${user.name} can now sign in as ${user.role}.`)
      setName('')
      setEmail('')
      setPassword('')
      setRole('organizer')
    } catch (err) {
      const readable = readError(err)
      setError(readable.message)
      setFieldErrors(readable.fieldErrors)
    }
  }

  return (
    <div className="card panel">
      <div className="panel-head">
        <h2>Create a staff account</h2>
        <span className="muted fine">Organizers can create and run events</span>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <div className="field-row">
          <label>
            Name
            <input value={name} onChange={(e) => setName(e.target.value)} required />
            <FieldError messages={fieldErrors.name} />
          </label>
          <label>
            Email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <FieldError messages={fieldErrors.email} />
          </label>
        </div>

        <div className="field-row">
          <label>
            Temporary password
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
              minLength={8}
              required
            />
            <span className="muted fine field-hint">At least 8 characters. Share it with them privately.</span>
            <FieldError messages={fieldErrors.password} />
          </label>
          <label>
            Role
            <select value={role} onChange={(e) => setRole(e.target.value as StaffRole)}>
              <option value="organizer">Organizer</option>
              <option value="admin">Admin</option>
            </select>
          </label>
        </div>

        {error && <p className="form-error" role="alert">{error}</p>}
        {created && <p className="form-success" role="status">{created}</p>}

        <div>
          <button className="btn btn-primary" type="submit" disabled={isLoading}>
            {isLoading ? 'Creating…' : 'Create account'}
          </button>
        </div>
      </form>
    </div>
  )
}