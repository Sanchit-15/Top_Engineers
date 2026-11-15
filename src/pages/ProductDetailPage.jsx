import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ShoppingCart } from 'lucide-react';
import { INITIAL_PRODUCTS } from '../data/productsData';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/products/ProductCard';
import NotFoundPage from './NotFoundPage';
import { getStoredData, STORAGE_KEYS } from '../data/mockAdminData';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const [products] = useState(() => getStoredData(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS));
  const product = products.find((item) => item.slug === slug && item.status === 'published');
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  if (!product) return <NotFoundPage />;
  const related = products.filter((item) => item.category_id === product.category_id && item.id !== product.id && item.status === 'published').slice(0, 3);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900">
      <section className="bg-[#0A1628] text-white pt-32 pb-12"><div className="max-w-7xl mx-auto px-4 sm:px-6"><Link to="/products" className="inline-flex items-center gap-2 text-sm text-blue-300 hover:text-white"><ArrowLeft className="w-4 h-4" /> All products</Link><p className="text-blue-400 text-xs font-bold uppercase tracking-widest mt-5">{product.category_name}</p><h1 className="text-3xl sm:text-5xl font-black mt-2">{product.name}</h1></div></section>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid lg:grid-cols-2 gap-10 bg-white rounded-lg border border-slate-200 p-5 sm:p-8">
          <img src={product.image_url} alt={product.name} className="w-full aspect-[4/3] object-cover rounded bg-slate-100" />
          <div>
            <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">{product.category_name}</p>
            <h2 className="text-2xl font-bold mt-2">{product.name}</h2>
            <p className="text-slate-600 leading-relaxed mt-4">{product.description}</p>
            <div className="mt-5 flex flex-wrap gap-3 text-sm"><span className="bg-slate-100 px-3 py-1.5 rounded">Availability: <strong>{product.availability}</strong></span><span className="bg-slate-100 px-3 py-1.5 rounded">{product.show_price && typeof product.price === 'number' ? `₹${product.price.toLocaleString('en-IN')}*` : 'Price on Request'}</span></div>
            {product.specifications && <div className="mt-7"><h3 className="font-bold text-lg">Specifications</h3><dl className="mt-3 divide-y divide-slate-200 border-y border-slate-200">{Object.entries(product.specifications).map(([label, value]) => <div key={label} className="grid grid-cols-2 gap-4 py-2.5 text-sm"><dt className="text-slate-500">{label}</dt><dd className="font-medium">{value}</dd></div>)}</dl></div>}
            <p className="mt-4 text-xs text-slate-400">Demonstration catalogue information only. Specifications, availability and any displayed price are indicative and require confirmation.</p>
            <div className="flex flex-wrap items-center gap-3 mt-6">
              <label className="text-sm font-semibold">Quantity <input type="number" min="1" step="1" value={quantity} onChange={(event) => setQuantity(Math.max(1, Number(event.target.value) || 1))} className="ml-2 w-20 border border-slate-300 rounded px-2 py-2" /></label>
              <button type="button" onClick={() => addToCart(product, quantity)} className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2.5 text-sm font-semibold"><ShoppingCart className="w-4 h-4" /> Add to Cart</button>
              <Link to="/checkout" onClick={() => addToCart(product, quantity)} className="inline-flex items-center gap-2 border border-slate-300 hover:bg-slate-50 rounded px-4 py-2.5 text-sm font-semibold">Request a Quote <ArrowRight className="w-4 h-4" /></Link>
            </div>
          </div>
        </div>
        {related.length > 0 && <section className="mt-12"><h2 className="text-2xl font-bold">Related products</h2><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">{related.map((item) => <ProductCard key={item.id} product={item} />)}</div></section>}
      </main>
    </div>
  );
}
