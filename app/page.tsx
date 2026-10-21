"use client";

import { useLanguage } from "@/components/language-provider";
import { QuizFinder } from "@/components/quiz-finder";
import { PackagingHighlights } from "@/components/packaging-highlights";
import { HappyTails } from "@/components/happy-tails";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { ProductExplorer } from "@/components/product-explorer";
import { SiteContact } from "@/components/site-contact";
import Link from "next/link";
export default function HomePage() {
  const {
    t,
    language
  } = useLanguage();
  return <><SiteHeader />
    <main>
      <section className="hero section-wrap" aria-labelledby="hero-title"><div className="hero-copy"><p className="eyebrow"><span className="eyebrow-paw">✿</span>{t(" Back to their nature")}</p><h1 id="hero-title">{t("Good treats for ")}<em>{t("happy dogs.")}</em></h1><p className="hero-intro">{t("Simple, natural chews for the best part of the day: that look, that wag, that little happy dance.")}</p><div className="hero-buttons"><Link className="button button-dark" href="/shop">{t("Explore the shop ")}<span aria-hidden="true">→</span></Link><Link className="button button-outline" href="/#match">{t("Make their passport ")}<span aria-hidden="true">✦</span></Link></div><div className="hero-caption"><span className="caption-paw">🐾</span><span>{t("One good chew. A whole lot of tail wag.")}</span></div></div><div className="hero-art"><div className="hero-photo hero-photo-calm"><img className="calm-cavalier-hero" src="/assets/stories/quipaw-calm-cavalier-hero.webp" alt={t("A calm Cavalier King Charles Spaniel gently enjoying a cow ear beside its Quipaw treats")} width={1536} height={1024} fetchPriority="high" /></div><div className="hero-seal"><span>{t("Quipaw")}</span><small>{t("Good dog")}<br />{t("energy")}</small></div><span className="hero-doodle doodle-one">✳</span><span className="hero-doodle doodle-two">♡</span><div className="hero-note">{t("Treat time")}<br />{t("is the best time.")}</div></div></section>
      <PackagingHighlights />
      <section id="products" className="section-wrap products-section"><div className="section-heading shop-heading-action-wrap"><div><p className="eyebrow">{t("The Quipaw chew shelf")}</p><h2>{t("Natural chews. ")}<em>{t("Real happy.")}</em></h2></div><div className="shop-heading-action"><p>{t("Find a familiar favorite or try a new texture. Tap a heart to save a chew for later.")}</p><Link className="button button-dark" href="/shop">{t("Browse the full shop ")}<span aria-hidden="true">→</span></Link></div></div><ProductExplorer /></section>
      <QuizFinder />
      <section id="journal" className="section-wrap journal-section"><div className="section-heading"><div><p className="eyebrow">{t("Quipaw blog")}</p><h2>{t("For healthier, ")}<em>{t("happier days.")}</em></h2></div><div className="journal-heading-action"><p>{t("Little reads for dog people, from everyday treats to happier chew time.")}</p></div></div><div className="journal-grid">{t([{
            id: "bully-stick-6",
            title: "Bully Sticks for Dogs: 7 Benefits of a 6-Inch Natural Dog Chew",
            image: "bully-stick-story.webp"
          }, {
            id: "chicken-feet",
            title: "Chicken Feet for Dogs: A Naturally Crunchy Chew with Plenty to Enjoy",
            image: "chicken-feet-story.jpg"
          }, {
            id: "cow-ear-natural",
            title: "Cow Ears for Dogs: A Naturally Satisfying Chew Dogs Love to Explore",
            image: "cow-ear-story.webp"
          }].map(story => <article className="journal-card" key={story.id}><Link className="journal-photo" href={`/blog/${story.id}`} tabIndex={-1} aria-hidden="true" style={{
              display: "block"
            }}><img src={`/assets/stories/${story.image}`} alt="" loading="lazy" /></Link><div className="journal-card-body"><span className="journal-category">{t("From the blog")}</span><h3><Link href={`/blog/${story.id}`}>{t(story.title)}</Link></h3><p>{t("Helpful chew-time notes and little reads for people who love dogs.")}</p><Link href={`/blog/${story.id}`}>{t("Read the story ")}<span aria-hidden="true">→</span></Link></div></article>))}</div><div className="pdf-visual-banner"><img src="/assets/quipaw-pdf-journal-full.webp" alt={t("Happy Dogs Read Our Blog with a Border Collie running through a sunny field")} /><Link className="pdf-banner-cta" href="/blog">{t("Explore More Articles ")}<span aria-hidden="true">→</span></Link></div></section>
      <section id="events" className="events-section"><div className="section-wrap events-inner"><div className="event-sun">✿</div><div className="events-copy"><p className="eyebrow">{t("Good times, coming soon")}</p><h2>{t("Let’s make ")}<em>{t("memories.")}</em></h2><p>{t("We’re getting the Quipaw community calendar ready. There are no confirmed dates to announce yet. Visit the events page to see the kinds of dog-friendly days we’re planning.")}</p></div><div className="event-art"><img src="/assets/stories/bully-stick-story.webp" alt={t("A dog enjoying an outdoor day")} /><span className="event-caption">{t("Good dogs")}<br />{t("make good days.")}</span></div></div><div className="section-wrap pdf-event-banner"><img src="/assets/quipaw-pdf-events.webp" alt={t("Good Dogs Make Great Days with a curly-coated dog in a sunny field")} /><Link className="pdf-banner-cta pdf-event-cta" href="/events">{t("Explore Event Ideas ")}<span aria-hidden="true">→</span></Link></div></section>
      <HappyTails brand="quipaw" />
      <Newsletter />
      <SiteContact />
    </main><SiteFooter />
  </>;
}
function Newsletter() {
  const {
    t,
    language
  } = useLanguage();
  return <section id="newsletter" className="section-wrap newsletter-section"><div className="newsletter-card"><div className="newsletter-paw">🐾</div><div className="newsletter-copy"><p className="eyebrow">{t("A little note from Quipaw")}</p><h2>{t("Good things are ")}<em>{t("on the way.")}</em></h2><p>{t("Fresh treats, happy dog stories and friendly news from our corner of the pack.")}</p></div><form className="newsletter-form" action="mailto:support@quipaw.com" method="post" encType="text/plain"><label className="sr-only" htmlFor="newsletter-email">{t("Email address")}</label><input id="newsletter-email" name="email" type="email" placeholder={t("Your email address")} required /><button className="button button-dark" type="submit">{t("Join the pack ")}<span aria-hidden="true">→</span></button><p className="form-message">{t("Email signup will be connected when the store launches.")}</p></form></div></section>;
}
