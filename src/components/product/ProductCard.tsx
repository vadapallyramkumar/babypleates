"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { formatPrice, getFromPrice, type Product } from "@/lib/product-utils";
import { assetPath } from "@/lib/paths";
import { whatsappUrl } from "@/lib/site";

type ProductCardProps = {
  product: Product;
};

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function ProductCard({ product }: ProductCardProps) {
  const badge = product.bestseller
    ? "Bestseller"
    : product.newArrival
      ? "New"
      : null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
      className="group flex flex-col overflow-hidden rounded-xl border border-[#E8D5C4]/80 bg-[#FDF8F5] shadow-[0_4px_16px_-6px_rgba(90,40,50,0.18)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_28px_-10px_rgba(90,40,50,0.28)]"
    >
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-[#F5E6EC]">
          <Image
            src={assetPath(product.image)}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition duration-500 group-hover:scale-[1.04]"
          />
          {badge ? (
            <span className="absolute left-3 top-3 rounded-md bg-[#7A1B30] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-white md:text-[11px]">
              {badge}
            </span>
          ) : null}
        </div>

        <div className="flex flex-col items-center px-3 pt-4 text-center md:px-4 md:pt-5">
          <h3 className="font-[family-name:var(--font-display)] text-base font-semibold leading-snug text-[#7A1B30] md:text-lg">
            {product.name}
          </h3>

          <div className="mt-3 flex w-full items-center gap-2" aria-hidden>
            <span className="h-px flex-1 bg-[#7A1B30]/35" />
            <span className="size-1 rotate-45 bg-[#7A1B30]/70" />
            <span className="h-px flex-1 bg-[#7A1B30]/35" />
          </div>

          <p className="mt-3 text-sm text-[#7A1B30]">
            <span className="font-normal">From </span>
            <span className="font-semibold">
              {formatPrice(getFromPrice(product))}
            </span>
          </p>
        </div>
      </Link>

      <div className="mt-auto flex justify-center px-3 pb-5 pt-4 md:px-4 md:pb-6">
        <a
          href={whatsappUrl(
            `Hi Baby Pleats! I'm interested in "${product.name}" (${product.id}).`
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#7A1B30] bg-white px-3 py-2.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#7A1B30] transition hover:bg-[#7A1B30] hover:text-white md:text-[11px]"
        >
          <WhatsAppIcon className="size-4 shrink-0" />
          Order on WhatsApp
        </a>
      </div>
    </motion.article>
  );
}
