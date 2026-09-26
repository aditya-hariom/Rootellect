'use client';

import React, { useState } from 'react';
import { Sparkles, Check, Plus, ShieldCheck, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { BundleCartItem } from '@/types';

interface PartnerOption {
  slug: string;
  name: string;
  tagline: string;
  count: number;
  form: string;
  image: string;
  benefit: string;
}

const PARTNER_OPTIONS: PartnerOption[] = [
  {
    slug: 'women-balance-formula',
    name: 'Women Balance Formula',
    tagline: 'Comprehensive daily endocrine harmony & cyclical rhythm',
    count: 60,
    form: 'capsules',
    image: '/images/products/women-balance.jpg',
    benefit: 'Soothes hormonal stress, mood dips, and monthly cycle tension.',
  },
  {
    slug: 'pcos-pcod-support-formula',
    name: 'PCOS & PCOD Support Formula',
    tagline: 'Targeted insulin sensitization & ovarian follicle wellness',
    count: 60,
    form: 'tablets',
    image: '/images/products/pcos-pcod.jpg',
    benefit: 'Assists natural ovulation, insulin balance, and clear skin.',
  },
  {
    slug: 'perimenopause-support',
    name: 'Perimenopause Support',
    tagline: 'Adaptive vasomotor comfort, sleep & transition vitality',
    count: 60,
    form: 'tablets',
    image: '/images/products/perimenopause.jpg',
    benefit: 'Moderates sudden temperature spikes, night sweats, and fatigue.',
  },
];

export default function BundleSection() {
  const [selectedPartnerSlug, setSelectedPartnerSlug] = useState<string>(
    'women-balance-formula'
  );
  const [addedAnimation, setAddedAnimation] = useState(false);
  const { addItem } = useCart();

  const selectedPartner =
    PARTNER_OPTIONS.find((p) => p.slug === selectedPartnerSlug) ||
    PARTNER_OPTIONS[0];

  const handleAddBundle = () => {
    const bundleItem: BundleCartItem = {
      id: `duo-mind-calm-${selectedPartner.slug}`,
      itemType: 'DUO_BUNDLE',
      baseSlug: 'mind-calm',
      partnerSlug: selectedPartner.slug,
      name: `Mind Calm + ${selectedPartner.name} Duo`,
      partnerName: selectedPartner.name,
      quantity: 1,
      unitPrice: 1399,
      bottleCountPerPack: 2,
      image: '/images/products/mind-calm.jpg',
      savings: 199,
    };

    addItem(bundleItem);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  return (
    <section id="bundles" className="py-16 sm:py-24 bg-[#F4F7F5] border-y border-[#CADCD1]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF1ED] border border-[#CADCD1] text-xs font-bold text-[#1E3A2F] uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#8FA382]" />
            <span>F4 Feature • Synergistic Duo Bundles</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1E3A2F]">
            Mind Calm + Targeted Care Duo
          </h2>
          <p className="text-sm text-[#5D6B64] mt-2 leading-relaxed">
            Nervous system equilibrium amplifies hormonal harmony. Pair our foundation <strong>Mind Calm</strong> with any partner formula to unlock the exclusive <strong>₹1,399 bundle price (Save ₹199)</strong>.
          </p>
        </div>

        {/* Interactive Bundle Builder */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl border border-[#CADCD1] p-6 sm:p-10 shadow-sm">
          
          {/* Left Column: Visual Bottles Pair (5 cols) */}
          <div className="lg:col-span-5 flex items-center justify-center gap-3 sm:gap-4 bg-[#FBF9F5] rounded-2xl p-6 border border-[#E8E2D9]">
            {/* Mind Calm Bottle */}
            <div className="flex-1 flex flex-col items-center text-center">
              <div className="w-24 sm:w-28 aspect-square rounded-xl overflow-hidden shadow-xs relative">
                <img
                  src="/images/products/mind-calm.jpg"
                  alt="Mind Calm 30 capsules"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs font-bold text-[#1E3A2F] mt-2">Mind Calm</span>
              <span className="text-[10px] text-[#5D6B64]">30 Capsules • Base</span>
            </div>

            {/* Plus Icon */}
            <div className="w-8 h-8 rounded-full bg-[#1E3A2F] text-white flex items-center justify-center shrink-0 shadow-sm">
              <Plus className="w-4 h-4" />
            </div>

            {/* Partner Formula Bottle */}
            <div className="flex-1 flex flex-col items-center text-center">
              <div className="w-24 sm:w-28 aspect-square rounded-xl overflow-hidden shadow-xs relative transition-smooth">
                <img
                  src={selectedPartner.image}
                  alt={`${selectedPartner.name} ${selectedPartner.count} ${selectedPartner.form}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs font-bold text-[#1E3A2F] mt-2 truncate max-w-[110px]">
                {selectedPartner.name}
              </span>
              <span className="text-[10px] text-[#5D6B64]">
                {selectedPartner.count} {selectedPartner.form} • Partner
              </span>
            </div>
          </div>

          {/* Right Column: Partner Selection & Dynamic Pricing (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#8FA382]">
                Step 1: Choose Your Partner Formula
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                {PARTNER_OPTIONS.map((partner) => {
                  const isSelected = selectedPartnerSlug === partner.slug;
                  return (
                    <button
                      key={partner.slug}
                      type="button"
                      onClick={() => setSelectedPartnerSlug(partner.slug)}
                      className={`text-left p-3 rounded-xl border transition-smooth ${
                        isSelected
                          ? 'border-[#1E3A2F] bg-[#F4F7F5] ring-1 ring-[#1E3A2F] shadow-xs'
                          : 'border-[#E8E2D9] bg-white hover:border-[#CADCD1]'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <span className="text-xs font-bold text-[#1E3A2F] leading-tight">
                          {partner.name}
                        </span>
                        {isSelected && (
                          <div className="w-4 h-4 rounded-full bg-[#1E3A2F] text-white flex items-center justify-center shrink-0 ml-1">
                            <Check className="w-2.5 h-2.5" />
                          </div>
                        )}
                      </div>
                      <span className="text-[10px] text-[#5D6B64] block mt-1">
                        {partner.count} {partner.form}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Partner Highlight & Benefit */}
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E2D9] text-xs space-y-1">
              <span className="font-semibold text-[#1E3A2F] block">Synergy Spotlight:</span>
              <p className="text-[#5D6B64] leading-relaxed">
                {selectedPartner.benefit}
              </p>
            </div>

            {/* Dynamic Price Breakdown Card */}
            <div className="pt-4 border-t border-[#E8E2D9] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#5D6B64] line-through">
                    ₹1,598 Separate
                  </span>
                  <span className="text-xs font-bold text-[#1E3A2F] bg-[#EBF1ED] px-2 py-0.5 rounded-full">
                    Save ₹199 Instant
                  </span>
                </div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-bold text-[#1E3A2F]">₹1,399</span>
                  <span className="text-xs text-[#5D6B64]">/ 2 bottles total</span>
                </div>
                <span className="text-[11px] text-[#8FA382] font-semibold block mt-0.5">
                  ₹0 Free Standard Delivery included
                </span>
              </div>

              <button
                type="button"
                onClick={handleAddBundle}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#1E3A2F] text-white text-sm font-semibold hover:bg-[#294D3F] active:scale-95 transition-smooth shadow-md shrink-0"
              >
                <span>{addedAnimation ? 'Added Duo to Basket!' : 'Add Duo to Basket • ₹1,399'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
