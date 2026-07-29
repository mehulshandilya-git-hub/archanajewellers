import { Product } from "./types";

export const products: Product[] = [
  {
    id: "gp-002",
    name: "Diamond Gold Ring",
    category: "Rings",
    purity: "18K Gold",
    weight: "6.2g",
    price: 45000,
    originalPrice: 52000,
    description: "Elegant diamond-studded gold ring with a classic solitaire setting, perfect for engagements and special occasions.",
    details: ["18K White Gold", "Diamond: 0.5ct", "Weight: 6.2g", "Hallmarked", "Comes with certificate"],
    images: [],
    badge: "Sale",
    inStock: true,
  },
  {
    id: "gp-007",
    name: "Gold Earrings Set",
    category: "Earrings",
    purity: "22K Gold",
    weight: "9.2g",
    price: 52000,
    description: "Contemporary gold earrings with a modern design language, perfect for both traditional and western outfits.",
    details: ["22K Gold", "Weight: 9.2g", "Modern design", "Stud style", "Pair"],
    images: [],
    badge: "New",
    inStock: true,
  },
  {
    id: "gp-010",
    name: "Gold Ring Classic",
    category: "Rings",
    purity: "22K Gold",
    weight: "4.8g",
    price: 32000,
    description: "Classic gold band ring with a subtle polish finish, an everyday essential for the modern individual.",
    details: ["22K Yellow Gold", "Weight: 4.8g", "Classic design", "Comfort fit", "Hallmarked"],
    images: [],
    badge: "",
    inStock: true,
  },
  {
    id: "gp-018",
    name: "Gold Ring with Ruby",
    category: "Rings",
    purity: "22K Gold",
    weight: "5.6g",
    price: 38000,
    description: "Stunning gold ring set with a natural ruby gemstone, combining vibrant color with timeless gold.",
    details: ["22K Gold", "Weight: 5.6g", "Ruby: 0.8ct", "Hallmarked", "Adjustable size"],
    images: [],
    badge: "",
    inStock: true,
  },
  {
    id: "gp-019",
    name: "Gold Couple Ring Set",
    category: "Rings",
    purity: "18K Gold",
    weight: "8.0g",
    price: 55000,
    description: "Matching couple gold ring set with minimalist design, perfect for engagements and anniversaries.",
    details: ["18K Gold", "Total Weight: 8.0g (pair)", "Pair of 2", "Minimalist design", "Comes in gift box"],
    images: [],
    badge: "Best Seller",
    inStock: true,
  },
  {
    id: "gp-020",
    name: "Gold Earrings Jhumka",
    category: "Earrings",
    purity: "22K Gold",
    weight: "14.5g",
    price: 72000,
    description: "Traditional gold jhumka earrings with intricate filigree work, a timeless addition to any jewelry collection.",
    details: ["22K Gold", "Total Weight: 14.5g", "Traditional jhumka style", "Filigree work", "Pair"],
    images: [],
    badge: "Handcrafted",
    inStock: true,
  },
  {
    id: "gp-021",
    name: "Gold Stud Earrings",
    category: "Earrings",
    purity: "22K Gold",
    weight: "6.5g",
    price: 35000,
    description: "Simple yet elegant gold stud earrings with a polished finish, perfect for everyday sophistication.",
    details: ["22K Gold", "Weight: 6.5g", "Stud style", "Polished finish", "Pair"],
    images: [],
    badge: "",
    inStock: true,
  },
  {
    id: "gp-022",
    name: "Gold Drop Earrings",
    category: "Earrings",
    purity: "24K Gold",
    weight: "11.0g",
    price: 62000,
    description: "Graceful gold drop earrings with a delicate chain detail, adding a touch of elegance to any outfit.",
    details: ["24K Gold", "Weight: 11.0g", "Drop style", "Chain detail", "Pair"],
    images: [],
    badge: "New",
    inStock: true,
  },


  // ── Nosepins Subcategory Products ──
  {
    id: "np-001", name: "Exclusive Stone Gold Nosepin", category: "Nosepins", subcategory: "Exclusive Stone",
    purity: "22K Gold", weight: "2.8g", price: 22000,
    description: "Premium gold nosepin with an exclusive stone setting, designed for those who appreciate fine craftsmanship.",
    details: ["22K Gold", "Weight: 2.8g", "Exclusive stone", "QR Verified", "Hypoallergenic"],
    images: [], badge: "Premium", inStock: true,
  },
  {
    id: "np-002", name: "Single Stone Gold Nosepin", category: "Nosepins", subcategory: "Single Stone",
    purity: "22K Gold", weight: "2.2g", price: 16000,
    description: "Elegant single stone gold nosepin with a minimalist design, perfect for everyday elegance.",
    details: ["22K Gold", "Weight: 2.2g", "Single stone", "QR Verified", "Daily wear"],
    images: [], badge: "Best Seller", inStock: true,
  },
  {
    id: "np-003", name: "Teen Patti Gold Nosepin", category: "Nosepins", subcategory: "Teen Patti",
    purity: "22K Gold", weight: "3.0g", price: 19500,
    description: "Traditional teen patti gold nosepin with three-leaf design, a timeless classic.",
    details: ["22K Gold", "Weight: 3.0g", "Teen patti design", "QR Verified", "Traditional"],
    images: [], badge: "Traditional", inStock: true,
  },
  {
    id: "np-004", name: "J Style Gold Nosepin", category: "Nosepins", subcategory: "J Style Nosepin",
    purity: "22K Gold", weight: "2.0g", price: 15000,
    description: "Modern J-style gold nosepin with a sleek curved design, blending contemporary style with tradition.",
    details: ["22K Gold", "Weight: 2.0g", "J-style design", "QR Verified", "Modern"],
    images: [], badge: "New", inStock: true,
  },
  {
    id: "np-005", name: "Casting Gold Nosepin", category: "Nosepins", subcategory: "Casting Nosepins",
    purity: "18K Gold", weight: "2.5g", price: 14000,
    description: "Finely crafted casting gold nosepin with intricate detailing, made using precision casting techniques.",
    details: ["18K Gold", "Weight: 2.5g", "Casting work", "QR Verified", "Fine detailing"],
    images: [], badge: "", inStock: true,
  },
  {
    id: "np-006", name: "Chain Wali Keel Nosepin", category: "Nosepins", subcategory: "Chain Wali Keel",
    purity: "22K Gold", weight: "3.5g", price: 26000,
    description: "Beautiful chain wali keel gold nosepin with a delicate chain accent, adding grace to your look.",
    details: ["22K Gold", "Weight: 3.5g", "Chain design", "QR Verified", "Elegant"],
    images: [], badge: "Popular", inStock: true,
  },
  {
    id: "np-007", name: "Double U Chain Nosepin", category: "Nosepins", subcategory: "Double U Chain",
    purity: "22K Gold", weight: "4.0g", price: 28000,
    description: "Double U chain gold nosepin with a unique dual-chain design, a statement piece for special occasions.",
    details: ["22K Gold", "Weight: 4.0g", "Double U chain", "QR Verified", "Statement piece"],
    images: [], badge: "Exclusive", inStock: true,
  },
  {
    id: "np-008", name: "Plaster Gold Nosepin", category: "Nosepins", subcategory: "Plaster Nosepin",
    purity: "18K Gold", weight: "1.8g", price: 12000,
    description: "Lightweight plaster gold nosepin with a subtle finish, perfect for comfortable daily wear.",
    details: ["18K Gold", "Weight: 1.8g", "Plaster design", "QR Verified", "Lightweight"],
    images: [], badge: "Lightweight", inStock: true,
  },
  {
    id: "np-009", name: "Fancy Andar Chain Nosepin", category: "Nosepins", subcategory: "Fancy Andar Chain",
    purity: "22K Gold", weight: "3.8g", price: 27000,
    description: "Fancy andar chain gold nosepin with an internal chain mechanism, a unique and elegant design.",
    details: ["22K Gold", "Weight: 3.8g", "Andar chain", "QR Verified", "Fancy design"],
    images: [], badge: "Trending", inStock: true,
  },
  {
    id: "np-010", name: "Die Gold Nosepin", category: "Nosepins", subcategory: "Die Nosepin",
    purity: "22K Gold", weight: "2.2g", price: 13500,
    description: "Precision die-made gold nosepin with clean lines and perfect symmetry, crafted to perfection.",
    details: ["22K Gold", "Weight: 2.2g", "Die-made", "QR Verified", "Symmetrical design"],
    images: [], badge: "", inStock: true,
  },
  {
    id: "np-011", name: "Bombay Ball Fancy Nosepin", category: "Nosepins", subcategory: "Bombay Ball Fancy",
    purity: "22K Gold", weight: "3.2g", price: 24000,
    description: "Bombay ball fancy gold nosepin with a distinctive ball design, a favorite for festive occasions.",
    details: ["22K Gold", "Weight: 3.2g", "Bombay ball design", "QR Verified", "Festival special"],
    images: [], badge: "Festival Special", inStock: true,
  },
  {
    id: "np-012", name: "Clip Gold Nosepin", category: "Nosepins", subcategory: "Clip Nosepin",
    purity: "22K Gold", weight: "2.0g", price: 11000,
    description: "Convenient clip-on gold nosepin for non-pierced wear, offering elegance without the commitment.",
    details: ["22K Gold", "Weight: 2.0g", "Clip-on design", "QR Verified", "No piercing needed"],
    images: [], badge: "No Piercing", inStock: true,
  },
  {
    id: "np-013", name: "A-1 Huid Goli Keel Nosepin", category: "Nosepins", subcategory: "A-1 Huid Goli Keel",
    purity: "22K Gold", weight: "2.6g", price: 18000,
    description: "Premium A-1 huid goli keel gold nosepin with a distinctive goli design, crafted for discerning customers.",
    details: ["22K Gold", "Weight: 2.6g", "Goli design", "QR Verified", "Premium finish"],
    images: [], badge: "Premium", inStock: true,
  },
  {
    id: "np-014", name: "Exclusive Stone Nosepin Deluxe", category: "Nosepins", subcategory: "Exclusive Stone",
    purity: "24K Gold", weight: "3.0g", price: 28000,
    description: "Deluxe exclusive stone gold nosepin with a larger stone setting, making a bold elegant statement.",
    details: ["24K Gold", "Weight: 3.0g", "Premium stone", "QR Verified", "Gift packaging"],
    images: [], badge: "Limited Edition", inStock: true,
  },
  {
    id: "np-015", name: "Single Stone Diamond Nosepin", category: "Nosepins", subcategory: "Single Stone",
    purity: "18K Gold", weight: "2.4g", price: 32000,
    description: "Single stone gold nosepin with a real diamond accent, combining luxury with minimalist design.",
    details: ["18K Gold", "Weight: 2.4g", "Diamond: 0.1ct", "QR Verified", "Comes with certificate"],
    images: [], badge: "Diamond", inStock: true,
  },
  {
    id: "np-016", name: "Teen Patti Fancy Nosepin", category: "Nosepins", subcategory: "Teen Patti",
    purity: "22K Gold", weight: "3.5g", price: 22000,
    description: "Fancy teen patti gold nosepin with enhanced detailing and a richer finish for special occasions.",
    details: ["22K Gold", "Weight: 3.5g", "Fancy teen patti", "QR Verified", "Enhanced detailing"],
    images: [], badge: "", inStock: true,
  },
];

