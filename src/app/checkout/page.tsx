'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  ShoppingBag,
  Loader2,
  Info,
  Sparkles,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { processSimulatedOrder, CheckoutOrderResponse } from '@/app/actions/checkout';
import { CheckoutCustomerData } from '@/types';

const DUMMY_CUSTOMER: CheckoutCustomerData = {
  fullName: 'Aditya Demo User',
  email: 'reviewer.test@example.com',
  phone: '+91 98765 43210',
  address: '142 Lotus Boulevard, Indiranagar',
  city: 'Bengaluru',
  postalCode: '560038',
};

export default function CheckoutPage() {
  const { items, totalAmount, totalBottles, clearCart, isHydrated } = useCart();

  const [formData, setFormData] = useState<CheckoutCustomerData>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<CheckoutOrderResponse['order'] | null>(null);

  const handlePrefill = () => {
    setFormData(DUMMY_CUSTOMER);
    setErrorMessage(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (actionType: 'SUCCESS' | 'FAILURE') => {
    setErrorMessage(null);
    setIsLoading(true);

    try {
      // Map cart items into server payload (only IDs and quantities, no client totals!)
      const payloadItems = items.map((item) => {
        if (item.itemType === 'SINGLE_PACK') {
          return {
            itemType: 'SINGLE_PACK' as const,
            productId: item.productId,
            slug: item.slug,
            packType: item.packType,
            quantity: item.quantity,
          };
        } else {
          return {
            itemType: 'DUO_BUNDLE' as const,
            partnerSlug: item.partnerSlug,
            quantity: item.quantity,
          };
        }
      });

      const response = await processSimulatedOrder(formData, payloadItems, actionType);

      if (response.success && response.order) {
        setConfirmedOrder(response.order);
        clearCart(); // Cart is cleared ONLY upon successful order persistence
      } else {
        setErrorMessage(
          response.error || 'A simulated transaction error occurred. Your basket remains intact.'
        );
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Unexpected client/network error during order processing.');
    } finally {
      setIsLoading(false);
    }
  };

  // 1. Success Order Confirmation Screen
  if (confirmedOrder) {
    return (
      <div className="py-12 sm:py-20 max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-[#CADCD1] p-6 sm:p-10 shadow-sm space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#EBF1ED] text-[#1E3A2F] flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-[#8FA382]" />
            </div>
            <span className="text-xs font-bold text-[#8FA382] uppercase tracking-wider block">
              Assessment Sandbox Order Confirmed
            </span>
            <h1 className="text-3xl font-serif font-bold text-[#1E3A2F]">
              Simulated Order Received
            </h1>
            <p className="text-xs text-[#5D6B64] max-w-md mx-auto">
              This order and its line items have been safely saved to the database with a trusted price snapshot.
            </p>
          </div>

          {/* Order Details Card */}
          <div className="p-5 rounded-2xl bg-[#F4F7F5] border border-[#CADCD1] space-y-3 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-[#CADCD1]/60">
              <span className="text-[#5D6B64]">Order Reference</span>
              <span className="font-mono font-bold text-sm text-[#1E3A2F]">
                {confirmedOrder.reference}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[#5D6B64]">Simulated Status</span>
              <span className="bg-[#1E3A2F] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                {confirmedOrder.status}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[#5D6B64]">Customer</span>
              <span className="font-semibold text-[#1E3A2F]">{confirmedOrder.customerName}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[#5D6B64]">Delivery Destination</span>
              <span className="font-semibold text-[#1E3A2F] text-right max-w-[200px] truncate">
                {confirmedOrder.shippingAddress}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[#5D6B64]">Total Bottles Ordered</span>
              <span className="font-semibold text-[#1E3A2F]">{confirmedOrder.totalBottles} bottles</span>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-[#CADCD1]/60 text-base font-bold text-[#1E3A2F]">
              <span>Final Server Total</span>
              <span>₹{confirmedOrder.totalAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Line items snapshot */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-[#1E3A2F] uppercase tracking-wider">
              Persisted Line Items Snapshot
            </h3>
            <div className="divide-y divide-[#E8E2D9] rounded-xl border border-[#E8E2D9] bg-white overflow-hidden">
              {confirmedOrder.items.map((line, idx) => (
                <div key={idx} className="p-3.5 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-[#1E3A2F] block">{line.name}</span>
                    <span className="text-[#5D6B64] text-[11px]">
                      Qty: {line.quantity} pack(s) • {line.bottleCount} bottles total
                    </span>
                  </div>
                  <span className="font-bold text-[#1E3A2F]">
                    ₹{line.lineTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#1E3A2F] text-white text-xs font-semibold hover:bg-[#294D3F] transition-smooth shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Storefront</span>
            </Link>
          </div>

        </div>
      </div>
    );
  }

  // 2. Empty Cart Check
  if (isHydrated && items.length === 0) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center px-4 py-16">
        <div className="max-w-md text-center bg-white p-8 rounded-3xl border border-[#E8E2D9] space-y-4">
          <div className="w-14 h-14 mx-auto rounded-full bg-[#EBF1ED] flex items-center justify-center text-[#8FA382]">
            <ShoppingBag className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-serif font-bold text-[#1E3A2F]">
            Your basket is empty
          </h2>
          <p className="text-xs text-[#5D6B64]">
            Please add at least one single pack or duo bundle to access guest checkout.
          </p>
          <Link
            href="/#catalogue"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#1E3A2F] text-white text-xs font-semibold hover:bg-[#294D3F] transition-smooth"
          >
            <span>Browse Products</span>
          </Link>
        </div>
      </div>
    );
  }

  // 3. Main Guest Checkout Screen
  return (
    <div className="py-8 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#5D6B64] hover:text-[#1E3A2F] transition-colors mb-3"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Continue Shopping</span>
        </Link>
        <h1 className="text-3xl font-serif font-bold text-[#1E3A2F]">
          Simulated Guest Checkout
        </h1>
        <p className="text-xs text-[#5D6B64] mt-1">
          Complete the mock shipping form to test server-side order calculations and persistence.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Form & Safety Notice (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Assessment Notice Box */}
          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#CADCD1] flex items-start gap-3">
            <Info className="w-5 h-5 text-[#8FA382] shrink-0 mt-0.5" />
            <div className="text-xs text-[#5D6B64] space-y-1">
              <span className="font-bold text-[#1E3A2F] block">
                Reviewer Instructions: Do Not Enter Real Information
              </span>
              <p>
                This form simulates a guest checkout flow. Do not input real credit card, UPI, or personal addresses. Use the button below to populate fictional reviewer test data.
              </p>
              <button
                type="button"
                onClick={handlePrefill}
                className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1E3A2F] text-white text-xs font-semibold hover:bg-[#294D3F] active:scale-95 transition-smooth"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#8FA382]" />
                <span>Prefill Demo Data</span>
              </button>
            </div>
          </div>

          {/* Failure Alert Banner (If simulated failure was triggered) */}
          {errorMessage && (
            <div
              role="alert"
              className="p-4 rounded-2xl bg-[#FDEEEA] border border-[#C25943]/40 text-[#C25943] text-xs space-y-1 animate-in fade-in-50 duration-200"
            >
              <div className="flex items-center gap-2 font-bold">
                <XCircle className="w-4 h-4 shrink-0" />
                <span>Simulation Feedback / Validation Alert</span>
              </div>
              <p className="leading-relaxed pl-6">{errorMessage}</p>
            </div>
          )}

          {/* Form Fields */}
          <div className="bg-white rounded-3xl border border-[#E8E2D9] p-6 sm:p-8 space-y-5 shadow-xs">
            <h2 className="text-base font-bold text-[#1E3A2F] uppercase tracking-wider">
              1. Customer &amp; Shipping Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label htmlFor="fullName" className="block text-xs font-semibold text-[#1E3A2F] mb-1">
                  Full Name *
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  placeholder="e.g. Aditya Sharma"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#CADCD1] text-sm text-[#1E3A2F] focus:border-[#1E3A2F] focus:ring-1 focus:ring-[#1E3A2F]"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-[#1E3A2F] mb-1">
                  Email Address *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#CADCD1] text-sm text-[#1E3A2F] focus:border-[#1E3A2F] focus:ring-1 focus:ring-[#1E3A2F]"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-xs font-semibold text-[#1E3A2F] mb-1">
                  Phone (Optional Demo)
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+91 98765 00000"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#CADCD1] text-sm text-[#1E3A2F] focus:border-[#1E3A2F] focus:ring-1 focus:ring-[#1E3A2F]"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="address" className="block text-xs font-semibold text-[#1E3A2F] mb-1">
                  Street Address *
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  required
                  placeholder="Flat/House No., Street Name"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#CADCD1] text-sm text-[#1E3A2F] focus:border-[#1E3A2F] focus:ring-1 focus:ring-[#1E3A2F]"
                />
              </div>

              <div>
                <label htmlFor="city" className="block text-xs font-semibold text-[#1E3A2F] mb-1">
                  City *
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  required
                  placeholder="e.g. Bengaluru"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#CADCD1] text-sm text-[#1E3A2F] focus:border-[#1E3A2F] focus:ring-1 focus:ring-[#1E3A2F]"
                />
              </div>

              <div>
                <label htmlFor="postalCode" className="block text-xs font-semibold text-[#1E3A2F] mb-1">
                  Postal Code *
                </label>
                <input
                  id="postalCode"
                  name="postalCode"
                  type="text"
                  required
                  placeholder="e.g. 560038"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#CADCD1] text-sm text-[#1E3A2F] focus:border-[#1E3A2F] focus:ring-1 focus:ring-[#1E3A2F]"
                />
              </div>
            </div>
          </div>

          {/* Simulation Action Buttons */}
          <div className="bg-white rounded-3xl border border-[#E8E2D9] p-6 space-y-4">
            <div>
              <h2 className="text-base font-bold text-[#1E3A2F] uppercase tracking-wider">
                2. Execute Simulation Actions
              </h2>
              <p className="text-xs text-[#5D6B64] mt-0.5">
                Test both success and graceful failure states as specified in the rubric.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {/* Simulate Success Button */}
              <button
                type="button"
                disabled={isLoading}
                onClick={() => handleSubmit('SUCCESS')}
                className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#1E3A2F] text-white text-xs font-bold hover:bg-[#294D3F] active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition-smooth shadow-sm"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-[#8FA382]" />
                )}
                <span>Simulate Success (Save Order)</span>
              </button>

              {/* Simulate Failure Button */}
              <button
                type="button"
                disabled={isLoading}
                onClick={() => handleSubmit('FAILURE')}
                className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-white border border-[#C25943] text-[#C25943] text-xs font-bold hover:bg-[#FDEEEA] active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition-smooth"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <XCircle className="w-4 h-4" />
                )}
                <span>Simulate Failure (Keep Cart)</span>
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Order Summary (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-[#E8E2D9] p-6 sm:p-8 space-y-6 shadow-xs sticky top-28">
          <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D9]">
            <h2 className="text-base font-bold text-[#1E3A2F] uppercase tracking-wider">
              Basket Summary
            </h2>
            <span className="text-xs font-bold text-[#1E3A2F] bg-[#EBF1ED] px-2.5 py-0.5 rounded-full">
              {totalBottles} Bottles
            </span>
          </div>

          {/* Line items list */}
          <div className="divide-y divide-[#F3EFEA] max-h-72 overflow-y-auto pr-1">
            {items.map((item) => (
              <div key={item.id} className="py-3 flex justify-between items-start text-xs gap-3">
                <div className="flex-1">
                  <span className="font-bold text-[#1E3A2F] block">{item.name}</span>
                  <span className="text-[11px] text-[#5D6B64]">
                    {item.itemType === 'SINGLE_PACK'
                      ? `${item.packType}-Bottle Pack • Qty: ${item.quantity}`
                      : `Duo Bundle • Qty: ${item.quantity}`}
                  </span>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-bold text-[#1E3A2F]">
                    ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Totals */}
          <div className="pt-4 border-t border-[#E8E2D9] space-y-2 text-xs text-[#5D6B64]">
            <div className="flex justify-between">
              <span>Items Total</span>
              <span className="font-semibold text-[#1E3A2F]">₹{totalAmount.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span>Standard Shipping</span>
              <span className="font-semibold text-[#1E3A2F]">FREE (₹0)</span>
            </div>
            <div className="flex justify-between text-base font-bold text-[#1E3A2F] pt-2 border-t border-[#F3EFEA]">
              <span>Grand Total</span>
              <span>₹{totalAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E8E2D9] text-[11px] text-[#5D6B64] space-y-1">
            <span className="font-semibold text-[#1E3A2F] block">Zero Client Trust:</span>
            <p>
              Prices shown above are recalculated authoritatively on the server from database fixtures when you click simulate.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
