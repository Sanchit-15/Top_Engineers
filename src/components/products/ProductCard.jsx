import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <article className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm hover:border-blue-500/60 transition-colors flex flex-col">
      <Link to={`/products/${product.slug}`} className="block aspect-[4/3] bg-slate-100">
        <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
      </Link>
      <div className="p-5 flex flex-col flex-1">
        <p className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">{product.category_name}</p>
        <Link to={`/products/${product.slug}`} className="mt-1 text-lg font-bold text-[#050B16] hover:text-blue-600">
          {product.name}
        </Link>
        <p className="mt-2 text-sm text-slate-600 line-clamp-3">{product.description}</p>
        <div className="mt-auto pt-5">
          <p className="text-sm font-bold text-slate-900">
            {product.show_price && typeof product.price === 'number'
              ? `₹${product.price.toLocaleString('en-IN')}*`
              : 'Price on Request'}
          </p>
          <p className="text-[10px] text-slate-400 mt-1">*Demonstration price; confirm with Top Engineers.</p>
          <div className="flex flex-wrap gap-2 mt-4">
            <button type="button" onClick={() => addToCart(product)} className="inline-flex items-center gap-2 rounded-[4px] bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700">
              <ShoppingCart className="w-4 h-4" /> Add to Cart
            </button>
            <Link to={`/products/${product.slug}`} className="inline-flex items-center gap-1 rounded-[4px] border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50">
              Details <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
