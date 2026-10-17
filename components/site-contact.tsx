export function SiteContact() {
  return <section id="contact" className="contact-section">
    <div className="section-wrap contact-pdf-banner"><img src="/assets/quipaw-pdf-contact.webp" alt="Quipaw dogs wearing colorful headphones around a speaker and laptop beneath a Get in Touch greeting" /></div>
    <div className="section-wrap contact-inner">
      <div className="contact-copy">
        <p className="eyebrow">A friendly hello</p>
        <h2>We’re all <em>ears.</em></h2>
        <p>Have a question about a chew, a partnership or anything Quipaw? Send us a note and we’ll get back to you.</p>
        <div className="contact-links">
          <a className="contact-email" href="tel:+18325550123"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="M5 4h3l2 5-2 1.5a15 15 0 0 0 5.5 5.5L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" /></svg><span>+1 (832) 555-0123</span></a>
          <a className="contact-email" href="mailto:support@quipaw.com"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg><span>support@quipaw.com</span></a>
        </div>
        <div className="contact-social"><span>Follow the happy tails</span><a href="https://www.instagram.com/" aria-label="Instagram">◎</a><a href="https://www.facebook.com/" aria-label="Facebook">f</a><a href="https://www.youtube.com/" aria-label="YouTube">▶</a></div>
      </div>
      <form className="contact-form" action="mailto:support@quipaw.com" method="post" encType="text/plain"><label>Your name<input name="name" required placeholder="The human’s name" /></label><label>Email address<input type="email" name="email" required placeholder="you@example.com" /></label><label>What’s on your mind?<textarea name="message" rows={4} required placeholder="Ask us anything..." /></label><button className="button button-dark" type="submit">Open an email <span aria-hidden="true">↗</span></button></form>
    </div>
  </section>;
}
