export type Variant = {
  id: string;
  label: string;
  price: number;
};

export type Product = {
  handle: string;
  title: string;
  color: string;
  swatch: string;
  category: string;
  kind: "apparel" | "gift-card";
  image?: string;
  imageAlt: string;
  description: string;
  details: string[];
  variants: Variant[];
};

export type Collection = {
  handle: string;
  title: string;
  intro: string;
  handles: string[];
};

const ALPHA = ["XXS", "XS", "S", "M", "L", "XL", "XXL"];
const SHORT = ["XS", "S", "M", "L", "XL"];

function variants(handle: string, labels: string[], price: number): Variant[] {
  return labels.map((label) => ({
    id: `${handle}-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    label,
    price,
  }));
}

function shoes(): string[] {
  const labels: string[] = [];
  for (let step = 0; step <= 12; step += 1) {
    const value = 35 + step * 0.5;
    labels.push(Number.isInteger(value) ? String(value) : value.toFixed(1));
  }
  return labels;
}

function waist(): string[] {
  return Array.from({ length: 12 }, (_, index) => String(23 + index));
}

const giftAmounts = [50, 100, 150, 200, 250, 300, 350, 500, 750, 1000];

export const products: Product[] = [
  {
    handle: "column-dress-chalk",
    title: "Column Dress",
    color: "Chalk",
    swatch: "#e6e0d4",
    category: "Dresses",
    kind: "apparel",
    image: "/brand/column-dress.jpeg",
    imageAlt: "Column dress in chalk linen, square neck, studio plate.",
    description:
      "A straight linen dress with a square neckline and a walking slit. The photograph is a studio plate already in this project.",
    details: [
      "Photograph supplied: studio plate of a linen column dress.",
      "Material noted from the plate only: linen-looking woven cloth.",
      "Care is not published.",
      "Stock and fulfillment are off. Availability is unverified.",
    ],
    variants: variants("column-dress-chalk", ALPHA, 27800),
  },
  {
    handle: "split-skirt-amber",
    title: "Split Skirt",
    color: "Amber",
    swatch: "#8a5a2b",
    category: "Skirts",
    kind: "apparel",
    image: "/brand/split-skirt.jpeg",
    imageAlt: "Amber patterned skirt with a slit, shown beside a second evening dress in the same studio plate.",
    description:
      "An ankle skirt with a high slit. The plate also shows a second evening dress; that dress is not a separate piece in this preview.",
    details: [
      "Photograph supplied: shared studio plate.",
      "Pattern and cloth were not lab-tested.",
      "Care is not published.",
      "Stock and fulfillment are off. Availability is unverified.",
    ],
    variants: variants("split-skirt-amber", ALPHA, 22800),
  },
  {
    handle: "chalk-shirtdress",
    title: "Chalk Shirtdress",
    color: "Chalk",
    swatch: "#f3ecdf",
    category: "Tops",
    kind: "apparel",
    image: "/brand/shirtdress.jpeg",
    imageAlt: "Chalk shirtdress with a collar, belt, and long sleeves.",
    description:
      "A belted shirtdress in a chalk tone, with a collar and cuffs. It stands in for the tops group in this twelve-piece preview.",
    details: [
      "Photograph supplied: studio plate.",
      "Cloth looks smooth in the plate. Fiber content is not published.",
      "Care is not published.",
      "Stock and fulfillment are off. Availability is unverified.",
    ],
    variants: variants("chalk-shirtdress", ALPHA, 15800),
  },
  {
    handle: "coral-cardigan",
    title: "Coral Cardigan",
    color: "Coral",
    swatch: "#e07a6a",
    category: "Knitwear",
    kind: "apparel",
    imageAlt: "",
    description:
      "A coral cardigan kept in the preview so the knitwear size run can be tried. No cardigan photograph was supplied.",
    details: [
      "Photograph: not supplied.",
      "Material was not recorded.",
      "Care is not published.",
      "Stock and fulfillment are off. Availability is unverified.",
    ],
    variants: variants("coral-cardigan", ALPHA, 32800),
  },
  {
    handle: "ivory-vneck",
    title: "Ivory V-Neck",
    color: "Ivory",
    swatch: "#f4efe6",
    category: "Sweaters",
    kind: "apparel",
    image: "/brand/ivory-knit.jpeg",
    imageAlt: "Ivory v-neck knit, photographed with pale denim in the same studio plate.",
    description:
      "A relaxed ivory knit with a deep neckline. The plate also shows pale denim from the same sitting.",
    details: [
      "Photograph supplied: shared studio plate.",
      "The knit looks fine-gauge. Fiber content is not published.",
      "Care is not published.",
      "Stock and fulfillment are off. Availability is unverified.",
    ],
    variants: variants("ivory-vneck", SHORT, 49800),
  },
  {
    handle: "chalk-trouser",
    title: "Chalk Trouser",
    color: "Chalk",
    swatch: "#ddd2c0",
    category: "Pants",
    kind: "apparel",
    imageAlt: "",
    description:
      "A chalk trouser in the preview size run. No trouser photograph was supplied, so the plate is a drawn stand-in.",
    details: [
      "Photograph: not supplied.",
      "Material was not recorded.",
      "Care is not published.",
      "Stock and fulfillment are off. Availability is unverified.",
    ],
    variants: variants("chalk-trouser", ALPHA, 19800),
  },
  {
    handle: "river-jean",
    title: "River Jean",
    color: "Mid Wash",
    swatch: "#3e5f86",
    category: "Denim",
    kind: "apparel",
    image: "/brand/river-jean.jpeg",
    imageAlt: "High-rise wide-leg jean in a mid indigo wash.",
    description: "A high-rise wide jean in a mid indigo wash, with a full-length leg.",
    details: [
      "Photograph supplied: studio plate.",
      "Denim wash is described from the plate, not from a mill spec.",
      "Care is not published.",
      "Stock and fulfillment are off. Availability is unverified.",
    ],
    variants: variants("river-jean", waist(), 24800),
  },
  {
    handle: "studio-jacket",
    title: "Studio Jacket",
    color: "Pink",
    swatch: "#e7a3c0",
    category: "Outerwear",
    kind: "apparel",
    image: "/brand/studio-jacket.jpeg",
    imageAlt: "Pink satin jacket worn open over a white top and pale jeans.",
    description:
      "A pink satin jacket from the studio set. It fills the outerwear place in this preview. The plate also shows jeans.",
    details: [
      "Photograph supplied: studio plate.",
      "The shell looks satin. Fiber content is not published.",
      "Care is not published.",
      "Stock and fulfillment are off. Availability is unverified.",
    ],
    variants: variants("studio-jacket", SHORT, 77800),
  },
  {
    handle: "tan-boot",
    title: "Tan Ankle Boot",
    color: "Tan",
    swatch: "#c4a077",
    category: "Shoes",
    kind: "apparel",
    image: "/brand/boot-bag.jpeg",
    imageAlt: "Tan leather ankle boot with a stacked heel. A spotted bag is also in the plate.",
    description:
      "A tan leather ankle boot with a stacked heel. The same plate is used for the shoulder bag.",
    details: [
      "Photograph supplied: shared studio plate of a boot and a bag.",
      "Heel height was not measured.",
      "Care is not published.",
      "Stock and fulfillment are off. Availability is unverified.",
    ],
    variants: variants("tan-boot", shoes(), 49800),
  },
  {
    handle: "amber-bag",
    title: "Amber Shoulder Bag",
    color: "Amber Spot",
    swatch: "#b5813c",
    category: "Bags",
    kind: "apparel",
    image: "/brand/boot-bag.jpeg",
    imageAlt: "Spotted shoulder bag with a dark strap. A tan boot is also in the plate.",
    description:
      "A spotted shoulder bag with a dark strap. One size is the only option, and it still has to be chosen before it can be added.",
    details: [
      "Photograph supplied: shared studio plate of a bag and a boot.",
      "Hardware and hide were not authenticated.",
      "Care is not published.",
      "Stock and fulfillment are off. Availability is unverified.",
    ],
    variants: variants("amber-bag", ["One size"], 32800),
  },
  {
    handle: "petal-slip",
    title: "Petal Slip",
    color: "Petal",
    swatch: "#e7c9c4",
    category: "Slips",
    kind: "apparel",
    image: "/brand/petal-slip.jpeg",
    imageAlt: "Floral bias slip in a petal ground, thin straps, studio plate.",
    description: "A bias slip on a petal floral ground, with thin straps and a soft neckline.",
    details: [
      "Photograph supplied: studio plate.",
      "Cloth looks fluid. Fiber content is not published.",
      "Care is not published.",
      "Stock and fulfillment are off. Availability is unverified.",
    ],
    variants: variants("petal-slip", ALPHA, 6800),
  },
  {
    handle: "gift-note",
    title: "Paper Gift Note",
    color: "Paper",
    swatch: "#f3eee4",
    category: "Gift card",
    kind: "gift-card",
    imageAlt: "",
    description:
      "Amounts from the preview list, shown so the denomination set can be read. Issuance, delivery, and balance checks are off. This note cannot be added to the bag.",
    details: [
      "Issuance is off.",
      "No code is generated.",
      "No balance can be checked.",
      "Payments are off.",
    ],
    variants: giftAmounts.map((dollars) => ({
      id: `gift-note-${dollars}`,
      label: `$${dollars}`,
      price: dollars * 100,
    })),
  },
];

export const collections: Collection[] = [
  {
    handle: "new-arrivals",
    title: "New Arrivals",
    intro: "The twelve-piece preview, gift note aside. Sample amounts, not a live price list.",
    handles: products.filter((product) => product.kind === "apparel").map((product) => product.handle),
  },
  {
    handle: "dresses",
    title: "Dresses",
    intro: "One dress in this preview.",
    handles: ["column-dress-chalk"],
  },
  {
    handle: "skirts",
    title: "Skirts",
    intro: "One skirt in this preview.",
    handles: ["split-skirt-amber"],
  },
  {
    handle: "tops",
    title: "Tops",
    intro: "The shirtdress stands in for tops.",
    handles: ["chalk-shirtdress"],
  },
  {
    handle: "knitwear",
    title: "Knitwear",
    intro: "A cardigan record without a photograph.",
    handles: ["coral-cardigan"],
  },
  {
    handle: "sweaters",
    title: "Sweaters",
    intro: "One sweater in this preview.",
    handles: ["ivory-vneck"],
  },
  {
    handle: "pants",
    title: "Pants",
    intro: "A trouser record without a photograph.",
    handles: ["chalk-trouser"],
  },
  {
    handle: "denim",
    title: "Denim",
    intro: "One jean in this preview.",
    handles: ["river-jean"],
  },
  {
    handle: "outerwear",
    title: "Outerwear",
    intro: "The pink studio jacket.",
    handles: ["studio-jacket"],
  },
  {
    handle: "shoes",
    title: "Shoes",
    intro: "One boot in this preview.",
    handles: ["tan-boot"],
  },
  {
    handle: "bags",
    title: "Bags",
    intro: "One bag in this preview.",
    handles: ["amber-bag"],
  },
  {
    handle: "slips",
    title: "Slips",
    intro: "One slip in this preview.",
    handles: ["petal-slip"],
  },
  {
    handle: "gift-cards",
    title: "Gift Note",
    intro: "Denominations only. Issuance is off.",
    handles: ["gift-note"],
  },
];

export type NavLink = { label: string; href: string; note?: string };

export const shopColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "Clothing",
    links: [
      { label: "Dresses", href: "/collections/dresses" },
      { label: "Tops", href: "/collections/tops" },
      { label: "Knitwear", href: "/collections/knitwear" },
      { label: "Sweaters", href: "/collections/sweaters" },
      { label: "Pants", href: "/collections/pants" },
      { label: "Skirts", href: "/collections/skirts" },
      { label: "Denim", href: "/collections/denim" },
      { label: "Outerwear", href: "/collections/outerwear" },
    ],
  },
  {
    title: "Shoes & accessories",
    links: [
      { label: "Shoes", href: "/collections/shoes" },
      { label: "Bags", href: "/collections/bags" },
      { label: "Slips", href: "/collections/slips" },
    ],
  },
  {
    title: "Featured",
    links: [
      { label: "New arrivals", href: "/collections/new-arrivals" },
      { label: "Gift note", href: "/products/gift-note", note: "Issuance off" },
      { label: "Journal", href: "/journal" },
      { label: "Paper study", href: "/pages/lookbook" },
    ],
  },
];

export const collectionLinks: NavLink[] = [
  { label: "New arrivals", href: "/collections/new-arrivals" },
  { label: "Dresses", href: "/collections/dresses" },
  { label: "Denim", href: "/collections/denim" },
  { label: "Knitwear", href: "/collections/knitwear" },
  { label: "Paper study", href: "/pages/lookbook" },
];

export const discoverLinks: NavLink[] = [
  { label: "Journal", href: "/journal" },
  { label: "Paper study", href: "/pages/lookbook" },
  { label: "About", href: "/pages/about", note: "Not published" },
  { label: "Questions", href: "/pages/faq", note: "Not published" },
];

export type Article = {
  slug: string;
  title: string;
  dek: string;
  dateLabel: string;
  image: string;
  imageAlt: string;
  paragraphs: string[];
};

export const articles: Article[] = [
  {
    slug: "paper-edit",
    title: "Notes on the paper edit",
    dek: "A preview note about type, paper, and the twelve pieces. Not a company history.",
    dateLabel: "Preview note · 8 November 2026",
    image: "/brand/petal-slip.jpeg",
    imageAlt: "Petal slip, the opening plate of the paper edit.",
    paragraphs: [
      "This note belongs to the Prism & Pollen preview. It is not a biography, a founding story, or a record of a trip.",
      "The pages use a warm paper ground, a high-contrast serif for navigation, and a script for section titles. Frames around the plates are drawn, not printed from another house’s artwork.",
      "Eleven garments and one gift note make up the catalog. Where a photograph existed in the project, it is used. Where it did not, the frame says so. Sample amounts sit under the titles so the size runs can be tried in a bag that never checks out.",
      "Nothing here is an offer to sell, ship, or write back.",
    ],
  },
];

export type UtilityPage = {
  slug: string;
  kicker: string;
  title: string;
  paragraphs: string[];
  kind: "prose" | "lookbook" | "provenance";
};

export const utilityPages: UtilityPage[] = [
  {
    slug: "faq",
    kicker: "Assistance",
    title: "Questions",
    kind: "prose",
    paragraphs: [
      "Support articles are not published. The notes below describe this preview only. They are not store policies.",
      "Can I buy a piece? No. Payments are off, and the bag is stored in this browser.",
      "Do you ship? Fulfillment is off. No shipping method, price, or destination is offered.",
      "How do sizes run? No size guide is published. Availability was not verified.",
      "Can I write to you? Email, SMS, and the contact form are off. No address is published.",
    ],
  },
  {
    slug: "privacy",
    kicker: "Policies",
    title: "Privacy",
    kind: "prose",
    paragraphs: [
      "No privacy policy is published for Prism & Pollen.",
      "This preview stores a bag in local storage on your device. It does not create an account, take payment, or send the bag to a server.",
      "Do not treat this page as legal terms.",
    ],
  },
  {
    slug: "terms",
    kicker: "Policies",
    title: "Terms",
    kind: "prose",
    paragraphs: [
      "No terms of sale, return policy, or shipping policy is published.",
      "Sample amounts are not offers. Checkout is switched off.",
    ],
  },
  {
    slug: "about",
    kicker: "The house",
    title: "About",
    kind: "prose",
    paragraphs: [
      "No founding story, biography, date, or place is published for Prism & Pollen.",
      "The name is the brand of this preview. It is not another house’s name.",
    ],
  },
  {
    slug: "impact",
    kicker: "Values",
    title: "Impact",
    kind: "prose",
    paragraphs: [
      "No impact report was supplied. This page stays empty of environmental, labor, and giving claims.",
    ],
  },
  {
    slug: "contact",
    kicker: "Assistance",
    title: "Contact",
    kind: "prose",
    paragraphs: [
      "Contact is off.",
      "There is no form, inbox, phone, or SMS number. Nothing you type here can be sent, because there is nowhere to type it.",
    ],
  },
  {
    slug: "account",
    kicker: "Account",
    title: "Account",
    kind: "prose",
    paragraphs: [
      "Accounts are off.",
      "There is no sign-in, registration, password, or order history.",
    ],
  },
  {
    slug: "assistance",
    kicker: "Assistance",
    title: "Assistance",
    kind: "prose",
    paragraphs: [
      "Chat, email, and phone assistance are off.",
      "Questions that would need a person are listed as unpublished on the questions page.",
    ],
  },
  {
    slug: "currency",
    kicker: "Currency",
    title: "Currency",
    kind: "prose",
    paragraphs: [
      "Amounts are sample US dollars.",
      "Conversion is off. No other currency is offered.",
    ],
  },
  {
    slug: "shops",
    kicker: "Shops",
    title: "Shops",
    kind: "prose",
    paragraphs: [
      "No shop, address, city, hours, or map is published.",
      "A shop detail template exists only to say that a named shop is not published.",
    ],
  },
  {
    slug: "lookbook",
    kicker: "Study",
    title: "Paper study",
    kind: "lookbook",
    paragraphs: [
      "Frames for the photographs already in this project. This is not a record of an event, a city, or a campaign.",
    ],
  },
  {
    slug: "provenance",
    kicker: "Notes",
    title: "Provenance",
    kind: "provenance",
    paragraphs: [
      "Prism & Pollen is an original preview. It is not DÔEN and does not sell DÔEN goods.",
      "Layout habits — paper ground, capital navigation, script section titles, framed plates — were studied from public reference screenshots of https://www.shopdoen.com/. Those captures are incomplete. Mobile collection, product, cart, and search screens were not captured. The desktop home capture is a viewport with the shop menu open, not a full page. The collection capture was cut off before the footer. Those states are not visually verified.",
      "Product titles, descriptions, and preview codes here are original. Reference titles, SKUs, and image URLs were not shipped. Sample US dollar amounts follow the public category price points so the size runs can be checked. They are not a price list.",
      "Photographs are the studio plates that were already in this repository. Their commercial clearance is unknown. Plates are not reference-site photography. Where no plate matched, the frame says the photograph was not supplied.",
      "Payments, accounts, email, SMS, reviews, gift-card issuance, inventory, and fulfillment are off.",
    ],
  },
];

export const lookbookPlates: { src: string; alt: string; caption: string; href: string }[] = [
  {
    src: "/brand/petal-slip.jpeg",
    alt: "Petal slip studio plate.",
    caption: "Petal slip",
    href: "/products/petal-slip",
  },
  {
    src: "/brand/column-dress.jpeg",
    alt: "Column dress studio plate.",
    caption: "Column dress",
    href: "/products/column-dress-chalk",
  },
  {
    src: "/brand/noir-dress.jpeg",
    alt: "Black floral dress studio plate. Not a separate catalog piece.",
    caption: "Black floral plate — not a separate piece",
    href: "/collections/dresses",
  },
  {
    src: "/brand/ivory-knit.jpeg",
    alt: "Ivory knit studio plate.",
    caption: "Ivory v-neck",
    href: "/products/ivory-vneck",
  },
  {
    src: "/brand/river-jean.jpeg",
    alt: "River jean studio plate.",
    caption: "River jean",
    href: "/products/river-jean",
  },
  {
    src: "/brand/studio-jacket.jpeg",
    alt: "Pink studio jacket plate.",
    caption: "Studio jacket",
    href: "/products/studio-jacket",
  },
];

export function getProduct(handle: string): Product | undefined {
  return products.find((product) => product.handle === handle);
}

export function getCollection(handle: string): Collection | undefined {
  return collections.find((collection) => collection.handle === handle);
}

export function productsIn(collection: Collection): Product[] {
  return collection.handles
    .map((handle) => getProduct(handle))
    .filter((product): product is Product => Boolean(product));
}

export function relatedProducts(handle: string, count = 3): Product[] {
  const current = getProduct(handle);
  if (!current) return [];
  const apparel = products.filter((product) => product.kind === "apparel" && product.handle !== handle);
  const same = apparel.filter((product) => product.category === current.category);
  const rest = apparel.filter((product) => product.category !== current.category);
  return [...same, ...rest].slice(0, count);
}

export function sizeRank(label: string): number {
  const alpha = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "One size"];
  const index = alpha.indexOf(label);
  if (index >= 0) return index;
  if (label.startsWith("$")) return 200 + Number(label.slice(1));
  const numeric = Number(label);
  if (!Number.isNaN(numeric)) return 100 + numeric;
  return 1000;
}

export function uniqueLabels(items: Product[], pick: (product: Product) => string[]): string[] {
  const set = new Set<string>();
  for (const product of items) {
    for (const label of pick(product)) set.add(label);
  }
  return [...set].sort((a, b) => sizeRank(a) - sizeRank(b) || a.localeCompare(b));
}

export function utilityPage(slug: string): UtilityPage | undefined {
  return utilityPages.find((page) => page.slug === slug);
}

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}
