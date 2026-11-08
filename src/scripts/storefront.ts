import { products } from "../data/catalog";
import {
  CART_KEY,
  addItem,
  changeQty,
  emptyCart,
  lineCount,
  loadCart,
  removeLine,
  saveCart,
  subtotal,
  type Cart,
} from "../lib/cart";
import { formatUSD } from "../lib/money";
import { applyQuery, searchProducts, type PriceBand, type QueryState, type SortKey } from "../lib/query";

let cart: Cart = emptyCart();

function byHandle(handle: string) {
  return products.find((product) => product.handle === handle);
}

function persist() {
  saveCart(localStorage, cart, CART_KEY);
}

function setBagCount() {
  const count = lineCount(cart);
  const countEl = document.querySelector("#bag-count");
  const label = document.querySelector("#bag-label");
  const button = document.querySelector("#bag-button");
  if (countEl) countEl.textContent = String(count);
  if (label) label.textContent = `Bag, ${count} items`;
  if (button) button.setAttribute("aria-label", `Bag, ${count} items`);
}

function renderCart() {
  const roots = document.querySelectorAll("[data-cart-root]");
  roots.forEach((root) => {
    const empty = root.querySelector("[data-cart-empty]");
    const emptyNote = root.querySelector("[data-cart-empty-note]");
    const filled = root.querySelector("[data-cart-filled]");
    const lines = root.querySelector("[data-cart-lines]");
    const sub = root.querySelector("[data-cart-subtotal]");
    const isEmpty = cart.lines.length === 0;
    if (empty instanceof HTMLElement) empty.hidden = !isEmpty;
    if (emptyNote instanceof HTMLElement) emptyNote.hidden = !isEmpty;
    if (filled instanceof HTMLElement) filled.hidden = isEmpty;
    if (sub) sub.textContent = formatUSD(subtotal(cart));
    if (!lines) return;
    lines.replaceChildren();
    for (const line of cart.lines) {
      const row = document.createElement("article");
      row.className = "cart-line";
      row.dataset.line = line.id;

      const visual = document.createElement("div");
      if (line.image) {
        const img = document.createElement("img");
        img.src = line.image;
        img.alt = "";
        visual.append(img);
      } else {
        const blank = document.createElement("div");
        blank.className = "mini-empty";
        blank.textContent = "";
        visual.append(blank);
      }

      const copy = document.createElement("div");
      const title = document.createElement("a");
      title.href = line.href;
      title.textContent = line.title;
      const meta = document.createElement("p");
      meta.className = "quiet";
      meta.textContent = `${line.color} · ${line.variantLabel}`;
      const price = document.createElement("p");
      price.textContent = formatUSD(line.unitPrice * line.qty);

      const qty = document.createElement("div");
      qty.className = "qty";
      const minus = document.createElement("button");
      minus.type = "button";
      minus.dataset.qtyDelta = "-1";
      minus.dataset.lineId = line.id;
      minus.setAttribute("aria-label", `Decrease quantity of ${line.title}`);
      minus.textContent = "−";
      const value = document.createElement("span");
      value.dataset.qtyValue = line.id;
      value.textContent = String(line.qty);
      const plus = document.createElement("button");
      plus.type = "button";
      plus.dataset.qtyDelta = "1";
      plus.dataset.lineId = line.id;
      plus.setAttribute("aria-label", `Increase quantity of ${line.title}`);
      plus.textContent = "+";
      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "remove-line";
      remove.dataset.removeLine = line.id;
      remove.textContent = "Remove";
      qty.append(minus, value, plus, remove);
      copy.append(title, meta, price, qty);
      row.append(visual, copy);
      lines.append(row);
    }
  });
  setBagCount();
}

function openDialog(dialog: HTMLDialogElement | null, focus?: HTMLElement | null) {
  if (!dialog) return;
  if (!dialog.open) dialog.showModal();
  const buttonId = dialog.getAttribute("aria-labelledby");
  void buttonId;
  (focus ?? dialog.querySelector<HTMLElement>("[data-close]"))?.focus();
}

