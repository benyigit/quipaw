import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/site-shell";

export const metadata: Metadata = { title: "Good Times — Quipaw Dog Treats", description: "Explore the dog-friendly community activities Quipaw is planning." };

const ideas = [
  { category: "Meet & play", title: "Park play day", image: "park-play.webp", text: "A relaxed meet-up with room for sniffing, strolling and making new friends.", subject: "Quipaw park play day" },
  { category: "Learn together", title: "Grooming tips", image: "grooming.webp", text: "Friendly care ideas and a chance to learn about making coat care easier.", subject: "Quipaw grooming tips" },
  { category: "Try something new", title: "Training & agility", image: "training.webp", text: "Playful activities for dogs and people who like to learn by doing.", subject: "Quipaw training and agility" },
  { category: "Celebrate dogs", title: "Photo day & picnic", image: "photo-picnic.webp", text: "A sunny afternoon for dog photos, local treats and plenty of good company.", subject: "Quipaw photo day and picnic" },
];

export default function EventsPage() {
  return <><SiteHeader current="events" /><main className="events-page-main">
    <div className="section-wrap events-pdf-art"><img src="/assets/quipaw-pdf-events-hero.webp" alt="Quipaw Events and Activities banner with four curly-coated dogs playing in a sunny field" /></div>
    <section className="section-wrap events-intro"><div><p className="eyebrow"><span className="eyebrow-paw">✿</span> Good times with Quipaw</p><h1>Dog days are better <em>together.</em></h1><p>We’re shaping a calendar for the Quipaw community. Here are a few kinds of dog-friendly days we’re considering for the pack.</p></div><div className="calendar-note"><strong>Calendar update</strong>There are no confirmed dates or locations yet. We’ll share details here as soon as the first get-together is ready.</div></section>
    <section className="section-wrap event-ideas" id="event-ideas"><div className="event-ideas-heading"><div><p className="eyebrow">Ideas for the pack</p><h2>What sounds like <em>your kind of day?</em></h2></div><p>Tell us what you’d be excited to join. Your note will open an email to the Quipaw team.</p></div><div className="event-ideas-grid">{ideas.map((idea) => <article className="event-idea-card" key={idea.title}><div className="event-idea-photo"><img src={`/assets/events/${idea.image}`} alt={idea.title} loading="lazy" /></div><div className="event-idea-body"><span className="journal-category">{idea.category}</span><h3>{idea.title}</h3><p>{idea.text}</p><a href={`mailto:support@quipaw.com?subject=${encodeURIComponent(idea.subject)}`}>I’d join this day ↗</a></div></article>)}</div></section>
    <section className="events-benefits" aria-label="What Quipaw events offer"><div className="section-wrap events-benefits-grid"><div><span>🐾</span><strong>Build Community</strong><small>Connect with fellow dog lovers.</small></div><div><span>♡</span><strong>Learn & Grow</strong><small>Get expert tips and useful knowledge.</small></div><div><span>☆</span><strong>Fun for Every Dog</strong><small>Activities for dogs of every age.</small></div><div><span>▦</span><strong>Create Lasting Memories</strong><small>Make good moments together.</small></div></div></section>
    <section className="section-wrap events-contact-band"><div><h2>Have an idea for a happy day?</h2><p>Send it our way. The Quipaw team will hear what the community wants to do next.</p></div><a className="button button-light" href="mailto:support@quipaw.com?subject=An%20idea%20for%20Quipaw%20events">Suggest an activity <span aria-hidden="true">↗</span></a></section>
    <div className="section-wrap pdf-event-banner" style={{ marginTop: 38 }}><img src="/assets/quipaw-pdf-events.webp" alt="Good Dogs Make Great Days with a curly-coated dog in a sunny field" /><a className="pdf-banner-cta pdf-event-cta" href="mailto:support@quipaw.com?subject=Quipaw%20events%20updates">Ask about upcoming events <span aria-hidden="true">↗</span></a></div>
  </main><SiteFooter /></>;
}
