import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const STORAGE_KEY = 'duelle_cart_items_v1';
const FREE_SHIPPING_THRESHOLD = 1999;
const STANDARD_SHIPPING_FEE = 150;

export const CartProvider = ({ children }) => {
  // Navigation State
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'shop' | 'product' | 'about'
  const [selectedProductId, setSelectedProductId] = useState('prod-2');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');

  // Cart State (Persisted in LocalStorage)
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
    }
    // Default starter item for instant delight if user visits
    return [
      {
        id: "prod-2",
        name: "Radiance Peptide Elixir",
        price: 2650,
        originalPrice: 2950,
        image: "./images/prod_serum.jpg",
        category: "Serums",
        subtitle: "Multi-Peptide & Hyaluronic Concentrate",
        quantity: 1,
        size: "30 ml / 1.0 fl. oz."
      }
    ];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Promo code system
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null); // { code, discountPercent }
  const [promoError, setPromoError] = useState('');

  // Toast system
  const [toast, setToast] = useState(null); // { message, type: 'success' | 'info' | 'error' }

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3800);
  };

  const navigateTo = (page, options = {}) => {
    setCurrentPage(page);
    if (options.productId) {
      setSelectedProductId(options.productId);
    }
    if (options.category) {
      setSelectedCategoryFilter(options.category);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileNavOpen(false);
  };

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prev,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            image: product.image,
            category: product.category,
            subtitle: product.subtitle || '',
            size: product.size || '',
            quantity: quantity
          }
        ];
      }
    });
    showToast(`Added ${product.name} to your ritual bag`, 'success');
    setIsCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
    showToast('Item removed from your bag', 'info');
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev => prev.map(item => 
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const applyPromo = (codeToApply) => {
    const cleanCode = (codeToApply || promoCode).trim().toUpperCase();
    if (!cleanCode) {
      setPromoError('Please enter a promotion code');
      return;
    }
    if (cleanCode === 'DUELLE10') {
      setAppliedPromo({ code: 'DUELLE10', discountPercent: 10, label: '10% Launch Privilege' });
      setPromoError('');
      showToast('10% Launch Privilege Applied!', 'success');
    } else if (cleanCode === 'AMRUTA' || cleanCode === 'JANHAVI') {
      setAppliedPromo({ code: cleanCode, discountPercent: 15, label: '15% Founders VIP Invitation' });
      setPromoError('');
      showToast('15% Founders VIP Invitation Applied!', 'success');
    } else if (cleanCode === 'GLOW20') {
      setAppliedPromo({ code: 'GLOW20', discountPercent: 20, label: '20% Beauty Insider Gift' });
      setPromoError('');
      showToast('20% Beauty Insider Code Applied!', 'success');
    } else {
      setPromoError('Invalid promo code. Try DUELLE10 or AMRUTA');
    }
  };

  const removePromo = () => {
    setAppliedPromo(null);
    setPromoCode('');
    setPromoError('');
    showToast('Promo code removed', 'info');
  };

  // Calculations
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discountAmount = appliedPromo ? Math.round((subtotal * appliedPromo.discountPercent) / 100) : 0;
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingFee = subtotal === 0 ? 0 : (isFreeShipping ? 0 : STANDARD_SHIPPING_FEE);
  const total = Math.max(0, subtotal - discountAmount + shippingFee);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <CartContext.Provider
      value={{
        currentPage,
        selectedProductId,
        selectedCategoryFilter,
        navigateTo,
        setSelectedCategoryFilter,
        cartItems,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        isMobileNavOpen,
        setIsMobileNavOpen,
        quickViewProduct,
        setQuickViewProduct,
        isCheckoutOpen,
        setIsCheckoutOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        discountAmount,
        shippingFee,
        total,
        freeShippingProgress,
        amountToFreeShipping,
        FREE_SHIPPING_THRESHOLD,
        promoCode,
        setPromoCode,
        appliedPromo,
        promoError,
        applyPromo,
        removePromo,
        toast,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
