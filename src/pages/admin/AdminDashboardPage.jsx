import React, { useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { BarChart3, Boxes, ClipboardList, FileText, Globe2, LogOut, Menu, Package, Settings, Wrench, X } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { INITIAL_CATEGORIES } from '../../data/categoriesData';
import { INITIAL_PRODUCTS } from '../../data/productsData';
import {
  getStoredData, INITIAL_CUSTOM_REQUESTS, INITIAL_ENQUIRIES, INITIAL_ORDERS, INITIAL_SITE_CONTENT,
  setStoredData, STORAGE_KEYS,
} from '../../data/mockAdminData';

const TAB_ITEMS = [
  ['Overview', BarChart3], ['Products', Package], ['Categories', Boxes], ['Enquiries', ClipboardList],
  ['Orders / Quote Requests', FileText], ['Custom Machinery Requests', Wrench], ['Website Content', Globe2], ['Settings', Settings],
];
const input = 'w-full rounded border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-600';
const select = `${input} bg-white`;

function useDemoData(key, initial) {
  const [data, setData] = useState(() => getStoredData(key, initial));
  function save(next) {
    setData(next);
    setStoredData(key, next);
  }
  return [data, save];
}

function RecordList({ records, statusOptions, onChange, notes = true }) {
  return <div className="space-y-4">{records.length === 0 && <p className="rounded border border-dashed p-6 text-sm text-slate-500">No demonstration records yet.</p>}
    {records.map((record) => <article key={record.id} className="rounded-lg border border-slate-200 bg-white p-4 sm:p-5">
      <div className="flex flex-col sm:flex-row sm:justify-between gap-3"><div><h3 className="font-bold text-slate-900">{record.subject || record.order_number || record.machinery_type || record.customer_name}</h3><p className="text-sm text-slate-600 mt-1">{record.customer_name}{record.company_name ? ` · ${record.company_name}` : ''}</p><p className="text-xs text-slate-500 mt-1">{record.email || 'Email not provided'}{record.phone ? ` · ${record.phone}` : ''} · {record.created_at ? new Date(record.created_at).toLocaleDateString() : ''}</p></div>
        <label className="text-xs font-semibold text-slate-600">Status<select value={record.status || statusOptions[0]} onChange={(event) => onChange(record.id, { status: event.target.value })} className={`${select} mt-1 min-w-40`}>{statusOptions.map((status) => <option key={status}>{status}</option>)}</select></label>
      </div>
      {record.message && <p className="mt-4 text-sm text-slate-700 whitespace-pre-wrap">{record.message}</p>}
      {record.items && <ul className="mt-3 list-disc pl-5 text-sm text-slate-700">{record.items.map((item, index) => <li key={`${item.product_id || item.product_name}-${index}`}>{item.product_name} — Qty {item.quantity}{item.unit_price ? ` · ₹${Number(item.unit_price).toLocaleString('en-IN')}` : ' · Price on Request'}</li>)}</ul>}
      {(record.dimensions_capacity || record.intended_application || record.technical_requirements || record.notes) && <div className="mt-3 space-y-1 text-sm text-slate-700">{record.intended_application && <p><strong>Application:</strong> {record.intended_application}</p>}{record.dimensions_capacity && <p><strong>Dimensions / capacity:</strong> {record.dimensions_capacity}</p>}{record.technical_requirements && <p><strong>Technical requirements:</strong> {record.technical_requirements}</p>}{record.notes && <p><strong>Requirements:</strong> {record.notes}</p>}{record.file_name && <p><strong>Reference file:</strong> {record.file_name} (not uploaded)</p>}</div>}
      {notes && <label className="mt-4 block text-xs font-semibold text-slate-600">Internal notes<textarea rows="2" value={record.internal_notes || ''} onChange={(event) => onChange(record.id, { internal_notes: event.target.value })} className={`${input} mt-1`} placeholder="Private demo notes" /></label>}
    </article>)}
  </div>;
}

export default function AdminDashboardPage() {
  const { isAdminLoggedIn, adminUser, logout } = useAdminAuth();
  const [tab, setTab] = useState('Overview');
  const [mobileMenu, setMobileMenu] = useState(false);
  const [products, saveProducts] = useDemoData(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
  const [categories, saveCategories] = useDemoData(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
  const [enquiries, saveEnquiries] = useDemoData(STORAGE_KEYS.ENQUIRIES, INITIAL_ENQUIRIES);
  const [orders, saveOrders] = useDemoData(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
  const [customRequests, saveCustomRequests] = useDemoData(STORAGE_KEYS.CUSTOM_REQUESTS, INITIAL_CUSTOM_REQUESTS);
  const [content, saveContent] = useDemoData(STORAGE_KEYS.CONTENT, INITIAL_SITE_CONTENT);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryDraft, setCategoryDraft] = useState({ name: '', description: '' });
  const [notice, setNotice] = useState('');
  const published = products.filter((item) => item.status === 'published').length;
  const drafts = products.filter((item) => item.status !== 'published').length;
  const pending = orders.filter((item) => !['Confirmed', 'Closed'].includes(item.status)).length + customRequests.filter((item) => !['Completed', 'Closed'].includes(item.status)).length;
  const stats = useMemo(() => [['Total products', products.length], ['Published products', published], ['Draft products', drafts], ['New enquiries', enquiries.filter((item) => item.status === 'New').length], ['Pending requests', pending]], [products, published, drafts, enquiries, pending]);

  if (!isAdminLoggedIn) return <Navigate to="/admin/login" replace />;
  function changeRecord(records, save, id, updates) { save(records.map((record) => record.id === id ? { ...record, ...updates } : record)); }
  function submitProduct(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const category = categories.find((item) => item.id === formData.get('category_id'));
    const name = String(formData.get('name')).trim();
    const product = {
      id: editingProduct?.id || `prod-demo-${Date.now()}`, name,
      slug: editingProduct?.slug || `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}-${Date.now()}`,
      category_id: category.id, category_name: category.name, description: String(formData.get('description')).trim(),
      price: formData.get('price') ? Number(formData.get('price')) : null, show_price: formData.get('show_price') === 'true',
      availability: String(formData.get('availability')), image_url: String(formData.get('image_url')).trim(),
      status: String(formData.get('status')), is_featured: false, is_sample: true, specifications: editingProduct?.specifications || {},
    };
    saveProducts(editingProduct ? products.map((item) => item.id === product.id ? product : item) : [product, ...products]);
    setEditingProduct(null); setNotice(`Demo product ${editingProduct ? 'updated' : 'added'} in this browser.`);
    event.currentTarget.reset();
  }
  function updateContent(group, field, value) { saveContent({ ...content, [group]: { ...content[group], [field]: value } }); }

  const navigation = <nav className="space-y-1">{TAB_ITEMS.map(([name, Icon]) => <button key={name} onClick={() => { setTab(name); setMobileMenu(false); }} className={`w-full flex items-center gap-3 rounded px-3 py-2.5 text-left text-sm ${tab === name ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-white/5'}`}><Icon className="w-4 h-4" />{name}</button>)}</nav>;

  return <div className="min-h-screen bg-slate-100 text-slate-900 lg:flex">
    <aside className="hidden lg:flex lg:w-64 lg:flex-col bg-[#0A1628] p-5 text-white"><div className="font-black text-lg mb-1">TOP ENGINEERS</div><p className="text-xs text-slate-400 mb-8">Demo admin workspace</p>{navigation}<div className="mt-auto pt-6 border-t border-slate-700 text-xs text-slate-400">{adminUser?.email}<button onClick={logout} className="mt-3 flex items-center gap-2 text-white hover:text-blue-300"><LogOut className="w-4 h-4" /> Sign out</button></div></aside>
    <div className="min-w-0 flex-1">
      <header className="sticky top-0 z-10 flex items-center justify-between bg-white border-b border-slate-200 px-4 sm:px-7 py-4"><div className="flex items-center gap-3"><button className="lg:hidden p-2" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Toggle admin menu">{mobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button><div><h1 className="font-bold text-lg">{tab}</h1><p className="text-xs text-slate-500">Demonstration data · stored in this browser only</p></div></div><button onClick={logout} className="lg:hidden text-sm text-slate-600">Sign out</button></header>
      {mobileMenu && <div className="lg:hidden bg-[#0A1628] p-4">{navigation}</div>}
      <main className="p-4 sm:p-7 max-w-7xl">
        <div className="mb-5 rounded border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">Demo dashboard: updates are local to this browser and are not persistent backend records.</div>
        {notice && <div role="status" className="mb-5 rounded border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">{notice}<button className="ml-3 underline" onClick={() => setNotice('')}>Dismiss</button></div>}
        {tab === 'Overview' && <><div className="grid sm:grid-cols-2 xl:grid-cols-5 gap-4">{stats.map(([label,value]) => <div key={label} className="rounded-lg border border-slate-200 bg-white p-5"><p className="text-sm text-slate-500">{label}</p><p className="text-3xl font-black mt-2">{value}</p></div>)}</div><div className="mt-6 grid lg:grid-cols-2 gap-6"><section className="bg-white rounded-lg border p-5"><h2 className="font-bold mb-4">Recent enquiries</h2><RecordList records={enquiries.slice(0,2)} fields={[]} statusOptions={['New','In Progress','Resolved']} onChange={(id, updates) => changeRecord(enquiries, saveEnquiries, id, updates)} notes={false} /></section><section className="bg-white rounded-lg border p-5"><h2 className="font-bold mb-4">Recent quote requests</h2><RecordList records={orders.slice(0,2)} fields={[]} statusOptions={['New Request','Reviewing','Quotation Sent','Confirmed','Closed']} onChange={(id, updates) => changeRecord(orders, saveOrders, id, updates)} notes={false} /></section></div></>}

        {tab === 'Products' && <div className="grid xl:grid-cols-[minmax(0,1fr)_360px] gap-6 items-start"><section className="space-y-3">{products.map((product) => <article key={product.id} className="flex flex-col sm:flex-row gap-4 rounded-lg border bg-white p-4"><img src={product.image_url} alt="" className="w-full sm:w-28 h-24 object-cover rounded bg-slate-100" /><div className="flex-1"><h3 className="font-bold">{product.name}</h3><p className="text-xs text-slate-500 mt-1">{product.category_name} · {product.availability} · {product.status}</p><p className="text-sm mt-2">{product.show_price ? `₹${Number(product.price).toLocaleString('en-IN')}` : 'Price on Request'}</p></div><div className="flex gap-2 self-start"><button onClick={() => setEditingProduct(product)} className="text-sm text-blue-700 underline">Edit</button><button onClick={() => { if (window.confirm(`Delete ${product.name} from this demo catalogue?`)) saveProducts(products.filter((item) => item.id !== product.id)); }} className="text-sm text-red-600 underline">Delete</button></div></article>)}</section>
          <form onSubmit={submitProduct} className="rounded-lg border bg-white p-5 space-y-3"><h2 className="font-bold">{editingProduct ? 'Edit product' : 'Add product'}</h2><label className="block text-xs font-semibold">Name<input required name="name" defaultValue={editingProduct?.name || ''} className={`${input} mt-1`} /></label><label className="block text-xs font-semibold">Category<select required name="category_id" defaultValue={editingProduct?.category_id || categories[0]?.id} className={`${select} mt-1`}>{categories.map((item) => <option value={item.id} key={item.id}>{item.name}</option>)}</select></label><label className="block text-xs font-semibold">Description<textarea required name="description" rows="3" defaultValue={editingProduct?.description || ''} className={`${input} mt-1`} /></label><label className="block text-xs font-semibold">Price (optional)<input type="number" min="0" name="price" defaultValue={editingProduct?.price ?? ''} className={`${input} mt-1`} /></label><label className="flex items-center gap-2 text-xs"><input type="checkbox" name="show_price" value="true" defaultChecked={Boolean(editingProduct?.show_price)} /> Show demo price</label><label className="block text-xs font-semibold">Availability<select name="availability" defaultValue={editingProduct?.availability || 'Available on Request'} className={`${select} mt-1`}><option>In Stock</option><option>Built to Order</option><option>Available on Request</option></select></label><label className="block text-xs font-semibold">Image path<input required name="image_url" defaultValue={editingProduct?.image_url || '/images/categories/lathe-machines.jpg'} className={`${input} mt-1`} /></label><label className="block text-xs font-semibold">Status<select name="status" defaultValue={editingProduct?.status || 'draft'} className={`${select} mt-1`}><option value="draft">Draft</option><option value="published">Published</option></select></label><div className="flex gap-2"><button className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white">{editingProduct ? 'Save changes' : 'Add demo product'}</button>{editingProduct && <button type="button" onClick={() => setEditingProduct(null)} className="text-sm underline">Cancel</button>}</div></form></div>}

        {tab === 'Categories' && <div className="grid lg:grid-cols-2 gap-6 items-start"><div className="space-y-3">{categories.map((category) => <article key={category.id} className="bg-white border rounded p-4 flex justify-between gap-4"><div><h3 className="font-bold">{category.name}</h3><p className="text-sm text-slate-600 mt-1">{category.description}</p></div><div className="flex gap-3"><button className="text-sm text-blue-700 underline" onClick={() => { setEditingCategory(category); setCategoryDraft({ name: category.name, description: category.description }); }}>Edit</button><button className="text-sm text-red-600" onClick={() => { if (products.some((item) => item.category_id === category.id)) { setNotice('A category assigned to products cannot be removed in this demo.'); return; } saveCategories(categories.filter((item) => item.id !== category.id)); }}>Remove</button></div></article>)}</div><form onSubmit={(event) => { event.preventDefault(); const slug = categoryDraft.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'); if (editingCategory) { saveCategories(categories.map((item) => item.id === editingCategory.id ? { ...item, name: categoryDraft.name, slug, description: categoryDraft.description } : item)); setNotice('Demo category updated in this browser.'); } else { const id = `cat-demo-${Date.now()}`; saveCategories([...categories, { id, name: categoryDraft.name, slug, description: categoryDraft.description, display_order: categories.length + 1 }]); setNotice('Demo category added in this browser.'); } setEditingCategory(null); setCategoryDraft({ name: '', description: '' }); }} className="bg-white border rounded p-5 space-y-3"><h2 className="font-bold">{editingCategory ? 'Edit category' : 'Add category'}</h2><input required placeholder="Category name" value={categoryDraft.name} onChange={(event) => setCategoryDraft({ ...categoryDraft, name:event.target.value })} className={input} /><textarea required placeholder="Description" value={categoryDraft.description} onChange={(event) => setCategoryDraft({ ...categoryDraft, description:event.target.value })} className={input} /><div className="flex gap-3"><button className="bg-blue-600 text-white rounded px-4 py-2 text-sm">{editingCategory ? 'Save category' : 'Add category'}</button>{editingCategory && <button type="button" className="text-sm underline" onClick={() => { setEditingCategory(null); setCategoryDraft({ name: '', description: '' }); }}>Cancel</button>}</div></form></div>}

        {tab === 'Enquiries' && <RecordList records={enquiries} statusOptions={['New','In Progress','Resolved']} onChange={(id, updates) => changeRecord(enquiries, saveEnquiries, id, updates)} />}
        {tab === 'Orders / Quote Requests' && <RecordList records={orders} statusOptions={['New Request','Reviewing','Quotation Sent','Confirmed','Closed']} onChange={(id, updates) => changeRecord(orders, saveOrders, id, updates)} />}
        {tab === 'Custom Machinery Requests' && <RecordList records={customRequests} statusOptions={['New Request','Under Review','Feasibility Check','Quotation Sent','Completed','Closed']} onChange={(id, updates) => changeRecord(customRequests, saveCustomRequests, id, updates)} />}

        {tab === 'Website Content' && <div className="grid lg:grid-cols-2 gap-5">{[['hero','eyebrow','Home hero eyebrow'],['hero','title','Home hero title'],['hero','subtitle','Home hero description'],['about','overview','About page overview'],['contact','address','Contact address'],['custom_section','title','Custom machinery section title'],['custom_section','subtitle','Custom machinery section description'],['gallery','title','Gallery title'],['gallery','description','Gallery description / image disclosure']].map(([group,field,label]) => <label key={`${group}-${field}`} className="block text-sm font-semibold">{label}<textarea rows={field === 'subtitle' || field === 'overview' || field === 'description' ? 3 : 2} value={content[group]?.[field] || ''} onChange={(event) => updateContent(group, field, event.target.value)} className={`${input} mt-1`} /></label>)}<p className="lg:col-span-2 text-xs text-slate-500">Content fields are stored locally for this admin demo; public pages use their existing static copy until backend integration.</p></div>}
        {tab === 'Settings' && <section className="max-w-2xl bg-white border rounded-lg p-5"><h2 className="font-bold text-lg">Demonstration settings</h2><p className="text-sm text-slate-600 mt-3">Admin session and management data are stored in this browser only. Clearing local browser storage resets this demo. No authentication, cloud storage, mail, or API integrations are active.</p><button onClick={() => { logout(); }} className="mt-5 inline-flex items-center gap-2 rounded bg-[#0A1628] px-4 py-2.5 text-sm font-semibold text-white"><LogOut className="w-4 h-4" /> Sign out</button></section>}
      </main>
    </div>
  </div>;
}
