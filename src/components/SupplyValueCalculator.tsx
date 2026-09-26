'use client';

import React from 'react';
import { Calendar, TrendingDown, Clock, Sparkles } from 'lucide-react';
import { PackType } from '@/types';

interface SupplyValueCalculatorProps {
  selectedPack: PackType;
  onSelectPack: (pack: PackType) => void;
  form: string;
}

export default function SupplyValueCalculator({
  selectedPack,
  onSelectPack,
  form,
}: SupplyValueCalculatorProps) {
  const tiers = [
    {
      pack: 1 as PackType,
      bottles: 1,
      price: 799,
      days: 30,
      costPerDay: (799 / 30).toFixed(2),
      savings: 0,
      label: 'Trial Pack',
      badge: 'Starter',
    },
    {
      pack: 2 as PackType,
      bottles: 2,
      price: 1499,
      days: 60,
      costPerDay: (1499 / 60).toFixed(2),
      savings: 99,
      label: 'Optimal Habit Pack',
      badge: 'Save ₹99',
    },
    {
      pack: 3 as PackType,
      bottles: 3,
      price: 2099,
      days: 90,
      costPerDay: (2099 / 90).toFixed(2),
      savings: 298,
      label: 'Full Clinical Reset',
      badge: 'Best Value • Save ₹298',
    },
  ];

  return (
    <div className="rounded-2xl bg-white border border-[#E8E2D9] p-5 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#1E3A2F] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#8FA382]" />
            <span>F7 Feature • Supply-Value &amp; Daily Cost Calculator</span>
          </div>
          <p className="text-xs text-[#5D6B64] mt-0.5">
            Transparent breakdown of daily wellness investment and cycle duration.
          </p>
        </div>
        <span className="text-[11px] font-semibold text-[#8FA382] bg-[#EBF1ED] px-2 py-0.5 rounded-full shrink-0">
          Transparent Pricing
        </span>
      </div>

      {/* Tier Breakdown Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {tiers.map((t) => {
          const isSelected = selectedPack === t.pack;
          return (
            <button
              key={t.pack}
              type="button"
              onClick={() => onSelectPack(t.pack)}
              className={`text-left p-3.5 rounded-xl border transition-smooth relative flex flex-col justify-between ${
                isSelected
                  ? 'border-[#1E3A2F] bg-[#F4F7F5] shadow-sm ring-1 ring-[#1E3A2F]'
                  : 'border-[#E8E2D9] bg-[#FBF9F5] hover:border-[#CADCD1]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-bold text-[#1E3A2F] uppercase tracking-wider">
                    {t.bottles} {t.bottles > 1 ? 'Bottles' : 'Bottle'}
                  </span>
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                      isSelected
                        ? 'bg-[#1E3A2F] text-white'
                        : 'bg-[#EBF1ED] text-[#1E3A2F]'
                    }`}
                  >
                    {t.badge}
                  </span>
                </div>

                <div className="flex items-baseline gap-1 my-1">
                  <span className="text-lg font-bold text-[#1E3A2F]">₹{t.costPerDay}</span>
                  <span className="text-[10px] text-[#5D6B64]">/ day</span>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-[#5D6B64] mt-1">
                  <Clock className="w-3 h-3 text-[#8FA382]" />
                  <span>{t.days} Days Supply</span>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-[#E8E2D9]/80 flex items-center justify-between text-[11px]">
                <span className="text-[#5D6B64]">Total</span>
                <span className="font-bold text-[#1E3A2F]">₹{t.price}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Visual Timeline and Scientific Note */}
      <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E8E2D9] text-xs text-[#5D6B64] space-y-2">
        <div className="flex items-center justify-between text-[11px] font-semibold text-[#1E3A2F]">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-[#8FA382]" />
            Continuous Supply Coverage
          </span>
          <span>
            {selectedPack === 1 ? '30 Days' : selectedPack === 2 ? '60 Days' : '90 Days'}
          </span>
        </div>

        {/* Progress bar representing coverage */}
        <div className="w-full bg-[#EBF1ED] h-2 rounded-full overflow-hidden">
          <div
            className="bg-[#1E3A2F] h-full transition-all duration-300 rounded-full"
            style={{ width: `${(selectedPack / 3) * 100}%` }}
          />
        </div>

        <p className="text-[11px] leading-relaxed text-[#5D6B64]">
          {selectedPack === 1 && (
            <span>
              <strong>30-Day Starter:</strong> Great to evaluate tolerability. For sustained adaptogenic and hormonal balance, clinical studies suggest 60 to 90 consecutive days.
            </span>
          )}
          {selectedPack === 2 && (
            <span>
              <strong>60-Day Habit Formation:</strong> Save ₹99. Allows botanicals to reach steady-state metabolic equilibrium with reduced daily cost (₹24.98/day).
            </span>
          )}
          {selectedPack === 3 && (
            <span>
              <strong>90-Day Full Reset (Best Value):</strong> Save ₹298. Maximizes endocrine homeostasis at the lowest daily rate (₹23.32/day) with zero re-order hassle.
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
