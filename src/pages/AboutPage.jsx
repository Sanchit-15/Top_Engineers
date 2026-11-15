import React from 'react';
import { Link } from 'react-router-dom';
import {
  Factory,
  MapPin,
  ShieldAlert,
  Cog,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';

export default function AboutPage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen text-slate-900">
      {/* 1. Softened Dark Hero Banner with Breadcrumbs */}
      <section className="bg-[#0A1628] text-white pt-32 pb-16 border-b border-[#1E3554]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
            <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-blue-400 font-semibold">About Us</span>
          </div>

          <span className="text-blue-500 text-xs font-bold uppercase tracking-widest block mb-1">
            ESTABLISHED 1964 · BATALA, PUNJAB
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            About Top Engineers
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-3 max-w-2xl leading-relaxed">
            Industrial machinery and machine tools manufacturer, supplier, and exporter rooted in the historic machine tool cluster of Batala, Punjab, India.
          </p>
        </div>
      </section>

      {/* 2. Main Verified Content Area (Light) */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Official Record Card */}
          <div className="bg-white rounded-lg p-6 sm:p-10 border border-slate-200 shadow-sm text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                  OFFICIAL BUSINESS RECORD
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#050B16] mt-1">
                  Verified Enterprise Details
                </h2>
              </div>
              <Badge variant="verified">Verified Initial Reference</Badge>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Enterprise Name
                </span>
                <span className="text-lg font-bold text-[#050B16] mt-1 block">
                  Top Engineers
                </span>
              </div>

              <div className="p-5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Year of Establishment
                </span>
                <span className="text-lg font-bold text-blue-600 mt-1 block">
                  1964 (60+ Years Continuity)
                </span>
              </div>

              <div className="p-5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Business Nature
                </span>
                <span className="text-lg font-bold text-[#050B16] mt-1 block">
                  Manufacturer, Exporter & Supplier
                </span>
              </div>

              <div className="p-5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Industry & Machine Focus
                </span>
                <span className="text-lg font-bold text-[#050B16] mt-1 block">
                  Industrial Machinery & Machine Tools
                </span>
              </div>

              <div className="p-5 rounded-lg bg-slate-50 border border-slate-200 md:col-span-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Works & Registered Address
                </span>
                <div className="flex items-start gap-2 mt-1">
                  <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <span className="text-base font-bold text-[#050B16]">
                    28-BF, Industrial Estate, Batala, Punjab 143505, India
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-500">
              <span>
                Verified Reference: Justdial Public Business Registry (Batala Industrial Estate)
              </span>
              <a
                href="https://www.justdial.com/Batala/Top-Engineers-Industrial-Estate-Ajit-Nagar/9999P1871-1871-100731103808-T4C6_BZDET"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center gap-1"
              >
                <span>View Justdial Reference Record</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Batala Industrial Legacy & Engineering Principles */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start text-left">
            <div className="bg-white p-8 rounded-lg border border-slate-200 space-y-4">
              <div className="w-10 h-10 rounded-[4px] bg-[#0A1628] flex items-center justify-center text-white">
                <Factory className="w-5 h-5 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold text-[#050B16]">
                The Batala Machine Tools Legacy
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Batala is historically recognized as the cradle of machine tool manufacturing in Northern India. The city’s engineering cluster has long supplied industrial-grade lathes, radial drills, shaping machines, and heavy mechanical equipment to factories across India.
              </p>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Operating within this recognized cluster since <strong>1964</strong>, Top Engineers leverages generational machining and foundry craftsmanship to produce durable equipment for industrial workshops.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg border border-slate-200 space-y-4">
              <div className="w-10 h-10 rounded-[4px] bg-[#0A1628] flex items-center justify-center text-white">
                <Cog className="w-5 h-5 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold text-[#050B16]">
                Manufacturing & Construction Philosophy
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Our approach centers on heavy structural integrity. Industrial machine tools require high cast-iron mass and vibration damping characteristics to maintain cut accuracy during high-load turning and milling operations.
              </p>
              <ul className="space-y-2 text-sm text-slate-700 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Heavy-duty cast iron bedways and column structures</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Precision alignment and rigorous assembly inspection</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Transparent quotation model tailored to workshop requirements</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Verification Disclaimer */}
          <div className="bg-amber-50 rounded-lg p-6 border border-amber-200 text-amber-900 text-left">
            <div className="flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-amber-900">
                  Data Verification Notice
                </h4>
                <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                  Only verified business records (Establishment in 1964, Location at 28-BF Industrial Estate Batala, and Manufacturing classification) are displayed. Historical photographic archives, test charts, and specifications will be updated via Supabase CMS in Phase 5 upon owner confirmation.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Strip */}
          <div className="bg-[#0A1628] rounded-lg p-8 sm:p-10 border border-[#1E3554]/70 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <span className="text-blue-500 text-xs font-bold uppercase tracking-widest block mb-1">
                CONNECT WITH BATALA WORKS
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Request Specifications or Inquire About Workshop Machinery
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
                Submit your workpiece parameters or visit our works at 28-BF, Industrial Estate, Batala.
              </p>
            </div>
            <div className="shrink-0 flex items-center gap-3">
              <Button to="/contact" variant="primary">
                Get a Quote
              </Button>
              <Button to="/products" variant="secondary">
                View Products
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
