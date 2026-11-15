import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, CheckCircle, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function Toast() {
  const { toast, dismissToast, totalItemsCount } = useCart();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-[#132238] border border-blue-500/60 rounded-lg p-4 shadow-2xl shadow-blue-900/30 text-white animate-in slide-in-from-bottom duration-200">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-[4px] bg-blue-600/20 border border-blue-500 flex items-center justify-center shrink-0 text-blue-400 mt-0.5">
          <CheckCircle className="w-4 h-4" />
        </div>

        <div className="flex-1 text-left">
          <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider block">
            Quote Cart Updated
          </span>
          <p className="text-xs text-slate-200 mt-0.5 leading-relaxed font-medium">
            {toast}
          </p>

          <div className="mt-3 flex items-center gap-3">
            <Link
              to="/cart"
              onClick={dismissToast}
              className="text-xs font-semibold text-blue-400 hover:text-blue-300 underline inline-flex items-center gap-1"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>View Cart ({totalItemsCount})</span>
            </Link>
            <span className="text-slate-600">•</span>
            <Link
              to="/checkout"
              onClick={dismissToast}
              className="text-xs font-semibold text-slate-300 hover:text-white"
            >
              Request Quote →
            </Link>
          </div>
        </div>

        <button
          type="button"
          onClick={dismissToast}
          className="text-slate-400 hover:text-white p-1 rounded hover:bg-white/5 transition-colors cursor-pointer"
          aria-label="Dismiss toast"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
