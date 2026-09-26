import React from 'react';
import Link from 'next/link';
import { ArrowLeft, SearchX } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md text-center bg-white p-8 sm:p-10 rounded-3xl border border-[#E8E2D9] shadow-sm space-y-5">
        <div className="w-16 h-16 mx-auto rounded-full bg-[#EBF1ED] text-[#1E3A2F] flex items-center justify-center">
          <SearchX className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-serif font-bold text-[#1E3A2F]">
          Formula Not Found
        </h2>
        <p className="text-xs text-[#5D6B64] leading-relaxed">
          The requested product slug does not exist in our assessment catalogue or is currently unavailable.
        </p>
        <div className="pt-2">
          <Link
            href="/#catalogue"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#1E3A2F] text-white text-xs font-semibold hover:bg-[#294D3F] transition-smooth"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Product Catalogue</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
