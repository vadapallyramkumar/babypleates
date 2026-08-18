export type ProductVariant = {
  id: string;
  size: string;
  color: string;
  price: number;
  compareAt?: number;
  stock: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  image: string;
  bestseller?: boolean;
  newArrival?: boolean;
  description: string;
  fabric?: string;
  care?: string;
  colorImages: Record<string, string[]>;
  variants: ProductVariant[];
};

type ColorSpec = {
  name: string;
  extra?: number;
  images: string[];
};

function colorCode(color: string) {
  return color
    .replace(/[^a-zA-Z0-9]+/g, "")
    .slice(0, 3)
    .toUpperCase();
}

function makeVariants(
  productId: string,
  colors: ColorSpec[],
  sizes: string[],
  basePrice: number,
  options?: {
    omit?: Array<[string, string]>;
    outOfStock?: Array<[string, string]>;
  }
): ProductVariant[] {
  const omit = new Set((options?.omit ?? []).map(([c, s]) => `${c}::${s}`));
  const outOfStock = new Set(
    (options?.outOfStock ?? []).map(([c, s]) => `${c}::${s}`)
  );

  return colors.flatMap((color, colorIndex) =>
    sizes.flatMap((size, sizeIndex) => {
      if (omit.has(`${color.name}::${size}`)) return [];
      const price = basePrice + sizeIndex * 200 + (color.extra ?? 0);
      return [
        {
          id: `${productId}-${colorCode(color.name)}-${size}`,
          size,
          color: color.name,
          price,
          compareAt: price + 500,
          stock: outOfStock.has(`${color.name}::${size}`)
            ? 0
            : Math.max(1, 4 - sizeIndex - colorIndex),
        } satisfies ProductVariant,
      ];
    })
  );
}

function makeCatalog(
  productId: string,
  colors: ColorSpec[],
  sizes: string[],
  basePrice: number,
  options?: {
    omit?: Array<[string, string]>;
    outOfStock?: Array<[string, string]>;
  }
) {
  return {
    image: colors[0]?.images[0] ?? "/hero.png",
    colorImages: Object.fromEntries(
      colors.map((c) => [c.name, c.images])
    ) as Record<string, string[]>,
    variants: makeVariants(productId, colors, sizes, basePrice, options),
  };
}

