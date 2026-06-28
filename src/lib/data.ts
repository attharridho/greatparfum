export type Fragrance = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: "Men" | "Women" | "Unisex";
  family: "Citrus" | "Floral" | "Woody" | "Aquatic" | "Oriental" | "Gourmand" | "Fresh";
  longevity: "Moderate" | "Long Lasting" | "Eternal";
  notes: {
    top: string[];
    middle: string[];
    base: string[];
  };
  concentration: "EDC" | "EDT" | "EDP" | "Extrait";
};

export const fragrances: Fragrance[] = [
  {
    id: "f-1",
    name: "Midnight Bloom",
    description: "A mysterious and seductive blend of dark florals and warm woods.",
    price: 45000,
    image: "/custom-blend.png",
    category: "Women",
    family: "Floral",
    longevity: "Long Lasting",
    notes: {
      top: ["Blackcurrant", "Bergamot"],
      middle: ["Jasmine", "Rose", "Orchid"],
      base: ["Sandalwood", "Vanilla", "Patchouli"]
    },
    concentration: "EDP"
  },
  {
    id: "f-2",
    name: "Oceanic Breeze",
    description: "Crisp, clean, and invigorating, like a morning walk on the beach.",
    price: 35000,
    image: "/hero-bottle.png",
    category: "Unisex",
    family: "Aquatic",
    longevity: "Moderate",
    notes: {
      top: ["Sea Salt", "Lemon", "Grapefruit"],
      middle: ["Seaweed", "Sage"],
      base: ["Cedarwood", "Ambergris"]
    },
    concentration: "EDT"
  },
  {
    id: "f-3",
    name: "Velvet Wood",
    description: "Deep, rich, and intensely masculine with smoky and leathery undertones.",
    price: 85000,
    image: "/custom-blend.png",
    category: "Men",
    family: "Woody",
    longevity: "Eternal",
    notes: {
      top: ["Pink Pepper", "Cardamom"],
      middle: ["Leather", "Vetiver"],
      base: ["Oud", "Tonka Bean", "Musk"]
    },
    concentration: "Extrait"
  },
  {
    id: "f-4",
    name: "Citrus Grove",
    description: "Bright and uplifting, capturing the essence of a Mediterranean summer.",
    price: 40000,
    image: "/hero-bottle.png",
    category: "Unisex",
    family: "Citrus",
    longevity: "Moderate",
    notes: {
      top: ["Mandarin", "Lime", "Bergamot"],
      middle: ["Neroli", "Basil"],
      base: ["Vetiver", "White Musk"]
    },
    concentration: "EDP"
  },
  {
    id: "f-5",
    name: "Amber Noir",
    description: "A decadent, warm oriental fragrance that wraps you in luxury.",
    price: 95000,
    image: "/custom-blend.png",
    category: "Unisex",
    family: "Oriental",
    longevity: "Eternal",
    notes: {
      top: ["Saffron", "Cinnamon"],
      middle: ["Rose", "Incense"],
      base: ["Amber", "Vanilla", "Patchouli"]
    },
    concentration: "Extrait"
  },
  {
    id: "f-6",
    name: "Sweet Vanilla",
    description: "A comforting and edible aroma that feels like a warm hug.",
    price: 25000,
    image: "/hero-bottle.png",
    category: "Women",
    family: "Gourmand",
    longevity: "Long Lasting",
    notes: {
      top: ["Almond", "Coconut"],
      middle: ["Caramel", "Heliotrope"],
      base: ["Madagascar Vanilla", "Musk"]
    },
    concentration: "EDP"
  }
];