export const nosepinSubcategories = [
  { name: "Exclusive Stone", slug: "exclusive-stone", description: "Premium nosepins with exclusive stone settings", image: "✦" },
  { name: "Single Stone", slug: "single-stone", description: "Elegant single stone nosepins for daily elegance", image: "✦" },
  { name: "Teen Patti", slug: "teen-patti", description: "Traditional three-leaf design nosepins", image: "✦" },
  { name: "J Style Nosepin", slug: "j-style-nosepin", description: "Modern curved J-style nosepins", image: "✦" },
  { name: "Casting Nosepins", slug: "casting-nosepins", description: "Precision cast nosepins with fine detailing", image: "✦" },
  { name: "Chain Wali Keel", slug: "chain-wali-keel", description: "Nosepins with delicate chain accents", image: "✦" },
  { name: "Double U Chain", slug: "double-u-chain", description: "Unique dual-chain design nosepins", image: "✦" },
  { name: "Plaster Nosepin", slug: "plaster-nosepin", description: "Lightweight plaster nosepins for daily comfort", image: "✦" },
  { name: "Fancy Andar Chain", slug: "fancy-andar-chain", description: "Nosepins with internal chain mechanism", image: "✦" },
  { name: "Die Nosepin", slug: "die-nosepin", description: "Precision die-made nosepins", image: "✦" },
  { name: "Bombay Ball Fancy", slug: "bombay-ball-fancy", description: "Distinctive ball design nosepins", image: "✦" },
  { name: "Clip Nosepin", slug: "clip-nosepin", description: "Clip-on nosepins for non-pierced wear", image: "✦" },
  { name: "A-1 Huid Goli Keel", slug: "a-1-huid-goli-keel", description: "Premium goli design nosepins", image: "✦" },
];

