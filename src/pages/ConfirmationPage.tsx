import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { formatPrice } from '../data/products'

interface OrderData {
  orderId: string
  items: Array<{ id: string; name: string; price: number; quantity: number; colour: string; image: string }>
  subtotal: number
  total: number
  address: { firstName: string; lastName: string; street: string; city: string; postal: string; country: string }
  email: string
  payment: string
  estimatedDelivery: string
}

const now = Date.now()
const fmt = (offset: number) =>
  new Date(now + offset).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })

const TRACK_STEPS = [
  { label: 'Order placed',    date: fmt(0) },
  { label: 'Packed',          date: `Est. ${fmt(1 * 864e5)}` },
  { label: 'Shipped',         date: `Est. ${fmt(3 * 864e5)}` },
  { label: 'Out for delivery',date: `Est. ${fmt(6 * 864e5)}` },
  { label: 'Delivered',       date: `Est. ${fmt(7 * 864e5)}` },
]

const ACTIVE = 0 // "Order placed" is the current step

export default function ConfirmationPage() {
  const navigate = useNavigate()
  const [order, setOrder] = useState<OrderData | null>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem('renew_last_order')
      if (raw) setOrder(JSON.parse(raw))
    } catch { /* ignore */ }
  }, [])

  const subtotal = order?.subtotal ?? 0
  const total    = order?.total    ?? subtotal
  const estDelivery = order?.estimatedDelivery ?? TRACK_STEPS[4].date

  return (
    <>
      <Header theme="dark" />

      <main style={{ paddingTop: '64px' }}>

        {/* ── Dark Green Hero ─────────────────────────────── */}
        <section style={{
          background: 'var(--forest-green)',
          color: '#fff',
          padding: '80px 40px 72px',
          textAlign: 'center',
        }}>
          {/* Circle check */}
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            border: '1.5px solid rgba(255,255,255,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          {/* Eyebrow */}
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.65)',
            marginBottom: '20px',
          }}>
            Order Confirmed
          </p>

          {/* Main heading */}
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(38px, 5vw, 62px)',
            fontWeight: 400,
            lineHeight: 1.1,
            color: '#fff',
            marginBottom: '24px',
          }}>
            Thank you. Your order is{' '}
            <em style={{ fontStyle: 'italic' }}>placed.</em>
          </h1>

          {/* Sub */}
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '14px',
            color: 'rgba(255,255,255,0.72)',
            lineHeight: 1.6,
            maxWidth: '520px',
            margin: '0 auto',
          }}>
            A confirmation has been sent to your email
            {order?.email ? ` (${order.email})` : ''}.{' '}
            Order #{order?.orderId ?? 'RN-000000'} ·{' '}
            {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
          </p>
        </section>

        {/* ── Track Your Order ────────────────────────────── */}
        <section style={{
          background: 'var(--ivory)',
          padding: '56px 40px 64px',
        }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

            {/* Row: heading + est + button */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
              marginBottom: '52px',
            }}>
              <h2 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '36px',
                fontWeight: 400,
                color: 'var(--forest-green)',
              }}>
                Track your order
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                <p style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13px',
                  color: 'var(--text-muted)',
                }}>
                  Estimated delivery: {estDelivery}
                </p>
                <button
                  id="track-order-btn"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '11px',
                    fontWeight: 500,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--forest-green)',
                    border: '1px solid var(--forest-green)',
                    background: 'transparent',
                    padding: '12px 24px',
                    cursor: 'pointer',
                    borderRadius: '2px',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = 'var(--forest-green)'
                    ;(e.currentTarget as HTMLButtonElement).style.color = '#fff'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = 'transparent'
                    ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--forest-green)'
                  }}
                >
                  Track Order
                </button>
              </div>
            </div>

            {/* ── Progress Tracker ── */}
            <div className="renew-tracker-wrap" style={{ position: 'relative' }}>
              {/* Background line */}
              <div style={{
                position: 'absolute',
                top: '11px',
                left: '11px',
                right: '11px',
                height: '1px',
                background: 'var(--border)',
                zIndex: 0,
              }} />
              {/* Active line (only first segment filled) */}
              <div style={{
                position: 'absolute',
                top: '11px',
                left: '11px',
                width: '0%',
                height: '1px',
                background: 'var(--forest-green)',
                zIndex: 1,
              }} />

              {/* Steps */}
              <div className="renew-tracker-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                position: 'relative',
                zIndex: 2,
              }}>
                {TRACK_STEPS.map((step, i) => {
                  const isDone   = i < ACTIVE
                  const isCurrent = i === ACTIVE
                  return (
                    <div key={step.label} style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: i === 0 ? 'flex-start' : i === TRACK_STEPS.length - 1 ? 'flex-end' : 'center',
                    }}>
                      {/* Dot */}
                      <div style={{
                        width: '22px',
                        height: '22px',
                        borderRadius: '50%',
                        border: `2px solid ${isDone || isCurrent ? 'var(--forest-green)' : 'var(--border)'}`,
                        background: isDone || isCurrent ? 'var(--forest-green)' : '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '14px',
                        flexShrink: 0,
                      }}>
                        {isDone ? (
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                            stroke="white" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        ) : null}
                      </div>

                      {/* Label */}
                      <p style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '13px',
                        fontWeight: isCurrent ? 600 : 400,
                        color: isCurrent ? 'var(--forest-green)' : 'var(--text-dark)',
                        marginBottom: '4px',
                        textAlign: i === 0 ? 'left' : i === TRACK_STEPS.length - 1 ? 'right' : 'center',
                      }}>
                        {step.label}
                      </p>

                      {/* Date */}
                      <p style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '12px',
                        color: 'var(--text-muted)',
                        textAlign: i === 0 ? 'left' : i === TRACK_STEPS.length - 1 ? 'right' : 'center',
                      }}>
                        {step.date}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── Order Summary + Billing ─────────────────────── */}
        <section style={{
          background: 'var(--warm-white)',
          padding: '56px 40px 64px',
        }}>
          <div className="renew-confirm-cards" style={{
            maxWidth: '1100px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '32px',
          }}>
            {/* Order summary */}
            <div style={{
              border: '1px solid var(--border-light)',
              borderRadius: '4px',
              padding: '32px',
              background: '#fff',
            }}>
              <h3 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '22px',
                fontWeight: 400,
                color: 'var(--forest-green)',
                marginBottom: '24px',
                paddingBottom: '16px',
                borderBottom: '1px solid var(--border-light)',
              }}>
                Order summary
              </h3>

              {(order?.items ?? []).length > 0
                ? order!.items.map(item => (
                  <div key={`${item.id}-${item.colour}`} style={{
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'center',
                    marginBottom: '20px',
                  }}>
                    <img src={item.image} alt={item.name} style={{
                      width: '72px',
                      height: '72px',
                      objectFit: 'cover',
                      borderRadius: '3px',
                      background: 'var(--cream)',
                      flexShrink: 0,
                    }} />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', color: 'var(--forest-green)', marginBottom: '4px' }}>
                        {item.name}
                      </p>
                      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'var(--text-muted)' }}>
                        {item.colour} · Qty {item.quantity}
                      </p>
                    </div>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', fontWeight: 600, color: 'var(--forest-green)' }}>
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))
                : (
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '20px' }}>
                    <img src="/noma-chair-main.png" alt="Noma Chair" style={{ width: '72px', height: '72px', objectFit: 'cover', borderRadius: '3px', flexShrink: 0 }} />
                    <div>
                      <p style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', color: 'var(--forest-green)', marginBottom: '4px' }}>Noma Chair</p>
                      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'var(--text-muted)' }}>Natural Linen · Qty 1</p>
                    </div>
                  </div>
                )
              }

              {/* Totals */}
              <div style={{ borderTop: '1px solid var(--border-light)', marginTop: '16px', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { label: 'Subtotal', value: formatPrice(subtotal) },
                  { label: 'Shipping', value: 'Free' },
                  { label: 'Total', value: formatPrice(total), bold: true },
                ].map(row => (
                  <div key={row.label} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontFamily: 'var(--font-sans)',
                    fontSize: row.bold ? '15px' : '13px',
                    fontWeight: row.bold ? 600 : 400,
                    color: row.bold ? 'var(--forest-green)' : 'var(--text-muted)',
                  }}>
                    <span>{row.label}</span>
                    <span>{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Billing */}
            <div style={{
              border: '1px solid var(--border-light)',
              borderRadius: '4px',
              padding: '32px',
              background: '#fff',
            }}>
              <h3 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '22px',
                fontWeight: 400,
                color: 'var(--forest-green)',
                marginBottom: '24px',
                paddingBottom: '16px',
                borderBottom: '1px solid var(--border-light)',
              }}>
                Delivery details
              </h3>
              {order ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontFamily: 'var(--font-sans)', fontSize: '14px' }}>
                  <p style={{ color: 'var(--text-dark)', fontWeight: 600, fontSize: '15px' }}>
                    {order.address.firstName} {order.address.lastName}
                  </p>
                  <p style={{ color: 'var(--text-muted)' }}>{order.address.street}</p>
                  <p style={{ color: 'var(--text-muted)' }}>{order.address.city} – {order.address.postal}</p>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>{order.address.country}</p>
                  <div style={{ height: '1px', background: 'var(--border-light)', marginBottom: '16px' }} />
                  <p style={{ color: 'var(--text-muted)' }}>
                    <span style={{ color: 'var(--text-dark)', fontWeight: 500 }}>Payment: </span>
                    {order.payment === 'upi' ? 'UPI' : order.payment === 'cod' ? 'Cash on Delivery' : 'Card'}
                  </p>
                  <p style={{ color: 'var(--text-muted)', marginTop: '4px' }}>
                    <span style={{ color: 'var(--text-dark)', fontWeight: 500 }}>Email: </span>
                    {order.email}
                  </p>
                </div>
              ) : (
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--text-muted)' }}>
                  Place an order to see delivery details here.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ── Continue Shopping CTA ───────────────────────── */}
        <section style={{
          background: 'var(--forest-green)',
          padding: '64px 40px',
          textAlign: 'center',
        }}>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '42px',
            fontWeight: 400,
            color: '#fff',
            marginBottom: '8px',
          }}>
            Still looking?
          </h2>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '14px',
            color: 'rgba(255,255,255,0.65)',
            marginBottom: '32px',
          }}>
            Explore our full collection of sustainable furniture.
          </p>
          <button
            className="btn-primary"
            onClick={() => navigate('/catalog')}
            id="confirm-continue-shopping-btn"
            style={{ padding: '16px 52px', fontSize: '12px' }}
          >
            Continue Shopping
          </button>
        </section>
      </main>

      <Footer />
    </>
  )
}
