"use client";

import { useLanguage } from "@/components/language-provider";
import { ProductExplorer } from "@/components/product-explorer";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
export default function ShopPageView({
  initialSearch,
  initialFavoritesOnly
}: {
  initialSearch: string;
  initialFavoritesOnly: boolean;
}) {
  const {
    t,
    language
  } = useLanguage();
  return <>
    <SiteHeader current="shop" />
    <main>
      <section className="quipaw-shop-hero">
        <div className="section-wrap quipaw-shop-hero-inner">
          <div className="quipaw-shop-copy">
            <p className="eyebrow"><span className="eyebrow-paw">✿</span>{t(" The Quipaw chew shelf")}</p>
            <h1>{t("Good chews for ")}<em>{t("good dogs.")}</em></h1>
            <p>{t("Find a familiar favorite or discover a new texture. Every pick is here to make snack time a little happier.")}</p>
            <div className="quipaw-shop-perks"><span>{t("♡ Natural chew-time joy")}</span><span>{t("🐾 For happy paws")}</span></div>
          </div>
          <div className="quipaw-shop-art"><img src="/assets/products/bully-stick-6.webp" alt={t("A Quipaw six-inch bully stick chew")} /><span>{t("WAG")}<br />{t("WORTHY")}</span></div>
        </div>
      </section>
      <section className="section-wrap quipaw-shop-catalog" aria-labelledby="quipaw-products-title">
        <div className="section-heading shop-page-heading">
          <div><p className="eyebrow">{t("Pick their next favorite")}</p><h2 id="quipaw-products-title">{t("Natural chews. ")}<em>{t("Real happy.")}</em></h2></div>
          <p>{t("Search or filter by chew type, then tap a heart to save a favorite.")}</p>
        </div>
        <ProductExplorer initialSearch={initialSearch} initialFavoritesOnly={initialFavoritesOnly} />
      </section>
    </main>
    <SiteFooter />
  </>;
}
