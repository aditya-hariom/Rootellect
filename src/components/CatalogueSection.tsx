'use client';

import React, { useState, useMemo } from 'react';
import { Search, XCircle, Filter } from 'lucide-react';
import ProductCard from './ProductCard';
import { Product } from '@/types';

interface CatalogueSectionProps {
  products: Product[];
}

export default function CatalogueSection({ products }: CatalogueSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map((p) => p.category)));
    return ['All', ...cats];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.tagline.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <section id="catalogue" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#8FA382]">
            Evidence-Anchored Botanical Care
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1E3A2F] mt-1.5">
            The Botanical Catalogue
          </h2>
          <p className="text-sm text-[#5D6B64] mt-2 max-w-xl">
            Choose your single formula, multi-month supply, or pair with Mind Calm for synergistic duo discounts.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <label htmlFor="catalogue-search" className="sr-only">
            Search formulas by name or health goal
          </label>
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8FA382]" aria-hidden="true" />
          <input
            id="catalogue-search"
            type="search"
            placeholder="Search formula, stress, cycle..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#CADCD1] bg-white text-sm text-[#1E3A2F] placeholder-[#5D6B64]/70 focus:border-[#1E3A2F] focus:ring-1 focus:ring-[#1E3A2F] shadow-2xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#5D6B64] hover:text-[#1E3A2F]"
              aria-label="Clear search input"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 no-scrollbar" role="tablist" aria-label="Product Categories">
        <span className="flex items-center gap-1.5 text-xs font-semibold text-[#5D6B64] mr-2 shrink-0">
          <Filter className="w-3.5 h-3.5" />
          Filter:
        </span>
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              role="tab"
              aria-selected={isActive}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-smooth ${
                isActive
                  ? 'bg-[#1E3A2F] text-white shadow-xs'
                  : 'bg-white text-[#5D6B64] border border-[#E8E2D9] hover:border-[#CADCD1]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-20 px-4 bg-white rounded-3xl border border-[#E8E2D9]">
          <div className="w-14 h-14 mx-auto rounded-full bg-[#FDEEEA] text-[#C25943] flex items-center justify-center mb-4">
            <XCircle className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-[#1E3A2F]">No formulas matched your search</h3>
          <p className="text-xs text-[#5D6B64] mt-1 max-w-sm mx-auto">
            Try adjusting your search terms or clearing category filters to explore the available four formulas.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="mt-5 inline-flex items-center justify-center px-4 py-2 rounded-xl bg-[#1E3A2F] text-white text-xs font-semibold hover:bg-[#294D3F] transition-smooth"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
}
