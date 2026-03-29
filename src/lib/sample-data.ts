export type Product = {
  slug: string;
  name: string;
  category: string;
  image: string;
  description: string;
  material: string;
  moq: number;
  colors: string[];
  features: string[];
};

export const categories = [
  "Baseball Caps",
  "Bucket Hats",
  "Snapbacks",
  "Trucker Hats",
  "Beanies",
  "Visors",
];

export const sampleProducts: Product[] = [
  {
    slug: "embroidered-cotton-baseball-cap",
    name: "Embroidered Cotton Baseball Cap",
    category: "Baseball Caps",
    image: "/images/products/embroidered-baseball-cap.jpg",
    description:
      "Japanese-Korean style casual black cotton baseball cap with custom embroidered logo. A versatile everyday cap perfect for streetwear and lifestyle brands.",
    material: "100% Cotton",
    moq: 100,
    colors: ["Black", "Navy", "White", "Khaki", "Army Green"],
    features: [
      "6-panel structured design",
      "Custom embroidered logo",
      "Adjustable buckle closure",
      "Breathable cotton construction",
    ],
  },
  {
    slug: "metal-buckle-embroidered-baseball-cap",
    name: "Metal Buckle Embroidered Baseball Cap",
    category: "Baseball Caps",
    image: "/images/products/metal-buckle-baseball-cap.jpg",
    description:
      "2026 new style black cotton 6-panel baseball cap with metal buckle detail and letter embroidery. Premium construction with a modern minimalist look.",
    material: "100% Cotton",
    moq: 100,
    colors: ["Black", "Dark Green", "Navy", "Brown"],
    features: [
      "6-panel construction",
      "Metal buckle accent",
      "Letter embroidery",
      "Adjustable strap closure",
    ],
  },
  {
    slug: "cotton-bucket-hat",
    name: "Cotton Bucket Hat",
    category: "Bucket Hats",
    image: "/images/products/bucket-hat-1.jpg",
    description:
      "Lightweight and breathable cotton bucket hat. Reversible design available. Great for outdoor brands and resort wear.",
    material: "100% Cotton",
    moq: 200,
    colors: ["Black", "Khaki", "Olive", "Navy", "Stone"],
    features: [
      "Lightweight breathable cotton",
      "Reversible option available",
      "Stitched brim",
      "Woven label compatible",
    ],
  },
  {
    slug: "trucker-mesh-cap",
    name: "Trucker Mesh Cap",
    category: "Trucker Hats",
    image: "/images/products/trucker-1.jpg",
    description:
      "Classic trucker cap with foam front panel and mesh back. Perfect for sublimation printing and embroidered patches.",
    material: "Polyester / Nylon Mesh",
    moq: 100,
    colors: ["Black/White", "Navy/White", "Red/White", "Charcoal/Black"],
    features: [
      "Foam front panel",
      "Nylon mesh back",
      "Plastic snap closure",
      "Curved visor",
    ],
  },
  {
    slug: "dad-hat-washed",
    name: "Washed Dad Hat",
    category: "Baseball Caps",
    image: "/images/products/dad-hat-1.jpg",
    description:
      "Soft unstructured dad hat with vintage washed finish. The go-to choice for lifestyle and fashion brands.",
    material: "100% Cotton (Garment Washed)",
    moq: 100,
    colors: ["Washed Black", "Washed Navy", "Washed Pink", "Washed Olive"],
    features: [
      "Unstructured low-profile",
      "Vintage washed finish",
      "Metal buckle closure",
      "Soft hand feel",
    ],
  },
  {
    slug: "winter-beanie",
    name: "Knitted Cuff Beanie",
    category: "Beanies",
    image: "/images/products/beanie-1.jpg",
    description:
      "Warm knitted beanie with fold-up cuff. Available in solid colors and custom jacquard patterns. Perfect for winter collections.",
    material: "100% Acrylic Knit",
    moq: 200,
    colors: ["Black", "Charcoal", "Navy", "Burgundy", "Forest Green"],
    features: [
      "Fold-up cuff design",
      "Double-layered knit",
      "Custom jacquard available",
      "One size fits most",
    ],
  },
  {
    slug: "performance-visor",
    name: "Sport Performance Visor",
    category: "Visors",
    image: "/images/products/visor-1.jpg",
    description:
      "Lightweight sport visor with moisture-wicking sweatband. Ideal for golf, tennis, and athletic brands.",
    material: "100% Polyester",
    moq: 150,
    colors: ["White", "Black", "Navy", "Red"],
    features: [
      "Moisture-wicking sweatband",
      "Velcro closure",
      "Pre-curved visor",
      "UV protection",
    ],
  },
  {
    slug: "corduroy-baseball-cap",
    name: "Corduroy Baseball Cap",
    category: "Baseball Caps",
    image: "/images/products/corduroy-cap-1.jpg",
    description:
      "Trendy corduroy baseball cap with soft texture. Popular for autumn/winter fashion collections.",
    material: "100% Cotton Corduroy",
    moq: 150,
    colors: ["Tan", "Forest Green", "Burgundy", "Dusty Pink", "Navy"],
    features: [
      "Soft corduroy texture",
      "6-panel construction",
      "Adjustable strap closure",
      "Fashion-forward style",
    ],
  },
];
