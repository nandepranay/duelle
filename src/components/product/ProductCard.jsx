import React from 'react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../data/products';
import { Star, Eye, Plus, ShoppingBag } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const { navigateTo, addToCart, setQuickViewProduct } = useCart();

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <div className="product-card">
      {/* Product Image Media Box */}
      <div 
        className="product-card-media"
        onClick={() => navigateTo('product', { productId: product.id })}
      >
        {/* Badge Tag */}
        {product.badge && (
          <div className="product-badge-tag">
            <span className={`badge-pill ${product.isBestseller ? 'badge-dark' : 'badge-blush'}`}>
              {product.badge}
            </span>
          </div>
        )}

        {/* Primary and Hover Secondary Images */}
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-primary-img" 
          loading="lazy" 
        />
        <img 
          src={product.secondaryImage || product.image} 
          alt={`${product.name} texture`} 
          className="product-secondary-img" 
          loading="lazy" 
        />

        {/* Quick Actions Hover Bar */}
        <div 
          className="product-actions-bar" 
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            className="quick-view-btn"
            onClick={() => setQuickViewProduct(product)}
            title="Quick View"
          >
            <Eye size={13} /> Quick View
          </button>
          
          <button 
            className="quick-add-btn"
            onClick={() => addToCart(product, 1)}
            title="Add to Bag"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Meta Information */}
      <div className="product-meta">
        <span className="product-category-label">{product.category}</span>
        
        <h3 
          className="product-name-link"
          onClick={() => navigateTo('product', { productId: product.id })}
          role="button"
          tabIndex={0}
        >
          {product.name}
        </h3>

        <p className="product-subtitle">{product.subtitle}</p>

        {/* Genuine Ratings */}
        {product.rating && (
          <div className="product-rating">
            <div className="stars-wrap">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={12} 
                  fill={i < Math.floor(product.rating) ? "#B88939" : "none"} 
                  stroke="#B88939" 
                />
              ))}
            </div>
            <span className="rating-text">
              {product.rating} ({product.reviewCount})
            </span>
          </div>
        )}

        {/* Price Row */}
        <div className="product-price-row">
          <span className="product-price">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="product-original-price">{formatPrice(product.originalPrice)}</span>
          )}
          {discountPercent > 0 && (
            <span style={{ fontSize: '0.68rem', color: '#B8735C', fontWeight: 600 }}>
              Save {discountPercent}%
            </span>
          )}
        </div>

        {/* Mobile-friendly Add To Bag button */}
        <button 
          className="btn btn-secondary btn-sm"
          style={{ marginTop: '0.75rem', width: '100%', padding: '0.55rem' }}
          onClick={() => addToCart(product, 1)}
        >
          <ShoppingBag size={13} /> Add to Bag
        </button>
      </div>
    </div>
  );
};
