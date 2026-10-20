import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../../context/CartContext';
import { PRODUCTS, formatPrice } from '../../data/products';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';

export const SearchModal = () => {
  const { isSearchOpen, setIsSearchOpen, navigateTo } = useCart();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const filtered = query.trim() === ''
    ? PRODUCTS.slice(0, 4) // Show curated recommendations when empty
    : PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(query.toLowerCase())
      );

  const handleSelectProduct = (productId) => {
    navigateTo('product', { productId });
    setIsSearchOpen(false);
  };

  const trendingTags = ["Peptides", "Barrier Cream", "SPF 50+", "Lip Nectar", "Rose Cleanser", "Ceramides"];

  return (
    <div className="modal-overlay" onClick={() => setIsSearchOpen(false)}>
      <div className="search-modal-box" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div className="eyebrow" style={{ margin: 0 }}>DUELLE SEARCH CONCIERGE</div>
          <button onClick={() => setIsSearchOpen(false)} aria-label="Close search">
            <X size={20} />
          </button>
        </div>

        {/* Search Input */}
        <div className="search-input-wrap">
          <Search size={22} color="#B8735C" />
          <input 
            ref={inputRef}
            type="text" 
            placeholder="Search skincare ritual, ingredients..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button onClick={() => setQuery('')}>
              <X size={16} />
            </button>
          )}
        </div>

        {/* Trending Searches */}
        <div style={{ marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginRight: '0.5rem' }}>
            Trending Rituals:
          </span>
          <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.4rem' }}>
            {trendingTags.map((tag, idx) => (
              <span 
                key={idx}
                onClick={() => setQuery(tag)}
                style={{
                  fontSize: '0.75rem',
                  padding: '0.2rem 0.6rem',
                  backgroundColor: 'var(--color-bg-secondary)',
                  borderRadius: 'var(--radius-full)',
                  cursor: 'pointer',
                  color: 'var(--color-text-secondary)',
                  transition: 'background-color 0.2s'
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Results */}
        <div>
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>
            {query.trim() === '' ? 'Curated Recommendations' : `Found ${filtered.length} Formulations`}
          </div>

          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2.5rem 1rem', color: 'var(--color-text-muted)' }}>
              <p>No skincare rituals found matching "{query}".</p>
              <button 
                className="btn btn-secondary btn-sm" 
                style={{ marginTop: '1rem' }}
                onClick={() => { setQuery(''); navigateTo('shop'); setIsSearchOpen(false); }}
              >
                Explore All Formulations
              </button>
            </div>
          ) : (
            <div className="search-results-list">
              {filtered.map(product => (
                <div 
                  key={product.id}
                  className="search-result-item"
                  onClick={() => handleSelectProduct(product.id)}
                >
                  <img src={product.image} alt={product.name} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#B8735C', fontWeight: 600 }}>
                      {product.category}
                    </div>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                      {product.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                      {product.subtitle}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                      {formatPrice(product.price)}
                    </div>
                    <ArrowRight size={14} color="#B8735C" style={{ marginTop: '4px' }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
