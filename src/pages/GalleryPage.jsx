import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldAlert,
  X,
  Maximize2,
  ChevronRight,
} from 'lucide-react';
import Button from '../components/common/Button';

// Gallery items with clear placeholder markings
const GALLERY_ITEMS = [
  {
    id: 1,
    title: 'Industrial Heavy Duty Lathe Turning',
    category: 'Lathe Machinery',
    location: 'Illustrative placeholder',
    image: '/images/categories/lathe-machines.jpg',
    description:
      'Precision cylindrical workpiece turning on heavy-duty bed lathe. Rigid casting dampens machining vibration.',
  },
  {
    id: 2,
    title: 'Double Column Plano Miller Setup',
    category: 'Milling & Planing',
    location: 'Illustrative placeholder',
    image: '/images/categories/planer-machines.jpg',
    description:
      'Double column frame designed for heavy surface milling and large metal plate machining.',
  },
  {
    id: 3,
    title: 'Radial Arm Drilling Bay',
    category: 'Drilling Machinery',
    location: 'Illustrative placeholder',
    image: '/images/categories/drilling-machines.jpg',
    description:
      'Heavy-duty radial arm drilling operation featuring high-torque spindle and rigid column clamping.',
  },
  {
    id: 4,
    title: 'Cast Iron Machine Bedways & Foundry Base',
    category: 'Foundry & Casting',
    location: 'Illustrative placeholder',
    image: '/images/categories/lathe-machines.jpg',
    description:
      'Aged cast iron machine beds prepared for precision hand scraping and guideway grinding.',
  },
  {
    id: 5,
    title: 'Heavy Metal Shaping & Slotting Machine',
    category: 'Shaping Machinery',
    location: 'Illustrative placeholder',
    image: '/images/categories/planer-machines.jpg',
    description:
      'Mechanical stroke cutting of internal keyways and precision metal shaping.',
  },
  {
    id: 6,
    title: 'Machine Tool Assembly & Testing Bay',
    category: 'Assembly & Quality',
    location: 'Illustrative placeholder',
    image: '/images/categories/milling-machines.jpg',
    description:
      'Alignment verification, headstock runout testing, and gear train inspection before dispatch.',
  },
];

const CATEGORIES = [
  'All Sections',
  'Lathe Machinery',
  'Milling & Planing',
  'Drilling Machinery',
  'Foundry & Casting',
  'Shaping Machinery',
  'Assembly & Quality',
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All Sections');
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems =
    activeCategory === 'All Sections'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-slate-900">
      {/* 1. Softened Dark Hero Banner with Breadcrumbs */}
      <section className="bg-[#0A1628] text-white pt-32 pb-16 border-b border-[#1E3554]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
            <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-blue-400 font-semibold">Gallery</span>
          </div>

          <span className="text-blue-500 text-xs font-bold uppercase tracking-widest block mb-1">
            FACILITY & MACHINE ARCHIVE
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Workshop & Machinery Gallery
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-3 max-w-2xl leading-relaxed">
            Visual documentation of machine tools, casting beds, workshop bays, and assembly processes at our Batala works.
          </p>
        </div>
      </section>

      {/* 2. Notice Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-amber-50 rounded-lg p-4 border border-amber-200 text-amber-900 flex items-start gap-3 text-left">
          <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold">Placeholder Notice:</span>
            <p className="text-amber-800 mt-0.5">
              Local catalogue images below are illustrative stock placeholders and are not confirmed photographs of Top Engineers or its facilities.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-[4px] text-xs font-semibold tracking-wide whitespace-nowrap transition-colors cursor-pointer ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* 4. Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm hover:border-blue-500/60 hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col text-left"
            >
              <div className="relative aspect-[4/3] bg-[#0A1628] border-b border-[#1E3554]/70 overflow-hidden">
                <img src={item.image} alt={`${item.category} illustrative placeholder`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute bottom-3 left-3 bg-[#0A1628]/90 text-[10px] text-white px-2 py-1 rounded">Illustrative image</span>
                <div className="absolute top-3 left-3 bg-[#132238]/90 text-[10px] text-slate-300 px-2 py-0.5 rounded-[2px] border border-[#1E3554]/70 font-mono">
                  {item.location}
                </div>

                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 p-1.5 rounded-[2px] text-white">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Meta Info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#050B16] group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Click to expand details</span>
                  <span className="text-blue-600 font-semibold">Batala Works</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Lightbox Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-150 text-left">
            <div className="bg-[#0A1628] text-white p-5 flex items-center justify-between border-b border-[#1E3554]/70">
              <div>
                <span className="text-xs text-blue-400 font-bold uppercase tracking-widest">
                  {selectedItem.category}
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  {selectedItem.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-[#0A1628] border-b border-[#1E3554]/70">
              <img src={selectedItem.image} alt={`${selectedItem.category} illustrative placeholder`} className="w-full max-h-[28rem] object-contain" />
              <p className="text-center text-xs text-amber-300 p-3">Illustrative local catalogue image—not a verified Top Engineers facility photograph.</p>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Machinery Description
                </h4>
                <p className="text-sm text-slate-700 mt-1 leading-relaxed">
                  {selectedItem.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 block">Image:</span>
                  <span className="font-semibold text-slate-900">Illustrative placeholder</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Use:</span>
                  <span className="font-semibold text-slate-900">Visual reference only</span>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <Button
                  to="/contact"
                  variant="primary"
                  size="sm"
                  onClick={() => setSelectedItem(null)}
                >
                  Inquire About This Machine
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedItem(null)}
                  className="text-slate-600 hover:text-slate-900"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
