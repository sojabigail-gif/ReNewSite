import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useCart } from '../context/CartContext'
import { PRODUCTS, NOMA_CHAIR, formatPrice } from '../data/products'

/* ── Accordion helper ─────────────────────────────────────── */
function Accordion({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderTop: '1px solid var(--border-light)' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', padding: '18px 0',
          background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: 'var(--font-sans)', fontSize: '13px',
          color: 'var(--text-dark)', textAlign: 'left',
        }}
        aria-expanded={open}
      >
        {label}
        <span style={{ fontSize: '20px', fontWeight: 300, color: 'var(--text-muted)', lineHeight: 1 }}>
          {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <div style={{ paddingBottom: '18px', fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.7 }}>
          {children}
        </div>
      )}
    </div>
  )
}

/* ── Main component ───────────────────────────────────────── */
export default function ProductDetailPage() {
  const navigate = useNavigate()
  const { productId } = useParams<{ productId: string }>()
  const { addItem } = useCart()

  const catalogProduct = PRODUCTS.find((p) => p.id === productId)
  const isNoma = !productId || productId === 'noma-chair'

  const displayName   = isNoma ? NOMA_CHAIR.name  : catalogProduct?.name  ?? NOMA_CHAIR.name
  const displayPrice  = isNoma ? NOMA_CHAIR.price : catalogProduct?.price ?? NOMA_CHAIR.price
  const displayImage  = isNoma ? NOMA_CHAIR.images[0] : (catalogProduct?.image ?? NOMA_CHAIR.images[0])
  const displayDesc   = isNoma ? NOMA_CHAIR.description : (catalogProduct?.description ?? NOMA_CHAIR.description)
  const displayCat    = catalogProduct?.category ?? 'Seating'

  const COLOURS = NOMA_CHAIR.colours

  const [selectedColour, setSelectedColour] = useState(COLOURS[0].name)
  const [added, setAdded] = useState(false)

  function handleAddToBag() {
    addItem({
      id: productId ?? NOMA_CHAIR.id,
      name: displayName,
      price: displayPrice,
      quantity: 1,
      colour: selectedColour,
      image: displayImage,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }

  return (
    <>
      <Header theme="dark" />

      <main style={{ paddingTop: '64px', background: 'var(--warm-white)' }}>

        {/* ── Product two-col ──────────────────────────────── */}
        <section className="renew-product-layout" style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 32px', display: 'flex', gap: '56px', alignItems: 'flex-start' }}>

          {/* LEFT: Swatches + Main Image */}
          <div className="renew-product-image-col" style={{ flex: '0 0 auto', width: '52%', display: 'flex', gap: '16px' }}>
            {/* Colour swatches (vertical strip) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '4px' }}>
              {COLOURS.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColour(c.name)}
                  aria-label={c.name}
                  aria-pressed={selectedColour === c.name}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '3px',
                    background: c.hex,
                    border: selectedColour === c.name
                      ? '2px solid var(--forest-green)'
                      : '2px solid transparent',
                    outline: selectedColour === c.name ? '1px solid var(--forest-green)' : 'none',
                    outlineOffset: '2px',
                    cursor: 'pointer',
                    transition: 'outline 0.15s',
                  }}
                />
              ))}
            </div>

            {/* Main image */}
            <div style={{ flex: 1, borderRadius: '4px', overflow: 'hidden', background: 'var(--cream)', aspectRatio: '4/3' }}>
              <img
                src={displayImage}
                alt={`${displayName} — ${selectedColour}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>

          {/* RIGHT: Product info */}
          <div className="renew-product-info-col" style={{ flex: 1, minWidth: 0 }}>

            {/* Breadcrumb */}
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '18px' }}>
              <button onClick={() => navigate('/catalog')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 0 }}>
                Collection
              </button>
              {' / '}
              {displayCat}
            </p>

            {/* Name */}
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '48px', fontWeight: 400, color: 'var(--forest-green)', lineHeight: 1.05, marginBottom: '16px' }}>
              {displayName}
            </h1>

            {/* Price + stock */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '28px' }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '22px', fontWeight: 600, color: 'var(--forest-green)' }}>
                {formatPrice(displayPrice)}
              </span>
              {isNoma && (
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'var(--terracotta)' }}>
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--terracotta)', display: 'inline-block' }} />
                  4 left in this batch
                </span>
              )}
            </div>

            {/* ── MADE FROM bar ── */}
            {isNoma && (
              <>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '10px' }}>
                  Made from
                </p>
                {/* Segmented bar */}
                <div style={{ display: 'flex', height: '6px', borderRadius: '3px', overflow: 'hidden', marginBottom: '10px' }}>
                  <div style={{ flex: 60, background: 'var(--forest-green)' }} />
                  <div style={{ flex: 30, background: 'var(--sage-light)' }} />
                  <div style={{ flex: 10, background: 'var(--terracotta)' }} />
                </div>
                <div style={{ display: 'flex', gap: '0', marginBottom: '28px' }}>
                  {[['60%', 'bamboo'], ['30%', 'hemp'], ['10%', 'plant-based resin']].map(([pct, label]) => (
                    <div key={label} style={{ flex: 1, fontFamily: 'var(--font-sans)' }}>
                      <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--forest-green)' }}>{pct}</p>
                      <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{label}</p>
                    </div>
                  ))}
                </div>

                {/* Returns to soil */}
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '10px' }}>
                  Returns to soil in 18 months
                </p>
                <div style={{ position: 'relative', marginBottom: '28px' }}>
                  {/* Track */}
                  <div style={{ height: '4px', background: 'var(--border)', borderRadius: '2px', position: 'relative' }}>
                    <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: '100%', background: `linear-gradient(to right, var(--forest-green) 0%, var(--forest-green) 50%, var(--terracotta) 100%)`, borderRadius: '2px' }} />
                    {/* Dots */}
                    {[0, 50, 100].map((pct) => (
                      <div key={pct} style={{
                        position: 'absolute', top: '50%', left: `${pct}%`,
                        transform: 'translate(-50%, -50%)',
                        width: '10px', height: '10px', borderRadius: '50%',
                        background: pct === 100 ? 'var(--terracotta)' : pct === 50 ? 'var(--sage-light)' : 'var(--forest-green)',
                        border: '2px solid #fff',
                        zIndex: 1,
                      }} />
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontFamily: 'var(--font-sans)', fontSize: '11px', color: 'var(--text-muted)' }}>
                    <span>Day 0</span>
                    <span>9 months</span>
                    <span style={{ color: 'var(--terracotta)', fontWeight: 500 }}>18 months</span>
                  </div>
                </div>
              </>
            )}

            {/* Description (non-Noma) */}
            {!isNoma && (
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '28px' }}>
                {displayDesc}
              </p>
            )}

            {/* Accordions */}
            <div style={{ borderBottom: '1px solid var(--border-light)', marginBottom: '28px' }}>
              <Accordion label="Material transparency">
                {isNoma
                  ? 'The Noma Chair uses FSC-certified bamboo grown in Karnataka, hemp fibre from certified farms, and a 100% plant-derived resin binder. Zero synthetic dyes. Zero formaldehyde.'
                  : `${displayName} uses sustainably sourced materials with zero synthetic coatings.`
                }
              </Accordion>
              <Accordion label="Care and end-of-life">
                Wipe with a damp cloth. Avoid direct sunlight for extended periods. At end of life, compost the entire piece — no disassembly needed. Returns to soil in 18 months.
              </Accordion>
            </div>

            {/* Colour selector */}
            <div style={{ marginBottom: '24px' }}>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '10px' }}>
                Colour — <strong style={{ color: 'var(--text-dark)' }}>{selectedColour}</strong>
              </p>
              <div style={{ display: 'flex', gap: '8px' }}>
                {COLOURS.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColour(c.name)}
                    aria-label={c.name}
                    aria-pressed={selectedColour === c.name}
                    style={{
                      width: '28px', height: '28px', borderRadius: '50%',
                      background: c.hex, border: 'none', cursor: 'pointer',
                      outline: selectedColour === c.name ? `2px solid var(--forest-green)` : '2px solid transparent',
                      outlineOffset: '2px',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* CTAs: Save + ADD TO BAG */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                id="product-save-btn"
                style={{
                  flex: '0 0 auto',
                  padding: '16px 32px',
                  background: '#fff',
                  border: '1px solid var(--border)',
                  borderRadius: '2px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '12px',
                  fontWeight: 500,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'var(--text-dark)',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--forest-green)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)' }}
              >
                Save
              </button>
              <button
                id="product-add-to-bag-btn"
                onClick={handleAddToBag}
                style={{
                  flex: 1,
                  padding: '16px 0',
                  background: added ? 'var(--forest-green)' : 'var(--terracotta)',
                  border: 'none',
                  borderRadius: '2px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#fff',
                  cursor: 'pointer',
                  transition: 'background 0.25s',
                }}
              >
                {added ? '✓ Added to Bag' : 'Add to Bag'}
              </button>
            </div>

            {/* Cart link */}
            {added && (
              <button
                onClick={() => navigate('/cart')}
                style={{
                  marginTop: '12px', width: '100%',
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontFamily: 'var(--font-sans)', fontSize: '13px',
                  color: 'var(--forest-green)', textDecoration: 'underline',
                  textUnderlineOffset: '3px',
                }}
              >
                View Cart →
              </button>
            )}
          </div>
        </section>

        {/* ── Material Story ───────────────────────────────── */}
        {isNoma && (
          <section style={{ background: 'var(--cream)', padding: '56px 32px' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '12px' }}>
                The Material Index
              </p>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '36px', fontWeight: 400, color: 'var(--forest-green)', marginBottom: '40px' }}>
                Material Story
              </h2>

              {/* Material cards row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '48px' }}>
                {[
                  { icon: '🪵', label: 'Bamboo', sub: 'Renewable · Fast-growing · Durable' },
                  { icon: '🌿', label: 'Natural Fibre', sub: 'Plant-based · Low-impact · Biodegradable' },
                  { icon: '💧', label: 'Finish', sub: 'Water-based · Low VOC' },
                ].map(m => (
                  <div key={m.label} style={{ padding: '24px', background: '#fff', borderRadius: '4px', border: '1px solid var(--border-light)' }}>
                    <div style={{ fontSize: '28px', marginBottom: '12px' }}>{m.icon}</div>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '6px' }}>
                      {m.label}
                    </p>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'var(--text-muted)' }}>
                      {m.sub}
                    </p>
                  </div>
                ))}
              </div>

              {/* Specs + Ergonomics */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                {/* Specs */}
                <div>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '16px' }}>
                    Product Specifications
                  </p>
                  {[
                    ['Dimensions', 'W 68 cm × D 75 cm × H 76 cm'],
                    ['Weight', '12 kg'],
                    ['Material', 'Bamboo composite + natural fibre'],
                    ['Finish', 'Water-based, low VOC'],
                  ].map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', gap: '16px', paddingBottom: '12px', marginBottom: '12px', borderBottom: '1px solid var(--border-light)' }}>
                      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'var(--text-muted)', width: '90px', flexShrink: 0 }}>{k}:</span>
                      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'var(--text-dark)' }}>{v}</span>
                    </div>
                  ))}
                </div>

                {/* Ergonomics */}
                <div>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '16px' }}>
                    Ergonomics
                  </p>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                    Designed for relaxed, everyday comfort. The gently sloped backrest and wide seat provide natural support, while the lightweight frame makes it easy to move and style in any space.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  )
}
