'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Check, ShieldCheck, Truck, RefreshCw, ShoppingBag, ArrowLeft, AlertCircle, Sparkles } from 'lucide-react';
import { Product, PackType, SingleCartItem } from '@/types';
import { useCart } from '@/context/CartContext';
import SupplyValueCalculator from './SupplyValueCalculator';

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedPack, setSelectedPack] = useState<PackType>(2); // Default to 2-bottle pack (popular)
  const [packQuantity, setPackQuantity] = useState<number>(1);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const { addItem } = useCart();

  const benefits: string[] = React.useMemo(() => {
    try {
      return JSON.parse(product.benefits);
    } catch {
      return [];
    }
  }, [product.benefits]);

  const packOptions = [
    {
      pack: 1 as PackType,
      bottles: 1,
      price: product.basePrice,
      separateTotal: product.basePrice * 1,
      savings: 0,
      label: '1 Bottle',
      sublabel: `${product.singleCount} ${product.form} (30 Days)`,
      badge: null,
    },
    {
      pack: 2 as PackType,
      bottles: 2,
      price: product.twoPrice,
      separateTotal: product.basePrice * 2,
      savings: product.basePrice * 2 - product.twoPrice, // 1598 - 1499 = 99
      label: '2 Bottles',
      sublabel: `${product.singleCount * 2} ${product.form} (60 Days)`,
      badge: 'Popular • Save ₹99',
    },
    {
      pack: 3 as PackType,
      bottles: 3,
      price: product.threePrice,
      separateTotal: product.basePrice * 3,
      savings: product.basePrice * 3 - product.threePrice, // 2397 - 2099 = 298
      label: '3 Bottles',
      sublabel: `${product.singleCount * 3} ${product.form} (90 Days)`,
      badge: 'Best Value • Save ₹298',
    },
  ];

  const currentPackOption = packOptions.find((p) => p.pack === selectedPack) || packOptions[1];
  const unitPrice = currentPackOption.price;
  const lineTotal = unitPrice * packQuantity;
  const totalBottlesCount = currentPackOption.bottles * packQuantity;

  const handleAddToCart = () => {
    const item: SingleCartItem = {
      id: `${product.slug}-pack-${selectedPack}`,
      itemType: 'SINGLE_PACK',
      productId: product.id,
      slug: product.slug,
      name: product.name,
      packType: selectedPack,
      quantity: packQuantity,
      unitPrice: unitPrice,
      bottleCountPerPack: currentPackOption.bottles,
      image: product.image,
      form: product.form,
    };

    addItem(item);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  return (
    <div className="py-8 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <Link
          href="/#catalogue"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#5D6B64] hover:text-[#1E3A2F] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Formulas</span>
        </Link>
      </nav>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        
        {/* Left Column: Product Image & Botanical Highlights (7 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="aspect-square bg-white rounded-3xl border border-[#E8E2D9] overflow-hidden flex items-center justify-center relative shadow-xs">
            <span className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-xs text-[#1E3A2F] text-xs font-semibold px-3 py-1 rounded-full border border-[#CADCD1] shadow-2xs">
              {product.category}
            </span>
            <img
              src={product.image}
              alt={`Full bottle presentation of ${product.name}`}
              className="w-full h-full object-cover transition-smooth"
            />
          </div>

          {/* Key Formula Benefits */}
          <div className="p-6 rounded-2xl bg-white border border-[#E8E2D9] space-y-3">
            <h3 className="text-sm font-bold text-[#1E3A2F] uppercase tracking-wider">
              Clinical Botanical Benefits
            </h3>
            <ul className="space-y-2.5">
              {benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-[#333C37]">
                  <Check className="w-4 h-4 text-[#8FA382] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Ingredients & Usage Guidance */}
          <div className="p-6 rounded-2xl bg-white border border-[#E8E2D9] space-y-4">
            <div>
              <h4 className="text-xs font-bold text-[#1E3A2F] uppercase tracking-wider">
                Active Botanical Synergists
              </h4>
              <p className="text-xs text-[#5D6B64] mt-1 leading-relaxed">
                {product.ingredients}
              </p>
            </div>
            <div className="pt-3 border-t border-[#F3EFEA]">
              <h4 className="text-xs font-bold text-[#1E3A2F] uppercase tracking-wider">
                Recommended Daily Protocol
              </h4>
              <p className="text-xs text-[#5D6B64] mt-1 leading-relaxed">
                {product.dosage}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Title, Pack Selector, F7 Calculator & Add to Cart (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Header & Badges */}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#8FA382] uppercase tracking-wider">
                {product.form === 'capsules' ? 'Standardized Vegetarian Capsules' : 'Coated Herbal Tablets'}
              </span>
              <span className="text-xs text-[#CADCD1]">•</span>
              <span className="text-xs font-semibold text-[#1E3A2F]">
                In Stock ({product.stock} units)
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1E3A2F] mt-1.5">
              {product.name}
            </h1>

            <p className="text-sm text-[#5D6B64] mt-2 leading-relaxed">
              {product.tagline}
            </p>
          </div>

          {/* Pack Selector (1 / 2 / 3 Bottles) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#1E3A2F] uppercase tracking-wider">
                Select Your Supply (Bottles)
              </label>
              {currentPackOption.savings > 0 && (
                <span className="text-xs font-bold text-[#1E3A2F] bg-[#EBF1ED] px-2 py-0.5 rounded-full">
                  You Save ₹{currentPackOption.savings}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {packOptions.map((opt) => {
                const isSelected = selectedPack === opt.pack;
                return (
                  <button
                    key={opt.pack}
                    type="button"
                    onClick={() => setSelectedPack(opt.pack)}
                    className={`p-4 rounded-xl border text-left transition-smooth relative flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#1E3A2F] bg-[#F4F7F5] ring-2 ring-[#1E3A2F] shadow-xs'
                        : 'border-[#E8E2D9] bg-white hover:border-[#CADCD1]'
                    }`}
                  >
                    <div>
                      {opt.badge && (
                        <span className="block text-[9px] font-bold text-[#1E3A2F] bg-[#CADCD1]/60 px-1.5 py-0.5 rounded mb-1.5 max-w-fit">
                          {opt.badge}
                        </span>
                      )}
                      <span className="text-xs font-bold text-[#1E3A2F] block">
                        {opt.label}
                      </span>
                      <span className="text-[10px] text-[#5D6B64] block mt-0.5">
                        {opt.sublabel}
                      </span>
                    </div>

                    <div className="mt-3 pt-2 border-t border-[#E8E2D9]">
                      <span className="text-base font-bold text-[#1E3A2F]">
                        ₹{opt.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* F7 Feature: Transparent Supply-Value Calculator */}
          <SupplyValueCalculator
            selectedPack={selectedPack}
            onSelectPack={(pack) => setSelectedPack(pack)}
            form={product.form}
          />

          {/* Quantity Controls & Dynamic Total */}
          <div className="p-5 rounded-2xl bg-white border border-[#E8E2D9] space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#1E3A2F] uppercase tracking-wider block">
                  Packs Quantity
                </span>
                <span className="text-[11px] text-[#5D6B64]">
                  {totalBottlesCount} total {totalBottlesCount > 1 ? 'bottles' : 'bottle'} in this selection
                </span>
              </div>

              {/* Quantity selector */}
              <div className="flex items-center border border-[#CADCD1] rounded-lg bg-[#FBF9F5] p-1">
                <button
                  type="button"
                  onClick={() => setPackQuantity(Math.max(1, packQuantity - 1))}
                  className="w-7 h-7 flex items-center justify-center rounded text-[#1E3A2F] hover:bg-[#EBF1ED] font-bold"
                  aria-label="Decrease pack quantity"
                >
                  -
                </button>
                <span className="w-8 text-center text-xs font-bold text-[#1E3A2F]">
                  {packQuantity}
                </span>
                <button
                  type="button"
                  onClick={() => setPackQuantity(packQuantity + 1)}
                  className="w-7 h-7 flex items-center justify-center rounded text-[#1E3A2F] hover:bg-[#EBF1ED] font-bold"
                  aria-label="Increase pack quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* Total calculation line */}
            <div className="pt-3 border-t border-[#F3EFEA] flex items-center justify-between">
              <div>
                <span className="text-xs text-[#5D6B64]">Selection Total</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-[#1E3A2F]">
                    ₹{lineTotal.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-[#8FA382] font-semibold">
                    (₹0 Free Shipping)
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#1E3A2F] text-white text-sm font-semibold hover:bg-[#294D3F] active:scale-95 transition-smooth shadow-md"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>
                  {addedAnimation ? 'Added to Basket!' : `Add to Basket • ₹${lineTotal.toLocaleString('en-IN')}`}
                </span>
              </button>
            </div>
          </div>

          {/* Demo Guarantee notes */}
          <div className="grid grid-cols-2 gap-3 text-xs text-[#5D6B64]">
            <div className="flex items-center gap-2 p-3 bg-white rounded-xl border border-[#E8E2D9]">
              <Truck className="w-4 h-4 text-[#8FA382] shrink-0" />
              <span>Free simulated shipping across India</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-white rounded-xl border border-[#E8E2D9]">
              <ShieldCheck className="w-4 h-4 text-[#8FA382] shrink-0" />
              <span>Simulated demo checkout only</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
