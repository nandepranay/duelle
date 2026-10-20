import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { CATEGORIES, PRODUCTS } from '../../data/products';
import { Search, ShoppingBag, User, Menu, ChevronRight } from 'lucide-react';

export const Navbar = () => {
  const { 
    currentPage, 
    navigateTo, 
    totalItems, 
    setIsCartOpen, 
    setIsSearchOpen, 
    setIsMobileNavOpen,
    showToast
  } = useCart();

  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

  const featuredSkincare = PRODUCTS.find(p => p.id === 'prod-2') || PRODUCTS[0];

  return (
    <>
      <header className="header-wrapper" role="banner">
        <div className="container">
          <div className="header-inner">
            
            {/* Mobile Menu Button */}
            <button 
              className="icon-btn mobile-menu-trigger" 
              onClick={() => setIsMobileNavOpen(true)}
              aria-label="Open mobile navigation"
            >
              <Menu size={22} />
            </button>

            {/* DUELLE Wordmark & Tagline */}
            <div 
              className="brand-logo" 
              onClick={() => navigateTo('home')}
              role="button"
              tabIndex={0}
              aria-label="DUELLE Home"
            >
              <span className="brand-wordmark">DUELLE</span>
              <span className="brand-subtext">YOUR SKIN. YOUR STORY.</span>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="nav-links-desktop" role="navigation" aria-label="Main menu">
              <span 
                className={`nav-item ${currentPage === 'home' ? 'active' : ''}`}
                onClick={() => navigateTo('home')}
              >
                Home
              </span>

              <span 
                className={`nav-item ${currentPage === 'shop' ? 'active' : ''}`}
                onClick={() => navigateTo('shop', { category: 'all' })}
              >
                Shop All
              </span>

              {/* Skincare with Mega Dropdown */}
              <div className="has-dropdown">
                <span 
                  className={`nav-item ${currentPage === 'shop' ? 'active' : ''}`}
                  onClick={() => navigateTo('shop', { category: 'all' })}
                >
                  Skincare
                </span>

                <div className="mega-dropdown">
                  <div className="dropdown-grid">
                    <div className="dropdown-category-list">
                      <div className="eyebrow" style={{ marginBottom: '0.4rem' }}>Formulations by Step</div>
                      {CATEGORIES.map(cat => (
                        <div 
                          key={cat.id} 
                          className="dropdown-category-item"
                          onClick={() => navigateTo('shop', { category: cat.slug })}
                          role="button"
                        >
                          <div>
                            <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#1F1816' }}>{cat.name}</div>
                            <div style={{ fontSize: '0.72rem', color: '#8E7C77' }}>{cat.tagline}</div>
                          </div>
                          <ChevronRight size={14} color="#B8735C" />
                        </div>
                      ))}
                    </div>

                    <div className="dropdown-featured-card">
                      <div className="eyebrow" style={{ color: '#B8735C' }}>Featured Ritual Hero</div>
                      <img src={featuredSkincare.image} alt={featuredSkincare.name} />
                      <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 600 }}>
                        {featuredSkincare.name}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#584A46', margin: '0.2rem 0 0.6rem 0' }}>
                        {featuredSkincare.subtitle}
                      </div>
                      <button 
                        className="btn btn-primary btn-sm"
                        onClick={() => navigateTo('product', { productId: featuredSkincare.id })}
                      >
                        Discover Product
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <span 
                className="nav-item"
                onClick={() => {
                  if (currentPage !== 'home') {
                    navigateTo('home');
                    setTimeout(() => document.getElementById('bestsellers')?.scrollIntoView({ behavior: 'smooth' }), 120);
                  } else {
                    document.getElementById('bestsellers')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Bestsellers
              </span>

              <span 
                className="nav-item"
                onClick={() => {
                  if (currentPage !== 'home') {
                    navigateTo('home');
                    setTimeout(() => document.getElementById('new-arrivals')?.scrollIntoView({ behavior: 'smooth' }), 120);
                  } else {
                    document.getElementById('new-arrivals')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                New Arrivals
              </span>

              <span 
                className={`nav-item ${currentPage === 'about' ? 'active' : ''}`}
                onClick={() => navigateTo('about')}
              >
                About Us
              </span>
            </nav>

            {/* Header Action Icons */}
            <div className="header-actions">
              <button 
                className="icon-btn" 
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search DUELLE skincare"
                title="Search"
              >
                <Search size={19} />
              </button>

              <button 
                className="icon-btn" 
                onClick={() => setIsAccountModalOpen(true)}
                aria-label="VIP Account"
                title="Account"
              >
                <User size={19} />
              </button>

              <button 
                className="icon-btn" 
                onClick={() => setIsCartOpen(true)}
                aria-label={`Shopping Bag with ${totalItems} items`}
                title="Shopping Bag"
              >
                <ShoppingBag size={19} />
                {totalItems > 0 && (
                  <span className="badge-count">{totalItems}</span>
                )}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Account Demo Modal */}
      {isAccountModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAccountModalOpen(false)}>
          <div className="search-modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '420px', textAlign: 'center' }}>
            <div className="eyebrow">DUELLE INSIDER CLUB</div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '0.75rem' }}>
              Welcome to DUELLE
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', marginBottom: '1.75rem', lineHeight: 1.6 }}>
              Experience bespoke skincare consultations, private launch access, and complimentary samples curated by founders Amruta & Janhavi.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                style={{
                  padding: '0.85rem 1rem',
                  border: '1px solid var(--color-border-light)',
                  borderRadius: 'var(--radius-xs)',
                  outline: 'none',
                  fontSize: '0.88rem'
                }} 
              />
              <button 
                className="btn btn-primary btn-block"
                onClick={() => {
                  setIsAccountModalOpen(false);
                  showToast('Signed in to DUELLE Insider Club demo profile', 'success');
                }}
              >
                Sign In / Join Privilege
              </button>
              <button 
                className="btn btn-secondary btn-block"
                onClick={() => setIsAccountModalOpen(false)}
              >
                Continue Browsing
              </button>
            </div>
            <div style={{ marginTop: '1.25rem', fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>
              *Demo Authentication — Production authentication service ready to connect.
            </div>
          </div>
        </div>
      )}
    </>
  );
};
