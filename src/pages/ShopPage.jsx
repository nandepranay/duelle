import React, { useState, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';
import { SlidersHorizontal, Search, RotateCcw, Sparkles } from 'lucide-react';

export const ShopPage = () => {
  const { selectedCategoryFilter, setSelectedCategoryFilter } = useCart();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'price-asc', 'price-desc', 'rating'

  // Filtered and Sorted products
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Category filter
    if (selectedCategoryFilter !== 'all') {
      result = result.filter(p => p.categorySlug === selectedCategoryFilter);
    }

    // Search query
    if (searchTerm.trim() !== '') {
      const q = searchTerm.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedCategoryFilter, searchTerm, sortBy]);

  const activeCategoryObject = CATEGORIES.find(c => c.slug === selectedCategoryFilter);

  return (
    <div className="fade-in" style={{ paddingBottom: '6rem' }}>
      
      {/* Category Hero / Header */}
      <section style={{ backgroundColor: '#F8F3ED', padding: '4.5rem 0 3.5rem 0', borderBottom: '1px solid var(--color-border-light)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="eyebrow">The Complete Collection</span>
          <h1 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', fontWeight: 400, marginBottom: '0.85rem' }}>
            {selectedCategoryFilter === 'all' ? 'All Skincare Formulations' : activeCategoryObject?.name}
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--color-text-secondary)', maxWidth: '640px', margin: '0 auto', fontWeight: 300, lineHeight: 1.65 }}>
            {selectedCategoryFilter === 'all' 
              ? 'Every product is an invitation to pause, breathe, and honor your skin with potent, clean botanicals and restorative ceramides.' 
              : activeCategoryObject?.description}
          </p>
        </div>
      </section>

      {/* Main Catalog View */}
      <div className="container">
        
        {/* Toolbar & Filters */}
        <div className="catalog-toolbar">
          
          {/* Category Tabs */}
          <div className="category-tabs-bar">
            <button 
              className={`category-tab-btn ${selectedCategoryFilter === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCategoryFilter('all')}
            >
              All ({PRODUCTS.length})
            </button>

            {CATEGORIES.map(cat => (
              <button 
                key={cat.id}
                className={`category-tab-btn ${selectedCategoryFilter === cat.slug ? 'active' : ''}`}
                onClick={() => setSelectedCategoryFilter(cat.slug)}
              >
                {cat.name} ({cat.count})
              </button>
            ))}
          </div>

          {/* Search & Sort Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            
            {/* Live Filter Search Input */}
            <div style={{ position: 'relative', width: '220px' }}>
              <input 
                type="text" 
                placeholder="Filter products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.55rem 0.75rem 0.55rem 2.1rem',
                  fontSize: '0.8rem',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid var(--color-border-light)',
                  outline: 'none',
                  backgroundColor: '#FFFFFF'
                }}
              />
              <Search size={14} color="#8E7C77" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>

            {/* Sort Select */}
            <select 
              className="catalog-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort products"
            >
              <option value="featured">Featured Rituals</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>

          </div>

        </div>

        {/* Results Counter & Reset */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
          <span>
            Displaying <strong>{filteredProducts.length}</strong> of {PRODUCTS.length} formulations
          </span>
          {(selectedCategoryFilter !== 'all' || searchTerm) && (
            <button 
              onClick={() => { setSelectedCategoryFilter('all'); setSearchTerm(''); }}
              style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#B8735C', fontWeight: 600 }}
            >
              <RotateCcw size={12} /> Clear all filters
            </button>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 1rem', background: '#FAF6F2', borderRadius: 'var(--radius-sm)' }}>
            <Sparkles size={36} color="#B8735C" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '0.5rem' }}>No Rituals Found</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              We couldn't find any products matching your specific filter criteria.
            </p>
            <button 
              className="btn btn-primary"
              onClick={() => { setSelectedCategoryFilter('all'); setSearchTerm(''); }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
