import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'

interface HeaderProps {
  theme?: 'dark' | 'light'
}

export default function Header({ theme = 'dark' }: HeaderProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const { totalItems } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)

  // Figma-accurate nav links
  const navLinks = [
    { label: 'Collection', path: '/catalog' },
    { label: 'Materials', path: '/home' },
    { label: 'Journal', path: '/home' },
  ]

  const isDark = theme === 'dark'

  return (
    <>
      <header
        className="site-header"
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 1000,
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          background: isDark ? 'var(--forest-green)' : 'var(--warm-white)',
          borderBottom: isDark
            ? '1px solid rgba(255,255,255,0.08)'
            : '1px solid var(--border-light)',
          transition: 'background 0.35s ease',
        }}
      >
        <div style={{
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 40px',
          display: 'flex',
          alignItems: 'center',
        }}>
          {/* ── Logo ─────────────────────────────────── */}
          <button
            onClick={() => navigate('/home')}
            aria-label="ReNew — Go to homepage"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              flexShrink: 0,
            }}
          >
            <img
              src={isDark ? '/renew-logo-white.png' : '/renew-logo.png'}
              alt="ReNew globe logo"
              style={{
                width: '36px',
                height: '36px',
                objectFit: 'contain',
                borderRadius: '4px',
              }}
            />
            <span style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '22px',
              fontWeight: 600,
              letterSpacing: '0.04em',
              color: isDark ? '#fff' : 'var(--forest-green)',
            }}>
              ReNew
            </span>
          </button>

          {/* ── Desktop Nav — hidden on mobile via CSS .header__nav ── */}
          <nav
            className="header__nav"
            aria-label="Main navigation"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '36px',
              marginLeft: 'auto',
            }}
          >
            {navLinks.map((link) => {
              const active = location.pathname === link.path
              return (
                <button
                  key={link.label}
                  onClick={() => navigate(link.path)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '12px',
                    fontWeight: 500,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: isDark
                      ? (active ? '#fff' : 'rgba(255,255,255,0.72)')
                      : (active ? 'var(--forest-green)' : 'var(--text-muted)'),
                    borderBottom: active
                      ? `1px solid ${isDark ? '#fff' : 'var(--forest-green)'}`
                      : '1px solid transparent',
                    paddingBottom: '2px',
                    transition: 'color 0.2s, border-color 0.2s',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLButtonElement).style.color = isDark ? '#fff' : 'var(--forest-green)'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.color = isDark
                      ? (active ? '#fff' : 'rgba(255,255,255,0.72)')
                      : (active ? 'var(--forest-green)' : 'var(--text-muted)')
                  }}
                >
                  {link.label}
                </button>
              )
            })}
          </nav>

          {/* ── Bag ──────────────────────────────────── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginLeft: '36px' }}>
            <button
              onClick={() => navigate('/cart')}
              aria-label={`Bag — ${totalItems} item${totalItems !== 1 ? 's' : ''}`}
              id="header-bag-btn"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: isDark ? 'rgba(255,255,255,0.9)' : 'var(--forest-green)',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.7' }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1' }}
            >
              {/* Bag icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              <span>Bag</span>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '18px',
                height: '18px',
                padding: '0 4px',
                borderRadius: '999px',
                background: isDark ? 'rgba(255,255,255,0.18)' : 'var(--forest-green)',
                color: isDark ? '#fff' : '#fff',
                fontSize: '10px',
                fontWeight: 600,
              }}>
                {totalItems}
              </span>
            </button>

            {/* Mobile hamburger — shown via CSS .header__menu-btn media query */}
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              className="header__menu-btn"
              style={{
                flexDirection: 'column',
                gap: '5px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
              }}
            >
              {[0,1,2].map(i => (
                <span key={i} style={{
                  display: 'block',
                  width: '22px',
                  height: '1.5px',
                  background: isDark ? '#fff' : 'var(--forest-green)',
                  borderRadius: '2px',
                  transition: 'all 0.2s',
                }} />
              ))}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Overlay ────────────────────────── */}
      {mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2000,
            background: 'var(--forest-green)',
            display: 'flex',
            flexDirection: 'column',
            padding: '32px 24px',
            gap: '8px',
          }}
        >
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            style={{
              alignSelf: 'flex-end',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#fff',
              fontSize: '24px',
              lineHeight: 1,
              marginBottom: '24px',
            }}
          >
            ✕
          </button>
          {[...navLinks, { label: 'Cart', path: '/cart' }, { label: 'Login', path: '/login' }].map(link => (
            <button
              key={link.label}
              onClick={() => { navigate(link.path); setMobileOpen(false) }}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: '1px solid rgba(255,255,255,0.12)',
                cursor: 'pointer',
                fontFamily: 'var(--font-serif)',
                fontSize: '28px',
                color: '#fff',
                textAlign: 'left',
                padding: '20px 0',
              }}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </>
  )
}
