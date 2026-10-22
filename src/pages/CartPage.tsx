import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useCart } from '../context/CartContext'
import { formatPrice, carbonFor } from '../data/products'

const SHIPPING = 0 // Free shipping
const ESTIMATED_TAX = 0 // Included in price

export default function CartPage() {
  const navigate = useNavigate()
  const { state, removeItem, updateQty, subtotal, totalItems } = useCart()

  const total = subtotal + SHIPPING
  const totalFootprint = state.items.reduce((sum, i) => sum + carbonFor(i.id).footprint * i.quantity, 0)
  const totalSaved = state.items.reduce((sum, i) => sum + carbonFor(i.id).saved * i.quantity, 0)

  return (
    <>
      <Header theme="dark" />

      <main className="cart-page">
        <div className="container">
          {/* Header row */}
          <div style={{ marginBottom: '8px' }}>
            <h1 className="cart-title">Your bag ({totalItems})</h1>
            <p className="cart-count">
              {totalItems === 0
                ? 'Your bag is empty'
                : `${totalItems} item${totalItems !== 1 ? 's' : ''} in your bag`}
            </p>
          </div>

          {state.items.length === 0 ? (
            /* Empty state */
            <div className="cart-empty">
              <div className="cart-empty__icon" aria-hidden="true">🛍</div>
              <h2 className="cart-empty__title">Your bag is empty</h2>
              <p className="cart-empty__body">
                You haven't added anything yet. Browse our collection of sustainable furniture.
              </p>
              <button
                className="btn-primary"
                onClick={() => navigate('/catalog')}
                id="cart-empty-shop-btn"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="cart-layout">
              {/* Left — Items */}
              <div>
                {/* Column headers */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '100px 1fr auto',
                  gap: '24px',
                  paddingBottom: '12px',
                  borderBottom: '1px solid var(--border)',
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                }}>
                  <span>Item</span>
                  <span />
                  <span style={{ textAlign: 'right' }}>Total</span>
                </div>

                <div className="cart-items" role="list">
                  {state.items.map((item) => (
                    <article
                      key={`${item.id}-${item.colour}`}
                      className="cart-item"
                      role="listitem"
                      aria-label={`${item.name}, ${item.colour}, quantity ${item.quantity}`}
                    >
                      {/* Image */}
                      <button
                        onClick={() => navigate(`/product/${item.id}`)}
                        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                        aria-label={`View ${item.name}`}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="cart-item__img"
                        />
                      </button>

                      {/* Info */}
                      <div className="cart-item__info">
                        <button
                          onClick={() => navigate(`/product/${item.id}`)}
                          style={{
                            background: 'none', border: 'none', padding: 0,
                            cursor: 'pointer', textAlign: 'left',
                          }}
                        >
                          <h3 className="cart-item__name">{item.name}</h3>
                        </button>
                        <p className="cart-item__variant">
                          Colour: {item.colour} · {formatPrice(item.price)} each
                        </p>
                        <p className="cart-item__carbon">
                          🌿 {carbonFor(item.id).footprint * item.quantity} kg CO₂e · saves{' '}
                          {carbonFor(item.id).saved * item.quantity} kg vs. conventional
                        </p>

                        {/* Qty controls */}
                        <div className="cart-item__qty" role="group" aria-label={`Quantity for ${item.name}`}>
                          <button
                            className="cart-item__qty-btn"
                            onClick={() => updateQty(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            aria-label="Decrease quantity"
                            id={`qty-dec-${item.id}`}
                          >
                            −
                          </button>
                          <span className="cart-item__qty-num" aria-live="polite">
                            {item.quantity}
                          </span>
                          <button
                            className="cart-item__qty-btn"
                            onClick={() => updateQty(item.id, item.quantity + 1)}
                            aria-label="Increase quantity"
                            id={`qty-inc-${item.id}`}
                          >
                            +
                          </button>
                        </div>

                        <button
                          className="cart-item__remove"
                          onClick={() => removeItem(item.id)}
                          aria-label={`Remove ${item.name} from cart`}
                          id={`remove-${item.id}`}
                        >
                          Remove
                        </button>
                      </div>

                      {/* Price */}
                      <div className="cart-item__right">
                        <p className="cart-item__price" aria-live="polite">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Continue shopping */}
                <div style={{ marginTop: '32px' }}>
                  <button
                    className="btn-secondary"
                    onClick={() => navigate('/catalog')}
                    id="cart-continue-shopping-btn"
                  >
                    ← Continue Shopping
                  </button>
                </div>
              </div>

              {/* Right — Summary */}
              <aside className="cart-summary" aria-label="Order summary">
                <h2 className="cart-summary__title">Order Summary</h2>

                <div className="cart-summary__rows">
                  <div className="cart-summary__row">
                    <span>Subtotal ({totalItems} item{totalItems !== 1 ? 's' : ''})</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="cart-summary__row">
                    <span>Shipping</span>
                    <span>{SHIPPING === 0 ? 'Free' : formatPrice(SHIPPING)}</span>
                  </div>
                  <div className="cart-summary__row">
                    <span>Estimated tax</span>
                    <span>Included</span>
                  </div>
                  <div className="cart-summary__row">
                    <span>Carbon footprint</span>
                    <span>{totalFootprint} kg CO₂e</span>
                  </div>
                  <div className="cart-summary__row">
                    <span>Carbon saved</span>
                    <span style={{ fontWeight: 600 }}>🌿 {totalSaved} kg CO₂e</span>
                  </div>
                  <div className="cart-summary__row cart-summary__row--total">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                <button
                  className="btn-dark"
                  style={{ width: '100%' }}
                  onClick={() => navigate('/checkout')}
                  id="cart-checkout-btn"
                >
                  Proceed to Checkout
                </button>

                <p className="cart-summary__note">
                  🌿 Your order ships carbon-neutral. Packaging is 100% compostable.
                </p>
              </aside>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  )
}
