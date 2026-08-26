import Hero from "@/components/home/Hero";
import Collections from "@/components/home/Collections";
import BestSellers from "@/components/home/BestSellers";
import InstagramFeed from "@/components/home/InstagramFeed";
import ContactStrip from "@/components/home/ContactStrip";
import { listCategories } from "@/lib/api/catalog";

export default async function Home() {
  const categories = await listCategories();

  return (
    <main>
      <Hero />
      <Collections categories={categories} />
      <BestSellers />
      <InstagramFeed />
      <ContactStrip />
    </main>
  );
}
