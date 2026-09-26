import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import AssessmentBanner from '@/components/AssessmentBanner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';

export const metadata: Metadata = {
  title: 'Rootellect Wellness | Botanical Formulations Demo',
  description:
    'Full-stack e-commerce demonstration created for the Rootellect Full-Stack Developer Intern technical assessment. Assessment demo — no real purchases.',
  robots: {
    index: false,
    follow: false,
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <body className="min-h-full flex flex-col bg-[#FBF9F5] text-[#1A1F1C]">
        <CartProvider>
          {/* F1: Mandatory Assessment Demo Banner */}
          <AssessmentBanner />

          {/* F1: Shared Responsive Header */}
          <Navbar />

          {/* Core Page Content */}
          <main className="flex-1">{children}</main>

          {/* Persistent Slide-Over Cart Drawer */}
          <CartDrawer />

          {/* F1: Shared Footer */}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
