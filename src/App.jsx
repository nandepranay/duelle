import React from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { MobileDrawer } from './components/layout/MobileDrawer';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/cart/CheckoutModal';
import { QuickViewModal } from './components/product/QuickViewModal';
import { SearchModal } from './components/search/SearchModal';
import { Toast } from './components/ui/Toast';

import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AboutPage } from './pages/AboutPage';

import './App.css';

const MainContent = () => {
  const { currentPage } = useCart();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AnnouncementBar />
      <Navbar />

      <div style={{ flex: 1 }}>
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'shop' && <ShopPage />}
        {currentPage === 'product' && <ProductDetailPage />}
        {currentPage === 'about' && <AboutPage />}
      </div>

      <Footer />

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <MobileDrawer />
      <QuickViewModal />
      <SearchModal />
      <CheckoutModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <MainContent />
    </CartProvider>
  );
}
