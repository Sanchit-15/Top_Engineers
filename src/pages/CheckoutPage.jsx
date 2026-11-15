import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getStoredData, INITIAL_ORDERS, setStoredData, STORAGE_KEYS } from '../data/mockAdminData';

const inputClass = 'w-full rounded border border-slate-300 px-3 py-2.5 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600';
const FIELDS = [['customer_name','Customer name','text',true],['phone','Phone','tel',true],['email','Email','email',true],['company_name','Company name','text',false],['billing_address','Billing address','textarea',false],['delivery_address','Delivery address','textarea',false],['notes','Additional requirements','textarea',false]];

export default function CheckoutPage() {
  const { cartItems, clearCart, subtotal, hasPricedItems, hasUnpricedItems } = useCart();
  const [form, setForm] = useState({ customer_name:'', phone:'', email:'', company_name:'', billing_address:'', delivery_address:'', notes:'' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [confirmation, setConfirmation] = useState('');
  if (!cartItems.length && !confirmation) return <Navigate to="/cart" replace />;

  function submit(event) {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    setSubmitting(true); setError('');
    try {
      const requestNumber = `DEMO-${Date.now()}`;
      const previous = getStoredData(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
      setStoredData(STORAGE_KEYS.ORDERS, [{
        ...form, id: requestNumber, order_number: requestNumber, status: 'New Request', internal_notes: '', created_at: new Date().toISOString(),
        items: cartItems.map((item) => ({ product_id: item.id, product_name: item.name, quantity: item.quantity, unit_price: item.show_price ? item.price : null })),
      }, ...previous]);
      clearCart();
      setConfirmation(requestNumber);
    } catch (submitError) {
      console.error('Could not save quote request:', submitError);
      setError('We could not save this demonstration request. Your cart is unchanged; please try again.');
    } finally { setSubmitting(false); }
  }

  return <div className="min-h-screen bg-[#F8FAFC] text-slate-900">
    <section className="bg-[#0A1628] text-white pt-32 pb-14"><div className="max-w-7xl mx-auto px-4 sm:px-6"><p className="text-blue-400 text-xs font-bold uppercase tracking-widest">No online payment</p><h1 className="text-3xl sm:text-5xl font-black mt-2">{confirmation ? 'Request Recorded' : 'Request a Quote'}</h1><p className="text-slate-300 mt-3">Submit your contact details and requirements for a quotation.</p></div></section>
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {confirmation ? <div className="bg-white rounded-lg border border-emerald-200 p-8 text-center"><CheckCircle2 className="w-12 h-12 mx-auto text-emerald-600" /><h2 className="mt-4 text-2xl font-bold">Demonstration request {confirmation}</h2><p className="mt-2 text-slate-600">Saved in this browser only; this request was not sent to Top Engineers.</p><Link to="/products" className="inline-block mt-6 bg-blue-600 text-white rounded px-5 py-3 font-semibold">Continue Browsing</Link></div> :
      <div className="grid lg:grid-cols-[1fr_340px] gap-8 items-start">
        <form onSubmit={submit} className="bg-white border border-slate-200 rounded-lg p-5 sm:p-8 space-y-5">
          <h2 className="text-xl font-bold">Your details</h2>
          <div className="grid sm:grid-cols-2 gap-5">{FIELDS.map(([name,label,type,required]) => <label key={name} className={`text-sm font-semibold ${type === 'textarea' ? 'sm:col-span-2' : ''}`}>{label}{required && <span className="text-red-600"> *</span>}{type === 'textarea' ? <textarea className={`${inputClass} mt-1.5`} rows={3} name={name} value={form[name]} onChange={(event) => setForm({ ...form, [name]:event.target.value })} required={required} /> : <input className={`${inputClass} mt-1.5`} type={type} name={name} value={form[name]} onChange={(event) => setForm({ ...form, [name]:event.target.value })} required={required} pattern={name === 'phone' ? '[0-9+() -]{8,20}' : undefined} />}</label>)}</div>
          {error && <p role="alert" className="p-3 rounded bg-red-50 text-red-800 text-sm">{error}</p>}
          <p className="text-xs text-slate-500">Demonstration only: submission is stored in this browser and does not contact the business.</p>
          <button disabled={submitting} className="rounded bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-5 py-3 text-sm font-semibold text-white">{submitting ? 'Submitting…' : 'Submit Quote Request'}</button>
        </form>
        <aside className="bg-white border border-slate-200 rounded-lg p-5"><h2 className="font-bold text-lg">Selected products</h2><ul className="mt-4 space-y-4">{cartItems.map((item) => <li key={item.id} className="flex justify-between gap-3 text-sm"><span>{item.name}<span className="block text-slate-500">Qty: {item.quantity}</span></span><span className="text-right font-medium">{item.show_price ? `₹${(item.price * item.quantity).toLocaleString('en-IN')}` : 'Price on Request'}</span></li>)}</ul>{hasPricedItems && <p className="flex justify-between border-t mt-4 pt-4 text-sm"><span>Priced items subtotal*</span><strong>₹{subtotal.toLocaleString('en-IN')}</strong></p>}{hasUnpricedItems && <p className="mt-2 text-xs text-slate-600">Some items are Price on Request.</p>}</aside>
      </div>}
    </main>
  </div>;
}
