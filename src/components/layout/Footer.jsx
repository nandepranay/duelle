import React from 'react';
import { useCart } from '../../context/CartContext';
import { Mail, ArrowUpRight, ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react';
import { InstagramIcon, FacebookIcon, TwitterIcon } from '../ui/SocialIcons';

export const Footer = () => {
  const { navigateTo, showToast } = useCart();

  const handleInfoModal = (title) => {
    showToast(`${title} — Official brand policies are provided for review.`, 'info');
  };

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        
        {/* Top 4-Column Layout */}
        <div className="footer-top">
          
          {/* Brand Info */}
          <div className="footer-brand">
            <h2>DUELLE</h2>
            <p>
              Your Skin. Your Story. Discover everyday skincare essentials, thoughtfully chosen to make your routine feel like a ritual.
            </p>
            <div className="footer-social-links">
              <a 
                href="#instagram" 
                className="footer-social-icon" 
                aria-label="DUELLE Instagram"
                onClick={(e) => { e.preventDefault(); showToast('Opening @duellebeauty on Instagram', 'info'); }}
              >
                <InstagramIcon size={17} />
              </a>
              <a 
                href="#facebook" 
                className="footer-social-icon" 
                aria-label="DUELLE Facebook"
                onClick={(e) => { e.preventDefault(); showToast('Opening DUELLE on Facebook', 'info'); }}
              >
                <FacebookIcon size={17} />
              </a>
              <a 
                href="#twitter" 
                className="footer-social-icon" 
                aria-label="DUELLE Twitter / X"
                onClick={(e) => { e.preventDefault(); showToast('Opening DUELLE on X', 'info'); }}
              >
                <TwitterIcon size={17} />
              </a>
              <a 
                href="#mail" 
                className="footer-social-icon" 
                aria-label="Contact DUELLE Concierge"
                onClick={(e) => { e.preventDefault(); showToast('Concierge email: care@duelle.com', 'info'); }}
              >
                <Mail size={17} />
              </a>
            </div>
          </div>

          {/* Column 1: Shop */}
          <div className="footer-column">
            <h4>Shop Formulations</h4>
            <ul className="footer-links">
              <li><a onClick={() => navigateTo('shop', { category: 'all' })}>All Skincare</a></li>
              <li><a onClick={() => navigateTo('shop', { category: 'cleansers' })}>Gentle Cleansers</a></li>
              <li><a onClick={() => navigateTo('shop', { category: 'serums' })}>Active Serums</a></li>
              <li><a onClick={() => navigateTo('shop', { category: 'moisturizers' })}>Barrier Moisturizers</a></li>
              <li><a onClick={() => navigateTo('shop', { category: 'sunscreens' })}>Silk Sunscreens</a></li>
              <li><a onClick={() => navigateTo('shop', { category: 'lipcare' })}>Peptide Lip Glazes</a></li>
            </ul>
          </div>

          {/* Column 2: Discover & About */}
          <div className="footer-column">
            <h4>Our World</h4>
            <ul className="footer-links">
              <li><a onClick={() => navigateTo('about')}>About DUELLE</a></li>
              <li><a onClick={() => navigateTo('about')}>Amruta & Janhavi's Vision</a></li>
              <li><a onClick={() => handleInfoModal('The Ritual Guide')}>The Daily Ritual Guide</a></li>
              <li><a onClick={() => handleInfoModal('Clean Formulations')}>Ingredient Integrity</a></li>
              <li><a onClick={() => handleInfoModal('Sustainability')}>Glass Recyclability</a></li>
              <li><a onClick={() => handleInfoModal('Press')}>Vogue Editorial Features</a></li>
            </ul>
          </div>

          {/* Column 3: Customer Care & Legal */}
          <div className="footer-column">
            <h4>Customer Concierge</h4>
            <ul className="footer-links">
              <li><a onClick={() => handleInfoModal('Shipping Policy')}>Shipping & Delivery (Pan-India)</a></li>
              <li><a onClick={() => handleInfoModal('Returns')}>30-Day Hassle-Free Returns</a></li>
              <li><a onClick={() => handleInfoModal('FAQs')}>Frequently Asked Questions</a></li>
              <li><a onClick={() => handleInfoModal('Track Order')}>Track Your Ritual Order</a></li>
              <li><a onClick={() => handleInfoModal('Privacy Policy')}>Privacy Policy</a></li>
              <li><a onClick={() => handleInfoModal('Terms of Service')}>Terms & Conditions</a></li>
            </ul>
          </div>

        </div>

        {/* MANDATORY FOUNDERS SIGNATURE SECTION */}
        <div className="footer-signature-container">
          <div className="signature-box">
            <span className="signature-brand">DUELLE</span>
            <span className="signature-founders">Brought to you by Amruta and Janhavi.</span>
            <span className="signature-tagline">YOUR SKIN. YOUR STORY.</span>
          </div>
        </div>

        {/* Bottom Metadata Bar */}
        <div className="footer-bottom-bar">
          <div>
            © {new Date().getFullYear()} DUELLE Beauty Pvt. Ltd. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>INR (₹) India</span>
            <span>Handcrafted Clean Beauty</span>
            <span>Cruelty-Free International</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
