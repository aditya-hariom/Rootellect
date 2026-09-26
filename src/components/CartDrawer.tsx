'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const {
    items,
    isDrawerOpen,
    setIsDrawerOpen,
    updateQuantity,
    removeItem,
    totalAmount,
    totalBottles,
    isHydrated,
  } = useCart();

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-label="Shopping Cart Drawer">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#14271F]/50 backdrop-blur-sm transition-opacity"
        onClick={() => setIsDrawerOpen(false)}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FBF9F5] shadow-2xl flex flex-col border-l border-[#E8E2D9] animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 border-b border-[#E8E2D9] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#1E3A2F]" />
              <h2 className="text-lg font-serif font-bold text-[#1E3A2F]">
                Your Basket ({isHydrated ? items.reduce((acc, i) => acc + i.quantity, 0) : 0})
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setIsDrawerOpen(false)}
              className="p-1.5 rounded-lg text-[#5D6B64] hover:text-[#1E3A2F] hover:bg-[#F3EFEA] transition-smooth"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Contents */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {!isHydrated || items.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#EBF1ED] flex items-center justify-center text-[#8FA382] mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-semibold text-[#1E3A2F]">Your basket is empty</h3>
                <p className="text-xs text-[#5D6B64] mt-1.5 max-w-xs mx-auto">
                  Explore our targeted botanical formulas designed for stress, hormonal equilibrium, and wellness.
                </p>
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  className="mt-6 inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-[#1E3A2F] text-white text-xs font-semibold hover:bg-[#294D3F] transition-smooth shadow-sm"
                >
                  Explore Formulas
                </button>
              </div>
            ) : (
              <div className="space-y-3.5">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-white border border-[#E8E2D9] shadow-sm flex gap-3.5 items-start"
                  >
                    {/* Item Image */}
                    <div className="w-16 h-20 bg-[#F4F7F5] rounded-lg p-1 shrink-0 border border-[#EBF1ED] relative flex items-center justify-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <div>
                          <h4 className="text-sm font-bold text-[#1E3A2F] leading-tight truncate">
                            {item.name}
                          </h4>
                          {item.itemType === 'SINGLE_PACK' ? (
                            <p className="text-[11px] text-[#5D6B64] mt-0.5">
                              {item.packType}-Bottle Pack ({item.bottleCountPerPack} {item.bottleCountPerPack > 1 ? 'bottles' : 'bottle'})
                            </p>
                          ) : (
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className="text-[11px] text-[#5D6B64]">Duo Bundle (2 bottles)</span>
                              <span className="text-[10px] font-bold text-[#1E3A2F] bg-[#EBF1ED] px-1.5 py-0.2 rounded">
                                Save ₹{item.savings}
                              </span>
                            </div>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-[#5D6B64] hover:text-[#C25943] p-1 transition-colors"
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Pricing and Quantity Controls */}
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center border border-[#CADCD1] rounded-lg bg-[#FBF9F5] p-0.5">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 rounded text-[#1E3A2F] hover:bg-[#EBF1ED] transition-colors"
                            aria-label={`Decrease quantity of ${item.name}`}
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-7 text-center text-xs font-semibold text-[#1E3A2F]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 rounded text-[#1E3A2F] hover:bg-[#EBF1ED] transition-colors"
                            aria-label={`Increase quantity of ${item.name}`}
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="text-sm font-bold text-[#1E3A2F]">
                            ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                          </span>
                          {item.quantity > 1 && (
                            <p className="text-[10px] text-[#5D6B64]">
                              (₹{item.unitPrice.toLocaleString('en-IN')} each)
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Summary & Checkout CTA */}
          {isHydrated && items.length > 0 && (
            <div className="p-5 border-t border-[#E8E2D9] bg-white space-y-3 shadow-lg">
              <div className="space-y-1.5 text-xs text-[#5D6B64]">
                <div className="flex justify-between">
                  <span>Total Bottles Supplied</span>
                  <span className="font-semibold text-[#1E3A2F]">{totalBottles} bottles</span>
                </div>
                <div className="flex justify-between">
                  <span>Standard Shipping</span>
                  <span className="font-semibold text-[#1E3A2F]">FREE (₹0)</span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#1E3A2F] pt-2 border-t border-[#F3EFEA]">
                  <span>Subtotal</span>
                  <span>₹{totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-[#5D6B64] bg-[#F4F7F5] p-2 rounded-lg">
                <ShieldCheck className="w-4 h-4 text-[#8FA382] shrink-0" />
                <span>Simulated demo checkout. No card or payment details collected.</span>
              </div>

              <Link
                href="/checkout"
                onClick={() => setIsDrawerOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#1E3A2F] text-white text-sm font-semibold hover:bg-[#294D3F] active:scale-[0.98] transition-smooth shadow-md"
              >
                <span>Proceed to Guest Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
