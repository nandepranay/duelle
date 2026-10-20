import React from 'react';
import { useCart } from '../context/CartContext';
import { Sparkles, Heart, Droplets, Leaf, ArrowRight, ShieldCheck } from 'lucide-react';

export const AboutPage = () => {
  const { navigateTo } = useCart();

  return (
    <div className="fade-in" style={{ paddingBottom: '6rem' }}>
      
      {/* Editorial Hero */}
      <section className="about-hero">
        <div className="container">
          <span className="eyebrow">The DUELLE Story</span>
          <h1>Your Skin. Your Story.</h1>
          <p>
            DUELLE was founded with a single, uncompromising intention: to transform the rush of daily skincare into a grounding, sensorial ritual.
          </p>
        </div>
      </section>

      {/* Brand Vision Section */}
      <section className="section-padding" style={{ backgroundColor: '#FCFAF8' }}>
        <div className="container-narrow">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="eyebrow">Our Vision</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', fontWeight: 400, marginBottom: '1.25rem', lineHeight: 1.2 }}>
              Skincare Reimagined as an Everyday Ritual
            </h2>
            <p style={{ fontSize: '1.08rem', color: 'var(--color-text-secondary)', lineHeight: 1.8, fontWeight: 300 }}>
              In a world flooded with complicated 12-step routines and overpromising formulas, DUELLE offers an edit of essential skincare. We formulate high-potency, barrier-loving treatments that do not demand hours of your time — simply presence, consistency, and care.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', margin: '3rem 0' }}>
            <div style={{ background: '#FFFFFF', padding: '2rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border-light)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ color: '#B8735C', marginBottom: '0.75rem' }}>
                <Droplets size={24} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', marginBottom: '0.5rem' }}>Skin-First Formulation</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                Every elixir, cleanser, and cream is calibrated to match the natural pH and lipid structure of the skin, strengthening the acid mantle while optimizing active absorption.
              </p>
            </div>

            <div style={{ background: '#FFFFFF', padding: '2rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border-light)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ color: '#B8735C', marginBottom: '0.75rem' }}>
                <Leaf size={24} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', marginBottom: '0.5rem' }}>Conscious Luxury</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                From our heavy frosted glass flacons to 100% cruelty-free sourcing, we create beauty that feels good in your hands, on your skin, and for the world around us.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founders Section: Amruta & Janhavi */}
      <section className="founders-section" style={{ backgroundColor: '#F8F1EB' }}>
        <div className="container">
          <div className="founders-grid">
            
            {/* Founders Image */}
            <div className="founders-media">
              <img 
                src="./images/campaign_skinday.jpg" 
                alt="Amruta and Janhavi, Founders of DUELLE"
              />
            </div>

            {/* Founders Note */}
            <div className="founders-content">
              <span className="eyebrow">The Creators</span>
              <h2>Brought to You by Amruta and Janhavi</h2>
              
              <p>
                DUELLE began in our conversations about modern beauty. We were searching for formulations that felt indulgent yet effortless — skincare that elevated our mornings without overwhelming our days.
              </p>

              <p>
                Together, we set out to build a brand that bridges international cosmetic refinement with deep barrier care. Every formula under the DUELLE name has been developed with uncompromising attention to skin harmony, sensorial texture, and timeless elegance.
              </p>

              <p>
                Our promise to you is simple: skincare that honors your individuality, nurtures your confidence, and reminds you that your skin has a story worth celebrating.
              </p>

              {/* Elegant Signature Seal */}
              <div className="founders-signature-seal">
                <div className="founders-names">Amruta & Janhavi</div>
                <div style={{ fontSize: '0.74rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                  Founders, DUELLE
                </div>
              </div>

              <div style={{ marginTop: '2.5rem' }}>
                <button 
                  className="btn btn-primary"
                  onClick={() => navigateTo('shop', { category: 'all' })}
                >
                  DISCOVER OUR FORMULATIONS <ArrowRight size={15} />
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Editorial Quote Banner */}
      <section style={{ padding: '6rem 0', textAlign: 'center', backgroundColor: '#FCFAF8' }}>
        <div className="container-narrow">
          <Sparkles size={28} color="#B8735C" style={{ marginBottom: '1.25rem' }} />
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontStyle: 'italic', fontWeight: 400, color: 'var(--color-text-primary)', lineHeight: 1.35, marginBottom: '1.5rem' }}>
            "When skincare becomes a ritual, you stop trying to fix your skin and start learning to love it."
          </h2>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#B8735C' }}>
            DUELLE — Your Skin. Your Story.
          </div>
        </div>
      </section>

    </div>
  );
};
