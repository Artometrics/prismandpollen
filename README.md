# Prism & Pollen

Static Astro preview of a paper-ground clothing edit. Representative pages only — not a full catalog clone. Payments, accounts, email, SMS, reviews, gift-card issuance, inventory, and fulfillment are off. The bag stays in this browser.

Photographs already in the repo are reused. Their commercial clearance is unknown. See `docs/PROVENANCE.md`. Pages send `noindex` and `robots.txt` disallows crawlers.

## Commands

| Command | Action |
| :------ | :----- |
| `npm install` | Install dependencies |
| `npm run dev` | Local preview |
| `npm run build` | Static site in `dist/` |
| `npm run typecheck` | `astro check` |
| `npm test` | Unit tests |
| `npm run test:links` | Internal link check (after build) |
| `npm run test:browser` | Browser QA at 320, 390, and desktop |
| `npm run check` | All of the above |

Node.js 22 or newer (`.nvmrc`).

## Routes

Home, collection, product, gift note, search, bag, journal, lookbook, and placeholder pages for questions, policies, about, impact, contact, account, and shops. Unknown URLs use the 404 page.

## Hosting config

`netlify.toml`, `firebase.json`, and `public/_headers` are deploy-ready for **this** project only. They set `X-Robots-Tag: noindex`. This build does not deploy anywhere and does not touch another site.
