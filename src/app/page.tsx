import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, ShieldCheck, Heart, Leaf, HelpCircle, RefreshCw, CheckCircle2 } from 'lucide-react';
import prisma from '@/lib/prisma';
import CatalogueSection from '@/components/CatalogueSection';
import BundleSection from '@/components/BundleSection';

// Ensure fresh dynamic rendering
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const products = await prisma.product.findMany({
    orderBy: { basePrice: 'asc' },
  });

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F4F7F5] via-[#FBF9F5] to-white pt-12 sm:pt-20 pb-16 sm:pb-24 border-b border-[#E8E2D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF1ED] border border-[#CADCD1] text-xs font-semibold text-[#1E3A2F]">
              <Leaf className="w-3.5 h-3.5 text-[#8FA382]" />
              <span>Evidence-Anchored Botanical Formulations</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#1E3A2F] tracking-tight leading-[1.15]">
              Targeted Botanical Care for Modern Nervous &amp; Hormonal Balance.
            </h1>

            <p className="text-base sm:text-lg text-[#5D6B64] leading-relaxed max-w-2xl">
              Rootellect crafts clean, standardized herbal therapeutics designed to nourish circadian calm, cycle equilibrium, and sustained vitality without synthetic additives.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="#catalogue"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#1E3A2F] text-white text-sm font-semibold hover:bg-[#294D3F] active:scale-95 transition-smooth shadow-md"
              >
                <span>Explore 4 Core Formulas</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#bundles"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-[#1E3A2F] border border-[#CADCD1] text-sm font-semibold hover:bg-[#F4F7F5] active:scale-95 transition-smooth shadow-2xs"
              >
                <Sparkles className="w-4 h-4 text-[#8FA382]" />
                <span>Mind Calm Duos (Save ₹199)</span>
              </Link>
            </div>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-[#E8E2D9]">
              <div>
                <span className="text-xl sm:text-2xl font-bold text-[#1E3A2F]">4</span>
                <p className="text-xs text-[#5D6B64] mt-0.5">Fixed Targeted Formulas</p>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-bold text-[#1E3A2F]">₹0</span>
                <p className="text-xs text-[#5D6B64] mt-0.5">Standard Pan-India Shipping</p>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-bold text-[#1E3A2F]">100%</span>
                <p className="text-xs text-[#5D6B64] mt-0.5">Standardized Botanicals</p>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-bold text-[#1E3A2F]">12%</span>
                <p className="text-xs text-[#5D6B64] mt-0.5">Max Savings on 3-Packs</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* F2: Product Catalogue Section */}
      <CatalogueSection products={products} />

      {/* F4: Duo Bundle Section */}
      <BundleSection />

      {/* Philosophy & Scientific Rigor Section (#science) */}
      <section id="science" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8FA382]">
              Clinical Standards
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1E3A2F]">
              Why Rootellect Reinvents Wellness Nutrition
            </h2>
            <p className="text-sm text-[#5D6B64] leading-relaxed">
              Most generic supplements rely on unstandardized crude herb powders with unpredictable bio-active levels. At Rootellect, every batch is verified for standardized marker compounds—guaranteeing therapeutic efficacy from the first dose to the final capsule.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#8FA382] shrink-0 mt-0.5" />
                <p className="text-xs text-[#333C37]">
                  <strong>Full Disclosure Labeling:</strong> Exactly what is in the formula is disclosed on the packaging with zero proprietary masking.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#8FA382] shrink-0 mt-0.5" />
                <p className="text-xs text-[#333C37]">
                  <strong>Synergistic Pairing:</strong> Our Mind Calm foundation integrates seamlessly with Women Balance, PCOS, or Perimenopause support.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#8FA382] shrink-0 mt-0.5" />
                <p className="text-xs text-[#333C37]">
                  <strong>Transparent Value:</strong> Multi-pack discounts engineered to lower daily therapy cost rather than trapping users into recurring lock-ins.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#FAF8F5] rounded-3xl p-8 border border-[#E8E2D9] space-y-6">
            <h3 className="text-xl font-serif font-bold text-[#1E3A2F]">
              The Multi-Month Biological Curve
            </h3>
            <p className="text-xs text-[#5D6B64] leading-relaxed">
              Herbal adaptogens work with systemic receptors rather than forcing artificial quick fixes. Here is how your body integrates botanicals over time:
            </p>
            <div className="space-y-4">
              <div className="p-3.5 bg-white rounded-xl border border-[#E8E2D9]">
                <div className="flex justify-between text-xs font-bold text-[#1E3A2F]">
                  <span>Month 1 (30 Days)</span>
                  <span className="text-[#8FA382]">Receptor Acclimatization</span>
                </div>
                <p className="text-[11px] text-[#5D6B64] mt-1">
                  Acute stress modulation, gentle evening nervous relaxation, and baseline gut absorption.
                </p>
              </div>
              <div className="p-3.5 bg-white rounded-xl border border-[#E8E2D9]">
                <div className="flex justify-between text-xs font-bold text-[#1E3A2F]">
                  <span>Month 2 (60 Days)</span>
                  <span className="text-[#8FA382]">Steady-State Equilibrium</span>
                </div>
                <p className="text-[11px] text-[#5D6B64] mt-1">
                  Smoothed hormonal peaks, cycle predictability, and consistent daytime resilience.
                </p>
              </div>
              <div className="p-3.5 bg-white rounded-xl border border-[#E8E2D9]">
                <div className="flex justify-between text-xs font-bold text-[#1E3A2F]">
                  <span>Month 3 (90 Days)</span>
                  <span className="text-[#8FA382]">Sustained Deep Homeostasis</span>
                </div>
                <p className="text-[11px] text-[#5D6B64] mt-1">
                  Long-term systemic adaptation, reduced PMS symptoms, and restorative circadian rhythm.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions (#faq) */}
      <section id="faq" className="py-16 sm:py-24 bg-[#FBF9F5] border-t border-[#E8E2D9]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8FA382]">
              Clarifications &amp; Details
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#1E3A2F] mt-1.5">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-[#5D6B64] mt-1">
              Transparent answers regarding product use, demonstration boundaries, and delivery.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-white border border-[#E8E2D9]">
              <h3 className="text-sm font-bold text-[#1E3A2F]">
                How does the Duo Bundle discount work?
              </h3>
              <p className="text-xs text-[#5D6B64] mt-1.5 leading-relaxed">
                When you pair Mind Calm (₹799) with any one of the other three formulas (₹799), the combined bundle total is fixed at ₹1,399 instead of ₹1,598—giving you an instant ₹199 direct saving.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#E8E2D9]">
              <h3 className="text-sm font-bold text-[#1E3A2F]">
                Are these products real and will real money be charged?
              </h3>
              <p className="text-xs text-[#5D6B64] mt-1.5 leading-relaxed">
                No. This application is a technical assessment demonstration created exclusively for full-stack engineering review. No real credit card or UPI charges occur, and no real physical items are shipped.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#E8E2D9]">
              <h3 className="text-sm font-bold text-[#1E3A2F]">
                How are multi-pack savings calculated?
              </h3>
              <p className="text-xs text-[#5D6B64] mt-1.5 leading-relaxed">
                Every formula follows identical tier pricing: 1 bottle = ₹799; 2 bottles = ₹1,499 (Save ₹99 vs ₹1,598); 3 bottles = ₹2,099 (Save ₹298 vs ₹2,397). The selected pack price is applied directly.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#E8E2D9]">
              <h3 className="text-sm font-bold text-[#1E3A2F]">
                Can I take Mind Calm alongside Women Balance or PCOS formulas?
              </h3>
              <p className="text-xs text-[#5D6B64] mt-1.5 leading-relaxed">
                Yes. Mind Calm targets nervous system and cortisol regulation, which synergistically aids the metabolic and endocrine pathways addressed by our women's health formulas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery & Returns Section (#delivery-returns) */}
      <section id="delivery-returns" className="py-12 bg-white border-t border-[#E8E2D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-[#5D6B64]">
            <div className="p-5 rounded-2xl bg-[#F4F7F5] border border-[#CADCD1]">
              <h3 className="text-sm font-bold text-[#1E3A2F] mb-1">Standard Simulated Delivery</h3>
              <p className="leading-relaxed">
                All demo orders qualify for ₹0 Pan-India free delivery. Simulated dispatch occurs within 24 business hours of order placement with simulated end-to-end tracking references.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-[#F4F7F5] border border-[#CADCD1]">
              <h3 className="text-sm font-bold text-[#1E3A2F] mb-1">Demo Returns &amp; Guarantee Policy</h3>
              <p className="leading-relaxed">
                In this assessment sandbox, orders are saved to the persistent database. Real return logistics are simulated. In production, customers enjoy a 30-day unopened bottle money-back satisfaction guarantee.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