function wireDialog(button: HTMLElement | null, dialog: HTMLDialogElement | null, focus?: HTMLElement | null) {
  if (!button || !dialog) return;
  button.addEventListener("click", () => {
    openDialog(dialog, focus);
    button.setAttribute("aria-expanded", "true");
  });
  dialog.addEventListener("close", () => button.setAttribute("aria-expanded", "false"));
  dialog.querySelectorAll<HTMLElement>("[data-close]").forEach((closer) => {
    closer.addEventListener("click", () => {
      if (dialog.open) dialog.close();
    });
  });
}

function announce(message: string) {
  const status = document.querySelector("#cart-status");
  if (status) status.textContent = message;
}

function selectedVariant(form: HTMLFormElement): string | null {
  const pressed = form.querySelector<HTMLElement>("[data-variant-id][aria-pressed='true']");
  return pressed?.getAttribute("data-variant-id") ?? null;
}

function bindProductForm() {
  const form = document.querySelector<HTMLFormElement>("#add-form");
  if (!form) return;
  const handle = form.dataset.handle ?? "";
  const product = byHandle(handle);
  const error = form.querySelector<HTMLElement>("#size-error");
  form.querySelectorAll<HTMLButtonElement>("[data-variant-id]").forEach((button) => {
    button.addEventListener("click", () => {
      form.querySelectorAll("[data-variant-id]").forEach((other) => {
        other.setAttribute("aria-pressed", other === button ? "true" : "false");
      });
      if (error) error.hidden = true;
      const variant = product?.variants.find((item) => item.id === button.dataset.variantId);
      const price = document.querySelector("[data-pdp-price]");
      if (variant && price) price.textContent = formatUSD(variant.price);
    });
  });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!product) return;
    const variantId = selectedVariant(form);
    const variant = product.variants.find((item) => item.id === variantId) ?? null;
    const result = addItem(cart, {
      kind: product.kind,
      handle: product.handle,
      variantId: variant?.id ?? null,
      title: product.title,
      color: product.color,
      variantLabel: variant?.label ?? "",
      unitPrice: variant?.price ?? product.variants[0]?.price ?? 0,
      image: product.image,
      href: `/products/${product.handle}`,
    });
    if (result.error) {
      if (error) {
        error.hidden = false;
        error.textContent = result.error;
      }
      form.querySelector<HTMLElement>("[data-size-group]")?.focus();
      announce(result.error);
      return;
    }
    cart = result.cart;
    persist();
    renderCart();
    announce(`Added ${product.title}${variant ? `, ${variant.label}` : ""} to your bag.`);
    const dialogNode = document.querySelector("#cart-dialog");
    const dialog = dialogNode instanceof HTMLDialogElement ? dialogNode : null;
    openDialog(dialog);
    document.querySelector("#bag-button")?.setAttribute("aria-expanded", "true");
  });
}

function bindCartClicks() {
  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const removeId = target.closest<HTMLElement>("[data-remove-line]")?.dataset.removeLine;
    if (removeId) {
      cart = removeLine(cart, removeId);
      persist();
      renderCart();
      announce("Removed from your bag.");
      return;
    }
    const qtyButton = target.closest<HTMLElement>("[data-qty-delta]");
    if (!qtyButton?.dataset.lineId || !qtyButton.dataset.qtyDelta) return;
    const delta = Number(qtyButton.dataset.qtyDelta);
    cart = changeQty(cart, qtyButton.dataset.lineId, delta);
    persist();
    renderCart();
    announce("Bag quantity updated.");
  });
}

function asElement(selector: string): HTMLElement | null {
  const node = document.querySelector(selector);
  return node instanceof HTMLElement ? node : null;
}

