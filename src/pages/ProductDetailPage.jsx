import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS, formatPrice } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';
import { 
  Star, 
  ShoppingBag, 
  ShieldCheck, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Truck, 
  Sparkles, 
  RotateCcw,
  Heart,
  Share2
} from 'lucide-react';

export const ProductDetailPage = () => {
  const { selectedProductId, addToCart, navigateTo, showToast } = useCart();
  
  // Find current product or default to first
  const product = PRODUCTS.find(p => p.id === selectedProductId) || PRODUCTS[0];
  
  // Gallery state: active image
  const [activeImage, setActiveImage] = useState(product.image);
  const [qty, setQty] = useState(1);
  
  // Accordion state
  const [openSection, setOpenSection] = useState('ingredients'); // 'ingredients', 'directions', 'shipping'

  // Related products from same category or bestsellers
  const related = PRODUCTS.filter(p => p.id !== product.id).slice(0, 4);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard', 'info');
    } else {
      showToast('Sharing DUELLE ritual formulation', 'info');
    }
  };

  return (
    <div className="fade-in" style={{ paddingBottom: '6rem' }}>
      
      {/* Breadcrumb strip */}
      <div style={{ backgroundColor: '#F9F5F0', padding: '0.85rem 0', borderBottom: '1px solid var(--color-border-light)' }}>
        <div className="container" style={{ fontSize: '0.76rem', color: 'var(--color-text-muted)' }}>
          <span 
            onClick={() => navigateTo('home')} 
            style={{ cursor: 'pointer', transition: 'color 0.2s' }}
          >
            Home
          </span>
          <span style={{ margin: '0 8px' }}>/</span>
          <span 
            onClick={() => navigateTo('shop', { category: product.categorySlug })} 
            style={{ cursor: 'pointer' }}
          >
            {product.category}
          </span>
          <span style={{ margin: '0 8px' }}>/</span>
          <span style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>
            {product.name}
          </span>
        </div>
      </div>

      {/* Main PDP Grid */}
      <div className="container">
        <div className="pdp-grid">
          
          {/* Left Column: Image Gallery */}
          <div className="pdp-gallery-column">
            
            {/* Thumbnails */}
            <div className="pdp-thumbnails">
              <button 
                className={`pdp-thumb-btn ${activeImage === product.image ? 'active' : ''}`}
                onClick={() => setActiveImage(product.image)}
                aria-label="Main product view"
              >
                <img src={product.image} alt={product.name} />
              </button>

              {product.secondaryImage && (
                <button 
                  className={`pdp-thumb-btn ${activeImage === product.secondaryImage ? 'active' : ''}`}
                  onClick={() => setActiveImage(product.secondaryImage)}
                  aria-label="Product texture and lifestyle view"
                >
                  <img src={product.secondaryImage} alt={`${product.name} texture`} />
                </button>
              )}
            </div>

            {/* Main Stage Image */}
            <div className="pdp-main-image">
              <img src={activeImage} alt={product.name} />
              {product.badge && (
                <div style={{ position: 'absolute', top: 20, left: 20 }}>
                  <span className="badge-pill badge-dark">{product.badge}</span>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Product Information & Purchase */}
          <div className="pdp-info-column">
            
            <div>
              <div className="eyebrow">{product.category} • {product.size}</div>
              <h1 className="pdp-title">{product.name}</h1>
              <p className="pdp-subtitle">{product.subtitle}</p>
            </div>

            {/* Ratings Bar */}
            {product.rating && (
              <div className="product-rating" style={{ gap: '0.6rem' }}>
                <div className="stars-wrap">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={15} 
                      fill={i < Math.floor(product.rating) ? "#B88939" : "none"} 
                      stroke="#B88939" 
                    />
                  ))}
                </div>
                <span className="rating-text" style={{ fontSize: '0.85rem' }}>
                  {product.rating} ({product.reviewCount} verified community reviews)
                </span>
              </div>
            )}

            {/* Price Row */}
            <div className="pdp-price-wrap">
              <span className="pdp-price">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="pdp-original-price">{formatPrice(product.originalPrice)}</span>
              )}
              <span style={{ fontSize: '0.78rem', color: '#B8735C', fontWeight: 600 }}>
                Includes all luxury beauty taxes & packaging
              </span>
            </div>

            {/* Demo catalog badge indicator */}
            <div style={{ background: '#FAF3ED', border: '1px solid #E8CFC5', borderRadius: '4px', padding: '0.6rem 0.85rem', fontSize: '0.74rem', color: '#82584A', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={14} color="#B8735C" />
              <span><strong>DUELLE Studio Catalog Note:</strong> Demo formulation profile. Real batch serial numbers will be assigned upon production launch.</span>
            </div>

            {/* Description */}
            <p style={{ fontSize: '0.96rem', color: 'var(--color-text-secondary)', lineHeight: 1.7, fontWeight: 300 }}>
              {product.description}
            </p>

            {/* Features check pills */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              {product.features?.map((feature, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--color-text-secondary)' }}>
                  <Check size={14} color="#B8735C" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* Stepper & Add to Bag CTA */}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
              <div className="qty-stepper" style={{ height: '52px' }}>
                <button className="qty-btn" style={{ width: '36px', height: '100%' }} onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
                <span className="qty-number" style={{ fontSize: '0.95rem' }}>{qty}</span>
                <button className="qty-btn" style={{ width: '36px', height: '100%' }} onClick={() => setQty(qty + 1)}>+</button>
              </div>

              <button 
                className="btn btn-primary"
                style={{ flex: 1, minWidth: '220px', height: '52px' }}
                onClick={() => addToCart(product, qty)}
              >
                <ShoppingBag size={18} /> Add To Bag • {formatPrice(product.price * qty)}
              </button>

              <button 
                className="icon-btn"
                style={{ width: '52px', height: '52px', border: '1px solid var(--color-border-light)' }}
                onClick={handleShare}
                aria-label="Share product"
                title="Share"
              >
                <Share2 size={18} />
              </button>
            </div>

            {/* Guarantees Strip */}
            <div style={{ borderTop: '1px solid var(--color-border-light)', paddingTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.78rem', color: 'var(--color-text-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Truck size={15} color="#B8735C" />
                <span>Complimentary Delivery over ₹1,999 across India</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={15} color="#B8735C" />
                <span>Formulated without parabens, sulfates, or artificial dyes</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <RotateCcw size={15} color="#B8735C" />
                <span>30-Day Ritual Satisfaction Guarantee</span>
              </div>
            </div>

            {/* Detailed Accordions */}
            <div className="pdp-accordion" style={{ marginTop: '1rem' }}>
              
              {/* Ingredients Accordion */}
              <div className="pdp-accordion-item">
                <button 
                  className="pdp-accordion-header"
                  onClick={() => toggleSection('ingredients')}
                >
                  <span>Verified Clean Ingredients</span>
                  {openSection === 'ingredients' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openSection === 'ingredients' && (
                  <div className="pdp-accordion-content">
                    <p style={{ marginBottom: '0.75rem' }}>{product.ingredients}</p>
                    <div style={{ fontSize: '0.75rem', color: '#B8735C', fontStyle: 'italic' }}>
                      *Formulated to international clean cosmetic standards. Dermatologically tested for sensitive skin.
                    </div>
                  </div>
                )}
              </div>

              {/* Directions Accordion */}
              <div className="pdp-accordion-item">
                <button 
                  className="pdp-accordion-header"
                  onClick={() => toggleSection('directions')}
                >
                  <span>The Daily Ritual & How to Use</span>
                  {openSection === 'directions' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openSection === 'directions' && (
                  <div className="pdp-accordion-content">
                    <p>{product.directions}</p>
                  </div>
                )}
              </div>

              {/* Shipping & Delivery Accordion */}
              <div className="pdp-accordion-item">
                <button 
                  className="pdp-accordion-header"
                  onClick={() => toggleSection('shipping')}
                >
                  <span>Shipping & Concierge Delivery</span>
                  {openSection === 'shipping' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openSection === 'shipping' && (
                  <div className="pdp-accordion-content">
                    <p>
                      All DUELLE orders are hand-packaged in our temperature-controlled beauty atelier. Standard express shipping delivers within 2–4 business days across Mumbai, Delhi, Bengaluru, and all metro hubs in India.
                    </p>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>

        {/* Related Formulations Carousel / Grid */}
        <div style={{ marginTop: '5rem', paddingTop: '4rem', borderTop: '1px solid var(--color-border-light)' }}>
          <div className="section-header" style={{ marginBottom: '2.5rem' }}>
            <span className="eyebrow">Harmonious Pairings</span>
            <h2 className="section-title">Complete Your Daily Ritual</h2>
            <p className="section-subtitle">
              Formulations designed to amplify each other's efficacy and barrier support.
            </p>
          </div>

          <div className="product-grid">
            {related.map(relProduct => (
              <ProductCard key={relProduct.id} product={relProduct} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
