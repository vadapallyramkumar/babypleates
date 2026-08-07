import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import ProductCard from "@/components/product/ProductCard";
import {
  formatPrice,
  getProduct,
  getRelatedProducts,
  products,
} from "@/data/products";
import { getCategory } from "@/data/categories";
import { whatsappUrl } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const related = getRelatedProducts(slug, 4);

  return (
    <main className="pb-20 pt-10 md:pt-14">
      <Container>
        <nav className="mb-8 text-sm text-gray-500">
          <Link href="/shop" className="hover:text-[#A02C68]">
            Shop
          </Link>
          {category ? (
            <>
              <span className="mx-2">/</span>
              <Link
                href={`/shop?category=${category.slug}`}
                className="hover:text-[#A02C68]"
              >
                {category.name}
              </Link>
            </>
          ) : null}
          <span className="mx-2">/</span>
          <span className="text-gray-800">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="relative aspect-[3/4] overflow-hidden bg-[#F5E6EC]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div>
            {category ? (
              <p className="text-sm font-semibold tracking-wide text-[#A02C68] uppercase">
                {category.name}
              </p>
            ) : null}
            <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl text-gray-900 md:text-5xl">
              {product.name}
            </h1>
            <p className="mt-4 text-2xl font-medium text-[#A02C68]">
              From {formatPrice(product.price)}
            </p>
            <p className="mt-6 text-base leading-relaxed text-gray-600">
              {product.description}
            </p>

            <dl className="mt-8 space-y-3 border-t border-[#E8D0DA] pt-6 text-sm">
              {product.fabric ? (
                <div className="flex gap-3">
                  <dt className="w-24 shrink-0 font-semibold text-gray-900">
                    Fabric
                  </dt>
                  <dd className="text-gray-600">{product.fabric}</dd>
                </div>
              ) : null}
              {product.care ? (
                <div className="flex gap-3">
                  <dt className="w-24 shrink-0 font-semibold text-gray-900">
                    Care
                  </dt>
                  <dd className="text-gray-600">{product.care}</dd>
                </div>
              ) : null}
              <div className="flex gap-3">
                <dt className="w-24 shrink-0 font-semibold text-gray-900">
                  SKU
                </dt>
                <dd className="text-gray-600">{product.id}</dd>
              </div>
            </dl>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={whatsappUrl(
                  `Hi Baby Pleats! I'd like to order "${product.name}" (${product.id}). Please share sizes and availability.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex bg-[#A02C68] px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-[#8B235A]"
              >
                Order on WhatsApp
              </a>
              <Link
                href="/size-chart"
                className="inline-flex border border-[#A02C68] px-8 py-3.5 text-sm font-semibold text-[#A02C68] transition hover:bg-[#A02C68] hover:text-white"
              >
                Size Chart
              </Link>
            </div>
          </div>
        </div>

        {related.length > 0 ? (
          <section className="mt-20">
            <h2 className="font-[family-name:var(--font-display)] text-3xl text-gray-900">
              You May Also Like
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </section>
        ) : null}
      </Container>
    </main>
  );
}
