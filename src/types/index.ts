export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: string;
  form: string;
  singleCount: number;
  basePrice: number;    // 799
  twoPrice: number;     // 1499
  threePrice: number;   // 2099
  description: string;
  benefits: string;     // JSON string
  ingredients: string;
  dosage: string;
  stock: number;
  image: string;
}

export type PackType = 1 | 2 | 3;

export interface SingleCartItem {
  id: string; // Unique cart item key: e.g. "mind-calm-pack-2"
  itemType: 'SINGLE_PACK';
  productId: string;
  slug: string;
  name: string;
  packType: PackType;   // 1, 2, or 3 bottles
  quantity: number;     // Number of packs
  unitPrice: number;    // Pack price (799, 1499, or 2099)
  bottleCountPerPack: number; // 1, 2, or 3
  image: string;
  form: string;
}

export interface BundleCartItem {
  id: string; // Unique cart item key: e.g. "duo-mind-calm-women-balance"
  itemType: 'DUO_BUNDLE';
  baseSlug: 'mind-calm';
  partnerSlug: string;
  name: string;         // e.g. "Mind Calm + Women Balance Duo"
  partnerName: string;
  quantity: number;     // Number of bundles
  unitPrice: number;    // 1399
  bottleCountPerPack: 2; // Always 2 bottles (1 Mind Calm + 1 Partner)
  image: string;
  savings: number;      // 199
}

export type CartItem = SingleCartItem | BundleCartItem;

export interface CheckoutCustomerData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
}
