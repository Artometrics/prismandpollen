# Reference fidelity ledger

Status: waiting on the next desktop and mobile homepage, menu, and motion captures. This branch does not invent those missing frames. It is not merged.

Brand on the preview: Prism & Pollen. The twelve product records are the supplied reference catalog, with rights not cleared and stock unknown.

## Why the previous catalog did not match the handoff

The first build treated `products-12.json` as a size-and-price pattern and then invented twelve substitute garments (Column Dress, Chalk Trouser, River Jean, Studio Jacket, and the rest). It showed studio photographs that were already in this repository. Those plates are not the reference products. Three of them had no photograph at all, so the page drew a placeholder.

That was a reinterpretation. The handoff already had the real titles, public prices, variant ids, size runs, and image URLs.

## Catalog correction on this branch

| Handoff handle | Shown as | Images |
| --- | --- | --- |
| quinn-dress-salt | Quinn Dress, Salt, $278, XXS–XXL | Named Quinn files from public HTML |
| sebastiane-skirt-powder | Sebastiane Skirt, Powder, $228, XXS–XXL | Named flat lay only |
| the-jane-blouse-black-2 | The Jane Blouse, Black, $158, XXS–XXL | Named Jane blouse files |
| petra-cardigan-coral | Petra Cardigan, Coral, $328, XXS–XXL | Named Petra files |
| merit-sweater-red-umber | Merit Sweater, Red Umber, $498, XS–XL | Named Merit files |
| lavon-linen-pant-salt | Lavon Linen Pant, Salt, $198, XXS–XXL | Named Lavon files |
| diana-mid-rise-jean-marville-wash | Diana Mid Rise Jean, Marville Wash, $248, waist 23–34 | Named Diana files |
| germain-coat-light-khaki | Germain Coat, Light Khaki, $778, XS–XL | Named Germain files |
| devi-boot-black-stretch-suede | Devi Boot, Black Stretch Suede, $498, 35–41 | Named Devi files |
| balfour-beaded-bag-champagne | Balfour Beaded Bag, Champagne, $328, one size | Named Balfour files. Public title also says Flan Beads |
| long-scoop-neck-slip-conch-2 | Long Scoop Neck Slip, Conch, $68, XXS–XXL | Images on that public page, including its og:image |
| digital-gift-card | Digital Gift Card, $50–$1000 | Public gift-card image. Issuance stays off |

Public `og:image` files named Lois tank, Shep jean, and Monttee were not used for Sebastiane, Jane, or Lavon. Sebastiane’s on-model gallery was not in the public HTML under that product name, so it is not filled with another picture.

Gallery order is the order those filenames appeared in public HTML. It was not checked against the live gallery. Descriptions are the public `og:description` strings, unchanged. Zinnia Skirt appears in a screenshot and is not one of these twelve, so it is not added as a product.

## What the supplied screenshots actually show

Captured, and used only as observation:

- Desktop header, viewport, shop menu open. Caps: New, Shop, Collections, Discover. Centered wordmark. Right side: Account, USD, search, Assistance, bag.
- Shop menu columns: Clothing, Shoes & Accessories, Lingerie & Sleepwear, Featured, plus a photograph on the right.
- Mobile 390 menu: Menu, New, Shop, Collections, Discover, then Account, Assistance, Currency, Find a shop.
- Mobile 390 home, partial, cut off before the footer: hero with the line “Holiday Chapter Two” and a small ornament; a Dresses plate; a Tops plate; a script “Explore”; then framed plates reading Holiday Occasion Shop, Coats & Jackets, and Noir Edit.
- Desktop New Arrivals, partial, cut off at 16384px before the footer. Script title. Filter & Sort control.
- Desktop Filter & Sort drawer: script title, sort chips, an in-stock switch, accordions, Clear all, Apply.
- Desktop Zinnia Skirt viewport and a full page that does include a footer: large image, caps title, color line, price, swatches, size row with the selected size underlined, ornamental Add to cart, description / details / size & fit.

## Ledger

| Surface | Supplied evidence | This preview | Gap |
| --- | --- | --- | --- |
| Header | Caps nav, centered wordmark, right utilities, paper ground | Same roles. Wordmark reads Prism & Pollen | Exact tracking, icon drawings, and padding were not measured |
| Masthead | Reference wordmark in the captures | Prism & Pollen, by request | Not a trace of their lettering |
| Hero | “Holiday Chapter Two”, ornament, full-bleed photograph. Desktop is only the top of that hero | Not built | Photograph and motion are not in the files. Not invented |
| Section order | Partial mobile home only, list above | Not built | Desktop full home was not captured. Lower mobile sections were cut off |
| Spacing | Visible as airy paper retail | Existing preview spacing | No measured pixel grid. Not guessed into a new system |
| Fonts | High-contrast serif for the wordmark and nav; a formal script for New Arrivals, Explore, Filter & Sort | Cormorant Garamond and Italianno, both OFL | The reference font files were not identified and are not embedded. These are legal stand-ins, not a match |
| Shop menu | Full column lists, including collaborations and empty-to-us categories such as Kids and Swimwear | Only categories that exist in the twelve-product handoff | Collaboration names are reference-house partnerships. They are not copied onto Prism & Pollen |
| Collection | Partial desktop New Arrivals and the filter drawer | Twelve-product grid, local filter and sort, in-stock control disabled | Mobile collection was not captured. Desktop footer was cut off. This grid is the handoff, not the live collection |
| Product | Zinnia layout only | Same observed regions, filled with a handoff product | Zinnia’s own data is not in the twelve. Swatch fill color was not measured, so no color dot is invented. Size-guide content was not captured |
| Cart | Not captured on purpose | Local bag: required size, drawer, quantity, first-click remove, reload | Visual design of the bag is not verified against the reference |
| Search | Not captured | Local search over the twelve | Predictive layout is not verified |
| Motion | Not in the supplied stills | None | Waiting. No scroll, menu, or hero motion is invented |
| Breakpoints | Mobile file is 390×844 at 3x. Desktop files are about 1350–1365px wide | CSS changes at 720px and 980px | Those two widths are implementation choices. The reference stylesheet was not read |

## Still not visually verified

Mobile collection, mobile product, mobile cart, mobile search, cart drawer, search, editorial pages, support pages, shop pages, size guide, and the 404. Desktop home from header through footer. Desktop collection footer. Any motion.

## Held on purpose

Homepage campaign, hero motion, and menu motion stay unimplemented until the new captures arrive. Payments, accounts, email, SMS, reviews, gift issuance, inventory, and fulfillment stay off. Nothing was deployed.
