import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function AssessmentBanner() {
  return (
    <aside
      aria-label="Assessment Demo Disclaimer"
      className="bg-[#1E3A2F] text-[#E8EFE9] text-xs py-2 px-4 border-b border-[#2D5243] text-center"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 font-medium tracking-wide">
        <AlertCircle className="w-3.5 h-3.5 text-[#8FA382] shrink-0" aria-hidden="true" />
        <span>
          <strong>Assessment demo — no real purchases.</strong> Built solely for technical evaluation. Prices and stock are simulated.
        </span>
      </div>
    </aside>
  );
}
