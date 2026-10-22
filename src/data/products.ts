// Product data for the ReNew catalog
export interface Product {
  id: string
  name: string
  tagline: string
  price: number
  category: string
  tag?: string
  image: string
  description: string
}

// ── Luxury Unsplash images ───────────────────────────────────────────────────
// All images: high-quality, natural-material, warm-toned furniture photography
const IMG = {
  nomaChairMain : 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=85',
  nomaChairRoom : 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85',
  diningTable   : 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=900&q=85',
  bench         : 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=900&q=85',
  sideTable     : 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=85',
  arcShelf      : 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=900&q=85',
  loomSofa      : 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=900&q=85',
  heroRoom      : 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85',
}

export const PRODUCTS: Product[] = [
  {
    id: 'noma-chair',
    name: 'Noma Chair',
    tagline: 'Bamboo · Hemp · Natural Linen',
    price: 42000,
    category: 'Seating',
    tag: 'Best Seller',
    image: IMG.nomaChairMain,
    description: 'The Noma Chair is grown into shape, not carved from anything. 60% bamboo, 30% hemp, 10% plant-based resin — it returns to soil in 18 months.',
  },
  {
    id: 'vale-dining-table',
    name: 'Reclaimed Dining Table',
    tagline: 'Solid Reclaimed Teak · Natural',
    price: 89000,
    category: 'Tables',
    tag: 'New',
    image: IMG.diningTable,
    description: 'Crafted from responsibly reclaimed teak. Each table carries unique grain patterns — no two are alike. Built to last generations.',
  },
  {
    id: 'ren-bench',
    name: 'Study Table',
    tagline: 'Reclaimed Pine · Natural Oil Finish',
    price: 31000,
    category: 'Tables',
    image: IMG.bench,
    description: 'Simple, honest construction from reclaimed pine. The Study Table pairs perfectly with the Noma Chair for a complete workspace.',
  },
  {
    id: 'sol-side-table',
    name: 'Beco TV Unit',
    tagline: 'Bamboo · Matte Black',
    price: 54000,
    category: 'Storage',
    image: IMG.sideTable,
    description: 'The Beco TV Unit uses rapid-growth bamboo with a carbon-negative production process. Minimal lines, maximal durability.',
  },
  {
    id: 'arc-shelf',
    name: 'Upcycled Sideboard',
    tagline: 'Walnut · Hand-finished',
    price: 67000,
    category: 'Storage',
    tag: 'Eco Pick',
    image: IMG.arcShelf,
    description: 'Built from salvaged walnut panels, the Upcycled Sideboard is handcrafted in our Bangalore workshop. Zero synthetic finish.',
  },
  {
    id: 'loom-sofa',
    name: 'Loom Sofa',
    tagline: 'Organic Cotton · Oak Frame',
    price: 115000,
    category: 'Seating',
    image: IMG.loomSofa,
    description: 'The Loom Sofa is upholstered in GOTS-certified organic cotton on a solid FSC-oak frame. Deep comfort, zero compromise.',
  },
]

// Noma Chair specific detail-page data
export const NOMA_CHAIR = {
  id: 'noma-chair',
  name: 'Noma Chair',
  price: 42000,
  rating: 4.8,
  reviewCount: 124,
  tagline: 'Grown into shape, not carved from anything.',
  description: 'The Noma Chair is shaped from living bamboo, bound with hemp fibre and sealed with a plant-based resin. It holds its form for decades — and when you\'re done, it returns to the soil in 18 months, leaving nothing harmful behind.',
  materials: '60% Bamboo · 30% Hemp · 10% Plant-based resin',
  dimensions: 'W 62 × D 60 × H 82 cm · Seat H 45 cm',
  weight: '8.4 kg',
  origin: 'Handcrafted in Karnataka, India',
  colours: [
    { name: 'Natural Linen', hex: '#D4C8B0' },
    { name: 'Sage',          hex: '#8BA888' },
    { name: 'Forest',        hex: '#12352B' },
  ],
  sustainability: {
    text: 'Returns to soil in 18 months. Zero synthetic dyes. Zero VOC finishes. Carbon-neutral shipping. 100% compostable packaging.',
    pills: ['FSC Certified', 'GOTS Organic', 'Zero VOC', 'Compostable Packaging', 'Carbon Offset'],
  },
  images: [
    IMG.nomaChairMain,
    IMG.nomaChairRoom,
  ],
}

// Format price as Indian Rupees
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

// Carbon data, kg CO2e per unit. PLACEHOLDER VALUES: replace with your real figures.
// footprint = ReNew product; baseline = typical conventional equivalent.
export const CARBON: Record<string, { footprint: number; baseline: number }> = {
  'noma-chair':        { footprint: 9,   baseline: 32 },
  'vale-dining-table': { footprint: 85,  baseline: 210 },
  'ren-bench':         { footprint: 28,  baseline: 70 },
  'sol-side-table':    { footprint: 40,  baseline: 110 },
  'arc-shelf':         { footprint: 55,  baseline: 140 },
  'loom-sofa':         { footprint: 120, baseline: 310 },
}

export function carbonFor(id: string) {
  const c = CARBON[id] ?? { footprint: 0, baseline: 0 }
  return { footprint: c.footprint, saved: Math.max(c.baseline - c.footprint, 0) }
}
