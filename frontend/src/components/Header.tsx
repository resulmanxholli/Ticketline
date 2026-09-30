type HeaderProps = {
  onHome: () => void
}

export default function Header({ onHome }: HeaderProps) {
  return (
    <div className="band">
      <header className="shell topbar">
        <div className="topbar-left">
          <button className="logo" onClick={onHome}>
            Seatly
          </button>
          <nav className="topnav" aria-label="Main">
            <a className="on" href="#browse">
              Discover
            </a>
            <a className="optional" href="#tickets">
              My tickets
            </a>
            <a href="#host">Host an event</a>
          </nav>
        </div>
        <button className="btn btn-lime">Sign in</button>
      </header>
    </div>
  )
}
