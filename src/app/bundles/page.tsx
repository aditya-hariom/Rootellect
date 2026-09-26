import React from 'react';
import type { Metadata } from 'next';
import BundleSection from '@/components/BundleSection';

export const metadata: Metadata = {
  title: 'Mind Calm Duo Bundles | Rootellect Assessment Demo',
  description: 'Pair Mind Calm with targeted women’s formulas to save ₹199 on dual botanical care.',
  robots: { index: false, follow: false },
};

export default function BundlesPage() {
  return (
    <div className="min-h-screen py-6">
      <BundleSection />
    </div>
  );
}
