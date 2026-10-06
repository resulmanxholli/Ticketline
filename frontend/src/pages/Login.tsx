import { useState, type FormEvent } from 'react'
import { useLoginMutation, useRegisterMutation } from '../store/authApi'
import { signedIn } from '../store/authSlice'
import { readError } from '../store/errors'
import { useAppDispatch } from '../store/hooks'
import FieldError from '../components/FieldError'

type LoginProps = {
  onDone: () => void
  onCancel: () => void
}

export default function Login({ onDone, onCancel }: LoginProps) {
  const dispatch = useAppDispatch()
  const [login, loginState] = useLoginMutation()
  const [register, registerState] = useRegisterMutation()

  const [mode, setMode] = useState<'signin' | 'register'>('signin')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})

  const isSignIn = mode === 'signin'
  const submitting = loginState.isLoading || registerState.isLoading

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setFieldErrors({})
    try {
      const result = isSignIn
        ? await login({ email, password }).unwrap()
        : await register({ name, email, password }).unwrap()
      localStorage.setItem('seatly.token', result.token)
      dispatch(signedIn(result))
      onDone()
    } catch (err) {
      const readable = readError(err)
      setError(readable.message)
      setFieldErrors(readable.fieldErrors)
    }
  }

  return (
    <>
      <div className="band">
        <section className="shell hero">
          <button className="back-link" onClick={onCancel}>← Back</button>
        </section>
      </div>

      <section className="shell page">
        <div className="card auth-card">
          <h1 className="display">{isSignIn ? 'Welcome back.' : <>Join <em>Seatly.</em></>}</h1>

          <form className="form" onSubmit={handleSubmit}>
            {!isSignIn && (
              <label>
                Name
                <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required />
                <FieldError messages={fieldErrors.name} />
              </label>
            )}
            <label>
              Email
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
              <FieldError messages={fieldErrors.email} />
            </label>
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={isSignIn ? 'current-password' : 'new-password'}
                minLength={isSignIn ? undefined : 8}
                required
              />
              {!isSignIn && <span className="muted fine field-hint">At least 8 characters</span>}
              <FieldError messages={fieldErrors.password} />
            </label>

            {error && <p className="form-error" role="alert">{error}</p>}

            <button className="btn btn-primary lg block" type="submit" disabled={submitting}>
              {submitting ? 'Please wait…' : isSignIn ? 'Sign in' : 'Create account'}
            </button>
          </form>

          <p className="muted auth-switch">
            {isSignIn ? 'New to Seatly? ' : 'Already have an account? '}
            <button type="button" className="text-btn" onClick={() => setMode(isSignIn ? 'register' : 'signin')}>
              {isSignIn ? 'Create an account' : 'Sign in'}
            </button>
          </p>
        </div>
      </section>
    </>
  )
}