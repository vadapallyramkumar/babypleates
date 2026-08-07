"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { formatPrice, type Product } from "@/data/products";
import { whatsappUrl } from "@/lib/site";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
      className="group"
    >
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-[#F5E6EC]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </div>
        <div className="mt-3 space-y-1">
          <h3 className="font-[family-name:var(--font-display)] text-lg leading-snug text-gray-900 transition group-hover:text-[#A02C68]">
            {product.name}
          </h3>
          <p className="text-sm font-medium text-[#A02C68]">
            From {formatPrice(product.price)}
          </p>
        </div>
      </Link>
      <a
        href={whatsappUrl(
          `Hi Baby Pleats! I'm interested in "${product.name}" (${product.id}).`
        )}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-block text-sm font-semibold text-gray-700 underline-offset-4 hover:text-[#A02C68] hover:underline"
      >
        Order on WhatsApp
      </a>
    </motion.article>
  );
}
