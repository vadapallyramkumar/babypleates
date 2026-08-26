import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import ProductCard from "@/components/product/ProductCard";
import ProductDetail from "@/components/product/ProductDetail";
import {
  getCategory,
  getProduct,
  getRelatedProducts,
  listProducts,
} from "@/lib/api/catalog";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { data } = await listProducts({ limit: 100 });
  return data.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Product" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const category = await getCategory(product.category);
  const related = await getRelatedProducts(slug, 4);

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

        <ProductDetail product={product} categoryName={category?.name} />

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
