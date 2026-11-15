import React from 'react';
import { Link } from 'react-router-dom';
import {
  Cog,
  MapPin,
  Calendar,
  ShieldAlert,
  ArrowRight,
  ExternalLink,
  Lock,
} from 'lucide-react';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-[#0A1628] text-slate-400 border-t-2 border-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Company Info */}
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-[4px] bg-[#132238] flex items-center justify-center text-white border border-blue-500/40">
                <Cog className="w-5 h-5 text-blue-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tight text-white leading-none">
                  TOP ENGINEERS
                </span>
                <span className="text-[10px] tracking-widest text-slate-500 font-semibold uppercase mt-1">
                  BATALA · EST. 1964
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Industrial machinery and machine tools manufacturer, supplier, and exporter located in the historic engineering manufacturing cluster of Batala, Punjab, India.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400">
              <Calendar className="w-4 h-4 text-blue-500 shrink-0" />
              <span>Over 60 Years of Machine Tool Heritage</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="text-left">
            <h4 className="text-white text-xs font-bold tracking-widest uppercase mb-4 text-blue-400">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
                  <span>Machinery Products</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
                  <span>Workshop Gallery</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
                  <span>Contact & RFQ</span>
                </Link>
              </li>
              <li>
                <Link to="/custom-machinery" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
                  <span>Custom Machinery Enquiry</span>
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
                  <span>Quote Request Cart</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Machinery Types */}
          <div className="text-left">
            <h4 className="text-white text-xs font-bold tracking-widest uppercase mb-4 text-blue-400">
              Machinery Types
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                <span>Heavy Duty Lathe Machines</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                <span>All Geared Lathes & Center Lathes</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                <span>Radial Drilling Machines</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                <span>Plano Millers & Double Column Planers</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                <span>Shaping & Universal Milling Machines</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                <span>Boring & Grinding Machines</span>
              </li>
            </ul>
            <p className="text-[11px] text-slate-500 mt-4 italic">
              *Full catalog loaded from database in Phase 3.
            </p>
          </div>

          {/* Column 4: Verified Location & Admin Access */}
          <div className="text-left space-y-4">
            <h4 className="text-white text-xs font-bold tracking-widest uppercase mb-4 text-blue-400">
              Verified Works
            </h4>

            <div className="flex items-start gap-2.5">
              <MapPin className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-300">
                <p className="font-semibold text-white">Top Engineers Works</p>
                <p className="text-slate-400 mt-0.5 leading-relaxed">
                  28-BF, Industrial Estate, Batala, Punjab 143505, India
                </p>
              </div>
            </div>

            <div className="bg-[#132238] p-3 rounded-[4px] border border-[#1E3554]/70 text-xs space-y-1">
              <div className="flex items-center gap-1.5 text-amber-400 font-semibold text-[11px]">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Contact Verification</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Direct phone and email details will be added upon owner verification. Please use our Contact Form.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs">
              <a
                href="https://www.justdial.com/Batala/Top-Engineers-Industrial-Estate-Ajit-Nagar/9999P1871-1871-100731103808-T4C6_BZDET"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 font-medium"
              >
                <span>Justdial Record</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <Link
                to="/admin/login"
                className="text-slate-400 hover:text-white inline-flex items-center gap-1 font-medium transition-colors"
              >
                <Lock className="w-3 h-3" />
                <span>Admin Login</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {CURRENT_YEAR} Top Engineers. All rights reserved. Batala, Punjab, India.</p>
          <div className="flex items-center gap-4">
            <Link to="/about" className="hover:text-slate-300 transition-colors">
              About
            </Link>
            <Link to="/contact" className="hover:text-slate-300 transition-colors">
              Contact
            </Link>
            <Link to="/admin/login" className="hover:text-blue-400 transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