export const products: Product[] = [
  {
    id: "bp-001",
    slug: "rose-kanjeevaram-pattu-pavadai",
    name: "Rose Kanjeevaram Pattu Pavadai",
    category: "pattu-pavadai",
    bestseller: true,
    description:
      "A soft rose Kanjeevaram pavadai with delicate border work — made for festivals and first blessings.",
    fabric: "Semi Kanjeevaram silk",
    care: "Dry clean recommended. Store folded with tissue.",
    ...makeCatalog(
      "bp-001",
      [
        { name: "Rose", images: ["/pattu.png", "/pattupavvadi.jpg"] },
        { name: "Gold", extra: 300, images: ["/hero1.png"] },
      ],
      ["1Y", "2Y", "3Y", "4Y"],
      2499,
      { omit: [["Gold", "1Y"]], outOfStock: [["Gold", "4Y"]] }
    ),
  },
  {
    id: "bp-002",
    slug: "ivory-gold-aari-gown",
    name: "Ivory & Gold Aari Gown",
    category: "pattu-gown",
    bestseller: true,
    newArrival: true,
    description:
      "An ivory silk gown with gold aari motifs — graceful for birthdays and poojas.",
    fabric: "Tissue silk with aari work",
    care: "Dry clean only. Avoid direct sunlight when storing.",
    ...makeCatalog(
      "bp-002",
      [
        { name: "Ivory", images: ["/green_pattu.png", "/brown_pattu.png"] },
        { name: "Gold", extra: 250, images: ["/hero.png"] },
      ],
      ["2Y", "3Y", "4Y", "5Y"],
      2899
    ),
  },
  {
    id: "bp-003",
    slug: "magenta-classic-pavadai",
    name: "Magenta Classic Pattu Pavadai",
    category: "pattu-pavadai",
    bestseller: true,
    description:
      "Rich magenta silk with a clean traditional cut — a Baby Pleats favourite.",
    fabric: "Soft silk blend",
    care: "Dry clean recommended.",
    ...makeCatalog(
      "bp-003",
      [
        { name: "Magenta", images: ["/pattupavvadi.jpg", "/hero.png"] },
        { name: "Pink", extra: 150, images: ["/hero1.png"] },
      ],
      ["1Y", "2Y", "3Y", "4Y"],
      1999
    ),
  },
  {
    id: "bp-004",
    slug: "pastel-half-saree-set",
    name: "Pastel Half Saree Set",
    category: "half-saree",
    bestseller: true,
    newArrival: true,
    description:
      "A pastel half saree with blouse and dupatta — light, festive, and photo-ready.",
    fabric: "Tissue silk",
    care: "Dry clean only.",
    ...makeCatalog(
      "bp-004",
      [
        { name: "Pastel Pink", images: ["/halfsaree.webp", "/hero1.png"] },
        { name: "Mint", extra: 200, images: ["/frocks.webp"] },
      ],
      ["8Y", "10Y", "12Y"],
      2699
    ),
  },
  {
    id: "bp-005",
    slug: "emerald-aari-top-skirt",
    name: "Emerald Aari Top & Skirt",
    category: "top-skirt",
    bestseller: true,
    description:
      "Emerald top and skirt with subtle aari work — easy to wear, lovely to gift.",
    fabric: "Soft silk with aari",
    care: "Dry clean recommended.",
    ...makeCatalog(
      "bp-005",
      [
        { name: "Emerald", images: ["/topandskit.jpg", "/aariwork.jpg"] },
        { name: "Peacock", extra: 200, images: ["/hero.png"] },
      ],
      ["2Y", "3Y", "4Y", "5Y"],
      2199
    ),
  },
  {
    id: "bp-006",
    slug: "peach-blossom-frock",
    name: "Peach Blossom Frock",
    category: "frocks",
    bestseller: true,
    newArrival: true,
    description:
      "A peach frock with gentle ethnic accents — comfort for play and celebration.",
    fabric: "Cotton silk blend",
    care: "Gentle hand wash or dry clean.",
    ...makeCatalog(
      "bp-006",
      [
        { name: "Peach", images: ["/frocks_new.webp", "/hero1.png"] },
        { name: "Ivory", extra: 100, images: ["/hero.png"] },
      ],
      ["1Y", "2Y", "3Y", "4Y"],
      1499
    ),
  },
  {
    id: "bp-007",
    slug: "royal-blue-pattu-gown",
    name: "Royal Blue Pattu Gown",
    category: "pattu-gown",
    bestseller: true,
    description:
      "Deep blue silk gown with gold touches — statement wear for little princesses.",
    fabric: "Semi silk",
    care: "Dry clean only.",
    ...makeCatalog(
      "bp-007",
      [
        { name: "Royal Blue", images: ["/pattugown.webp", "/hero.png"] },
        { name: "Navy", extra: 150, images: ["/hero1.png"] },
      ],
      ["3Y", "4Y", "5Y", "6Y"],
      2599
    ),
  },
  {
    id: "bp-008",
    slug: "sunset-orange-pavadai",
    name: "Sunset Orange Pattu Pavadai",
    category: "pattu-pavadai",
    bestseller: true,
    newArrival: true,
    description:
      "Warm sunset orange pavadai with contrast border — bright and joyful.",
    fabric: "Soft Kanjeevaram blend",
    care: "Dry clean recommended.",
    ...makeCatalog(
      "bp-008",
      [
        { name: "Sunset Orange", images: ["/sunset.png"] },
        { name: "Mustard", extra: 200, images: ["/hero1.png", "/hero.png"] },
      ],
      ["1Y", "2Y", "3Y", "4Y"],
      2299
    ),
  },
  {
    id: "bp-009",
    slug: "lavender-aari-set",
    name: "Lavender Aari Work Set",
    category: "aari-work",
    newArrival: true,
    description:
      "Lavender aari set with fine hand detailing — crafted for memorable occasions.",
    fabric: "Tissue silk with aari",
    care: "Dry clean only.",
    ...makeCatalog(
      "bp-009",
      [
        { name: "Lavender", images: ["/aariwork.jpg", "/hero.png"] },
        { name: "Ivory", extra: 150, images: ["/hero1.png"] },
      ],
      ["2Y", "3Y", "4Y", "5Y"],
      2399
    ),
  },
  {
    id: "bp-010",
    slug: "mint-cotton-tradition-frock",
    name: "Mint Cotton Tradition Frock",
    category: "frocks",
    newArrival: true,
    description:
      "Breathable mint frock with a traditional touch — everyday ethnic ease.",
    fabric: "Soft cotton",
    care: "Gentle wash. Iron on low heat.",
    ...makeCatalog(
      "bp-010",
      [
        { name: "Mint", images: ["/frocks.webp"] },
        { name: "White", extra: 100, images: ["/hero1.png", "/hero.png"] },
      ],
      ["1Y", "2Y", "3Y"],
      999
    ),
  },
  {
    id: "bp-011",
    slug: "gold-border-half-saree",
    name: "Gold Border Half Saree",
    category: "half-saree",
    description:
      "Classic half saree with a rich gold border for temple festivals and weddings.",
    fabric: "Semi Kanjeevaram",
    care: "Dry clean only.",
    ...makeCatalog(
      "bp-011",
      [
        { name: "Maroon", images: ["/halfsaree.webp", "/hero.png"] },
        { name: "Gold", extra: 300, images: ["/hero1.png"] },
      ],
      ["8Y", "10Y", "12Y"],
      2799,
      { omit: [["Gold", "8Y"]] }
    ),
  },
  {
    id: "bp-012",
    slug: "coral-top-skirt",
    name: "Coral Top & Skirt",
    category: "top-skirt",
    description:
      "Coral separates that mix comfort with festive colour — easy dressing, beautiful photos.",
    fabric: "Soft silk blend",
    care: "Dry clean recommended.",
    ...makeCatalog(
      "bp-012",
      [
        { name: "Coral", images: ["/topandskit.jpg"] },
        { name: "Peach", extra: 100, images: ["/frocks.webp", "/hero1.png"] },
      ],
      ["2Y", "3Y", "4Y", "5Y"],
      1799
    ),
  },
];

export function formatPrice(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getFromPrice(product: Product) {
  return Math.min(...product.variants.map((v) => v.price));
}

export function getUniqueSizes(product: Product) {
  return [...new Set(product.variants.map((v) => v.size))];
}

export function getUniqueColors(product: Product) {
  return [...new Set(product.variants.map((v) => v.color))];
}

export function getColorImages(product: Product, color: string) {
  const images = product.colorImages[color];
  if (images && images.length > 0) return images;
  return [product.image];
}

export function getVariant(
  product: Product,
  size: string,
  color: string
) {
  return product.variants.find((v) => v.size === size && v.color === color);
}

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getBestsellers(limit = 8) {
  return products.filter((p) => p.bestseller).slice(0, limit);
}

export function getNewArrivals(limit = 8) {
  return products.filter((p) => p.newArrival).slice(0, limit);
}

export function getProductsByCategory(category?: string) {
  if (!category) return products;
  return products.filter((p) => p.category === category);
}

export function getRelatedProducts(slug: string, limit = 4) {
  const product = getProduct(slug);
  if (!product) return products.slice(0, limit);
  return products
    .filter((p) => p.category === product.category && p.slug !== slug)
    .slice(0, limit);
}
