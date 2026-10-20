import React from 'react';
import { useCart } from '../../context/CartContext';
import { Sparkles, CheckCircle2, Info, AlertCircle } from 'lucide-react';

export const Toast = () => {
  const { toast } = useCart();

  if (!toast) return null;

  return (
    <div className="toast-container" role="status" aria-live="polite">
      <div className="toast-message">
        {toast.type === 'success' && <CheckCircle2 size={16} color="#E2C992" />}
        {toast.type === 'info' && <Info size={16} color="#DFC48A" />}
        {toast.type === 'error' && <AlertCircle size={16} color="#E07A5F" />}
        <span>{toast.message}</span>
      </div>
    </div>
  );
};
