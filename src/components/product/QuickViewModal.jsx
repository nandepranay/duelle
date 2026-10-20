import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../data/products';
import { X, Star, ShoppingBag, ArrowRight, ShieldCheck, Check } from 'lucide-react';

export const QuickViewModal = () => {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    addToCart, 
    navigateTo 
  } = useCart();
  
  const [qty, setQty] = useState(1);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;

  const handleAdd = () => {
    addToCart(product, qty);
    setQuickViewProduct(null);
  };

  const handleViewFull = () => {
    navigateTo('product', { productId: product.id });
    setQuickViewProduct(null);
  };

  return (
    <div className="modal-overlay" onClick={() => setQuickViewProduct(null)}>
      <div className="quickview-card" onClick={(e) => e.stopPropagation()}>
        <button 
          className="quickview-close" 
          onClick={() => setQuickViewProduct(null)}
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Gallery / Image */}
        <div className="quickview-gallery">
          <img src={product.image} alt={product.name} />
          {product.badge && (
            <div style={{ position: 'absolute', top: 16, left: 16 }}>
              <span className="badge-pill badge-dark">{product.badge}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="quickview-content">
          <div className="eyebrow">{product.category} • {product.size}</div>
          
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '0.4rem', lineHeight: 1.2 }}>
            {product.name}
          </h2>

          <div style={{ fontSize: '0.86rem', color: 'var(--color-text-secondary)', marginBottom: '0.85rem' }}>
            {product.subtitle}
          </div>

          {/* Genuine Rating */}
          <div className="product-rating" style={{ marginBottom: '1rem' }}>
            <div className="stars-wrap">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "#B88939" : "none"} stroke="#B88939" />
              ))}
            </div>
            <span className="rating-text">{product.rating} ({product.reviewCount} customer reviews)</span>
          </div>

          {/* Price */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <span style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span style={{ fontSize: '1rem', color: 'var(--color-text-muted)', textDecoration: 'line-through' }}>
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Short Description */}
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            {product.description}
          </p>

          {/* Features pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.75rem' }}>
            {product.features?.map((feat, idx) => (
              <span key={idx} style={{ fontSize: '0.72rem', background: '#F8F1EB', color: '#584A46', padding: '0.25rem 0.65rem', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Check size={11} color="#B8735C" /> {feat}
              </span>
            ))}
          </div>

          {/* Quantity & CTA */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div className="qty-stepper">
              <button className="qty-btn" onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
              <span className="qty-number">{qty}</span>
              <button className="qty-btn" onClick={() => setQty(qty + 1)}>+</button>
            </div>

            <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleAdd}>
              <ShoppingBag size={15} /> Add To Bag • {formatPrice(product.price * qty)}
            </button>
          </div>

          <button 
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: '#B8735C', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}
            onClick={handleViewFull}
          >
            View Full Ingredients & Ritual Details <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
