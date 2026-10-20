import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../data/products';
import { X, CheckCircle, ShieldCheck, Truck, Sparkles, ArrowRight } from 'lucide-react';

export const CheckoutModal = () => {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cartItems, 
    subtotal, 
    discountAmount, 
    shippingFee, 
    total,
    appliedPromo,
    clearCart,
    showToast
  } = useCart();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    deliveryInstructions: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  if (!isCheckoutOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.address || !formData.pincode) {
      showToast('Please fill in your shipping details', 'error');
      return;
    }

    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const orderId = `DUE-IND-${randomNum}`;
    setOrderNumber(orderId);
    setIsSubmitted(true);
    clearCart();
    showToast(`Order ${orderId} reserved in demo system!`, 'success');
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setIsSubmitted(false);
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="search-modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid var(--color-border-light)', paddingBottom: '0.75rem' }}>
          <div>
            <div className="eyebrow" style={{ margin: 0 }}>DUELLE CONCIERGE CHECKOUT</div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem' }}>
              {isSubmitted ? 'Your Skincare Ritual is Confirmed' : 'Complete Your Order'}
            </h3>
          </div>
          <button onClick={handleClose} aria-label="Close checkout">
            <X size={20} />
          </button>
        </div>

        {isSubmitted ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div style={{ width: 68, height: 68, borderRadius: '50%', background: '#F8F1EB', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
              <CheckCircle size={38} color="#B8735C" />
            </div>

            <div style={{ fontSize: '0.8rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#B8735C', fontWeight: 600 }}>
              Order Reference: {orderNumber}
            </div>

            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', margin: '0.5rem 0' }}>
              Thank You, {formData.firstName}
            </h4>

            <p style={{ fontSize: '0.92rem', color: 'var(--color-text-secondary)', maxWidth: '440px', margin: '0 auto 1.5rem auto', lineHeight: 1.6 }}>
              A confirmation email has been scheduled for <strong>{formData.email}</strong>. Amruta & Janhavi's packaging atelier will prepare your bespoke skincare delivery with sustainable silk wrapping.
            </p>

            <div style={{ background: '#FAF6F2', border: '1px solid var(--color-border-light)', borderRadius: 'var(--radius-xs)', padding: '1rem', fontSize: '0.78rem', color: 'var(--color-text-muted)', marginBottom: '1.75rem' }}>
              <strong>Notice:</strong> This is an interactive demo checkout preview. No actual credit card charge has been made. Payment gateway integration (Razorpay / Stripe) will be activated for live production launch.
            </div>

            <button className="btn btn-primary" onClick={handleClose}>
              Back to DUELLE Sanctuary
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div>
                <label style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-muted)', display: 'block', marginBottom: '4px' }}>First Name *</label>
                <input 
                  type="text" 
                  name="firstName" 
                  required 
                  value={formData.firstName} 
                  onChange={handleChange}
                  placeholder="e.g. Ananya"
                  style={{ width: '100%', padding: '0.7rem', border: '1px solid var(--color-border-light)', borderRadius: '4px', fontSize: '0.85rem' }} 
                />
              </div>
              <div>
                <label style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-muted)', display: 'block', marginBottom: '4px' }}>Last Name</label>
                <input 
                  type="text" 
                  name="lastName" 
                  value={formData.lastName} 
                  onChange={handleChange}
                  placeholder="e.g. Sharma"
                  style={{ width: '100%', padding: '0.7rem', border: '1px solid var(--color-border-light)', borderRadius: '4px', fontSize: '0.85rem' }} 
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div>
                <label style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-muted)', display: 'block', marginBottom: '4px' }}>Email Address *</label>
                <input 
                  type="email" 
                  name="email" 
                  required 
                  value={formData.email} 
                  onChange={handleChange}
                  placeholder="ananya@example.com"
                  style={{ width: '100%', padding: '0.7rem', border: '1px solid var(--color-border-light)', borderRadius: '4px', fontSize: '0.85rem' }} 
                />
              </div>
              <div>
                <label style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-muted)', display: 'block', marginBottom: '4px' }}>Phone Number</label>
                <input 
                  type="tel" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  style={{ width: '100%', padding: '0.7rem', border: '1px solid var(--color-border-light)', borderRadius: '4px', fontSize: '0.85rem' }} 
                />
              </div>
            </div>

            <div style={{ marginBottom: '0.75rem' }}>
              <label style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-muted)', display: 'block', marginBottom: '4px' }}>Delivery Address *</label>
              <input 
                type="text" 
                name="address" 
                required 
                value={formData.address} 
                onChange={handleChange}
                placeholder="Apartment, building, street address"
                style={{ width: '100%', padding: '0.7rem', border: '1px solid var(--color-border-light)', borderRadius: '4px', fontSize: '0.85rem' }} 
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div>
                <label style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-muted)', display: 'block', marginBottom: '4px' }}>City *</label>
                <input 
                  type="text" 
                  name="city" 
                  required 
                  value={formData.city} 
                  onChange={handleChange}
                  placeholder="Mumbai"
                  style={{ width: '100%', padding: '0.7rem', border: '1px solid var(--color-border-light)', borderRadius: '4px', fontSize: '0.85rem' }} 
                />
              </div>
              <div>
                <label style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-muted)', display: 'block', marginBottom: '4px' }}>State</label>
                <input 
                  type="text" 
                  name="state" 
                  value={formData.state} 
                  onChange={handleChange}
                  placeholder="Maharashtra"
                  style={{ width: '100%', padding: '0.7rem', border: '1px solid var(--color-border-light)', borderRadius: '4px', fontSize: '0.85rem' }} 
                />
              </div>
              <div>
                <label style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-muted)', display: 'block', marginBottom: '4px' }}>Pincode *</label>
                <input 
                  type="text" 
                  name="pincode" 
                  required 
                  value={formData.pincode} 
                  onChange={handleChange}
                  placeholder="400001"
                  style={{ width: '100%', padding: '0.7rem', border: '1px solid var(--color-border-light)', borderRadius: '4px', fontSize: '0.85rem' }} 
                />
              </div>
            </div>

            {/* Order Summary Strip */}
            <div style={{ background: '#FAF6F2', border: '1px solid var(--color-border-light)', borderRadius: '4px', padding: '0.85rem 1rem', marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{cartItems.length} Skincare Essentials in Bag</div>
                <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)' }}>
                  {shippingFee === 0 ? 'Complimentary Express Delivery' : `Standard Delivery: ${formatPrice(shippingFee)}`}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>Payable Total</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  {formatPrice(total)}
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block" style={{ padding: '0.9rem' }}>
              Place Demo Ritual Order • {formatPrice(total)}
            </button>
            
            <div style={{ marginTop: '0.75rem', textAlign: 'center', fontSize: '0.68rem', color: 'var(--color-text-muted)' }}>
              🔒 Demo Checkout Preview — Safe & Secure. All transactions strictly encrypted.
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
