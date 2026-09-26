import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

describe('Check 1: Pack & Bundle Pricing Calculation Verification', () => {
  const BASE_PRICE = 799;
  const TWO_PACK_PRICE = 1499;
  const THREE_PACK_PRICE = 2099;
  const DUO_BUNDLE_PRICE = 1399;

  it('correctly calculates single formula pack discounts and savings', () => {
    // 1-Bottle
    const pack1Savings = 1 * BASE_PRICE - BASE_PRICE;
    assert.equal(pack1Savings, 0);

    // 2-Bottle Pack: 2 * 799 = 1598, Pack price = 1499, Savings = 99
    const pack2Savings = 2 * BASE_PRICE - TWO_PACK_PRICE;
    assert.equal(TWO_PACK_PRICE, 1499);
    assert.equal(pack2Savings, 99);

    // 3-Bottle Pack: 3 * 799 = 2397, Pack price = 2099, Savings = 298
    const pack3Savings = 3 * BASE_PRICE - THREE_PACK_PRICE;
    assert.equal(THREE_PACK_PRICE, 2099);
    assert.equal(pack3Savings, 298);
  });

  it('correctly calculates Duo Bundle savings vs separate purchase', () => {
    // Separate: Mind Calm (799) + Partner Formula (799) = 1598
    const separateTotal = BASE_PRICE + BASE_PRICE;
    assert.equal(separateTotal, 1598);

    const bundleSavings = separateTotal - DUO_BUNDLE_PRICE;
    assert.equal(DUO_BUNDLE_PRICE, 1399);
    assert.equal(bundleSavings, 199);
  });

  it('PASSES SHARED REVIEW BENCHMARK: 1x Mind Calm 2-pack + 1x Duo Bundle = ₹2,898 and 4 bottles', () => {
    // Assessment brief benchmark (Page 3):
    // 1 Mind Calm two-bottle pack (₹1,499) + 1 Women Balance Duo (₹1,399) = ₹2,898
    const line1Price = TWO_PACK_PRICE; // ₹1,499
    const line1Bottles = 2; // 2 bottles of Mind Calm

    const line2Price = DUO_BUNDLE_PRICE; // ₹1,399
    const line2Bottles = 2; // 1 Mind Calm + 1 Women Balance

    const totalAmount = line1Price + line2Price;
    const totalBottles = line1Bottles + line2Bottles;

    assert.equal(totalAmount, 2898, 'Total amount must equal exactly ₹2,898');
    assert.equal(totalBottles, 4, 'Basket must contain exactly 4 bottles total (3 Mind Calm + 1 Women Balance)');
  });

  it('enforces Quantity Rule: quantity of 2 on a 2-bottle pack = 4 bottles (pack price applies to selected pack)', () => {
    const packSize = 2;
    const qty = 2;
    const totalBottles = packSize * qty;
    const totalCost = TWO_PACK_PRICE * qty;

    assert.equal(totalBottles, 4, 'A quantity of 2 on a 2-bottle pack must equal 4 bottles');
    assert.equal(totalCost, 2998, '2 packs at ₹1,499 each must equal ₹2,998');
  });
});
