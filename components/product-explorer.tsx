"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { products } from "@/data/products";

type Product = (typeof products)[number];

function ProductDialog({ product, onClose, onSave }: {
  product: Product;
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
    <div className="dialog-product"><img src={`/assets/products/${product.image}`} alt={product.name} /><div><span className="product-kind">{product.kind} · Quipaw</span><h2 id="quipaw-product-title">{product.name}</h2><p>{product.description}</p><p>Offer chews with supervision, fresh water and a size that suits your dog.</p><button className="button button-dark" type="button" onClick={onSave}>♡ Save this favorite</button></div></div>
  </dialog>;
}

export function ProductExplorer() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [saved, setSaved] = useState<string[]>([]);
  const [selected, setSelected] = useState<(typeof products)[number] | null>(null);
  const visible = useMemo(() => products.filter((p) => (filter === "all" || p.group === filter) && `${p.name} ${p.kind} ${p.description}`.toLowerCase().includes(search.toLowerCase())), [filter, search]);

  return <>
    <div className="filter-row" role="group" aria-label="Filter Quipaw treats">{[["all", "All the chews"], ["beef", "Beef"], ["poultry", "Poultry"], ["lamb", "Lamb"], ["collagen", "Collagen"]].map(([key, label]) => <button type="button" key={key} className={`filter-chip ${filter === key ? "is-active" : ""}`} onClick={() => setFilter(key)}>{label}</button>)}<label className="quipaw-product-search"><span aria-hidden="true">⌕</span><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Find a chew" aria-label="Search Quipaw treats" /></label></div>
    <div className="product-grid" aria-live="polite">{visible.map((p) => <article className="product-card" key={p.id}><div className="product-image-wrap"><img src={`/assets/products/${p.image}`} alt={`Quipaw ${p.name}`} loading="lazy" /><span className="product-sticker">{p.kind}</span><button type="button" className={`save-button ${saved.includes(p.id) ? "is-saved" : ""}`} aria-label={`${saved.includes(p.id) ? "Remove" : "Save"} ${p.name}`} onClick={() => setSaved((items) => items.includes(p.id) ? items.filter((id) => id !== p.id) : [...items, p.id])}>{saved.includes(p.id) ? "♥" : "♡"}</button></div><div className="product-card-body"><span className="product-kind">Quipaw collection</span><h3>{p.name}</h3><p>{p.description}</p><button className="card-action" type="button" onClick={() => setSelected(p)}>Take a closer look <span aria-hidden="true">↗</span></button></div></article>)}</div>
    {visible.length === 0 && <p className="empty-state">No chews found. Try another search.</p>}
    <p className="catalog-note"><span>Quick note:</span> Product details and availability will be connected to the shop before launch.</p>
    {selected && <ProductDialog product={selected} onClose={() => setSelected(null)} onSave={() => setSaved((items) => items.includes(selected.id) ? items : [...items, selected.id])} />}
  </>;
}
