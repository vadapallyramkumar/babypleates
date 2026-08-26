"use client";

import { useMemo } from "react";
import Link from "next/link";
import {
  formatPrice,
  getUniqueColors,
  getUniqueSizes,
  getVariant,
  type Product,
} from "@/lib/product-utils";
import { whatsappUrl } from "@/lib/site";

type ProductPurchaseProps = {
  product: Product;
  color: string;
  size: string;
  onColorChange: (color: string) => void;
  onSizeChange: (size: string) => void;
};

const chipBase =
  "px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-40";
const chipIdle =
  "bg-white text-gray-700 ring-1 ring-[#E8D0DA] hover:text-[#A02C68]";
const chipActive = "bg-[#A02C68] text-white";

export default function ProductPurchase({
  product,
  color,
  size,
  onColorChange,
  onSizeChange,
}: ProductPurchaseProps) {
  const colors = getUniqueColors(product);
  const sizes = getUniqueSizes(product);

  const variant = useMemo(
    () => getVariant(product, size, color),
    [product, size, color]
  );

  const inStock = (variant?.stock ?? 0) > 0;

  const message = variant
    ? `Hi Baby Pleats! I'd like to order "${product.name}" (${product.id}), size ${variant.size}, colour ${variant.color} at ${formatPrice(variant.price)}.`
    : `Hi Baby Pleats! I'd like to order "${product.name}" (${product.id}).`;

  return (
    <div className="mt-8 space-y-6">
      <div>
        {variant ? (
          <p className="text-2xl font-medium text-[#A02C68]">
            {variant.compareAt && variant.compareAt > variant.price ? (
              <>
                <span className="mr-2 text-lg font-normal text-gray-400 line-through">
                  {formatPrice(variant.compareAt)}
                </span>
                {formatPrice(variant.price)}
              </>
            ) : (
              formatPrice(variant.price)
            )}
          </p>
        ) : (
          <p className="text-sm text-gray-500">
            This combination is not available.
          </p>
        )}
        {variant && !inStock ? (
          <p className="mt-1 text-sm font-medium text-gray-600">Out of stock</p>
        ) : null}
      </div>

      {colors.length > 0 ? (
        <fieldset>
          <legend className="mb-2 text-sm font-semibold text-gray-900">
            Colour
          </legend>
          <div className="flex flex-wrap gap-2">
            {colors.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => onColorChange(c)}
                className={`${chipBase} ${color === c ? chipActive : chipIdle}`}
              >
                {c}
              </button>
            ))}
          </div>
        </fieldset>
      ) : null}

      {sizes.length > 0 ? (
        <fieldset>
          <legend className="mb-2 text-sm font-semibold text-gray-900">
            Size
          </legend>
          <div className="flex flex-wrap gap-2">
            {sizes.map((s) => {
              const match = getVariant(product, s, color);
              return (
                <button
                  key={s}
                  type="button"
                  disabled={!match}
                  onClick={() => onSizeChange(s)}
                  className={`${chipBase} ${size === s && match ? chipActive : chipIdle}`}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </fieldset>
      ) : null}

      <div className="flex flex-wrap gap-3">
        {inStock && variant ? (
          <a
            href={whatsappUrl(message)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex bg-[#A02C68] px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-[#8B235A]"
          >
            Order on WhatsApp
          </a>
        ) : (
          <span className="inline-flex cursor-not-allowed bg-gray-300 px-8 py-3.5 text-sm font-semibold text-white">
            Order on WhatsApp
          </span>
        )}
        <Link
          href="/size-chart"
          className="inline-flex border border-[#A02C68] px-8 py-3.5 text-sm font-semibold text-[#A02C68] transition hover:bg-[#A02C68] hover:text-white"
        >
          Size Chart
        </Link>
      </div>
    </div>
  );
}
