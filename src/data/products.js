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
        src: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80",
        alt: "Minimal white oversized tee on a clean studio backdrop",
      },
      {
        src: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1200&q=80",
        alt: "Black cotton t-shirt flat lay with soft editorial lighting",
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
        src: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1200&q=80",
        alt: "Dark oversized streetwear tee photographed in soft shadow",
      },
      {
        src: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1200&q=80",
        alt: "Graphic tee worn in an urban fashion editorial setting",
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
        alt: "Oversized black hoodie displayed in a fashion still life",
      },
      {
        src: "https://images.unsplash.com/photo-1509942775567-3cf2ac65a5e0?auto=format&fit=crop&w=1200&q=80",
        alt: "Person wearing a dark hoodie in a muted urban environment",
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
        alt: "Black t-shirt close-up with textured fabric detail",
      },
      {
        src: "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=1200&q=80",
        alt: "Folded dark apparel stack in an editorial product composition",
      },
    ],
  },
];

export function getProductById(id) {
  return products.find((product) => product.id === id) ?? null;
}
