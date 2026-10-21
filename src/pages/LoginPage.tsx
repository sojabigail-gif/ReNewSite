import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface FormState { phone: string; password: string }
interface Errors    { phone?: string; password?: string }

export default function LoginPage() {
  const navigate = useNavigate()
  const [form, setForm]       = useState<FormState>({ phone: '', password: '' })
  const [errors, setErrors]   = useState<Errors>({})
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)

  function validate(): boolean {
    const e: Errors = {}
    if (!form.phone.trim()) e.phone = 'Phone number is required'
    else if (!/^\+?\d{10,13}$/.test(form.phone.replace(/\s/g, '')))
      e.phone = 'Enter a valid phone number'
    if (!form.password) e.password = 'Password is required'
    else if (form.password.length < 4) e.password = 'At least 4 characters required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    setTimeout(() => { setLoading(false); navigate('/home') }, 1200)
  }

  function handleChange(field: keyof FormState, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  /* shared input style */
  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '13px 14px',
    border: '1px solid rgba(0,0,0,0.15)',
    borderRadius: '4px',
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    color: 'var(--text-dark)',
    background: 'rgba(255,255,255,0.6)',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    backdropFilter: 'blur(4px)',
  }

  return (
    /* Full-page background image */
    <main
      aria-label="Login page"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'stretch',
        overflow: 'hidden',
      }}
    >
      {/* ── Full-bleed background image ─────────────── */}
      <img
        src="/hero-room.png"
        alt="Luxury sustainable living room"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          zIndex: 0,
        }}
      />

      {/* Dark overlay (left side darker, right lighter) */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to right, rgba(10,46,36,0.72) 0%, rgba(10,46,36,0.25) 55%, rgba(10,46,36,0.1) 100%)',
        zIndex: 1,
      }} />

      {/* ── Left brand overlay ───────────────────────── */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '40px 48px',
        maxWidth: '56%',
      }}>
        {/* Logo + brand */}
        <button
          onClick={() => navigate('/')}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          aria-label="ReNew home"
        >
          <img src="/renew-logo-white.png" alt="ReNew logo" style={{ width: '40px', height: '40px', objectFit: 'contain', borderRadius: '4px' }} />
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', fontWeight: 600, color: '#fff', letterSpacing: '0.04em' }}>
            ReNew
          </span>
        </button>

        {/* Hero text */}
        <div style={{ paddingBottom: '40px' }}>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '11px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.6)',
            marginBottom: '16px',
          }}>
            A sustainable home account
          </p>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(36px, 4vw, 54px)',
            fontWeight: 400,
            color: '#fff',
            lineHeight: 1.1,
            marginBottom: '20px',
          }}>
            Thoughtful<br />furniture for a<br />brighter tomorrow
          </h2>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '14px',
            color: 'rgba(255,255,255,0.65)',
            lineHeight: 1.65,
            maxWidth: '360px',
          }}>
            Sustainably designed, biodegradable and made to last — track your orders, save favourites and manage your ReNew home.
          </p>
        </div>
      </div>

      {/* ── Frosted glass form panel ─────────────────── */}
      <div
        id="login-form-panel"
        style={{
          position: 'relative',
          zIndex: 2,
          width: '420px',
          flexShrink: 0,
          margin: '24px',
          borderRadius: '16px',
          /* Frosted glass */
          background: 'rgba(255, 252, 245, 0.82)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          border: '1px solid rgba(255,255,255,0.55)',
          boxShadow: '0 8px 48px rgba(10,46,36,0.18), inset 0 1px 0 rgba(255,255,255,0.7)',
          padding: '40px 40px 32px',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
        }}
      >
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '32px',
          fontWeight: 400,
          color: 'var(--forest-green)',
          marginBottom: '6px',
        }}>
          Welcome back.
        </h1>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '13px',
          color: 'var(--text-muted)',
          marginBottom: '32px',
        }}>
          Sign in to your ReNew account below.
        </p>

        <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Phone */}
          <div>
            <label style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}
              htmlFor="login-phone">
              Phone number
            </label>
            <div style={{ display: 'flex' }}>
              <span style={{
                padding: '13px 12px',
                border: '1px solid rgba(0,0,0,0.15)',
                borderRight: 'none',
                borderRadius: '4px 0 0 4px',
                fontSize: '14px',
                color: 'var(--text-muted)',
                background: 'rgba(255,255,255,0.5)',
                flexShrink: 0,
                display: 'flex', alignItems: 'center',
                backdropFilter: 'blur(4px)',
              }}>+91</span>
              <input
                id="login-phone"
                type="tel"
                style={{ ...inputStyle, borderRadius: '0 4px 4px 0', flex: 1, borderColor: errors.phone ? '#c0392b' : undefined }}
                placeholder="Enter your phone number"
                value={form.phone}
                onChange={e => handleChange('phone', e.target.value)}
                autoComplete="tel"
              />
            </div>
            {errors.phone && <p style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: '#c0392b', marginTop: '4px' }}>{errors.phone}</p>}
          </div>

          {/* Password */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)' }}
                htmlFor="login-password">
                Password
              </label>
              <a href="#" style={{ fontSize: '12px', color: 'var(--forest-green)', textDecoration: 'none' }}>Forgot password?</a>
            </div>
            <div style={{ position: 'relative' }}>
              <input
                id="login-password"
                type={showPass ? 'text' : 'password'}
                style={{ ...inputStyle, paddingRight: '44px', borderColor: errors.password ? '#c0392b' : undefined }}
                placeholder="Enter your password"
                value={form.password}
                onChange={e => handleChange('password', e.target.value)}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPass(s => !s)}
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '14px' }}
                aria-label={showPass ? 'Hide password' : 'Show password'}
              >
                {showPass ? '🙈' : '👁'}
              </button>
            </div>
            {errors.password && <p style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: '#c0392b', marginTop: '4px' }}>{errors.password}</p>}
          </div>

          {/* Log in */}
          <button
            type="submit"
            id="login-submit-btn"
            disabled={loading}
            style={{
              width: '100%',
              padding: '15px',
              background: loading ? 'var(--sage)' : 'var(--forest-green)',
              border: 'none',
              borderRadius: '4px',
              fontFamily: 'var(--font-sans)',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#fff',
              cursor: loading ? 'default' : 'pointer',
              transition: 'background 0.2s',
            }}
          >
            {loading ? 'Signing in…' : 'Log in'}
          </button>
        </form>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '24px 0 20px' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(0,0,0,0.1)' }} />
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'var(--text-muted)' }}>or continue as guest</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(0,0,0,0.1)' }} />
        </div>

        <button
          id="guest-continue-btn"
          onClick={() => navigate('/home')}
          style={{
            width: '100%',
            padding: '14px',
            background: 'transparent',
            border: '1px solid rgba(10,46,36,0.3)',
            borderRadius: '4px',
            fontFamily: 'var(--font-sans)',
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--forest-green)',
            cursor: 'pointer',
            transition: 'border-color 0.2s, background 0.2s',
            marginBottom: '28px',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(18,53,43,0.06)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent' }}
        >
          Continue without an account
        </button>

        <div style={{ height: '1px', background: 'rgba(0,0,0,0.08)', marginBottom: '24px' }} />

        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'var(--text-muted)', textAlign: 'center', marginBottom: '12px' }}>
          First time at ReNew?
        </p>
        <button
          id="create-account-btn"
          onClick={() => navigate('/home')}
          style={{
            width: '100%',
            padding: '14px',
            background: 'transparent',
            border: '1px solid rgba(10,46,36,0.3)',
            borderRadius: '4px',
            fontFamily: 'var(--font-sans)',
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--forest-green)',
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(18,53,43,0.06)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent' }}
        >
          Start a new account
        </button>

        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: 'var(--text-light)', textAlign: 'center', marginTop: '24px' }}>
          © 2026 ReNew Furniture Ltd.
        </p>
      </div>
    </main>
  )
}
