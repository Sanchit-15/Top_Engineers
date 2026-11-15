import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Cog,
  Wrench,
  Shield,
  Layers,
  ArrowRight,
  ChevronRight,
  Factory,
  FileText,
  Clock,
} from 'lucide-react';
import Button from '../components/common/Button';

// Four primary machinery categories matching the reference design layout
const MACHINERY_CATEGORIES = [
  {
    id: 'lathe-machines',
    name: 'Lathe Machines',
    subtitle: 'Heavy Duty, All Geared, Center Lathes',
    image: '/images/categories/lathe-machines.jpg',
    tag: 'TURNING',
  },
  {
    id: 'milling-machines',
    name: 'Milling Machines',
    subtitle: 'Universal, Vertical & Plano Millers',
    image: '/images/categories/milling-machines.jpg',
    tag: 'MILLING',
  },
  {
    id: 'drilling-machines',
    name: 'Drilling Machines',
    subtitle: 'Radial Arm & Heavy Duty Pillar Drills',
    image: '/images/categories/drilling-machines.jpg',
    tag: 'DRILLING',
  },
  {
    id: 'planer-machines',
    name: 'Planer & Plano Millers',
    subtitle: 'Double Column Planers & Face Millers',
    image: '/images/categories/planer-machines.jpg',
    tag: 'PLANING',
  },
];

// Feature strip directly under hero (Light background)
const FEATURES = [
  {
    title: 'Heavy-Duty Build',
    description:
      'Robust cast iron construction designed for high structural rigidity and continuous industrial workloads.',
    icon: Shield,
  },
  {
    title: 'Workshop Ready',
    description:
      'Engineered for precision turning, shaping, milling, and heavy metalworking operations.',
    icon: Wrench,
  },
  {
    title: 'Made to Requirement',
    description:
      'Customizable bed lengths, spindle bores, and tooling specifications tailored to workshop needs.',
    icon: Layers,
  },
  {
    title: 'Quotation on Request',
    description:
      'Transparent RFQ process connecting industrial buyers directly with our Batala manufacturing works.',
    icon: FileText,
  },
];

/**
 * Reusable Category Card component that attempts to load /images/categories/{file}.jpg
 * and gracefully falls back to a sleek dark navy placeholder with a gear icon and "Photo coming soon" tag.
 */
function CategoryCard({ category }) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link
      to="/products"
      className="group block bg-[#132238] rounded-lg border border-[#1E3554]/70 overflow-hidden shadow-md hover:border-blue-500/60 hover:-translate-y-1 transition-all duration-300 text-left"
    >
      {/* 4:3 Machine Image Area */}
      <div className="relative aspect-[4/3] bg-[#0A1628] overflow-hidden flex items-center justify-center border-b border-[#1E3554]/70">
        {!imgError ? (
          <img
            src={category.image}
            alt={category.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          /* Graceful Dark Industrial Placeholder */
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#132238] to-[#0A1628]">
            <div className="w-12 h-12 rounded-[4px] bg-[#1E3554]/50 border border-blue-500/30 flex items-center justify-center mb-3 group-hover:border-blue-500 transition-colors shadow-[0_0_15px_rgba(37,99,235,0.15)]">
              <Cog className="w-6 h-6 text-blue-500 group-hover:rotate-45 transition-transform duration-500" />
            </div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              {category.tag}
            </span>
            <span className="text-[10px] text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded-[2px] border border-blue-800/40 mt-1">
              Photo coming soon
            </span>
          </div>
        )}

        {/* Small floating tag */}
        <span className="absolute top-2.5 left-2.5 bg-[#0A1628]/90 backdrop-blur-sm text-[10px] font-bold text-blue-400 px-2 py-0.5 rounded-[2px] border border-[#1E3554]/70">
          {category.tag}
        </span>
      </div>

      {/* Category Name & Action Below Image */}
      <div className="p-4 sm:p-5 flex items-center justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
            {category.name}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {category.subtitle}
          </p>
        </div>

        <div className="w-8 h-8 rounded-[4px] bg-white/5 group-hover:bg-blue-600 flex items-center justify-center text-slate-400 group-hover:text-white transition-all shrink-0 ml-3">
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}

