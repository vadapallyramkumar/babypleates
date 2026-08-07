"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/product/ProductCard";
import SectionHeading from "@/components/common/SectionHeading";
import { categories } from "@/data/categories";
import {
  getNewArrivals,
  getProductsByCategory,
  products,
} from "@/data/products";
import { assetPath } from "@/lib/paths";

export default function ShopCatalog() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") ?? undefined;
  const sort = searchParams.get("sort") ?? undefined;

  let items =
    sort === "new" ? getNewArrivals(20) : getProductsByCategory(category);

  if (sort === "new" && category) {
    items = items.filter((p) => p.category === category);
  }

  const activeCategory = categories.find((c) => c.slug === category);
  const title =
    sort === "new"
      ? "New Arrivals"
      : activeCategory
        ? activeCategory.name
        : "Shop All";

  return (
    <>
      <SectionHeading
        align="left"
        title={title}
        subtitle={
          activeCategory?.description ??
          "Handmade ethnic wear crafted for comfort and celebration."
        }
      />

      <div className="mb-10 flex flex-wrap gap-2">
        <Link
          href="/shop"
          className={`px-4 py-2 text-sm font-medium transition ${
            !category && sort !== "new"
              ? "bg-[#A02C68] text-white"
              : "bg-white text-gray-700 ring-1 ring-[#E8D0DA] hover:text-[#A02C68]"
          }`}
        >
          All
        </Link>
        <Link
          href="/shop?sort=new"
          className={`px-4 py-2 text-sm font-medium transition ${
            sort === "new"
              ? "bg-[#A02C68] text-white"
              : "bg-white text-gray-700 ring-1 ring-[#E8D0DA] hover:text-[#A02C68]"
          }`}
        >
          New
        </Link>
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/shop?category=${c.slug}`}
            className={`px-4 py-2 text-sm font-medium transition ${
              category === c.slug
                ? "bg-[#A02C68] text-white"
                : "bg-white text-gray-700 ring-1 ring-[#E8D0DA] hover:text-[#A02C68]"
            }`}
          >
            {c.name}
          </Link>
        ))}
      </div>

      {items.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-gray-600">No products in this collection yet.</p>
          <Link
            href="/shop"
            className="mt-4 inline-block font-semibold text-[#A02C68]"
          >
            View all products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 md:gap-x-6">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {!category && sort !== "new" && products.length > 0 ? (
        <div className="mt-16 overflow-hidden bg-[#F5E6EC]">
          <div className="grid md:grid-cols-2">
            <div className="relative min-h-[240px] md:min-h-[320px]">
              <Image
                src={assetPath("/hero.png")}
                alt="Baby Pleats collection"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="flex flex-col justify-center px-8 py-10 md:px-12">
              <h2 className="font-[family-name:var(--font-display)] text-3xl text-gray-900">
                Need help choosing?
              </h2>
              <p className="mt-3 text-gray-600">
                Tell us the occasion and age — we&apos;ll suggest the right
                outfit on WhatsApp.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex w-fit bg-[#A02C68] px-6 py-3 text-sm font-semibold text-white hover:bg-[#8B235A]"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
