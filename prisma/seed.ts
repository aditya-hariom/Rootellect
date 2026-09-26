import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const INITIAL_PRODUCTS = [
  {
    slug: 'mind-calm',
    name: 'Mind Calm',
    tagline: 'Cognitive ease, stress resilience & restorative nervous system balance',
    category: 'Cognitive Health',
    form: 'capsules',
    singleCount: 30,
    basePrice: 799,
    twoPrice: 1499,
    threePrice: 2099,
    description:
      'Formulated with standardized botanical adaptogens and neuro-nutrients to modulate the stress response, promote alpha-wave calm without sedation, and support sustained mental clarity through demanding workdays.',
    benefits: JSON.stringify([
      'Supports emotional equilibrium and daily stress resilience',
      'Promotes calm focus and mental clarity without drowsiness',
      'Balances evening cortisol levels to ease transition into deep rest',
      'Non-habit forming botanical formulation',
    ]),
    ingredients: 'Ashwagandha KSM-66 (300mg), L-Theanine (150mg), Holy Basil/Tulsi Extract (100mg), Magnesium Glycinate (100mg)',
    dosage: 'Take 1 capsule daily with water, preferably in the late afternoon or 45 minutes before unwinding.',
    stock: 250,
    image: '/images/products/mind-calm.svg',
  },
  {
    slug: 'women-balance-formula',
    name: 'Women Balance Formula',
    tagline: 'Comprehensive daily endocrine harmony, vitality & cyclical rhythm support',
    category: "Women's Health",
    form: 'capsules',
    singleCount: 60,
    basePrice: 799,
    twoPrice: 1499,
    threePrice: 2099,
    description:
      'A holistic nutritional and phytotherapeutic blend formulated to nourish hypothalamic-pituitary-ovarian axis signaling, relieve monthly cyclical discomfort, and nurture glowing skin and balanced vitality.',
    benefits: JSON.stringify([
      'Promotes optimal estrogen-progesterone cyclical harmony',
      'Eases monthly cramping, breast tenderness, and mood fluctuations',
      'Nourishes healthy adrenal response and stable daily energy',
      'Features bio-identical herbal synergists and methyl-folate',
    ]),
    ingredients: 'Shatavari Extract (250mg), Chasteberry/Vitex (200mg), Dong Quai (150mg), Vitamin B6 (P5P, 25mg), Zinc Bisglycinate (15mg)',
    dosage: 'Take 2 capsules daily with breakfast or your first substantial meal.',
    stock: 220,
    image: '/images/products/women-balance.svg',
  },
  {
    slug: 'pcos-pcod-support-formula',
    name: 'PCOS & PCOD Support Formula',
    tagline: 'Targeted insulin sensitization, ovarian follicle health & cycle regularity',
    category: "Women's Health",
    form: 'tablets',
    singleCount: 60,
    basePrice: 799,
    twoPrice: 1499,
    threePrice: 2099,
    description:
      'Scientifically calibrated 40:1 ratio of Myo-Inositol to D-Chiro-Inositol enhanced with metabolic botanicals to support healthy ovarian function, clear hormonal acne, and regulate natural ovulation cycles.',
    benefits: JSON.stringify([
      'Gold standard 40:1 Myo & D-Chiro Inositol ratio for cellular insulin signaling',
      'Assists in normalizing menstrual cycle frequency and predictable ovulation',
      'Supports healthy androgen balance to minimize unwanted hair growth and hormonal breakouts',
      'Formulated with targeted metabolic co-factors',
    ]),
    ingredients: 'Myo-Inositol (2000mg equivalent), D-Chiro Inositol (50mg), Berberine HCl (250mg), Chromium Picolinate (200mcg), Folate (400mcg)',
    dosage: 'Take 2 tablets daily with water, ideally split before breakfast and dinner.',
    stock: 180,
    image: '/images/products/pcos-pcod.svg',
  },
  {
    slug: 'perimenopause-support',
    name: 'Perimenopause Support',
    tagline: 'Adaptive vasomotor comfort, stable mood & restorative nighttime serenity',
    category: "Women's Health",
    form: 'tablets',
    singleCount: 60,
    basePrice: 799,
    twoPrice: 1499,
    threePrice: 2099,
    description:
      'Designed specifically for the perimenopausal transition to smooth hormonal fluctuations, reduce the intensity of sudden hot flashes and night sweats, and foster emotional stability and restorative sleep.',
    benefits: JSON.stringify([
      'Helps moderate internal temperature fluctuations and night sweats',
      'Supports serotonin pathway balance for emotional stability and irritability reduction',
      'Promotes bone density preservation and joint mobility',
      '100% hormone-free, botanical phytoestrogen blend',
    ]),
    ingredients: 'Black Cohosh Extract (80mg), Red Clover Isoflavones (100mg), Sage Leaf Extract (150mg), Maca Root Gelatinized (250mg), Marine Magnesium (120mg)',
    dosage: 'Take 2 tablets daily with dinner or 1 hour prior to sleep.',
    stock: 190,
    image: '/images/products/perimenopause.svg',
  },
];

async function main() {
  console.log('Seeding Rootellect assessment products...');

  for (const item of INITIAL_PRODUCTS) {
    await prisma.product.upsert({
      where: { slug: item.slug },
      update: item,
      create: item,
    });
  }

  console.log(`Successfully seeded ${INITIAL_PRODUCTS.length} products into the database.`);
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
