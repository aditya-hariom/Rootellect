import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProductBySlug } from '@/lib/products';
import ProductDetailClient from '@/components/ProductDetailClient';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Formula Not Found | Rootellect Demo',
      description: 'The requested botanical formulation could not be located in our demo catalogue.',
      robots: { index: false },
    };
  }

  return {
    title: `${product.name} | Rootellect Botanical Formulations (Assessment Demo)`,
    description: `${product.tagline}. Single bottle starting from ₹${product.basePrice}. Standardized herbal care demo.`,
    robots: {
      index: false,
      follow: false,
    },
    openGraph: {
      title: `${product.name} - Rootellect Demo`,
      description: product.tagline,
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
