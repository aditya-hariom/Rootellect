'use server';

import prisma from '@/lib/prisma';
import { CheckoutCustomerData } from '@/types';

export interface CheckoutPayloadItem {
  itemType: 'SINGLE_PACK' | 'DUO_BUNDLE';
  productId?: string;
  slug?: string;
  partnerSlug?: string;
  packType?: 1 | 2 | 3;
  quantity: number;
}

export interface CheckoutOrderResponse {
  success: boolean;
  error?: string;
  order?: {
    id: string;
    reference: string;
    customerName: string;
    customerEmail: string;
    shippingAddress: string;
    totalAmount: number;
    totalBottles: number;
    status: string;
    createdAt: string;
    items: {
      name: string;
      packType: number;
      quantity: number;
      unitPrice: number;
      lineTotal: number;
      bottleCount: number;
    }[];
  };
}

export async function processSimulatedOrder(
  customer: CheckoutCustomerData,
  rawItems: CheckoutPayloadItem[],
  simulateAction: 'SUCCESS' | 'FAILURE'
): Promise<CheckoutOrderResponse> {
  try {
    // 1. Validate customer fields
    if (
      !customer.fullName?.trim() ||
      !customer.email?.trim() ||
      !customer.address?.trim() ||
      !customer.city?.trim() ||
      !customer.postalCode?.trim()
    ) {
      return { success: false, error: 'Please fill in all required customer and shipping fields.' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customer.email)) {
      return { success: false, error: 'Please provide a valid email address.' };
    }

    // 2. Validate items array
    if (!Array.isArray(rawItems) || rawItems.length === 0) {
      return { success: false, error: 'Your cart is empty. Please add items before placing an order.' };
    }

    // 3. Check for intentional failure simulation
    if (simulateAction === 'FAILURE') {
      // Simulate artificial server latency
      await new Promise((resolve) => setTimeout(resolve, 800));
      return {
        success: false,
        error:
          'SIMULATION: Payment gateway rejected transaction (Card declined / insufficient sandbox funds). Your cart has been safely preserved so you can retry.',
      };
    }

    // 4. Server-Side Trusted Price & Stock Calculation
    // NEVER accept prices from client. Fetch unit prices and rules from trusted DB.
    let serverTotalAmount = 0;
    let serverTotalBottles = 0;

    const validatedOrderItems: {
      productId?: string;
      itemType: string;
      name: string;
      packType: number;
      quantity: number;
      unitPrice: number;
      lineTotal: number;
      bottleCount: number;
    }[] = [];

    // Pre-fetch all products for trusted resolution
    const allProducts = await prisma.product.findMany();
    const productMap = new Map(allProducts.map((p) => [p.slug, p]));
    const productByIdMap = new Map(allProducts.map((p) => [p.id, p]));

    for (const item of rawItems) {
      // Validate integer positive quantity
      const qty = Number(item.quantity);
      if (!Number.isInteger(qty) || qty <= 0) {
        return {
          success: false,
          error: `Invalid quantity detected (${item.quantity}). Quantities must be positive integers.`,
        };
      }

      if (item.itemType === 'SINGLE_PACK') {
        const product =
          (item.productId && productByIdMap.get(item.productId)) ||
          (item.slug && productMap.get(item.slug));

        if (!product) {
          return { success: false, error: `Invalid product reference for ${item.slug || item.productId}.` };
        }

        const pack = Number(item.packType) as 1 | 2 | 3;
        if (![1, 2, 3].includes(pack)) {
          return { success: false, error: `Invalid pack size (${item.packType}) selected.` };
        }

        // Trusted unit price from database schema
        let unitPrice = product.basePrice; // 799
        if (pack === 2) unitPrice = product.twoPrice; // 1499
        if (pack === 3) unitPrice = product.threePrice; // 2099

        const bottlesInThisLine = pack * qty;
        const lineTotal = unitPrice * qty;

        // Stock check
        if (product.stock < bottlesInThisLine) {
          return {
            success: false,
            error: `Insufficient stock for ${product.name}. Requested ${bottlesInThisLine} bottles, available: ${product.stock}.`,
          };
        }

        serverTotalAmount += lineTotal;
        serverTotalBottles += bottlesInThisLine;

        validatedOrderItems.push({
          productId: product.id,
          itemType: 'SINGLE_PACK',
          name: `${product.name} (${pack}-Bottle Pack)`,
          packType: pack,
          quantity: qty,
          unitPrice: unitPrice,
          lineTotal: lineTotal,
          bottleCount: bottlesInThisLine,
        });
      } else if (item.itemType === 'DUO_BUNDLE') {
        const mindCalm = productMap.get('mind-calm');
        const partner = item.partnerSlug ? productMap.get(item.partnerSlug) : undefined;

        if (!mindCalm || !partner) {
          return { success: false, error: 'Invalid bundle formula components specified.' };
        }

        // Duo bundle rule: Fixed ₹1,399 for 1 Mind Calm + 1 Partner formula
        const unitPrice = 1399;
        const bottlesInThisLine = 2 * qty; // 1 Mind Calm + 1 Partner per bundle
        const lineTotal = unitPrice * qty;

        // Verify component stock
        if (mindCalm.stock < qty || partner.stock < qty) {
          return {
            success: false,
            error: `Component stock shortage for bundle (${partner.name}).`,
          };
        }

        serverTotalAmount += lineTotal;
        serverTotalBottles += bottlesInThisLine;

        validatedOrderItems.push({
          productId: undefined,
          itemType: 'DUO_BUNDLE',
          name: `Mind Calm + ${partner.name} Duo`,
          packType: 2,
          quantity: qty,
          unitPrice: unitPrice,
          lineTotal: lineTotal,
          bottleCount: bottlesInThisLine,
        });
      } else {
        return { success: false, error: `Unrecognized item type (${item.itemType}).` };
      }
    }

    // 5. Generate deterministic reference & save to database
    const randomHex = Math.random().toString(36).substring(2, 7).toUpperCase();
    const reference = `ORD-2026-${randomHex}`;

    const createdOrder = await prisma.order.create({
      data: {
        reference,
        customerName: customer.fullName.trim(),
        customerEmail: customer.email.trim(),
        customerPhone: customer.phone.trim() || 'N/A',
        shippingAddress: customer.address.trim(),
        city: customer.city.trim(),
        postalCode: customer.postalCode.trim(),
        totalAmount: serverTotalAmount,
        totalBottles: serverTotalBottles,
        status: 'CONFIRMED',
        isSimulated: true,
        items: {
          create: validatedOrderItems.map((oi) => ({
            productId: oi.productId,
            itemType: oi.itemType,
            name: oi.name,
            packType: oi.packType,
            quantity: oi.quantity,
            unitPrice: oi.unitPrice,
            lineTotal: oi.lineTotal,
            bottleCount: oi.bottleCount,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return {
      success: true,
      order: {
        id: createdOrder.id,
        reference: createdOrder.reference,
        customerName: createdOrder.customerName,
        customerEmail: createdOrder.customerEmail,
        shippingAddress: `${createdOrder.shippingAddress}, ${createdOrder.city} - ${createdOrder.postalCode}`,
        totalAmount: createdOrder.totalAmount,
        totalBottles: createdOrder.totalBottles,
        status: createdOrder.status,
        createdAt: createdOrder.createdAt.toISOString(),
        items: createdOrder.items.map((it) => ({
          name: it.name,
          packType: it.packType,
          quantity: it.quantity,
          unitPrice: it.unitPrice,
          lineTotal: it.lineTotal,
          bottleCount: it.bottleCount,
        })),
      },
    };
  } catch (error) {
    console.error('Server order processing error:', error);
    return {
      success: false,
      error: 'An internal server error occurred while processing the order snapshot.',
    };
  }
}
