"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/common/SectionHeading";
import type { Category } from "@/lib/api/types";
import { assetPath } from "@/lib/paths";

type CollectionsProps = {
  categories: Category[];
};

export default function Collections({ categories }: CollectionsProps) {
  return (
    <section className="bg-[#FFF8F5] py-16 md:py-20">
      <Container>
        <SectionHeading
          title="Browse Our Collections"
          subtitle="Explore handcrafted ethnic styles for every little celebration."
        />

        <Carousel opts={{ align: "start", loop: false }} className="w-full">
          <CarouselContent className="-ml-3 md:-ml-4">
            {categories.map((category) => (
              <CarouselItem
                key={category.slug}
                className="basis-[70%] pl-3 sm:basis-1/2 md:basis-1/3 md:pl-4 lg:basis-1/4 xl:basis-1/5"
              >
                <Link
                  href={`/shop?category=${category.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#F5E6EC]">
                    <Image
                      src={assetPath(category.image)}
                      alt={category.name}
                      fill
                      sizes="(max-width: 768px) 70vw, 20vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pb-4 pt-12">
                      <p className="font-[family-name:var(--font-display)] text-lg leading-tight text-white md:text-xl">
                        {category.name}
                      </p>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 hidden border-[#A02C68]/30 bg-white/90 md:flex" />
          <CarouselNext className="right-0 hidden border-[#A02C68]/30 bg-white/90 md:flex" />
        </Carousel>

        <div className="mt-10 flex justify-center">
          <Link
            href="/shop"
            className="inline-flex border border-[#A02C68] px-8 py-3 text-sm font-semibold text-[#A02C68] transition hover:bg-[#A02C68] hover:text-white"
          >
            View All
          </Link>
        </div>
      </Container>
    </section>
  );
}