function bindMenu() {
  const dialogNode = document.querySelector("#menu-dialog");
  const dialog = dialogNode instanceof HTMLDialogElement ? dialogNode : null;
  wireDialog(asElement("#menu-button"), dialog);
  dialog?.querySelectorAll<HTMLButtonElement>("[data-acc]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = button.nextElementSibling;
      const open = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", open ? "false" : "true");
      if (panel instanceof HTMLElement) panel.hidden = open;
    });
  });
  document.querySelector("#menu-bag")?.addEventListener("click", () => {
    if (dialog?.open) dialog.close();
    const cartNode = document.querySelector("#cart-dialog");
    openDialog(cartNode instanceof HTMLDialogElement ? cartNode : null);
    document.querySelector("#bag-button")?.setAttribute("aria-expanded", "true");
  });
}

function bindDesktopMenus() {
  document.querySelectorAll<HTMLElement>(".nav-item").forEach((item) => {
    const button = item.querySelector<HTMLButtonElement>(":scope > button");
    if (!button) return;
    const setOpen = (open: boolean) => {
      button.setAttribute("aria-expanded", open ? "true" : "false");
      item.classList.toggle("is-open", open);
    };
    button.addEventListener("click", (event) => {
      event.preventDefault();
      setOpen(button.getAttribute("aria-expanded") !== "true");
    });
    item.addEventListener("mouseenter", () => setOpen(true));
    item.addEventListener("mouseleave", () => setOpen(false));
    item.addEventListener("focusin", () => setOpen(true));
    item.addEventListener("focusout", (event) => {
      const next = event.relatedTarget;
      if (!(next instanceof Node) || !item.contains(next)) setOpen(false);
    });
  });
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    document.querySelectorAll<HTMLElement>(".nav-item.is-open").forEach((item) => {
      item.classList.remove("is-open");
      item.querySelector("button")?.setAttribute("aria-expanded", "false");
    });
  });
}

function renderSuggestions(list: HTMLElement, text: string) {
  const matches = searchProducts(products, text).slice(0, 6);
  list.replaceChildren();
  if (!text.trim()) return;
  if (matches.length === 0) {
    const item = document.createElement("li");
    item.textContent = "No matches in this preview.";
    list.append(item);
    return;
  }
  for (const product of matches) {
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.href = `/products/${product.handle}`;
    link.textContent = `${product.title} — ${product.color}`;
    item.append(link);
    list.append(item);
  }
}

function bindSearch() {
  const dialogNode = document.querySelector("#search-dialog");
  const dialog = dialogNode instanceof HTMLDialogElement ? dialogNode : null;
  const inputNode = document.querySelector("#search-input");
  const input = inputNode instanceof HTMLInputElement ? inputNode : null;
  const listNode = document.querySelector("#search-suggest");
  const list = listNode instanceof HTMLElement ? listNode : null;
  wireDialog(asElement("#search-open"), dialog, input);
  input?.addEventListener("input", () => {
    if (list) renderSuggestions(list, input.value);
  });
  const pageInput = document.querySelector<HTMLInputElement>("#search-page-input");
  const pageResults = document.querySelector<HTMLElement>("#search-page-results");
  const pageCopy = document.querySelector<HTMLElement>("#search-page-copy");
  if (pageInput && pageResults && pageCopy) {
    const params = new URLSearchParams(window.location.search);
    const initial = params.get("q") ?? "";
    pageInput.value = initial;
    const paint = () => {
      const query = pageInput.value;
      const found = searchProducts(products, query);
      pageResults.replaceChildren();
      if (!query.trim()) {
        pageCopy.textContent = "Type a word to search this preview.";
        return;
      }
      pageCopy.textContent =
        found.length === 0
          ? `No matches for “${query}”.`
          : `${found.length} match${found.length === 1 ? "" : "es"} for “${query}”.`;
      for (const product of found) {
        const link = document.createElement("a");
        link.className = "card";
        link.href = `/products/${product.handle}`;
        link.textContent = `${product.title} — ${product.color}`;
        const wrap = document.createElement("article");
        wrap.append(link);
        pageResults.append(wrap);
      }
    };
    pageInput.addEventListener("input", () => {
      const url = new URL(window.location.href);
      url.searchParams.set("q", pageInput.value);
      window.history.replaceState(null, "", url);
      paint();
    });
    paint();
  }
}

