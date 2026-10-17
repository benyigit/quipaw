"use client";

import { useState } from "react";
import Link from "next/link";

type PageName = "home" | "shop" | "blog" | "events";

export function SiteHeader({ current = "home" }: { current?: PageName }) {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  return <>
    <div className="announcement"><span className="announce-paw">🐾</span><span>Good treats. Happy tails. All day.</span><span className="announce-spark">✦</span></div>
    <header className="site-header" id="top">
      <Link className="brand-lockup" href="/" aria-label="Quipaw home"><img src="/assets/logo-quipaw.png" alt="Quipaw" /><span>DOG TREATS</span></Link>
      <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="main-nav" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((value) => !value)}><span /><span /></button>
      <nav id="main-nav" className={"main-nav " + (open ? "is-open" : "")} aria-label="Main navigation">
        <Link href="/#products">The chews</Link>
        <Link href="/shop" aria-current={current === "shop" ? "page" : undefined}>Shop</Link>
        <Link href="/blog" aria-current={current === "blog" ? "page" : undefined}>The journal</Link>
        <Link href="/events" aria-current={current === "events" ? "page" : undefined}>Good times</Link>
        <Link href="/#contact">Say hello</Link>
      </nav>
    </header>
  </>;
}

export function SiteFooter() {
  return <footer className="site-footer">
    <div className="footer-top section-wrap">
      <div className="footer-top-copy"><span>MORE TAIL WAGS START HERE</span><strong>Find their next happy chew.</strong></div>
      <Link className="button button-light" href="/shop">Shop the chews <span aria-hidden="true">→</span></Link>
      <span className="footer-top-decor" aria-hidden="true">✿　♡　✦</span>
    </div>
    <div className="footer-main section-wrap">
      <div className="footer-brand"><Link href="/"><img src="/assets/logo-quipaw.png" alt="Quipaw logo" /></Link><span>DOG TREATS</span><p>Back to their nature. Forward to more happy tails.</p></div>
      <div><h3>Take a sniff around</h3><Link href="/shop">Shop the chews</Link><Link href="/#products">Featured treats</Link><Link href="/blog">The journal</Link><Link href="/events">Good times</Link></div>
      <div className="footer-support"><h3>Need a human?</h3><a href="tel:+18325550123">☎ +1 (832) 555-0123</a><a href="mailto:support@quipaw.com">✉ support@quipaw.com</a><Link href="/#contact">Visit our contact page ↗</Link><a href="https://fgfpetfood.com">Visit FGF Pet Food Bazaar ↗</a></div>
      <div className="footer-paw">🐾<small>Good treats<br />happy tails</small><span>Made for their best days.</span></div>
    </div>
    <div className="footer-bottom section-wrap"><span>© Quipaw Dog Treats</span><span>Made for the love of a good dog.</span><Link href="/#top">Back to top ↑</Link></div>
  </footer>;
}
