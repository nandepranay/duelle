import React, { useState, useEffect } from 'react';
import { Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';

const MESSAGES = [
  { text: "Complimentary Luxury Shipping on all orders above ₹1,999", highlight: "Complimentary" },
  { text: "New Launch: Cellular Dew Barrier Cream now available online", highlight: "New Launch" },
  { text: "Use code DUELLE10 for 10% off your introductory skincare ritual", highlight: "DUELLE10" },
  { text: "DUELLE — Thoughtfully formulated by Amruta and Janhavi", highlight: "DUELLE" }
];

export const AnnouncementBar = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const nextMessage = () => {
    setCurrentIndex((prev) => (prev + 1) % MESSAGES.length);
  };

  const prevMessage = () => {
    setCurrentIndex((prev) => (prev - 1 + MESSAGES.length) % MESSAGES.length);
  };

  const current = MESSAGES[currentIndex];

  return (
    <div className="announcement-bar" role="region" aria-label="Announcements">
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <button 
          onClick={prevMessage}
          aria-label="Previous announcement"
          style={{ opacity: 0.6, padding: '0 8px', color: '#FFF' }}
        >
          <ChevronLeft size={13} />
        </button>

        <div className="content" key={currentIndex} style={{ animation: 'fadeIn 0.4s ease' }}>
          <Sparkles size={11} color="#E2C992" />
          <span>{current.text}</span>
          <span className="nav-dot"></span>
          <span style={{ fontSize: '0.64rem', color: '#BFA8A0', letterSpacing: '0.1em' }}>DEMO OFFER</span>
        </div>

        <button 
          onClick={nextMessage}
          aria-label="Next announcement"
          style={{ opacity: 0.6, padding: '0 8px', color: '#FFF' }}
        >
          <ChevronRight size={13} />
        </button>
      </div>
    </div>
  );
};
