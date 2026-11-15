import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { cartItems, incrementQuantity, decrementQuantity, removeFromCart, clearCart, subtotal, hasPricedItems, hasUnpricedItems } = useCart();

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900">
      <section className="bg-[#0A1628] text-white pt-32 pb-14"><div className="max-w-7xl mx-auto px-4 sm:px-6"><p className="text-blue-400 text-xs font-bold uppercase tracking-widest">Procurement & Quotations</p><h1 className="text-3xl sm:text-5xl font-black mt-2">Quotation Request Cart</h1><p className="text-slate-300 mt-3">Review your selected machinery before requesting a quote.</p></div></section>
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {!cartItems.length ? (
          <div className="bg-white rounded-lg p-10 border border-slate-200 text-center shadow-sm">
            <ShoppingCart className="w-10 h-10 text-blue-600 mx-auto" /><h2 className="text-2xl font-bold mt-4">Your quote cart is empty</h2>
            <p className="text-slate-600 mt-2">Browse the catalogue to add machines to your request.</p>
            <Link to="/products" className="inline-flex items-center gap-2 mt-6 bg-blue-600 hover:bg-blue-700 text-white rounded px-5 py-3 font-semibold">Browse Products <ArrowRight className="w-4 h-4" /></Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_300px] gap-6 items-start">
            <div className="space-y-4">
              {cartItems.map((item) => <article key={item.id} className="bg-white border border-slate-200 rounded-lg p-4 sm:p-5 flex flex-col sm:flex-row gap-4">
                <img src={item.image_url} alt="" className="w-full sm:w-32 h-28 object-cover rounded bg-slate-100" />
                <div className="flex-1"><Link to={`/products/${item.slug}`} className="font-bold text-lg hover:text-blue-600">{item.name}</Link><p className="text-xs text-slate-500 mt-1">{item.category_name}</p><p className="font-semibold mt-3">{item.show_price && typeof item.price === 'number' ? `₹${item.price.toLocaleString('en-IN')}*` : 'Price on Request'}</p></div>
                <div className="flex items-center justify-between sm:flex-col sm:items-end gap-3">
                  <div className="flex items-center border border-slate-300 rounded"><button type="button" aria-label={`Decrease ${item.name} quantity`} onClick={() => decrementQuantity(item.id)} className="p-2 hover:bg-slate-100"><Minus className="w-4 h-4" /></button><span className="min-w-9 text-center text-sm font-semibold">{item.quantity}</span><button type="button" aria-label={`Increase ${item.name} quantity`} onClick={() => incrementQuantity(item.id)} className="p-2 hover:bg-slate-100"><Plus className="w-4 h-4" /></button></div>
                  <button type="button" onClick={() => removeFromCart(item.id)} className="inline-flex items-center gap-1 text-xs text-red-600 hover:text-red-800"><Trash2 className="w-4 h-4" /> Remove</button>
                </div>
              </article>)}
              <button type="button" onClick={clearCart} className="text-sm text-red-600 hover:text-red-800">Clear cart</button>
            </div>
            <aside className="bg-white border border-slate-200 rounded-lg p-5 sticky top-24">
              <h2 className="font-bold text-lg">Request summary</h2>
              <p className="flex justify-between mt-4 text-sm text-slate-600"><span>Items</span><span>{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span></p>
              {hasPricedItems && <p className="flex justify-between mt-3 text-sm"><span>Subtotal*</span><span className="font-bold">₹{subtotal.toLocaleString('en-IN')}</span></p>}
              {hasUnpricedItems && <p className="mt-3 text-sm text-slate-600">Some items are <strong>Price on Request</strong>.</p>}
              <p className="mt-4 text-[11px] text-slate-400">*Demonstration pricing only; final pricing requires confirmation.</p>
              <Link to="/checkout" className="mt-5 flex justify-center items-center gap-2 rounded bg-blue-600 hover:bg-blue-700 text-white py-3 font-semibold text-sm">Continue to Request Quote <ArrowRight className="w-4 h-4" /></Link>
            </aside>
          </div>
        )}
      </section>
    </div>
  );
}
