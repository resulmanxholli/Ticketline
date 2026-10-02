import { seatlyApi } from '../store/api'
import { signedOut } from '../store/authSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'

type HeaderProps = {
  onHome: () => void
  onSignIn: () => void
}

export default function Header({ onHome, onSignIn }: HeaderProps) {
  const dispatch = useAppDispatch()
  const token = useAppSelector((s) => s.auth.token)
  const user = useAppSelector((s) => s.auth.user)

  // token but no user yet = /me is still checking, so show nothing for a moment
  const restoring = token !== null && user === null

  function logout() {
    localStorage.removeItem('seatly.token')
    dispatch(signedOut())
    dispatch(seatlyApi.util.resetApiState())
  }

  return (
    <div className="band">
      <header className="shell topbar">
        <div className="topbar-left">
          <button className="logo" onClick={onHome}>
            Seatly
          </button>
          <nav className="topnav" aria-label="Main">
            <a className="on" href="#browse">Discover</a>
            <a className="optional" href="#tickets">My tickets</a>
            <a href="#host">Host an event</a>
          </nav>
        </div>

        {!restoring && (
          <div className="topbar-right">
            {user ? (
              <>
                <span className="user-name">{user.name}</span>
                <button className="btn sm btn-on-green" onClick={logout}>
                  Sign out
                </button>
              </>
            ) : (
              <button className="btn btn-lime" onClick={onSignIn}>
                Sign in
              </button>
            )}
          </div>
        )}
      </header>
    </div>
  )
}