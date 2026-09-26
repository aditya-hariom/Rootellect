'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Menu, X, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const { totalItems, setIsDrawerOpen, isHydrated } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-md border-b border-[#E8E2D9] transition-smooth">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#1E3A2F] hover:bg-[#EBF1ED] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A2F]"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="group flex items-center gap-2.5 focus-visible:ring-2 focus-visible:ring-[#1E3A2F] rounded-lg p-1"
            >
              <div className="w-8 h-8 rounded-full bg-[#1E3A2F] text-[#FBF9F5] flex items-center justify-center font-serif text-lg font-bold shadow-sm group-hover:bg-[#294D3F] transition-smooth">
                R
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#1E3A2F]">
                  Rootellect
                </span>
                <span className="text-[10px] uppercase tracking-widest font-semibold text-[#8FA382] -mt-1">
                  Wellness
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-[#333C37]">
            <Link
              href="/#catalogue"
              className="hover:text-[#1E3A2F] transition-colors py-1 border-b-2 border-transparent hover:border-[#1E3A2F]"
            >
              Formulas
            </Link>
            <Link
              href="/bundles"
              className="flex items-center gap-1.5 hover:text-[#1E3A2F] transition-colors py-1 border-b-2 border-transparent hover:border-[#1E3A2F]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#8FA382]" />
              <span>Duo Bundles</span>
              <span className="bg-[#EBF1ED] text-[#1E3A2F] text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                Save ₹199
              </span>
            </Link>
            <Link
              href="/#science"
              className="hover:text-[#1E3A2F] transition-colors py-1 border-b-2 border-transparent hover:border-[#1E3A2F]"
            >
              Our Philosophy
            </Link>
            <Link
              href="/#faq"
              className="hover:text-[#1E3A2F] transition-colors py-1 border-b-2 border-transparent hover:border-[#1E3A2F]"
            >
              FAQ
            </Link>
          </nav>

          {/* Cart Icon & Actions */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              className="relative p-2.5 rounded-full text-[#1E3A2F] hover:bg-[#EBF1ED] active:scale-95 transition-smooth"
              aria-label={`Open shopping cart with ${isHydrated ? totalItems : 0} items`}
            >
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
              {isHydrated && totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#1E3A2F] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-in zoom-in-50 duration-200">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E8E2D9] bg-[#FBF9F5] px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <Link
            href="/#catalogue"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-[#1E3A2F] hover:bg-[#EBF1ED]"
          >
            Formulas
          </Link>
          <Link
            href="/bundles"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between px-3 py-2 rounded-lg text-base font-medium text-[#1E3A2F] hover:bg-[#EBF1ED]"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#8FA382]" />
              Duo Bundles
            </span>
            <span className="bg-[#EBF1ED] text-[#1E3A2F] text-xs font-bold px-2 py-0.5 rounded-full">
              Save ₹199
            </span>
          </Link>
          <Link
            href="/#science"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-[#1E3A2F] hover:bg-[#EBF1ED]"
          >
            Our Philosophy
          </Link>
          <Link
            href="/#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-[#1E3A2F] hover:bg-[#EBF1ED]"
          >
            FAQ
          </Link>
        </div>
      )}
    </header>
  );
}
