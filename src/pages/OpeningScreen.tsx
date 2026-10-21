import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const DURATION = 3000 // ms before navigating to login

export default function OpeningScreen() {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Fade logo in immediately
    requestAnimationFrame(() => setVisible(true))

    // Navigate to login after 3 s
    const timer = setTimeout(() => {
      navigate('/login')
    }, DURATION)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div
      onClick={() => navigate('/login')}
      aria-label="ReNew — tap to enter"
      role="main"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--forest-green)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '28px',
        cursor: 'pointer',
        userSelect: 'none',
        /* Very subtle vignette */
        backgroundImage: 'radial-gradient(ellipse at center, #1a4a3a 0%, var(--forest-green) 70%)',
      }}
    >
      {/* Globe logo — white */}
      <div style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1) translateY(0)' : 'scale(0.88) translateY(16px)',
        transition: 'opacity 0.9s ease, transform 0.9s ease',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
      }}>
        <img
          src="/renew-logo-white.png"
          alt="ReNew logo"
          style={{
            width: '140px',
            height: '140px',
            objectFit: 'contain',
            display: 'block',
            borderRadius: '8px',
          }}
        />

        {/* Brand name */}
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '42px',
          fontWeight: 600,
          letterSpacing: '0.1em',
          color: '#fff',
          margin: 0,
          lineHeight: 1,
        }}>
          ReNew
        </h1>

        {/* Tagline */}
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '11px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.45)',
          margin: 0,
        }}>
          Sustainable · Biodegradable · Made to last
        </p>
      </div>

      {/* Progress bar at bottom */}
      <div style={{
        position: 'absolute',
        bottom: '48px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '120px',
        height: '1px',
        background: 'rgba(255,255,255,0.12)',
        borderRadius: '1px',
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          background: 'rgba(255,255,255,0.5)',
          animation: `progress ${DURATION}ms linear forwards`,
        }} />
      </div>

      <style>{`
        @keyframes progress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </div>
  )
}
