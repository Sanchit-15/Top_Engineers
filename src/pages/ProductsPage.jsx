import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Search } from 'lucide-react';
import { INITIAL_PRODUCTS } from '../data/productsData';
import { INITIAL_CATEGORIES } from '../data/categoriesData';
import ProductCard from '../components/products/ProductCard';
import { getStoredData, STORAGE_KEYS } from '../data/mockAdminData';

export default function ProductsPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [catalogue] = useState(() => getStoredData(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS));
  const [categories] = useState(() => getStoredData(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES));
  const products = useMemo(() => catalogue.filter((product) => {
    const matchesText = `${product.name} ${product.category_name} ${product.description}`.toLowerCase().includes(search.toLowerCase());
    return product.status === 'published' && matchesText && (category === 'all' || product.category_id === category);
  }), [catalogue, search, category]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900">
      <section className="bg-[#0A1628] text-white pt-32 pb-16 border-b border-[#1E3554]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-3"><Link to="/" className="hover:text-blue-400">Home</Link><ChevronRight className="w-3.5 h-3.5" /><span className="text-blue-400">Products</span></div>
          <span className="text-blue-500 text-xs font-bold uppercase tracking-widest">Industrial Machinery Catalog</span>
          <h1 className="text-3xl sm:text-5xl font-black mt-1">Machinery & Machine Tools</h1>
          <p className="text-slate-300 mt-3 max-w-2xl">Explore the demonstration catalogue. Sample specifications and prices must be confirmed with Top Engineers.</p>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white p-4 border border-slate-200 rounded-lg flex flex-col md:flex-row gap-3">
          <label className="relative flex-1">
            <span className="sr-only">Search products</span><Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search machinery..." className="w-full rounded border border-slate-300 bg-slate-50 pl-9 pr-3 py-2 text-sm text-slate-900" />
          </label>
          <select value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Filter by category" className="rounded border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900">
            <option value="all">All categories</option>
            {categories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
          </select>
        </div>
        {products.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>
        ) : <p className="mt-10 rounded-lg bg-white p-8 text-center text-slate-600">No published products match your search.</p>}
      </section>
    </div>
  );
}
