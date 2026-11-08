import { describe, expect, it } from "vitest";
import { products } from "../src/data/catalog";
import { applyQuery, emptyQuery, searchProducts } from "../src/lib/query";

const apparel = products.filter((product) => product.kind === "apparel");

describe("query", () => {
  it("searches locally and returns nothing for an empty or unknown query", () => {
    expect(searchProducts(products, "   ")).toHaveLength(0);
    expect(searchProducts(products, "trouser").map((product) => product.handle)).toEqual([
      "chalk-trouser",
    ]);
    expect(searchProducts(products, "zzzz-not-a-piece")).toHaveLength(0);
    expect(searchProducts(products, "river jean").map((product) => product.handle)).toEqual([
      "river-jean",
    ]);
  });

  it("filters by size and sorts by price", () => {
    const sized = applyQuery(apparel, { ...emptyQuery(), sizes: ["27"] });
    expect(sized.map((product) => product.handle)).toEqual(["river-jean"]);

    const sorted = applyQuery(apparel, { ...emptyQuery(), sort: "price-asc" });
    const prices = sorted.map((product) => Math.min(...product.variants.map((variant) => variant.price)));
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
    expect(sorted[0].handle).toBe("petal-slip");

    const high = applyQuery(apparel, { ...emptyQuery(), sort: "price-desc" });
    expect(high[0].handle).toBe("studio-jacket");
  });

  it("filters color and price band without dropping the featured order of ties", () => {
    const chalk = applyQuery(apparel, { ...emptyQuery(), colors: ["Chalk"] });
    expect(chalk.map((product) => product.handle)).toEqual([
      "column-dress-chalk",
      "chalk-shirtdress",
      "chalk-trouser",
    ]);
    const band = applyQuery(apparel, { ...emptyQuery(), priceBands: ["under-100"] });
    expect(band.map((product) => product.handle)).toEqual(["petal-slip"]);
  });
});
