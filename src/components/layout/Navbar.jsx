import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  Cog,
  Menu,
  X,
  ShoppingCart,
  ArrowRight,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function Navbar() {
  const { totalItemsCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Desktop active nav link with blue text and a crisp bottom underline
  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium tracking-wide transition-all py-1 px-1 relative ${
      isActive
        ? 'text-blue-400 font-semibold after:content-[""] after:absolute after:left-0 after:bottom-[-6px] after:w-full after:h-[2px] after:bg-blue-500'
        : 'text-slate-300 hover:text-white'
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `block text-base font-medium py-3 px-4 rounded transition-colors ${
      isActive
        ? 'text-blue-400 bg-blue-600/10 font-bold border-l-2 border-blue-500'
        : 'text-slate-300 hover:bg-white/5 hover:text-white'
    }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0A1628]/95 backdrop-blur-md border-b border-[#1E3554]/70 shadow-lg'
          : 'bg-[#0A1628]/70 backdrop-blur-sm border-b border-white/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left: Brand Logo & Wordmark */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="w-10 h-10 rounded-[4px] bg-[#132238] flex items-center justify-center text-white border border-blue-500/40 group-hover:border-blue-500 transition-colors shadow-[0_0_15px_rgba(37,99,235,0.2)]">
              <Cog className="w-6 h-6 text-blue-500 animate-[spin_16s_linear_infinite]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white leading-none">
                TOP ENGINEERS
              </span>
              <span className="text-[10px] tracking-widest text-slate-400 font-semibold uppercase mt-1">
                HEAVY MACHINERY · BATALA
              </span>
            </div>
          </Link>

          {/* Center: Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <NavLink to="/" className={navLinkClass} end>
              Home
            </NavLink>
            <NavLink to="/products" className={navLinkClass}>
              Products
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              About Us
            </NavLink>
            <NavLink to="/gallery" className={navLinkClass}>
              Gallery
            </NavLink>
            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>
          </nav>

          {/* Right: Actions (Cart & Blue Get a Quote Button) */}
          <div className="hidden sm:flex items-center gap-4">
            <Link
              to="/cart"
              className="relative p-2 rounded-[4px] text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
              title="Procurement Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalItemsCount}
              </span>
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-[4px] transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] cursor-pointer"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Right Bar (Cart + Hamburger) */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              to="/cart"
              className="p-2 text-slate-300 hover:text-white relative"
              title="Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalItemsCount}
              </span>
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded text-slate-300 hover:text-white focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-in Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-20 bg-[#0A1628]/98 backdrop-blur-xl border-b border-[#1E3554]/70 px-6 py-8 space-y-3 shadow-2xl animate-in slide-in-from-top duration-200">
          <NavLink
            to="/"
            end
            onClick={() => setMobileMenuOpen(false)}
            className={mobileNavLinkClass}
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            onClick={() => setMobileMenuOpen(false)}
            className={mobileNavLinkClass}
          >
            Products
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className={mobileNavLinkClass}
          >
            About Us
          </NavLink>
          <NavLink
            to="/gallery"
            onClick={() => setMobileMenuOpen(false)}
            className={mobileNavLinkClass}
          >
            Gallery
          </NavLink>
          <NavLink
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className={mobileNavLinkClass}
          >
            Contact
          </NavLink>

          <div className="pt-6 border-t border-slate-800 space-y-3">
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-[4px] flex items-center justify-center gap-2"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
