import type { Metadata } from "next";
import { ProductExplorer } from "@/components/product-explorer";
import { SiteFooter, SiteHeader } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Shop the Chews — Quipaw",
  description: "Explore natural Quipaw chews for curious noses and happy dogs.",
};

export default function ShopPage() {
  return <>
    <SiteHeader current="shop" />
    <main>
      <section className="quipaw-shop-hero">
        <div className="section-wrap quipaw-shop-hero-inner">
          <div className="quipaw-shop-copy">
            <p className="eyebrow"><span className="eyebrow-paw">✿</span> The Quipaw chew shelf</p>
            <h1>Good chews for <em>good dogs.</em></h1>
            <p>Find a familiar favorite or discover a new texture. Every pick is here to make snack time a little happier.</p>
            <div className="quipaw-shop-perks"><span>♡ Natural chew-time joy</span><span>🐾 For happy paws</span></div>
          </div>
          <div className="quipaw-shop-art"><img src="/assets/products/bully-stick-6.webp" alt="A Quipaw six-inch bully stick chew" /><span>WAG<br />WORTHY</span></div>
        </div>
      </section>
      <section className="section-wrap quipaw-shop-catalog" aria-labelledby="quipaw-products-title">
        <div className="section-heading shop-page-heading">
          <div><p className="eyebrow">Pick their next favorite</p><h2 id="quipaw-products-title">Natural chews. <em>Real happy.</em></h2></div>
          <p>Search or filter by chew type, then tap a heart to save a favorite.</p>
        </div>
        <ProductExplorer />
      </section>
    </main>
    <SiteFooter />
  </>;
}
