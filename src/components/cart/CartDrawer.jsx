import React from 'react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../data/products';
import { X, Trash2, ShoppingBag, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export const CartDrawer = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    updateQuantity,
    removeFromCart,
    subtotal,
    discountAmount,
    shippingFee,
    total,
    freeShippingProgress,
    amountToFreeShipping,
    promoCode,
    setPromoCode,
    appliedPromo,
    promoError,
    applyPromo,
    removePromo,
    setIsCheckoutOpen,
    navigateTo
  } = useCart();

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`cart-backdrop ${isCartOpen ? 'open' : ''}`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Slide-out Drawer */}
      <div className={`cart-drawer ${isCartOpen ? 'open' : ''}`} role="dialog" aria-label="Shopping Bag">
        
        {/* Header */}
        <div className="cart-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <ShoppingBag size={20} color="#B8735C" />
            <h3>Your Ritual Bag</h3>
          </div>
          <button 
            onClick={() => setIsCartOpen(false)}
            aria-label="Close bag"
            style={{ padding: '6px' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="free-shipping-bar">
          <div className="free-shipping-text">
            {amountToFreeShipping > 0 ? (
              <span>Add <strong>{formatPrice(amountToFreeShipping)}</strong> for <strong>Complimentary Luxury Delivery</strong></span>
            ) : (
              <span style={{ color: '#2C6E49', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Sparkles size={13} /> You've unlocked Complimentary Luxury Shipping!
              </span>
            )}
            <span>{freeShippingProgress}%</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${freeShippingProgress}%` }}></div>
          </div>
        </div>

        {/* Items List / Empty State */}
        {cartItems.length === 0 ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--color-bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <ShoppingBag size={28} color="#8E7C77" />
            </div>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginBottom: '0.5rem' }}>Your Bag is Empty</h4>
            <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', maxWidth: '260px', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Discover handcrafted skincare formulations designed to transform your routine into a self-care ritual.
            </p>
            <button 
              className="btn btn-primary"
              onClick={() => {
                setIsCartOpen(false);
                navigateTo('shop');
              }}
            >
              Explore Formulations
            </button>
          </div>
        ) : (
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-img" />
                
                <div className="cart-item-details">
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div className="cart-item-title">{item.name}</div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Remove ${item.name}`}
                        style={{ color: 'var(--color-text-muted)', padding: '2px' }}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                    <div className="cart-item-sub">{item.subtitle || item.category}</div>
                    {item.size && <div style={{ fontSize: '0.68rem', color: '#B8735C' }}>{item.size}</div>}
                  </div>

                  <div className="cart-item-controls">
                    <div className="qty-stepper">
                      <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                      <span className="qty-number">{item.quantity}</span>
                      <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>

                    <div className="cart-item-price">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer & Checkout */}
        {cartItems.length > 0 && (
          <div className="cart-footer">
            
            {/* Promo Code Input */}
            <div>
              {appliedPromo ? (
                <div className="promo-applied-tag">
                  <span>{appliedPromo.label} ({appliedPromo.discountPercent}% OFF)</span>
                  <button onClick={removePromo} style={{ color: '#8C6A2E', fontWeight: 'bold' }}>×</button>
                </div>
              ) : (
                <div className="promo-row">
                  <input 
                    type="text" 
                    placeholder="Enter promo code (e.g. DUELLE10)"
                    className="promo-input"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <button className="btn btn-secondary btn-sm" onClick={() => applyPromo()}>
                    Apply
                  </button>
                </div>
              )}
              {promoError && (
                <div style={{ color: '#C93B2B', fontSize: '0.72rem', marginTop: '0.3rem' }}>
                  {promoError}
                </div>
              )}
            </div>

            {/* Price Calculations */}
            <div className="cost-summary">
              <div className="cost-line">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              
              {appliedPromo && (
                <div className="cost-line" style={{ color: '#B8735C' }}>
                  <span>Privilege Discount ({appliedPromo.code})</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}

              <div className="cost-line">
                <span>Delivery (Pan-India)</span>
                <span>{shippingFee === 0 ? 'Complimentary' : formatPrice(shippingFee)}</span>
              </div>

              <div className="cost-line total-line">
                <span>Estimated Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <button className="btn btn-primary btn-block" onClick={handleCheckout}>
              Proceed to Ritual Checkout <ArrowRight size={16} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>
              <ShieldCheck size={14} color="#B8735C" />
              <span>Complimentary eco-luxury packaging with every order</span>
            </div>

          </div>
        )}

      </div>
    </>
  );
};