export default function HomePage() {
  const [heroImgError, setHeroImgError] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#0A1628]">
      {/* =========================================================================
          1. HERO SECTION (Full width, ~85vh, softened dark navy with blue glow)
          NOTE TO DEVELOPER: Real machinery hero photo is loaded from:
          /public/images/hero-machinery.jpg
          ========================================================================= */}
      <section className="relative min-h-[85vh] flex items-center bg-[#0A1628] overflow-hidden pt-20">
        {/* Full-bleed background image slot with fallback */}
        <div className="absolute inset-0 z-0">
          {!heroImgError ? (
            <img
              src="/images/hero-machinery.jpg"
              alt="Industrial Machinery"
              onError={() => setHeroImgError(true)}
              className="w-full h-full object-cover object-center opacity-60 mix-blend-luminosity"
            />
          ) : (
            /* Subtle blue glowing tech grid fallback when hero image is missing */
            <div className="w-full h-full bg-[#0A1628] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.25),rgba(255,255,255,0))]">
              <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#1E3E62_1px,transparent_1px),linear-gradient(to_bottom,#1E3E62_1px,transparent_1px)] bg-[size:4rem_4rem]" />
            </div>
          )}

          {/* Cinematic dark navy gradients (Left side softly shaded so text stays 100% readable) */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628] via-[#0A1628]/85 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-transparent to-[#0A1628]/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
          <div className="max-w-2xl text-left space-y-6">
            {/* Small uppercase letter-spaced eyebrow label in blue */}
            <div className="inline-flex items-center gap-2 text-blue-500 text-xs sm:text-sm font-bold tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              <span>PRECISION. STRENGTH. SINCE 1964.</span>
            </div>

            {/* H1 Large white bold text */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-white">
              Heavy Industrial Machinery & Precision Machine Tools
            </h1>

            {/* Verified 2-line subtext */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed max-w-xl">
              Top Engineers manufactures and supplies heavy-duty lathe machines, radial drills, plano millers, and industrial workshop equipment from Batala, Punjab.
            </p>

            {/* Two Action Buttons: Solid Blue & Thin White Outline */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Button to="/products" variant="primary" size="lg" icon={ArrowRight}>
                View Products
              </Button>
              <Button to="/contact" variant="secondary" size="lg">
                Get a Quote
              </Button>
            </div>

            {/* Subtle verification badge */}
            <div className="pt-4 flex items-center gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 text-slate-300">
                <Clock className="w-3.5 h-3.5 text-blue-500" />
                <span>Established 1964</span>
              </div>
              <span className="text-slate-700">•</span>
              <div className="text-slate-400">
                28-BF, Industrial Estate, Batala, Punjab
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. FEATURE STRIP (Directly under hero, light background)
          Thin vertical dividers on desktop, 2x2 on tablet, stacked on mobile
          ========================================================================= */}
      <section className="bg-[#F8FAFC] text-slate-900 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
            {FEATURES.map((feat, idx) => {
              const IconComp = feat.icon;
              return (
                <div key={idx} className="p-6 sm:p-8 text-left space-y-3">
                  <div className="w-10 h-10 rounded-[4px] bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#050B16]">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. "OUR MACHINERY" SECTION (Softened Dark Navy background with photo cards)
          Desktop: 4 photo cards. Mobile: compact vertical rows with thumbnail
          ========================================================================= */}
      <section className="py-20 bg-[#0A1628]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header: Left Title, Right View All Link */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#1E3554]/70 text-left">
            <div>
              <span className="text-blue-500 text-xs font-bold uppercase tracking-widest block mb-1">
                EQUIPMENT CATALOG
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
                Our Machinery
              </h2>
            </div>
            <Link
              to="/products"
              className="mt-3 sm:mt-0 text-sm font-semibold text-blue-400 hover:text-blue-300 inline-flex items-center gap-1.5 transition-colors"
            >
              <span>View All Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Desktop & Tablet: 4 Grid Cards */}
          <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-6">
            {MACHINERY_CATEGORIES.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>

          {/* Mobile Layout: Vertical List Rows with Left Thumbnail (Reference phone mockup) */}
          <div className="sm:hidden space-y-3">
            {MACHINERY_CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to="/products"
                className="flex items-center justify-between p-3.5 bg-[#132238] rounded-lg border border-[#1E3554]/70 text-left hover:border-blue-500/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {/* Thumbnail on left */}
                  <div className="w-14 h-14 rounded-[4px] bg-[#0A1628] border border-[#1E3554]/70 overflow-hidden flex items-center justify-center shrink-0">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">
                      {cat.name}
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      {cat.subtitle}
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-500 shrink-0 ml-2" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. BATALA HERITAGE & MANUFACTURING EXCELLENCE (Light Section)
          ========================================================================= */}
      <section className="py-20 bg-white text-slate-900 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
            <div className="lg:col-span-7 space-y-5">
              <span className="text-blue-600 text-xs font-bold uppercase tracking-widest block">
                MANUFACTURING CLUSTER
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#050B16] tracking-tight leading-tight">
                Rooted in Batala’s Six-Decade Machine Tool Heritage
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Batala in Gurdaspur district, Punjab, is recognized across India as a primary manufacturing hub for cast iron foundry beds and heavy machine tools.
              </p>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Operating from <strong>28-BF, Industrial Estate, Batala</strong> since <strong>1964</strong>, Top Engineers builds industrial lathes, shapers, and milling machinery engineered for vibration damping, structural rigidity, and dependable daily production.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <Button to="/about" variant="primary" icon={ArrowRight}>
                  About Top Engineers
                </Button>
                <Button to="/contact" variant="outlineDark">
                  Works Location & Inquiries
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#F8FAFC] rounded-lg border border-slate-200 p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                <Factory className="w-6 h-6 text-blue-600" />
                <div>
                  <h4 className="font-bold text-[#050B16] text-base">
                    Works & Industrial Estate
                  </h4>
                  <p className="text-xs text-slate-500">
                    28-BF, Industrial Estate, Batala, Punjab 143505
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-600 pt-2">
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Founded:</span>
                  <span className="font-bold text-slate-900">1964</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Classification:</span>
                  <span className="font-bold text-slate-900">Manufacturer & Supplier</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Core Line:</span>
                  <span className="font-bold text-slate-900">Industrial Machine Tools</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-500">Procurement:</span>
                  <span className="font-bold text-blue-600">Request for Quote (RFQ)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. CTA BANNER (Cinematic Soft Navy with Electric Blue Accent)
          ========================================================================= */}
      <section className="py-20 bg-[#132238] border-t border-[#1E3554]/70 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <span className="text-blue-400 text-xs font-bold uppercase tracking-widest block">
            CUSTOM WORKSHOP SPECIFICATIONS
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight max-w-2xl mx-auto">
            Need Machine Tool Specifications for Your Production Line?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Submit your required bed length, swing capacity, or tooling requirements. Our Batala works will review your inquiry and prepare a quotation.
          </p>

          <div className="pt-4 flex justify-center gap-4 flex-wrap">
            <Button to="/custom-machinery" variant="primary" size="lg" icon={ArrowRight}>
              Custom Machinery Enquiry
            </Button>
            <Button to="/products" variant="secondary" size="lg">
              Explore Products
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
