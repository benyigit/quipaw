"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import articleData from "@/data/articles.json";

type Article = { id: string; category: string; title: string; image: string; excerpt: string; body: string[] };
const articles = articleData as Article[];

export function BlogExplorer() {
  const [category, setCategory] = useState("All stories");
  const [search, setSearch] = useState("");
  const categories = ["All stories", ...new Set(articles.map((article) => article.category))];
  const visible = useMemo(() => articles.filter((article) => (category === "All stories" || article.category === category) && `${article.title} ${article.category} ${article.excerpt} ${article.body.join(" ")}`.toLowerCase().includes(search.toLowerCase())), [category, search]);
  return <section className="archive-section section-wrap" id="all-stories">
    <div className="archive-section-heading"><div><p className="eyebrow">From the Quipaw pack</p><h2>Every story, right here.</h2></div><span className="archive-count" aria-live="polite">{visible.length} {visible.length === 1 ? "story" : "stories"}</span></div>
    <div className="blog-controls"><div className="blog-filter-row">{categories.map((item) => <button type="button" key={item} className={`filter-chip ${category === item ? "is-active" : ""}`} onClick={() => setCategory(item)}>{item}</button>)}</div><label className="blog-search"><span aria-hidden="true">⌕</span><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search the journal" aria-label="Search blog stories" /></label></div>
    <div className="archive-grid">{visible.map((article) => <article className="archive-card" key={article.id}><div className="archive-photo"><img src={`/${article.image}`} alt={article.title} loading="lazy" /></div><div className="archive-card-content"><span className="journal-category">{article.category}</span><h3>{article.title}</h3><p className="archive-card-excerpt">{article.excerpt}</p><details className="story-details"><summary>Read the full story</summary><div className="story-full">{article.body.map((paragraph, index) => <p key={`${article.id}-${index}`}>{paragraph}</p>)}<p className="article-note">Every dog is different. Keep an eye on chew time and choose a size that suits your dog.</p></div></details></div></article>)}</div>
    {visible.length === 0 && <div className="archive-empty">No stories match that search. Try another topic.</div>}
    <aside className="archive-callout"><div><h2>Good times happen together.</h2><p>We’re also putting together a Quipaw events calendar. Take a look at the ideas and tell us what you’d love to join.</p></div><Link className="button button-dark" href="/events">Visit the events page <span aria-hidden="true">→</span></Link></aside>
  </section>;
}
