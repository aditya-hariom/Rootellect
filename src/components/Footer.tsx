import React from 'react';
import Link from 'next/link';
import { ShieldCheck, HeartHandshake, Leaf } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#14271F] text-[#E8EFE9] pt-16 pb-12 border-t border-[#294D3F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-[#294D3F]">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#1E3A2F] flex items-center justify-center shrink-0 text-[#8FA382]">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-base">Standardized Botanicals</h4>
              <p className="text-xs text-[#CADCD1] mt-1 leading-relaxed">
                Formulated with bioactive herbal extracts calibrated for potency, purity, and metabolic bioavailability.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#1E3A2F] flex items-center justify-center shrink-0 text-[#8FA382]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-base">Transparent Formulations</h4>
              <p className="text-xs text-[#CADCD1] mt-1 leading-relaxed">
                Zero synthetic fillers, zero proprietary hidden blends, and 100% disclosed active dosages.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#1E3A2F] flex items-center justify-center shrink-0 text-[#8FA382]">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-base">Assessment Demo Platform</h4>
              <p className="text-xs text-[#CADCD1] mt-1 leading-relaxed">
                Simulated wellness storefront created for technical evaluation. Real currency transactions are disabled.
              </p>
            </div>
          </div>
        </div>

        {/* Links & Brand Area */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 py-12">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#8FA382] text-[#14271F] flex items-center justify-center font-serif text-lg font-bold">
                R
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                Rootellect
              </span>
            </div>
            <p className="text-sm text-[#CADCD1] max-w-sm leading-relaxed">
              Scientifically anchored botanical remedies for restorative neurological calm, hormonal balance, and cyclical vitality.
            </p>
            <div className="inline-block bg-[#1E3A2F] border border-[#2D5243] rounded-lg px-3 py-1.5 text-xs text-[#8FA382]">
              Next.js App Router • Prisma ORM • Tailwind CSS
            </div>
          </div>

          <div>
            <h5 className="text-xs uppercase tracking-wider text-[#8FA382] font-semibold mb-4">
              Explore Store
            </h5>
            <ul className="space-y-2.5 text-sm text-[#CADCD1]">
              <li>
                <Link href="/#catalogue" className="hover:text-white transition-colors">
                  All Formulas
                </Link>
              </li>
              <li>
                <Link href="/bundles" className="hover:text-white transition-colors">
                  Mind Calm Duos
                </Link>
              </li>
              <li>
                <Link href="/products/mind-calm" className="hover:text-white transition-colors">
                  Mind Calm (30 Caps)
                </Link>
              </li>
              <li>
                <Link href="/products/women-balance-formula" className="hover:text-white transition-colors">
                  Women Balance Formula
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs uppercase tracking-wider text-[#8FA382] font-semibold mb-4">
              Evaluation & Info
            </h5>
            <ul className="space-y-2.5 text-sm text-[#CADCD1]">
              <li>
                <Link href="/#faq" className="hover:text-white transition-colors">
                  Demonstration FAQ
                </Link>
              </li>
              <li>
                <Link href="/#delivery-returns" className="hover:text-white transition-colors">
                  Delivery &amp; Returns Policy
                </Link>
              </li>
              <li>
                <Link href="/#science" className="hover:text-white transition-colors">
                  Clinical Standards
                </Link>
              </li>
              <li>
                <span className="text-[#8FA382] text-xs">
                  Free ₹0 Shipping on all orders
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-8 border-t border-[#294D3F] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8FA382]">
          <p>© {new Date().getFullYear()} Rootellect Wellness Demo. Strictly for technical assessment.</p>
          <p>Fixed Test Fixtures: 1 Bottle ₹799 • 2 Bottles ₹1,499 • 3 Bottles ₹2,099 • Duo ₹1,399</p>
        </div>

      </div>
    </footer>
  );
}
