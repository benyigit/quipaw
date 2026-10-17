"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { products } from "@/data/products";
import { useFavorites } from "@/components/favorites-provider";

type Product = (typeof products)[number];

function ProductDialog({ product, isSaved, onClose, onSave }: {
  product: Product;
  isSaved: boolean;
  onClose: () => void;
  onSave: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    dialog.showModal();
    return () => {
      if (dialog.open) dialog.close();
    };
  }, []);

  return <dialog ref={dialogRef} className="site-dialog" aria-labelledby="quipaw-product-title" onCancel={(event) => { event.preventDefault(); onClose(); }} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <button className="dialog-close" type="button" onClick={onClose} aria-label="Close">×</button>
    <div className="dialog-product"><img src={`/assets/products/${product.image}`} alt={product.name} /><div><span className="product-kind">{product.kind} · Quipaw</span><h2 id="quipaw-product-title">{product.name}</h2><p>{product.description}</p><p>Offer chews with supervision, fresh water and a size that suits your dog.</p><button className="button button-dark" type="button" aria-pressed={isSaved} onClick={onSave}>{isSaved ? "♥ Saved to favorites" : "♡ Save this favorite"}</button></div></div>
  </dialog>;
}

export function ProductExplorer({ initialSearch = "", initialFavoritesOnly = false }: {
  initialSearch?: string;
  initialFavoritesOnly?: boolean;
}) {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState(initialSearch);
  const [favoritesOnly, setFavoritesOnly] = useState(initialFavoritesOnly);
  const [selected, setSelected] = useState<(typeof products)[number] | null>(null);
  const { favoriteIds, toggleFavorite } = useFavorites();
  const visible = useMemo(() => products.filter((p) => (filter === "all" || p.group === filter) && (!favoritesOnly || favoriteIds.includes(p.id)) && `${p.name} ${p.kind} ${p.description}`.toLowerCase().includes(search.toLowerCase())), [favoriteIds, favoritesOnly, filter, search]);

  useEffect(() => setSearch(initialSearch), [initialSearch]);
  useEffect(() => setFavoritesOnly(initialFavoritesOnly), [initialFavoritesOnly]);

  return <>
    <div className="filter-row" role="group" aria-label="Filter Quipaw treats">{[["all", "All the chews"], ["beef", "Beef"], ["poultry", "Poultry"], ["lamb", "Lamb"], ["collagen", "Collagen"]].map(([key, label]) => <button type="button" key={key} className={`filter-chip ${filter === key && !favoritesOnly ? "is-active" : ""}`} onClick={() => { setFilter(key); setFavoritesOnly(false); }}>{label}</button>)}<button type="button" className={`filter-chip favorites-chip ${favoritesOnly ? "is-active" : ""}`} aria-pressed={favoritesOnly} onClick={() => setFavoritesOnly((value) => !value)}>♡ Favorites ({favoriteIds.length})</button><label className="quipaw-product-search"><span aria-hidden="true">⌕</span><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Find a chew" aria-label="Search Quipaw treats" /></label></div>
    <div className="product-grid" aria-live="polite">{visible.map((p) => { const isSaved = favoriteIds.includes(p.id); return <article className="product-card" key={p.id}><div className="product-image-wrap"><img src={`/assets/products/${p.image}`} alt={`Quipaw ${p.name}`} loading="lazy" /><span className="product-sticker">{p.kind}</span><button type="button" className={`save-button ${isSaved ? "is-saved" : ""}`} aria-label={`${isSaved ? "Remove from" : "Add to"} favorites: ${p.name}`} aria-pressed={isSaved} onClick={() => toggleFavorite(p.id)}>{isSaved ? "♥" : "♡"}</button></div><div className="product-card-body"><span className="product-kind">Quipaw collection</span><h3>{p.name}</h3><p>{p.description}</p><button className="card-action" type="button" onClick={() => setSelected(p)}>Take a closer look <span aria-hidden="true">↗</span></button></div></article>; })}</div>
    {visible.length === 0 && <p className="empty-state">{favoritesOnly && favoriteIds.length === 0 ? "No favorites saved yet. Tap a heart on a chew and it will be waiting here." : "No chews found. Try another search."}</p>}
    <p className="catalog-note"><span>Quick note:</span> Product details and availability will be connected to the shop before launch.</p>
    {selected && <ProductDialog product={selected} isSaved={favoriteIds.includes(selected.id)} onClose={() => setSelected(null)} onSave={() => toggleFavorite(selected.id)} />}
  </>;
}
