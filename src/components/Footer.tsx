import { useNavigate } from 'react-router-dom'

export default function Footer() {
  const navigate = useNavigate()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          {/* Brand col */}
          <div>
            <div className="footer__brand-logo">
              <img src="/renew-logo.png" alt="ReNew" className="footer__brand-icon" />
              <span className="footer__brand-name">ReNew</span>
            </div>
            <p className="footer__tagline">
              Thoughtful furniture for a brighter tomorrow. Sustainably designed, made to last.
            </p>
          </div>

          {/* Collections */}
          <div>
            <p className="footer__col-title">Collections</p>
            <ul className="footer__links">
              <li><button onClick={() => navigate('/catalog')}>All Products</button></li>
              <li><button onClick={() => navigate('/catalog')}>Seating</button></li>
              <li><button onClick={() => navigate('/catalog')}>Tables</button></li>
              <li><button onClick={() => navigate('/catalog')}>Storage</button></li>
            </ul>
          </div>

          {/* Materials */}
          <div>
            <p className="footer__col-title">Materials</p>
            <ul className="footer__links">
              <li><a href="#">Solid Oak</a></li>
              <li><a href="#">Teak</a></li>
              <li><a href="#">Bamboo</a></li>
              <li><a href="#">Reclaimed Wood</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="footer__col-title">Our Story</p>
            <ul className="footer__links">
              <li><a href="#">About ReNew</a></li>
              <li><a href="#">Sustainability</a></li>
              <li><a href="#">Craftsmanship</a></li>
              <li><button onClick={() => navigate('/login')}>Sign In</button></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© 2026 ReNew Furniture Ltd. All rights reserved.</span>
          <div className="footer__bottom-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
