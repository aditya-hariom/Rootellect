import { describe, it, after } from 'node:test';
import assert from 'node:assert/strict';
import prisma from '../src/lib/prisma';
import { processSimulatedOrder } from '../src/app/actions/checkout';
import { CheckoutCustomerData } from '../src/types';

describe('Check 3: End-to-End Order Flow & Database Persistence', () => {
  const reviewerCustomer: CheckoutCustomerData = {
    fullName: 'Technical Reviewer',
    email: 'reviewer@assessment.internal',
    phone: '+91 91234 56789',
    address: '42 Evaluation Way, Tech Park',
    city: 'Bengaluru',
    postalCode: '560100',
  };

  it('processes shared benchmark items, calculates trusted totals, and persists order snapshot in DB', async () => {
    // Shared benchmark from brief:
    // 1 Mind Calm two-bottle pack (₹1,499) + 1 Women Balance Duo (₹1,399) = ₹2,898
    const payloadItems = [
      {
        itemType: 'SINGLE_PACK' as const,
        slug: 'mind-calm',
        packType: 2 as const,
        quantity: 1, // 1 pack of 2 bottles = 2 bottles
      },
      {
        itemType: 'DUO_BUNDLE' as const,
        partnerSlug: 'women-balance-formula',
        quantity: 1, // 1 duo = 2 bottles (1 Mind Calm + 1 Women Balance)
      },
    ];

    const result = await processSimulatedOrder(reviewerCustomer, payloadItems, 'SUCCESS');

    // 1. Assert response structure
    assert.equal(result.success, true, 'Order processing must succeed');
    assert.ok(result.order, 'Order object must be returned');
    assert.match(result.order.reference, /^ORD-2026-[A-Z0-9]+$/, 'Order reference must match format ORD-2026-XXXX');

    // 2. Assert exact benchmark values
    assert.equal(result.order.totalAmount, 2898, 'Total amount must equal exactly ₹2,898');
    assert.equal(result.order.totalBottles, 4, 'Total bottle count must equal 4');
    assert.equal(result.order.status, 'CONFIRMED');

    // 3. Verify real persistence in SQLite/Postgres Prisma DB
    const dbOrder = await prisma.order.findUnique({
      where: { id: result.order.id },
      include: { items: true },
    });

    assert.ok(dbOrder, 'Order must be found in the database');
    assert.equal(dbOrder.reference, result.order.reference);
    assert.equal(dbOrder.totalAmount, 2898);
    assert.equal(dbOrder.totalBottles, 4);
    assert.equal(dbOrder.items.length, 2);

    // Verify snapshot values
    const singlePackItem = dbOrder.items.find((i) => i.itemType === 'SINGLE_PACK');
    const duoBundleItem = dbOrder.items.find((i) => i.itemType === 'DUO_BUNDLE');

    assert.ok(singlePackItem);
    assert.equal(singlePackItem.unitPrice, 1499);
    assert.equal(singlePackItem.bottleCount, 2);

    assert.ok(duoBundleItem);
    assert.equal(duoBundleItem.unitPrice, 1399);
    assert.equal(duoBundleItem.bottleCount, 2);

    // Cleanup demo test order
    await prisma.order.delete({ where: { id: dbOrder.id } });
  });

  after(async () => {
    await prisma.$disconnect();
  });
});
