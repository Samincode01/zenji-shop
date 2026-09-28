export const productSizes = ["XS", "S", "M", "L", "XL"];

export const products = [
  {
    id: "blue-flame-tee",
    name: "Blue Flame Tee",
    price: 75,
    currency: "AUD",
    category: "Tees",
    description:
      "A washed cotton tee with restrained graphic heat. Built for everyday movement.",
    sizes: [...productSizes],
    images: [
      {
        src: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1200&q=80",
        alt: "Model wearing an oversized graphic streetwear tee in an urban editorial setting",
      },
      {
        src: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80",
        alt: "Clean oversized cotton tee photographed on a studio hanger",
      },
    ],
  },
  {
    id: "bushido-tee",
    name: "Bushido Tee",
    price: 79,
    currency: "AUD",
    category: "Tees",
    description:
      "Heavyweight cotton with a quiet warrior mark. Structured drape, soft handfeel.",
    sizes: [...productSizes],
    images: [
      {
        src: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1200&q=80",
        alt: "Black heavyweight streetwear tee displayed flat with editorial lighting",
      },
      {
        src: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1200&q=80",
        alt: "Dark oversized tee silhouette photographed in soft shadow",
      },
    ],
  },
  {
    id: "kitsune-hoodie",
    name: "Kitsune Hoodie",
    price: 145,
    currency: "AUD",
    category: "Hoodies",
    description:
      "Fleece-lined hoodie with fox-cut proportions. Warmth without bulk.",
    sizes: [...productSizes],
    images: [
      {
        src: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1200&q=80",
        alt: "Oversized black hoodie presented as a streetwear fashion still life",
      },
      {
        src: "https://images.unsplash.com/photo-1710182240446-8ae8c223e135?auto=format&fit=crop&w=1200&q=80",
        alt: "Person wearing a dark oversized hoodie in a muted urban environment",
      },
    ],
  },
  {
    id: "after-dark-tee",
    name: "After Dark Tee",
    price: 69,
    currency: "AUD",
    category: "Tees",
    description:
      "Night-shift staple. Matte black cotton with a low-contrast print.",
    sizes: [...productSizes],
    images: [
      {
        src: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=1200&q=80",
        alt: "Close-up of a black cotton tee with textured fabric detail",
      },
      {
        src: "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=1200&q=80",
        alt: "Folded dark apparel stack in a monochrome editorial product shot",
      },
    ],
  },
];

export function getProductById(id) {
  return products.find((product) => product.id === id) ?? null;
}
