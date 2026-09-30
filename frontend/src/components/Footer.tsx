export default function Footer() {
  return (
    <footer className="site-footer" id="help">
      <div className="shell footer-inner">
        <div>
          <span className="logo">Seatly</span>
          <p className="muted">Tickets for concerts, festivals, theatre and sport.</p>
        </div>

        <div className="footer-cols">
          <div>
            <h4>Buy</h4>
            <a href="#browse">All events</a>
            <a href="#venues">Venues</a>
            <a href="#browse">Gift cards</a>
          </div>
          <div>
            <h4>Support</h4>
            <a href="#help">Order lookup</a>
            <a href="#help">Refund policy</a>
            <a href="#help">Contact us</a>
          </div>
          <div>
            <h4>Company</h4>
            <a href="#help">About</a>
            <a href="#help">Sell with us</a>
            <a href="#help">Terms</a>
          </div>
        </div>
      </div>
      <div className="shell footer-legal muted">© 2026 Seatly — static preview, no real orders are taken.</div>
    </footer>
  )
}