export const categories = [
  { id: "gold-nosepins", name: "Nosepins", slug: "gold-nosepins", count: 16 },
  { id: "earrings", name: "Earrings", slug: "earrings", count: 4 },
  { id: "nose-rings", name: "Nose Rings", slug: "nose-rings", count: 0 },
  { id: "fancy-tops", name: "Fancy Tops", slug: "fancy-tops", count: 0 },
  { id: "rings", name: "Rings", slug: "rings", count: 4 },
  { id: "lightweight-jewellery", name: "Lightweight Jewellery", slug: "lightweight-jewellery", count: 0 },
  { id: "pendant", name: "Pendant", slug: "pendant", count: 0 },
  { id: "ear-studs-for-men", name: "Ear Studs for Men", slug: "ear-studs-for-men", count: 0 },
];

export const categorySlugToName: Record<string, string> = {
  "gold-nosepins": "Nosepins",
  "earrings": "Earrings",
  "nose-rings": "Nose Rings",
  "fancy-tops": "Fancy Tops",
  "rings": "Rings",
  "lightweight-jewellery": "Lightweight Jewellery",
  "pendant": "Pendant",
  "ear-studs-for-men": "Ear Studs for Men",
};

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getProductsBySubcategory(subcategory: string): Product[] {
  return products.filter((p) => p.subcategory === subcategory);
}

export function getCategoryName(slug: string): string {
  return categorySlugToName[slug] || slug;
}

export function getCategorySlug(name: string): string {
  return Object.entries(categorySlugToName).find(([, v]) => v === name)?.[0] || name.toLowerCase().replace(/\s+/g, "-");
}

export function formatPrice(price: number): string {
  return "₹" + price.toLocaleString("en-IN");
}
