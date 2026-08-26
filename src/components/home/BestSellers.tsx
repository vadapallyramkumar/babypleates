import Link from "next/link";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/common/SectionHeading";
import ProductCard from "@/components/product/ProductCard";
import { getBestsellers } from "@/lib/api/catalog";

export default async function BestSellers() {
  const items = await getBestsellers(8);

  return (
    <section className="border-t border-[#E8D0DA]/60 bg-white py-16 md:py-20">
      <Container>
        <SectionHeading
          title="Best Sellers"
          subtitle="Our most-loved outfits — the ones families come back for."
        />

        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 md:gap-x-6">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/shop?category=best-sellers"
            className="inline-flex bg-[#A02C68] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#8B235A]"
          >
            View All Best Sellers
          </Link>
        </div>
      </Container>
    </section>
  );
}
