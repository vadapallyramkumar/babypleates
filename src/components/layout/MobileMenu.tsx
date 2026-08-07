"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

const menuItems = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "New Arrivals", href: "/shop?sort=new" },
  { name: "About", href: "/about" },
  { name: "Size Chart", href: "/size-chart" },
  { name: "Contact", href: "/contact" },
  { name: "FAQ", href: "/faq" },
];

export default function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger
        aria-label="Open menu"
        className="inline-flex items-center justify-center"
      >
        <Menu className="h-6 w-6" />
      </SheetTrigger>

      <SheetContent side="left" className="w-72 bg-[#FFF8F5]">
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <div className="mt-8 flex flex-col gap-5">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-lg font-medium text-gray-800 hover:text-[#A02C68]"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
