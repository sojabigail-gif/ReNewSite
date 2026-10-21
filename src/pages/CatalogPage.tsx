import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { PRODUCTS, formatPrice } from '../data/products'

const CATEGORIES = ['All', 'Seating', 'Tables', 'Storage']
const MATERIALS  = ['Reclaimed wood', 'Bamboo', 'Jute', 'Organic cotton']

export default function CatalogPage() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('All')
  const [sort, setSort] = useState('featured')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const filtered = useMemo(() => {
    let list = activeCategory === 'All'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory)
    if (sort === 'price-asc')  list = [...list].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)
    if (sort === 'name')       list = [...list].sort((a, b) => a.name.localeCompare(b.name))
    return list
  }, [activeCategory, sort])

  return (
    <>
      <Header theme="dark" />

      <div style={{ paddingTop: '64px', minHeight: '100vh', background: 'var(--ivory)' }}>

        {/* ── Full-width dark-green hero bar ─────────── */}
        <div style={{
          background: 'var(--forest-green)',
          color: '#fff',
          padding: '48px 40px 40px',
        }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginBottom: '16px' }}>
              Sustainable · Biodegradable · Made to last
            </p>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px,5vw,56px)', fontWeight: 400, lineHeight: 1.1, marginBottom: '14px' }}>
              Reuse more. Waste less.<br />Live better
            </h1>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'rgba(255,255,255,0.7)', maxWidth: '480px', lineHeight: 1.6 }}>
              Discover stylish furniture made from reclaimed wood, reused tyres and recycled materials.
            </p>
          </div>
        </div>

        {/* ── Layout: Sidebar + Grid ──────────────────── */}
        <div className="renew-catalog-layout" style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', gap: '0', minHeight: '80vh' }}>

          {/* Sidebar */}
          <aside className="renew-catalog-sidebar" style={{
            width: '220px',
            flexShrink: 0,
            background: 'var(--deep-green)',
            color: '#fff',
            padding: '32px 24px',
            minHeight: '100%',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 600, letterSpacing: '0.06em', color: '#fff' }}>
                Filters
              </span>
              <button
                onClick={() => setActiveCategory('All')}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'rgba(255,255,255,0.55)', textDecoration: 'underline' }}
              >
                Clear all
              </button>
            </div>

            {/* Category */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', cursor: 'pointer' }} onClick={() => setSidebarOpen(!sidebarOpen)}>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>Category</span>
                <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px' }}>–</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {CATEGORIES.filter(c => c !== 'All').map((cat) => {
                  const count = PRODUCTS.filter(p => p.category === cat).length
                  return (
                    <label key={cat} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: '13px', color: activeCategory === cat ? '#fff' : 'rgba(255,255,255,0.72)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <input
                          type="checkbox"
                          checked={activeCategory === cat}
                          onChange={() => setActiveCategory(activeCategory === cat ? 'All' : cat)}
                          style={{ accentColor: 'var(--terracotta)', width: '14px', height: '14px', cursor: 'pointer' }}
                        />
                        {cat}
                      </div>
                      <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>{count}</span>
                    </label>
                  )
                })}
              </div>
            </div>

            {/* Material */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{ marginBottom: '14px' }}>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>Material</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {MATERIALS.map((mat) => (
                  <label key={mat} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'rgba(255,255,255,0.72)' }}>
                    <input type="checkbox" style={{ accentColor: 'var(--terracotta)', width: '14px', height: '14px', cursor: 'pointer' }} />
                    {mat}
                  </label>
                ))}
              </div>
            </div>

            {/* Price range */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{ marginBottom: '14px' }}>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>Price</span>
              </div>
              <input
                type="range"
                min={10000}
                max={200000}
                defaultValue={200000}
                style={{ width: '100%', accentColor: 'var(--terracotta)' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-sans)', fontSize: '11px', color: 'rgba(255,255,255,0.55)', marginTop: '6px' }}>
                <span>₹10,000</span><span>₹2,00,000</span>
              </div>
            </div>

            {/* Room */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>Room</span>
                <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '16px' }}>+</span>
              </div>
            </div>

            {/* Finish */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>Finish</span>
                <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '16px' }}>+</span>
              </div>
            </div>
          </aside>

          {/* Main grid area */}
          <div className="renew-catalog-grid" style={{ flex: 1, padding: '28px 32px 48px' }}>
            {/* Toolbar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'var(--text-muted)' }}>
                {filtered.length} piece{filtered.length !== 1 ? 's' : ''} · Sort:
              </p>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13px',
                  color: 'var(--text-dark)',
                  background: 'transparent',
                  border: '1px solid var(--border)',
                  borderRadius: '2px',
                  padding: '6px 10px',
                  cursor: 'pointer',
                }}
                id="catalog-sort-select"
                aria-label="Sort products"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Name</option>
              </select>
            </div>

            {/* Product Grid */}
            <div className="renew-catalog-grid-inner" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '20px',
            }}>
              {filtered.map((product) => (
                <article
                  key={product.id}
                  style={{
                    background: '#fff',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    border: '1px solid var(--border-light)',
                    transition: 'box-shadow 0.2s, transform 0.2s',
                    cursor: 'pointer',
                  }}
                  onClick={() => navigate(`/product/${product.id}`)}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px rgba(0,0,0,0.10)'
                    ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none'
                    ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                  }}
                >
                  {/* Image */}
                  <div style={{ position: 'relative', height: '200px', background: 'var(--cream)', overflow: 'hidden' }}>
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)' }}
                    />
                    {product.tag && (
                      <span style={{
                        position: 'absolute', top: '12px', left: '12px',
                        background: 'var(--terracotta)', color: '#fff',
                        fontFamily: 'var(--font-sans)', fontSize: '10px',
                        fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
                        padding: '3px 8px', borderRadius: '2px',
                      }}>{product.tag}</span>
                    )}
                  </div>

                  {/* Info */}
                  <div style={{ padding: '16px 18px 18px' }}>
                    <p style={{ fontFamily: 'var(--font-serif)', fontSize: '17px', color: 'var(--forest-green)', marginBottom: '4px' }}>
                      {product.name}
                    </p>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '14px' }}>
                      {product.tagline}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 600, color: 'var(--forest-green)' }}>
                        {formatPrice(product.price)}
                      </span>
                      <button
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '11px',
                          fontWeight: 500,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          color: '#fff',
                          background: 'var(--forest-green)',
                          border: 'none',
                          borderRadius: '2px',
                          padding: '8px 14px',
                          cursor: 'pointer',
                          transition: 'background 0.2s',
                        }}
                        id={`view-${product.id}`}
                        onClick={(e) => { e.stopPropagation(); navigate(`/product/${product.id}`) }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--terracotta)' }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--forest-green)' }}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
