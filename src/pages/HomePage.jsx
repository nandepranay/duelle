import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Droplet, 
  Heart, 
  Sun, 
  Feather, 
  Check, 
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { InstagramIcon } from '../components/ui/SocialIcons';

export const HomePage = () => {
  const { navigateTo, showToast } = useCart();

  // Newsletter State
  const [email, setEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [newsletterError, setNewsletterError] = useState('');

  // Instagram Gallery data
  const communityPosts = [
    { id: 1, image: "./images/hero_campaign.jpg", caption: "Luminous morning ritual with Radiance Peptide Elixir." },
    { id: 2, image: "./images/cat_cleansers.jpg", caption: "Velvet Rose Cleanser melted into skin." },
    { id: 3, image: "./images/prod_cream.jpg", caption: "Cloud-whipped barrier protection." },
    { id: 4, image: "./images/cat_lipcare.jpg", caption: "High-shine peptide lip glaze." },
    { id: 5, image: "./images/campaign_skinday.jpg", caption: "Glowing together. Make every day a skin day." },
    { id: 6, image: "./images/prod_sunscreen.jpg", caption: "Invisible daily broad spectrum SPF 50+." }
  ];

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setNewsletterError('Please provide a valid email address');
      return;
    }
    setNewsletterSubmitted(true);
    setNewsletterError('');
    showToast('Welcome to DUELLE Insider Access! Use code GLOW20', 'success');
  };

  const newArrivals = PRODUCTS.filter(p => p.isNew || p.id === 'prod-4' || p.id === 'prod-5' || p.id === 'prod-8');
  const bestsellers = PRODUCTS.filter(p => p.isBestseller || p.rating >= 4.9);

  return (
    <main className="fade-in">
      
      {/* --------------------------------------------------------------------
          1. HERO SECTION
          -------------------------------------------------------------------- */}
      <section className="hero-section" aria-label="Welcome Hero">
        <div className="container">
          <div className="hero-grid">
            
            {/* Left Content */}
            <div className="hero-content">
              <span className="eyebrow">
                <Sparkles size={13} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                Handcrafted Luxury Skincare
              </span>
              
              <h1 className="hero-title">
                Your Skin <em>Deserves More.</em>
              </h1>
              
              <p className="hero-description">
                Discover your everyday skincare essentials, thoughtfully chosen to make your routine feel like a ritual.
              </p>

              <div className="hero-cta-group">
                <button 
                  className="btn btn-primary"
                  onClick={() => navigateTo('shop', { category: 'all' })}
                >
                  SHOP NOW <ArrowRight size={15} />
                </button>

                <button 
                  className="btn btn-secondary"
                  onClick={() => navigateTo('about')}
                >
                  DISCOVER DUELLE
                </button>
              </div>

              {/* Trust Badges */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.75rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.78rem', color: 'var(--color-text-secondary)' }}>
                  <ShieldCheck size={16} color="#B8735C" />
                  <span>Dermatologist Formulated</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.78rem', color: 'var(--color-text-secondary)' }}>
                  <Feather size={16} color="#B8735C" />
                  <span>100% Cruelty-Free</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.78rem', color: 'var(--color-text-secondary)' }}>
                  <Droplet size={16} color="#B8735C" />
                  <span>Clean Botanical Actives</span>
                </div>
              </div>
            </div>

            {/* Right Media Frame */}
            <div className="hero-image-container">
              <div className="hero-image-frame">
                <img 
                  src="./images/hero_campaign.jpg" 
                  alt="DUELLE Skincare Campaign - Radiant dewy glass skin"
                />
              </div>

              {/* Floating Quote Card */}
              <div className="hero-floating-card">
                <span className="quote">"Skincare shouldn't be a chore; it's the sacred ritual of meeting yourself."</span>
                <span className="sign">— Amruta & Janhavi, Founders</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------
          2. SHOP BY CATEGORY
          -------------------------------------------------------------------- */}
      <section id="categories" className="section-padding" style={{ backgroundColor: '#FCFAF8' }} aria-label="Shop by Category">
        <div className="container">
          
          <div className="section-header">
            <span className="eyebrow">Targeted Solutions</span>
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-subtitle">
              Every formula is purposefully designed to nourish, protect, and illuminate your skin barrier.
            </p>
          </div>

          <div className="category-grid">
            {CATEGORIES.map(category => (
              <div 
                key={category.id} 
                className="category-card"
                onClick={() => navigateTo('shop', { category: category.slug })}
                role="button"
                tabIndex={0}
              >
                <div className="category-image-wrap">
                  <img src={category.image} alt={category.name} loading="lazy" />
                  <div className="category-card-overlay"></div>
                </div>

                <div className="category-info">
                  <h3>{category.name}</h3>
                  <p>{category.tagline}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --------------------------------------------------------------------
          3. NEW ARRIVALS (Horizontal Showcase / Grid)
          -------------------------------------------------------------------- */}
      <section id="new-arrivals" className="section-padding" style={{ backgroundColor: '#F9F5F0' }} aria-label="New Arrivals">
        <div className="container">
          
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="eyebrow">Fresh Lab Releases</span>
              <h2 className="section-title" style={{ marginBottom: '0.35rem' }}>New Arrivals</h2>
              <p className="section-subtitle" style={{ margin: 0 }}>
                Our latest barrier-replenishing breakthroughs, developed with clean active botanicals.
              </p>
            </div>

            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => navigateTo('shop', { category: 'all' })}
            >
              View Full Catalog <ChevronRight size={14} />
            </button>
          </div>

          <div className="product-grid">
            {newArrivals.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
            *All specifications and reviews represent verified demo catalog data for the DUELLE brand preview.
          </div>

        </div>
      </section>

      {/* --------------------------------------------------------------------
          4. FEATURED EDITORIAL CAMPAIGN
          -------------------------------------------------------------------- */}
      <section id="campaign" className="section-padding editorial-campaign" aria-label="Editorial Campaign">
        <div className="container">
          <div className="campaign-grid">
            
            <div className="campaign-media">
              <img 
                src="./images/campaign_skinday.jpg" 
                alt="Make Every Day a Skin Day - DUELLE campaign"
                loading="lazy" 
              />
            </div>

            <div className="campaign-content">
              <span className="eyebrow">The DUELLE Standard</span>
              <h2 className="campaign-headline">
                Make Every Day <em>a Skin Day.</em>
              </h2>
              <p className="campaign-body">
                We believe in honoring your skin's natural intelligence. Our clean, multi-tasking formulations are created to blend seamlessly into your daily rhythm — giving you effortless, healthy luminosity that never demands compromise.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.9rem', color: 'var(--color-text-primary)' }}>
                  <Check size={16} color="#B8735C" />
                  <span>Bio-compatible liposomes that deliver actives deep into epidermal layers</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.9rem', color: 'var(--color-text-primary)' }}>
                  <Check size={16} color="#B8735C" />
                  <span>Zero pore-clogging silicones, synthetic parabens, or aggressive sulfates</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.9rem', color: 'var(--color-text-primary)' }}>
                  <Check size={16} color="#B8735C" />
                  <span>Weighted recyclable Italian glass packaging that elevates your vanity</span>
                </div>
              </div>

              <button 
                className="btn btn-primary"
                onClick={() => navigateTo('shop', { category: 'all' })}
              >
                EXPLORE THE COLLECTION <ArrowRight size={15} />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------
          5. BESTSELLERS
          -------------------------------------------------------------------- */}
      <section id="bestsellers" className="section-padding" style={{ backgroundColor: '#FCFAF8' }} aria-label="Bestsellers">
        <div className="container">
          
          <div className="section-header">
            <span className="eyebrow">Community Favorites</span>
            <h2 className="section-title">The DUELLE Bestsellers</h2>
            <p className="section-subtitle">
              Beloved by skincare aficionados for visible barrier repair and long-lasting glass radiance.
            </p>
          </div>

          <div className="product-grid">
            {bestsellers.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        </div>
      </section>

      {/* --------------------------------------------------------------------
          6. OUR PHILOSOPHY
          -------------------------------------------------------------------- */}
      <section id="philosophy" className="section-padding philosophy-section" aria-label="Brand Philosophy">
        <div className="container">
          
          <span className="eyebrow">Our Philosophy</span>
          
          <h2 className="philosophy-quote">
            "Beauty Begins With You."
          </h2>

          <p className="philosophy-description">
            At DUELLE, we believe true skincare is grounded in self-care, self-assurance, and the intimate joy of daily rituals. Founded by Amruta and Janhavi, DUELLE was born from a shared vision: that skincare should not be an intimidating 12-step task, but rather an intentional moment of calm and replenishment designed to celebrate your unique skin journey.
          </p>

          <div className="pillars-grid">
            <div className="pillar-card">
              <div className="pillar-icon">
                <Heart size={22} />
              </div>
              <h4>The Sacred Ritual</h4>
              <p>
                Transforming mundane morning routines into mindful self-care rituals that uplift your spirit and awaken natural vitality.
              </p>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon">
                <Droplet size={22} />
              </div>
              <h4>Intentional Chemistry</h4>
              <p>
                Every active ingredient is thoughtfully paired with soothing botanicals to optimize efficacy while respecting fragile barriers.
              </p>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon">
                <Sparkles size={22} />
              </div>
              <h4>Radical Transparency</h4>
              <p>
                Clear, honest formulations with zero misleading claims, ethical supply chains, and genuine respect for every skin tone.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* --------------------------------------------------------------------
          7. NEWSLETTER SECTION
          -------------------------------------------------------------------- */}
      <section id="newsletter" className="container" style={{ margin: '2rem auto 5rem auto' }} aria-label="Newsletter">
        <div className="newsletter-card">
          <span className="eyebrow" style={{ color: '#E2C992' }}>Exclusive Invitations</span>
          
          <h2 className="newsletter-title">
            Your Beauty Insider Access.
          </h2>

          <p className="newsletter-subtitle">
            Join the DUELLE inner circle for early access to private lab releases, curated skincare regimens, and 10% off your introductory order.
          </p>

          {newsletterSubmitted ? (
            <div className="newsletter-success">
              <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>✨ Welcome to the DUELLE Sanctuary!</p>
              <p style={{ fontSize: '0.82rem' }}>Check your inbox for your private 10% privilege code: <strong>DUELLE10</strong></p>
            </div>
          ) : (
            <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="newsletter-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-blush">
                SUBSCRIBE
              </button>
            </form>
          )}

          {newsletterError && (
            <div style={{ color: '#FFB4A2', fontSize: '0.78rem', marginTop: '0.75rem' }}>
              {newsletterError}
            </div>
          )}

          <div style={{ marginTop: '1.25rem', fontSize: '0.7rem', color: '#8E7C77' }}>
            No spam, ever. Unsubscribe anytime with one click.
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------
          8. INSTAGRAM / COMMUNITY GALLERY
          -------------------------------------------------------------------- */}
      <section id="community" className="section-padding" style={{ backgroundColor: '#FAF6F2', paddingBottom: '5rem' }} aria-label="Community">
        <div className="container">
          
          <div className="section-header" style={{ marginBottom: '2.5rem' }}>
            <span className="eyebrow">@DUELLEBEAUTY</span>
            <h2 className="section-title">The Community Gallery</h2>
            <p className="section-subtitle">
              Real skin, unfiltered rituals, and daily moments of radiance shared by our DUELLE collective.
            </p>
          </div>

          <div className="community-gallery">
            {communityPosts.map(post => (
              <div 
                key={post.id} 
                className="gallery-tile"
                onClick={() => showToast(`Instagram: ${post.caption}`, 'info')}
              >
                <img src={post.image} alt={post.caption} loading="lazy" />
                <div className="gallery-overlay">
                  <InstagramIcon size={22} />
                  <span>@duellebeauty</span>
                  <div style={{ fontSize: '0.62rem', padding: '0 8px', textAlign: 'center', opacity: 0.85 }}>
                    {post.caption}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </main>
  );
};
