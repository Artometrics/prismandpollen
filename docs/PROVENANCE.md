# Prism & Pollen provenance

Prism & Pollen is an original prototype. It is not DÔEN and it does not sell DÔEN goods.

## What was used as a reference

Public pages on `https://www.shopdoen.com/` were studied as a structural reference only: route families, a twelve-piece variant matrix, and eight screenshots. Layout habits taken from those screenshots are a warm paper ground, capital serif navigation, script section titles, and thin frames around plates.

The reference captures are incomplete. These states were **not** visually verified:

- Mobile collection, product, cart, and search
- Cart drawer (it was intentionally not opened on the reference site)
- Desktop home from header to footer (the capture is a viewport with the shop menu open)
- Desktop collection footer (the capture stops at a 16384px cap)
- Size guide, details tabs, editorial pages, support pages, store pages, and the 404

Sample US dollar amounts follow the public category price points so size runs can be checked. They are not a Prism & Pollen price list. Reference titles, SKUs, variant ids, and image URLs are not shipped.

## Photographs

The plates in `public/brand/` are the studio photographs that were already in this repository (`assets/brand/` before this build). Commercial clearance is unknown. They are not reference-site photography. Where no photograph matched a record, the frame says “Photograph not supplied.”

`noir-dress.jpeg` is an extra studio plate used only as an editorial image. It is not a separate catalog piece.

## What is off

Payments, accounts, email, SMS, contact forms, reviews, gift-card issuance, inventory, and fulfillment are off. No privacy policy, terms, founding story, impact claim, shop, address, or phone number is invented.

The bag is stored in `localStorage` under `prism-pollen.cart.v1`. It is not an order.

## Indexing

`public/robots.txt` disallows all crawlers. Every page sends `noindex, nofollow`. `public/_headers`, `netlify.toml`, and `firebase.json` set `X-Robots-Tag` for hosts that honor them. Nothing in this change was deployed.