function readQuery(): QueryState {
  const sortButton = document.querySelector<HTMLElement>(".sort-row button[aria-pressed='true']");
  const sort = (sortButton?.dataset.sort as SortKey | undefined) ?? "featured";
  const checked = (name: string) =>
    [...document.querySelectorAll<HTMLInputElement>(`input[name="${name}"]:checked`)].map(
      (input) => input.value,
    );
  return {
    sort,
    sizes: checked("size"),
    categories: checked("category"),
    colors: checked("color"),
    priceBands: checked("price") as PriceBand[],
    text: "",
  };
}

function bindFilters() {
  const gridNode = document.querySelector("[data-grid]");
  if (!(gridNode instanceof HTMLElement)) return;
  const grid = gridNode;
  const dialogNode = document.querySelector("#filter-dialog");
  const dialog = dialogNode instanceof HTMLDialogElement ? dialogNode : null;
  wireDialog(asElement("#filter-open"), dialog);
  const handles = [...grid.querySelectorAll<HTMLElement>("[data-card]")].map(
    (card) => card.dataset.handle ?? "",
  );
  const subset = handles
    .map((handle) => byHandle(handle))
    .filter((product): product is NonNullable<typeof product> => Boolean(product));

  const apply = () => {
    const result = applyQuery(subset, readQuery());
    const rank = new Map(result.map((product, index) => [product.handle, index]));
    const cards = [...grid.querySelectorAll<HTMLElement>("[data-card]")];
    const visible: HTMLElement[] = [];
    const hidden: HTMLElement[] = [];
    for (const card of cards) {
      const place = rank.get(card.dataset.handle ?? "");
      if (place === undefined) hidden.push(card);
      else visible[place] = card;
    }
    for (const card of visible) {
      card.hidden = false;
      grid.appendChild(card);
    }
    for (const card of hidden) {
      card.hidden = true;
      grid.appendChild(card);
    }
    const empty = document.querySelector<HTMLElement>("[data-filter-empty]");
    if (empty) empty.hidden = result.length !== 0;
    const count = document.querySelector("[data-count]");
    if (count) count.textContent = String(result.length);
  };

  dialog?.querySelectorAll("input").forEach((input) => input.addEventListener("change", apply));
  dialog?.querySelectorAll<HTMLButtonElement>("[data-sort]").forEach((button) => {
    button.addEventListener("click", () => {
      dialog.querySelectorAll("[data-sort]").forEach((other) => {
        other.setAttribute("aria-pressed", other === button ? "true" : "false");
      });
      apply();
    });
  });
  document.querySelector("[data-clear-filters]")?.addEventListener("click", () => {
    dialog?.querySelectorAll<HTMLInputElement>("input").forEach((input) => {
      input.checked = false;
    });
    dialog?.querySelectorAll("[data-sort]").forEach((button, index) => {
      button.setAttribute("aria-pressed", index === 0 ? "true" : "false");
    });
    apply();
  });
  document.querySelector("[data-apply-filters]")?.addEventListener("click", () => {
    apply();
    if (dialog?.open) dialog.close();
  });
  apply();
}

function bindTabs() {
  const tabs = document.querySelectorAll<HTMLButtonElement>("[data-tab]");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const name = tab.dataset.tab;
      tabs.forEach((other) => other.setAttribute("aria-selected", other === tab ? "true" : "false"));
      document.querySelectorAll<HTMLElement>("[data-panel]").forEach((panel) => {
        panel.hidden = panel.dataset.panel !== name;
      });
    });
  });
}

function bindNewsletter() {
  document.querySelector("#newsletter-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    announce("Email is off. Nothing was sent.");
  });
}

cart = loadCart(localStorage, CART_KEY);
renderCart();
bindCartClicks();
bindProductForm();
bindMenu();
bindDesktopMenus();
bindSearch();
bindFilters();
bindTabs();
bindNewsletter();

const cartDialogNode = document.querySelector("#cart-dialog");
wireDialog(
  asElement("#bag-button"),
  cartDialogNode instanceof HTMLDialogElement ? cartDialogNode : null,
);
