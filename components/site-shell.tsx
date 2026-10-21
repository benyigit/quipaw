"use client";

import { useLanguage } from "@/components/language-provider";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MemberTools } from "./member-tools";
import { useFavorites } from "@/components/favorites-provider";
type PageName = "home" | "shop" | "blog" | "events";
export function SiteHeader({
  current = "home"
}: {
  current?: PageName;
}) {
  const {
    t,
    language
  } = useLanguage();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const {
    favoriteIds
  } = useFavorites();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const closeMenu = () => setOpen(false);
  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);
  return <>
    <div className="announcement"><span className="announce-paw">🐾</span><span>{t("Good treats. Happy tails. All day.")}</span><span className="announce-spark">✦</span></div>
    <header className="site-header" id="top">
      <Link className="brand-lockup" href="/" aria-label={t("Quipaw home")}><img src="/assets/logo-quipaw.png" alt={t("Quipaw")} /><span>{t("DOG TREATS")}</span></Link>
      <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="main-nav" aria-label={t(open ? "Close menu" : "Open menu")} onClick={() => {
        setOpen(value => !value);
        setSearchOpen(false);
      }}><span /><span /></button>
      <nav id="main-nav" className={"main-nav " + (open ? "is-open" : "")} aria-label={t("Main navigation")}>
        <Link href="/shop" onClick={closeMenu}>{t("Products")}</Link>
        <Link href="/shop" onClick={closeMenu} aria-current={current === "shop" ? "page" : undefined}>{t("Shop")}</Link>
        <Link href="/blog" onClick={closeMenu} aria-current={current === "blog" ? "page" : undefined}>{t("Blog")}</Link>
        <Link href="/events" onClick={closeMenu} aria-current={current === "events" ? "page" : undefined}>{t("Good times")}</Link>
        <Link href="/#contact" onClick={closeMenu}>{t("Say hello")}</Link>
      </nav>
      <div className="header-actions"><MemberTools />
        <form className={`search-box ${searchOpen ? "is-open" : ""}`} action="/shop" method="get" role="search" onSubmit={() => setSearchOpen(false)}>
          <button className="search-toggle" type="button" aria-label={t(searchOpen ? "Close search" : "Open search")} aria-expanded={searchOpen} onClick={() => {
            setSearchOpen(value => !value);
            setOpen(false);
          }}>⌕</button>
          <input ref={searchInputRef} type="search" name="q" placeholder={t("Find a chew")} aria-label={t("Search chews")} />
          <button className="search-submit" type="submit" aria-label={t("Search chews")}>⌕</button>
        </form>
        <Link className="favorite-counter" href="/shop?favorites=1" aria-label={t(`View favorites, ${favoriteIds.length} saved`)}><span aria-hidden="true">♡</span><span className="favorite-count">{t(favoriteIds.length)}</span><span className="favorite-label">{t("Favorites")}</span></Link>
      </div>
    </header>
  </>;
}
export function SiteFooter() {
  const {
    t,
    language
  } = useLanguage();
  return <footer className="site-footer">
    <div className="footer-top section-wrap">
      <div className="footer-top-copy"><span>{t("MORE TAIL WAGS START HERE")}</span><strong>{t("Find their next happy chew.")}</strong></div>
      <Link className="button button-light" href="/shop">{t("Shop the chews ")}<span aria-hidden="true">→</span></Link>
      <span className="footer-top-decor" aria-hidden="true">✿　♡　✦</span>
    </div>
    <div className="footer-main section-wrap">
      <div className="footer-brand"><Link href="/"><img src="/assets/logo-quipaw.png" alt={t("Quipaw logo")} /></Link><span>{t("DOG TREATS")}</span><p>{t("Back to their nature. Forward to more happy tails.")}</p></div>
      <div><h3>{t("Take a sniff around")}</h3><Link href="/shop">{t("Shop the chews")}</Link><Link href="/#products">{t("Featured treats")}</Link><Link href="/#happy-tails">{t("Happy tails scrapbook")}</Link><Link href="/blog">{t("Blog")}</Link><Link href="/events">{t("Good times")}</Link><Link href="/#match">{t("Paw passport")}</Link></div>
      <div className="footer-support"><h3>{t("Need a human?")}</h3><a className="footer-contact-link" href="tel:+12813010010"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="M5 4h3l2 5-2 1.5a15 15 0 0 0 5.5 5.5L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" /></svg><span>281-301-0010</span></a><a className="footer-contact-link" href="mailto:support@quipaw.com"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg><span>{t("support@quipaw.com")}</span></a><Link href="/#contact">{t("Visit our contact page ↗")}</Link><a href="https://fgfpetfood.com">{t("Visit FGF Pet Food Bazaar ↗")}</a></div>
      <div className="footer-paw">🐾<small>{t("Good treats")}<br />{t("happy tails")}</small><span>{t("Made for their best days.")}</span></div>
    </div>
    <div className="footer-community section-wrap"><Link href="/account">{"My account & photos ↗"}</Link><Link href="/cart">{"My treat bag ↗"}</Link></div>
    <div className="footer-trademark section-wrap">QUIPAW is Registered trademark of FGF PET FOOD BAZAAR LLC</div>
    <div className="footer-bottom section-wrap"><span>{t("© Quipaw Dog Treats")}</span><span>{t("Made for the love of a good dog.")}</span><Link href="/#top">{t("Back to top ↑")}</Link></div>
  </footer>;
}
