import type { Metadata } from "next";
import { BlogExplorer } from "@/components/blog-explorer";
import { SiteFooter, SiteHeader } from "@/components/site-shell";

export const metadata: Metadata = { title: "The Journal — Quipaw Dog Treats", description: "Explore the complete Quipaw blog collection: chew-time notes, treat ideas and little reads for people who love dogs." };

export default function BlogPage() {
  return <><SiteHeader current="blog" /><main>
    <section className="archive-hero"><div className="section-wrap archive-hero-inner"><div className="archive-hero-copy"><p className="eyebrow"><span className="eyebrow-paw">✿</span> The Quipaw journal</p><h1>Good dogs make <em>good stories.</em></h1><p>Explore the complete Quipaw blog collection: chew-time notes, treat ideas and little reads for people who love dogs.</p><a className="button button-dark" href="#all-stories">Find a story <span aria-hidden="true">↓</span></a></div><div className="archive-hero-art"><img src="/assets/quipaw-pdf-journal.webp" alt="Dogs enjoying a sunny day outdoors" /><div className="archive-sticker">WAG<br />& READ!</div></div></div></section>
    <BlogExplorer />
  </main><SiteFooter /></>;
}
