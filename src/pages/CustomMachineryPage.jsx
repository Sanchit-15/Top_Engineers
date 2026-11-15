import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ChevronRight, Upload } from 'lucide-react';
import { getStoredData, INITIAL_CUSTOM_REQUESTS, setStoredData, STORAGE_KEYS } from '../data/mockAdminData';

const EMPTY_FORM = { customer_name: '', company_name: '', phone: '', email: '', machinery_type: '', intended_application: '', dimensions_capacity: '', technical_requirements: '', quantity: '1', additional_notes: '' };
const inputClass = 'w-full rounded border border-slate-300 px-3 py-2.5 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600';

export default function CustomMachineryPage() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  function submit(event) {
    event.preventDefault();
    setError('');
    if (!event.currentTarget.reportValidity()) return;
    setBusy(true);
    try {
      const current = getStoredData(STORAGE_KEYS.CUSTOM_REQUESTS, INITIAL_CUSTOM_REQUESTS);
      setStoredData(STORAGE_KEYS.CUSTOM_REQUESTS, [{
        ...form, id: `cm-demo-${Date.now()}`, quantity: Number(form.quantity), file_name: file?.name || '', status: 'New Request', internal_notes: '', created_at: new Date().toISOString(),
      }, ...current]);
      setMessage('Your demonstration enquiry has been recorded in this browser only. It has not been sent to Top Engineers.');
      setForm(EMPTY_FORM);
      setFile(null);
      event.currentTarget.reset();
    } catch (submitError) {
      console.error('Could not save custom machinery enquiry:', submitError);
      setError('We could not save this demonstration enquiry. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  function update(event) { setForm((current) => ({ ...current, [event.target.name]: event.target.value })); }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900">
      <section className="bg-[#0A1628] text-white pt-32 pb-14"><div className="max-w-7xl mx-auto px-4 sm:px-6"><div className="flex items-center gap-2 text-xs text-slate-400 mb-3"><Link to="/">Home</Link><ChevronRight className="w-3 h-3" /><span className="text-blue-400">Custom Machinery</span></div><p className="text-blue-400 text-xs font-bold uppercase tracking-widest">Engineered to your requirements</p><h1 className="text-3xl sm:text-5xl font-black mt-2">Custom Machinery Enquiry</h1><p className="text-slate-300 mt-3 max-w-2xl">Share your application and technical requirements for a machinery enquiry. Reference drawings remain local in this demo.</p></div></section>
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <form onSubmit={submit} className="bg-white border border-slate-200 rounded-lg p-5 sm:p-8 space-y-6">
          <div className="grid sm:grid-cols-2 gap-5">
            {[['customer_name','Customer name','text'],['company_name','Company name','text'],['phone','Phone','tel'],['email','Email','email'],['machinery_type','Machinery type','text']].map(([name,label,type]) => <label key={name} className="text-sm font-semibold">{label}{name !== 'company_name' && <span className="text-red-600"> *</span>}<input className={`${inputClass} mt-1.5`} type={type} name={name} value={form[name]} onChange={update} required={name !== 'company_name'} /></label>)}
            <label className="text-sm font-semibold">Quantity <span className="text-red-600">*</span><input className={`${inputClass} mt-1.5`} type="number" name="quantity" min="1" value={form.quantity} onChange={update} required /></label>
          </div>
          {[['intended_application','Intended application'],['dimensions_capacity','Required dimensions / capacity'],['technical_requirements','Technical requirements'],['additional_notes','Additional notes']].map(([name,label]) => <label key={name} className="block text-sm font-semibold">{label}{name !== 'additional_notes' && <span className="text-red-600"> *</span>}<textarea className={`${inputClass} mt-1.5`} rows={name === 'technical_requirements' ? 4 : 3} name={name} value={form[name]} onChange={update} required={name !== 'additional_notes'} /></label>)}
          <label className="block text-sm font-semibold">Reference image or drawing (optional)<span className="mt-1.5 flex items-center gap-2 rounded border border-dashed border-slate-400 p-4 text-sm text-slate-600"><Upload className="w-4 h-4" /><input type="file" accept="image/*,.pdf,.dwg,.dxf" onChange={(event) => setFile(event.target.files?.[0] || null)} />{file?.name}</span><span className="mt-1 block text-xs text-slate-500">The selected file is not uploaded; only its name is kept in this browser demo.</span></label>
          {message && <p role="status" className="rounded bg-emerald-50 border border-emerald-200 p-3 text-sm text-emerald-800 flex gap-2"><CheckCircle2 className="w-5 h-5 shrink-0" />{message}</p>}
          {error && <p role="alert" className="rounded bg-red-50 border border-red-200 p-3 text-sm text-red-800">{error}</p>}
          <button disabled={busy} className="rounded bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-5 py-3 text-sm font-semibold text-white">{busy ? 'Submitting…' : 'Submit Machinery Enquiry'}</button>
        </form>
      </section>
    </div>
  );
}
