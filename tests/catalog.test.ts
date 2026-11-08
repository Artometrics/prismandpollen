import { describe, expect, it } from "vitest";
import { collections, products, utilityPages } from "../src/data/catalog";
import { formatUSD } from "../src/lib/money";

const banned = ["dôen", "doen", "quinn", "zinnia", "sebastiane", "balfour", "shopdoen"];

describe("catalog", () => {
  it("ships 12 original products and does not carry reference names", () => {
    expect(products).toHaveLength(12);
    expect(products.filter((product) => product.kind === "gift-card")).toHaveLength(1);
    const blob = JSON.stringify(products).toLowerCase();
    for (const word of banned) expect(blob.includes(word)).toBe(false);
    for (const product of products) {
      expect(product.variants.length).toBeGreaterThan(0);
      for (const variant of product.variants) {
        expect(Number.isInteger(variant.price)).toBe(true);
        expect(variant.id.length).toBeGreaterThan(0);
      }
    }
  });

  it("covers the representative families with real routes", () => {
    const handles = new Set(collections.map((collection) => collection.handle));
    for (const handle of ["new-arrivals", "dresses", "gift-cards"]) {
      expect(handles.has(handle)).toBe(true);
    }
    for (const slug of ["faq", "privacy", "about", "impact", "contact", "shops", "lookbook", "provenance"]) {
      expect(utilityPages.some((page) => page.slug === slug)).toBe(true);
    }
  });

  it("formats sample amounts in dollars", () => {
    expect(formatUSD(27800)).toBe("$278");
    expect(formatUSD(6800)).toBe("$68");
    expect(formatUSD(10050)).toBe("$100.50");
  });
});
