import { useNavigate } from 'react-router-dom'
import type { Product } from '../data/products'
import { formatPrice } from '../data/products'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate()

  return (
    <article
      className="product-card"
      onClick={() => navigate(`/product/${product.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') navigate(`/product/${product.id}`) }}
      aria-label={`View ${product.name}`}
    >
      <div className="product-card__image-wrap">
        <img
          src={product.image}
          alt={product.name}
          className="product-card__image"
          loading="lazy"
        />
        {product.tag && (
          <span className="product-card__tag">{product.tag}</span>
        )}
      </div>

      <p className="product-card__desc">{product.tagline}</p>
      <h3 className="product-card__name">{product.name}</h3>

      <div className="product-card__footer">
        <span className="product-card__price">
          {formatPrice(product.price)}
        </span>
        <span className="product-card__cta">
          View →
        </span>
      </div>
    </article>
  )
}
