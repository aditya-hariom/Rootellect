import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import prisma from '../src/lib/prisma';
import { processSimulatedOrder } from '../src/app/actions/checkout';
import { CheckoutCustomerData } from '../src/types';

describe('Check 2: Server-Side Validation & Tamper Rejection', () => {
  const dummyCustomer: CheckoutCustomerData = {
    fullName: 'Test Auditor',
    email: 'auditor@example.com',
    phone: '+91 99999 88888',
    address: '100 Security Boulevard',
    city: 'Hyderabad',
    postalCode: '500081',
  };

  it('rejects negative quantities with clear error', async () => {
    const response = await processSimulatedOrder(
      dummyCustomer,
      [
        {
          itemType: 'SINGLE_PACK',
          slug: 'mind-calm',
          packType: 1,
          quantity: -3, // Tampered negative quantity
        },
      ],
      'SUCCESS'
    );

    assert.equal(response.success, false);
    assert.match(response.error || '', /Invalid quantity detected/);
  });

  it('rejects non-integer / floating-point quantities', async () => {
    const response = await processSimulatedOrder(
      dummyCustomer,
      [
        {
          itemType: 'SINGLE_PACK',
          slug: 'mind-calm',
          packType: 1,
          quantity: 2.5 as unknown as number, // Tampered float quantity
        },
      ],
      'SUCCESS'
    );

    assert.equal(response.success, false);
    assert.match(response.error || '', /Invalid quantity detected/);
  });

  it('rejects unknown or tampered product identifiers', async () => {
    const response = await processSimulatedOrder(
      dummyCustomer,
      [
        {
          itemType: 'SINGLE_PACK',
          slug: 'counterfeit-miracle-supplement',
          packType: 1,
          quantity: 1,
        },
      ],
      'SUCCESS'
    );

    assert.equal(response.success, false);
    assert.match(response.error || '', /Invalid product reference/);
  });

  it('rejects an empty checkout items array', async () => {
    const response = await processSimulatedOrder(dummyCustomer, [], 'SUCCESS');

    assert.equal(response.success, false);
    assert.match(response.error || '', /Your cart is empty/);
  });

  it('handles intentional SIMULATE FAILURE action without creating order in DB', async () => {
    const ordersBefore = await prisma.order.count();

    const response = await processSimulatedOrder(
      dummyCustomer,
      [
        {
          itemType: 'SINGLE_PACK',
          slug: 'mind-calm',
          packType: 2,
          quantity: 1,
        },
      ],
      'FAILURE'
    );

    assert.equal(response.success, false);
    assert.match(response.error || '', /SIMULATION: Payment gateway rejected transaction/);

    const ordersAfter = await prisma.order.count();
    assert.equal(ordersBefore, ordersAfter, 'No order must be persisted on simulation failure');
  });

  after(async () => {
    await prisma.$disconnect();
  });
});
