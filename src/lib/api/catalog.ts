import fallback from "@/data/catalog.fallback.json";
import { mapCategory, mapProduct } from "./map";
import type { ApiCategory, ApiProduct, ApiVariant, Category, Product } from "./types";

type ListMeta = { page: number; limit: number; total: number };

function enrichSeedProduct(raw: Record<string, unknown>): ApiProduct {
  const variants = (raw.variants as ApiVariant[]) ?? [];
  const active = variants.filter((v) => v.isActive !== false);
  let min = active[0];
  for (const v of active) {
    if (v.price.selling < (min?.price.selling ?? Infinity)) min = v;
  }
  return {
    ...(raw as unknown as ApiProduct),
    variants,
    colorGalleries: (raw.colorGalleries as ApiProduct["colorGalleries"]) ?? [],
    care: (raw.care as string[]) ?? [],
    tags: (raw.tags as string[]) ?? [],
    images: (raw.images as string[]) ?? [],
    priceFrom: min
      ? {
          selling: min.price.selling,
          ...(min.price.original != null
            ? { original: min.price.original }
            : {}),
          currency: "INR",
        }
      : { selling: 0, currency: "INR" },
    sizes: [...new Set(active.map((v) => v.size))],
    colors: [...new Set(active.map((v) => v.color))],
    stock: active.reduce((s, v) => s + v.stock, 0),
  };
}

function allCategories(): Category[] {
  return (fallback.categories as ApiCategory[]).map(mapCategory);
}

function allProducts(): Product[] {
  return (fallback.products as Record<string, unknown>[]).map((p) =>
    mapProduct(enrichSeedProduct(p))
  );
}

export async function listCategories(): Promise<Category[]> {
  return allCategories();
}

export async function getCategory(slug: string): Promise<Category | undefined> {
  return allCategories().find((c) => c.slug === slug);
}

export async function listProducts(params?: {
  category?: string;
  featured?: boolean;
  isNew?: boolean;
  tag?: string;
  q?: string;
  page?: number;
  limit?: number;
}): Promise<{ data: Product[]; meta: ListMeta }> {
  let data = allProducts();
  if (params?.featured) data = data.filter((p) => p.bestseller);
  if (params?.isNew) data = data.filter((p) => p.newArrival);
  if (params?.category) {
    data = data.filter((p) =>
      productMatchesCategorySync(p, params.category!, allCategories())
    );
  }
  if (params?.limit != null) data = data.slice(0, params.limit);
  return {
    data,
    meta: { page: 1, limit: data.length, total: data.length },
  };
}

export async function getProduct(slug: string): Promise<Product | null> {
  return allProducts().find((p) => p.slug === slug) ?? null;
}

export async function getBestsellers(limit = 8): Promise<Product[]> {
  const { data } = await listProducts({ featured: true, limit });
  return data.slice(0, limit);
}

export async function getNewArrivals(limit = 20): Promise<Product[]> {
  const { data } = await listProducts({ isNew: true, limit });
  return data.slice(0, limit);
}

export async function getProductsByCategory(
  category?: string
): Promise<Product[]> {
  const { data } = await listProducts({ category, limit: 100 });
  return data;
}

export async function getRelatedProducts(
  slug: string,
  limit = 4
): Promise<Product[]> {
  const product = await getProduct(slug);
  if (!product) {
    const { data } = await listProducts({ limit });
    return data.slice(0, limit);
  }
  const { data } = await listProducts({
    category: product.category,
    limit: limit + 5,
  });
  return data.filter((p) => p.slug !== slug).slice(0, limit);
}

function productMatchesCategorySync(
  product: Product,
  slug: string,
  cats: Category[]
) {
  const meta = cats.find((c) => c.slug === slug);
  if (meta?.filter === "budgetFriendly") return Boolean(product.budgetFriendly);
  if (meta?.filter === "readyToDispatch")
    return Boolean(product.readyToDispatch);
  if (meta?.filter === "bestseller") return Boolean(product.bestseller);
  return product.category === slug;
}

export function productMatchesCategory(product: Product, category: Category) {
  if (category.filter === "budgetFriendly")
    return Boolean(product.budgetFriendly);
  if (category.filter === "readyToDispatch")
    return Boolean(product.readyToDispatch);
  if (category.filter === "bestseller") return Boolean(product.bestseller);
  return product.category === category.slug;
}
