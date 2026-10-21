import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/products'

interface ContactForm {
  email: string
}
interface AddressForm {
  firstName: string
  lastName: string
  street: string
  city: string
  postal: string
  country: string
}
interface FormErrors {
  email?: string
  firstName?: string
  lastName?: string
  street?: string
  city?: string
  postal?: string
}

const PAYMENT_METHODS = [
  { id: 'card', label: 'Card', sub: 'Visa, Mastercard, Rupay' },
  { id: 'upi', label: 'UPI', sub: 'GPay, PhonePe, Paytm' },
  { id: 'cod', label: 'Cash on Delivery', sub: 'Pay when your order arrives' },
]

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { state, subtotal, totalItems, clearCart } = useCart()

  const [contact, setContact] = useState<ContactForm>({ email: '' })
  const [address, setAddress] = useState<AddressForm>({
    firstName: '', lastName: '', street: '', city: '', postal: '', country: 'India',
  })
  const [payment, setPayment] = useState('card')
  const [errors, setErrors] = useState<FormErrors>({})
  const [placing, setPlacing] = useState(false)
  const [discountCode, setDiscountCode] = useState('')

  const total = subtotal // free shipping, tax included

  function validate(): boolean {
    const e: FormErrors = {}
    if (!contact.email.trim() || !/\S+@\S+\.\S+/.test(contact.email))
      e.email = 'Enter a valid email address'
    if (!address.firstName.trim()) e.firstName = 'Required'
    if (!address.lastName.trim()) e.lastName = 'Required'
    if (!address.street.trim()) e.street = 'Required'
    if (!address.city.trim()) e.city = 'Required'
    if (!address.postal.trim() || !/^\d{6}$/.test(address.postal.trim()))
      e.postal = 'Enter a valid 6-digit postal code'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handlePlaceOrder(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    if (state.items.length === 0) {
      navigate('/catalog')
      return
    }
    setPlacing(true)

    // Store order details for confirmation page
    const orderData = {
      orderId: `RN-${Date.now().toString().slice(-6)}`,
      items: state.items,
      subtotal,
      total,
      address: { ...address },
      email: contact.email,
      payment,
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
        day: 'numeric', month: 'short', year: 'numeric',
      }),
    }
    localStorage.setItem('renew_last_order', JSON.stringify(orderData))

    setTimeout(() => {
      clearCart()
      navigate('/confirmation')
    }, 1800)
  }

  if (state.items.length === 0 && !placing) {
    return (
      <>
        <Header theme="dark" />
        <main className="checkout-page">
          <div className="container" style={{ textAlign: 'center', paddingTop: '80px' }}>
            <h1 className="checkout-title" style={{ marginBottom: '16px' }}>Your cart is empty</h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '28px' }}>Add items to your cart before checking out.</p>
            <button className="btn-primary" onClick={() => navigate('/catalog')} id="checkout-empty-btn">
              Shop Now
            </button>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header theme="dark" />

      <main className="checkout-page">
        <div className="container">
          <form onSubmit={handlePlaceOrder} noValidate>
            <div className="checkout-layout">
              {/* ── Left — Form ───────────────────────────── */}
              <div>
                <h1 className="checkout-title">Checkout</h1>
                <p className="checkout-subtitle">Complete your order in just a few steps.</p>

                {/* 1. Contact */}
                <div className="checkout-section">
                  <h2 className="checkout-section-title">
                    <span className="checkout-section-num">1</span>
                    Contact information
                  </h2>
                  <div className="form-group">
                    <label className="form-label" htmlFor="checkout-email">Email address</label>
                    <input
                      id="checkout-email"
                      type="email"
                      className={`form-input${errors.email ? ' error' : ''}`}
                      placeholder="alex.morgan@example.com"
                      value={contact.email}
                      onChange={(e) => {
                        setContact({ email: e.target.value })
                        if (errors.email) setErrors((p) => ({ ...p, email: undefined }))
                      }}
                      autoComplete="email"
                    />
                    {errors.email && <span className="form-error">{errors.email}</span>}
                  </div>
                </div>

                {/* 2. Shipping */}
                <div className="checkout-section">
                  <h2 className="checkout-section-title">
                    <span className="checkout-section-num">2</span>
                    Shipping address
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label" htmlFor="checkout-firstname">First name</label>
                        <input
                          id="checkout-firstname"
                          type="text"
                          className={`form-input${errors.firstName ? ' error' : ''}`}
                          placeholder="Alex"
                          value={address.firstName}
                          onChange={(e) => {
                            setAddress((p) => ({ ...p, firstName: e.target.value }))
                            if (errors.firstName) setErrors((p) => ({ ...p, firstName: undefined }))
                          }}
                          autoComplete="given-name"
                        />
                        {errors.firstName && <span className="form-error">{errors.firstName}</span>}
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="checkout-lastname">Last name</label>
                        <input
                          id="checkout-lastname"
                          type="text"
                          className={`form-input${errors.lastName ? ' error' : ''}`}
                          placeholder="Morgan"
                          value={address.lastName}
                          onChange={(e) => {
                            setAddress((p) => ({ ...p, lastName: e.target.value }))
                            if (errors.lastName) setErrors((p) => ({ ...p, lastName: undefined }))
                          }}
                          autoComplete="family-name"
                        />
                        {errors.lastName && <span className="form-error">{errors.lastName}</span>}
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="checkout-street">Street address</label>
                      <input
                        id="checkout-street"
                        type="text"
                        className={`form-input${errors.street ? ' error' : ''}`}
                        placeholder="12 Marine Drive"
                        value={address.street}
                        onChange={(e) => {
                          setAddress((p) => ({ ...p, street: e.target.value }))
                          if (errors.street) setErrors((p) => ({ ...p, street: undefined }))
                        }}
                        autoComplete="street-address"
                      />
                      {errors.street && <span className="form-error">{errors.street}</span>}
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label" htmlFor="checkout-city">City</label>
                        <input
                          id="checkout-city"
                          type="text"
                          className={`form-input${errors.city ? ' error' : ''}`}
                          placeholder="Mumbai"
                          value={address.city}
                          onChange={(e) => {
                            setAddress((p) => ({ ...p, city: e.target.value }))
                            if (errors.city) setErrors((p) => ({ ...p, city: undefined }))
                          }}
                          autoComplete="address-level2"
                        />
                        {errors.city && <span className="form-error">{errors.city}</span>}
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="checkout-postal">Postal code</label>
                        <input
                          id="checkout-postal"
                          type="text"
                          className={`form-input${errors.postal ? ' error' : ''}`}
                          placeholder="400001"
                          value={address.postal}
                          maxLength={6}
                          onChange={(e) => {
                            setAddress((p) => ({ ...p, postal: e.target.value }))
                            if (errors.postal) setErrors((p) => ({ ...p, postal: undefined }))
                          }}
                          autoComplete="postal-code"
                        />
                        {errors.postal && <span className="form-error">{errors.postal}</span>}
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="checkout-country">Country / Region</label>
                      <select
                        id="checkout-country"
                        className="form-input"
                        value={address.country}
                        onChange={(e) => setAddress((p) => ({ ...p, country: e.target.value }))}
                        autoComplete="country-name"
                        style={{ cursor: 'pointer' }}
                      >
                        <option>India</option>
                        <option>United States</option>
                        <option>United Kingdom</option>
                        <option>Germany</option>
                        <option>Singapore</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* 3. Payment */}
                <div className="checkout-section">
                  <h2 className="checkout-section-title">
                    <span className="checkout-section-num">3</span>
                    Payment method
                  </h2>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
                    Choose how you would like to pay.
                  </p>
                  <div className="payment-opts" role="radiogroup" aria-label="Payment method">
                    {PAYMENT_METHODS.map((m) => (
                      <div
                        key={m.id}
                        className={`payment-opt${payment === m.id ? ' selected' : ''}`}
                        onClick={() => setPayment(m.id)}
                        role="radio"
                        aria-checked={payment === m.id}
                        tabIndex={0}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setPayment(m.id) }}
                        id={`payment-${m.id}`}
                      >
                        <div className="payment-opt__radio">
                          <div className="payment-opt__radio-dot" />
                        </div>
                        <div>
                          <p className="payment-opt__label">{m.label}</p>
                          <p className="payment-opt__sub">{m.sub}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Place Order */}
                <button
                  type="submit"
                  className="btn-dark"
                  style={{ width: '100%', padding: '18px', fontSize: '13px', letterSpacing: '0.12em', opacity: placing ? 0.7 : 1 }}
                  disabled={placing}
                  id="place-order-btn"
                >
                  {placing ? 'Placing your order…' : 'Place Order'}
                </button>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', textAlign: 'center', marginTop: '12px' }}>
                  Easy returns · Secure checkout · Carbon-neutral delivery
                </p>
              </div>

              {/* ── Right — Summary ───────────────────────── */}
              <aside className="checkout-summary" aria-label="Order summary">
                <div className="checkout-summary-title">
                  <span>Order summary</span>
                  <span style={{ fontSize: '14px', color: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}>
                    {totalItems} item{totalItems !== 1 ? 's' : ''}
                  </span>
                </div>

                {state.items.map((item) => (
                  <div key={`${item.id}-${item.colour}`} className="checkout-summary-item">
                    <div style={{ position: 'relative' }}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="checkout-summary-item__img"
                      />
                      <span style={{
                        position: 'absolute', top: '-8px', right: '-8px',
                        width: '20px', height: '20px',
                        background: 'var(--text-dark)', color: '#fff',
                        borderRadius: '50%', fontSize: '11px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 600,
                      }}>{item.quantity}</span>
                    </div>
                    <div className="checkout-summary-item__info">
                      <p className="checkout-summary-item__name">{item.name}</p>
                      <p className="checkout-summary-item__meta">
                        Colour: {item.colour}<br />Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="checkout-summary-item__price">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}

                {/* Discount */}
                <div className="discount-row">
                  <input
                    type="text"
                    className="discount-input"
                    placeholder="Enter code"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    aria-label="Discount code"
                    id="discount-code-input"
                  />
                  <button
                    type="button"
                    className="discount-apply"
                    onClick={() => alert('Demo: No discount codes active')}
                    id="discount-apply-btn"
                  >
                    Apply
                  </button>
                </div>

                {/* Totals */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--text-muted)' }}>
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--text-muted)' }}>
                    <span>Shipping</span>
                    <span>Calculated at next step</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--text-muted)' }}>
                    <span>Estimate tax</span>
                    <span>Included</span>
                  </div>
                  <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    fontSize: '18px', fontWeight: 600,
                    color: 'var(--text-dark)',
                    paddingTop: '14px', borderTop: '1px solid var(--border)',
                  }}>
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                <p style={{
                  fontSize: '12px', color: 'var(--text-muted)',
                  padding: '12px', background: 'rgba(18,53,43,0.06)',
                  borderRadius: '2px', lineHeight: 1.5,
                }}>
                  🌿 Carbon-neutral shipping · Compostable materials
                </p>
              </aside>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </>
  )
}
