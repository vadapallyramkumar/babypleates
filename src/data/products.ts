export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  category: string;
  image: string;
  bestseller?: boolean;
  newArrival?: boolean;
  description: string;
  fabric?: string;
  care?: string;
};

export const products: Product[] = [
  {
    id: "bp-001",
    slug: "rose-kanjeevaram-pattu-pavadai",
    name: "Rose Kanjeevaram Pattu Pavadai",
    price: 2499,
    category: "pattu-pavadai",
    image: "/hero.png",
    bestseller: true,
    description:
      "A soft rose Kanjeevaram pavadai with delicate border work — made for festivals and first blessings.",
    fabric: "Semi Kanjeevaram silk",
    care: "Dry clean recommended. Store folded with tissue.",
  },
  {
    id: "bp-002",
    slug: "ivory-gold-aari-gown",
    name: "Ivory & Gold Aari Gown",
    price: 2899,
    category: "pattu-gown",
    image: "/hero1.png",
    bestseller: true,
    newArrival: true,
    description:
      "An ivory silk gown with gold aari motifs — graceful for birthdays and poojas.",
    fabric: "Tissue silk with aari work",
    care: "Dry clean only. Avoid direct sunlight when storing.",
  },
  {
    id: "bp-003",
    slug: "magenta-classic-pavadai",
    name: "Magenta Classic Pattu Pavadai",
    price: 1999,
    category: "pattu-pavadai",
    image: "/hero.png",
    bestseller: true,
    description:
      "Rich magenta silk with a clean traditional cut — a Baby Pleats favourite.",
    fabric: "Soft silk blend",
    care: "Dry clean recommended.",
  },
  {
    id: "bp-004",
    slug: "pastel-half-saree-set",
    name: "Pastel Half Saree Set",
    price: 2699,
    category: "half-saree",
    image: "/hero1.png",
    bestseller: true,
    newArrival: true,
    description:
      "A pastel half saree with blouse and dupatta — light, festive, and photo-ready.",
    fabric: "Tissue silk",
    care: "Dry clean only.",
  },
  {
    id: "bp-005",
    slug: "emerald-aari-top-skirt",
    name: "Emerald Aari Top & Skirt",
    price: 2199,
    category: "top-skirt",
    image: "/hero.png",
    bestseller: true,
    description:
      "Emerald top and skirt with subtle aari work — easy to wear, lovely to gift.",
    fabric: "Soft silk with aari",
    care: "Dry clean recommended.",
  },
  {
    id: "bp-006",
    slug: "peach-blossom-frock",
    name: "Peach Blossom Frock",
    price: 1499,
    category: "frocks",
    image: "/hero1.png",
    bestseller: true,
    newArrival: true,
    description:
      "A peach frock with gentle ethnic accents — comfort for play and celebration.",
    fabric: "Cotton silk blend",
    care: "Gentle hand wash or dry clean.",
  },
  {
    id: "bp-007",
    slug: "royal-blue-pattu-gown",
    name: "Royal Blue Pattu Gown",
    price: 2599,
    category: "pattu-gown",
    image: "/hero.png",
    bestseller: true,
    description:
      "Deep blue silk gown with gold touches — statement wear for little princesses.",
    fabric: "Semi silk",
    care: "Dry clean only.",
  },
  {
    id: "bp-008",
    slug: "sunset-orange-pavadai",
    name: "Sunset Orange Pattu Pavadai",
    price: 2299,
    category: "pattu-pavadai",
    image: "/hero1.png",
    bestseller: true,
    newArrival: true,
    description:
      "Warm sunset orange pavadai with contrast border — bright and joyful.",
    fabric: "Soft Kanjeevaram blend",
    care: "Dry clean recommended.",
  },
  {
    id: "bp-009",
    slug: "lavender-aari-set",
    name: "Lavender Aari Work Set",
    price: 2399,
    category: "aari-work",
    image: "/hero.png",
    newArrival: true,
    description:
      "Lavender aari set with fine hand detailing — crafted for memorable occasions.",
    fabric: "Tissue silk with aari",
    care: "Dry clean only.",
  },
  {
    id: "bp-010",
    slug: "mint-cotton-tradition-frock",
    name: "Mint Cotton Tradition Frock",
    price: 999,
    category: "frocks",
    image: "/hero1.png",
    newArrival: true,
    description:
      "Breathable mint frock with a traditional touch — everyday ethnic ease.",
    fabric: "Soft cotton",
    care: "Gentle wash. Iron on low heat.",
  },
  {
    id: "bp-011",
    slug: "gold-border-half-saree",
    name: "Gold Border Half Saree",
    price: 2799,
    category: "half-saree",
    image: "/hero.png",
    description:
      "Classic half saree with a rich gold border for temple festivals and weddings.",
    fabric: "Semi Kanjeevaram",
    care: "Dry clean only.",
  },
  {
    id: "bp-012",
    slug: "coral-top-skirt",
    name: "Coral Top & Skirt",
    price: 1799,
    category: "top-skirt",
    image: "/hero1.png",
    description:
      "Coral separates that mix comfort with festive colour — easy dressing, beautiful photos.",
    fabric: "Soft silk blend",
    care: "Dry clean recommended.",
  },
];

export function formatPrice(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
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
