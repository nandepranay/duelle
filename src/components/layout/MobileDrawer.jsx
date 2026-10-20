import React from 'react';
import { useCart } from '../../context/CartContext';
import { CATEGORIES } from '../../data/products';
import { X, ChevronRight, ShoppingBag, Search, Sparkles } from 'lucide-react';

export const MobileDrawer = () => {
  const { 
    isMobileNavOpen, 
    setIsMobileNavOpen, 
    navigateTo, 
    totalItems, 
    setIsCartOpen,
    setIsSearchOpen
  } = useCart();

  if (!isMobileNavOpen) return null;

  return (
    <div className={`mobile-nav-drawer ${isMobileNavOpen ? 'open' : ''}`} onClick={() => setIsMobileNavOpen(false)}>
      <div className="mobile-nav-panel" onClick={(e) => e.stopPropagation()}>
        
        <div>
          {/* Drawer Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border-light)' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 600, letterSpacing: '0.2em' }}>
                DUELLE
              </div>
              <div style={{ fontSize: '0.58rem', letterSpacing: '0.24em', color: 'var(--color-text-muted)' }}>
                YOUR SKIN. YOUR STORY.
              </div>
            </div>
            <button 
              onClick={() => setIsMobileNavOpen(false)} 
              aria-label="Close mobile navigation"
              style={{ padding: '6px' }}
            >
              <X size={22} />
            </button>
          </div>

          {/* Quick Action Buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', margin: '1.25rem 0' }}>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => {
                setIsMobileNavOpen(false);
                setIsSearchOpen(true);
              }}
              style={{ padding: '0.6rem' }}
            >
              <Search size={14} /> Search
            </button>
            <button 
              className="btn btn-primary btn-sm"
              onClick={() => {
                setIsMobileNavOpen(false);
                setIsCartOpen(true);
              }}
              style={{ padding: '0.6rem' }}
            >
              <ShoppingBag size={14} /> Bag ({totalItems})
            </button>
          </div>

          {/* Navigation Links */}
          <div className="mobile-links-list">
            <div 
              className="mobile-nav-link"
              onClick={() => navigateTo('home')}
            >
              <span>Home</span>
              <ChevronRight size={18} color="#B8735C" />
            </div>

            <div 
              className="mobile-nav-link"
              onClick={() => navigateTo('shop', { category: 'all' })}
            >
              <span>Shop All Products</span>
              <ChevronRight size={18} color="#B8735C" />
            </div>

            <div style={{ paddingLeft: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.65rem', margin: '0.5rem 0' }}>
              <div className="eyebrow" style={{ marginBottom: '0.2rem' }}>By Category</div>
              {CATEGORIES.map(cat => (
                <div 
                  key={cat.id}
                  onClick={() => navigateTo('shop', { category: cat.slug })}
                  style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.3rem 0' }}
                >
                  <span>{cat.name}</span>
                  <span style={{ fontSize: '0.7rem', color: '#B8735C' }}>{cat.count}</span>
                </div>
              ))}
            </div>

            <div 
              className="mobile-nav-link"
              onClick={() => navigateTo('about')}
            >
              <span>About DUELLE</span>
              <ChevronRight size={18} color="#B8735C" />
            </div>
          </div>
        </div>

        {/* Drawer Signature */}
        <div style={{ paddingTop: '1.5rem', borderTop: '1px solid var(--color-border-light)', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: '#B8735C', fontSize: '0.95rem' }}>
            DUELLE — Brought to you by Amruta and Janhavi.
          </div>
          <div style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)', marginTop: '0.2rem' }}>
            Handcrafted with love for Indian & Global skin.
          </div>
        </div>

      </div>
    </div>
  );
};
