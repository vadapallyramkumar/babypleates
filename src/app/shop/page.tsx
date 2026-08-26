import { Suspense } from "react";
import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import ShopCatalog from "@/components/shop/ShopCatalog";
import { listCategories, listProducts } from "@/lib/api/catalog";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Browse handmade pattu dresses and kids ethnic wear at Baby Pleats.",
};

export default async function ShopPage() {
  const [categories, { data: products }] = await Promise.all([
    listCategories(),
    listProducts({ limit: 100 }),
  ]);

  return (
    <main className="pb-20 pt-10 md:pt-14">
      <Container>
        <Suspense
          fallback={
            <p className="py-20 text-center text-gray-600">Loading shop…</p>
          }
        >
          <ShopCatalog categories={categories} products={products} />
        </Suspense>
      </Container>
    </main>
  );
}
