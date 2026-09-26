import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group flex flex-col bg-white rounded-2xl border border-[#E8E2D9] overflow-hidden hover:shadow-md hover:border-[#CADCD1] transition-smooth focus-within:ring-2 focus-within:ring-[#1E3A2F]">
      
      {/* Product Image Area */}
      <div className="relative aspect-[4/3] bg-[#F4F7F5] overflow-hidden p-6 flex items-center justify-center border-b border-[#E8E2D9]/60">
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[#1E3A2F] text-[11px] font-semibold px-2.5 py-1 rounded-full border border-[#CADCD1]/60 shadow-2xs">
          {product.category}
        </span>
        <img
          src={product.image}
          alt={`Bottle of ${product.name} - ${product.singleCount} ${product.form}`}
          className="w-full h-full object-contain group-hover:scale-105 transition-smooth"
          loading="lazy"
        />
      </div>

      {/* Product Content Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] text-[#5D6B64] font-medium">
            <span>{product.singleCount} {product.form}</span>
            <span>•</span>
            <span>Single Bottle</span>
          </div>

          <h3 className="text-lg font-serif font-bold text-[#1E3A2F] mt-1 group-hover:text-[#294D3F] transition-colors">
            {product.name}
          </h3>

          <p className="text-xs text-[#5D6B64] mt-1.5 line-clamp-2 leading-relaxed">
            {product.tagline}
          </p>
        </div>

        {/* Price and CTA Action */}
        <div className="pt-3 border-t border-[#F3EFEA] flex items-center justify-between">
          <div>
            <span className="text-[11px] text-[#5D6B64] block">Starts from</span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-[#1E3A2F]">
                ₹{product.basePrice.toLocaleString('en-IN')}
              </span>
              <span className="text-[10px] text-[#8FA382] font-semibold">
                (Up to 12% off packs)
              </span>
            </div>
          </div>

          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1E3A2F] text-white text-xs font-semibold hover:bg-[#294D3F] active:scale-95 transition-smooth"
            aria-label={`View details and choose pack for ${product.name}`}
          >
            <span>View Formula</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </article>
  );
}
