import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import { PRODUCTS } from '../data/products'

const FEATURED = PRODUCTS.slice(0, 3)

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <>
      <Header theme="dark" />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="hero" aria-label="Hero banner">
        <img
          src="/hero-room.png"
          alt="Sustainable luxury furniture — forest view living room"
          className="hero__bg"
        />
        <div className="hero__overlay" aria-hidden="true" />
        <div className="hero__content">
          <p className="hero__eyebrow">Furniture with a last chapter</p>
          <h1 className="hero__title">
            Made to<br /><em>return.</em>
          </h1>
          <p className="hero__body">
            Chairs, lamps and tables grown from mycelium, bamboo and jute. Made to last for decades, and made to leave nothing harmful behind.
          </p>
          <div className="hero__actions">
            <button
              className="btn-primary"
              onClick={() => navigate('/catalog')}
              id="hero-shop-btn"
            >
              Enter the Collection
            </button>
          </div>
        </div>
      </section>

      {/* ── Sustainability Strip ─────────────────────────── */}
      <div className="sustainability-strip">
        <div className="container">
          <div className="sustainability-strip__inner">
            {[
              'FSC Certified Wood',
              'Zero VOC Finishes',
              'Carbon Neutral Shipping',
              '100% Compostable Packaging',
              'Made in India',
            ].map((item) => (
              <span key={item} className="sustainability-strip__item">
                <span className="sustainability-strip__dot" aria-hidden="true" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Brand Story ─────────────────────────────────── */}
      <section className="section" aria-labelledby="brand-story-heading">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            <div>
              <p className="section-label">Our Philosophy</p>
              <h2 id="brand-story-heading" className="section-title" style={{ marginBottom: '24px' }}>
                House more.<br />Waste less,<br />live better
              </h2>
              <div className="divider" />
              <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '20px' }}>
                At ReNew, every piece is designed to do more than furnish a room. Each chair, table and shelf is a commitment — to forests that breathe, artisans who thrive and homes that endure.
              </p>
              <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '36px' }}>
                We source only FSC-certified and reclaimed materials, finish with zero-VOC oils and beeswax, and ship in packaging you can put in your compost bin.
              </p>
              <button className="btn-secondary" onClick={() => navigate('/catalog')} id="brand-story-cta">
                Explore Products
              </button>
            </div>
            <div style={{ position: 'relative' }}>
              <img
                src="/noma-chair-room.png"
                alt="Noma chair in a beautiful room"
                style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', borderRadius: '2px' }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '24px',
                  left: '-24px',
                  background: 'var(--forest-green)',
                  color: '#fff',
                  padding: '20px 24px',
                  borderRadius: '2px',
                  maxWidth: '200px',
                }}
              >
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', lineHeight: '1' }}>12+</p>
                <p style={{ fontSize: '12px', opacity: 0.7, marginTop: '4px', letterSpacing: '0.08em' }}>Years of sustainable craft</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ────────────────────────────────────── */}
      <section aria-labelledby="features-heading">
        <h2 id="features-heading" className="sr-only">Why ReNew</h2>
        <div className="features-grid">
          {[
            {
              icon: '🌱',
              title: 'Living Materials',
              body: 'Every piece is made from certified sustainable or reclaimed wood — sourced from forests that are managed for the long term.',
            },
            {
              icon: '🤝',
              title: 'Fair Craft',
              body: 'Our workshops in Karnataka and Rajasthan pay living wages and provide full benefits to the artisans whose hands shape each piece.',
            },
            {
              icon: '♻️',
              title: 'End-of-Life Plan',
              body: 'When your furniture reaches the end of its life, ReNew will collect, repair or compost it — at no extra charge.',
            },
          ].map((f) => (
            <div key={f.title} className="feature-card">
              <div className="feature-card__icon" aria-hidden="true">{f.icon}</div>
              <h3 className="feature-card__title">{f.title}</h3>
              <p className="feature-card__body">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured Products ────────────────────────────── */}
      <section className="section" aria-labelledby="featured-heading">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '48px' }}>
            <div>
              <p className="section-label">Featured</p>
              <h2 id="featured-heading" className="section-title">Featured products</h2>
            </div>
            <button className="btn-secondary" onClick={() => navigate('/catalog')} id="featured-view-all-btn">
              View all
            </button>
          </div>

          <div className="products-grid">
            {FEATURED.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ──────────────────────────────────── */}
      <section
        style={{
          background: 'var(--forest-green)',
          padding: '80px 0',
          textAlign: 'center',
        }}
        aria-label="Call to action"
      >
        <div className="container">
          <p className="section-label" style={{ color: 'rgba(255,255,255,0.5)' }}>A plant-based promise</p>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(36px, 5vw, 60px)',
              color: '#fff',
              fontWeight: 300,
              marginBottom: '20px',
              lineHeight: 1.1,
            }}
          >
            A pledge chair can outlive three generations.<br />
            <em style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.85em' }}>Is yours ready?</em>
          </h2>
          <div className="divider divider--center" style={{ background: 'var(--terracotta)' }} />
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.55)', maxWidth: '440px', margin: '0 auto 36px', lineHeight: 1.7 }}>
            Every ReNew chair is guaranteed for 50 years. If it breaks, we fix it. If it wears out, we compost it.
          </p>
          <button className="btn-primary" onClick={() => navigate('/product/noma-chair')} id="cta-noma-btn">
            Shop the Noma Chair
          </button>
        </div>
      </section>

      {/* ── Related Products ─────────────────────────────── */}
      <section className="section" aria-labelledby="related-heading">
        <div className="container">
          <div style={{ marginBottom: '40px' }}>
            <p className="section-label">Explore more</p>
            <h2 id="related-heading" className="section-title">Related products</h2>
          </div>
          <div className="products-grid--4" style={{ display: 'grid' }}>
            {PRODUCTS.slice(1, 5).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
