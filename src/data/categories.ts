export type Category = {
  slug: string;
  name: string;
  image: string;
  description: string;
};

export const categories: Category[] = [
  {
    slug: "pattu-pavadai",
    name: "Pattu Pavadai",
    image: "/pattupavvadi.jpg",
    description: "Classic silk pavadais for festivals and family celebrations.",
  },
  {
    slug: "pattu-gown",
    name: "Pattu Gown",
    image: "/pattugown.webp",
    description: "Flowing silk gowns with timeless ethnic detailing.",
  },
  {
    slug: "half-saree",
    name: "Half Saree",
    image: "/halfsaree.webp",
    description: "Elegant half saree sets for special occasions.",
  },
  {
    slug: "aari-work",
    name: "Aari Work",
    image: "/aariwork.jpg",
    description: "Hand-embellished aari outfits with intricate craft.",
  },
  {
    slug: "top-skirt",
    name: "Top & Skirt",
    image: "/topandskit.jpg",
    description: "Comfortable ethnic separates for everyday tradition.",
  },
  {
    slug: "frocks",
    name: "Frocks",
    image: "/frocks.webp",
    description: "Soft frocks with a festive touch for little ones.",
  },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}
